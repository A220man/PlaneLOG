// PlaneLOG — shared application logic.
// Loaded by index.html, Collection.html and YourLiveries.html. Each page supplies its
// own buildSidebar() and applyFilters() (and, on the home page, renderHome()), built on
// the shared helpers below: renderSidebar(), filterPool() and renderGrid().

const LIVERIES = [
  {id:1,airline:'United Airlines',tail:'N14120',type:'Boeing 757',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','mainline'],notes:'United\'s current globe livery, introduced 2010 and kept through the Continental merger. N14120 is a Boeing 757-200.',sightings:[]},
  {id:2,airline:'United Airlines',tail:'N516UA',type:'Boeing 757',era:'1990s',livery:'Battleship (tulip)',colors:['#4A4E5A','#C6A84B','#FFFFFF'],tags:['retro','tulip','classic'],notes:'Nicknamed "Battleship" for its grey fuselage. Flew 1993–2004, one of the most distinctive US carrier schemes.',sightings:[]},
  {id:3,airline:'American Airlines',tail:'N335AA',type:'Boeing 767',era:'1980s',livery:'Polished metal',colors:['#C0C0C0','#CC0000','#003087'],tags:['classic','bare metal','iconic'],notes:'Iconic unpainted aluminium fuselage with red and blue cheatline. No base coat — actual polished bare metal.',sightings:[]},
  {id:4,airline:'American Airlines',tail:'N102NN',type:'Airbus A321',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','heritage','flag'],notes:'American\'s livery launched January 2013, around the US Airways merger. N102NN is an Airbus A321.',sightings:[]},
  {id:5,airline:'Delta Air Lines',tail:'N668DN',type:'Boeing 757',era:'2000s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget'],notes:'Delta\'s widget tail design. Scheme introduced 2000, refreshed with brighter red in 2007.',sightings:[]},
  {id:6,airline:'Southwest Airlines',tail:'N500WR',type:'Boeing 737-800',era:'2020s',livery:'Freedom One',colors:['#B22234','#FFFFFF','#3C3B6E'],tags:['special','flag','50th anniversary'],notes:'US-flag livery unveiled June 2021 for Southwest\'s 50th anniversary, honouring the US military. The first Boeing 737-800 to wear one of Southwest\'s special schemes.',sightings:[]},
  {id:7,airline:'British Airways',tail:'G-BOAC',type:'Concorde',era:'1980s',livery:'Landor (speedbird)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['retro','Landor','Concorde'],notes:'Flagship of BA\'s Concorde fleet — its registration even spells out BOAC. Painted in the elegant Landor scheme from 1984; retired October 2003 and now preserved under a glass canopy at Manchester Airport.',sightings:[]},
  {id:8,airline:'Pan Am',tail:'N747PA',type:'Boeing 747',era:'1970s',livery:'Globe (blue/white)',colors:['#003591','#FFFFFF','#A0B8D8'],tags:['historic','globe','defunct'],notes:'Pan Am\'s iconic blue-globe livery. N747PA was the second 747 ever built — used by Boeing for flight testing, then delivered to Pan Am in October 1970 as "Clipper America", later renamed "Clipper Juan T. Trippe".',sightings:[]},
  // ── Military aircraft (rare catches) ──
  {id:101,category:'military',airline:'U.S. Air Force',tail:'04-4070',type:'F-22 Raptor',era:'2010s',livery:'Air dominance grey',colors:['#5A6470','#3E4651','#8A95A3'],tags:['fighter','stealth','rare'],notes:'Fifth-generation air-superiority fighter. The Raptor\'s low-observable grey is rarely seen outside air shows.',sightings:[]},
  {id:102,category:'military',airline:'U.S. Navy',tail:'168912',type:'F/A-18 Super Hornet',era:'2010s',livery:'Tactical grey',colors:['#6B7480','#4A525C','#9AA4B0'],tags:['fighter','carrier','navy'],notes:'Carrier-based multirole fighter in standard tactical paint.',sightings:[]},
  {id:103,category:'military',airline:'U.S. Navy',tail:'165664',type:'F/A-18 Super Hornet',era:'2020s',livery:'Blue Angels',colors:['#002F6C','#FFC72C','#FFFFFF'],tags:['display','rare','iconic'],notes:'U.S. Navy flight demonstration squadron. The Blue Angels switched to the blue-and-gold F/A-18E/F Super Hornet in 2021 — a prized airshow catch.',sightings:[]},
  {id:104,category:'military',airline:'U.S. Air Force',tail:'87-0293',type:'F-16 Fighting Falcon',era:'2020s',livery:'Thunderbirds',colors:['#C8102E','#0A2472','#FFFFFF'],tags:['display','rare','iconic'],notes:'USAF Air Demonstration Squadron. The red-white-and-blue Thunderbirds F-16C is a rare-catch airshow favourite.',sightings:[]},
  {id:105,category:'military',airline:'Royal Air Force',tail:'ZK308',type:'Eurofighter Typhoon',era:'2010s',livery:'Air-defence grey',colors:['#5C6670','#3A424C','#8993A0'],tags:['fighter','RAF','europe'],notes:'RAF multirole fighter in standard air-defence grey.',sightings:[]},
  {id:106,category:'military',airline:'U.S. Air Force',tail:'82-1066',type:'B-2 Spirit',era:'1990s',livery:'Stealth black',colors:['#2A2D33','#1A1C20','#3E424A'],tags:['bomber','stealth','very rare'],notes:'Stealth strategic bomber — only 21 were ever built, making a B-2 the rarest of finds. 82-1066 "Spirit of America" was the very first B-2.',sightings:[]},
];

