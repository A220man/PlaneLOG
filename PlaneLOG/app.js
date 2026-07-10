// PlaneLOG — shared application logic.
// Loaded by index.html, Collection.html and YourLiveries.html. Each page supplies its
// own buildSidebar() and applyFilters() (and, on the home page, renderHome()), built on
// the shared helpers below: renderSidebar(), filterPool() and renderGrid().

const LIVERIES = [
  {id:1,airline:'United Airlines',tail:'N14120',icao24:'A0A91E',type:'Boeing 757-200',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','narrowbody'],notes:'United Boeing 757-200 N14120 in the Star Alliance livery — the dark-blue-and-white scheme with the star motif on the tail, marking United\'s membership in the global airline alliance.',sightings:[]},
  {id:2,airline:'United Airlines',tail:'N555UA',type:'Boeing 757-200',era:'2000s',livery:'Blue Tulip',colors:['#1A3C7B','#2E5AA8','#FFFFFF'],tags:['retro','tulip','classic','narrowbody'],notes:'United\'s 2004–2010 "Blue Tulip" livery — a blue belly with the blue tulip "U" on the tail, the last scheme before the Continental-merger globe. Retired and no longer flying.',sightings:[]},
  {id:3,airline:'American Airlines',tail:'N335AA',type:'Boeing 767-200',era:'1980s',livery:'Polished metal',colors:['#C0C0C0','#CC0000','#003087'],tags:['classic','bare metal','iconic','widebody'],notes:'Iconic unpainted aluminium fuselage with red and blue cheatline. No base coat — actual polished bare metal.',sightings:[]},
  {id:4,airline:'American Airlines',tail:'N102NN',icao24:'A00D5B',type:'Airbus A321',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','heritage','flag','narrowbody'],notes:'American\'s livery launched January 2013, around the US Airways merger. N102NN is an Airbus A321.',sightings:[]},
  {id:5,airline:'Delta Air Lines',tail:'N668DN',icao24:'A8D249',type:'Boeing 757-200',era:'2000s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','narrowbody'],notes:'Delta\'s widget tail design. Scheme introduced 2000, refreshed with brighter red in 2007.',sightings:[]},
  {id:6,airline:'Southwest Airlines',tail:'N500WR',icao24:'A63BF4',type:'Boeing 737-800',era:'2020s',livery:'Freedom One',colors:['#B22234','#FFFFFF','#3C3B6E'],tags:['special','flag','50th anniversary','narrowbody'],notes:'US-flag livery unveiled June 2021 for Southwest\'s 50th anniversary, honouring the US military. The first Boeing 737-800 to wear one of Southwest\'s special schemes.',sightings:[]},
  {id:7,airline:'British Airways',tail:'G-BOAG',type:'Concorde',era:'2000s',livery:'Speedbird (Concorde)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['retro','Concorde','supersonic','narrowbody'],notes:'British Airways Concorde G-BOAG "Alpha Golf". On its retirement in November 2003 it set a New York–Seattle speed record while being delivered to The Museum of Flight in Seattle, where it is preserved today.',sightings:[]},
  {id:8,airline:'Pan Am',tail:'N734PA',type:'Boeing 747-100',era:'1970s',livery:'Globe (blue/white)',colors:['#003591','#FFFFFF','#A0B8D8'],tags:['historic','globe','defunct','widebody'],notes:'Pan Am\'s iconic blue-globe livery on a Boeing 747-121 — the type that opened the Jumbo Jet age for the airline. Pan Am was the 747\'s launch customer, flying its first commercial service in January 1970.',sightings:[]},
  // ── More airliners ──
  {id:9,airline:'United Airlines',tail:'N2333U',icao24:'A21679',type:'Boeing 777-300ER',era:'2010s',livery:'Globe (2010, previous)',colors:['#004B87','#C4A05A','#FFFFFF'],tags:['globe','widebody'],notes:'United Boeing 777-300ER N2333U in the 2010–2019 post-merger globe livery — the blue "United" wordmark with a gold lower-fuselage band and the blue-and-gold globe on the tail, the scheme worn between the Continental merger and United\'s 2019 "Evolve" refresh.',sightings:[]},
  {id:10,airline:'United Airlines',tail:'N24976',icao24:'A254DA',type:'Boeing 787-9',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','dreamliner','widebody'],notes:'A United Boeing 787-9 Dreamliner in the current globe livery, used to open long, thin international routes.',sightings:[]},
  {id:11,airline:'American Airlines',tail:'N753AN',icao24:'AA253B',type:'Boeing 777-200ER',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','flag','widebody'],notes:'An American 777-200ER wearing the 2013 "New American" livery with the silver Flight Symbol tail.',sightings:[]},
  {id:12,airline:'American Airlines',tail:'N800AN',icao24:'AAE1EA',type:'Boeing 787-8',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','dreamliner','widebody'],notes:'N800AN was American\'s first Boeing 787-8 Dreamliner, delivered in 2015 in the current livery.',sightings:[]},
  {id:13,airline:'Delta Air Lines',tail:'N171DZ',icao24:'A11D47',type:'Boeing 767-300ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','widebody'],notes:'A Delta 767-300ER in the current widget livery — a long-serving transatlantic workhorse.',sightings:[]},
  {id:14,airline:'Delta Air Lines',tail:'N502DN',icao24:'A641B6',type:'Airbus A350-900',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','widebody'],notes:'Delta\'s flagship Airbus A350-900, leading its long-haul fleet across the Pacific and Atlantic.',sightings:[]},
  {id:15,airline:'Southwest Airlines',tail:'N8645A',icao24:'ABE0BB',type:'Boeing 737-800',era:'2010s',livery:'Heart (current)',colors:['#304CB2','#E4002B','#F9B612'],tags:['current','heart','narrowbody'],notes:'Southwest\'s current "Heart" livery, introduced in 2014, on a Boeing 737-800.',sightings:[]},
  {id:16,airline:'British Airways',tail:'G-BYGC',type:'Boeing 747-400',era:'2010s',livery:'BOAC retro',colors:['#00247D','#FFFFFF','#D4AF37'],tags:['retro','BOAC','jumbo','widebody'],notes:'For BA\'s centenary in 2019, Boeing 747-400 G-BYGC was repainted into the classic BOAC blue-and-gold livery. Retired in 2020 and now preserved at Cotswold Airport.',sightings:[]},
  {id:17,airline:'British Airways',tail:'G-XLEA',icao24:'40688B',type:'Airbus A380',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','superjumbo','flag','widebody'],notes:'G-XLEA was British Airways\' first Airbus A380, wearing the current Chatham Dockyard livery with the Union-flag tail.',sightings:[]},
  {id:18,airline:'Lufthansa',tail:'D-ABYA',icao24:'3C4B21',type:'Boeing 747-8',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','jumbo','star alliance','widebody'],notes:'Lufthansa\'s Boeing 747-8 Intercontinental in the navy-and-yellow crane livery — the flagship of its long-haul fleet and the only Western passenger 747-8 operator.',sightings:[]},
  {id:19,airline:'Lufthansa',tail:'D-AIMA',icao24:'3C65A1',type:'Airbus A380',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','superjumbo','widebody'],notes:'D-AIMA was Lufthansa\'s first Airbus A380, named "Frankfurt am Main".',sightings:[]},
  {id:20,airline:'Air France',tail:'F-HPJA',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['retired','superjumbo','rare','widebody'],notes:'F-HPJA was Air France\'s first Airbus A380, in the carrier\'s blue, white and red livery. Air France retired its entire A380 fleet in 2020, so this is now a historical catch.',sightings:[]},
  {id:21,airline:'Air France',tail:'F-GZNT',icao24:'3965B3',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','widebody'],notes:'An Air France Boeing 777-300ER, the backbone of the airline\'s long-haul fleet.',sightings:[]},
  {id:23,airline:'KLM',tail:'PH-BVK',type:'Boeing 777-300ER',era:'2010s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','widebody'],notes:'KLM Royal Dutch Airlines\' sky-blue livery on a Boeing 777-300ER. KLM is the world\'s oldest airline still flying under its original name.',sightings:[]},
  {id:24,airline:'Qantas',tail:'VH-OQA',icao24:'7C4920',type:'Airbus A380',era:'2000s',livery:'Flying Roo (Nancy Bird Walton)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['flag','superjumbo','roo','widebody'],notes:'VH-OQA "Nancy Bird Walton" was the first Airbus A380 delivered to Qantas, wearing the red Flying Kangaroo on the tail.',sightings:[]},
  {id:25,airline:'Singapore Airlines',tail:'9V-SKA',type:'Airbus A380',era:'2000s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['flag','superjumbo','widebody'],notes:'9V-SKA operated the world\'s first commercial Airbus A380 flight, Singapore to Sydney, in October 2007.',sightings:[]},
  {id:26,airline:'Cathay Pacific',tail:'B-KQF',type:'Boeing 777-300ER',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','widebody','brushwing'],notes:'Cathay Pacific\'s green "brushwing" livery on a Boeing 777-300ER.',sightings:[]},
  {id:27,airline:'Japan Airlines',tail:'JA743J',icao24:'868340',type:'Boeing 777-300ER',era:'2010s',livery:'Tsurumaru (current)',colors:['#C8102E','#FFFFFF','#B0B0B0'],tags:['current','widebody','crane'],notes:'Japan Airlines\' red "Tsurumaru" crane emblem on a Boeing 777-300ER.',sightings:[]},
  {id:28,airline:'Virgin Atlantic',tail:'G-VLIP',type:'Boeing 747-400',era:'2010s',livery:'Star Wars (Millennium Falcon)',colors:['#E10A0A','#FFFFFF','#8A8D8F'],tags:['special','star wars','jumbo','widebody'],notes:'Virgin Atlantic Boeing 747-400 G-VLIP — originally named "Hot Lips" — was repainted in September 2019 with a Millennium Falcon "Star Wars" livery and renamed "The Falcon", flying Gatwick–Orlando to promote Star Wars: Galaxy\'s Edge at Walt Disney World.',sightings:[]},
  {id:29,airline:'JetBlue',tail:'N709JB',icao24:'A976C7',type:'Airbus A320',era:'2010s',livery:'Stripes',colors:['#003876','#FFFFFF','#6CACE4'],tags:['current','tailfin','narrowbody'],notes:'A JetBlue Airbus A320 wearing one of the airline\'s patterned tailfin designs.',sightings:[]},
  {id:30,airline:'Alaska Airlines',tail:'N559AS',icao24:'A720EB',type:'Boeing 737-800',era:'2020s',livery:'Xáat Kwáani (Salmon People)',colors:['#0B2A5B','#1E6FB0','#E6649B'],tags:['special','salmon','indigenous','rare','narrowbody'],notes:'N559AS ‘Xáat Kwáani’ (Salmon People) — a 2023 Alaska Airlines 737-800 livery by Tlingit artist Crystal Worl, depicting a salmon in Northwest Coast formline art. The first US airliner named in an Alaska Native language.',sightings:[]},
  {id:31,airline:'Air Canada',tail:'C-FRTG',icao24:'C02ED9',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Air Canada\'s bold red-and-black livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:32,airline:'Aer Lingus',tail:'EI-DEO',icao24:'4CA295',type:'Airbus A320',era:'2010s',livery:'Shamrock (current)',colors:['#006272','#FFFFFF','#9CA299'],tags:['current','shamrock','narrowbody'],notes:'Aer Lingus\' teal shamrock livery on an Airbus A320.',sightings:[]},
  {id:33,airline:'Ryanair',tail:'EI-DCL',icao24:'4CA242',type:'Boeing 737-800',era:'2010s',livery:'Current (blue/yellow)',colors:['#073590','#F1C933','#FFFFFF'],tags:['current','low-cost','narrowbody'],notes:'Europe\'s largest low-cost carrier — a Ryanair Boeing 737-800 in blue and yellow.',sightings:[]},
  {id:34,airline:'Etihad Airways',tail:'A6-BLA',icao24:'8963CE',type:'Boeing 787-9',era:'2010s',livery:'Facets (current)',colors:['#BD8B13','#4A4A4A','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Etihad Airways\' "Facets" livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:35,airline:'Qatar Airways',tail:'A7-BCA',icao24:'06A0A5',type:'Boeing 787-8',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','dreamliner','oryx','widebody'],notes:'Qatar Airways\' maroon Oryx livery on a Boeing 787-8 Dreamliner.',sightings:[]},
  {id:36,airline:'Turkish Airlines',tail:'TC-JJE',icao24:'4BA945',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','widebody'],notes:'Turkish Airlines\' red-and-white livery on a Boeing 777-300ER.',sightings:[]},
  {id:37,airline:'Finnair',tail:'OH-LWA',icao24:'461F48',type:'Airbus A350-900',era:'2020s',livery:'Official Airline of Santa Claus',colors:['#0B1560','#C8102E','#FFFFFF'],tags:['special','widebody'],notes:'Finnair Airbus A350-900 OH-LWA — the airline\'s first A350 — carrying the large circular "Santa Claus Finland" roundel on the forward fuselage, marking Finnair\'s role as the self-styled official airline of Santa Claus (Rovaniemi, Lapland).',sightings:[]},
  {id:38,airline:'Emirates',tail:'A6-EUF',icao24:'89645B',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','superjumbo','widebody'],notes:'Emirates flies the world\'s largest Airbus A380 fleet. A6-EUF wears the current livery with the UAE flag on the tail.',sightings:[]},
  // ── World airlines & special liveries ──
  {id:39,airline:'All Nippon Airways',tail:'JA791A',icao24:'8694D8',type:'Boeing 777-300ER',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','widebody'],notes:'All Nippon Airways (ANA), Japan\'s largest carrier, in the current blue Triton livery on a Boeing 777-300ER.',sightings:[]},
  {id:40,airline:'Korean Air',tail:'HL7644',icao24:'71BE44',type:'Boeing 747-8',era:'2010s',livery:'Current',colors:['#1B4DA1','#7AB3E0','#FFFFFF'],tags:['current','jumbo','widebody'],notes:'Korean Air\'s sky-blue livery on a Boeing 747-8 Intercontinental — among the last passenger 747s ever built.',sightings:[]},
  {id:41,airline:'Asiana Airlines',tail:'HL8359',icao24:'71C359',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#CF112A','#6E6F72','#FFFFFF'],tags:['current','widebody'],notes:'Asiana Airlines of South Korea in the current livery on an Airbus A350-900.',sightings:[]},
  {id:42,airline:'China Airlines',tail:'B-18053',icao24:'899019',type:'Boeing 777-300ER',era:'2010s',livery:'Plum blossom (current)',colors:['#C8102E','#E8E0CF','#1A3C6E'],tags:['current','widebody'],notes:'Taiwan\'s China Airlines in the "plum blossom" livery on a Boeing 777-300ER.',sightings:[]},
  {id:43,airline:'EVA Air',tail:'B-16708',icao24:'8990D7',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#005E3C','#F0A800','#FFFFFF'],tags:['current','widebody'],notes:'EVA Air of Taiwan in its green-and-orange livery on a Boeing 777-300ER.',sightings:[]},
  {id:44,airline:'Thai Airways',tail:'HS-TUD',icao24:'8852A4',type:'Airbus A380',era:'2010s',livery:'Royal Orchid',colors:['#4B186C','#D4A017','#E5007E'],tags:['retired','superjumbo','rare','widebody'],notes:'Thai Airways International in the purple-and-gold "Royal Orchid" livery on an Airbus A380. Thai parked its six A380s in 2020 and has since retired the type.',sightings:[]},
  {id:45,airline:'Malaysia Airlines',tail:'9M-MNA',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#C8102E','#003B7A','#FFFFFF'],tags:['retired','superjumbo','rare','widebody'],notes:'Malaysia Airlines flew six Airbus A380s — 9M-MNA was the first delivered, in 2012 — wearing the blue-wave livery with the kite tail. The whole fleet was retired by 2022, making this a historical catch.',sightings:[]},
  {id:46,airline:'Air India',tail:'VT-ANP',icao24:'800736',type:'Boeing 787-8',era:'2010s',livery:'Konark sun (previous)',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['dreamliner','widebody'],notes:'Air India Boeing 787-8 VT-ANP in the previous (2007–2023) livery — the red "Konark sun" chakra and flying-swan emblem on the tail — being phased out as the Tata-era fleet is repainted.',sightings:[]},
  {id:47,airline:'Saudia',tail:'HZ-AK28',icao24:'710106',type:'Boeing 777-300ER',era:'2020s',livery:'75th Anniversary Retro',colors:['#005430','#7BA05B','#FFFFFF'],tags:['special','retro','widebody'],notes:'Saudia Boeing 777-300ER HZ-AK28 in the "75 Years" retro livery — the airline\'s original 1970s scheme with a lime-green cheatline and a large "75" on the fuselage, applied in 2021 for its 75th anniversary.',sightings:[]},
  {id:48,airline:'Air New Zealand',tail:'ZK-OKQ',icao24:'C81E22',type:'Boeing 777-300ER',era:'2010s',livery:'All Blacks (black)',colors:['#0E0E0E','#1A1A1A','#FFFFFF'],tags:['special','all blacks','rare','widebody'],notes:'Air New Zealand\'s striking all-black "All Blacks" livery, honouring the national rugby team, on a Boeing 777-300ER.',sightings:[]},
  {id:49,airline:'LATAM',tail:'CC-BGO',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'LATAM, South America\'s largest airline group, in the indigo-and-coral livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:50,airline:'Avianca',tail:'N697AV',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D5121E','#FFFFFF','#A6A6A6'],tags:['current','narrowbody'],notes:'Avianca of Colombia, one of the world\'s oldest airlines, in the current red livery on an Airbus A321.',sightings:[]},
  {id:51,airline:'Aeroméxico',tail:'XA-ADL',icao24:'0D09D0',type:'Boeing 787-9',era:'2010s',livery:'Quetzalcóatl',colors:['#0B2B5B','#FFFFFF','#E40521'],tags:['special','dreamliner','widebody'],notes:'Aeroméxico Boeing 787-9 XA-ADL in the elaborate "Quetzalcóatl" special livery — a blue-and-white feathered-serpent design wrapping the fuselage, introduced in 2016 to showcase Mexican art and culture.',sightings:[]},
  {id:52,airline:'Iberia',tail:'EC-MXV',icao24:'34604E',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','widebody'],notes:'Spain\'s flag carrier Iberia in the red-and-yellow livery on an Airbus A350-900.',sightings:[]},
  {id:53,airline:'Swiss',tail:'HB-JNA',icao24:'4B1916',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D8232A','#FFFFFF','#A6A6A6'],tags:['current','widebody'],notes:'SWISS, the flag carrier of Switzerland, in the red livery with the Swiss cross on a Boeing 777-300ER.',sightings:[]},
  {id:54,airline:'Austrian Airlines',tail:'OE-LPF',icao24:'4408FB',type:'Boeing 777-200ER',era:'2020s',livery:'Johann Strauss 200',colors:['#D80B16','#FFFFFF','#A6A6A6'],tags:['special','widebody'],notes:'Austrian Airlines Boeing 777-200ER OE-LPF wearing the "Johann Strauss 200" special decals applied in 2025 — a silhouette of the composer with violin and headphones — marking the 200th anniversary of the "Waltz King\'s" birth.',sightings:[]},
  {id:55,airline:'TAP Air Portugal',tail:'CS-TUA',icao24:'4952A1',type:'Airbus A330-900',era:'2010s',livery:'A330neo launch',colors:['#00A04A','#E4002B','#FFFFFF'],tags:['special','widebody'],notes:'TAP Air Portugal CS-TUA — the world\'s first Airbus A330neo — in the standard livery carrying large "A330neo" launch titles marking the type\'s 2018 entry into service.',sightings:[]},
  {id:56,airline:'SAS Scandinavian Airlines',tail:'LN-RKT',icao24:'47880D',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#003D87','#FFFFFF','#A6A6A6'],tags:['current','widebody'],notes:'SAS Scandinavian Airlines in the blue livery on an Airbus A330-300.',sightings:[]},
  {id:57,airline:'El Al',tail:'4X-EDA',icao24:'7380C0',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#003DA5','#FFFFFF','#A6A6A6'],tags:['current','dreamliner','widebody'],notes:'El Al Israel Airlines in the blue livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:58,airline:'Hawaiian Airlines',tail:'N380HA',icao24:'A45BFA',type:'Airbus A330-200',era:'2010s',livery:'Pualani (current)',colors:['#4C1F7A','#E6007E','#F5A800'],tags:['current','widebody'],notes:'Hawaiian Airlines, with the "Pualani" island-girl tail, on an Airbus A330-200.',sightings:[]},
  {id:59,airline:'Frontier Airlines',tail:'N705FR',icao24:'A967AE',type:'Airbus A321',era:'2010s',livery:'Animal tail (current)',colors:['#00754A','#FFFFFF','#6CC24A'],tags:['current','animal','narrowbody'],notes:'Frontier Airlines, famous for the wild-animal portraits on each tail, on an Airbus A321.',sightings:[]},
  {id:60,airline:'Vietnam Airlines',tail:'VN-A868',icao24:'8880F8',type:'Boeing 787-9',era:'2020s',livery:'Chim Lạc (Lạc Bird)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['special','dreamliner','widebody'],notes:'Vietnam Airlines Boeing 787-9 VN-A868 in the special "Chim Lạc" (Lạc Bird) livery — golden Đông Sơn-drum birds flowing along the fuselage in place of the standard lotus tail — unveiled in April 2025 for the airline\'s 30th anniversary.',sightings:[]},
  {id:61,airline:'Philippine Airlines',tail:'RP-C7779',icao24:'7583EC',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#00308F','#CE1126','#FCD116'],tags:['current','widebody'],notes:'Philippine Airlines, Asia\'s first commercial airline, on a Boeing 777-300ER.',sightings:[]},
  {id:62,airline:'Garuda Indonesia',tail:'PK-GIG',icao24:'8A0452',type:'Boeing 777-300ER',era:'2020s',livery:'Republik Indonesia',colors:['#C8102E','#FFFFFF','#0E8A3C'],tags:['special','widebody'],notes:'Garuda Indonesia Boeing 777-300ER PK-GIG in the red-and-white "Republik Indonesia" scheme — a government/state-charter livery carrying the national flag and the Garuda Pancasila emblem, applied in 2020.',sightings:[]},
  {id:63,airline:'Air China',tail:'B-2485',icao24:'780CB6',type:'Boeing 747-8',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','jumbo','widebody'],notes:'Air China in the red livery with the gold phoenix logo on a Boeing 747-8 Intercontinental.',sightings:[]},
  {id:64,airline:'China Southern',tail:'B-6137',type:'Airbus A380',era:'2010s',livery:'Kapok',colors:['#0066B3','#E4002B','#FFFFFF'],tags:['retired','superjumbo','rare','widebody'],notes:'China Southern, with the red kapok-flower logo, on an Airbus A380 — it was China\'s only A380 operator, retiring all five in 2022.',sightings:[]},
  {id:65,airline:'Ethiopian Airlines',tail:'ET-AUO',icao24:'040140',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#15803C','#E4A400','#D5121E'],tags:['current','dreamliner','widebody'],notes:'Ethiopian Airlines, Africa\'s largest carrier, in the green-yellow-red livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:66,airline:'Icelandair',tail:'TF-FIP',type:'Boeing 757-200',era:'2010s',livery:'Current',colors:['#0A2240','#00B5E2','#FFFFFF'],tags:['current','narrowbody'],notes:'Icelandair, a longtime 757 operator, in the dark-blue livery with the aurora tail, suited to its North Atlantic network.',sightings:[]},
  {id:67,airline:'Aegean Airlines',tail:'SX-DVO',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#003B7A','#0091D2','#FFFFFF'],tags:['current','narrowbody'],notes:'Aegean Airlines, the flag carrier of Greece, in the blue livery on an Airbus A321.',sightings:[]},
  {id:68,airline:'easyJet',tail:'G-EZWA',icao24:'406752',type:'Airbus A320',era:'2010s',livery:'Current (orange)',colors:['#FF6600','#FFFFFF','#5A5A5A'],tags:['current','low-cost','narrowbody'],notes:'easyJet, a major European low-cost carrier, in its bright-orange livery on an Airbus A320.',sightings:[]},
  {id:69,airline:'Wizz Air',tail:'HA-LXA',icao24:'471F62',type:'Airbus A321',era:'2010s',livery:'Current (magenta)',colors:['#C6007E','#5A2D81','#FFFFFF'],tags:['current','low-cost','narrowbody'],notes:'Wizz Air, the ultra-low-cost carrier of Central Europe, in magenta and purple on an Airbus A321.',sightings:[]},
  {id:70,airline:'Virgin Australia',tail:'VH-VOZ',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#C8102E','#5A2D81','#FFFFFF'],tags:['retired','widebody','rare'],notes:'Virgin Australia flew five Boeing 777-300ERs to Los Angeles until it retired its widebody fleet in 2020 to focus on a domestic 737 network.',sightings:[]},
  {id:71,airline:'Oman Air',tail:'A4O-SC',icao24:'70C0EE',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#6E2639','#C8A04B','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Oman Air, the flag carrier of the Sultanate of Oman, on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:72,airline:'Royal Air Maroc',tail:'CN-RGV',icao24:'02012C',type:'Boeing 737-800',era:'2010s',livery:'60 Years',colors:['#C8102E','#0A7D4B','#FFFFFF'],tags:['special','narrowbody'],notes:'Royal Air Maroc Boeing 737-800 CN-RGV in the colourful "60 Years" anniversary livery — a multi-colour confetti/dot motif marking the Moroccan flag carrier\'s 60th anniversary (founded 1957).',sightings:[]},
  {id:73,airline:'SriLankan Airlines',tail:'4R-ALR',icao24:'770592',type:'Airbus A330-300',era:'2010s',livery:'Peacock (current)',colors:['#16284C','#C8A04B','#1E8A8A'],tags:['current','widebody'],notes:'SriLankan Airlines, with the stylised peacock on the tail, on an Airbus A330-300.',sightings:[]},
  {id:74,airline:'American Airlines',tail:'N905NN',icao24:'AC82F8',type:'Boeing 737-800',era:'2010s',livery:'AstroJet retro',colors:['#C0C0C0','#E4002B','#0078D2'],tags:['retro','heritage','astrojet','narrowbody'],notes:'A heritage "AstroJet" retrojet — American 737-800 N905NN wears the polished-silver scheme with red lightning stripe from American\'s 1960s jet age.',sightings:[]},
  {id:79,airline:'United Airlines',tail:'N218UA',icao24:'A1D8FD',type:'Boeing 777-200ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'United 777-200ER N218UA in the Star Alliance livery, marking United\'s membership in the global airline alliance.',sightings:[]},
  {id:82,airline:'Alaska Airlines',tail:'N265AK',icao24:'A2919A',type:'Boeing 737-900ER',era:'2010s',livery:'Honoring Those Who Serve',colors:['#01426A','#C8102E','#FFFFFF'],tags:['special','tribute','rare','narrowbody'],notes:'Alaska Airlines\' "Honoring Those Who Serve" livery, dedicated to the U.S. military, on a Boeing 737-900ER.',sightings:[]},
  {id:83,airline:'Southwest Airlines',tail:'N214WN',icao24:'A1CA5F',type:'Boeing 737-700',era:'2010s',livery:'Maryland One',colors:['#000000','#E4002B','#F9B612'],tags:['special','state','heart','narrowbody'],notes:'"Maryland One" — Southwest 737-700 N214WN painted in the Maryland state flag, one of the airline\'s state-pride specials.',sightings:[]},
  {id:84,airline:'Southwest Airlines',tail:'N945WN',icao24:'AD21BC',type:'Boeing 737-700',era:'2010s',livery:'Florida One',colors:['#F9A01B','#0067A0','#E4002B'],tags:['special','state','heart','narrowbody'],notes:'"Florida One" — a Southwest 737-700 wearing a sunshine-state design, complete with an orange-juice nose.',sightings:[]},
  {id:87,airline:'Qantas',tail:'VH-XZJ',icao24:'7C77FD',type:'Boeing 737-800',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','roo','narrowbody'],notes:'A Qantas Boeing 737-800 in the current red "Flying Kangaroo" livery — the workhorse of its domestic fleet.',sightings:[]},
  {id:88,airline:'Qantas',tail:'VH-XZP',icao24:'7C7803',type:'Boeing 737-800',era:'2010s',livery:'Retro Roo II',colors:['#D86A1E','#E4A400','#C8102E'],tags:['retro','heritage','roo','narrowbody'],notes:'"Retro Roo II" — a Qantas 737-800 painted in the ochre-and-orange 1971 livery, a tribute to the airline\'s jet-age past.',sightings:[]},
  {id:89,airline:'British Airways',tail:'G-EUPJ',icao24:'400879',type:'Airbus A319',era:'2010s',livery:'BEA retro',colors:['#C8102E','#1A1A1A','#FFFFFF'],tags:['retro','heritage','BEA','narrowbody'],notes:'For BA\'s centenary in 2019, Airbus A319 G-EUPJ was painted in the red-and-black livery of British European Airways (BEA), a BA predecessor.',sightings:[]},
  // ── Fleet depth: more types & liveries per airline ──
  {id:200,airline:'Air France',tail:'F-HRBA',icao24:'39C420',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','dreamliner','widebody'],notes:'Air France\'s Boeing 787-9 Dreamliner in the blue-white-and-red livery.',sightings:[]},
  {id:201,airline:'Air France',tail:'F-GSPZ',icao24:'3949F9',type:'Boeing 777-200ER',era:'2000s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','widebody'],notes:'An Air France Boeing 777-200ER, a long-haul mainstay.',sightings:[]},
  {id:202,airline:'Air France',tail:'F-HZUA',icao24:'39E680',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','narrowbody'],notes:'Air France\'s Airbus A220-300, the modern backbone of its short-haul fleet.',sightings:[]},
  {id:203,airline:'Aer Lingus',tail:'EI-EDY',type:'Airbus A330-300',era:'2010s',livery:'Shamrock (current)',colors:['#006272','#FFFFFF','#9CA299'],tags:['current','shamrock','widebody'],notes:'An Aer Lingus Airbus A330-300 on the transatlantic run, with the teal shamrock tail.',sightings:[]},
  {id:204,airline:'Aer Lingus',tail:'EI-LRA',icao24:'4CA9BA',type:'Airbus A321neo LR',era:'2020s',livery:'Shamrock (current)',colors:['#006272','#FFFFFF','#9CA299'],tags:['current','shamrock','narrowbody'],notes:'Aer Lingus uses the long-range Airbus A321neo LR to fly narrowbody transatlantic routes.',sightings:[]},
  {id:205,airline:'Air India',tail:'VT-EXF',icao24:'800BD4',type:'Airbus A320neo',era:'2020s',livery:'New (2023)',colors:['#D31247','#8E2D6B','#C49A3A'],tags:['current','narrowbody'],notes:'An Air India Airbus A320neo in the new 2023 Tata-era livery — red "AIR INDIA" titles with the gold-and-magenta "The Vista" tail — the current fleet standard.',sightings:[]},
  {id:206,airline:'Air New Zealand',tail:'ZK-NZE',icao24:'C820D1',type:'Boeing 787-9',era:'2010s',livery:'Black (current)',colors:['#0E0E0E','#1A1A1A','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Air New Zealand\'s sleek all-black livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:208,airline:'Alaska Airlines',tail:'N932AK',icao24:'ACED21',type:'Boeing 737 MAX 9',era:'2020s',livery:'West Coast Wonders (Orca)',colors:['#01426A','#00467F','#76858F'],tags:['special','narrowbody'],notes:'Alaska Airlines Boeing 737-9 MAX N932AK in the blue full-body "West Coast Wonders" (Orca) special livery — three orcas along the fuselage and a breaching orca on the tail — unveiled in 2022 to spotlight the airline\'s environmental commitment.',sightings:[]},
  {id:209,airline:'All Nippon Airways',tail:'JA381A',icao24:'852A24',type:'Airbus A380',era:'2020s',livery:'Flying Honu (blue)',colors:['#0A4DA0','#00A1E0','#FFFFFF'],tags:['special','superjumbo','honu','rare','widebody'],notes:'ANA\'s "Flying Honu" Airbus A380, painted as a Hawaiian green sea turtle, on the Tokyo–Honolulu route. JA381A is the blue "Lani" jet.',sightings:[]},
  {id:210,airline:'All Nippon Airways',tail:'JA882A',icao24:'86EB2E',type:'Boeing 787-9',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'An ANA Boeing 787-9 in the blue Triton livery — ANA is the largest 787 operator in the world.',sightings:[]},
  {id:211,airline:'American Airlines',tail:'N791AN',icao24:'AABBC9',type:'Boeing 777-300ER',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'American 777-300ER N791AN in the grey "oneworld" alliance livery.',sightings:[]},
  {id:212,airline:'Asiana Airlines',tail:'HL7775',icao24:'71BF75',type:'Boeing 777-200ER',era:'2010s',livery:'Current',colors:['#CF112A','#6E6F72','#FFFFFF'],tags:['current','widebody'],notes:'An Asiana Airlines Boeing 777-200ER.',sightings:[]},
  {id:213,airline:'Austrian Airlines',tail:'OE-LWP',icao24:'44082C',type:'Embraer 195',era:'2010s',livery:'Current',colors:['#D80B16','#FFFFFF','#A6A6A6'],tags:['current','regional','narrowbody'],notes:'An Austrian Airlines Embraer 195 on European regional routes.',sightings:[]},
  {id:214,airline:'Austrian Airlines',tail:'OE-LBP',icao24:'44001C',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#D80B16','#FFFFFF','#A6A6A6'],tags:['current','narrowbody'],notes:'An Austrian Airlines Airbus A320 in the red-and-white livery.',sightings:[]},
  {id:215,airline:'British Airways',tail:'G-ZBKA',icao24:'406D77',type:'Boeing 787-9',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'A British Airways Boeing 787-9 Dreamliner in the current Chatham Dockyard livery.',sightings:[]},
  {id:216,airline:'British Airways',tail:'G-XWBA',icao24:'4076E8',type:'Airbus A350-1000',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','widebody'],notes:'G-XWBA was British Airways\' first Airbus A350-1000, the flagship of its modern long-haul fleet.',sightings:[]},
  {id:217,airline:'British Airways',tail:'G-STBA',icao24:'40621B',type:'Boeing 777-300ER',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','widebody'],notes:'A British Airways Boeing 777-300ER in the current livery.',sightings:[]},
  {id:218,airline:'Cathay Pacific',tail:'B-LRA',icao24:'780A9B',type:'Airbus A350-900',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','widebody','brushwing'],notes:'A Cathay Pacific Airbus A350-900 in the green brushwing livery.',sightings:[]},
  {id:219,airline:'China Airlines',tail:'B-18917',icao24:'8990EC',type:'Airbus A350-900',era:'2010s',livery:'Plum blossom (current)',colors:['#C8102E','#E8E0CF','#1A3C6E'],tags:['current','widebody'],notes:'A China Airlines Airbus A350-900 in the plum-blossom livery.',sightings:[]},
  {id:220,airline:'China Airlines',tail:'B-18206',type:'Boeing 747-400',era:'2000s',livery:'Plum blossom (current)',colors:['#C8102E','#E8E0CF','#1A3C6E'],tags:['jumbo','widebody'],notes:'A China Airlines Boeing 747-400 — the carrier flew the passenger 747-400 until retiring the type in 2021.',sightings:[]},
  {id:221,airline:'China Southern',tail:'B-2725',icao24:'780708',type:'Boeing 787-8',era:'2010s',livery:'Wings of Dreams',colors:['#0066B3','#3AA6DC','#FFFFFF'],tags:['special','dreamliner','widebody'],notes:'China Southern Boeing 787-8 B-2725 — China\'s first 787 — in the special blue "Wings of Dreams" livery, with sweeping egret-wing artwork along the fuselage and the red kapok-flower tail logo.',sightings:[]},
  {id:222,airline:'Delta Air Lines',tail:'N401DZ',icao24:'A4B0BB',type:'Airbus A330-900',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','widebody'],notes:'A Delta Airbus A330-900neo in the current widget livery.',sightings:[]},
  {id:223,airline:'Delta Air Lines',tail:'N935AT',icao24:'ACF84E',type:'Boeing 717-200',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','narrowbody'],notes:'Delta operates the largest Boeing 717 fleet in the world on short domestic hops.',sightings:[]},
  {id:224,airline:'Delta Air Lines',tail:'N101DU',icao24:'A008C9',type:'Airbus A220-100',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','narrowbody'],notes:'N101DU was Delta\'s first Airbus A220-100.',sightings:[]},
  {id:225,airline:'easyJet',tail:'G-UZHA',icao24:'4072C7',type:'Airbus A320neo',era:'2010s',livery:'Current (orange)',colors:['#FF6600','#FFFFFF','#5A5A5A'],tags:['current','low-cost','narrowbody'],notes:'An easyJet Airbus A320neo in the bright-orange livery.',sightings:[]},
  {id:226,airline:'easyJet',tail:'G-EZBT',icao24:'400FE3',type:'Airbus A319',era:'2010s',livery:'Current (orange)',colors:['#FF6600','#FFFFFF','#5A5A5A'],tags:['current','low-cost','narrowbody'],notes:'An easyJet Airbus A319, long the mainstay of its fleet.',sightings:[]},
  {id:227,airline:'El Al',tail:'4X-EKU',icao24:'738058',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#003DA5','#FFFFFF','#A6A6A6'],tags:['current','narrowbody'],notes:'An El Al Boeing 737-800 on short- and medium-haul routes.',sightings:[]},
  {id:229,airline:'Emirates',tail:'A6-ENV',icao24:'896318',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','widebody'],notes:'Emirates flies the world\'s largest Boeing 777 fleet; A6-ENV is a 777-300ER.',sightings:[]},
  {id:230,airline:'Ethiopian Airlines',tail:'ET-ASK',icao24:'040105',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#15803C','#E4A400','#D5121E'],tags:['current','widebody'],notes:'An Ethiopian Airlines Boeing 777-300ER.',sightings:[]},
  {id:231,airline:'Ethiopian Airlines',tail:'ET-AVC',icao24:'04014C',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#15803C','#E4A400','#D5121E'],tags:['current','widebody'],notes:'An Ethiopian Airlines Airbus A350-900, the flagship of Africa\'s largest carrier.',sightings:[]},
  {id:232,airline:'Etihad Airways',tail:'A6-BMI',icao24:'89656E',type:'Boeing 787-10',era:'2010s',livery:'Current',colors:['#BD8B13','#4A4A4A','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Etihad Airways\' Boeing 787-10 Dreamliner, the largest of the 787 family.',sightings:[]},
  {id:233,airline:'Etihad Airways',tail:'A6-API',icao24:'89649D',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#BD8B13','#4A4A4A','#FFFFFF'],tags:['current','superjumbo','widebody'],notes:'An Etihad Airways Airbus A380 — home to "The Residence", a three-room suite.',sightings:[]},
  {id:234,airline:'EVA Air',tail:'B-16722',icao24:'8990E4',type:'Boeing 777-300ER',era:'2010s',livery:'Hello Kitty',colors:['#E89AC7','#005E3C','#FFFFFF'],tags:['special','hello kitty','rare','widebody'],notes:'EVA Air\'s famous Hello Kitty jet — a Boeing 777-300ER covered in Sanrio characters inside and out.',sightings:[]},
  {id:235,airline:'EVA Air',tail:'B-17881',icao24:'89907B',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#005E3C','#F0A800','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'An EVA Air Boeing 787-9 in the green-and-orange livery.',sightings:[]},
  {id:236,airline:'Finnair',tail:'OH-LTO',icao24:'461F08',type:'Airbus A330-300',era:'2010s',livery:'Marimekko (Unikko)',colors:['#FFFFFF','#C8102E','#0B1560'],tags:['special','marimekko','widebody'],notes:'Finnair Airbus A330-300 OH-LTO in the Marimekko "Unikko" (poppy) special livery — the bold floral pattern on the rear fuselage celebrating Finnair\'s long design partnership with Marimekko.',sightings:[]},
  {id:237,airline:'Finnair',tail:'OH-LWL',icao24:'461F53',type:'Airbus A350-900',era:'2010s',livery:'Marimekko (Kivet)',colors:['#0B1560','#3A6FB0','#FFFFFF'],tags:['special','marimekko','widebody'],notes:'A Finnair Airbus A350 wearing the Marimekko "Kivet" (stones) pattern — a collaboration with the Finnish design house.',sightings:[]},
  {id:238,airline:'Frontier Airlines',tail:'N701FR',icao24:'A958D2',type:'Airbus A321',era:'2010s',livery:'Animal tail (current)',colors:['#00754A','#FFFFFF','#6CC24A'],tags:['current','animal','narrowbody'],notes:'A Frontier Airbus A321; each Frontier jet carries a different wild-animal portrait on its tail.',sightings:[]},
  {id:239,airline:'Frontier Airlines',tail:'N230FR',icao24:'A2090D',type:'Airbus A320',era:'2010s',livery:'Animal tail (current)',colors:['#00754A','#FFFFFF','#6CC24A'],tags:['current','animal','narrowbody'],notes:'A Frontier Airbus A320 with one of the airline\'s signature animal tails.',sightings:[]},
  {id:240,airline:'Garuda Indonesia',tail:'PK-GPA',icao24:'8A0037',type:'Airbus A330-300',era:'2010s',livery:'Cargo',colors:['#1A6AAE','#0E8A3C','#FFFFFF'],tags:['special','widebody'],notes:'A Garuda Indonesia Airbus A330-300 in the "Cargo" livery — the standard Garuda scheme with large "CARGO" titles, used for freight operations.',sightings:[]},
  {id:241,airline:'Hawaiian Airlines',tail:'N202HA',icao24:'A19A21',type:'Airbus A321neo',era:'2010s',livery:'Pualani (current)',colors:['#4C1F7A','#E6007E','#F5A800'],tags:['current','narrowbody'],notes:'A Hawaiian Airlines Airbus A321neo, used on US-mainland routes.',sightings:[]},
  {id:242,airline:'Hawaiian Airlines',tail:'N480HA',icao24:'A5E949',type:'Boeing 717-200',era:'2010s',livery:'Pualani (current)',colors:['#4C1F7A','#E6007E','#F5A800'],tags:['current','narrowbody'],notes:'Hawaiian flies Boeing 717s on short inter-island hops across the Hawaiian islands.',sightings:[]},
  {id:243,airline:'Iberia',tail:'EC-MAA',icao24:'344503',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','widebody'],notes:'An Iberia Airbus A330-300 in the red-and-yellow livery.',sightings:[]},
  {id:244,airline:'Lufthansa',tail:'D-AIXD',icao24:'3C6704',type:'Airbus A350-900',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','widebody'],notes:'A Lufthansa Airbus A350-900 in the navy-and-yellow crane livery.',sightings:[]},
  {id:245,airline:'Lufthansa',tail:'D-ABVM',icao24:'3C4ACD',type:'Boeing 747-400',era:'2000s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['jumbo','widebody'],notes:'A Lufthansa Boeing 747-400 — Lufthansa was the largest operator of the passenger 747-400.',sightings:[]},
  {id:246,airline:'KLM',tail:'PH-BHA',icao24:'4851AD',type:'Boeing 787-9',era:'2010s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','dreamliner','widebody'],notes:'PH-BHA was KLM\'s first Boeing 787-9 Dreamliner.',sightings:[]},
  {id:247,airline:'Singapore Airlines',tail:'9V-SWA',type:'Boeing 777-300ER',era:'2000s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','widebody'],notes:'A Singapore Airlines Boeing 777-300ER.',sightings:[]},
  {id:248,airline:'Singapore Airlines',tail:'9V-SMF',icao24:'76CDA6',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','widebody'],notes:'A Singapore Airlines Airbus A350-900, used on some of the world\'s longest flights.',sightings:[]},
  {id:249,airline:'Qatar Airways',tail:'A7-ALA',icao24:'06A0F5',type:'Airbus A350-900',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','widebody','oryx'],notes:'A7-ALA was the world\'s first Airbus A350 in service, delivered to Qatar Airways in 2014.',sightings:[]},
  {id:250,airline:'Qatar Airways',tail:'A7-APA',icao24:'06A142',type:'Airbus A380',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','superjumbo','widebody'],notes:'A7-APA was Qatar Airways\' first Airbus A380.',sightings:[]},
  {id:251,airline:'Turkish Airlines',tail:'TC-LLA',icao24:'4BB181',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','dreamliner','widebody'],notes:'A Turkish Airlines Boeing 787-9 Dreamliner.',sightings:[]},
  {id:252,airline:'Japan Airlines',tail:'JA01XJ',icao24:'8406E8',type:'Airbus A350-900',era:'2010s',livery:'Tsurumaru (current)',colors:['#C8102E','#FFFFFF','#B0B0B0'],tags:['current','widebody','crane'],notes:'JA01XJ was Japan Airlines\' first Airbus A350-900, with the red Tsurumaru crane.',sightings:[]},
  {id:253,airline:'Virgin Atlantic',tail:'G-VLUX',icao24:'4075B3',type:'Airbus A350-1000',era:'2010s',livery:'Current',colors:['#E10A0A','#FFFFFF','#4B0082'],tags:['current','widebody'],notes:'A Virgin Atlantic Airbus A350-1000, the modern flagship of the Virgin fleet.',sightings:[]},
  {id:254,airline:'JetBlue',tail:'N2002J',icao24:'A194AA',type:'Airbus A321neo',era:'2010s',livery:'Current',colors:['#003876','#FFFFFF','#6CACE4'],tags:['current','narrowbody'],notes:'A JetBlue Airbus A321neo, used on transcon and transatlantic routes.',sightings:[]},
  {id:255,airline:'Air Canada',tail:'C-FIVR',icao24:'C01754',type:'Boeing 777-300ER',era:'2000s',livery:'Maple Leaf (2004)',colors:['#D8222A','#FFFFFF','#00857D'],tags:['retro','widebody'],notes:'An Air Canada Boeing 777-300ER, C-FIVR, still in the pre-2017 "Maple Leaf" livery — white with the red maple-leaf tail — rather than the current black-and-red scheme.',sightings:[]},
  {id:256,airline:'Korean Air',tail:'HL8348',icao24:'71C348',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#1B4DA1','#7AB3E0','#FFFFFF'],tags:['current','narrowbody'],notes:'A Korean Air Boeing 737-8 MAX.',sightings:[]},
  {id:257,airline:'Korean Air',tail:'HL8081',icao24:'71C081',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#1B4DA1','#7AB3E0','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'A Korean Air Boeing 787-9 Dreamliner.',sightings:[]},
  // ── Big-carrier fleet depth (live-hydrated by reg via the photo API) ──
  {id:300,airline:'Air Canada',tail:'C-GROV',icao24:'C0730E',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'The Airbus A220-300 has become a cornerstone of Air Canada\'s narrowbody fleet, with dozens in service.',sightings:[]},
  {id:301,airline:'Air Canada',tail:'C-GFUR',icao24:'C053F6',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','widebody'],notes:'An Air Canada Airbus A330-300, a long-haul workhorse on transatlantic and high-density routes.',sightings:[]},
  {id:302,airline:'Air Canada',tail:'C-FSDB',icao24:'C02FD8',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Boeing 737 MAX 8, flown on domestic, US and transatlantic sectors.',sightings:[]},
  {id:303,airline:'Air Canada',tail:'C-FIVK',icao24:'C0174D',type:'Boeing 777-200LR',era:'2000s',livery:'Maple Leaf (2004)',colors:['#D8222A','#FFFFFF','#00857D'],tags:['retro','widebody'],notes:'Air Canada Boeing 777-200LR C-FIVK — an ultra-long-range twin — still wearing the pre-2017 "Maple Leaf" livery with the red maple-leaf tail and "Air Canada" titles, an increasingly rare sight.',sightings:[]},
  {id:304,airline:'Air Canada',tail:'C-GHPQ',icao24:'C058BB',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'An Air Canada Boeing 787-8 Dreamliner in the red-and-black livery.',sightings:[]},
  {id:305,airline:'American Airlines',tail:'N304RB',icao24:'A32FA7',type:'Boeing 737 MAX 8',era:'2020s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Boeing 737 MAX 8, a core narrowbody of its domestic fleet.',sightings:[]},
  {id:306,airline:'American Airlines',tail:'N803NN',icao24:'AAEE3B',type:'Boeing 737-800',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'A standard-livery American Airlines Boeing 737-800 — the backbone of its narrowbody fleet.',sightings:[]},
  {id:307,airline:'American Airlines',tail:'N835AN',icao24:'AB6AFA',type:'Boeing 787-9',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','dreamliner','widebody'],notes:'An American Airlines Boeing 787-9 Dreamliner on long-haul international routes.',sightings:[]},
  {id:308,airline:'American Airlines',tail:'N93003',icao24:'ACE81D',type:'Airbus A319',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Airbus A319 in the 2013 \'New American\' livery.',sightings:[]},
  {id:309,airline:'American Airlines',tail:'N400AN',icao24:'A4ACAE',type:'Airbus A321neo',era:'2020s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Airbus A321neo, the largest of its single-aisle fleet.',sightings:[]},
  {id:310,airline:'United Airlines',tail:'N66825',icao24:'A8D4AD',type:'Boeing 737-900ER',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Airlines Boeing 737-900ER in the blue globe livery.',sightings:[]},
  {id:311,airline:'United Airlines',tail:'N653UA',icao24:'A899A2',type:'Boeing 767-300ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'United Boeing 767-300ER N653UA in the Star Alliance livery — the dark-blue-and-white scheme with the alliance star motif marking United\'s membership in the global airline alliance.',sightings:[]},
  {id:312,airline:'United Airlines',tail:'N13014',icao24:'A07DC9',type:'Boeing 787-10',era:'2020s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','dreamliner','widebody'],notes:'A United Boeing 787-10 Dreamliner, the largest of the 787 family.',sightings:[]},
  {id:313,airline:'Delta Air Lines',tail:'N844MH',icao24:'AB8FD0',type:'Boeing 767-400ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widebody'],notes:'Delta is the world\'s only passenger operator of the Boeing 767-400ER.',sightings:[]},
  {id:314,airline:'British Airways',tail:'G-ZBLB',icao24:'4078DE',type:'Boeing 787-10',era:'2020s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'A British Airways Boeing 787-10 Dreamliner in the Chatham Dockyard livery.',sightings:[]},
  {id:315,airline:'Lufthansa',tail:'D-ABPB',icao24:'3C4A02',type:'Boeing 787-9',era:'2020s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','dreamliner','widebody'],notes:'A Lufthansa Boeing 787-9 Dreamliner — a recent addition to its long-haul fleet.',sightings:[]},
  {id:316,airline:'Lufthansa',tail:'D-AIND',icao24:'3C65C4',type:'Airbus A320neo',era:'2020s',livery:'100th Anniversary (1926–2026)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['special','narrowbody'],notes:'Lufthansa Airbus A320neo D-AIND in the special all-navy "100th Anniversary" livery — white "Lufthansa" titles with a "1926–2026" centennial marking — applied in 2026 for the airline\'s centenary.',sightings:[]},
  {id:317,airline:'Lufthansa',tail:'D-AIHW',icao24:'3C6517',type:'Airbus A340-600',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','widebody'],notes:'Lufthansa is one of the last operators of the stretched, four-engined Airbus A340-600.',sightings:[]},
  {id:318,airline:'Air France',tail:'F-HEPA',icao24:'3991E0',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','narrowbody'],notes:'An Air France Airbus A320 on European short-haul routes.',sightings:[]},
  {id:319,airline:'Air France',tail:'F-GZCA',icao24:'396440',type:'Airbus A330-200',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','widebody'],notes:'An Air France Airbus A330-200 widebody.',sightings:[]},
  {id:320,airline:'Air France',tail:'F-HUVA',icao24:'39D2A0',type:'Airbus A350-900',era:'2020s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','widebody'],notes:'An Air France Airbus A350-900, the modern flagship of its long-haul fleet.',sightings:[]},
  {id:321,airline:'Emirates',tail:'A6-EWA',icao24:'896173',type:'Boeing 777-200LR',era:'2010s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','widebody'],notes:'Emirates\' Boeing 777-200LR — for years the world\'s longest-range airliner — on ultra-long routes.',sightings:[]},
  {id:322,airline:'Emirates',tail:'A6-EXA',icao24:'89661E',type:'Airbus A350-900',era:'2020s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','widebody'],notes:'Emirates began taking Airbus A350-900s in 2024, broadening a fleet long built around the A380 and 777.',sightings:[]},
  {id:323,airline:'Qatar Airways',tail:'A7-ANA',icao24:'06A11D',type:'Airbus A350-1000',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','widebody'],notes:'Qatar Airways was the launch customer of the Airbus A350-1000.',sightings:[]},
  {id:324,airline:'Qatar Airways',tail:'A7-BEG',icao24:'06A1BD',type:'Boeing 777-300ER',era:'2020s',livery:'Formula 1',colors:['#5C0632','#1A1A1A','#FFFFFF'],tags:['special','widebody'],notes:'Qatar Airways Boeing 777-300ER A7-BEG in the 2025 "Formula 1" special livery — a split maroon-black-and-white scheme designed by artist Swizz Beatz with the F1 logo, unveiled for the Qatar Grand Prix.',sightings:[]},
  {id:325,airline:'Qatar Airways',tail:'A7-BBI',icao24:'06A0DB',type:'Boeing 777-200LR',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','widebody'],notes:'A Qatar Airways Boeing 777-200LR, flown on its longest ultra-long-haul routes.',sightings:[]},
  {id:326,airline:'Singapore Airlines',tail:'9V-SCR',icao24:'76CC72',type:'Boeing 787-10',era:'2010s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Singapore Airlines was the launch customer of the Boeing 787-10 Dreamliner.',sightings:[]},
  {id:327,airline:'Singapore Airlines',tail:'9V-MBP',icao24:'76B450',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','narrowbody'],notes:'A Singapore Airlines Boeing 737-8 MAX, flown on regional routes (inherited via the SilkAir merger).',sightings:[]},
  {id:328,airline:'Cathay Pacific',tail:'B-LXA',icao24:'789213',type:'Airbus A350-1000',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','widebody'],notes:'A Cathay Pacific Airbus A350-1000 in the green brushwing livery.',sightings:[]},
  {id:329,airline:'Cathay Pacific',tail:'B-LAK',icao24:'780236',type:'Airbus A330-300',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','widebody'],notes:'A Cathay Pacific Airbus A330-300, a regional-widebody workhorse.',sightings:[]},
  {id:330,airline:'Cathay Pacific',tail:'B-HPI',icao24:'789263',type:'Airbus A321neo',era:'2020s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','narrowbody'],notes:'A Cathay Pacific Airbus A321neo, the airline\'s newest narrowbody.',sightings:[]},
  {id:331,airline:'Iberia',tail:'EC-KHM',icao24:'34260E',type:'Airbus A319',era:'2010s',livery:'oneworld',colors:['#B0B7BC','#FFFFFF','#D40F2D'],tags:['special','oneworld','narrowbody'],notes:'An Iberia Airbus A319, EC-KHM, in the grey "oneworld" alliance livery.',sightings:[]},
  {id:332,airline:'Iberia',tail:'EC-NER',icao24:'346303',type:'Airbus A320neo',era:'2020s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','narrowbody'],notes:'An Iberia Airbus A320neo on short- and medium-haul European routes.',sightings:[]},
  {id:333,airline:'Iberia',tail:'EC-MYA',icao24:'346045',type:'Airbus A330-200',era:'2010s',livery:'oneworld',colors:['#B0B7BC','#FFFFFF','#D40F2D'],tags:['special','oneworld','widebody'],notes:'An Iberia Airbus A330-200, EC-MYA, in the grey "oneworld" alliance livery on transatlantic routes to the Americas.',sightings:[]},
  {id:334,airline:'All Nippon Airways',tail:'JA813A',icao24:'86D244',type:'Boeing 787-8',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'ANA is the world\'s largest operator of the Boeing 787; JA813A is a 787-8.',sightings:[]},
  {id:335,airline:'All Nippon Airways',tail:'JA714A',icao24:'86789E',type:'Boeing 777-200ER',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','widebody'],notes:'An ANA Boeing 777-200ER in the blue Triton livery.',sightings:[]},
  {id:336,airline:'All Nippon Airways',tail:'JA608A',icao24:'861BCA',type:'Boeing 767-300ER',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','widebody'],notes:'An ANA Boeing 767-300ER, long a backbone of its domestic and regional network.',sightings:[]},
  {id:337,airline:'KLM',tail:'PH-BXA',icao24:'484130',type:'Boeing 737-800',era:'2010s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','narrowbody'],notes:'A KLM Boeing 737-800, the mainstay of its European short-haul fleet.',sightings:[]},
  {id:338,airline:'KLM',tail:'PH-BKA',icao24:'485B42',type:'Boeing 787-10',era:'2010s',livery:'100 Years',colors:['#00A1DE','#FFFFFF','#003082'],tags:['special','dreamliner','widebody'],notes:'KLM Boeing 787-10 PH-BKA, the airline\'s first 787-10 ("Orange Blossom"), wearing the "100 Years" centenary logo applied for KLM\'s 2019 centennial.',sightings:[]},
  {id:339,airline:'Qantas',tail:'VH-ZNG',icao24:'7C806A',type:'Boeing 787-9',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','dreamliner','widebody'],notes:'A Qantas Boeing 787-9 Dreamliner, flown on ultra-long routes such as Perth–London.',sightings:[]},
  {id:340,airline:'Qantas',tail:'VH-QPH',icao24:'7C5323',type:'Airbus A330-300',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','widebody'],notes:'A Qantas Airbus A330-300 on domestic trunk and regional-international routes.',sightings:[]},
  {id:341,airline:'Qantas',tail:'VH-EBG',icao24:'7C146A',type:'Airbus A330-200',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','widebody'],notes:'A Qantas Airbus A330-200 widebody.',sightings:[]},
  // ── More fleet depth: North American majors (Air Canada A320/A321 families, US3 widebodies) ──
  {id:342,airline:'Air Canada',tail:'C-FDQQ',type:'Airbus A320',era:'2000s',livery:'Maple Leaf (2004)',colors:['#00857D','#D8222A','#FFFFFF'],tags:['retro','narrowbody'],notes:'Air Canada Airbus A320 C-FDQQ in the 2004–2017 "Maple Leaf" livery — white with the teal-and-red maple-leaf tail — the scheme replaced by today\'s black-and-red design.',sightings:[]},
  {id:343,airline:'Air Canada',tail:'C-FKCK',icao24:'C01AA7',type:'Airbus A320',era:'2000s',livery:'Maple Leaf (2004)',colors:['#D8222A','#FFFFFF','#00857D'],tags:['retro','narrowbody'],notes:'Air Canada Airbus A320 C-FKCK still wearing the pre-2017 "Maple Leaf" livery — white with the red maple-leaf tail and "Air Canada" titles — an increasingly rare sight as the older A320s retire.',sightings:[]},
  {id:344,airline:'Air Canada',tail:'C-FNVU',icao24:'C0248B',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A320 in the red-and-black livery.',sightings:[]},
  {id:345,airline:'Air Canada',tail:'C-FGKP',icao24:'C010EC',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A321, the largest of its A320-family narrowbodies.',sightings:[]},
  {id:346,airline:'Air Canada',tail:'C-GIUF',icao24:'C05BD6',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A321 on a high-density domestic route.',sightings:[]},
  {id:347,airline:'Air Canada',tail:'C-GITU',icao24:'C05BCB',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A321 in the current livery.',sightings:[]},
  {id:348,airline:'Air Canada',tail:'C-GHLM',icao24:'C0584F',type:'Airbus A330-300',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'Air Canada Airbus A330-300 C-GHLM in the Star Alliance livery — the first Air Canada A330 painted into alliance colours.',sightings:[]},
  {id:349,airline:'Air Canada',tail:'C-GJXN',icao24:'C05ED0',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A220-300, built in Mirabel, Québec.',sightings:[]},
  {id:350,airline:'Air Canada',tail:'C-GJXW',icao24:'C05ED9',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A220-300 on a North American route.',sightings:[]},
  {id:351,airline:'Air Canada',tail:'C-GEHV',icao24:'C05004',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Air Canada Boeing 737 MAX 8, flown on domestic and transborder routes.',sightings:[]},
  {id:352,airline:'Air Canada',tail:'C-GHPX',icao24:'C058C2',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'Another Air Canada Boeing 787-8 Dreamliner.',sightings:[]},
  {id:353,airline:'American Airlines',tail:'N721AN',icao24:'A9A750',type:'Boeing 777-300ER',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','widebody'],notes:'An American Airlines Boeing 777-300ER — the flagship of its long-haul fleet — in the standard 2013 livery.',sightings:[]},
  {id:354,airline:'American Airlines',tail:'N802AN',icao24:'AAE958',type:'Boeing 787-8',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','dreamliner','widebody'],notes:'An American Airlines Boeing 787-8 Dreamliner.',sightings:[]},
  {id:355,airline:'United Airlines',tail:'N17122',icao24:'A11F9D',type:'Boeing 757-200',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Boeing 757-200, flown on transcon and some transatlantic routes.',sightings:[]},
  {id:356,airline:'United Airlines',tail:'N66051',icao24:'A8B75A',type:'Boeing 767-400ER',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','widebody'],notes:'United is one of only two passenger operators of the Boeing 767-400ER.',sightings:[]},
  {id:357,airline:'United Airlines',tail:'N47280',icao24:'A5CC11',type:'Boeing 737 MAX 8',era:'2020s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Boeing 737 MAX 8 in the blue globe livery.',sightings:[]},
  {id:358,airline:'Delta Air Lines',tail:'N3748Y',icao24:'A4462E',type:'Boeing 737-800',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Boeing 737-800, a core narrowbody of its domestic fleet.',sightings:[]},
  {id:359,airline:'Delta Air Lines',tail:'N821DN',icao24:'AB34EA',type:'Boeing 737-900ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Boeing 737-900ER, the largest of its 737 family.',sightings:[]},
  {id:360,airline:'Delta Air Lines',tail:'N858NW',icao24:'ABC651',type:'Airbus A330-200',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widebody'],notes:'A Delta Airbus A330-200 widebody, inherited from the Northwest merger.',sightings:[]},
  {id:361,airline:'Delta Air Lines',tail:'N810NW',icao24:'AB0A9D',type:'Airbus A330-300',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widebody'],notes:'A Delta Airbus A330-300 on transatlantic and transpacific routes.',sightings:[]},
  {id:362,airline:'Delta Air Lines',tail:'N188DN',icao24:'A15EBC',type:'Boeing 767-300ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widebody'],notes:'A Delta Boeing 767-300ER, a long-serving transatlantic widebody.',sightings:[]},
  // ── More fleet depth: Aeroméxico, Air China + thin world carriers (live-hydrated by reg) ──
  {id:363,airline:'Aeroméxico',tail:'XA-AMT',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current (2024 refresh)',colors:['#0B2B5B','#8E1B7A','#FFFFFF'],tags:['current','narrowbody'],notes:'An Aeroméxico Boeing 737 MAX 8 in the refreshed 2024 brand livery — the red stripe dropped for a blue-to-violet gradient down the aft fuselage and engines, introduced with Aeroméxico\'s 90th-anniversary rebrand.',sightings:[]},
  {id:364,airline:'Aeroméxico',tail:'XA-MAQ',icao24:'0D0B04',type:'Boeing 737 MAX 8',era:'2020s',livery:'Volamos con Orgullo (Pride)',colors:['#0B2B5B','#E40521','#F6A800'],tags:['special','narrowbody'],notes:'Aeroméxico Boeing 737 MAX 8 XA-MAQ in the "Volamos con Orgullo" (We Fly with Pride) special livery — a rainbow swoosh with Pride titles supporting the LGBTQ+ community.',sightings:[]},
  {id:365,airline:'Aeroméxico',tail:'XA-AML',icao24:'0D0804',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','narrowbody'],notes:'An Aeroméxico Boeing 737-800.',sightings:[]},
  {id:366,airline:'Aeroméxico',tail:'XA-AMU',icao24:'0D08EE',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','narrowbody'],notes:'An Aeroméxico Boeing 737-800 on a domestic or US route.',sightings:[]},
  {id:367,airline:'Aeroméxico',tail:'N967AM',icao24:'AD7633',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'An Aeroméxico Boeing 787-8 Dreamliner, a long-haul flagship.',sightings:[]},
  {id:368,airline:'Air China',tail:'B-2032',icao24:'7808AC',type:'Boeing 777-300ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'Air China Boeing 777-300ER B-2032 in the Star Alliance livery on long-haul intercontinental routes.',sightings:[]},
  {id:369,airline:'Air China',tail:'B-2087',icao24:'78076D',type:'Boeing 777-300ER',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','widebody'],notes:'Another Air China Boeing 777-300ER.',sightings:[]},
  {id:370,airline:'Air China',tail:'B-7878',icao24:'780FDA',type:'Boeing 787-9',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'An Air China Boeing 787-9 Dreamliner.',sightings:[]},
  {id:371,airline:'Air China',tail:'B-1466',icao24:'7811A2',type:'Boeing 787-9',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'An Air China Boeing 787-9 Dreamliner in the phoenix livery.',sightings:[]},
  {id:372,airline:'Air China',tail:'B-5916',icao24:'780971',type:'Airbus A330-300',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','widebody'],notes:'An Air China Airbus A330-300, a regional-widebody workhorse.',sightings:[]},
  {id:373,airline:'Air China',tail:'B-1085',icao24:'781347',type:'Airbus A350-900',era:'2020s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','widebody'],notes:'An Air China Airbus A350-900, the flagship of its modern fleet.',sightings:[]},
  {id:374,airline:'Air China',tail:'B-32F1',icao24:'781FB4',type:'Airbus A350-900',era:'2020s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','widebody'],notes:'Another Air China Airbus A350-900.',sightings:[]},
  {id:375,airline:'Japan Airlines',tail:'JA831J',icao24:'86D930',type:'Boeing 787-8',era:'2010s',livery:'Tsurumaru (current)',colors:['#C8102E','#FFFFFF','#B0B0B0'],tags:['current','dreamliner','widebody'],notes:'A Japan Airlines Boeing 787-8 Dreamliner with the red Tsurumaru crane.',sightings:[]},
  {id:376,airline:'Turkish Airlines',tail:'TC-LCH',icao24:'4BB068',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','narrowbody'],notes:'A Turkish Airlines Boeing 737 MAX 8.',sightings:[]},
  {id:377,airline:'Turkish Airlines',tail:'TC-JVA',icao24:'4BAAC1',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','narrowbody'],notes:'A Turkish Airlines Boeing 737-800, a short-haul workhorse.',sightings:[]},
  {id:378,airline:'Turkish Airlines',tail:'TC-JOH',icao24:'4BA9E8',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','widebody'],notes:'A Turkish Airlines Airbus A330-300.',sightings:[]},
  {id:379,airline:'Saudia',tail:'HZ-AR25',icao24:'7105AC',type:'Boeing 787-10',era:'2020s',livery:'Current',colors:['#005430','#7BA05B','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'A Saudia Boeing 787-10 Dreamliner.',sightings:[]},
  {id:380,airline:'Saudia',tail:'HZ-ARF',icao24:'7103D7',type:'Boeing 787-9',era:'2020s',livery:'Welcome to Arabia',colors:['#8E1B7A','#5C2D91','#FFFFFF'],tags:['special','dreamliner','widebody'],notes:'Saudia Boeing 787-9 HZ-ARF in the "Saudi, Welcome to Arabia" special livery — a vivid magenta-and-purple Arabic-pattern design created with the Saudi Tourism Authority to promote Saudi Arabia as a global tourism destination.',sightings:[]},
  {id:381,airline:'Air India',tail:'VT-ALM',icao24:'800462',type:'Boeing 777-300ER',era:'2010s',livery:'Konark sun (previous)',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['widebody'],notes:'An Air India Boeing 777-300ER, VT-ALM, in the previous (2007–2023) "Konark sun" livery — red chakra-and-swan tail — on ultra-long-haul routes to North America.',sightings:[]},
  {id:382,airline:'Air India',tail:'VT-ALP',icao24:'8004DE',type:'Boeing 777-300ER',era:'2010s',livery:'Konark sun (previous)',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['widebody'],notes:'Another Air India Boeing 777-300ER, VT-ALP, still wearing the previous (2007–2023) "Konark sun" livery with the red chakra-and-swan tail.',sightings:[]},
  {id:383,airline:'Air India',tail:'VT-JRA',icao24:'8015F7',type:'Airbus A350-900',era:'2020s',livery:'New (2023)',colors:['#D31247','#8E2D6B','#C49A3A'],tags:['current','widebody'],notes:'VT-JRA was among Air India\'s first Airbus A350-900s, wearing the new 2023 Tata-era livery with the gold-and-magenta "The Vista" tail — the flagship of its post-2022 fleet renewal.',sightings:[]},
  {id:384,airline:'LATAM',tail:'CC-CXJ',icao24:'E8040C',type:'Boeing 767-300ER',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','widebody'],notes:'A LATAM Boeing 767-300ER, long a widebody mainstay across the Americas.',sightings:[]},
  {id:385,airline:'LATAM',tail:'CC-BBC',icao24:'E8043A',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'A LATAM Boeing 787-8 Dreamliner.',sightings:[]},
  {id:386,airline:'LATAM',tail:'CC-BLA',icao24:'E80238',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','narrowbody'],notes:'A LATAM Airbus A320 on a domestic South American route.',sightings:[]},
  {id:387,airline:'LATAM',tail:'CC-BEA',icao24:'E80440',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','narrowbody'],notes:'A LATAM Airbus A321, the largest of its single-aisle fleet.',sightings:[]},
  {id:388,airline:'Vietnam Airlines',tail:'VN-A897',icao24:'888153',type:'Airbus A350-900',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','widebody'],notes:'Vietnam Airlines Airbus A350-900 VN-A897 in the silver "SkyTeam" alliance livery — the world\'s first A350 painted in SkyTeam colours.',sightings:[]},
  {id:389,airline:'Vietnam Airlines',tail:'VN-A888',icao24:'8880E6',type:'Airbus A350-900',era:'2010s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','widebody'],notes:'Another Vietnam Airlines Airbus A350-900.',sightings:[]},
  {id:390,airline:'Vietnam Airlines',tail:'VN-A872',icao24:'888187',type:'Boeing 787-10',era:'2020s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','dreamliner','widebody'],notes:'A Vietnam Airlines Boeing 787-10 Dreamliner.',sightings:[]},
  {id:391,airline:'Vietnam Airlines',tail:'VN-A622',icao24:'88816D',type:'Airbus A321neo',era:'2020s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','narrowbody'],notes:'A Vietnam Airlines Airbus A321neo on regional routes.',sightings:[]},
  // ── More liveries: alliance schemes (Star Alliance / oneworld / SkyTeam), retro & specials ──
  {id:392,airline:'Singapore Airlines',tail:'9V-SWI',icao24:'76CEE9',type:'Boeing 777-300ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'A Singapore Airlines Boeing 777-300ER in the all-white Star Alliance livery, marking its membership in the global alliance.',sightings:[]},
  {id:393,airline:'Turkish Airlines',tail:'TC-JJU',icao24:'4BA955',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','widebody'],notes:'A Turkish Airlines Boeing 777-300ER in the standard white livery with the red tail and dark-blue titles.',sightings:[]},
  {id:394,airline:'Turkish Airlines',tail:'TC-JRR',icao24:'4BAA52',type:'Airbus A321',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','narrowbody'],notes:'A Turkish Airlines Airbus A321 in the Star Alliance livery.',sightings:[]},
  {id:395,airline:'Finnair',tail:'OH-LWB',icao24:'461F49',type:'Airbus A350-900',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A Finnair Airbus A350-900 in the grey oneworld alliance livery.',sightings:[]},
  {id:396,airline:'Japan Airlines',tail:'JA732J',icao24:'867F8A',type:'Boeing 777-300ER',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A Japan Airlines Boeing 777-300ER in the oneworld alliance livery.',sightings:[]},
  {id:397,airline:'Qatar Airways',tail:'A7-BAF',icao24:'06A070',type:'Boeing 777-300ER',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A Qatar Airways Boeing 777-300ER in the oneworld alliance livery.',sightings:[]},
  {id:398,airline:'KLM',tail:'PH-BVA',type:'Boeing 777-300ER',era:'2010s',livery:'Orange Pride',colors:['#0F3F87','#F36F21','#FFFFFF'],tags:['special','jumbo','widebody'],notes:'KLM Boeing 777-300ER PH-BVA in the special "Orange Pride" livery — the front half in KLM blue, the rear half in Dutch national orange.',sightings:[]},
  {id:399,airline:'Air France',tail:'F-GTAE',type:'Airbus A321',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','narrowbody'],notes:'An Air France Airbus A321 in the silver-and-blue SkyTeam alliance livery.',sightings:[]},
  {id:400,airline:'Icelandair',tail:'TF-FIU',icao24:'4CC2C5',type:'Boeing 757-200',era:'2010s',livery:'Hekla Aurora',colors:['#0A2240','#2BAE66','#F2C200'],tags:['special','aurora','rare','narrowbody'],notes:'‘Hekla Aurora’ — an Icelandair Boeing 757-200 painted in a shimmering northern-lights livery, with green-and-blue auroras down the fuselage and yellow engines.',sightings:[]},
  {id:401,airline:'American Airlines',tail:'N915NN',icao24:'ACAA77',type:'Boeing 737-800',era:'2010s',livery:'TWA heritage',colors:['#C8102E','#FFFFFF','#C0C0C0'],tags:['retro','heritage','TWA','narrowbody'],notes:'A TWA heritage retrojet — American 737-800 N915NN wears the red-cheatline livery of Trans World Airlines, which American absorbed in 2001.',sightings:[]},
  {id:402,airline:'Alaska Airlines',tail:'N533AS',type:'Boeing 737-800',era:'2010s',livery:'Eskimo (current)',colors:['#01426A','#00467F','#76858F'],tags:['current','eskimo','narrowbody'],notes:'An Alaska Airlines Boeing 737-800 in the standard ‘Eskimo’ livery, with the parka-hooded Alaska Native face on the tail.',sightings:[]},
  {id:403,airline:'Lufthansa',tail:'D-AIUA',icao24:'3C66A1',type:'Airbus A320-200',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','narrowbody'],notes:'Lufthansa Airbus A320-214 D-AIUA in the dark-blue Star Alliance livery, a regular sight on short-haul routes out of Frankfurt and Munich, marking Lufthansa\'s founding membership in the global alliance.',sightings:[]},
  {id:404,airline:'Korean Air',tail:'HL7783',icao24:'71BF83',type:'Boeing 777-300ER',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','widebody'],notes:'Korean Air Boeing 777-300ER HL7783 in the silver "SkyTeam" alliance livery, flown on long-haul intercontinental routes such as Seoul–Frankfurt.',sightings:[]},
  {id:405,airline:'United Airlines',tail:'N36272',icao24:'A41722',type:'Boeing 737-800',era:'2010s',livery:'Star Wars',colors:['#C8102E','#0033A0','#FFFFFF'],tags:['special','narrowbody','rare'],notes:'One-off 737-824 painted in 2019 for Star Wars: The Rise of Skywalker, with a red Sith side and blue Resistance side.',sightings:[]},
  {id:406,airline:'United Airlines',tail:'N75435',icao24:'AA2BC4',type:'Boeing 737-900ER',era:'2010s',livery:'Continental retro',colors:['#003366','#B8A369','#FFFFFF'],tags:['retro','narrowbody'],notes:'737-924ER wearing the retro Continental globe scheme applied to mark United\'s heritage after the Continental merger.',sightings:[]},
  {id:407,airline:'American Airlines',tail:'N916NN',icao24:'ACAE2E',type:'Boeing 737-800',era:'2010s',livery:'Reno Air heritage',colors:['#009999','#C8102E','#FFFFFF'],tags:['heritage','narrowbody'],notes:'737-823 painted in the teal-and-red Reno Air scheme honoring the West Coast carrier American acquired in 1999.',sightings:[]},
  {id:408,airline:'American Airlines',tail:'N917NN',icao24:'ACB1E5',type:'Boeing 737-800',era:'2010s',livery:'AirCal heritage',colors:['#F4801E','#005DAA','#FFFFFF'],tags:['heritage','narrowbody'],notes:'737-823 wearing the AirCal heritage scheme honoring the California carrier that merged into American in the 1980s.',sightings:[]},
  {id:409,airline:'American Airlines',tail:'N578UW',icao24:'A76DF8',type:'Airbus A321-200',era:'2010s',livery:'US Airways heritage',colors:['#00539B','#C8102E','#8C8C8C'],tags:['heritage','narrowbody'],notes:'A321-231 painted in US Airways heritage colors, a former US Airways frame retained after the 2013 merger.',sightings:[]},
  {id:410,airline:'Delta Air Lines',tail:'N411DX',icao24:'A4D838',type:'Airbus A330-900',era:'2020s',livery:'Team USA',colors:['#003A70','#C8102E','#FFFFFF'],tags:['special','widebody'],notes:'A330-941 painted in December 2021 to mark Delta\'s partnership as the official airline of Team USA.',sightings:[]},
  {id:411,airline:'Southwest Airlines',tail:'N230WN',icao24:'A20A81',type:'Boeing 737-700',era:'2010s',livery:'Colorado One',colors:['#004B87','#C8102E','#FFC72C'],tags:['special','narrowbody'],notes:'737-7H4 unveiled in 2012 in a Colorado state-flag scheme; the frame was the 5,000th Boeing 737 built.',sightings:[]},
  {id:412,airline:'Southwest Airlines',tail:'N8620H',icao24:'ABD8A5',type:'Boeing 737-800',era:'2020s',livery:'Tennessee One',colors:['#FFFFFF','#C8102E','#0033A0'],tags:['special','narrowbody'],notes:'737-8H4 that received the Tennessee One state livery in 2022.',sightings:[]},
  {id:413,airline:'Alaska Airlines',tail:'N596AS',icao24:'A7B3C2',type:'Boeing 737-800',era:'2020s',livery:'Tiana\'s Bayou Adventure Flyer',colors:['#046A38','#6A1B9A','#F2A900'],tags:['special','narrowbody'],notes:'737-890 unveiled April 2025 as Alaska\'s ninth Disneyland Resort livery and its first featuring a Disney Princess.',sightings:[]},
  {id:414,airline:'JetBlue',tail:'N775JB',icao24:'AA7C64',type:'Airbus A320-200',era:'2010s',livery:'Vets in Blue',colors:['#003876','#FFC72C','#FFFFFF'],tags:['special','narrowbody'],notes:'A320-232 carrying the Vets in Blue livery honoring US military veterans.',sightings:[]},
  {id:415,airline:'JetBlue',tail:'N779JB',icao24:'AA8B40',type:'Airbus A320-200',era:'2010s',livery:'Bluericua',colors:['#00B5E2','#003876','#C8102E'],tags:['special','narrowbody'],notes:'A320-232 unveiled in San Juan in 2018 in a bright-blue scheme celebrating Puerto Rico.',sightings:[]},
  {id:416,airline:'Hawaiian Airlines',tail:'N227HA',icao24:'A1FBB2',type:'Airbus A321neo',era:'2020s',livery:'Moana',colors:['#00A3AD','#4B2E83','#F2A900'],tags:['special','narrowbody'],notes:'A321-271N unveiled 2026 as one of three \'Voyage beyond the reef\' liveries for Disney\'s live-action Moana.',sightings:[]},
  {id:417,airline:'TAP Air Portugal',tail:'CS-TJR',icao24:'495152',type:'Airbus A321neo',era:'2020s',livery:'1960s Retrojet',colors:['#FFFFFF','#C0C0C0','#E30613'],tags:['special','retro','narrowbody'],notes:'A321neo painted in TAP\'s 1960s-style silver-and-red retro scheme marking the airline\'s 75th anniversary.',sightings:[]},
  {id:418,airline:'Austrian Airlines',tail:'OE-LBO',icao24:'44001B',type:'Airbus A320',era:'2010s',livery:'1980s Retro',colors:['#FFFFFF','#8C939B','#E2001A'],tags:['special','retro','narrowbody'],notes:'OE-LBO wears Austrian\'s 1980s-era retro livery with grey belly and the red-white-red tail, unveiled in 2019.',sightings:[]},
  {id:419,airline:'Aer Lingus',tail:'EI-DVM',icao24:'4CA92D',type:'Airbus A320',era:'2010s',livery:'1960s Irish International Retro',colors:['#00594F','#FFFFFF','#1A7A3C'],tags:['special','retro','narrowbody'],notes:'EI-DVM carries Aer Lingus\'s early-1960s dark-green Irish International retro livery applied for the airline\'s 75th anniversary.',sightings:[]},
  {id:420,airline:'Brussels Airlines',tail:'OO-SBB',icao24:'44CC42',type:'Airbus A320neo',era:'2020s',livery:'Tomorrowland Amare',colors:['#FF3399','#00AEEF','#1A1A1A'],tags:['special','narrowbody'],notes:'OO-SBB Amare is a Belgian Icons livery celebrating the Tomorrowland festival.',sightings:[]},
  {id:421,airline:'Brussels Airlines',tail:'OO-SNJ',icao24:'44CDCA',type:'Airbus A320',era:'2020s',livery:'Tintin Gravity',colors:['#0B1A3A','#000000','#E30613'],tags:['special','narrowbody'],notes:'OO-SNJ Gravity is a Belgian Icons Tintin livery themed on Herge\'s Moon adventures, with a rocket painted on the belly.',sightings:[]},
  {id:422,airline:'Aegean Airlines',tail:'SX-DVQ',icao24:'4692D1',type:'Airbus A320',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','narrowbody'],notes:'SX-DVQ is an Aegean A320 painted in the Star Alliance member livery.',sightings:[]},
  {id:423,airline:'Vueling',tail:'EC-MLE',icao24:'345206',type:'Airbus A320',era:'2010s',livery:'Disneyland Paris 25th Anniversary',colors:['#FFCC00','#EC008C','#FFFFFF'],tags:['special','narrowbody'],notes:'EC-MLE carries a livery promoting the 25th anniversary of Disneyland Paris.',sightings:[]},
  {id:424,airline:'Vueling',tail:'EC-MJB',icao24:'345108',type:'Airbus A320',era:'2020s',livery:'Tour de France 2026',colors:['#FFD400','#E30613','#FFFFFF'],tags:['special','narrowbody'],notes:'EC-MJB wears a yellow-and-polka-dot livery promoting Vueling\'s sponsorship of the 2026 Tour de France Grand Depart from Barcelona.',sightings:[]},
  {id:425,airline:'Vueling',tail:'EC-LZN',icao24:'3444CF',type:'Airbus A320',era:'2020s',livery:'FC Barcelona Femeni',colors:['#004D98','#A50044','#EDBB00'],tags:['special','narrowbody'],notes:'EC-LZN carries a livery dedicated to FC Barcelona\'s women\'s football team with the slogan Dream, Play, Fly.',sightings:[]},
  {id:426,airline:'Turkish Airlines',tail:'TC-LJJ',icao24:'4BB14A',type:'Boeing 777-300ER',era:'2020s',livery:'UEFA Champions League',colors:['#FFFFFF','#001E62','#C8102E'],tags:['special','widebody'],notes:'TC-LJJ is a Turkish Airlines 777-300ER in a UEFA Champions League livery tied to the airline\'s sponsorship of the tournament.',sightings:[]},
  {id:427,airline:'ITA Airways',tail:'EI-DSY',icao24:'4CA757',type:'Airbus A320',era:'2020s',livery:'Milano Cortina 2026 Olympics',colors:['#003DA5','#FFFFFF','#00A3E0'],tags:['special','narrowbody'],notes:'EI-DSY wears a bespoke Milano Cortina 2026 Winter Olympics livery.',sightings:[]},
  {id:428,airline:'Wizz Air',tail:'9H-WNM',icao24:'4D200D',type:'Airbus A321neo',era:'2020s',livery:'20th Anniversary',colors:['#C6007E','#20419A','#78BE20'],tags:['special','narrowbody'],notes:'9H-WNM is Wizz Air\'s 20th-anniversary A321neo with an interwoven-leaves design in pink, blue and green.',sightings:[]},
  {id:429,airline:'SAS Scandinavian Airlines',tail:'LN-RKR',icao24:'478D42',type:'Airbus A330-300',era:'2020s',livery:'80th Anniversary',colors:['#003399','#C0C0C0','#FFFFFF'],tags:['special','widebody'],notes:'LN-RKR is an all-blue A330-300 marking SAS\'s 80th anniversary, the first time SAS painted a full aircraft in its signature blue.',sightings:[]},
  {id:430,airline:'All Nippon Airways',tail:'JA873A',icao24:'86E7BC',type:'Boeing 787-9',era:'2010s',livery:'Star Wars R2-D2 Jet',colors:['#1A5CA8','#FFFFFF','#C0C0C0'],tags:['special','widebody','star alliance','rare'],notes:'ANA\'s Boeing 787-9 painted as R2-D2 was delivered in 2015 to promote Star Wars: The Force Awakens.',sightings:[]},
  {id:431,airline:'Japan Airlines',tail:'JA837J',icao24:'86D9FC',type:'Boeing 787-8',era:'2010s',livery:'Doraemon Jet',colors:['#0064B4','#FFFFFF','#E4002B'],tags:['special','widebody','oneworld'],notes:'This JAL Boeing 787-8 wore a special Doraemon character livery tied to the manga franchise.',sightings:[]},
  {id:432,airline:'Singapore Airlines',tail:'9V-SKI',icao24:'76CD69',type:'Airbus A380',era:'2010s',livery:'SG50 Golden Jubilee',colors:['#EE2536','#FFFFFF','#003876'],tags:['special','superjumbo','widebody','star alliance'],notes:'This Singapore Airlines A380 carried an SG50 scheme with a large Singapore flag marking the nation\'s 50th birthday in 2015.',sightings:[]},
  {id:433,airline:'Cathay Pacific',tail:'B-KQU',icao24:'780A89',type:'Boeing 777-300ER',era:'2020s',livery:'Spirit of Hong Kong 80th Anniversary',colors:['#00645A','#FFFFFF','#E60012'],tags:['special','widebody','oneworld'],notes:'Cathay Pacific applied the Spirit of Hong Kong 80th Anniversary art livery to this 777-300ER in 2026.',sightings:[]},
  {id:434,airline:'Cathay Pacific',tail:'B-LRJ',icao24:'780AAD',type:'Airbus A350-900',era:'2020s',livery:'Retro Lettuce Leaf',colors:['#8B7355','#FFFFFF','#005A32'],tags:['retro','widebody','oneworld','heritage'],notes:'This Cathay Pacific A350-900 entered service in the airline\'s classic 1970s-80s brushwing retro scheme for its 80th anniversary.',sightings:[]},
  {id:435,airline:'EVA Air',tail:'B-16217',icao24:'8990B3',type:'Airbus A321',era:'2020s',livery:'Hello Kitty Pinky Jet',colors:['#E6006E','#FFFFFF','#FFB6C1'],tags:['special','narrowbody','star alliance'],notes:'EVA Air unveiled this A321 in the Hello Kitty Pinky Jet livery in 2024.',sightings:[]},
  {id:436,airline:'EVA Air',tail:'B-16331',icao24:'8990CE',type:'Airbus A330-300',era:'2010s',livery:'Hello Kitty Bad Badtz-Maru',colors:['#000000','#F5A800','#FFFFFF'],tags:['special','widebody','star alliance'],notes:'This EVA Air A330-300 wears a Hello Kitty Sanrio-family special livery featuring Bad Badtz-Maru.',sightings:[]},
  {id:437,airline:'Qantas',tail:'VH-ZND',icao24:'7C8067',type:'Boeing 787-9',era:'2010s',livery:'Emily Kame Kngwarreye (Yam Dreaming)',colors:['#E4002B','#F5A800','#FFFFFF'],tags:['special','widebody','oneworld','heritage'],notes:'This Qantas 787-9 carries an Indigenous art livery based on Emily Kame Kngwarreye\'s 1991 Yam Dreaming painting.',sightings:[]},
  {id:438,airline:'Korean Air',tail:'HL7204',icao24:'71BA04',type:'Boeing 777-300ER',era:'2020s',livery:'World Expo 2030 Busan',colors:['#000000','#F291B5','#FFFFFF'],tags:['special','widebody','skyteam','rare'],notes:'Korean Air painted this 777-300ER with a BLACKPINK design promoting Busan\'s World Expo 2030 bid.',sightings:[]},
  {id:439,airline:'Korean Air',tail:'HL8009',icao24:'71C009',type:'Boeing 777-300ER',era:'2010s',livery:'Beyond 50 Years of Excellence',colors:['#003876','#C8102E','#FFFFFF'],tags:['special','widebody','skyteam','heritage'],notes:'This Korean Air 777-300ER wore the Beyond 50 Years of Excellence scheme marking the airline\'s 50th anniversary in 2019.',sightings:[]},
  {id:440,airline:'Thai Airways',tail:'HS-TKF',icao24:'880046',type:'Boeing 777-300',era:'2010s',livery:'Suphannahong Royal Barge',colors:['#4B286D','#F5A800','#E4002B'],tags:['special','widebody','star alliance','heritage'],notes:'Thai Airways applied the Suphannahong Royal Barge livery to this 777-300 to commemorate the 2019 Royal Coronation.',sightings:[]},
  {id:441,airline:'Garuda Indonesia',tail:'PK-GPY',icao24:'8A0532',type:'Airbus A330-300',era:'2020s',livery:'Batik Pikachu Jet',colors:['#FFCB05','#005CAB','#3D2E1E'],tags:['special','widebody','skyteam'],notes:'Garuda Indonesia introduced this A330-300 in April 2025 with a Pikachu-wearing-batik Pokemon livery.',sightings:[]},
  {id:442,airline:'China Airlines',tail:'B-18918',icao24:'8990ED',type:'Airbus A350-900',era:'2010s',livery:'Airbus Carbon Fibre Joint Livery',colors:['#2B2B2B','#E4002B','#FFFFFF'],tags:['special','widebody','skyteam','rare'],notes:'This China Airlines A350-900 wears a one-off Airbus co-branded carbon-fibre-pattern livery unveiled in 2018.',sightings:[]},
  {id:443,airline:'Malaysia Airlines',tail:'9M-MAG',icao24:'75044E',type:'Airbus A350-900',era:'2010s',livery:'Negaraku',colors:['#C8102E','#003876','#FFCD00'],tags:['special','widebody','oneworld','heritage'],notes:'This Malaysia Airlines A350-900 carries the patriotic Negaraku special livery.',sightings:[]},
  {id:444,airline:'Emirates',tail:'A6-EEU',icao24:'896194',type:'Airbus A380',era:'2020s',livery:'Expo 2020 Dubai',colors:['#0033A0','#00B140','#E4002B'],tags:['special','superjumbo','widebody'],notes:'A6-EEU was the first Emirates A380 to receive the full Be Part of the Magic Expo 2020 Dubai livery in September 2021.',sightings:[]},
  {id:445,airline:'Emirates',tail:'A6-EOM',icao24:'8963EA',type:'Airbus A380',era:'2020s',livery:'United for Wildlife',colors:['#D71A21','#1A1A1A','#FFFFFF'],tags:['special','superjumbo','widebody'],notes:'A6-EOM wears Emirates\' United for Wildlife decals highlighting the fight against illegal wildlife trafficking.',sightings:[]},
  {id:446,airline:'Etihad Airways',tail:'A6-APH',icao24:'896463',type:'Airbus A380',era:'2010s',livery:'Year of Zayed',colors:['#BC9B6A','#4A1E1E','#FFFFFF'],tags:['special','superjumbo','widebody'],notes:'A6-APH carries the Year of Zayed livery marking the 2018 centenary of UAE founder Sheikh Zayed bin Sultan Al Nahyan.',sightings:[]},
  {id:447,airline:'Etihad Airways',tail:'A6-BND',icao24:'89653B',type:'Boeing 787-9',era:'2010s',livery:'Manchester City FC',colors:['#6CABDD','#FFFFFF','#1C2C5B'],tags:['special','widebody'],notes:'A6-BND is a Boeing 787-9 delivered in October 2019 in a special Manchester City FC livery.',sightings:[]},
  {id:448,airline:'Qatar Airways',tail:'A7-BEB',icao24:'06A19D',type:'Boeing 777-300ER',era:'2020s',livery:'FIFA World Cup 2022',colors:['#5C0632','#B99855','#FFFFFF'],tags:['special','widebody'],notes:'A7-BEB was the first Qatar Airways 777-300ER hand-painted in the FIFA World Cup Qatar 2022 livery.',sightings:[]},
  {id:449,airline:'Qatar Airways',tail:'A7-ALZ',icao24:'06A10E',type:'Airbus A350-900',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A7-ALZ wears the white oneworld alliance livery marking Qatar Airways\' membership in the alliance.',sightings:[]},
  {id:450,airline:'Saudia',tail:'HZ-AK43',icao24:'710121',type:'Boeing 777-300ER',era:'2020s',livery:'Formula E',colors:['#0B5C3B','#1E5FA8','#FFFFFF'],tags:['special','widebody'],notes:'HZ-AK43 carries a Formula E promotional livery reflecting Saudia\'s partnership with the electric racing series.',sightings:[]},
  {id:451,airline:'Ethiopian Airlines',tail:'ET-ATG',icao24:'040123',type:'Boeing 787-8',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'ET-ATG is an Ethiopian Airlines 787-8 painted in the Star Alliance alliance livery.',sightings:[]},
  {id:452,airline:'Kenya Airways',tail:'5Y-KZD',icao24:'04C11A',type:'Boeing 787-8',era:'2020s',livery:'Come Live the Magic',colors:['#C8102E','#FFFFFF','#0B7A3B'],tags:['special','widebody'],notes:'5Y-KZD wears the Come Live the Magic / Magical Kenya livery depicting Kenyan wildlife.',sightings:[]},
  {id:453,airline:'Aeroméxico',tail:'XA-GQS',icao24:'0D0FF6',type:'Boeing 737 MAX 9',era:'2020s',livery:'Kukulcán (90th Anniversary)',colors:['#E4002B','#0033A0','#F2A900'],tags:['special','narrowbody'],notes:'XA-GQS Kukulcan, designed by artist Saner, celebrates Aeroméxico\'s 90th anniversary with Mexican folkloric artwork.',sightings:[]},
  {id:454,airline:'Avianca',tail:'N284AV',icao24:'A2DCEB',type:'Airbus A320',era:'2010s',livery:'100 Years Retro',colors:['#D80032','#FFFFFF','#B0B0B0'],tags:['special','retro','narrowbody'],notes:'N284AV wears a retro livery inspired by Avianca\'s mid-20th-century scheme to mark the airline\'s 100th anniversary in 2019.',sightings:[]},
  {id:455,airline:'LATAM',tail:'CC-BBE',icao24:'E8026C',type:'Boeing 787-8',era:'2020s',livery:'Santiago 2023 Pan American Games',colors:['#E30613','#1B0088','#FFFFFF'],tags:['special','widebody'],notes:'CC-BBE carries a special livery promoting the Santiago 2023 Pan American and Parapan American Games.',sightings:[]},
  {id:456,airline:'Air China',tail:'B-2006',icao24:'780C9E',type:'Boeing 777-300ER',era:'2010s',livery:'Air China Loves China',colors:['#C8102E','#FFFFFF','#C8A24B'],tags:['special','widebody'],notes:'B-2006 wears the Air China Loves China livery with red silk patterns marking the 65th anniversary of the PRC.',sightings:[]},
  {id:457,airline:'Air Canada',tail:'C-GNBN',icao24:'C06724',type:'Airbus A220-300',era:'2020s',livery:'Trans-Canada Air Lines Retro',colors:['#8A8D8F','#C8102E','#FFFFFF'],tags:['special','retro','heritage','narrowbody'],notes:'C-GNBN is the world\'s first Airbus A220 painted in the retro Trans-Canada Air Lines heritage scheme, unveiled in 2021.',sightings:[]},
  {id:458,airline:'Virgin Atlantic',tail:'G-VSRB',icao24:'408062',type:'Airbus A330-900',era:'2020s',livery:'Ruby Rebel (40th Anniversary)',colors:['#E10A0A','#FFFFFF','#3A0A0A'],tags:['special','widebody'],notes:'G-VSRB Ruby Rebel is a special A330neo honoring Virgin Atlantic\'s 40th (ruby) anniversary in 2024.',sightings:[]},
  {id:459,airline:'Delta Air Lines',tail:'N522DZ',icao24:'A690BF',type:'Airbus A350-900',era:'2020s',livery:'LA28',colors:['#C8102E','#FF8C00','#1A1A4B'],tags:['special','rare','widebody'],notes:'One-off A350-941 painted in Delta\'s LA28 livery with palm trees and a sunset-to-starry-night gradient promoting the 2028 Los Angeles Olympics.',sightings:[]},
  {id:460,airline:'Delta Air Lines',tail:'N521DN',icao24:'A68CFD',type:'Airbus A350-900',era:'2020s',livery:'Team USA (Paris 2024)',colors:['#C8102E','#FFFFFF','#003A70'],tags:['special','rare','widebody'],notes:'A350-941 unveiled in Toulouse in May 2024 wearing Delta\'s red-white-blue Team USA livery for the Paris 2024 Olympics.',sightings:[]},
  {id:461,airline:'Delta Air Lines',tail:'N391DN',icao24:'A486D8',type:'Airbus A321-200',era:'2020s',livery:'Thank You',colors:['#003A70','#C8102E','#FFFFFF'],tags:['special','rare','narrowbody'],notes:'A321 unveiled in February 2020 with a fuselage-long THANK YOU message filled with the stenciled names of Delta\'s employees.',sightings:[]},
  {id:462,airline:'Delta Air Lines',tail:'N845MH',icao24:'AB9387',type:'Boeing 767-400ER',era:'2010s',livery:'Breast Cancer Research Foundation',colors:['#FF69B4','#FFFFFF','#003A70'],tags:['special','rare','widebody'],notes:'The Evelyn H. Lauder Pink Plane, a 767-432ER wrapped in a pink ribbon supporting the Breast Cancer Research Foundation.',sightings:[]},
  {id:463,airline:'Delta Air Lines',tail:'N3758Y',icao24:'A449E5',type:'Boeing 737-800',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','narrowbody'],notes:'737-832 painted in the silver SkyTeam alliance livery marking Delta\'s founding membership in SkyTeam.',sightings:[]},
  {id:464,airline:'Delta Air Lines',tail:'N3761R',icao24:'A44CA0',type:'Boeing 737-800',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','narrowbody'],notes:'737-832 in the silver SkyTeam alliance livery, painted into the scheme in 2012.',sightings:[]},
  {id:465,airline:'Delta Air Lines',tail:'N381DN',icao24:'A45F59',type:'Boeing 737-800',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','narrowbody'],notes:'737-832 wearing the silver SkyTeam alliance livery, one of Delta\'s 737-800s in the scheme.',sightings:[]},
  {id:466,airline:'Alaska Airlines',tail:'N537AS',icao24:'A6CA7F',type:'Boeing 737-800',era:'2010s',livery:'Disney Pixar Toy Story',colors:['#5BC2E7','#FFC72C','#E4002B'],tags:['special','narrowbody'],notes:'Painted with Woody, Buzz Lightyear and Jessie at Pixar Pier to promote Disney California Adventure.',sightings:[]},
  {id:467,airline:'Alaska Airlines',tail:'N659QX',icao24:'A8AF9D',type:'Embraer 175',era:'2020s',livery:'Disney Pixar Toy Story 5',colors:['#5BC2E7','#FFC72C','#E4002B'],tags:['special','narrowbody'],notes:'Horizon Air E175 wears a Toy Story 5 scheme with Woody, Buzz, Jessie and new tech-toy characters.',sightings:[]},
  {id:468,airline:'Southwest Airlines',tail:'N8619F',icao24:'ABD627',type:'Boeing 737-800',era:'2020s',livery:'Illinois One',colors:['#0A2240','#E4002B','#FFFFFF'],tags:['special','narrowbody'],notes:'State-tribute jet emblazoned with the Illinois state flag eagle and shield, unveiled in 2022.',sightings:[]},
  {id:469,airline:'American Airlines',tail:'N581UW',icao24:'A77B76',type:'Airbus A321-200',era:'2020s',livery:'Piedmont heritage',colors:['#003C71','#FFFFFF','#C8102E'],tags:['special','heritage','narrowbody'],notes:'Repainted in 2023 in the retro colors of Piedmont Airlines, a predecessor carrier of American.',sightings:[]},
  {id:470,airline:'American Airlines',tail:'N582UW',icao24:'A77F2D',type:'Airbus A321-200',era:'2020s',livery:'PSA heritage',colors:['#E4002B','#FFC72C','#FFFFFF'],tags:['special','heritage','narrowbody'],notes:'Repainted in 2023 in the retro colors of Pacific Southwest Airlines, an American heritage carrier.',sightings:[]},
  {id:471,airline:'American Airlines',tail:'N579UW',icao24:'A771AF',type:'Airbus A321-200',era:'2020s',livery:'Allegheny heritage',colors:['#003C71','#FFFFFF','#C8102E'],tags:['special','heritage','narrowbody'],notes:'Wears the retro Allegheny Airlines scheme, honoring a predecessor of US Airways and American.',sightings:[]},
  {id:472,airline:'American Airlines',tail:'N162AA',icao24:'A0F91D',type:'Airbus A321-200',era:'2010s',livery:'Stand Up To Cancer',colors:['#808285','#000000','#E4002B'],tags:['special','narrowbody'],notes:'Wrapped in a Stand Up To Cancer livery bearing thousands of names of patients, survivors and the lost.',sightings:[]},
  {id:473,airline:'American Airlines',tail:'N796AN',icao24:'AACE5C',type:'Boeing 777-200ER',era:'2010s',livery:'oneworld',colors:['#FFFFFF','#003C71','#808285'],tags:['special','oneworld','widebody'],notes:'Carries large oneworld alliance titles over the standard American livery.',sightings:[]},
  {id:474,airline:'American Airlines',tail:'N735AT',icao24:'A9DDB0',type:'Boeing 777-300ER',era:'2020s',livery:'Centennial Flagship',colors:['#C0C0C0','#FF8200','#003C71'],tags:['special','retro','widebody','rare'],notes:'Named Flagship DFW, this centennial livery revives American\'s vintage orange lightning bolt and eagle roundel.',sightings:[]},
  {id:475,airline:'Air Canada',tail:'C-FKAU',icao24:'C01A7D',type:'Boeing 777-300ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'Painted in the Star Alliance house livery marking Air Canada\'s membership in the alliance.',sightings:[]},
  {id:476,airline:'United Airlines',tail:'N77022',icao24:'AA6BC0',type:'Boeing 777-200ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'Wears the Star Alliance house livery and was still flying international routes in 2025-2026.',sightings:[]},
  {id:477,airline:'United Airlines',tail:'N475UA',icao24:'A5D570',type:'Airbus A320-200',era:'2010s',livery:'Friend Ship retro',colors:['#003C71','#E4002B','#FFFFFF'],tags:['special','retro','narrowbody'],notes:'Wears United\'s 1970s Friend Ship retro scheme unveiled for the airline\'s 85th anniversary in 2011.',sightings:[]},
  {id:478,airline:'Hawaiian Airlines',tail:'N375HA',icao24:'A4470E',type:'Airbus A330-200',era:'2020s',livery:'oneworld Aloha',colors:['#4B2E83','#E4002B','#FFC72C'],tags:['special','oneworld','widebody'],notes:'Unveiled in 2026 to mark oneworld entry, keeping the Pualani tail with a maile lei and Hawaiian-language message.',sightings:[]},
  {id:479,airline:'JetBlue',tail:'N615JB',icao24:'A8021B',type:'Airbus A320-200',era:'2010s',livery:'Blue Bravest (FDNY)',colors:['#E4002B','#000000','#FFFFFF'],tags:['special','narrowbody'],notes:'Red livery honoring the FDNY with the department\'s logo on the rear fuselage.',sightings:[]},
  {id:480,airline:'JetBlue',tail:'N531JL',icao24:'A6B4F7',type:'Airbus A320-200',era:'2010s',livery:'Blue Finest (NYPD)',colors:['#00457C','#000000','#FFFFFF'],tags:['special','narrowbody'],notes:'Livery dedicated to the NYPD, part of JetBlue\'s tributes to New York first responders.',sightings:[]},
  {id:481,airline:'Southwest Airlines',tail:'N280WN',icao24:'A2CFFC',type:'Boeing 737-700',era:'2010s',livery:'Missouri One',colors:['#E4002B','#0A2240','#FFFFFF'],tags:['special','narrowbody'],notes:'State-tribute jet displaying the Missouri state flag, introduced in 2015.',sightings:[]},
  {id:482,airline:'Lufthansa',tail:'D-ABYT',icao24:'3C4B34',type:'Boeing 747-8',era:'2010s',livery:'1970s retro (Jet Age)',colors:['#05164D','#FFFFFF','#F9BA00'],tags:['retro','widebody','star alliance'],notes:'This 747-8i wears a retro scheme recalling the livery Lufthansa introduced when its first Boeing 747 entered service in 1970.',sightings:[]},
  {id:483,airline:'Lufthansa',tail:'D-AIZG',icao24:'3C6747',type:'Airbus A320-200',era:'2020s',livery:'Fanhansa (football)',colors:['#05164D','#FFFFFF','#F9BA00'],tags:['special','narrowbody','star alliance'],notes:'This A320 was painted in the football-themed Fanhansa livery for the UEFA Euro 2024 tournament.',sightings:[]},
  {id:484,airline:'Turkish Airlines',tail:'TC-JNC',icao24:'4BA9C3',type:'Airbus A330-200',era:'2010s',livery:'1980s retro',colors:['#C90019','#FFFFFF','#02205B'],tags:['retro','widebody','star alliance'],notes:'This A330-203 named Kushimoto wears Turkish Airlines\' vintage 1980s color scheme.',sightings:[]},
  {id:485,airline:'Swiss',tail:'HB-JCA',icao24:'4B17F8',type:'Airbus A220-300',era:'2010s',livery:'Fete des Vignerons',colors:['#E30613','#FFFFFF','#009640'],tags:['special','narrowbody','star alliance'],notes:'The first SWISS A220-300, dedicated to French-speaking Switzerland, received a special livery honoring the Fete des Vignerons wine festival.',sightings:[]},
  {id:486,airline:'Air Baltic',tail:'YL-CSL',icao24:'502CE6',type:'Airbus A220-300',era:'2010s',livery:'Latvian flag',colors:['#9D2235','#FFFFFF','#9D2235'],tags:['special','narrowbody','heritage'],notes:'This A220 was painted in the maroon-and-white colors of Latvia\'s flag to mark the country\'s centenary.',sightings:[]},
  {id:487,airline:'Air Baltic',tail:'YL-CSJ',icao24:'502CE4',type:'Airbus A220-300',era:'2010s',livery:'Estonian flag',colors:['#0072CE','#000000','#FFFFFF'],tags:['special','narrowbody','heritage'],notes:'This A220 wears the blue, black and white of the Estonian flag.',sightings:[]},
  {id:488,airline:'Air Baltic',tail:'YL-CSK',icao24:'502CE5',type:'Airbus A220-300',era:'2010s',livery:'Lithuanian flag',colors:['#FDB913','#006A44','#C1272D'],tags:['special','narrowbody','heritage'],notes:'This A220 is painted in the yellow, green and red of the Lithuanian flag.',sightings:[]},
  {id:489,airline:'Iberia',tail:'EC-NFZ',icao24:'346316',type:'Airbus A320neo',era:'2020s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['oneworld','narrowbody','special'],notes:'This A320neo wears the oneworld alliance livery reflecting Iberia\'s membership.',sightings:[]},
  {id:490,airline:'Eurowings',tail:'D-AEWM',icao24:'3C56ED',type:'Airbus A320-200',era:'2020s',livery:'Borussia Dortmund (BVB)',colors:['#FDE100','#000000','#FFFFFF'],tags:['special','narrowbody'],notes:'This A320 fan-airbus is painted in black-and-yellow BVB09 colors under Eurowings\' Borussia Dortmund sponsorship.',sightings:[]},
  {id:491,airline:'TUI',tail:'D-AMAH',icao24:'3C7428',type:'Boeing 737 MAX 8',era:'2020s',livery:'Heritage (TUI/HLX/Hapag-Lloyd)',colors:['#E30613','#009EE0','#FF6600'],tags:['heritage','narrowbody','special'],notes:'This 737 MAX 8 named Fuerteventura carries a tri-section livery honoring the histories of TUI fly, HLX and Hapag-Lloyd Flug.',sightings:[]},
  {id:492,airline:'LOT Polish',tail:'SP-LSC',icao24:'48AE22',type:'Boeing 787-9',era:'2010s',livery:'Proud of Poland\'s Independence',colors:['#D4213D','#FFFFFF','#11397E'],tags:['special','widebody','heritage','star alliance'],notes:'This 787-9 wears a Polish-flag scheme reading Proud of Poland\'s Independence marking the 1918 centenary.',sightings:[]},
  {id:493,airline:'Finnair',tail:'OH-LWO',icao24:'461F56',type:'Airbus A350-900',era:'2020s',livery:'Moomin 100th anniversary',colors:['#FFFFFF','#0F1689','#87CEEB'],tags:['special','widebody','heritage','oneworld'],notes:'This A350 carries Moomintroll and Snorkmaiden artwork with Bringing us together since 1923 for Finnair\'s centenary.',sightings:[]},
  {id:494,airline:'Finnair',tail:'OH-LWP',icao24:'461F57',type:'Airbus A350-900',era:'2020s',livery:'Moomin 100th anniversary',colors:['#FFFFFF','#0F1689','#87CEEB'],tags:['special','widebody','heritage','oneworld'],notes:'The second of Finnair\'s centenary A350s wears the Moomin characters livery marking 100 years since 1923.',sightings:[]},
  {id:495,airline:'Air France',tail:'F-HUVJ',icao24:'39D2A9',type:'Airbus A350-900',era:'2020s',livery:'Paris 2024 Olympics',colors:['#002157','#FFFFFF','#EF4135'],tags:['special','widebody','skyteam'],notes:'This A350 named Paris carries Paris 2024 Olympic and Paralympic partner branding.',sightings:[]},
  {id:496,airline:'Aegean Airlines',tail:'SX-DVR',icao24:'4692D2',type:'Airbus A320-200',era:'2020s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['star alliance','narrowbody','special'],notes:'This A320 wears the Star Alliance house livery reflecting Aegean\'s alliance membership.',sightings:[]},
  {id:497,airline:'Croatia Airlines',tail:'9A-CAE',icao24:'501C38',type:'Airbus A220-300',era:'2020s',livery:'New brand identity',colors:['#FFFFFF','#C8102E','#003DA5'],tags:['special','narrowbody','heritage','star alliance'],notes:'The first Croatia Airlines A220-300 debuted the carrier\'s new checkerboard-inspired livery reinforcing Croatian national identity.',sightings:[]},
  {id:498,airline:'Condor',tail:'D-AIAD',icao24:'3C6424',type:'Airbus A321-200',era:'2020s',livery:'Stripes (Sunshine yellow)',colors:['#F9DC24','#FFFFFF','#4B4B4B'],tags:['special','narrowbody'],notes:'This A321 was the first Condor aircraft to fly in the airline\'s striped beach-umbrella livery, in the yellow Sunshine variant.',sightings:[]},
  {id:499,airline:'All Nippon Airways',tail:'JA743A',icao24:'868338',type:'Boeing 777-200ER',era:'2010s',livery:'Star Wars C-3PO',colors:['#D4AF37','#003F87','#FFFFFF'],tags:['special','widebody','rare','star alliance'],notes:'This 777-200ER is painted gold as the droid C-3PO under ANA\'s Star Wars partnership and is the last remaining Star Wars jet in the fleet.',sightings:[]},
  {id:500,airline:'All Nippon Airways',tail:'JA819A',icao24:'86D310',type:'Boeing 787-8',era:'2020s',livery:'Pokemon Jet Red',colors:['#E3350D','#FFFFFF','#FFCB05'],tags:['special','widebody','star alliance'],notes:'This 787-8 wears the Pokemon Jet Red scheme for the franchise\'s 30th anniversary, featuring Pikachu and Fire-type starter Pokemon.',sightings:[]},
  {id:501,airline:'All Nippon Airways',tail:'JA923A',icao24:'872FA0',type:'Boeing 787-9',era:'2020s',livery:'Pokemon Jet Green',colors:['#3B7A57','#FFFFFF','#FFCB05'],tags:['special','widebody','star alliance'],notes:'This 787-9 wears the Pokemon Jet Green scheme for the 30th anniversary, featuring Pikachu with Grass-type starter Pokemon.',sightings:[]},
  {id:502,airline:'Japan Airlines',tail:'JA823J',icao24:'86D5E0',type:'Boeing 787-8',era:'2020s',livery:'Myaku-Myaku Expo 2025',colors:['#E60012','#00A0E9','#FFFFFF'],tags:['special','widebody','oneworld'],notes:'This 787-8 promotes Expo 2025 Osaka with the event\'s red-and-blue official mascot Myaku-Myaku on international routes.',sightings:[]},
  {id:503,airline:'Japan Airlines',tail:'JA252J',icao24:'84C5CA',type:'Embraer 190',era:'2020s',livery:'Myaku-Myaku Expo 2025',colors:['#E60012','#00A0E9','#FFFFFF'],tags:['special','narrowbody','oneworld'],notes:'This J-Air-operated Embraer 190 wears the Expo 2025 Osaka Myaku-Myaku mascot livery on domestic feeder routes.',sightings:[]},
  {id:504,airline:'Qatar Airways',tail:'A7-BEH',icao24:'06A1BE',type:'Boeing 777-300ER',era:'2020s',livery:'FIFA World Cup 2026',colors:['#5C0632','#B8860B','#FFFFFF'],tags:['special','widebody','oneworld'],notes:'This 777-300ER was unveiled in May 2026 in a FIFA World Cup 2026 partnership livery with matching bespoke cabin dressing.',sightings:[]},
  {id:505,airline:'Thai Airways',tail:'HS-THQ',icao24:'885111',type:'Airbus A350-900',era:'2020s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','widebody','star alliance'],notes:'This A350-900 wears the silver Star Alliance house livery denoting Thai Airways\' membership in the alliance.',sightings:[]},
  {id:506,airline:'Thai Airways',tail:'HS-THU',icao24:'885115',type:'Airbus A350-900',era:'2020s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','widebody','star alliance'],notes:'This A350-900 carries the silver Star Alliance house livery as one of two Thai Airways aircraft in the scheme.',sightings:[]},
  {id:507,airline:'Juneyao Air',tail:'B-20EC',icao24:'7818A8',type:'Boeing 787-9',era:'2020s',livery:'Oriental Ruby',colors:['#9B1B30','#D4AF37','#FFFFFF'],tags:['special','widebody'],notes:'This 787-9 wears the all-red Oriental Ruby livery with a golden ribbon symbolizing China and good fortune.',sightings:[]},
  {id:508,airline:'Fiji Airways',tail:'DQ-FAM',icao24:'C880A8',type:'Airbus A350-900',era:'2020s',livery:'Survivor 50',colors:['#00447C','#8B5A2B','#FFFFFF'],tags:['special','widebody'],notes:'This A350-900 carries a CBS Survivor 50 In the Hands of the Fans emblem marking the reality show\'s 50th season filmed in Fiji.',sightings:[]},
  {id:509,airline:'Batik Air',tail:'9M-LRK',icao24:'750424',type:'Boeing 737 MAX 8',era:'2020s',livery:'Visit Malaysia 2026',colors:['#E30613','#FFFFFF','#009639'],tags:['special','narrowbody'],notes:'This 737 MAX 8 promotes Visit Malaysia 2026 with wildlife, flowers and cityscape artwork across the tail and fuselage.',sightings:[]},
  {id:510,airline:'Batik Air',tail:'9M-LRV',icao24:'7502D9',type:'Boeing 737 MAX 8',era:'2020s',livery:'Visit Malaysia 2026 Sun Bear',colors:['#E30613','#FFFFFF','#8B5A2B'],tags:['special','narrowbody'],notes:'This 737 MAX 8 features the Malayan Sun Bear, the official icon of the Visit Malaysia 2026 tourism campaign.',sightings:[]},
  {id:511,airline:'Batik Air',tail:'9M-LCU',icao24:'750403',type:'Boeing 737-800',era:'2020s',livery:'ASEAN Malaysia 2025',colors:['#E30613','#FFFFFF','#0033A0'],tags:['special','narrowbody'],notes:'This 737-800 wears an ASEAN Malaysia 2025 special livery marking Malaysia\'s chairmanship of ASEAN.',sightings:[]},
  {id:512,airline:'Etihad Airways',tail:'A6-APC',icao24:'896406',type:'Airbus A380',era:'2010s',livery:'ADNOC Choose the UK',colors:['#00529B','#D50032','#FFFFFF'],tags:['special','widebody','superjumbo'],notes:'This A380 wears an ADNOC Choose the United Kingdom promotional livery and was returned to service from storage in 2026.',sightings:[]},
  {id:513,airline:'Vistara',tail:'VT-ATV',icao24:'800CE8',type:'Airbus A320neo',era:'2020s',livery:'JRD Tata Retrojet',colors:['#C0C0C0','#C8102E','#808080'],tags:['special','narrowbody','retro'],notes:'This A320neo recreates the 1940s Tata Air Lines scheme in shimmery silver-gold to honor JRD Tata and 150 years of the Tata group.',sightings:[]},
  {id:514,airline:'Qantas',tail:'VH-X4A',icao24:'7C78A8',type:'Airbus A220-300',era:'2020s',livery:'Flying Art Minyma Kutjara Tjukurpa',colors:['#C8102E','#B5651D','#FFFFFF'],tags:['special','narrowbody','oneworld','indigenous'],notes:'This A220-300 is the first Qantas A220 in the Flying Art Series, wearing Maringka Baker\'s Aboriginal artwork with over 20,000 dots.',sightings:[]},
  {id:515,airline:'Delta Air Lines',tail:'N589DT',type:'Airbus A321neo',era:'2020s',livery:'100 Years (Centennial)',colors:['#003A70','#C0C0C0','#1A1A4B'],tags:['special','rare','narrowbody'],notes:'A321neo unveiled March 2025 in Delta\'s first-ever silver supergraphic centennial scheme, with a silver-and-blue widget tail and 100 Years titles.',sightings:[]},
  {id:516,airline:'Delta Air Lines',tail:'N527DN',type:'Airbus A350-900',era:'2020s',livery:'100 Years (Centennial)',colors:['#003A70','#C0C0C0','#1A1A4B'],tags:['special','rare','widebody'],notes:'A350-900 in Delta\'s 100 Years centennial livery, with silver, midnight-blue and royal-blue bands flowing up the tail.',sightings:[]},
  {id:517,airline:'Air Tahiti Nui',tail:'F-OMUA',icao24:'3A3280',type:'Boeing 787-9',era:'2010s',livery:'Tahitian Dreamliner',colors:['#0033A0','#00B5E2','#FFFFFF'],tags:['special','indigenous','widebody'],notes:'F-OMUA "Fakarava", Air Tahiti Nui\'s first 787-9, wears the signature blue "Tahitian Dreamliner" livery with Polynesian tattoo motifs and a Tiare-flower tail.',sightings:[]},
  {id:518,airline:'Air Tahiti Nui',tail:'F-OTOA',icao24:'3A4DC0',type:'Boeing 787-9',era:'2010s',livery:'Tahitian Dreamliner',colors:['#0033A0','#00B5E2','#FFFFFF'],tags:['special','indigenous','widebody'],notes:'F-OTOA "Bora Bora" is one of Air Tahiti Nui\'s four 787-9s in the blue "Tahitian Dreamliner" scheme, its fuselage covered in traditional Polynesian tattoo patterns.',sightings:[]},
  {id:519,airline:'Air Tahiti Nui',tail:'F-OVAA',icao24:'3A5400',type:'Boeing 787-9',era:'2010s',livery:'Tahitian Dreamliner',colors:['#0033A0','#00B5E2','#FFFFFF'],tags:['special','indigenous','widebody'],notes:'F-OVAA "Moorea" wears Air Tahiti Nui\'s signature blue Polynesian-tattoo "Tahitian Dreamliner" livery.',sightings:[]},
  {id:520,airline:'Sichuan Airlines',tail:'B-306N',icao24:'781610',type:'Airbus A350-900',era:'2010s',livery:'Panda Route',colors:['#000000','#FFFFFF','#8CC63F'],tags:['special','widebody'],notes:'A350-900 in the "Panda Route" livery, with a giant panda reclining amid green bamboo, promoting flights to the panda homeland of Chengdu.',sightings:[]},
  {id:521,airline:'Hainan Airlines',tail:'B-7302',icao24:'78110D',type:'Boeing 787-9',era:'2010s',livery:'Kung Fu Panda',colors:['#FFC72C','#E4002B','#000000'],tags:['special','widebody'],notes:'787-9 in a DreamWorks "Kung Fu Panda" livery, an all-yellow fuselage with the film\'s characters arrayed around the wings.',sightings:[]},
  {id:522,airline:'Hainan Airlines',tail:'B-1540',icao24:'78105B',type:'Boeing 787-9',era:'2010s',livery:'Kung Fu Panda',colors:['#FFFFFF','#E4002B','#FFC72C'],tags:['special','widebody'],notes:'787-9, the first of Hainan\'s "Kung Fu Panda" jets, with a white fuselage carrying the main characters and the red-and-gold Hainan tail.',sightings:[]},
  {id:523,airline:'Xiamen Airlines',tail:'B-1356',icao24:'7812BE',type:'Boeing 787-9',era:'2010s',livery:'United Dream (UN Global Goals)',colors:['#0067B1','#009EDB','#FFFFFF'],tags:['special','widebody'],notes:'787-9 "United Dream", the only aircraft in the UN Sustainable Development Goals livery, a blue fuselage promoting the UN\'s global goals.',sightings:[]},
  {id:524,airline:'Scoot',tail:'9V-OJJ',icao24:'76BD4A',type:'Boeing 787-9',era:'2010s',livery:'Pikachu Jet',colors:['#FFCB05','#3B4CCA','#FFFFFF'],tags:['special','widebody'],notes:'787-9 "Pikachu Jet" is covered inside and out with Pokemon characters led by Pikachu, from a Scoot / Pokemon Company tie-up.',sightings:[]},
  {id:525,airline:'Air Astana',tail:'P4-KHA',type:'Embraer E190-E2',era:'2010s',livery:'Snow Leopard',colors:['#0E1B4D','#8C9BB5','#FFFFFF'],tags:['special','narrowbody'],notes:'E190-E2 in the hand-painted "Snow Leopard" livery, spotlighting the endangered cat that is a national symbol of Kazakhstan.',sightings:[]},
  {id:526,airline:'Spirit Airlines',tail:'N986NK',icao24:'ADC2A4',type:'Airbus A320neo',era:'2020s',livery:'Super Nintendo World (Mario)',colors:['#E60012','#FFFFFF','#0055A4'],tags:['special','narrowbody'],notes:'A320neo in a Mario "Super Nintendo World" livery from a Spirit / Universal Studios tie-up unveiled in 2024.',sightings:[]},
  {id:527,airline:'Copa Airlines',tail:'HP-1841CMP',icao24:'0C20AB',type:'Boeing 737-800',era:'2020s',livery:'75th Anniversary Retro',colors:['#C8102E','#FFC72C','#FFFFFF'],tags:['special','retro','star alliance','narrowbody'],notes:'737-800 painted in 2022 in Copa\'s classic 1990s red-and-yellow scheme to mark the airline\'s 75th anniversary.',sightings:[]},
  {id:528,airline:'S7 Airlines',tail:'VP-BOG',type:'Airbus A320-200',era:'2020s',livery:'Street Art Museum',colors:['#78BE20','#FFFFFF','#1A1A1A'],tags:['special','narrowbody'],notes:'A near-all-white A320 created with St. Petersburg\'s Street Art Museum, S7\'s signature green appearing only on the tail as an artist\'s canvas.',sightings:[]},
  {id:529,airline:'Air Serbia',tail:'YU-ARB',icao24:'4C0221',type:'Airbus A330-200',era:'2010s',livery:'Nikola Tesla',colors:['#003DA5','#FFFFFF','#00A0DF'],tags:['special','heritage','widebody'],notes:'Flagship A330-200 carrying a stylized portrait of inventor Nikola Tesla on its tail, rendered in nineteen shades of blue.',sightings:[]},
  {id:530,airline:'Air Serbia',tail:'YU-APC',icao24:'4C01E2',type:'Airbus A319',era:'2010s',livery:'Living Legends: Novak Djokovic',colors:['#003DA5','#FFFFFF','#C8102E'],tags:['special','narrowbody'],notes:'A319 named for tennis champion Novak Djokovic, first of Air Serbia\'s "Living Legends" honoring famous Serbs.',sightings:[]},
  {id:531,airline:'Sun Country Airlines',tail:'N842SY',icao24:'AB88EE',type:'Boeing 737-800',era:'2020s',livery:'Retro (1994 design)',colors:['#002855','#FFFFFF','#F2A900'],tags:['special','retro','narrowbody'],notes:'737-800 reviving Sun Country\'s 1994 design to honor the airline\'s Minnesota heritage.',sightings:[]},
  {id:532,airline:'Aeroflot',tail:'VP-BNT',type:'Airbus A320-200',era:'2010s',livery:'Dobrolet Retro',colors:['#B3995D','#003876','#FFFFFF'],tags:['special','retro','skyteam','narrowbody'],notes:'Aeroflot\'s first retro-jet, an A320 named "Dobrolet" honoring the 1923 Soviet predecessor of the modern airline.',sightings:[]},
  {id:533,airline:'Gulf Air',tail:'A9C-FG',icao24:'894098',type:'Boeing 787-9',era:'2020s',livery:'Golden Falcon Retro',colors:['#C8102E','#B8860B','#FFFFFF'],tags:['special','retro','widebody'],notes:'787-9 delivered in 2019 in a retro scheme reviving Gulf Air\'s classic Golden Falcon colours to mark its 70th anniversary.',sightings:[]},
  {id:534,airline:'Gulf Air',tail:'A9C-NB',icao24:'8940A2',type:'Airbus A321neo',era:'2020s',livery:'70th Anniversary Retro',colors:['#C8102E','#B8860B','#FFFFFF'],tags:['special','retro','narrowbody'],notes:'A321LR delivered new in 2021 wearing Gulf Air\'s 1980s-90s retro livery with 70th Anniversary titles.',sightings:[]},
  {id:535,airline:'Royal Jordanian',tail:'JY-RAK',type:'Airbus A320neo',era:'2020s',livery:'oneworld',colors:['#4B2E5E','#B0B7BC','#FFFFFF'],tags:['special','oneworld','narrowbody'],notes:'A320neo painted in the grey oneworld alliance livery, part of Royal Jordanian\'s 2025 fleet renewal.',sightings:[]},
  {id:536,airline:'EgyptAir',tail:'SU-GGB',type:'Boeing 737-800',era:'2020s',livery:'95th Anniversary Retro',colors:['#0A2472','#C8102E','#FFFFFF'],tags:['special','retro','narrowbody'],notes:'737-800 unveiled in 2026 in a retro livery reviving EgyptAir\'s 1970s-80s scheme to celebrate its 95th anniversary.',sightings:[]},
  {id:537,airline:'Azul Brazilian Airlines',tail:'PR-YSH',icao24:'E49699',type:'Airbus A320neo',era:'2020s',livery:'Disney Mickey Mouse',colors:['#000000','#E4002B','#FFD100'],tags:['special','narrowbody'],notes:'A320neo "Mickey Mouse nas Nuvens", the first of Azul\'s Disney-themed jets, with Mickey on the tail.',sightings:[]},
  {id:538,airline:'Azul Brazilian Airlines',tail:'PS-AEF',icao24:'E49640',type:'Embraer E195-E2',era:'2020s',livery:'Ararinha Azul (Blue Macaw)',colors:['#0033A0','#00A3E0','#FFD100'],tags:['special','indigenous','narrowbody'],notes:'E195-E2 "Ararinha Azul" with three Spix\'s macaws per side, painted by artist Luiz Pardal using 58 colours.',sightings:[]},
  {id:539,airline:'Azul Brazilian Airlines',tail:'PR-ANV',icao24:'E49539',type:'Airbus A330-900',era:'2020s',livery:'Pink (Outubro Rosa)',colors:['#EC008C','#0033A0','#FFFFFF'],tags:['special','widebody'],notes:'A330-900neo "La Belle Azul", painted pink for Azul\'s annual Pink October breast-cancer-awareness campaign.',sightings:[]},
  {id:540,airline:'Air India',tail:'VT-ANU',icao24:'80073B',type:'Boeing 787-8',era:'2010s',livery:'Star Alliance',colors:['#0A2472','#D31247','#FFFFFF'],tags:['special','star alliance','widebody'],notes:'787-8 delivered in 2015 factory-painted in Star Alliance colours — the world\'s first 787 Dreamliner in an alliance livery.',sightings:[]},
  {id:541,airline:'Volaris',tail:'XA-XXV',type:'Airbus A321neo',era:'2020s',livery:'20th Anniversary',colors:['#5C2D91','#E4002B','#FFFFFF'],tags:['special','narrowbody'],notes:'A321neo entering service in 2026 in a special livery celebrating the Mexican carrier\'s 20th anniversary.',sightings:[]},
  // ── Military aircraft (rare catches) ──
  {id:101,category:'military',airline:'U.S. Air Force',tail:'04-4070',type:'F-22 Raptor',era:'2010s',livery:'Air dominance grey',colors:['#5A6470','#3E4651','#8A95A3'],tags:['fighter','stealth','rare'],notes:'Fifth-generation air-superiority fighter. The Raptor\'s low-observable grey is rarely seen outside air shows.',sightings:[]},
  {id:102,category:'military',airline:'U.S. Navy',tail:'168912',type:'F/A-18 Super Hornet',era:'2010s',livery:'Tactical grey',colors:['#6B7480','#4A525C','#9AA4B0'],tags:['fighter','carrier','navy'],notes:'Carrier-based multirole fighter in standard tactical paint.',sightings:[]},
  {id:103,category:'military',airline:'U.S. Navy',tail:'165664',type:'F/A-18 Super Hornet',era:'2020s',livery:'Blue Angels',colors:['#002F6C','#FFC72C','#FFFFFF'],tags:['display','rare','iconic'],notes:'U.S. Navy flight demonstration squadron. The Blue Angels switched to the blue-and-gold F/A-18E/F Super Hornet in 2021 — a prized airshow catch.',sightings:[]},
  {id:104,category:'military',airline:'U.S. Air Force',tail:'87-0293',type:'F-16 Fighting Falcon',era:'2020s',livery:'Viper grey (ANG)',colors:['#6E7B8B','#9AA7B4','#B0B0B0'],tags:['fighter'],notes:'A U.S. Air National Guard F-16C Fighting Falcon in operational tactical "Viper" grey with unit tail markings — the everyday combat scheme of the "Viper".',sightings:[]},
  {id:105,category:'military',airline:'Royal Air Force',tail:'ZK308',icao24:'43C610',type:'Eurofighter Typhoon',era:'2010s',livery:'Air-defence grey',colors:['#5C6670','#3A424C','#8993A0'],tags:['fighter','RAF','europe'],notes:'RAF multirole fighter in standard air-defence grey.',sightings:[]},
  {id:106,category:'military',airline:'U.S. Air Force',tail:'82-1066',type:'B-2 Spirit',era:'1990s',livery:'Stealth black',colors:['#2A2D33','#1A1C20','#3E424A'],tags:['bomber','stealth','very rare'],notes:'Stealth strategic bomber — only 21 were ever built, making a B-2 the rarest of finds. 82-1066 "Spirit of America" was the very first B-2.',sightings:[]},
  {id:107,category:'military',airline:'U.S. Air Force',tail:'80-0221',icao24:'AE197E',type:'A-10 Thunderbolt II',era:'2010s',livery:'Warthog grey',colors:['#5A5F4D','#3E4234','#7A7F6A'],tags:['attack','warthog','rare'],notes:'The A-10 "Warthog" close-air-support jet, built around its enormous 30 mm GAU-8 cannon, in low-visibility grey.',sightings:[]},
  {id:108,category:'military',airline:'U.S. Air Force',tail:'60-0034',type:'B-52H Stratofortress',era:'2010s',livery:'Bomber grey',colors:['#4C4F45','#33352D','#6B6E60'],tags:['bomber','strategic','rare'],notes:'The B-52H heavy bomber — in USAF service since the 1960s and projected to keep flying into the 2050s.',sightings:[]},
  {id:109,category:'military',airline:'U.S. Air Force',tail:'84-0001',type:'F-15 Eagle',era:'2010s',livery:'Air-superiority grey',colors:['#5E6770','#3F464D','#8A93A0'],tags:['fighter','eagle'],notes:'The F-15 Eagle air-superiority fighter, famed for an undefeated air-to-air record, in two-tone grey.',sightings:[]},
  {id:110,category:'military',airline:'U.S. Navy',tail:'168267',icao24:'AE2F1C',type:'EA-18G Growler',era:'2010s',livery:'Tactical grey',colors:['#6B7480','#4A525C','#9AA4B0'],tags:['carrier','electronic warfare'],notes:'The EA-18G Growler — the U.S. Navy\'s carrier-based electronic-attack jet, derived from the F/A-18F Super Hornet.',sightings:[]},
  {id:111,category:'military',airline:'Royal Air Force',tail:'XX219',icao24:'43C40D',type:'BAE Hawk T1',era:'2010s',livery:'Red Arrows',colors:['#E1001A','#FFFFFF','#1B3A8B'],tags:['display','red arrows','iconic','rare'],notes:'The Red Arrows — the RAF Aerobatic Team — fly the BAE Hawk T1 in their famous red display livery. A prized airshow catch.',sightings:[]},
  {id:112,category:'military',airline:'Royal Air Force',tail:'ZM145',type:'F-35B Lightning II',era:'2020s',livery:'Lightning grey',colors:['#54606B','#3A434C','#838E9B'],tags:['fighter','stealth','f-35'],notes:'The RAF\'s F-35B Lightning — a short-takeoff/vertical-landing stealth fighter flown from land bases and the Royal Navy\'s carriers.',sightings:[]},
  {id:113,category:'military',airline:'German Air Force',tail:'31+00',type:'Eurofighter Typhoon',era:'2010s',livery:'Luftwaffe grey',colors:['#5C6670','#3A424C','#8993A0'],tags:['fighter','luftwaffe','europe'],notes:'A Eurofighter Typhoon of the German Air Force (Luftwaffe) in standard air-defence grey.',sightings:[]},
];

// Pre-resolved planespotters photos for the curated fleet (keyed by id) so card images
// load directly as <img>, even when the page is opened from file:// (where the photo-API
// fetch is blocked by the browser). The thumbnails are self-hosted under photos/ (downloaded
// from Planespotters, attributed below) so the curated cards don't depend on hotlink access.
// Submitted liveries still hydrate via the API by tail.
const SEED_PHOTOS = {
  1:'photos/seed-1.jpg',
  2:'photos/seed-2.jpg',
  3:'photos/seed-3.jpg',
  4:'photos/seed-4.jpg',
  5:'photos/seed-5.jpg',
  6:'photos/seed-6.jpg',
  7:'photos/seed-7.jpg',
  8:'photos/seed-8.jpg',
  101:'photos/seed-101.jpg',
  102:'photos/seed-102.jpg',
  103:'photos/seed-103.jpg',
  104:'photos/seed-104.jpg',
  105:'photos/seed-105.jpg',
  106:'photos/seed-106.jpg',
  9:'photos/seed-9.jpg',
  10:'photos/seed-10.jpg',
  11:'photos/seed-11.jpg',
  12:'photos/seed-12.jpg',
  13:'photos/seed-13.jpg',
  14:'photos/seed-14.jpg',
  15:'photos/seed-15.jpg',
  16:'photos/seed-16.jpg',
  17:'photos/seed-17.jpg',
  18:'photos/seed-18.jpg',
  19:'photos/seed-19.jpg',
  20:'photos/seed-20.jpg',
  21:'photos/seed-21.jpg',
  23:'photos/seed-23.jpg',
  24:'photos/seed-24.jpg',
  25:'photos/seed-25.jpg',
  26:'photos/seed-26.jpg',
  27:'photos/seed-27.jpg',
  28:'photos/seed-28.jpg',
  29:'photos/seed-29.jpg',
  30:'photos/seed-30.jpg',
  31:'photos/seed-31.jpg',
  32:'photos/seed-32.jpg',
  33:'photos/seed-33.jpg',
  34:'photos/seed-34.jpg',
  35:'photos/seed-35.jpg',
  36:'photos/seed-36.jpg',
  37:'photos/seed-37.jpg',
  38:'photos/seed-38.jpg',
  107:'photos/seed-107.jpg',
  108:'photos/seed-108.jpg',
  109:'photos/seed-109.jpg',
  110:'photos/seed-110.jpg',
  111:'photos/seed-111.jpg',
  112:'photos/seed-112.jpg',
  113:'photos/seed-113.jpg',
  39:'photos/seed-39.jpg',
  40:'photos/seed-40.jpg',
  41:'photos/seed-41.jpg',
  42:'photos/seed-42.jpg',
  43:'photos/seed-43.jpg',
  44:'photos/seed-44.jpg',
  45:'photos/seed-45.jpg',
  46:'photos/seed-46.jpg',
  47:'photos/seed-47.jpg',
  48:'photos/seed-48.jpg',
  49:'photos/seed-49.jpg',
  50:'photos/seed-50.jpg',
  51:'photos/seed-51.jpg',
  52:'photos/seed-52.jpg',
  53:'photos/seed-53.jpg',
  54:'photos/seed-54.jpg',
  55:'photos/seed-55.jpg',
  56:'photos/seed-56.jpg',
  57:'photos/seed-57.jpg',
  58:'photos/seed-58.jpg',
  59:'photos/seed-59.jpg',
  60:'photos/seed-60.jpg',
  61:'photos/seed-61.jpg',
  62:'photos/seed-62.jpg',
  63:'photos/seed-63.jpg',
  64:'photos/seed-64.jpg',
  65:'photos/seed-65.jpg',
  66:'photos/seed-66.jpg',
  67:'photos/seed-67.jpg',
  68:'photos/seed-68.jpg',
  69:'photos/seed-69.jpg',
  70:'photos/seed-70.jpg',
  71:'photos/seed-71.jpg',
  72:'photos/seed-72.jpg',
  73:'photos/seed-73.jpg',
  74:'photos/seed-74.jpg',
  79:'photos/seed-79.jpg',
  82:'photos/seed-82.jpg',
  83:'photos/seed-83.jpg',
  84:'photos/seed-84.jpg',
  87:'photos/seed-87.jpg',
  88:'photos/seed-88.jpg',
  89:'photos/seed-89.jpg',
  200:'photos/seed-200.jpg',
  201:'photos/seed-201.jpg',
  202:'photos/seed-202.jpg',
  203:'photos/seed-203.jpg',
  204:'photos/seed-204.jpg',
  205:'photos/seed-205.jpg',
  206:'photos/seed-206.jpg',
  208:'photos/seed-208.jpg',
  209:'photos/seed-209.jpg',
  210:'photos/seed-210.jpg',
  211:'photos/seed-211.jpg',
  212:'photos/seed-212.jpg',
  213:'photos/seed-213.jpg',
  214:'photos/seed-214.jpg',
  215:'photos/seed-215.jpg',
  216:'photos/seed-216.jpg',
  217:'photos/seed-217.jpg',
  218:'photos/seed-218.jpg',
  219:'photos/seed-219.jpg',
  220:'photos/seed-220.jpg',
  221:'photos/seed-221.jpg',
  222:'photos/seed-222.jpg',
  223:'photos/seed-223.jpg',
  224:'photos/seed-224.jpg',
  225:'photos/seed-225.jpg',
  226:'photos/seed-226.jpg',
  227:'photos/seed-227.jpg',
  229:'photos/seed-229.jpg',
  230:'photos/seed-230.jpg',
  231:'photos/seed-231.jpg',
  232:'photos/seed-232.jpg',
  233:'photos/seed-233.jpg',
  234:'photos/seed-234.jpg',
  235:'photos/seed-235.jpg',
  236:'photos/seed-236.jpg',
  237:'photos/seed-237.jpg',
  238:'photos/seed-238.jpg',
  239:'photos/seed-239.jpg',
  240:'photos/seed-240.jpg',
  241:'photos/seed-241.jpg',
  242:'photos/seed-242.jpg',
  243:'photos/seed-243.jpg',
  244:'photos/seed-244.jpg',
  245:'photos/seed-245.jpg',
  246:'photos/seed-246.jpg',
  247:'photos/seed-247.jpg',
  248:'photos/seed-248.jpg',
  249:'photos/seed-249.jpg',
  250:'photos/seed-250.jpg',
  251:'photos/seed-251.jpg',
  252:'photos/seed-252.jpg',
  253:'photos/seed-253.jpg',
  254:'photos/seed-254.jpg',
  255:'photos/seed-255.jpg',
  256:'photos/seed-256.jpg',
  257:'photos/seed-257.jpg',
  300:'photos/seed-300.jpg',
  301:'photos/seed-301.jpg',
  302:'photos/seed-302.jpg',
  303:'photos/seed-303.jpg',
  304:'photos/seed-304.jpg',
  305:'photos/seed-305.jpg',
  306:'photos/seed-306.jpg',
  307:'photos/seed-307.jpg',
  308:'photos/seed-308.jpg',
  309:'photos/seed-309.jpg',
  310:'photos/seed-310.jpg',
  311:'photos/seed-311.jpg',
  312:'photos/seed-312.jpg',
  313:'photos/seed-313.jpg',
  314:'photos/seed-314.jpg',
  315:'photos/seed-315.jpg',
  316:'photos/seed-316.jpg',
  317:'photos/seed-317.jpg',
  318:'photos/seed-318.jpg',
  319:'photos/seed-319.jpg',
  320:'photos/seed-320.jpg',
  321:'photos/seed-321.jpg',
  322:'photos/seed-322.jpg',
  323:'photos/seed-323.jpg',
  324:'photos/seed-324.jpg',
  325:'photos/seed-325.jpg',
  326:'photos/seed-326.jpg',
  327:'photos/seed-327.jpg',
  328:'photos/seed-328.jpg',
  329:'photos/seed-329.jpg',
  330:'photos/seed-330.jpg',
  331:'photos/seed-331.jpg',
  332:'photos/seed-332.jpg',
  333:'photos/seed-333.jpg',
  334:'photos/seed-334.jpg',
  335:'photos/seed-335.jpg',
  336:'photos/seed-336.jpg',
  337:'photos/seed-337.jpg',
  338:'photos/seed-338.jpg',
  339:'photos/seed-339.jpg',
  340:'photos/seed-340.jpg',
  341:'photos/seed-341.jpg',
  342:'photos/seed-342.jpg',
  343:'photos/seed-343.jpg',
  344:'photos/seed-344.jpg',
  345:'photos/seed-345.jpg',
  346:'photos/seed-346.jpg',
  347:'photos/seed-347.jpg',
  348:'photos/seed-348.jpg',
  349:'photos/seed-349.jpg',
  350:'photos/seed-350.jpg',
  351:'photos/seed-351.jpg',
  352:'photos/seed-352.jpg',
  353:'photos/seed-353.jpg',
  354:'photos/seed-354.jpg',
  355:'photos/seed-355.jpg',
  356:'photos/seed-356.jpg',
  357:'photos/seed-357.jpg',
  358:'photos/seed-358.jpg',
  359:'photos/seed-359.jpg',
  360:'photos/seed-360.jpg',
  361:'photos/seed-361.jpg',
  362:'photos/seed-362.jpg',
  363:'photos/seed-363.jpg',
  364:'photos/seed-364.jpg',
  365:'photos/seed-365.jpg',
  366:'photos/seed-366.jpg',
  367:'photos/seed-367.jpg',
  368:'photos/seed-368.jpg',
  369:'photos/seed-369.jpg',
  370:'photos/seed-370.jpg',
  371:'photos/seed-371.jpg',
  372:'photos/seed-372.jpg',
  373:'photos/seed-373.jpg',
  374:'photos/seed-374.jpg',
  375:'photos/seed-375.jpg',
  376:'photos/seed-376.jpg',
  377:'photos/seed-377.jpg',
  378:'photos/seed-378.jpg',
  379:'photos/seed-379.jpg',
  380:'photos/seed-380.jpg',
  381:'photos/seed-381.jpg',
  382:'photos/seed-382.jpg',
  383:'photos/seed-383.jpg',
  384:'photos/seed-384.jpg',
  385:'photos/seed-385.jpg',
  386:'photos/seed-386.jpg',
  387:'photos/seed-387.jpg',
  388:'photos/seed-388.jpg',
  389:'photos/seed-389.jpg',
  390:'photos/seed-390.jpg',
  391:'photos/seed-391.jpg',
  392:'photos/seed-392.jpg',
  393:'photos/seed-393.jpg',
  394:'photos/seed-394.jpg',
  395:'photos/seed-395.jpg',
  396:'photos/seed-396.jpg',
  397:'photos/seed-397.jpg',
  398:'photos/seed-398.jpg',
  399:'photos/seed-399.jpg',
  400:'photos/seed-400.jpg',
  401:'photos/seed-401.jpg',
  402:'photos/seed-402.jpg',
  403:'photos/seed-403.jpg',
  404:'photos/seed-404.jpg',
  405:'photos/seed-405.jpg',
  406:'photos/seed-406.jpg',
  407:'photos/seed-407.jpg',
  408:'photos/seed-408.jpg',
  409:'photos/seed-409.jpg',
  410:'photos/seed-410.jpg',
  411:'photos/seed-411.jpg',
  412:'photos/seed-412.jpg',
  413:'photos/seed-413.jpg',
  414:'photos/seed-414.jpg',
  415:'photos/seed-415.jpg',
  416:'photos/seed-416.jpg',
  417:'photos/seed-417.jpg',
  418:'photos/seed-418.jpg',
  419:'photos/seed-419.jpg',
  420:'photos/seed-420.jpg',
  421:'photos/seed-421.jpg',
  422:'photos/seed-422.jpg',
  423:'photos/seed-423.jpg',
  424:'photos/seed-424.jpg',
  425:'photos/seed-425.jpg',
  426:'photos/seed-426.jpg',
  427:'photos/seed-427.jpg',
  428:'photos/seed-428.jpg',
  429:'photos/seed-429.jpg',
  430:'photos/seed-430.jpg',
  431:'photos/seed-431.jpg',
  432:'photos/seed-432.jpg',
  433:'photos/seed-433.jpg',
  434:'photos/seed-434.jpg',
  435:'photos/seed-435.jpg',
  436:'photos/seed-436.jpg',
  437:'photos/seed-437.jpg',
  438:'photos/seed-438.jpg',
  439:'photos/seed-439.jpg',
  440:'photos/seed-440.jpg',
  441:'photos/seed-441.jpg',
  442:'photos/seed-442.jpg',
  443:'photos/seed-443.jpg',
  444:'photos/seed-444.jpg',
  445:'photos/seed-445.jpg',
  446:'photos/seed-446.jpg',
  447:'photos/seed-447.jpg',
  448:'photos/seed-448.jpg',
  449:'photos/seed-449.jpg',
  450:'photos/seed-450.jpg',
  451:'photos/seed-451.jpg',
  452:'photos/seed-452.jpg',
  453:'photos/seed-453.jpg',
  454:'photos/seed-454.jpg',
  455:'photos/seed-455.jpg',
  456:'photos/seed-456.jpg',
  457:'photos/seed-457.jpg',
  458:'photos/seed-458.jpg',
  459:'photos/seed-459.jpg',
  460:'photos/seed-460.jpg',
  461:'photos/seed-461.jpg',
  462:'photos/seed-462.jpg',
  463:'photos/seed-463.jpg',
  464:'photos/seed-464.jpg',
  465:'photos/seed-465.jpg',
  466:'photos/seed-466.jpg',
  467:'photos/seed-467.jpg',
  468:'photos/seed-468.jpg',
  469:'photos/seed-469.jpg',
  470:'photos/seed-470.jpg',
  471:'photos/seed-471.jpg',
  472:'photos/seed-472.jpg',
  473:'photos/seed-473.jpg',
  474:'photos/seed-474.jpg',
  475:'photos/seed-475.jpg',
  476:'photos/seed-476.jpg',
  477:'photos/seed-477.jpg',
  478:'photos/seed-478.jpg',
  479:'photos/seed-479.jpg',
  480:'photos/seed-480.jpg',
  481:'photos/seed-481.jpg',
  482:'photos/seed-482.jpg',
  483:'photos/seed-483.jpg',
  484:'photos/seed-484.jpg',
  485:'photos/seed-485.jpg',
  486:'photos/seed-486.jpg',
  487:'photos/seed-487.jpg',
  488:'photos/seed-488.jpg',
  489:'photos/seed-489.jpg',
  490:'photos/seed-490.jpg',
  491:'photos/seed-491.jpg',
  492:'photos/seed-492.jpg',
  493:'photos/seed-493.jpg',
  494:'photos/seed-494.jpg',
  495:'photos/seed-495.jpg',
  496:'photos/seed-496.jpg',
  497:'photos/seed-497.jpg',
  498:'photos/seed-498.jpg',
  499:'photos/seed-499.jpg',
  500:'photos/seed-500.jpg',
  501:'photos/seed-501.jpg',
  502:'photos/seed-502.jpg',
  503:'photos/seed-503.jpg',
  504:'photos/seed-504.jpg',
  505:'photos/seed-505.jpg',
  506:'photos/seed-506.jpg',
  507:'photos/seed-507.jpg',
  508:'photos/seed-508.jpg',
  509:'photos/seed-509.jpg',
  510:'photos/seed-510.jpg',
  511:'photos/seed-511.jpg',
  512:'photos/seed-512.jpg',
  513:'photos/seed-513.jpg',
  514:'photos/seed-514.jpg',
  515:'photos/seed-515.jpg',
  516:'photos/seed-516.jpg',
  517:'photos/seed-517.jpg',
  518:'photos/seed-518.jpg',
  519:'photos/seed-519.jpg',
  520:'photos/seed-520.jpg',
  521:'photos/seed-521.jpg',
  522:'photos/seed-522.jpg',
  523:'photos/seed-523.jpg',
  524:'photos/seed-524.jpg',
  525:'photos/seed-525.jpg',
  526:'photos/seed-526.jpg',
  527:'photos/seed-527.jpg',
  528:'photos/seed-528.jpg',
  529:'photos/seed-529.jpg',
  530:'photos/seed-530.jpg',
  531:'photos/seed-531.jpg',
  532:'photos/seed-532.jpg',
  533:'photos/seed-533.jpg',
  534:'photos/seed-534.jpg',
  535:'photos/seed-535.jpg',
  536:'photos/seed-536.jpg',
  537:'photos/seed-537.jpg',
  538:'photos/seed-538.jpg',
  539:'photos/seed-539.jpg',
  540:'photos/seed-540.jpg',
};
for (const l of LIVERIES) if (SEED_PHOTOS[l.id]) l.photo = SEED_PHOTOS[l.id];

// Photographer attribution for each seed photo (Planespotters requires visible credit).
// Resolved from the Planespotters photo API and matched to the exact SEED_PHOTOS image.
const SEED_PHOTO_CREDITS = {
  1:{by:'Marc Najberg',link:'https://www.planespotters.net/photo/1900709/n14120-united-airlines-boeing-757-224-wl'},
  2:{by:'Mark Empson - AeroResource',link:'https://www.planespotters.net/photo/246260/n555ua-united-airlines-boeing-757-222-wl'},
  3:{by:'Klaus Ecker',link:'https://www.planespotters.net/photo/190143/n335aa-american-airlines-boeing-767-223er'},
  4:{by:'Jan Seler',link:'https://www.planespotters.net/photo/1578075/n102nn-american-airlines-airbus-a321-231-wl'},
  5:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1838422/n668dn-delta-air-lines-boeing-757-232'},
  6:{by:'Nicholas Toto',link:'https://www.planespotters.net/photo/1874544/n500wr-southwest-airlines-boeing-737-8h4-wl'},
  7:{by:'Andrzej Rejter',link:'https://www.planespotters.net/photo/1779934/g-boag-british-airways-bac-concorde-102'},
  8:{by:'StefanP',link:'https://www.planespotters.net/photo/1063225/n734pa-pan-am-boeing-747-121'},
  101:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1207577/04-4070-united-states-air-force-lockheed-martin-f-22a-raptor'},
  102:{by:'Westley_SJU',link:'https://www.planespotters.net/photo/1864967/168912-united-states-navy-boeing-f-a-18e-super-hornet'},
  103:{by:'CJMoeser',link:'https://www.planespotters.net/photo/1819014/165664-united-states-navy-boeing-f-a-18e-super-hornet'},
  104:{by:'Riley Bertoia',link:'https://www.planespotters.net/photo/1770704/87-0293-united-states-air-force-general-dynamics-f-16c-fighting-falcon'},
  105:{by:'Olie Myburgh',link:'https://www.planespotters.net/photo/1682957/zk308-royal-air-force-eurofighter-ef-2000-typhoon-fgr-4'},
  106:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1295755/82-1066-united-states-air-force-northrop-b-2a-spirit'},
  9:{by:'Fang Xiaoyu',link:'https://www.planespotters.net/photo/1772424/n2333u-united-airlines-boeing-777-322er'},
  10:{by:'Julian Staudinger',link:'https://www.planespotters.net/photo/1879149/n24976-united-airlines-boeing-787-9-dreamliner'},
  11:{by:'Marvin Knitl',link:'https://www.planespotters.net/photo/1936335/n753an-american-airlines-boeing-777-223er'},
  12:{by:'Xiaowei Zhang',link:'https://www.planespotters.net/photo/1899966/n800an-american-airlines-boeing-787-8-dreamliner'},
  13:{by:'OMGcat',link:'https://www.planespotters.net/photo/1931319/n171dz-delta-air-lines-boeing-767-332er-wl'},
  14:{by:'NKG_Zhao',link:'https://www.planespotters.net/photo/1909737/n502dn-delta-air-lines-airbus-a350-941'},
  15:{by:'OMGcat',link:'https://www.planespotters.net/photo/1934359/n8645a-southwest-airlines-boeing-737-8h4-wl'},
  16:{by:'Márk Páter',link:'https://www.planespotters.net/photo/1055415/g-bygc-british-airways-boeing-747-436'},
  17:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1933782/g-xlea-british-airways-airbus-a380-841'},
  18:{by:'Simone Bertarini',link:'https://www.planespotters.net/photo/1921129/d-abya-lufthansa-boeing-747-830'},
  19:{by:'Martin Nimmervoll',link:'https://www.planespotters.net/photo/1898163/d-aima-lufthansa-airbus-a380-841'},
  20:{by:'Hector A Rivera Valentin -HR Planespotter',link:'https://www.planespotters.net/photo/1055259/f-hpja-air-france-airbus-a380-861'},
  21:{by:'Toni Marimon',link:'https://www.planespotters.net/photo/1917242/f-gznt-air-france-boeing-777-328er'},
  23:{by:'Bram Steeman',link:'https://www.planespotters.net/photo/1938978/ph-bvk-klm-royal-dutch-airlines-boeing-777-306er'},
  24:{by:'Jason D’Adamo',link:'https://www.planespotters.net/photo/1923488/vh-oqa-qantas-airbus-a380-842'},
  25:{by:'Gerald Lee',link:'https://www.planespotters.net/photo/784944/9v-ska-singapore-airlines-airbus-a380-841'},
  26:{by:'Joe',link:'https://www.planespotters.net/photo/1914535/b-kqf-cathay-pacific-boeing-777-367er'},
  27:{by:'FENG',link:'https://www.planespotters.net/photo/1921936/ja743j-japan-airlines-boeing-777-346er'},
  28:{by:'leandro',link:'https://www.planespotters.net/photo/1108420/g-vlip-virgin-atlantic-boeing-747-443'},
  29:{by:'Gerrit Griem',link:'https://www.planespotters.net/photo/1873178/n709jb-jetblue-airbus-a320-232-wl'},
  30:{by:'Niclas Karich',link:'https://www.planespotters.net/photo/1933426/n559as-alaska-airlines-boeing-737-890-wl'},
  31:{by:'Turbofan fish ViC',link:'https://www.planespotters.net/photo/1871985/c-frtg-air-canada-boeing-787-9-dreamliner'},
  32:{by:'Marvin Knitl',link:'https://www.planespotters.net/photo/1910544/ei-deo-aer-lingus-airbus-a320-214'},
  33:{by:'Graeme Williamson',link:'https://www.planespotters.net/photo/1872648/ei-dcl-ryanair-boeing-737-8as-wl'},
  34:{by:'Radiance777',link:'https://www.planespotters.net/photo/1907160/a6-bla-etihad-airways-boeing-787-9-dreamliner'},
  35:{by:'Marco Materlik',link:'https://www.planespotters.net/photo/1845639/a7-bca-qatar-airways-boeing-787-8-dreamliner'},
  36:{by:'Y.Speciale',link:'https://www.planespotters.net/photo/1914591/tc-jje-turkish-airlines-boeing-777-3f2er'},
  37:{by:'Pimas',link:'https://www.planespotters.net/photo/1933232/oh-lwa-finnair-airbus-a350-941'},
  38:{by:'Rafal Pruszkowski',link:'https://www.planespotters.net/photo/1845929/a6-euf-emirates-airbus-a380-861'},
  107:{by:'Alexis Boidron',link:'https://www.planespotters.net/photo/1568839/80-0221-united-states-air-force-fairchild-republic-a-10c-thunderbolt-ii'},
  108:{by:'AviaFlyer - Wilbert Tana',link:'https://www.planespotters.net/photo/1447242/60-0034-united-states-air-force-boeing-b-52h-stratofortress'},
  109:{by:'MILSPOT',link:'https://www.planespotters.net/photo/775156/84-0001-united-states-air-force-mcdonnell-douglas-f-15c-eagle'},
  110:{by:'Alexis Boidron',link:'https://www.planespotters.net/photo/1444254/168267-united-states-navy-boeing-ea-18g-growler-f-a-18f'},
  111:{by:'DP MT AVIATION',link:'https://www.planespotters.net/photo/1861293/xx219-royal-air-force-british-aerospace-hawk-t-mk-1'},
  112:{by:'DVS-135',link:'https://www.planespotters.net/photo/1674058/zm145-royal-air-force-lockheed-martin-f-35b-lightning-ii'},
  113:{by:'Claus Seifert',link:'https://www.planespotters.net/photo/1121659/31-00-luftwaffe-german-air-force-eurofighter-ef-2000-typhoon-s'},
  39:{by:'Sayo Hikawa',link:'https://www.planespotters.net/photo/1924271/ja791a-all-nippon-airways-boeing-777-381er'},
  40:{by:'秦有为',link:'https://www.planespotters.net/photo/1936077/hl7644-korean-air-boeing-747-8b5'},
  41:{by:'81304002',link:'https://www.planespotters.net/photo/1854762/hl8359-asiana-airlines-airbus-a350-941'},
  42:{by:'HUNG CHIA CHEN',link:'https://www.planespotters.net/photo/1922770/b-18053-china-airlines-boeing-777-36ner'},
  43:{by:'Henry Chow',link:'https://www.planespotters.net/photo/1928171/b-16708-eva-air-boeing-777-35eer'},
  44:{by:'秦有为',link:'https://www.planespotters.net/photo/1910857/hs-tud-thai-airways-airbus-a380-841'},
  45:{by:'Jay Cheung',link:'https://www.planespotters.net/photo/973177/9m-mna-malaysia-airlines-airbus-a380-841'},
  46:{by:'DLFferozz',link:'https://www.planespotters.net/photo/1798835/vt-anp-air-india-boeing-787-8-dreamliner'},
  47:{by:'Daniel Nagy',link:'https://www.planespotters.net/photo/1921886/hz-ak28-saudia-boeing-777-368er'},
  48:{by:'SHWinter0101',link:'https://www.planespotters.net/photo/1911746/zk-okq-air-new-zealand-boeing-777-319er'},
  49:{by:'Maurice Becker',link:'https://www.planespotters.net/photo/1050655/cc-bgo-latam-airlines-chile-boeing-787-9-dreamliner'},
  50:{by:'Hector A Rivera Valentin -HR Planespotter',link:'https://www.planespotters.net/photo/1073255/n697av-avianca-colombia-airbus-a321-231-wl'},
  51:{by:'Photorikoo',link:'https://www.planespotters.net/photo/1878676/xa-adl-aeromexico-boeing-787-9-dreamliner'},
  52:{by:'KirkXWB',link:'https://www.planespotters.net/photo/1837990/ec-mxv-iberia-airbus-a350-941'},
  53:{by:'Ryan Taylor',link:'https://www.planespotters.net/photo/1890516/hb-jna-swiss-boeing-777-3deer'},
  54:{by:'MINXUAN ZHANG',link:'https://www.planespotters.net/photo/1928585/oe-lpf-austrian-airlines-boeing-777-2q8er'},
  55:{by:'Julian Martin',link:'https://www.planespotters.net/photo/1917389/cs-tua-tap-air-portugal-airbus-a330-941'},
  56:{by:'Tran Nguyen An Binh',link:'https://www.planespotters.net/photo/1903212/ln-rkt-sas-scandinavian-airlines-airbus-a330-343'},
  57:{by:'YUANJUN SONG',link:'https://www.planespotters.net/photo/1862852/4x-eda-el-al-israel-airlines-boeing-787-9-dreamliner'},
  58:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1929728/n380ha-hawaiian-airlines-airbus-a330-243'},
  59:{by:'Chris Gimmillaro',link:'https://www.planespotters.net/photo/1919756/n705fr-frontier-airlines-airbus-a321-211-wl'},
  60:{by:'Frederick Lee',link:'https://www.planespotters.net/photo/1935888/vn-a868-vietnam-airlines-boeing-787-9-dreamliner'},
  61:{by:'Sayo Hikawa',link:'https://www.planespotters.net/photo/1891608/rp-c7779-philippine-airlines-boeing-777-3f6er'},
  62:{by:'Sharo',link:'https://www.planespotters.net/photo/1887468/pk-gig-garuda-indonesia-boeing-777-3u3er'},
  63:{by:'Elias Dieckert',link:'https://www.planespotters.net/photo/1934055/b-2485-air-china-boeing-747-89l'},
  64:{by:'Javier Rodriguez',link:'https://www.planespotters.net/photo/1596860/b-6137-china-southern-airlines-airbus-a380-841'},
  65:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1811304/et-auo-ethiopian-airlines-boeing-787-9-dreamliner'},
  66:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1931718/tf-fip-icelandair-boeing-757-208-wl'},
  67:{by:'Kevin Hackert',link:'https://www.planespotters.net/photo/1510184/sx-dvo-aegean-airlines-airbus-a321-231'},
  68:{by:'YUANJUN SONG',link:'https://www.planespotters.net/photo/1877732/g-ezwa-easyjet-airbus-a320-214'},
  69:{by:'Rui Marques™',link:'https://www.planespotters.net/photo/1914955/ha-lxa-wizz-air-airbus-a321-231-wl'},
  70:{by:'Wong Chi-Lam',link:'https://www.planespotters.net/photo/1080056/vh-voz-virgin-australia-boeing-777-3zger'},
  71:{by:'Lukas Schmid',link:'https://www.planespotters.net/photo/1849243/a4o-sc-oman-air-boeing-787-9-dreamliner'},
  72:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1924079/cn-rgv-royal-air-maroc-boeing-737-85p-wl'},
  73:{by:'Ethan Beale',link:'https://www.planespotters.net/photo/1919162/4r-alr-srilankan-airlines-airbus-a330-343'},
  74:{by:'Aaron E Arul',link:'https://www.planespotters.net/photo/1836284/n905nn-american-airlines-boeing-737-823-wl'},
  79:{by:'XuJunPengAviation',link:'https://www.planespotters.net/photo/1887927/n218ua-united-airlines-boeing-777-222er'},
  82:{by:'Marc Najberg',link:'https://www.planespotters.net/photo/1901671/n265ak-alaska-airlines-boeing-737-990er-wl'},
  83:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1906751/n214wn-southwest-airlines-boeing-737-7h4-wl'},
  84:{by:'Parker White',link:'https://www.planespotters.net/photo/1884577/n945wn-southwest-airlines-boeing-737-7h4-wl'},
  87:{by:'Gregory roberts',link:'https://www.planespotters.net/photo/1918110/vh-xzj-qantas-boeing-737-838-wl'},
  88:{by:'Mr_Lawrence',link:'https://www.planespotters.net/photo/1922341/vh-xzp-qantas-boeing-737-838-wl'},
  89:{by:'Elias Dieckert',link:'https://www.planespotters.net/photo/1931563/g-eupj-british-airways-airbus-a319-131'},
  200:{by:'Bernard_Xu',link:'https://www.planespotters.net/photo/1900172/f-hrba-air-france-boeing-787-9-dreamliner'},
  201:{by:'Björn Huke',link:'https://www.planespotters.net/photo/1934098/f-gspz-air-france-boeing-777-228er'},
  202:{by:'Paul Buchroeder',link:'https://www.planespotters.net/photo/1934582/f-hzua-air-france-airbus-a220-300-bd-500-1a11'},
  203:{by:'Metal_Birds_and_Feather_Birds',link:'https://www.planespotters.net/photo/1927205/ei-edy-aer-lingus-airbus-a330-302'},
  204:{by:'Kevci4',link:'https://www.planespotters.net/photo/1906508/ei-lra-aer-lingus-airbus-a321-253nx'},
  205:{by:'Viswanathan',link:'https://www.planespotters.net/photo/1758138/vt-exf-air-india-airbus-a320-251n'},
  206:{by:'ZSAM~L',link:'https://www.planespotters.net/photo/1898234/zk-nze-air-new-zealand-boeing-787-9-dreamliner'},
  208:{by:'Brandon S',link:'https://www.planespotters.net/photo/1913670/n932ak-alaska-airlines-boeing-737-9-max'},
  209:{by:'WJh',link:'https://www.planespotters.net/photo/1928588/ja381a-all-nippon-airways-airbus-a380-841'},
  210:{by:'OMGcat',link:'https://www.planespotters.net/photo/1931807/ja882a-all-nippon-airways-boeing-787-9-dreamliner'},
  211:{by:'秦有为',link:'https://www.planespotters.net/photo/1931213/n791an-american-airlines-boeing-777-223er'},
  212:{by:'Alex ding',link:'https://www.planespotters.net/photo/1935615/hl7775-asiana-airlines-boeing-777-28eer'},
  213:{by:'Marvin Knitl',link:'https://www.planespotters.net/photo/1909199/oe-lwp-austrian-airlines-embraer-erj-195lr-erj-190-200-lr'},
  214:{by:'Gerrit Griem',link:'https://www.planespotters.net/photo/1919083/oe-lbp-austrian-airlines-airbus-a320-214'},
  215:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1759510/g-zbka-british-airways-boeing-787-9-dreamliner'},
  216:{by:'X PAN',link:'https://www.planespotters.net/photo/1931636/g-xwba-british-airways-airbus-a350-1041'},
  217:{by:'KirkXWB',link:'https://www.planespotters.net/photo/1867642/g-stba-british-airways-boeing-777-336er'},
  218:{by:'Patrick Huwiler',link:'https://www.planespotters.net/photo/1926997/b-lra-cathay-pacific-airbus-a350-941'},
  219:{by:'Chris Pitchacaren',link:'https://www.planespotters.net/photo/1863247/b-18917-china-airlines-airbus-a350-941'},
  220:{by:'Misael Ocasio Hernandez',link:'https://www.planespotters.net/photo/1181263/b-18206-china-airlines-boeing-747-409'},
  221:{by:'CAN-CSN',link:'https://www.planespotters.net/photo/1928976/b-2725-china-southern-airlines-boeing-787-8-dreamliner'},
  222:{by:'Bram Steeman',link:'https://www.planespotters.net/photo/1925970/n401dz-delta-air-lines-airbus-a330-941'},
  223:{by:'Alessandro Brown',link:'https://www.planespotters.net/photo/1910899/n935at-delta-air-lines-boeing-717-231'},
  224:{by:'Philipp Schütz',link:'https://www.planespotters.net/photo/1421843/n101du-delta-air-lines-airbus-a220-100-bd-500-1a10'},
  225:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1796055/g-uzha-easyjet-airbus-a320-251n'},
  226:{by:'Peter Baldwin',link:'https://www.planespotters.net/photo/1756199/g-ezbt-easyjet-airbus-a319-111'},
  227:{by:'Flo Weiss',link:'https://www.planespotters.net/photo/1843254/4x-eku-el-al-israel-airlines-boeing-737-8z9-wl'},
  229:{by:'ZYX_ZBAA',link:'https://www.planespotters.net/photo/1931576/a6-env-emirates-boeing-777-31her'},
  230:{by:'Zhang Bocong',link:'https://www.planespotters.net/photo/1881508/et-ask-ethiopian-airlines-boeing-777-360er'},
  231:{by:'X1aoDU',link:'https://www.planespotters.net/photo/1918014/et-avc-ethiopian-airlines-airbus-a350-941'},
  232:{by:'YU HAN',link:'https://www.planespotters.net/photo/1906173/a6-bmi-etihad-airways-boeing-787-10-dreamliner'},
  233:{by:'秦有为',link:'https://www.planespotters.net/photo/1899881/a6-api-etihad-airways-airbus-a380-861'},
  234:{by:'HankZhouHZ',link:'https://www.planespotters.net/photo/1914160/b-16722-eva-air-boeing-777-36ner'},
  235:{by:'Bravo2088',link:'https://www.planespotters.net/photo/1907023/b-17881-eva-air-boeing-787-9-dreamliner'},
  236:{by:'KirkXWB',link:'https://www.planespotters.net/photo/1894260/oh-lto-finnair-airbus-a330-302'},
  237:{by:'Tokyo-Japan',link:'https://www.planespotters.net/photo/1911109/oh-lwl-finnair-airbus-a350-941'},
  238:{by:'Niclas Karich',link:'https://www.planespotters.net/photo/1931435/n701fr-frontier-airlines-airbus-a321-211-wl'},
  239:{by:'OMGcat',link:'https://www.planespotters.net/photo/1893685/n230fr-frontier-airlines-airbus-a320-214-wl'},
  240:{by:'Suparat Chairatprasert',link:'https://www.planespotters.net/photo/1201350/pk-gpa-garuda-indonesia-airbus-a330-341'},
  241:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1894954/n202ha-hawaiian-airlines-airbus-a321-271n'},
  242:{by:'M Kramer',link:'https://www.planespotters.net/photo/1899500/n480ha-hawaiian-airlines-boeing-717-22a'},
  243:{by:'WalAndPl',link:'https://www.planespotters.net/photo/1914596/ec-maa-iberia-airbus-a330-302'},
  244:{by:'航记shanghai',link:'https://www.planespotters.net/photo/1935992/d-aixd-lufthansa-airbus-a350-941'},
  245:{by:'Barry Roop',link:'https://www.planespotters.net/photo/1915204/d-abvm-lufthansa-boeing-747-430'},
  246:{by:'Bram Steeman',link:'https://www.planespotters.net/photo/1924746/ph-bha-klm-royal-dutch-airlines-boeing-787-9-dreamliner'},
  247:{by:'Chris Pitchacaren',link:'https://www.planespotters.net/photo/1058880/9v-swa-singapore-airlines-boeing-777-312er'},
  248:{by:'Heluxiaozhu',link:'https://www.planespotters.net/photo/1906760/9v-smf-singapore-airlines-airbus-a350-941'},
  249:{by:'Gerhard.zant',link:'https://www.planespotters.net/photo/1909545/a7-ala-qatar-airways-airbus-a350-941'},
  250:{by:'Márk Páter',link:'https://www.planespotters.net/photo/1079432/a7-apa-qatar-airways-airbus-a380-861'},
  251:{by:'LDH',link:'https://www.planespotters.net/photo/1914530/tc-lla-turkish-airlines-boeing-787-9-dreamliner'},
  252:{by:'Taohang Zhou',link:'https://www.planespotters.net/photo/1906011/ja01xj-japan-airlines-airbus-a350-941'},
  253:{by:'ParsaTvk',link:'https://www.planespotters.net/photo/1912163/g-vlux-virgin-atlantic-airbus-a350-1041'},
  254:{by:'OMGcat',link:'https://www.planespotters.net/photo/1463855/n2002j-jetblue-airbus-a321-271nx'},
  255:{by:'TulZub Promkhuntong',link:'https://www.planespotters.net/photo/1934227/c-fivr-air-canada-boeing-777-333er'},
  256:{by:'Daniyar Atadjanov',link:'https://www.planespotters.net/photo/1913108/hl8348-korean-air-boeing-737-8-max'},
  257:{by:'Bui Duc Thien',link:'https://www.planespotters.net/photo/1928083/hl8081-korean-air-boeing-787-9-dreamliner'},
  300:{by:'Jianan Lin',link:'https://www.planespotters.net/photo/1862708/c-grov-air-canada-airbus-a220-300-bd-500-1a11'},
  301:{by:'Mario Ferioli',link:'https://www.planespotters.net/photo/1909259/c-gfur-air-canada-airbus-a330-343'},
  302:{by:'WalAndPl',link:'https://www.planespotters.net/photo/1873423/c-fsdb-air-canada-boeing-737-8-max'},
  303:{by:'Christian Jilg',link:'https://www.planespotters.net/photo/1942116/c-fivk-air-canada-boeing-777-233lr'},
  304:{by:'Niclas Karich',link:'https://www.planespotters.net/photo/1943588/c-ghpq-air-canada-boeing-787-8-dreamliner'},
  305:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1825858/n304rb-american-airlines-boeing-737-8-max'},
  306:{by:'Conor Clancy - Alpha Victor Photo',link:'https://www.planespotters.net/photo/1663125/n803nn-american-airlines-boeing-737-823-wl'},
  307:{by:'Frederick Tremblay',link:'https://www.planespotters.net/photo/1890288/n835an-american-airlines-boeing-787-9-dreamliner'},
  308:{by:'Martin Tietz',link:'https://www.planespotters.net/photo/1782647/n93003-american-airlines-airbus-a319-115-wl'},
  309:{by:'Julian Martin',link:'https://www.planespotters.net/photo/1835549/n400an-american-airlines-airbus-a321-253nx'},
  310:{by:'Ruoyang Yan',link:'https://www.planespotters.net/photo/1809640/n66825-united-airlines-boeing-737-924er-wl'},
  311:{by:'Lukas Schmid',link:'https://www.planespotters.net/photo/1939911/n653ua-united-airlines-boeing-767-322er-wl'},
  312:{by:'Yukino-JA8161',link:'https://www.planespotters.net/photo/1923422/n13014-united-airlines-boeing-787-10-dreamliner'},
  313:{by:'Marvin Knitl',link:'https://www.planespotters.net/photo/1914112/n844mh-delta-air-lines-boeing-767-432er'},
  314:{by:'TulZub Promkhuntong',link:'https://www.planespotters.net/photo/1922951/g-zblb-british-airways-boeing-787-10-dreamliner'},
  315:{by:'OMGcat',link:'https://www.planespotters.net/photo/1933660/d-abpb-lufthansa-boeing-787-9-dreamliner'},
  316:{by:'Yann Bougdour',link:'https://www.planespotters.net/photo/1945233/d-aind-lufthansa-airbus-a320-271n'},
  317:{by:'Elias Dieckert',link:'https://www.planespotters.net/photo/1933507/d-aihw-lufthansa-airbus-a340-642'},
  318:{by:'sebastien david',link:'https://www.planespotters.net/photo/1845955/f-hepa-air-france-airbus-a320-214'},
  319:{by:'Bram Steeman',link:'https://www.planespotters.net/photo/1849407/f-gzca-air-france-airbus-a330-203'},
  320:{by:'dn280',link:'https://www.planespotters.net/photo/1928166/f-huva-air-france-airbus-a350-941'},
  321:{by:'Ramon Jordi',link:'https://www.planespotters.net/photo/1884888/a6-ewa-emirates-boeing-777-21hlr'},
  322:{by:'Phan Hoài Sang',link:'https://www.planespotters.net/photo/1893181/a6-exa-emirates-airbus-a350-941'},
  323:{by:'Julian Martin',link:'https://www.planespotters.net/photo/1887446/a7-ana-qatar-airways-airbus-a350-1041'},
  324:{by:'Mehmed Bekir Cakmak',link:'https://www.planespotters.net/photo/1943696/a7-beg-qatar-airways-boeing-777-3dzer'},
  325:{by:'Cornelius Grossmann',link:'https://www.planespotters.net/photo/1901048/a7-bbi-qatar-airways-boeing-777-2dzlr'},
  326:{by:'Jhang Yao Yun',link:'https://www.planespotters.net/photo/1930582/9v-scr-singapore-airlines-boeing-787-10-dreamliner'},
  327:{by:'CAN-CSN',link:'https://www.planespotters.net/photo/1898574/9v-mbp-singapore-airlines-boeing-737-8-max'},
  328:{by:'Radiance777',link:'https://www.planespotters.net/photo/1882500/b-lxa-cathay-pacific-airbus-a350-1041'},
  329:{by:'Wanping Chen',link:'https://www.planespotters.net/photo/1907544/b-lak-cathay-pacific-airbus-a330-343'},
  330:{by:'Henry Chow',link:'https://www.planespotters.net/photo/1940074/b-hpi-cathay-pacific-airbus-a321-251nx'},
  331:{by:'Niclas Karich',link:'https://www.planespotters.net/photo/1936542/ec-khm-iberia-airbus-a319-111'},
  332:{by:'Howard Wang',link:'https://www.planespotters.net/photo/1898418/ec-ner-iberia-airbus-a320-251n'},
  333:{by:'KirkXWB',link:'https://www.planespotters.net/photo/1867839/ec-mya-iberia-airbus-a330-202'},
  334:{by:'OMGcat',link:'https://www.planespotters.net/photo/1932092/ja813a-all-nippon-airways-boeing-787-8-dreamliner'},
  335:{by:'Yukino-JA8161',link:'https://www.planespotters.net/photo/1923256/ja714a-all-nippon-airways-boeing-777-281'},
  336:{by:'Demo Borstell',link:'https://www.planespotters.net/photo/1879452/ja608a-all-nippon-airways-boeing-767-381er'},
  337:{by:'Pablo Bernárdez',link:'https://www.planespotters.net/photo/1918953/ph-bxa-klm-royal-dutch-airlines-boeing-737-8k2-wl'},
  338:{by:'Sayo Hikawa',link:'https://www.planespotters.net/photo/1941428/ph-bka-klm-royal-dutch-airlines-boeing-787-10-dreamliner'},
  339:{by:'Yukino-JA8161',link:'https://www.planespotters.net/photo/1897881/vh-zng-qantas-boeing-787-9-dreamliner'},
  340:{by:'Reeri',link:'https://www.planespotters.net/photo/1945046/vh-qph-qantas-airbus-a330-303'},
  341:{by:'Alphathreeeighty',link:'https://www.planespotters.net/photo/1924987/vh-ebg-qantas-airbus-a330-203'},
  342:{by:'Hamza',link:'https://www.planespotters.net/photo/998150/c-fdqq-air-canada-airbus-a320-211'},
  343:{by:'Hamza',link:'https://www.planespotters.net/photo/1009622/c-fkck-air-canada-airbus-a320-211'},
  344:{by:'Reza Teflissi',link:'https://www.planespotters.net/photo/1491072/c-fnvu-air-canada-airbus-a320-211'},
  345:{by:'Stephen Lian',link:'https://www.planespotters.net/photo/1896563/c-fgkp-air-canada-airbus-a321-211'},
  346:{by:'Terry Figg',link:'https://www.planespotters.net/photo/1922676/c-giuf-air-canada-airbus-a321-211'},
  347:{by:'Ava',link:'https://www.planespotters.net/photo/1863082/c-gitu-air-canada-airbus-a321-211'},
  348:{by:'Piotr Persona',link:'https://www.planespotters.net/photo/1935958/c-ghlm-air-canada-airbus-a330-343'},
  349:{by:'Will Dubuc',link:'https://www.planespotters.net/photo/1879854/c-gjxn-air-canada-airbus-a220-300-bd-500-1a11'},
  350:{by:'Shon Fridman',link:'https://www.planespotters.net/photo/1817330/c-gjxw-air-canada-airbus-a220-300-bd-500-1a11'},
  351:{by:'Souluxy',link:'https://www.planespotters.net/photo/1922575/c-gehv-air-canada-boeing-737-8-max'},
  352:{by:'Gerhard.zant',link:'https://www.planespotters.net/photo/1943841/c-ghpx-air-canada-boeing-787-8-dreamliner'},
  353:{by:'Tokyo-Japan',link:'https://www.planespotters.net/photo/1926102/n721an-american-airlines-boeing-777-323er'},
  354:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1917930/n802an-american-airlines-boeing-787-8-dreamliner'},
  355:{by:'OMGcat',link:'https://www.planespotters.net/photo/1852559/n17122-united-airlines-boeing-757-224-wl'},
  356:{by:'Howard Wang',link:'https://www.planespotters.net/photo/1931691/n66051-united-airlines-boeing-767-424er'},
  357:{by:'Matthias Klassen',link:'https://www.planespotters.net/photo/1667664/n47280-united-airlines-boeing-737-8-max'},
  358:{by:'Tran Nguyen An Binh',link:'https://www.planespotters.net/photo/1871476/n3748y-delta-air-lines-boeing-737-832-wl'},
  359:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1891035/n821dn-delta-air-lines-boeing-737-932er-wl'},
  360:{by:'AidanBurke05',link:'https://www.planespotters.net/photo/1886397/n858nw-delta-air-lines-airbus-a330-223'},
  361:{by:'OMGcat',link:'https://www.planespotters.net/photo/1933658/n810nw-delta-air-lines-airbus-a330-323'},
  362:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1900559/n188dn-delta-air-lines-boeing-767-332er-wl'},
  363:{by:'M Kramer',link:'https://www.planespotters.net/photo/1931854/xa-amt-aeromexico-boeing-737-8-max'},
  364:{by:'Mingfei S',link:'https://www.planespotters.net/photo/1709719/xa-maq-aeromexico-boeing-737-8-max'},
  365:{by:'Jon Marzo',link:'https://www.planespotters.net/photo/1598118/xa-aml-aeromexico-boeing-737-852-wl'},
  366:{by:'Felipe Garcia R.',link:'https://www.planespotters.net/photo/1696142/xa-amu-aeromexico-boeing-737-852-wl'},
  367:{by:'Swoboda Darius',link:'https://www.planespotters.net/photo/1929205/n967am-aeromexico-boeing-787-8-dreamliner'},
  368:{by:'Niclas Karich',link:'https://www.planespotters.net/photo/1944232/b-2032-air-china-boeing-777-39ler'},
  369:{by:'HJM',link:'https://www.planespotters.net/photo/1926029/b-2087-air-china-boeing-777-39ler'},
  370:{by:'Farkas Tamás',link:'https://www.planespotters.net/photo/1933772/b-7878-air-china-boeing-787-9-dreamliner'},
  371:{by:'GONG ZI MING',link:'https://www.planespotters.net/photo/1938086/b-1466-air-china-boeing-787-9-dreamliner'},
  372:{by:'Gerrit Griem',link:'https://www.planespotters.net/photo/1929130/b-5916-air-china-airbus-a330-343'},
  373:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1931883/b-1085-air-china-airbus-a350-941'},
  374:{by:'Leo',link:'https://www.planespotters.net/photo/1937023/b-32f1-air-china-airbus-a350-941'},
  375:{by:'OMGcat',link:'https://www.planespotters.net/photo/1930407/ja831j-japan-airlines-boeing-787-8-dreamliner'},
  376:{by:'Yerbol Yespol - Kazakhstan Spotting Club',link:'https://www.planespotters.net/photo/1895441/tc-lch-turkish-airlines-boeing-737-8-max'},
  377:{by:'Gabor Podlovics',link:'https://www.planespotters.net/photo/1910049/tc-jva-turkish-airlines-boeing-737-8f2-wl'},
  378:{by:'miramila',link:'https://www.planespotters.net/photo/1888112/tc-joh-turkish-airlines-airbus-a330-303'},
  379:{by:'Rafal Pruszkowski',link:'https://www.planespotters.net/photo/1846289/hz-ar25-saudia-boeing-787-10-dreamliner'},
  380:{by:'耗子哥',link:'https://www.planespotters.net/photo/1939942/hz-arf-saudia-boeing-787-9-dreamliner'},
  381:{by:'Lukas Ponitka-Bessert',link:'https://www.planespotters.net/photo/1938694/vt-alm-air-india-boeing-777-337er'},
  382:{by:'Gerhard.zant',link:'https://www.planespotters.net/photo/1918744/vt-alp-air-india-boeing-777-337er'},
  383:{by:'Piotr Persona',link:'https://www.planespotters.net/photo/1897506/vt-jra-air-india-airbus-a350-941'},
  384:{by:'Marc Najberg',link:'https://www.planespotters.net/photo/1901963/cc-cxj-latam-airlines-chile-boeing-767-316er-wl'},
  385:{by:'Stephen J Stein',link:'https://www.planespotters.net/photo/1869876/cc-bbc-latam-airlines-chile-boeing-787-8-dreamliner'},
  386:{by:'Carlos Ospino',link:'https://www.planespotters.net/photo/1875754/cc-bla-latam-airlines-chile-airbus-a320-233'},
  387:{by:'Maurice Becker',link:'https://www.planespotters.net/photo/1814279/cc-bea-latam-airlines-chile-airbus-a321-211-wl'},
  388:{by:'Martin Tietz',link:'https://www.planespotters.net/photo/1931347/vn-a897-vietnam-airlines-airbus-a350-941'},
  389:{by:'K M',link:'https://www.planespotters.net/photo/1909561/vn-a888-vietnam-airlines-airbus-a350-941'},
  390:{by:'Bui Duc Thien',link:'https://www.planespotters.net/photo/1898594/vn-a872-vietnam-airlines-boeing-787-10-dreamliner'},
  391:{by:'Kinmei',link:'https://www.planespotters.net/photo/1641889/vn-a622-vietnam-airlines-airbus-a321-272n'},
  392:{by:'sgthy1609',link:'https://www.planespotters.net/photo/1918024/9v-swi-singapore-airlines-boeing-777-312er'},
  393:{by:'Mario Ferioli',link:'https://www.planespotters.net/photo/1889149/tc-jju-turkish-airlines-boeing-777-3f2er'},
  394:{by:'András Soós',link:'https://www.planespotters.net/photo/1886487/tc-jrr-turkish-airlines-airbus-a321-231'},
  395:{by:'OMGcat',link:'https://www.planespotters.net/photo/1929780/oh-lwb-finnair-airbus-a350-941'},
  396:{by:'Spotting Avgeek',link:'https://www.planespotters.net/photo/1935446/ja732j-japan-airlines-boeing-777-346er'},
  397:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1911902/a7-baf-qatar-airways-boeing-777-3dzer'},
  398:{by:'Aldo Martinelli',link:'https://www.planespotters.net/photo/1930074/ph-bva-klm-royal-dutch-airlines-boeing-777-306er'},
  399:{by:'Guillaume',link:'https://www.planespotters.net/photo/1545144/f-gtae-air-france-airbus-a321-212'},
  400:{by:'Swisse',link:'https://www.planespotters.net/photo/1852845/tf-fiu-icelandair-boeing-757-256-wl'},
  401:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1929727/n915nn-american-airlines-boeing-737-823-wl'},
  402:{by:'Tom Freeman',link:'https://www.planespotters.net/photo/1901099/n533as-alaska-airlines-boeing-737-890-wl'},
  403:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1906920/d-aiua-lufthansa-airbus-a320-214-wl'},
  404:{by:'R.Bexten',link:'https://www.planespotters.net/photo/1937052/hl7783-korean-air-boeing-777-3b5er'},
  405:{by:'Jon Marzo',link:'https://www.planespotters.net/photo/1813025/n36272-united-airlines-boeing-737-824-wl'},
  406:{by:'Kass B',link:'https://www.planespotters.net/photo/1949968/n75435-united-airlines-boeing-737-924er-wl'},
  407:{by:'G. Najberg',link:'https://www.planespotters.net/photo/1920885/n916nn-american-airlines-boeing-737-823-wl'},
  408:{by:'Jorge Solano',link:'https://www.planespotters.net/photo/1859591/n917nn-american-airlines-boeing-737-823-wl'},
  409:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1891545/n578uw-american-airlines-airbus-a321-231'},
  410:{by:'Bram Steeman',link:'https://www.planespotters.net/photo/1950010/n411dx-delta-air-lines-airbus-a330-941'},
  411:{by:'Parker White',link:'https://www.planespotters.net/photo/1833922/n230wn-southwest-airlines-boeing-737-7h4-wl'},
  412:{by:'Ruoyang Yan',link:'https://www.planespotters.net/photo/1809639/n8620h-southwest-airlines-boeing-737-8h4-wl'},
  413:{by:'Donald e Moore',link:'https://www.planespotters.net/photo/1948067/n596as-alaska-airlines-boeing-737-890-wl'},
  414:{by:'Westley_SJU',link:'https://www.planespotters.net/photo/1943585/n775jb-jetblue-airbus-a320-232'},
  415:{by:'Andrew Kuznetsov',link:'https://www.planespotters.net/photo/1877058/n779jb-jetblue-airbus-a320-232'},
  416:{by:'Cameron Stone',link:'https://www.planespotters.net/photo/1360371/n227ha-hawaiian-airlines-airbus-a321-271n'},
  417:{by:'Rafal Pruszkowski',link:'https://www.planespotters.net/photo/1880345/cs-tjr-tap-air-portugal-airbus-a321-251nx'},
  418:{by:'Herbert Sandla',link:'https://www.planespotters.net/photo/1937701/oe-lbo-austrian-airlines-airbus-a320-214'},
  419:{by:'Conor Ewings',link:'https://www.planespotters.net/photo/1947522/ei-dvm-aer-lingus-airbus-a320-214'},
  420:{by:'Marcelo De Biasi',link:'https://www.planespotters.net/photo/1946154/oo-sbb-brussels-airlines-airbus-a320-251n'},
  421:{by:'Moritz Babl',link:'https://www.planespotters.net/photo/1947601/oo-snj-brussels-airlines-airbus-a320-214'},
  422:{by:'Marvin Knitl',link:'https://www.planespotters.net/photo/1937059/sx-dvq-aegean-airlines-airbus-a320-232'},
  423:{by:'Alexander Jeglitsch',link:'https://www.planespotters.net/photo/1897836/ec-mle-vueling-airbus-a320-232-wl'},
  424:{by:'Rui Sequeira',link:'https://www.planespotters.net/photo/1940285/ec-mjb-vueling-airbus-a320-232-wl'},
  425:{by:'Bram Steeman',link:'https://www.planespotters.net/photo/1915783/ec-lzn-vueling-airbus-a320-214-wl'},
  426:{by:'Wolfgang Kaiser',link:'https://www.planespotters.net/photo/1932709/tc-ljj-turkish-airlines-boeing-777-3f2er'},
  427:{by:'Dirk Grothe',link:'https://www.planespotters.net/photo/1942721/ei-dsy-ita-airways-airbus-a320-216'},
  428:{by:'Zoltan Kara',link:'https://www.planespotters.net/photo/1939756/9h-wnm-wizz-air-malta-airbus-a321-271nx'},
  429:{by:'Cph.spots - Den',link:'https://www.planespotters.net/photo/1948737/ln-rkr-sas-scandinavian-airlines-airbus-a330-343'},
  430:{by:'BjörnD',link:'https://www.planespotters.net/photo/1896835/ja873a-all-nippon-airways-boeing-787-9-dreamliner'},
  431:{by:'Feijikaide',link:'https://www.planespotters.net/photo/1930214/ja837j-japan-airlines-boeing-787-8-dreamliner'},
  432:{by:'Farkas Tamás',link:'https://www.planespotters.net/photo/1011402/9v-ski-singapore-airlines-airbus-a380-841'},
  433:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1944840/b-kqu-cathay-pacific-boeing-777-367er'},
  434:{by:'Juan Manuel Gibaja',link:'https://www.planespotters.net/photo/1946895/b-lrj-cathay-pacific-airbus-a350-941'},
  435:{by:'R.Bexten',link:'https://www.planespotters.net/photo/1938964/b-16217-eva-air-airbus-a321-211-wl'},
  436:{by:'WJh',link:'https://www.planespotters.net/photo/1946448/b-16331-eva-air-airbus-a330-302'},
  437:{by:'Maurice Becker',link:'https://www.planespotters.net/photo/1913583/vh-znd-qantas-boeing-787-9-dreamliner'},
  438:{by:'Zhou Qiming',link:'https://www.planespotters.net/photo/1916856/hl7204-korean-air-boeing-777-3b5er'},
  439:{by:'R.Bexten',link:'https://www.planespotters.net/photo/1936167/hl8009-korean-air-boeing-777-3b5er'},
  440:{by:'Timmy Tam',link:'https://www.planespotters.net/photo/1554134/hs-tkf-thai-airways-boeing-777-3d7'},
  441:{by:'hikoukiana',link:'https://www.planespotters.net/photo/1930588/pk-gpy-garuda-indonesia-airbus-a330-343'},
  442:{by:'Jhang Yao Yun',link:'https://www.planespotters.net/photo/1948088/b-18918-china-airlines-airbus-a350-941'},
  443:{by:'Radiance777',link:'https://www.planespotters.net/photo/1907162/9m-mag-malaysia-airlines-airbus-a350-941'},
  444:{by:'ZSAM~L',link:'https://www.planespotters.net/photo/1935810/a6-eeu-emirates-airbus-a380-861'},
  445:{by:'Xu',link:'https://www.planespotters.net/photo/1950355/a6-eom-emirates-airbus-a380-861'},
  446:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1933779/a6-aph-etihad-airways-airbus-a380-861'},
  447:{by:'Mixi',link:'https://www.planespotters.net/photo/1931538/a6-bnd-etihad-airways-boeing-787-9-dreamliner'},
  448:{by:'Raihan Ahmed',link:'https://www.planespotters.net/photo/1873034/a7-beb-qatar-airways-boeing-777-3dzer'},
  449:{by:'WJh',link:'https://www.planespotters.net/photo/1933512/a7-alz-qatar-airways-airbus-a350-941'},
  450:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1926361/hz-ak43-saudia-boeing-777-368er'},
  451:{by:'aideenkhan13 ',link:'https://www.planespotters.net/photo/1817984/et-atg-ethiopian-airlines-boeing-787-8-dreamliner'},
  452:{by:'X PAN',link:'https://www.planespotters.net/photo/1917876/5y-kzd-kenya-airways-boeing-787-8-dreamliner'},
  453:{by:'Mingfei S',link:'https://www.planespotters.net/photo/1898558/xa-gqs-aeromexico-boeing-737-9-max'},
  454:{by:'Carlos Ospino',link:'https://www.planespotters.net/photo/1875753/n284av-avianca-colombia-airbus-a320-214'},
  455:{by:'Tom_YA',link:'https://www.planespotters.net/photo/1939286/cc-bbe-lan-airlines-boeing-787-8-dreamliner'},
  456:{by:'ZYS031201_',link:'https://www.planespotters.net/photo/1942434/b-2006-air-china-boeing-777-39ler'},
  457:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1940190/c-gnbn-air-canada-airbus-a220-300-bd-500-1a11'},
  458:{by:'X PAN',link:'https://www.planespotters.net/photo/1895651/g-vsrb-virgin-atlantic-airbus-a330-941'},
  459:{by:'Jackyu',link:'https://www.planespotters.net/photo/1949603/n522dz-delta-air-lines-airbus-a350-941'},
  460:{by:'zspdjj',link:'https://www.planespotters.net/photo/1932929/n521dn-delta-air-lines-airbus-a350-941'},
  461:{by:'OMGcat',link:'https://www.planespotters.net/photo/1935653/n391dn-delta-air-lines-airbus-a321-211-wl'},
  462:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1930531/n845mh-delta-air-lines-boeing-767-432er'},
  463:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1929770/n3758y-delta-air-lines-boeing-737-832-wl'},
  464:{by:'Ruoyang Yan',link:'https://www.planespotters.net/photo/1942938/n3761r-delta-air-lines-boeing-737-832-wl'},
  465:{by:'Steven Ma',link:'https://www.planespotters.net/photo/1594040/n381dn-delta-air-lines-boeing-737-832-wl'},
  466:{by:'Nicholas Toto',link:'https://www.planespotters.net/photo/1947660/n537as-alaska-airlines-boeing-737-890-wl'},
  467:{by:'Abdeyan',link:'https://www.planespotters.net/photo/1946617/n659qx-alaska-airlines-embraer-erj-175lr-erj-170-200-lr'},
  468:{by:'Nicholas Toto',link:'https://www.planespotters.net/photo/1872510/n8619f-southwest-airlines-boeing-737-8h4-wl'},
  469:{by:'Parker White',link:'https://www.planespotters.net/photo/1924985/n581uw-american-airlines-airbus-a321-231'},
  470:{by:'Parker White',link:'https://www.planespotters.net/photo/1925370/n582uw-american-airlines-airbus-a321-231'},
  471:{by:'Ethan Yang',link:'https://www.planespotters.net/photo/1835119/n579uw-american-airlines-airbus-a321-231'},
  472:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1891408/n162aa-american-airlines-airbus-a321-231-wl'},
  473:{by:'Leon Cai',link:'https://www.planespotters.net/photo/1905294/n796an-american-airlines-boeing-777-223er'},
  474:{by:'Bluebirds',link:'https://www.planespotters.net/photo/1947073/n735at-american-airlines-boeing-777-323er'},
  475:{by:'Justin Stöckel',link:'https://www.planespotters.net/photo/1887603/c-fkau-air-canada-boeing-777-333er'},
  476:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1891096/n77022-united-airlines-boeing-777-224er'},
  477:{by:'ELP_Planespotter',link:'https://www.planespotters.net/photo/1935772/n475ua-united-airlines-airbus-a320-232'},
  478:{by:'Marc Najberg',link:'https://www.planespotters.net/photo/1891869/n375ha-hawaiian-airlines-airbus-a330-243'},
  479:{by:'Alon Varshaver ',link:'https://www.planespotters.net/photo/1909020/n615jb-jetblue-airbus-a320-232'},
  480:{by:'Nicholas Toto',link:'https://www.planespotters.net/photo/1912718/n531jl-jetblue-airbus-a320-232'},
  481:{by:'Nicholas Toto',link:'https://www.planespotters.net/photo/1872509/n280wn-southwest-airlines-boeing-737-7h4-wl'},
  482:{by:'Martin Nimmervoll',link:'https://www.planespotters.net/photo/1936058/d-abyt-lufthansa-boeing-747-830'},
  483:{by:'Lennard Rogg',link:'https://www.planespotters.net/photo/1943249/d-aizg-lufthansa-airbus-a320-214'},
  484:{by:'Alexandr Balykin',link:'https://www.planespotters.net/photo/1914687/tc-jnc-turkish-airlines-airbus-a330-203'},
  485:{by:'Daniel Nagy',link:'https://www.planespotters.net/photo/1931741/hb-jca-swiss-bombardier-cseries-cs300-bd-500-1a11'},
  486:{by:'Jan Seler',link:'https://www.planespotters.net/photo/1922335/yl-csl-airbaltic-airbus-a220-300-bd-500-1a11'},
  487:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1941250/yl-csj-airbaltic-airbus-a220-300-bd-500-1a11'},
  488:{by:'Valentin Römer',link:'https://www.planespotters.net/photo/1867747/yl-csk-airbaltic-airbus-a220-300-bd-500-1a11'},
  489:{by:'Joost Alexander',link:'https://www.planespotters.net/photo/1910909/ec-nfz-iberia-airbus-a320-251n'},
  490:{by:'Paul Buchroeder',link:'https://www.planespotters.net/photo/1948423/d-aewm-eurowings-airbus-a320-214-wl'},
  491:{by:'Marco Coldewey',link:'https://www.planespotters.net/photo/1945698/d-amah-tuifly-boeing-737-8-max'},
  492:{by:'Stephen Lian',link:'https://www.planespotters.net/photo/1940886/sp-lsc-lot-polish-airlines-boeing-787-9-dreamliner'},
  493:{by:'OMGcat',link:'https://www.planespotters.net/photo/1820067/oh-lwo-finnair-airbus-a350-941'},
  494:{by:'Malte Zastrow',link:'https://www.planespotters.net/photo/1944265/oh-lwp-finnair-airbus-a350-941'},
  495:{by:'Chris de Breun',link:'https://www.planespotters.net/photo/1904172/f-huvj-air-france-airbus-a350-941'},
  496:{by:'Gerrit Griem',link:'https://www.planespotters.net/photo/1949110/sx-dvr-aegean-airlines-airbus-a320-232'},
  497:{by:'Chris Lofting',link:'https://www.planespotters.net/photo/1942306/9a-cae-croatia-airlines-airbus-a220-300-bd-500-1a11'},
  498:{by:'Marcel Rudolf',link:'https://www.planespotters.net/photo/1933446/d-aiad-condor-airbus-a321-211-wl'},
  499:{by:'Zhou Qiming',link:'https://www.planespotters.net/photo/1949714/ja743a-all-nippon-airways-boeing-777-281er'},
  500:{by:'Jack Sin',link:'https://www.planespotters.net/photo/1949484/ja819a-all-nippon-airways-boeing-787-8-dreamliner'},
  501:{by:'FLX.Aviation',link:'https://www.planespotters.net/photo/1911126/ja923a-all-nippon-airways-boeing-787-9-dreamliner'},
  502:{by:'ZYTL_PST',link:'https://www.planespotters.net/photo/1936734/ja823j-japan-airlines-boeing-787-8-dreamliner'},
  503:{by:'Wuthiwong Wimolsakcharoen',link:'https://www.planespotters.net/photo/1854272/ja252j-j-air-embraer-erj-190std-erj-190-100'},
  504:{by:'Alphathreeeighty',link:'https://www.planespotters.net/photo/1945036/a7-beh-qatar-airways-boeing-777-3dzer'},
  505:{by:'Jhang Yao Yun',link:'https://www.planespotters.net/photo/1930586/hs-thq-thai-airways-airbus-a350-941'},
  506:{by:'Tony',link:'https://www.planespotters.net/photo/1944494/hs-thu-thai-airways-airbus-a350-941'},
  507:{by:'Wuthiwong Wimolsakcharoen',link:'https://www.planespotters.net/photo/1942201/b-20ec-juneyao-airlines-boeing-787-9-dreamliner'},
  508:{by:'Lisandro Pitowski',link:'https://www.planespotters.net/photo/1906748/dq-fam-fiji-airways-airbus-a350-941'},
  509:{by:'Muhammad Aria Alauddin',link:'https://www.planespotters.net/photo/1925270/9m-lrk-batik-air-malaysia-boeing-737-8-max'},
  510:{by:'System 45',link:'https://www.planespotters.net/photo/1904531/9m-lrv-batik-air-malaysia-boeing-737-8-max'},
  511:{by:'Tang Yubo',link:'https://www.planespotters.net/photo/1944973/9m-lcu-batik-air-malaysia-boeing-737-8u3-wl'},
  512:{by:'Stephen Duquemin',link:'https://www.planespotters.net/photo/1042085/a6-apc-etihad-airways-airbus-a380-861'},
  513:{by:'Florian Venus',link:'https://www.planespotters.net/photo/1845351/vt-atv-air-india-airbus-a320-251n'},
  514:{by:'WLGAviation',link:'https://www.planespotters.net/photo/1905637/vh-x4a-qantaslink-airbus-a220-300-bd-500-1a11'},
  515:{by:'OMGcat',link:'https://www.planespotters.net/photo/1935654/n589dt-delta-air-lines-airbus-a321-271nx'},
  516:{by:'Joost Alexander',link:'https://www.planespotters.net/photo/1944944/n527dn-delta-air-lines-airbus-a350-941'},
  517:{by:'Frederick Tremblay',link:'https://www.planespotters.net/photo/1889326/f-omua-air-tahiti-nui-boeing-787-9-dreamliner'},
  518:{by:'System 45',link:'https://www.planespotters.net/photo/1909772/f-otoa-air-tahiti-nui-boeing-787-9-dreamliner'},
  519:{by:'Ethan Yang',link:'https://www.planespotters.net/photo/1895702/f-ovaa-air-tahiti-nui-boeing-787-9-dreamliner'},
  520:{by:'Niclas Karich',link:'https://www.planespotters.net/photo/1943087/b-306n-sichuan-airlines-airbus-a350-941'},
  521:{by:'Emil L',link:'https://www.planespotters.net/photo/1948418/b-7302-hainan-airlines-boeing-787-9-dreamliner'},
  522:{by:'Emil L',link:'https://www.planespotters.net/photo/1948417/b-1540-hainan-airlines-boeing-787-9-dreamliner'},
  523:{by:'fxzlszc',link:'https://www.planespotters.net/photo/1944908/b-1356-xiamen-airlines-boeing-787-9-dreamliner'},
  524:{by:'ARAI118.100',link:'https://www.planespotters.net/photo/1939010/9v-ojj-scoot-boeing-787-9-dreamliner'},
  525:{by:'Yerbol Yespol - Kazakhstan Spotting Club',link:'https://www.planespotters.net/photo/1737041/p4-kha-air-astana-embraer-e190-e2-erj-190-300-std'},
  526:{by:'Martin Oswald',link:'https://www.planespotters.net/photo/1923301/n986nk-spirit-airlines-airbus-a320-271n'},
  527:{by:'Alonso Cisneros',link:'https://www.planespotters.net/photo/1921419/hp-1841cmp-copa-airlines-boeing-737-8v3-wl'},
  528:{by:'Aleksey Simanovich',link:'https://www.planespotters.net/photo/1221746/vp-bog-s7-airlines-airbus-a320-214-wl'},
  529:{by:'Mehrad Watson',link:'https://www.planespotters.net/photo/1938366/yu-arb-air-serbia-airbus-a330-243'},
  530:{by:'TulZub Promkhuntong',link:'https://www.planespotters.net/photo/1887511/yu-apc-air-serbia-airbus-a319-131'},
  531:{by:'Jacob Reppert',link:'https://www.planespotters.net/photo/1922434/n842sy-sun-country-airlines-boeing-737-8k5-wl'},
  532:{by:'Undisclosed, Russia',link:'https://www.planespotters.net/photo/1278941/vp-bnt-aeroflot-russian-airlines-airbus-a320-214-wl'},
  533:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1898633/a9c-fg-gulf-air-boeing-787-9-dreamliner'},
  534:{by:'Marc Najberg',link:'https://www.planespotters.net/photo/1938041/a9c-nb-gulf-air-airbus-a321-253nx'},
  535:{by:'Gerrit Griem',link:'https://www.planespotters.net/photo/1917151/jy-rak-royal-jordanian-airbus-a320-271n'},
  536:{by:'JRC Aviation',link:'https://www.planespotters.net/photo/1933893/su-ggb-egyptair-boeing-737-81m-wl'},
  537:{by:'Antônio Carlos Carvalho Jr',link:'https://www.planespotters.net/photo/1777001/pr-ysh-azul-airbus-a320-251n'},
  538:{by:'Yara David',link:'https://www.planespotters.net/photo/1895550/ps-aef-azul-embraer-e195-e2-erj-190-400-std'},
  539:{by:'Gerrit Griem',link:'https://www.planespotters.net/photo/1866220/pr-anv-azul-airbus-a330-941'},
  540:{by:'Jan Seler',link:'https://www.planespotters.net/photo/1936628/vt-anu-air-india-boeing-787-8-dreamliner'},
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
// v4: seed photos moved from hotlinked planespotters URLs to self-hosted photos/seed-*.jpg.
// v5: expanded fleet (more airliners + airlines + military); fixed #7/#8 photos & registrations.
// v6: added 35 world airlines + special/retro liveries (AstroJet, BEA, Retro Roo, All Blacks, etc.).
// v7: fleet depth — more types & liveries per airline (Flying Honu, Hello Kitty, Marimekko, oneworld, etc.).
// v8: fleet-accuracy pass — retired A380s (Air France, Thai, Malaysia, China Southern) and
//     Virgin Australia's 777-300ER relabelled from "current" to historical/retired catches.
// v9: big-carrier fleet depth — 42 verified types across 15 airlines (Air Canada, AA, UA, BA,
//     LH, AF, EK, QR, SQ, CX, IB, ANA, KLM, QF), live-hydrated by registration via the photo API.
// v10: deeper North American fleets — Air Canada A320/A321 families + extra examples, and
//      United/American/Delta widebody depth (21 more verified, live-hydrated by reg).
// v13: thin-carrier fleet depth — Aeroméxico, Air China, JAL, Turkish, Saudia, Air India,
//      LATAM, Vietnam (29 more verified, live-hydrated by reg).
// v14: more liveries per airline — alliance schemes (Star Alliance/oneworld/SkyTeam), Icelandair
//      Hekla Aurora, TWA heritage; fixed #30 (N559AS is the Xaat Kwaani salmon livery, not standard).
// v15: live traffic — enriched 222 entries with icao24 hex for the "rare planes near you" feature
//      (airplanes.live primary + OpenSky failover), used to match live ADS-B against the catalog.
// v16: livery-accuracy pass — relabeled ~30 entries whose photos show a special/alliance scheme
//      but were labeled "Current" (Star Alliance/oneworld/SkyTeam, Quetzalcoatl, Welcome to Arabia,
//      Wings of Dreams, Pride, Lufthansa Centennial, Maple Leaf retro, etc.) and swapped a few
//      blank/duplicate photos. Bumped so returning visitors refresh their cached seed entries.
// v17: relabel Vietnam Airlines VN-A868 (787-9) from Golden Lotus to its actual "Chim Lạc"
//      (Lạc Bird) 30th-anniversary special livery.
// v18: split Air India entries by actual livery — VT-EXF/VT-JRA wear the new 2023 Tata "Vista"
//      livery; VT-ANP/VT-ALM/VT-ALP still wear the previous "Konark sun" livery.
const SEED_VERSION = 25;
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
  if (!l.photo) return `<img class="swatch-photo" alt="" loading="lazy" decoding="async">`;
  const cr = l.credit ? ` alt="© ${esc(l.credit.by)} / Planespotters" title="© ${esc(l.credit.by)} · Planespotters"` : ' alt=""';
  return `<img class="swatch-photo loaded" src="${esc(l.photo)}"${cr} loading="lazy" decoding="async" onerror="this.classList.remove('loaded')">`;
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
    // Bound the request so a slow/hung Planespotters call can't leave the swatch pending forever.
    const ctl = AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined;
    const res = await fetch(`https://api.planespotters.net/pub/photos/reg/${encodeURIComponent(reg)}`,
      ctl ? { signal: ctl } : {});
    if (!res.ok) { photoCache[reg] = { state: 'error' }; return photoCache[reg]; }
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
// Requests run through a small worker pool so a page full of un-cached swatches
// can't fire dozens of parallel Planespotters calls at once (and risk a 429).
const HYDRATE_CONCURRENCY = 5;
function hydratePhotos(root) {
  const swatches = [...(root || document).querySelectorAll('.card-swatch[data-reg]')]
    .filter(sw => !sw.dataset.hydrated);
  swatches.forEach(sw => { sw.dataset.hydrated = '1'; }); // claim up front so re-entry skips them
  let next = 0;
  const worker = async () => {
    while (next < swatches.length) {
      const sw = swatches[next++];
      const res = await getPhoto(sw.dataset.reg);
      if (res.state === 'done') {
        const img = sw.querySelector('.swatch-photo');
        if (img) { img.onload = () => img.classList.add('loaded'); img.src = res.photo.src; }
      }
    }
  };
  for (let w = 0; w < Math.min(HYDRATE_CONCURRENCY, swatches.length); w++) worker();
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
      ${liveDetailHTML(l)}
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
  const hint = document.getElementById('sub-autofill');
  if (hint) hint.style.display = 'none';
}

// When you log a plane, look up its tail number in the catalog and pull the real livery's
// colors straight into the swatch — so a known frame paints itself in from its registration.
// Colors always come from the matched livery (that's the whole point); text fields are only
// filled where you haven't typed anything, so we never clobber what you entered.
function autofillFromTail() {
  const tailEl = document.getElementById('sub-tail');
  const hint = document.getElementById('sub-autofill');
  if (!tailEl) return;
  const raw = tailEl.value.trim();
  const match = raw ? liveryForLive({ reg: raw }) : null;
  // Ignore a self-match while editing (an entry shouldn't recolor itself from itself).
  if (!match || match.id === editingId) { if (hint) hint.style.display = 'none'; return; }

  const colors = match.colors || DEFAULT_COLORS;
  document.getElementById('sub-c1').value = hexOrDefault(colors[0], DEFAULT_COLORS[0]);
  document.getElementById('sub-c2').value = hexOrDefault(colors[1], DEFAULT_COLORS[1]);
  document.getElementById('sub-c3').value = hexOrDefault(colors[2], DEFAULT_COLORS[2]);

  const fill = (id, val) => { const el = document.getElementById(id); if (el && !el.value.trim() && val) el.value = val; };
  fill('sub-airline', match.airline);
  fill('sub-livery', match.livery);
  fill('sub-type', (match.type && match.type !== 'Unknown') ? match.type : '');
  const eraEl = document.getElementById('sub-era');
  if (eraEl && !eraEl.value && ERAS.includes(match.era)) eraEl.value = match.era;
  const tagsEl = document.getElementById('sub-tags');
  if (tagsEl && !tagsEl.value.trim() && match.tags && match.tags.length) tagsEl.value = match.tags.join(', ');

  if (hint) {
    hint.textContent = `✓ Matched ${match.airline} — ${match.livery}. Colors pulled from the catalog.`;
    hint.style.display = 'block';
  }
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

// A numeric, collision-free id for a new submission. Based on Date.now() so it stays a
// creation-order proxy (see cardHTML's upload-date), but bumped past any id already in the
// db — guards against two submits in the same millisecond and any seed-id overlap. Numeric
// is required: ids are embedded raw into onclick handlers (openDetail(${l.id})).
function nextLiveryId() {
  const used = new Set(db.map(x => x.id));
  let id = Date.now();
  while (used.has(id)) id++;
  return id;
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
    db.push({ id: nextLiveryId(), airline, tail: tail.toUpperCase(), type: type || 'Unknown', era: era || 'Unknown', livery, colors, tags, notes, photo: formPhoto, sightings: [], submitted: true });
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

// ══════════════════════════════════════════════════════════════════════════
//  LIVE TRAFFIC — "rare planes near you"
//
//  Primary source: airplanes.live (CORS-open, no auth, returns registration
//  directly). Failover: /api/opensky (Vercel serverless proxy, this repo).
//  We match each live aircraft against the catalog by registration (tail) or,
//  for the OpenSky path, by the enriched icao24 hex.
// ══════════════════════════════════════════════════════════════════════════
const LIVE = {
  radiusNm: 90,          // default scan radius
  airports: null,        // lazily-loaded airports.json
  airportsPromise: null,
};

// ── geo helpers ──
const NM_PER_DEG = 60;
function toRad(d) { return d * Math.PI / 180; }
function haversineNm(aLat, aLon, bLat, bLon) {
  const R = 3440.065; // nautical miles
  const dLat = toRad(bLat - aLat), dLon = toRad(bLon - aLon);
  const s = Math.sin(dLat/2)**2 + Math.cos(toRad(aLat))*Math.cos(toRad(bLat))*Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
function bearingDeg(aLat, aLon, bLat, bLon) {
  const y = Math.sin(toRad(bLon-aLon)) * Math.cos(toRad(bLat));
  const x = Math.cos(toRad(aLat))*Math.sin(toRad(bLat)) -
            Math.sin(toRad(aLat))*Math.cos(toRad(bLat))*Math.cos(toRad(bLon-aLon));
  return (Math.atan2(y, x) * 180/Math.PI + 360) % 360;
}
function compass(deg) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8];
}

// ── airports.json (lazy) ──
function loadAirports() {
  if (LIVE.airportsPromise) return LIVE.airportsPromise;
  LIVE.airportsPromise = fetch('airports.json')
    .then(r => r.ok ? r.json() : [])
    .then(list => { LIVE.airports = list; return list; })
    .catch(() => { LIVE.airports = []; return []; });
  return LIVE.airportsPromise;
}
function nearestAirport(lat, lon) {
  if (!LIVE.airports || !LIVE.airports.length) return null;
  let best = null, bestD = Infinity;
  for (const a of LIVE.airports) {
    const d = haversineNm(lat, lon, a.lat, a.lon);
    if (d < bestD) { bestD = d; best = a; }
  }
  return best ? { ...best, distNm: bestD } : null;
}
function airportsNear(lat, lon, n = 6) {
  if (!LIVE.airports) return [];
  return LIVE.airports
    .map(a => ({ ...a, distNm: haversineNm(lat, lon, a.lat, a.lon) }))
    .sort((x, y) => x.distNm - y.distNm)
    .slice(0, n);
}
// Resolve a free-text sighting location ("KLAX", "JFK", "Heathrow") to an airport.
function airportByText(text) {
  if (!LIVE.airports || !text) return null;
  const t = text.trim().toUpperCase();
  const code = t.replace(/[^A-Z0-9]/g, '');
  let hit = LIVE.airports.find(a => a.iata === code || a.icao === code);
  if (hit) return hit;
  // first token as IATA/ICAO, else loose name/city contains
  const tok = code.slice(0, 4);
  hit = LIVE.airports.find(a => a.icao === tok) ||
        LIVE.airports.find(a => a.iata === tok.slice(0, 3));
  if (hit) return hit;
  const low = text.trim().toLowerCase();
  return LIVE.airports.find(a =>
    (a.name && a.name.toLowerCase().includes(low)) ||
    (a.city && a.city.toLowerCase().includes(low))) || null;
}

// ── catalog index (tail + hex → livery) ──
let _liveIndex = null;
function liveIndex() {
  if (_liveIndex) return _liveIndex;
  const byReg = new Map(), byHex = new Map();
  for (const l of db) {
    if (l.tail) byReg.set(l.tail.toUpperCase().replace(/[^A-Z0-9]/g, ''), l);
    if (l.icao24) byHex.set(l.icao24.toLowerCase(), l);
  }
  _liveIndex = { byReg, byHex };
  return _liveIndex;
}
function liveryForLive(ac) {
  const idx = liveIndex();
  if (ac.reg) {
    const hit = idx.byReg.get(ac.reg.toUpperCase().replace(/[^A-Z0-9]/g, ''));
    if (hit) return hit;
  }
  if (ac.hex) {
    const hit = idx.byHex.get(ac.hex.toLowerCase());
    if (hit) return hit;
  }
  return null;
}

// ── rarity ──
// "Rare planes near you" must only surface genuinely uncommon catches — not the everyday
// scheme an airline flies on most of its fleet. Two independent ways to qualify:
//   1. RARE LIVERY  — a catalog entry whose paint is special/historic (retro, special scheme,
//      retired type, alliance, military display, etc.). A livery tagged 'current' is the
//      airline's standard fleet look (United globe, Delta widget, Frontier's animal tails) and
//      is NOT rare, even if it also carries a flashy tag.
//   2. RARE TYPE    — the airframe itself is an unusual sight (An-124, C-17, A380, Beluga…),
//      regardless of livery and regardless of whether it's in the catalog. Identified from the
//      live feed's ICAO type code, so it works for aircraft we don't track by tail.
// A live aircraft is shown only if it matches (1) or (2).

// tag → short badge label, scanned in priority order so the badge picks the best descriptor.
const RARE_TAG_LABELS = [
  ['retired', 'Retired type'], ['defunct', 'Defunct airline'], ['concorde', 'Concorde'],
  ['supersonic', 'Supersonic'], ['bare metal', 'Bare metal'], ['retro', 'Retro'],
  ['50th anniversary', 'Anniversary'], ['boac', 'Heritage'], ['bea', 'Heritage'],
  ['twa', 'Heritage'], ['astrojet', 'Heritage'], ['heritage', 'Heritage'],
  ['tribute', 'Tribute'], ['red arrows', 'Display team'], ['display', 'Display team'],
  ['stealth', 'Military'], ['bomber', 'Military'], ['fighter', 'Military'],
  ['warthog', 'Military'], ['attack', 'Military'], ['strategic', 'Military'],
  ['eagle', 'Military'], ['carrier', 'Military'], ['navy', 'Military'], ['raf', 'Military'],
  ['luftwaffe', 'Military'], ['f-35', 'Military'], ['electronic warfare', 'Military'],
  ['star alliance', 'Alliance'], ['oneworld', 'Alliance'], ['skyteam', 'Alliance'],
  ['hello kitty', 'Special'], ['marimekko', 'Special'], ['aurora', 'Special'],
  ['honu', 'Special'], ['salmon', 'Special'], ['indigenous', 'Special'],
  ['all blacks', 'Special'], ['state', 'Special'], ['flying lady', 'Classic'],
  ['tulip', 'Retro'], ['classic', 'Classic'], ['historic', 'Historic'],
  ['iconic', 'Iconic'], ['very rare', 'Very rare'], ['special', 'Special'], ['rare', 'Rare'],
];
function liveryRareReason(l) {
  const tags = (l.tags || []).map((t) => String(t).toLowerCase());
  if (tags.includes('current')) return null; // standard everyday fleet scheme
  for (const [tag, label] of RARE_TAG_LABELS) if (tags.includes(tag)) return label;
  return null;
}
function isRareLivery(l) {
  return liveryRareReason(l) != null;
}

// Unusual airframes — keyed by ICAO type designator (airplanes.live `t`). Each is a catch a
// spotter would stop for: outsized freighters, the last passenger jumbos/superjumbos, oddball
// transport, and heavy military. Common types (737/A320/787/etc.) are deliberately absent.
const RARE_TYPES = {
  A124: { name: 'Antonov An-124 Ruslan', note: 'Outsized strategic freighter', colors: ['#3A4A5A', '#9AA7B4', '#FFFFFF'] },
  A225: { name: 'Antonov An-225 Mriya', note: 'The largest aircraft ever built', colors: ['#1F4E79', '#C9D6E4', '#FFD200'] },
  AN22: { name: 'Antonov An-22 Antei', note: 'Turboprop heavy lifter', colors: ['#3A4A5A', '#9AA7B4', '#FFFFFF'] },
  AN12: { name: 'Antonov An-12', note: 'Classic Soviet transport', colors: ['#3A4A5A', '#9AA7B4', '#FFFFFF'] },
  IL76: { name: 'Ilyushin Il-76', note: 'Heavy jet freighter', colors: ['#3A4A5A', '#9AA7B4', '#FFFFFF'] },
  IL96: { name: 'Ilyushin Il-96', note: 'Rare Russian widebody', colors: ['#3A4A5A', '#9AA7B4', '#FFFFFF'] },
  C17: { name: 'Boeing C-17 Globemaster III', note: 'Strategic military airlifter', colors: ['#4B5320', '#7A8450', '#D6D6C2'] },
  C5M: { name: 'Lockheed C-5M Super Galaxy', note: 'Outsized military airlifter', colors: ['#4B5320', '#7A8450', '#D6D6C2'] },
  A400: { name: 'Airbus A400M Atlas', note: 'Military transport', colors: ['#4B5320', '#7A8450', '#D6D6C2'] },
  BLCF: { name: 'Boeing 747 Dreamlifter', note: 'Outsized 747 freighter', colors: ['#0B3D91', '#5C8AC6', '#FFFFFF'] },
  A3ST: { name: 'Airbus A300-600ST Beluga', note: 'Outsized cargo whale', colors: ['#1F6FB2', '#9AD0EC', '#FFFFFF'] },
  A337: { name: 'Airbus BelugaXL', note: 'Outsized cargo whale', colors: ['#1F6FB2', '#9AD0EC', '#FFFFFF'] },
  A388: { name: 'Airbus A380', note: 'Double-deck superjumbo', colors: ['#1B3A6B', '#8FA9CC', '#FFFFFF'] },
  B748: { name: 'Boeing 747-8', note: 'Last of the passenger jumbos', colors: ['#5A3A1B', '#A98A5C', '#FFFFFF'] },
  B741: { name: 'Boeing 747-100', note: 'Original jumbo jet', colors: ['#5A3A1B', '#A98A5C', '#FFFFFF'] },
  B742: { name: 'Boeing 747-200', note: 'Classic jumbo jet', colors: ['#5A3A1B', '#A98A5C', '#FFFFFF'] },
  B743: { name: 'Boeing 747-300', note: 'Stretched-upper-deck jumbo', colors: ['#5A3A1B', '#A98A5C', '#FFFFFF'] },
  VC25: { name: 'Boeing VC-25 (Air Force One)', note: 'Presidential 747', colors: ['#0A2A66', '#9CB6DD', '#FFFFFF'] },
  B52: { name: 'Boeing B-52 Stratofortress', note: 'Strategic bomber', colors: ['#4B5320', '#7A8450', '#D6D6C2'] },
  B1: { name: 'Rockwell B-1 Lancer', note: 'Supersonic bomber', colors: ['#3A3A3A', '#6E6E6E', '#B0B0B0'] },
  B2: { name: 'Northrop B-2 Spirit', note: 'Stealth bomber', colors: ['#1A1A1A', '#3A3A3A', '#6E6E6E'] },
  SR71: { name: 'Lockheed SR-71 Blackbird', note: 'Mach-3 reconnaissance', colors: ['#0A0A0A', '#2A2A2A', '#555555'] },
};
function rareTypeFor(ac) {
  const code = String(ac.type || '').toUpperCase().trim();
  return code && RARE_TYPES[code] ? { code, ...RARE_TYPES[code] } : null;
}

// Rarity is relative to the airport. The superjumbos below are a genuine catch over a
// regional field, but daily scheduled service at a big international gateway — so they
// don't count as a rare *type* when the scan is centred near one of these hubs. (A special
// livery on one still qualifies via liveryRareReason, independent of location.)
const HUB_COMMON_TYPES = new Set(['A388', 'B748']); // A380, 747-8
// Curated set of major international hubs where A380 / 747-8 are routine (passenger gateways
// plus the big 747 freighter hubs). Not exhaustive — erring toward known superjumbo airports
// so we don't cry "rare!" at LAX while still flagging one seen well away from a hub.
const WIDEBODY_HUBS = new Set([
  'LAX','SFO','JFK','EWR','IAD','IAH','DFW','MIA','BOS','ORD','SEA','ATL','YYZ','YVR','ANC','MEM','SDF','CVG',
  'LHR','LGW','CDG','FRA','MUC','AMS','ZRH','VIE','MAD','BCN','FCO','IST','MAN','CPH','BRU','DUS','LEJ',
  'DXB','DWC','DOH','AUH','JED','RUH','KWI','BAH','CAI','JNB','CPT',
  'SIN','HKG','ICN','NRT','HND','KIX','BKK','KUL','CGK','DEL','BOM','PVG','PEK','PKX','CAN','TPE','MNL',
  'SYD','MEL','BNE','PER','AKL','GRU','EZE',
]);
let _hubAirports = null;
// True when any major hub airport is within `withinNm` of the scan centre.
function nearMajorHub(lat, lon, withinNm = 30) {
  if (!LIVE.airports) return false;
  if (!_hubAirports) _hubAirports = LIVE.airports.filter(a => WIDEBODY_HUBS.has(a.iata));
  return _hubAirports.some(a => haversineNm(lat, lon, a.lat, a.lon) <= withinNm);
}

// ── live fetch (airplanes.live primary → /api/opensky failover) ──
function normAircraft(a) {
  return {
    hex: (a.hex || '').toLowerCase(),
    reg: (a.r || a.reg || '').trim() || null,
    type: a.t || a.type || '',
    flight: (a.flight || '').trim(),
    lat: a.lat, lon: a.lon,
    alt: typeof a.alt_baro === 'number' ? a.alt_baro
       : typeof a.alt_geom === 'number' ? a.alt_geom
       : (a.alt ?? null),
    gs: a.gs != null ? Math.round(a.gs) : null,
    track: a.track ?? a.true_heading ?? null,
    vrate: typeof a.baro_rate === 'number' ? a.baro_rate
         : typeof a.geom_rate === 'number' ? a.geom_rate
         : (a.vrate ?? null),
    ground: a.alt_baro === 'ground' || a.ground === true,
  };
}

// Classify a live aircraft into a human state relative to your scan center + nearest airport:
// on the ground, arriving (descending into a field), climbing out, flying over you (with ETA),
// or just en route. The overfly ETA projects the aircraft's track/speed toward your location.
function angDiff(a, b) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}
function aircraftStatus(ac, lat, lon, nearAirport) {
  if (ac.ground) {
    const at = nearAirport && nearAirport.distNm < 6 ? ' at ' + nearAirport.iata : '';
    return { kind: 'ground', cls: 'st-ground', label: '● On the ground' + at };
  }
  const gs = ac.gs || 0;

  // Flying over YOUR location: is the track aimed at you, and how soon?
  if (gs > 60 && ac.track != null && lat != null) {
    const d = haversineNm(ac.lat, ac.lon, lat, lon);
    if (d > 0.3) {
      const brg = bearingDeg(ac.lat, ac.lon, lat, lon);
      const theta = angDiff(ac.track, brg);
      const along = d * Math.cos(toRad(theta));        // nm to closest approach (>0 = inbound)
      const cross = Math.abs(d * Math.sin(toRad(theta))); // nm it'll miss you by
      if (along > 0 && cross < 12) {
        const mins = Math.round(along / gs * 60);
        if (mins <= 30) {
          return { kind: 'overhead', cls: 'st-over',
            label: mins <= 1 ? '✈ Over you now' : `✈ Over you in ~${mins} min` };
        }
      }
    }
  }

  // Arriving: low + descending toward a nearby field.
  if (nearAirport && nearAirport.distNm < 40 &&
      (ac.alt == null || ac.alt < 13000) &&
      (ac.vrate == null || ac.vrate < -250)) {
    const eta = gs > 40 ? Math.round(nearAirport.distNm / gs * 60) : null;
    const etaTxt = eta != null && eta <= 40 ? ` · ~${eta} min` : '';
    return { kind: 'arriving', cls: 'st-arrive', label: `↓ Arriving ${nearAirport.iata}${etaTxt}` };
  }

  // Climbing out of a nearby field.
  if (nearAirport && nearAirport.distNm < 30 && ac.vrate != null && ac.vrate > 400) {
    return { kind: 'departing', cls: 'st-depart', label: `↑ Departing ${nearAirport.iata}` };
  }

  return { kind: 'cruise', cls: 'st-cruise', label: '→ En route' };
}
// airplanes.live is CORS-open and rich (registration + type) but its community ADS-B
// coverage is thin in some regions — notably mainland China, where a 250 nm scan can
// return a single aircraft while a dozen are airborne. When the primary comes back this
// sparse we supplement with OpenSky and merge by hex, so one network's blind spot doesn't
// leave the scan nearly empty. OpenSky carries no type, so its extras match the catalog by
// icao24 (hex) only — enough to catch a known rare registration like the Qatar F1 777.
const COVERAGE_MIN = 8;

async function openSkyBox(lat, lon, radiusNm) {
  const dLat = radiusNm / NM_PER_DEG;
  const dLon = radiusNm / (NM_PER_DEG * Math.max(0.1, Math.cos(toRad(lat))));
  const qs = `lamin=${(lat-dLat).toFixed(4)}&lomin=${(lon-dLon).toFixed(4)}` +
             `&lamax=${(lat+dLat).toFixed(4)}&lomax=${(lon+dLon).toFixed(4)}`;
  const r = await fetch(`/api/opensky?${qs}`);
  if (!r.ok) return null;
  const j = await r.json();
  return { source: j.source || 'opensky', ac: (j.ac || []).map(normAircraft).filter(a => a.lat != null) };
}

async function fetchLiveBox(lat, lon, radiusNm) {
  // Primary: airplanes.live point query.
  let primary = null;
  try {
    const ctl = AbortSignal.timeout ? AbortSignal.timeout(9000) : undefined;
    const r = await fetch(`https://api.airplanes.live/v2/point/${lat.toFixed(4)}/${lon.toFixed(4)}/${Math.round(radiusNm)}`,
      ctl ? { signal: ctl } : {});
    if (r.ok) {
      const j = await r.json();
      const ac = (j.ac || j.aircraft || []).map(normAircraft).filter(a => a.lat != null);
      primary = { source: 'airplanes.live', ac };
    }
  } catch (e) { /* fall through to OpenSky */ }

  // Supplement (or fully fail over to) OpenSky when the primary is down or sparse.
  if (!primary || primary.ac.length < COVERAGE_MIN) {
    try {
      const os = await openSkyBox(lat, lon, radiusNm);
      if (os) {
        if (!primary) return os;                       // primary down → OpenSky alone
        const seen = new Set(primary.ac.map(a => a.hex).filter(Boolean));
        const extra = os.ac.filter(a => a.hex && !seen.has(a.hex));
        if (extra.length) {
          return { source: 'airplanes.live+opensky', ac: primary.ac.concat(extra) };
        }
      }
    } catch (e) { /* keep whatever the primary gave us */ }
  }
  return primary || { source: null, ac: [] };
}

// Look up ONE aircraft's current position by registration (for the detail map).
async function fetchLiveOne(reg, hex) {
  const tryUrl = async (u) => {
    try {
      const r = await fetch(u);
      if (!r.ok) return null;
      const j = await r.json();
      const ac = (j.ac || j.aircraft || []).map(normAircraft).filter(a => a.lat != null);
      return ac[0] || null;
    } catch (e) { return null; }
  };
  if (reg) {
    const a = await tryUrl(`https://api.airplanes.live/v2/reg/${encodeURIComponent(reg)}`);
    if (a) return a;
  }
  if (hex) {
    const a = await tryUrl(`https://api.airplanes.live/v2/hex/${encodeURIComponent(hex)}`);
    if (a) return a;
  }
  return null;
}

// ── orchestration: scan a center point, return rare matches with context ──
async function scanRareNear(lat, lon, radiusNm) {
  await loadAirports();
  const { source, ac } = await fetchLiveBox(lat, lon, radiusNm);
  const atHub = nearMajorHub(lat, lon); // superjumbos are routine here, so don't flag them by type
  const matches = [];
  for (const a of ac) {
    const distNm = haversineNm(lat, lon, a.lat, a.lon);
    if (distNm > radiusNm + 5) continue;

    // Qualify the aircraft: a rare catalog livery, or failing that, a rare airframe type.
    const livery = liveryForLive(a);
    let rareReason = livery ? liveryRareReason(livery) : null;
    let rareType = null;
    if (!rareReason) {
      rareType = rareTypeFor(a);
      if (!rareType) continue; // common livery and ordinary type → not rare, skip
      if (atHub && HUB_COMMON_TYPES.has(rareType.code)) continue; // superjumbo = everyday sight at this hub
    }

    const near = nearestAirport(a.lat, a.lon);
    matches.push({
      livery: livery || null,
      rareType,                         // set when matched purely on airframe type
      rareBadge: rareReason || (rareType ? rareType.note : ''),
      ac: a, distNm,
      bearing: bearingDeg(lat, lon, a.lat, a.lon),
      nearAirport: near,
      status: aircraftStatus(a, lat, lon, near),
    });
  }
  // Rare types and rare liveries both surface; closest first, but a known catalog livery
  // (clickable, with photos) ranks ahead of a bare type match at a similar distance.
  matches.sort((x, y) => (x.distNm - y.distNm) || ((x.livery ? 0 : 1) - (y.livery ? 0 : 1)));
  return { source, total: ac.length, matches };
}

// ── Leaflet (lazy CDN load; no API key, free OSM tiles) ──
let _leafletPromise = null;
function loadLeaflet() {
  if (_leafletPromise) return _leafletPromise;
  _leafletPromise = new Promise((resolve, reject) => {
    if (window.L) return resolve(window.L);
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.onload = () => resolve(window.L);
    s.onerror = () => reject(new Error('leaflet-failed'));
    document.head.appendChild(s);
  });
  return _leafletPromise;
}

function planeDivIcon(L, track) {
  const rot = (track || 0);
  return L.divIcon({
    className: 'live-plane-icon',
    html: `<svg viewBox="0 0 24 24" width="30" height="30" style="transform:rotate(${rot}deg)">
      <path fill="#e8472b" stroke="#fff" stroke-width="0.8"
        d="M12 2 L13.4 9 L22 13 L22 14.5 L13.4 12.5 L13 19 L16 21 L16 22 L12 21 L8 22 L8 21 L11 19 L10.6 12.5 L2 14.5 L2 13 L10.6 9 Z"/>
    </svg>`,
    iconSize: [30, 30], iconAnchor: [15, 15],
  });
}

// Render a Leaflet map into `el`. opts: { plane:{lat,lon,track,label}, pins:[{lat,lon,label,kind}] }
async function buildLiveMap(el, opts) {
  const L = await loadLeaflet();
  if (el._map) { el._map.remove(); el._map = null; }
  const pts = [];
  if (opts.plane) pts.push([opts.plane.lat, opts.plane.lon]);
  (opts.pins || []).forEach(p => pts.push([p.lat, p.lon]));
  const center = pts.length ? pts[0] : [20, 0];
  const map = L.map(el, { zoomControl: true, attributionControl: true, scrollWheelZoom: false })
    .setView(center, opts.plane ? 7 : 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18, attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  (opts.pins || []).forEach(p => {
    const color = p.kind === 'sighting' ? '#1f9d6b' : '#7a8aa0';
    L.circleMarker([p.lat, p.lon], {
      radius: 6, color: '#fff', weight: 2, fillColor: color, fillOpacity: 1,
    }).addTo(map).bindPopup(p.label);
  });

  if (opts.plane) {
    L.marker([opts.plane.lat, opts.plane.lon], { icon: planeDivIcon(L, opts.plane.track) })
      .addTo(map).bindPopup(opts.plane.label).openPopup();
  }

  if (pts.length > 1) {
    map.fitBounds(pts, { padding: [40, 40], maxZoom: 9 });
  }
  el._map = map;
  // Tiles need a reflow once the container is visible.
  setTimeout(() => map.invalidateSize(), 60);
  return map;
}

// ── human-readable live status line ──
function liveAltText(ac) {
  if (ac.ground) return 'on the ground';
  if (ac.alt == null) return 'airborne';
  if (ac.alt >= 18000) return 'FL' + Math.round(ac.alt / 100);
  return ac.alt.toLocaleString() + ' ft';
}

// ══════════════ HOME-PAGE "RARE PLANES NEAR YOU" ══════════════
let _liveScanCenter = null;

function liveSet(html) {
  const s = document.getElementById('liveStatus');
  if (s) s.innerHTML = html;
}

async function liveUseLocation() {
  if (!navigator.geolocation) { liveSet('Geolocation isn’t available in this browser — search an airport instead.'); return; }
  liveSet('<span class="live-spin"></span> Getting your location…');
  navigator.geolocation.getCurrentPosition(
    pos => runLiveScan(pos.coords.latitude, pos.coords.longitude, 'your location'),
    () => liveSet('Location permission denied — search an airport below instead.'),
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
}

async function liveAirportSuggest(q) {
  const box = document.getElementById('liveAirportResults');
  if (!box) return;
  q = q.trim();
  if (q.length < 2) { box.innerHTML = ''; box.style.display = 'none'; return; }
  await loadAirports();
  const low = q.toLowerCase(), up = q.toUpperCase();
  const scored = LIVE.airports.map(a => {
    let s = 99;
    if (a.iata === up) s = 0;
    else if (a.icao === up) s = 1;
    else if (a.city && a.city.toLowerCase().startsWith(low)) s = 2;
    else if (a.name && a.name.toLowerCase().startsWith(low)) s = 3;
    else if (a.city && a.city.toLowerCase().includes(low)) s = 4;
    else if (a.name && a.name.toLowerCase().includes(low)) s = 5;
    return { a, s };
  }).filter(x => x.s < 99).sort((x, y) => x.s - y.s || (y.a.big - x.a.big)).slice(0, 7);
  if (!scored.length) { box.innerHTML = ''; box.style.display = 'none'; return; }
  box.innerHTML = scored.map(({ a }) =>
    `<button class="live-ap-opt" onclick="pickAirport('${esc(a.iata)}',${a.lat},${a.lon})">
       <strong>${esc(a.iata)}</strong> ${esc(a.name)}<span>${esc(a.city || '')}${a.city ? ', ' : ''}${esc(a.cc)}</span>
     </button>`).join('');
  box.style.display = 'block';
}

function pickAirport(iata, lat, lon) {
  const box = document.getElementById('liveAirportResults');
  if (box) { box.innerHTML = ''; box.style.display = 'none'; }
  const inp = document.getElementById('liveAirportSearch');
  if (inp) inp.value = iata;
  runLiveScan(lat, lon, iata);
}

// Enter in the airport box: resolve the typed text to the best-matching airport and scan,
// so the feature works without having to click a dropdown suggestion.
async function liveAirportGo(q) {
  q = (q || '').trim();
  if (q.length < 2) return;
  await loadAirports();
  if (!LIVE.airports || !LIVE.airports.length) {
    liveSet('Airport data couldn’t load. If you opened this page as a local file, run it from a web server instead (fetch is blocked on file://).');
    return;
  }
  const low = q.toLowerCase(), up = q.toUpperCase();
  let best = null, bestS = 99;
  for (const a of (LIVE.airports || [])) {
    let s = 99;
    if (a.iata === up) s = 0;
    else if (a.icao === up) s = 1;
    else if (a.city && a.city.toLowerCase().startsWith(low)) s = 2;
    else if (a.name && a.name.toLowerCase().startsWith(low)) s = 3;
    else if (a.city && a.city.toLowerCase().includes(low)) s = 4;
    else if (a.name && a.name.toLowerCase().includes(low)) s = 5;
    // Same ranking as the dropdown: best score wins, big airports break ties.
    if (s < bestS || (s === bestS && best && a.big && !best.big)) { bestS = s; best = a; }
  }
  if (!best) best = airportByText(q);
  if (!best) { liveSet(`No airport found for “${esc(q)}”. Try an IATA/ICAO code like JFK or EGLL.`); return; }
  pickAirport(best.iata, best.lat, best.lon);
}

async function runLiveScan(lat, lon, label) {
  _liveScanCenter = { lat, lon, label };
  const radius = parseInt((document.getElementById('liveRadius') || {}).value, 10) || LIVE.radiusNm;
  liveSet(`<span class="live-spin"></span> Scanning ${Math.round(radius)} nm around ${esc(label)}…`);
  const grid = document.getElementById('liveResults');
  if (grid) grid.innerHTML = '';
  let out;
  try {
    out = await scanRareNear(lat, lon, radius);
  } catch (e) {
    liveSet('Couldn’t reach the live-traffic feed. Try again in a moment.');
    return;
  }
  const near = airportsNear(lat, lon, 5);
  const apLine = near.length
    ? `Airports near ${esc(label)}: ` + near.map(a => `<span class="live-ap-chip" title="${esc(a.name)}">${esc(a.iata)} · ${Math.round(a.distNm)}nm</span>`).join(' ')
    : '';
  if (!out.matches.length) {
    // A near-empty scan in some regions (notably China) means the free ADS-B networks just
    // can't see the traffic, not that the skies are quiet — say so rather than imply "all clear".
    const thin = out.total < COVERAGE_MIN
      ? ' Free ADS-B coverage is sparse here, so commercial trackers may show planes we can’t.'
      : ' Most traffic is everyday liveries; check back later.';
    liveSet(`No rare planes airborne within ${Math.round(radius)} nm right now — ` +
      `scanned ${out.total} aircraft via ${esc(out.source || 'live feed')}.${thin} ${apLine ? '<br>' + apLine : ''}`);
    return;
  }
  liveSet(`<strong>${out.matches.length}</strong> rare plane${out.matches.length === 1 ? '' : 's'} airborne near ${esc(label)} ` +
    `<span class="live-src">(of ${out.total} aircraft · ${esc(out.source)})</span>${apLine ? '<br>' + apLine : ''}`);
  if (grid) {
    grid.innerHTML = out.matches.map(liveCardHTML).join('');
    hydratePhotos(grid);
  }
}

function liveCardHTML(m) {
  const a = m.ac, st = m.status || { cls: 'st-cruise', label: '→ En route' };
  const dir = compass(m.bearing);
  const meta = `${liveAltText(a)} · ${Math.round(m.distNm)}nm ${dir}${a.gs ? ' · ' + a.gs + ' kt' : ''}`;
  const badge = m.rareBadge ? `<span class="live-rare-badge">${esc(m.rareBadge)}</span>` : '';

  // Rare airframe with no catalog entry: not clickable into a detail page, links to the tracker.
  if (!m.livery) {
    const rt = m.rareType, tail = a.reg || (a.hex ? a.hex.toUpperCase() : '');
    const cols = (rt && rt.colors) || ['#3A4A5A', '#9AA7B4', '#FFFFFF'];
    const bg = `background: linear-gradient(135deg, ${cols[0]} 40%, ${cols[1]||cols[0]} 40% 70%, ${cols[2]||cols[1]||cols[0]} 70%)`;
    const ident = a.reg ? esc(a.reg) : (a.hex ? esc(a.hex.toUpperCase()) : '');
    return `
    <div class="live-card live-card-type" role="button" tabindex="0" aria-label="${esc(rt.name)} live near you" onclick="openLiveTracker('${esc(a.reg || a.hex)}', ${a.reg ? 'false' : 'true'})">
      <div class="card-swatch" style="${bg}">
        <div class="swatch-plane">${planeSVG()}</div>
        <span class="live-pill ${st.cls}">${esc(st.label)}</span>
        ${tail ? `<span class="swatch-tail">${esc(tail)}</span>` : ''}
      </div>
      <div class="home-card-body">
        <div class="home-card-airline">${esc(rt.name)}${badge}</div>
        <div class="home-card-livery">${esc(rt.note)}${a.flight ? ' · ' + esc(a.flight) : ''}</div>
        <div class="live-meta">${meta}</div>
      </div>
    </div>`;
  }

  const l = m.livery;
  const bg = `background: linear-gradient(135deg, ${l.colors[0]} 40%, ${l.colors[1]||l.colors[0]} 40% 70%, ${l.colors[2]||l.colors[1]||l.colors[0]} 70%)`;
  return `
    <div class="live-card" role="button" tabindex="0" aria-label="${esc(l.airline)} — ${esc(l.livery)} live near you" onclick="openDetailLive(${l.id})">
      <div class="card-swatch"${l.photo ? '' : ` data-reg="${esc(l.tail)}"`} style="${bg}">
        <div class="swatch-plane">${planeSVG()}</div>
        ${photoImgHTML(l)}
        <span class="live-pill ${st.cls}">${esc(st.label)}</span>
        <span class="swatch-tail">${esc(l.tail)}</span>
      </div>
      <div class="home-card-body">
        <div class="home-card-airline">${esc(l.airline)}${badge}</div>
        <div class="home-card-livery">${esc(l.livery)}</div>
        <div class="live-meta">${meta}</div>
      </div>
    </div>`;
}

function openLiveTracker(idOrReg, isHex) {
  const base = 'https://globe.airplanes.live/?';
  const u = isHex ? base + 'icao=' + encodeURIComponent(idOrReg)
                  : base + 'reg=' + encodeURIComponent(idOrReg);
  window.open(u, '_blank', 'noopener');
}

function openDetailLive(id) {
  openDetail(id);
  trackLive(id);
}

// ══════════════ DETAIL "WHERE IS IT NOW?" ══════════════
function liveDetailHTML(l) {
  return `
    <div class="live-detail" id="live-detail-${l.id}">
      <h3>Where is it now?</h3>
      <p class="live-detail-hint">Live position from airplanes.live, plus the airports where you've logged it.</p>
      <button class="detail-action-btn live-track-btn" id="live-track-${l.id}" onclick="trackLive(${l.id})">✈ Track live</button>
      <div class="live-detail-status" id="live-status-${l.id}"></div>
      <div class="live-map" id="live-map-${l.id}" style="display:none"></div>
    </div>`;
}

async function trackLive(id) {
  const l = db.find(x => x.id === id);
  if (!l) return;
  const statusEl = document.getElementById(`live-status-${id}`);
  const mapEl = document.getElementById(`live-map-${id}`);
  const btn = document.getElementById(`live-track-${id}`);
  if (!statusEl || !mapEl) return;
  if (btn) btn.style.display = 'none';
  statusEl.innerHTML = '<span class="live-spin"></span> Locating…';

  await loadAirports();
  // Pins for every place you've logged this aircraft.
  const pins = [];
  for (const s of (sightings[id] || [])) {
    const ap = airportByText(s.location || '');
    if (ap) pins.push({ lat: ap.lat, lon: ap.lon, kind: 'sighting',
      label: `Logged: ${esc(ap.iata)} ${esc(ap.name)}${s.date ? ' · ' + esc(s.date) : ''}` });
  }

  let ac = null;
  try { ac = await fetchLiveOne(l.tail, l.icao24); } catch (e) { /* offline */ }

  if (ac) {
    const near = nearestAirport(ac.lat, ac.lon);
    // If you've scanned from a location on the home page, classify relative to it (enables
    // the "over you in N min" call-out); otherwise classify by altitude/airport only.
    const ctr = _liveScanCenter;
    const st = aircraftStatus(ac, ctr ? ctr.lat : null, ctr ? ctr.lon : null, near);
    const apTxt = near && near.distNm < 80 ? ` · ${Math.round(near.distNm)}nm from ${esc(near.iata)}` : '';
    statusEl.innerHTML = `<span class="live-pill ${st.cls} inline">${esc(st.label)}</span> ` +
      `${esc(l.tail)} ${ac.flight ? 'as ' + esc(ac.flight) + ' ' : ''}at ${liveAltText(ac)}` +
      `${ac.gs ? ', ' + ac.gs + ' kt' : ''}${ac.track != null ? ', heading ' + compass(ac.track) : ''}${apTxt}` +
      ` · <a href="https://globe.airplanes.live/?icao=${esc(ac.hex)}" target="_blank" rel="noopener">full tracker ↗</a>`;
    mapEl.style.display = 'block';
    try {
      await buildLiveMap(mapEl, {
        plane: { lat: ac.lat, lon: ac.lon, track: ac.track,
          label: `${esc(l.tail)} — ${esc(l.airline)}<br>${liveAltText(ac)}` },
        pins,
      });
    } catch (e) { statusEl.innerHTML += '<br><span class="live-warn">Map failed to load.</span>'; }
  } else {
    // Not broadcasting — still show where it's been logged.
    if (pins.length) {
      statusEl.innerHTML = `${esc(l.tail)} isn’t broadcasting a position right now. Showing the ${pins.length} place${pins.length>1?'s':''} you've logged it.`;
      mapEl.style.display = 'block';
      try { await buildLiveMap(mapEl, { pins }); } catch (e) {}
    } else {
      statusEl.innerHTML = `${esc(l.tail)} isn’t broadcasting a position right now, and you haven’t logged a location yet. ` +
        `<a href="https://globe.airplanes.live/?reg=${encodeURIComponent(l.tail)}" target="_blank" rel="noopener">Open tracker ↗</a>`;
      if (btn) { btn.style.display = ''; btn.textContent = '↻ Try again'; }
    }
  }
}
