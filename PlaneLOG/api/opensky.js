// Vercel serverless function — OpenSky live-states proxy.
//
// This is the FAILOVER source for PlaneLOG's "rare planes near you" feature. The browser
// hits airplanes.live directly (CORS-open, no auth); if that fails it calls /api/opensky,
// which authenticates to OpenSky server-side and proxies a bounding-box state query.
//
// OpenSky can't be called from the browser (its CORS is locked to its own origin) and its
// OAuth2 secret must never ship to the client — so the credentials live ONLY in Vercel
// project env vars, never in the repo:
//     OPENSKY_CLIENT_ID
//     OPENSKY_CLIENT_SECRET
// If they're unset, the proxy falls back to OpenSky's (rate-limited) anonymous access.

const TOKEN_URL =
  'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token';

// Cached across warm invocations so we don't re-auth on every request.
let tokenCache = { token: null, exp: 0 };

async function getToken() {
  const id = process.env.OPENSKY_CLIENT_ID;
  const secret = process.env.OPENSKY_CLIENT_SECRET;
  if (!id || !secret) return null; // anonymous fallback

  const now = Date.now();
  if (tokenCache.token && now < tokenCache.exp - 30000) return tokenCache.token;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: id,
    client_secret: secret,
  });
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!r.ok) return null; // fall back to anonymous on auth failure
  const j = await r.json();
  tokenCache = { token: j.access_token, exp: now + (j.expires_in || 300) * 1000 };
  return tokenCache.token;
}

const M_TO_FT = 3.28084;
const MS_TO_KT = 1.94384;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const { lamin, lomin, lamax, lomax } = req.query;
  const nums = [lamin, lomin, lamax, lomax].map(parseFloat);
  if (nums.some((n) => Number.isNaN(n))) {
    res.status(400).json({ error: 'bad-bbox', need: 'lamin,lomin,lamax,lomax' });
    return;
  }

  try {
    const headers = {};
    const token = await getToken();
    if (token) headers.Authorization = 'Bearer ' + token;

    const url =
      `https://opensky-network.org/api/states/all` +
      `?lamin=${nums[0]}&lomin=${nums[1]}&lamax=${nums[2]}&lomax=${nums[3]}`;
    const r = await fetch(url, { headers });
    if (!r.ok) {
      res.status(502).json({ error: 'opensky-' + r.status });
      return;
    }
    const j = await r.json();

    // Normalize OpenSky's positional state vectors into the same shape the client uses
    // for airplanes.live. OpenSky gives icao24 (hex), not a registration — the client
    // matches those against each catalog entry's enriched `icao24` field.
    const ac = (j.states || [])
      .map((s) => ({
        hex: (s[0] || '').toLowerCase(),
        reg: null,
        flight: (s[1] || '').trim(),
        lat: s[6],
        lon: s[5],
        alt: s[7] != null ? Math.round(s[7] * M_TO_FT)
           : s[13] != null ? Math.round(s[13] * M_TO_FT) : null,
        gs: s[9] != null ? Math.round(s[9] * MS_TO_KT) : null,
        track: s[10],
        vrate: s[11] != null ? Math.round(s[11] * M_TO_FT * 60) : null, // m/s → ft/min
        ground: !!s[8],
      }))
      .filter((a) => a.lat != null && a.lon != null);

    res.setHeader('Cache-Control', 's-maxage=8, stale-while-revalidate=20');
    res.status(200).json({ source: token ? 'opensky' : 'opensky-anon', ac });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
}