// Pre-resolved planespotters photos for the curated fleet (keyed by id) so card images
// load directly as <img>, even when the page is opened from file:// (where the photo-API
// fetch is blocked by the browser). Submitted liveries still hydrate via the API by tail.
const SEED_PHOTOS = {
  1:'https://t.plnspttrs.net/21872/1900709_cfa75ea865_280.jpg',
  2:'https://t.plnspttrs.net/25779/573631_3b3f0d02ec_280.jpg',
  3:'https://t.plnspttrs.net/49241/190143_99c6ea5dec_280.jpg',
  4:'https://t.plnspttrs.net/15705/1578075_1752071fb5_280.jpg',
  5:'https://t.plnspttrs.net/21752/1838422_e33999b8a6_280.jpg',
  6:'https://t.plnspttrs.net/24902/1874544_c8afc1016b_280.jpg',
  7:'https://t.plnspttrs.net/43526/1706067_b10473464e_280.jpg',
  8:'https://t.plnspttrs.net/30369/1880889_73fdbb3667_280.jpg',
  101:'https://t.plnspttrs.net/20918/1207577_c638087cfe_280.jpg',
  102:'https://t.plnspttrs.net/47357/1864967_98faa3e249_280.jpg',
  103:'https://t.plnspttrs.net/02396/1819014_828e7063f9_280.jpg',
  104:'https://t.plnspttrs.net/29269/1770704_82253b4421_280.jpg',
  105:'https://t.plnspttrs.net/46959/1682957_9daac724c2_280.jpg',
  106:'https://t.plnspttrs.net/25553/1295755_d2c5876905_280.jpg',
};
for (const l of LIVERIES) if (SEED_PHOTOS[l.id]) l.photo = SEED_PHOTOS[l.id];

// Photographer attribution for each seed photo (Planespotters requires visible credit).
// Resolved from the Planespotters photo API and matched to the exact SEED_PHOTOS image.
const SEED_PHOTO_CREDITS = {
  1:{by:'Marc Najberg',link:'https://www.planespotters.net/photo/1900709/n14120-united-airlines-boeing-757-224-wl'},
  2:{by:'Nicolas C. Kaemmerer',link:'https://www.planespotters.net/photo/573631/n516ua-united-airlines-boeing-757-222'},
  3:{by:'Klaus Ecker',link:'https://www.planespotters.net/photo/190143/n335aa-american-airlines-boeing-767-223er'},
  4:{by:'Jan Seler',link:'https://www.planespotters.net/photo/1578075/n102nn-american-airlines-airbus-a321-231-wl'},
  5:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1838422/n668dn-delta-air-lines-boeing-757-232'},
  6:{by:'Nicholas Toto',link:'https://www.planespotters.net/photo/1874544/n500wr-southwest-airlines-boeing-737-8h4-wl'},
  7:{by:'X PAN',link:'https://www.planespotters.net/photo/1706067/g-boac-british-airways-bac-concorde-102'},
  8:{by:'freesky - Korea Aero Photos',link:'https://www.planespotters.net/photo/1880889/n747pa-untitled-boeing-747-121'},
  101:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1207577/04-4070-united-states-air-force-lockheed-martin-f-22a-raptor'},
  102:{by:'Westley_SJU',link:'https://www.planespotters.net/photo/1864967/168912-united-states-navy-boeing-f-a-18e-super-hornet'},
  103:{by:'CJMoeser',link:'https://www.planespotters.net/photo/1819014/165664-united-states-navy-boeing-f-a-18e-super-hornet'},
  104:{by:'Riley Bertoia',link:'https://www.planespotters.net/photo/1770704/87-0293-united-states-air-force-general-dynamics-f-16c-fighting-falcon'},
  105:{by:'Olie Myburgh',link:'https://www.planespotters.net/photo/1682957/zk308-royal-air-force-eurofighter-ef-2000-typhoon-fgr-4'},
  106:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1295755/82-1066-united-states-air-force-northrop-b-2a-spirit'},
};

// One-time migration from the old liveryarc_* storage keys to planelog_*.
for (const k of ['db', 'sightings', 'collection']) {
  const oldKey = 'liveryarc_' + k, newKey = 'planelog_' + k;
  if (localStorage.getItem(newKey) === null && localStorage.getItem(oldKey) !== null) {
    localStorage.setItem(newKey, localStorage.getItem(oldKey));
  }
}

let db = JSON.parse(localStorage.getItem('planelog_db') || 'null');
// Bump SEED_VERSION whenever the curated LIVERIES data changes, so saved copies refresh.
const SEED_VERSION = 3;
const storedSeedVersion = +(localStorage.getItem('planelog_seed_version') || 0);
if (!Array.isArray(db)) {
  db = LIVERIES.slice();
} else if (storedSeedVersion < SEED_VERSION) {
  // Refresh the curated seed entries to the latest data, keeping any liveries you've added.
  const seedIds = new Set(LIVERIES.map(l => l.id));
  db = LIVERIES.concat(db.filter(l => !seedIds.has(l.id)));
} else {
  // Merge in any new seed liveries (e.g. military) added since the data was last saved.
  const have = new Set(db.map(l => l.id));
  for (const l of LIVERIES) if (!have.has(l.id)) db.push(l);
}
localStorage.setItem('planelog_db', JSON.stringify(db));
localStorage.setItem('planelog_seed_version', String(SEED_VERSION));

// Attach photographer credit to seed entries (derived, not user data). Only when the entry
// still shows the original seed image — if the user swapped in their own photo, no credit.
for (const l of db) {
  if (SEED_PHOTO_CREDITS[l.id] && l.photo && l.photo === SEED_PHOTOS[l.id]) l.credit = SEED_PHOTO_CREDITS[l.id];
  else delete l.credit;
}

let sightings = JSON.parse(localStorage.getItem('planelog_sightings') || '{}');
let collection = new Set(JSON.parse(localStorage.getItem('planelog_collection') || '[]'));
// Per-livery view log: id -> [timestamp, ...]. Powers the home "Top photos" ranking,
// where the time-range toggle counts only views within the selected window.
let views = JSON.parse(localStorage.getItem('planelog_views') || '{}');

function recordView(id) {
  (views[id] || (views[id] = [])).push(Date.now());
  try { localStorage.setItem('planelog_views', JSON.stringify(views)); } catch (e) {}
}
// Views for a livery; if `since` (a timestamp) is given, only those at or after it.
function viewCount(id, since) {
  const arr = views[id] || [];
  return since ? arr.filter(t => t >= since).length : arr.length;
}

// A livery is "yours" if you submitted it (flagged) or it isn't part of the seed archive.
const SEED_IDS = new Set(LIVERIES.map(l => l.id));
function isMine(l) { return l.submitted === true || !SEED_IDS.has(l.id); }

// Escape user-controlled strings before they go into innerHTML (text or attribute context).
const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ESC_MAP[c]);
}

// Markup for a swatch photo. Pre-loaded photos (l.photo) reveal immediately; if the URL
// fails to load we drop the "loaded" class so the colour gradient shows through instead.
function photoImgHTML(l) {
  if (!l.photo) return `<img class="swatch-photo" alt="">`;
  const cr = l.credit ? ` alt="© ${esc(l.credit.by)} / Planespotters" title="© ${esc(l.credit.by)} · Planespotters"` : ' alt=""';
  return `<img class="swatch-photo loaded" src="${esc(l.photo)}"${cr} onerror="this.classList.remove('loaded')">`;
}

function inCollection(id) { return collection.has(id); }
function toggleCollect(id, ev) {
  if (ev) ev.stopPropagation();
  if (collection.has(id)) collection.delete(id); else collection.add(id);
  localStorage.setItem('planelog_collection', JSON.stringify([...collection]));
  applyFilters();
  const dbtn = document.querySelector('#detailBox .collect-btn');
  if (dbtn && selectedId === id) {
    const on = inCollection(id);
    dbtn.classList.toggle('on', on);
    dbtn.textContent = on ? '★ In collection' : '☆ Add to collection';
  }
}

let activeFilters = { category: new Set(), airline: new Set(), type: new Set(), era: new Set(), tag: new Set() };
let sortKey = 'airline';
let viewMode = 'grid';
let selectedId = null;
let editingId = null;

function save() {
  try {
    localStorage.setItem('planelog_db', JSON.stringify(db));
    localStorage.setItem('planelog_sightings', JSON.stringify(sightings));
  } catch (e) {
    alert('Could not save — local storage is full. Your uploaded photo may be too large; try a smaller image.');
  }
}

// ── REAL PHOTOS (planespotters.net public photo API) ──
// reg -> { state: 'pending'|'done'|'none'|'error', photo? }
const photoCache = {};

async function getPhoto(reg) {
  if (!reg) return { state: 'none' };
  if (photoCache[reg]) return photoCache[reg];
  photoCache[reg] = { state: 'pending' };
  try {
    const res = await fetch(`https://api.planespotters.net/pub/photos/reg/${encodeURIComponent(reg)}`);
    const json = await res.json();
    const p = json.photos && json.photos[0];
    if (p) {
      photoCache[reg] = { state: 'done', photo: {
        src: (p.thumbnail_large && p.thumbnail_large.src) || (p.thumbnail && p.thumbnail.src),
        link: p.link,
        photographer: p.photographer || 'Unknown'
      }};
    } else {
      photoCache[reg] = { state: 'none' };
    }
  } catch (e) {
    photoCache[reg] = { state: 'error' };
  }
  return photoCache[reg];
}

// Lazily load real photos into any rendered swatches that have a [data-reg].
function hydratePhotos(root) {
  (root || document).querySelectorAll('.card-swatch[data-reg]').forEach(async sw => {
    if (sw.dataset.hydrated) return;
    sw.dataset.hydrated = '1';
    const res = await getPhoto(sw.dataset.reg);
    if (res.state === 'done') {
      const img = sw.querySelector('.swatch-photo');
      if (!img) return;
      img.onload = () => img.classList.add('loaded');
      img.src = res.photo.src;
    }
  });
}

// ── SIDEBAR (shared markup; each page calls with its own subset of liveries) ──
const CATEGORY_LABELS = { airline: 'Airliner', military: 'Military' };

function renderSidebar(items) {
  // Category section is optional — only rendered on pages that include #categoryFilters.
  const catEl = document.getElementById('categoryFilters');
  if (catEl) {
    const cats = [...new Set(items.map(l => l.category || 'airline'))].sort();
    catEl.innerHTML = cats.map(c =>
      `<div class="filter-chip${activeFilters.category.has(c)?' active':''}" role="button" tabindex="0" aria-pressed="${activeFilters.category.has(c)}" data-filter-type="category" data-filter-val="${esc(c)}">
        <span>${esc(CATEGORY_LABELS[c] || c)}</span>
        <span class="count">${items.filter(l=>(l.category||'airline')===c).length}</span>
      </div>`
    ).join('');
  }

  const airlines = [...new Set(items.map(l => l.airline))].sort();
  const types = [...new Set(items.map(l => l.type))].sort();
  const eras = [...new Set(items.map(l => l.era))].sort();
  const tags = [...new Set(items.flatMap(l => l.tags))].sort();

  document.getElementById('airlineFilters').innerHTML = airlines.map(a =>
    `<div class="filter-chip${activeFilters.airline.has(a)?' active':''}" role="button" tabindex="0" aria-pressed="${activeFilters.airline.has(a)}" data-filter-type="airline" data-filter-val="${esc(a)}">
      <span>${esc(a)}</span>
      <span class="count">${items.filter(l=>l.airline===a).length}</span>
    </div>`
  ).join('');

  document.getElementById('typeFilters').innerHTML = types.map(t =>
    `<div class="filter-chip${activeFilters.type.has(t)?' active':''}" role="button" tabindex="0" aria-pressed="${activeFilters.type.has(t)}" data-filter-type="type" data-filter-val="${esc(t)}">
      <span>${esc(t)}</span>
      <span class="count">${items.filter(l=>l.type===t).length}</span>
    </div>`
  ).join('');

  document.getElementById('eraFilters').innerHTML = eras.map(e =>
    `<div class="era-chip${activeFilters.era.has(e)?' active':''}" role="button" tabindex="0" aria-pressed="${activeFilters.era.has(e)}" data-filter-type="era" data-filter-val="${esc(e)}">${esc(e)}</div>`
  ).join('');

  document.getElementById('tagFilters').innerHTML = tags.map(t =>
    `<div class="tag-pill${activeFilters.tag.has(t)?' active':''}" role="button" tabindex="0" aria-pressed="${activeFilters.tag.has(t)}" data-filter-type="tag" data-filter-val="${esc(t)}">${esc(t)}</div>`
  ).join('');
}

// Filter chips carry their value in data-* attributes; a single delegated listener reads
// the raw (already-decoded) value, so airlines/tags with quotes or apostrophes can't break.
function onFilterClick(e) {
  const chip = e.target.closest('[data-filter-type]');
  if (!chip) return;
  toggleFilter(chip.dataset.filterType, chip.dataset.filterVal);
}

function toggleFilter(type, val) {
  if (activeFilters[type].has(val)) activeFilters[type].delete(val);
  else activeFilters[type].add(val);
  buildSidebar();
  applyFilters();
}

// Any sidebar filter or the search box currently narrowing the results?
function filtersActive() {
  if (Object.values(activeFilters).some(s => s.size)) return true;
  const search = document.getElementById('globalSearch');
  return !!(search && search.value.trim());
}

// Reset every filter and the search query back to the full list.
function clearFilters() {
  for (const k in activeFilters) activeFilters[k].clear();
  const search = document.getElementById('globalSearch');
  if (search) search.value = '';
  buildSidebar();
  applyFilters();
}

// ── GRID (shared by the archive + your-liveries pages) ──
const EMPTY_NO_RESULTS = `<div class="empty-state"><svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="8"/></svg><h3>No liveries found</h3><p>Try adjusting your search or filters.</p></div>`;

// Apply the sidebar filters + global search + current sort to a pool of liveries.
function filterPool(pool) {
  const q = document.getElementById('globalSearch').value.toLowerCase().trim();
  const results = pool.filter(l => {
    if (activeFilters.category.size && !activeFilters.category.has(l.category || 'airline')) return false;
    if (activeFilters.airline.size && !activeFilters.airline.has(l.airline)) return false;
    if (activeFilters.type.size && !activeFilters.type.has(l.type)) return false;
    if (activeFilters.era.size && !activeFilters.era.has(l.era)) return false;
    if (activeFilters.tag.size && !l.tags.some(t => activeFilters.tag.has(t))) return false;
    if (q && ![l.airline, l.tail, l.livery, ...l.tags, l.notes].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
  // Upload date uses the id as a creation-order proxy (submissions are id = Date.now()).
  if (sortKey === 'newest') results.sort((a, b) => b.id - a.id);
  else if (sortKey === 'oldest') results.sort((a, b) => a.id - b.id);
  else results.sort((a, b) => (a[sortKey] || '').localeCompare(b[sortKey] || ''));
  return results;
}

// Render results into #liveryGrid (or the supplied empty-state HTML when there are none).
function renderGrid(results, emptyHTML) {
  const grid = document.getElementById('liveryGrid');
  grid.className = 'livery-grid' + (viewMode === 'list' ? ' list-view' : '');
  document.getElementById('resultCount').innerHTML = `<strong>${results.length}</strong> liverie${results.length !== 1 ? 's' : ''}`;
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.disabled = !filtersActive();
  if (!results.length) { grid.innerHTML = emptyHTML || EMPTY_NO_RESULTS; return; }
  grid.innerHTML = results.map(l => cardHTML(l)).join('');
  hydratePhotos(grid);
}

function cardHTML(l) {
  const bg = `background: linear-gradient(135deg, ${l.colors[0]} 40%, ${l.colors[1] || l.colors[0]} 40% 70%, ${l.colors[2] || l.colors[1] || l.colors[0]} 70%)`;
  const isSelected = l.id === selectedId;
  const regAttr = l.photo ? '' : ` data-reg="${esc(l.tail)}"`;
  const on = inCollection(l.id);
  const star = `<button class="collect-star${on?' on':''}" onclick="toggleCollect(${l.id}, event)" aria-pressed="${on}" title="${on?'In your collection':'Add to collection'}">${on?'★':'☆'}</button>`;
  return `
    <div class="livery-card${isSelected?' selected':''}" role="button" tabindex="0" aria-label="${esc(l.airline)} — ${esc(l.livery)}, ${esc(l.tail)}" onclick="openDetail(${l.id})">
      <div class="card-swatch"${regAttr} style="${bg}">
        <div class="swatch-plane">${planeSVG()}</div>
        ${photoImgHTML(l)}
        ${star}
        <span class="swatch-tail">${esc(l.tail)}</span>
        <span class="swatch-era">${esc(l.era)}</span>
      </div>
      <div class="card-body">
        <div class="card-airline">${esc(l.airline)}</div>
        <div class="card-livery">${esc(l.livery)}</div>
        <div class="card-type">${esc(l.type)}</div>
        <div class="card-tags">${l.tags.map(t=>`<span class="card-tag">${esc(t)}</span>`).join('')}</div>
      </div>
    </div>`;
}

function planeSVG() {
  return `<svg viewBox="0 0 100 40" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M95 18 L60 18 L40 4 L35 4 L45 18 L20 18 L12 12 L7 12 L12 20 L7 28 L12 28 L20 22 L45 22 L35 36 L40 36 L60 22 L95 22 Q100 20 95 18Z"/>
  </svg>`;
}

// ── DETAIL ──
function openDetail(id) {
  selectedId = id;
  applyFilters();
  const l = db.find(x => x.id === id);
  if (!l) return;
  recordView(id);
  if (!sightings[id]) sightings[id] = [];
  const bg = `background: linear-gradient(135deg, ${l.colors[0]} 40%, ${l.colors[1]||l.colors[0]} 40% 70%, ${l.colors[2]||l.colors[1]||l.colors[0]} 70%)`;

  document.getElementById('detailBox').innerHTML = `
    <div class="detail-swatch-full card-swatch"${l.photo ? '' : ` data-reg="${esc(l.tail)}"`} style="${bg}">
      <div class="swatch-plane">${planeSVG()}</div>
      ${photoImgHTML(l)}
      <button class="detail-close" onclick="closeDetail(null,true)">×</button>
    </div>
    <div class="detail-content">
      <div class="detail-title">${esc(l.livery)}</div>
      <div class="detail-sub">${esc(l.airline)} · ${esc(l.type)}</div>
      <div class="detail-tail">${esc(l.tail)}</div>
      <div class="detail-actions">
        <button class="detail-action-btn collect-btn${inCollection(l.id)?' on':''}" onclick="toggleCollect(${l.id})">${inCollection(l.id)?'★ In collection':'☆ Add to collection'}</button>
        <button class="detail-action-btn" onclick="editLivery(${l.id})">Edit</button>
        <button class="detail-action-btn danger" onclick="deleteLivery(${l.id})">Delete</button>
      </div>
      <div class="detail-fields">
        <div class="df"><label>Era</label><p>${esc(l.era)}</p></div>
        <div class="df"><label>Tags</label><p>${esc(l.tags.join(', '))}</p></div>
        <div class="df full"><label>Notes</label><p>${esc(l.notes)}</p></div>
        <div class="df full colors"><label>Color palette</label><p>${l.colors.map(c=>`
          <span class="color-swatch-sm">
            <span class="color-dot" style="background:${esc(c)}"></span>
            <span class="color-hex">${esc(c)}</span>
          </span>`).join('')}</p>
        </div>
      </div>
      <div class="spotter-section">
        <h3>My sightings (${(sightings[id]||[]).length})</h3>
        <div class="log-add">
          <input type="text" id="log-loc-${id}" placeholder="Airport or location (e.g. KLAX, gate 42B)">
          <input type="text" id="log-date-${id}" placeholder="Date (e.g. Jun 2024)" style="max-width:140px">
          <button onclick="addSighting(${id})">Log</button>
        </div>
        <div class="log-entries" id="log-entries-${id}">${renderSightings(id)}</div>
      </div>
    </div>
  `;
  openModal(document.getElementById('detailOverlay'));

  // Load the real photo (if any) into the detail swatch, with attribution.
  const swatch = document.querySelector('#detailBox .detail-swatch-full');
  if (swatch && !l.photo) {
    swatch.dataset.hydrated = '1';
    getPhoto(l.tail).then(res => {
      if (selectedId !== id || res.state !== 'done') return;
      const img = swatch.querySelector('.swatch-photo');
      img.onload = () => img.classList.add('loaded');
      img.src = res.photo.src;
      addPhotoCredit(swatch, res.photo.photographer, res.photo.link);
    });
  } else if (swatch && l.credit) {
    // Seed photo: show its (pre-resolved) photographer credit.
    addPhotoCredit(swatch, l.credit.by, l.credit.link);
  }
}

// Append a clickable photographer credit onto a swatch.
function addPhotoCredit(swatch, by, link) {
  const credit = document.createElement('a');
  credit.className = 'photo-credit';
  credit.href = link;
  credit.target = '_blank';
  credit.rel = 'noopener';
  credit.textContent = `© ${by} · Planespotters`;
  swatch.appendChild(credit);
}

function renderSightings(id) {
  const entries = sightings[id] || [];
  if (!entries.length) return '<div class="log-empty">No sightings logged yet — be the first!</div>';
  return entries.map((e, i) => `
    <div class="log-entry">
      <span class="log-entry-loc">${esc(e.loc)}</span>
      <span class="log-entry-date">${esc(e.date)}</span>
      <button class="log-entry-rm" onclick="removeSighting(${id},${i})" title="Remove">×</button>
    </div>`).join('');
}

function addSighting(id) {
  const loc = document.getElementById('log-loc-'+id).value.trim();
  const date = document.getElementById('log-date-'+id).value.trim();
  if (!loc) return;
  if (!sightings[id]) sightings[id] = [];
  sightings[id].unshift({ loc, date: date || '—' });
  save();
  document.getElementById('log-entries-'+id).innerHTML = renderSightings(id);
  document.getElementById('log-loc-'+id).value = '';
  document.getElementById('log-date-'+id).value = '';
  // update count
  document.querySelector('.spotter-section h3').textContent = `My sightings (${sightings[id].length})`;
}

function removeSighting(id, idx) {
  sightings[id].splice(idx, 1);
  save();
  document.getElementById('log-entries-'+id).innerHTML = renderSightings(id);
  document.querySelector('.spotter-section h3').textContent = `My sightings (${sightings[id].length})`;
}

function closeDetail(e, force) {
  if (force || (e && e.target === document.getElementById('detailOverlay'))) {
    closeModal(document.getElementById('detailOverlay'));
    selectedId = null;
    applyFilters();
  }
}

// ── SUBMIT / EDIT / DELETE ──
const ERAS = ['1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];
const DEFAULT_COLORS = ['#004B87','#FFFFFF','#A2AAAD'];

function hexOrDefault(c, fallback) {
  return (typeof c === 'string' && /^#[0-9a-fA-F]{6}$/.test(c)) ? c : fallback;
}

// Photo currently staged in the submit/edit form (data URL).
let formPhoto = '';

// Read an image file, downscale it (to keep localStorage small), return a JPEG data URL.
function readImageFile(file, cb) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const max = 1100;
      let w = img.width, h = img.height;
      if (w > max || h > max) { const s = max / Math.max(w, h); w = Math.round(w * s); h = Math.round(h * s); }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      cb(c.toDataURL('image/jpeg', 0.82));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function onPhotoPick(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  readImageFile(file, dataUrl => { formPhoto = dataUrl; showPhotoPreview(); });
}

function showPhotoPreview() {
  const prev = document.getElementById('sub-photo-preview');
  const clr = document.getElementById('sub-photo-clear');
  if (formPhoto) {
    prev.src = formPhoto; prev.style.display = 'block'; clr.style.display = 'inline-block';
  } else {
    prev.removeAttribute('src'); prev.style.display = 'none'; clr.style.display = 'none';
  }
}

function clearPhoto() {
  formPhoto = '';
  document.getElementById('sub-photo').value = '';
  showPhotoPreview();
}

function setForm(l) {
  document.getElementById('sub-tail').value = l.tail || '';
  document.getElementById('sub-livery').value = l.livery || '';
  document.getElementById('sub-airline').value = l.airline || '';
  document.getElementById('sub-type').value = (l.type && l.type !== 'Unknown') ? l.type : '';
  document.getElementById('sub-era').value = ERAS.includes(l.era) ? l.era : '';
  document.getElementById('sub-notes').value = l.notes || '';
  document.getElementById('sub-tags').value = (l.tags || []).join(', ');
  const colors = l.colors || DEFAULT_COLORS;
  document.getElementById('sub-c1').value = hexOrDefault(colors[0], DEFAULT_COLORS[0]);
  document.getElementById('sub-c2').value = hexOrDefault(colors[1], DEFAULT_COLORS[1]);
  document.getElementById('sub-c3').value = hexOrDefault(colors[2], DEFAULT_COLORS[2]);
  formPhoto = l.photo || '';
  document.getElementById('sub-photo').value = '';
  showPhotoPreview();
}

function openSubmit() {
  editingId = null;
  document.getElementById('submitTitle').textContent = 'Submit a livery';
  document.getElementById('submitDesc').textContent = 'Add a livery to your archive — saved locally in your browser.';
  document.getElementById('submitBtn').textContent = 'Add livery';
  setForm({ colors: DEFAULT_COLORS });
  openModal(document.getElementById('submitOverlay'));
}

function editLivery(id) {
  const l = db.find(x => x.id === id);
  if (!l) return;
  editingId = id;
  document.getElementById('submitTitle').textContent = 'Edit livery';
  document.getElementById('submitDesc').textContent = 'Update the details for this livery.';
  document.getElementById('submitBtn').textContent = 'Save changes';
  setForm(l);
  closeDetail(null, true);
  openModal(document.getElementById('submitOverlay'));
}

function closeSubmit(e) {
  if (!e || e.target === document.getElementById('submitOverlay')) {
    closeModal(document.getElementById('submitOverlay'));
    editingId = null;
  }
}

function submitLivery() {
  const tail = document.getElementById('sub-tail').value.trim();
  const livery = document.getElementById('sub-livery').value.trim();
  const airline = document.getElementById('sub-airline').value.trim();
  const type = document.getElementById('sub-type').value.trim();
  const era = document.getElementById('sub-era').value;
  const notes = document.getElementById('sub-notes').value.trim();
  const tags = document.getElementById('sub-tags').value.split(',').map(t => t.trim()).filter(Boolean);
  const colors = [
    document.getElementById('sub-c1').value,
    document.getElementById('sub-c2').value,
    document.getElementById('sub-c3').value
  ];
  if (!tail || !livery || !airline) { alert('Please fill in at least tail number, livery name, and airline.'); return; }

  if (editingId) {
    const l = db.find(x => x.id === editingId);
    if (l) {
      const oldTail = l.tail;
      Object.assign(l, { airline, tail: tail.toUpperCase(), type: type || 'Unknown', era: era || 'Unknown', livery, colors, tags, notes, photo: formPhoto });
      if (oldTail !== l.tail) delete photoCache[l.tail]; // re-fetch photo for the new registration
    }
  } else {
    db.push({ id: Date.now(), airline, tail: tail.toUpperCase(), type: type || 'Unknown', era: era || 'Unknown', livery, colors, tags, notes, photo: formPhoto, sightings: [], submitted: true });
  }

  save();
  buildSidebar();
  applyFilters();
  closeSubmit();
}

function deleteLivery(id) {
  const l = db.find(x => x.id === id);
  if (!l) return;
  if (!confirm(`Delete "${l.livery}" — ${l.airline} ${l.tail}?\nThis also removes its sightings and cannot be undone.`)) return;
  db = db.filter(x => x.id !== id);
  delete sightings[id];
  save();
  buildSidebar();
  closeDetail(null, true);
}

// ── SORT / VIEW ──
function setSort(key, el) {
  sortKey = key;
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}
function setView(mode, el) {
  viewMode = mode;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  applyFilters();
}

// ── MODAL FOCUS MANAGEMENT (dialog accessibility) ──
let lastFocused = null;

function getFocusable(root) {
  return [...root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(el => el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function openModal(overlay) {
  lastFocused = document.activeElement;
  overlay.classList.add('open');
  const f = getFocusable(overlay);
  if (f.length) f[0].focus();
}

function closeModal(overlay) {
  if (!overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  lastFocused = null;
}

// sidebar filter clicks (delegated — survives sidebar re-renders)
document.addEventListener('click', onFilterClick);

document.addEventListener('keydown', e => {
  // Enter / Space activate role="button" elements (cards, filter chips) like native buttons.
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    const el = e.target;
    if (el && el.getAttribute && el.getAttribute('role') === 'button') {
      e.preventDefault();
      el.click();
    }
    return;
  }

  // Esc closes whichever modal (or the mobile filter drawer) is open.
  if (e.key === 'Escape') {
    closeDetail(null, true);
    closeSubmit();
    const auth = document.getElementById('authOverlay');
    if (auth) closeModal(auth);
    toggleSidebar(false);
    return;
  }

  // Trap Tab focus inside an open modal.
  if (e.key === 'Tab') {
    const overlay = document.querySelector('.detail-overlay.open, .submit-overlay.open');
    if (!overlay) return;
    const f = getFocusable(overlay);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// ── MOBILE FILTER DRAWER ──
// On narrow screens the sidebar slides in as an off-canvas drawer; the nav "Filters"
// button toggles it and a backdrop (added here) closes it on tap.
function toggleSidebar(open) {
  const willOpen = open === undefined ? !document.body.classList.contains('sidebar-open') : open;
  document.body.classList.toggle('sidebar-open', willOpen);
}

if (document.querySelector('aside')) {
  const backdrop = document.createElement('div');
  backdrop.className = 'drawer-backdrop';
  backdrop.addEventListener('click', () => toggleSidebar(false));
  document.body.appendChild(backdrop);
}
