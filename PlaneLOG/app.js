// PlaneLOG — shared application logic.
// Loaded by index.html, Collection.html and YourLiveries.html. Each page supplies its
// own buildSidebar() and applyFilters() (and, on the home page, renderHome()), built on
// the shared helpers below: renderSidebar(), filterPool() and renderGrid().

const LIVERIES = [
  {id:1,airline:'United Airlines',tail:'N14120',type:'Boeing 757-200',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','mainline'],notes:'United\'s current globe livery, introduced 2010 and kept through the Continental merger. N14120 is a Boeing 757-200.',sightings:[]},
  {id:2,airline:'United Airlines',tail:'N516UA',type:'Boeing 757-200',era:'1990s',livery:'Battleship (tulip)',colors:['#4A4E5A','#C6A84B','#FFFFFF'],tags:['retro','tulip','classic'],notes:'Nicknamed "Battleship" for its grey fuselage. Flew 1993–2004, one of the most distinctive US carrier schemes.',sightings:[]},
  {id:3,airline:'American Airlines',tail:'N335AA',type:'Boeing 767-200',era:'1980s',livery:'Polished metal',colors:['#C0C0C0','#CC0000','#003087'],tags:['classic','bare metal','iconic'],notes:'Iconic unpainted aluminium fuselage with red and blue cheatline. No base coat — actual polished bare metal.',sightings:[]},
  {id:4,airline:'American Airlines',tail:'N102NN',type:'Airbus A321',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','heritage','flag'],notes:'American\'s livery launched January 2013, around the US Airways merger. N102NN is an Airbus A321.',sightings:[]},
  {id:5,airline:'Delta Air Lines',tail:'N668DN',type:'Boeing 757-200',era:'2000s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget'],notes:'Delta\'s widget tail design. Scheme introduced 2000, refreshed with brighter red in 2007.',sightings:[]},
  {id:6,airline:'Southwest Airlines',tail:'N500WR',type:'Boeing 737-800',era:'2020s',livery:'Freedom One',colors:['#B22234','#FFFFFF','#3C3B6E'],tags:['special','flag','50th anniversary'],notes:'US-flag livery unveiled June 2021 for Southwest\'s 50th anniversary, honouring the US military. The first Boeing 737-800 to wear one of Southwest\'s special schemes.',sightings:[]},
  {id:7,airline:'British Airways',tail:'G-BOAG',type:'Concorde',era:'2000s',livery:'Speedbird (Concorde)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['retro','Concorde','supersonic'],notes:'British Airways Concorde G-BOAG "Alpha Golf". On its retirement in November 2003 it set a New York–Seattle speed record while being delivered to The Museum of Flight in Seattle, where it is preserved today.',sightings:[]},
  {id:8,airline:'Pan Am',tail:'N734PA',type:'Boeing 747-100',era:'1970s',livery:'Globe (blue/white)',colors:['#003591','#FFFFFF','#A0B8D8'],tags:['historic','globe','defunct'],notes:'Pan Am\'s iconic blue-globe livery on a Boeing 747-121 — the type that opened the Jumbo Jet age for the airline. Pan Am was the 747\'s launch customer, flying its first commercial service in January 1970.',sightings:[]},
  // ── More airliners ──
  {id:9,airline:'United Airlines',tail:'N2333U',type:'Boeing 777-300ER',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','mainline','widebody'],notes:'United\'s largest twinjet — the Boeing 777-300ER — in the current blue-globe livery, flown on high-capacity long-haul routes.',sightings:[]},
  {id:10,airline:'United Airlines',tail:'N24976',type:'Boeing 787-9',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','dreamliner','widebody'],notes:'A United Boeing 787-9 Dreamliner in the current globe livery, used to open long, thin international routes.',sightings:[]},
  {id:11,airline:'American Airlines',tail:'N753AN',type:'Boeing 777-200ER',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','flag','widebody'],notes:'An American 777-200ER wearing the 2013 "New American" livery with the silver Flight Symbol tail.',sightings:[]},
  {id:12,airline:'American Airlines',tail:'N800AN',type:'Boeing 787-8',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','dreamliner'],notes:'N800AN was American\'s first Boeing 787-8 Dreamliner, delivered in 2015 in the current livery.',sightings:[]},
  {id:13,airline:'Delta Air Lines',tail:'N171DZ',type:'Boeing 767-300ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','widebody'],notes:'A Delta 767-300ER in the current widget livery — a long-serving transatlantic workhorse.',sightings:[]},
  {id:14,airline:'Delta Air Lines',tail:'N502DN',type:'Airbus A350-900',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','widebody'],notes:'Delta\'s flagship Airbus A350-900, leading its long-haul fleet across the Pacific and Atlantic.',sightings:[]},
  {id:15,airline:'Southwest Airlines',tail:'N8645A',type:'Boeing 737-800',era:'2010s',livery:'Heart (current)',colors:['#304CB2','#E4002B','#F9B612'],tags:['current','heart'],notes:'Southwest\'s current "Heart" livery, introduced in 2014, on a Boeing 737-800.',sightings:[]},
  {id:16,airline:'British Airways',tail:'G-CIVB',type:'Boeing 747-400',era:'2010s',livery:'BOAC retro',colors:['#00247D','#FFFFFF','#D4AF37'],tags:['retro','BOAC','jumbo'],notes:'For BA\'s centenary in 2019, Boeing 747-400 G-CIVB was repainted into the classic BOAC blue-and-gold livery. Retired in 2020 and now preserved at Cotswold Airport.',sightings:[]},
  {id:17,airline:'British Airways',tail:'G-XLEA',type:'Airbus A380',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','superjumbo','flag'],notes:'G-XLEA was British Airways\' first Airbus A380, wearing the current Chatham Dockyard livery with the Union-flag tail.',sightings:[]},
  {id:18,airline:'Lufthansa',tail:'D-ABYA',type:'Boeing 747-8',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','jumbo','star alliance'],notes:'Lufthansa\'s Boeing 747-8 Intercontinental in the navy-and-yellow crane livery — the flagship of its long-haul fleet and the only Western passenger 747-8 operator.',sightings:[]},
  {id:19,airline:'Lufthansa',tail:'D-AIMA',type:'Airbus A380',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','superjumbo'],notes:'D-AIMA was Lufthansa\'s first Airbus A380, named "Frankfurt am Main".',sightings:[]},
  {id:20,airline:'Air France',tail:'F-HPJA',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['retired','superjumbo','rare'],notes:'F-HPJA was Air France\'s first Airbus A380, in the carrier\'s blue, white and red livery. Air France retired its entire A380 fleet in 2020, so this is now a historical catch.',sightings:[]},
  {id:21,airline:'Air France',tail:'F-GZNT',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','widebody'],notes:'An Air France Boeing 777-300ER, the backbone of the airline\'s long-haul fleet.',sightings:[]},
  {id:23,airline:'KLM',tail:'PH-BVA',type:'Boeing 777-300ER',era:'2010s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','widebody'],notes:'KLM Royal Dutch Airlines\' sky-blue livery on a Boeing 777-300ER. KLM is the world\'s oldest airline still flying under its original name.',sightings:[]},
  {id:24,airline:'Qantas',tail:'VH-OQA',type:'Airbus A380',era:'2000s',livery:'Flying Roo (Nancy Bird Walton)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['flag','superjumbo','roo'],notes:'VH-OQA "Nancy Bird Walton" was the first Airbus A380 delivered to Qantas, wearing the red Flying Kangaroo on the tail.',sightings:[]},
  {id:25,airline:'Singapore Airlines',tail:'9V-SKA',type:'Airbus A380',era:'2000s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['flag','superjumbo'],notes:'9V-SKA operated the world\'s first commercial Airbus A380 flight, Singapore to Sydney, in October 2007.',sightings:[]},
  {id:26,airline:'Cathay Pacific',tail:'B-KPB',type:'Boeing 777-300ER',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','widebody','brushwing'],notes:'Cathay Pacific\'s green "brushwing" livery on a Boeing 777-300ER.',sightings:[]},
  {id:27,airline:'Japan Airlines',tail:'JA743J',type:'Boeing 777-300ER',era:'2010s',livery:'Tsurumaru (current)',colors:['#C8102E','#FFFFFF','#B0B0B0'],tags:['current','widebody','crane'],notes:'Japan Airlines\' red "Tsurumaru" crane emblem on a Boeing 777-300ER.',sightings:[]},
  {id:28,airline:'Virgin Atlantic',tail:'G-VLIP',type:'Boeing 747-400',era:'2000s',livery:'Hot Lips',colors:['#E10A0A','#FFFFFF','#4B0082'],tags:['jumbo','flying lady'],notes:'Virgin Atlantic Boeing 747-400 G-VLIP, named "Hot Lips", in the red Virgin livery with a Flying Lady on the nose.',sightings:[]},
  {id:29,airline:'JetBlue',tail:'N709JB',type:'Airbus A320',era:'2010s',livery:'Stripes',colors:['#003876','#FFFFFF','#6CACE4'],tags:['current','tailfin'],notes:'A JetBlue Airbus A320 wearing one of the airline\'s patterned tailfin designs.',sightings:[]},
  {id:30,airline:'Alaska Airlines',tail:'N559AS',type:'Boeing 737-800',era:'2020s',livery:'Xáat Kwáani (Salmon People)',colors:['#0B2A5B','#1E6FB0','#E6649B'],tags:['special','salmon','indigenous','rare'],notes:'N559AS ‘Xáat Kwáani’ (Salmon People) — a 2023 Alaska Airlines 737-800 livery by Tlingit artist Crystal Worl, depicting a salmon in Northwest Coast formline art. The first US airliner named in an Alaska Native language.',sightings:[]},
  {id:31,airline:'Air Canada',tail:'C-FRTG',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','dreamliner'],notes:'Air Canada\'s bold red-and-black livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:32,airline:'Aer Lingus',tail:'EI-DEO',type:'Airbus A320',era:'2010s',livery:'Shamrock (current)',colors:['#006272','#FFFFFF','#9CA299'],tags:['current','shamrock'],notes:'Aer Lingus\' teal shamrock livery on an Airbus A320.',sightings:[]},
  {id:33,airline:'Ryanair',tail:'EI-DCL',type:'Boeing 737-800',era:'2010s',livery:'Current (blue/yellow)',colors:['#073590','#F1C933','#FFFFFF'],tags:['current','low-cost'],notes:'Europe\'s largest low-cost carrier — a Ryanair Boeing 737-800 in blue and yellow.',sightings:[]},
  {id:34,airline:'Etihad Airways',tail:'A6-BLA',type:'Boeing 787-9',era:'2010s',livery:'Facets (current)',colors:['#BD8B13','#4A4A4A','#FFFFFF'],tags:['current','dreamliner'],notes:'Etihad Airways\' "Facets" livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:35,airline:'Qatar Airways',tail:'A7-BCA',type:'Boeing 787-8',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','dreamliner','oryx'],notes:'Qatar Airways\' maroon Oryx livery on a Boeing 787-8 Dreamliner.',sightings:[]},
  {id:36,airline:'Turkish Airlines',tail:'TC-JJE',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','widebody'],notes:'Turkish Airlines\' red-and-white livery on a Boeing 777-300ER.',sightings:[]},
  {id:37,airline:'Finnair',tail:'OH-LWA',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#0B1560','#FFFFFF','#A0A0A0'],tags:['current','widebody'],notes:'OH-LWA was Finnair\'s first Airbus A350-900, the flagship of its long-haul network to Asia.',sightings:[]},
  {id:38,airline:'Emirates',tail:'A6-EUF',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','superjumbo'],notes:'Emirates flies the world\'s largest Airbus A380 fleet. A6-EUF wears the current livery with the UAE flag on the tail.',sightings:[]},
  // ── World airlines & special liveries ──
  {id:39,airline:'All Nippon Airways',tail:'JA791A',type:'Boeing 777-300ER',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','widebody'],notes:'All Nippon Airways (ANA), Japan\'s largest carrier, in the current blue Triton livery on a Boeing 777-300ER.',sightings:[]},
  {id:40,airline:'Korean Air',tail:'HL7644',type:'Boeing 747-8',era:'2010s',livery:'Current',colors:['#1B4DA1','#7AB3E0','#FFFFFF'],tags:['current','jumbo'],notes:'Korean Air\'s sky-blue livery on a Boeing 747-8 Intercontinental — among the last passenger 747s ever built.',sightings:[]},
  {id:41,airline:'Asiana Airlines',tail:'HL8359',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#CF112A','#6E6F72','#FFFFFF'],tags:['current','widebody'],notes:'Asiana Airlines of South Korea in the current livery on an Airbus A350-900.',sightings:[]},
  {id:42,airline:'China Airlines',tail:'B-18053',type:'Boeing 777-300ER',era:'2010s',livery:'Plum blossom (current)',colors:['#C8102E','#E8E0CF','#1A3C6E'],tags:['current','widebody'],notes:'Taiwan\'s China Airlines in the "plum blossom" livery on a Boeing 777-300ER.',sightings:[]},
  {id:43,airline:'EVA Air',tail:'B-16708',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#005E3C','#F0A800','#FFFFFF'],tags:['current','widebody'],notes:'EVA Air of Taiwan in its green-and-orange livery on a Boeing 777-300ER.',sightings:[]},
  {id:44,airline:'Thai Airways',tail:'HS-TUD',type:'Airbus A380',era:'2010s',livery:'Royal Orchid',colors:['#4B186C','#D4A017','#E5007E'],tags:['retired','superjumbo','rare'],notes:'Thai Airways International in the purple-and-gold "Royal Orchid" livery on an Airbus A380. Thai parked its six A380s in 2020 and has since retired the type.',sightings:[]},
  {id:45,airline:'Malaysia Airlines',tail:'9M-MNB',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#C8102E','#003B7A','#FFFFFF'],tags:['retired','superjumbo','rare'],notes:'Malaysia Airlines flew six Airbus A380s, retiring the whole fleet by 2022 — making this a historical catch.',sightings:[]},
  {id:46,airline:'Air India',tail:'VT-ANP',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['current','dreamliner'],notes:'Air India on a Boeing 787-8 Dreamliner.',sightings:[]},
  {id:47,airline:'Saudia',tail:'HZ-AK28',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#005430','#7BA05B','#FFFFFF'],tags:['current','widebody'],notes:'Saudia (Saudi Arabian Airlines) in the green livery on a Boeing 777-300ER.',sightings:[]},
  {id:48,airline:'Air New Zealand',tail:'ZK-OKQ',type:'Boeing 777-300ER',era:'2010s',livery:'All Blacks (black)',colors:['#0E0E0E','#1A1A1A','#FFFFFF'],tags:['special','all blacks','rare'],notes:'Air New Zealand\'s striking all-black "All Blacks" livery, honouring the national rugby team, on a Boeing 777-300ER.',sightings:[]},
  {id:49,airline:'LATAM',tail:'CC-BGO',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','dreamliner'],notes:'LATAM, South America\'s largest airline group, in the indigo-and-coral livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:50,airline:'Avianca',tail:'N697AV',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D5121E','#FFFFFF','#A6A6A6'],tags:['current'],notes:'Avianca of Colombia, one of the world\'s oldest airlines, in the current red livery on an Airbus A321.',sightings:[]},
  {id:51,airline:'Aeroméxico',tail:'XA-ADL',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','dreamliner'],notes:'Aeroméxico in the current livery — the tail carries a stylised Aztec eagle-knight — on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:52,airline:'Iberia',tail:'EC-MXV',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','widebody'],notes:'Spain\'s flag carrier Iberia in the red-and-yellow livery on an Airbus A350-900.',sightings:[]},
  {id:53,airline:'Swiss',tail:'HB-JNA',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D8232A','#FFFFFF','#A6A6A6'],tags:['current','widebody'],notes:'SWISS, the flag carrier of Switzerland, in the red livery with the Swiss cross on a Boeing 777-300ER.',sightings:[]},
  {id:54,airline:'Austrian Airlines',tail:'OE-LPF',type:'Boeing 777-200ER',era:'2010s',livery:'Current',colors:['#D80B16','#FFFFFF','#A6A6A6'],tags:['current','widebody'],notes:'Austrian Airlines in the red-and-white livery on a Boeing 777-200ER.',sightings:[]},
  {id:55,airline:'TAP Air Portugal',tail:'CS-TUA',type:'Airbus A330-900',era:'2010s',livery:'Current',colors:['#00A04A','#E4002B','#FFFFFF'],tags:['current','widebody'],notes:'TAP Air Portugal in the current green-and-red livery on an Airbus A330-900neo.',sightings:[]},
  {id:56,airline:'SAS Scandinavian Airlines',tail:'LN-RKT',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#003D87','#FFFFFF','#A6A6A6'],tags:['current','widebody'],notes:'SAS Scandinavian Airlines in the blue livery on an Airbus A330-300.',sightings:[]},
  {id:57,airline:'El Al',tail:'4X-EDA',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#003DA5','#FFFFFF','#A6A6A6'],tags:['current','dreamliner'],notes:'El Al Israel Airlines in the blue livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:58,airline:'Hawaiian Airlines',tail:'N380HA',type:'Airbus A330-200',era:'2010s',livery:'Pualani (current)',colors:['#4C1F7A','#E6007E','#F5A800'],tags:['current','widebody'],notes:'Hawaiian Airlines, with the "Pualani" island-girl tail, on an Airbus A330-200.',sightings:[]},
  {id:59,airline:'Frontier Airlines',tail:'N705FR',type:'Airbus A321',era:'2010s',livery:'Animal tail (current)',colors:['#00754A','#FFFFFF','#6CC24A'],tags:['current','animal'],notes:'Frontier Airlines, famous for the wild-animal portraits on each tail, on an Airbus A321.',sightings:[]},
  {id:60,airline:'Vietnam Airlines',tail:'VN-A868',type:'Boeing 787-9',era:'2010s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','dreamliner'],notes:'Vietnam Airlines, with the golden-lotus emblem, on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:61,airline:'Philippine Airlines',tail:'RP-C7779',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#00308F','#CE1126','#FCD116'],tags:['current','widebody'],notes:'Philippine Airlines, Asia\'s first commercial airline, on a Boeing 777-300ER.',sightings:[]},
  {id:62,airline:'Garuda Indonesia',tail:'PK-GIG',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#1A6AAE','#0E8A3C','#FFFFFF'],tags:['current','widebody'],notes:'Garuda Indonesia in the current livery on a Boeing 777-300ER.',sightings:[]},
  {id:63,airline:'Air China',tail:'B-2485',type:'Boeing 747-8',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','jumbo'],notes:'Air China in the red livery with the gold phoenix logo on a Boeing 747-8 Intercontinental.',sightings:[]},
  {id:64,airline:'China Southern',tail:'B-6137',type:'Airbus A380',era:'2010s',livery:'Kapok',colors:['#0066B3','#E4002B','#FFFFFF'],tags:['retired','superjumbo','rare'],notes:'China Southern, with the red kapok-flower logo, on an Airbus A380 — it was China\'s only A380 operator, retiring all five in 2022.',sightings:[]},
  {id:65,airline:'Ethiopian Airlines',tail:'ET-AUO',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#15803C','#E4A400','#D5121E'],tags:['current','dreamliner'],notes:'Ethiopian Airlines, Africa\'s largest carrier, in the green-yellow-red livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:66,airline:'Icelandair',tail:'TF-FIA',type:'Boeing 757-200',era:'2010s',livery:'Current',colors:['#0A2240','#00B5E2','#FFFFFF'],tags:['current'],notes:'Icelandair, a longtime 757 operator, in the dark-blue livery suited to its North Atlantic network.',sightings:[]},
  {id:67,airline:'Aegean Airlines',tail:'SX-DVO',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#003B7A','#0091D2','#FFFFFF'],tags:['current'],notes:'Aegean Airlines, the flag carrier of Greece, in the blue livery on an Airbus A321.',sightings:[]},
  {id:68,airline:'easyJet',tail:'G-EZWA',type:'Airbus A320',era:'2010s',livery:'Current (orange)',colors:['#FF6600','#FFFFFF','#5A5A5A'],tags:['current','low-cost'],notes:'easyJet, a major European low-cost carrier, in its bright-orange livery on an Airbus A320.',sightings:[]},
  {id:69,airline:'Wizz Air',tail:'HA-LXA',type:'Airbus A321',era:'2010s',livery:'Current (magenta)',colors:['#C6007E','#5A2D81','#FFFFFF'],tags:['current','low-cost'],notes:'Wizz Air, the ultra-low-cost carrier of Central Europe, in magenta and purple on an Airbus A321.',sightings:[]},
  {id:70,airline:'Virgin Australia',tail:'VH-VOZ',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#C8102E','#5A2D81','#FFFFFF'],tags:['retired','widebody','rare'],notes:'Virgin Australia flew five Boeing 777-300ERs to Los Angeles until it retired its widebody fleet in 2020 to focus on a domestic 737 network.',sightings:[]},
  {id:71,airline:'Oman Air',tail:'A4O-SC',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#6E2639','#C8A04B','#FFFFFF'],tags:['current','dreamliner'],notes:'Oman Air, the flag carrier of the Sultanate of Oman, on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:72,airline:'Royal Air Maroc',tail:'CN-RGV',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#C8102E','#0A7D4B','#FFFFFF'],tags:['current'],notes:'Royal Air Maroc, the flag carrier of Morocco, in red and green on a Boeing 737-800.',sightings:[]},
  {id:73,airline:'SriLankan Airlines',tail:'4R-ALR',type:'Airbus A330-300',era:'2010s',livery:'Peacock (current)',colors:['#16284C','#C8A04B','#1E8A8A'],tags:['current','widebody'],notes:'SriLankan Airlines, with the stylised peacock on the tail, on an Airbus A330-300.',sightings:[]},
  {id:74,airline:'American Airlines',tail:'N905NN',type:'Boeing 737-800',era:'2010s',livery:'AstroJet retro',colors:['#C0C0C0','#E4002B','#0078D2'],tags:['retro','heritage','astrojet'],notes:'A heritage "AstroJet" retrojet — American 737-800 N905NN wears the polished-silver scheme with red lightning stripe from American\'s 1960s jet age.',sightings:[]},
  {id:79,airline:'United Airlines',tail:'N218UA',type:'Boeing 777-200ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'United 777-200ER N218UA in the Star Alliance livery, marking United\'s membership in the global airline alliance.',sightings:[]},
  {id:82,airline:'Alaska Airlines',tail:'N265AK',type:'Boeing 737-900ER',era:'2010s',livery:'Honoring Those Who Serve',colors:['#01426A','#C8102E','#FFFFFF'],tags:['special','tribute','rare'],notes:'Alaska Airlines\' "Honoring Those Who Serve" livery, dedicated to the U.S. military, on a Boeing 737-900ER.',sightings:[]},
  {id:83,airline:'Southwest Airlines',tail:'N214WN',type:'Boeing 737-700',era:'2010s',livery:'Maryland One',colors:['#000000','#E4002B','#F9B612'],tags:['special','state','heart'],notes:'"Maryland One" — Southwest 737-700 N214WN painted in the Maryland state flag, one of the airline\'s state-pride specials.',sightings:[]},
  {id:84,airline:'Southwest Airlines',tail:'N945WN',type:'Boeing 737-700',era:'2010s',livery:'Florida One',colors:['#F9A01B','#0067A0','#E4002B'],tags:['special','state','heart'],notes:'"Florida One" — a Southwest 737-700 wearing a sunshine-state design, complete with an orange-juice nose.',sightings:[]},
  {id:87,airline:'Qantas',tail:'VH-XZJ',type:'Boeing 737-800',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','roo'],notes:'A Qantas Boeing 737-800 in the current red "Flying Kangaroo" livery — the workhorse of its domestic fleet.',sightings:[]},
  {id:88,airline:'Qantas',tail:'VH-XZP',type:'Boeing 737-800',era:'2010s',livery:'Retro Roo II',colors:['#D86A1E','#E4A400','#C8102E'],tags:['retro','heritage','roo'],notes:'"Retro Roo II" — a Qantas 737-800 painted in the ochre-and-orange 1971 livery, a tribute to the airline\'s jet-age past.',sightings:[]},
  {id:89,airline:'British Airways',tail:'G-EUPJ',type:'Airbus A319',era:'2010s',livery:'BEA retro',colors:['#C8102E','#1A1A1A','#FFFFFF'],tags:['retro','heritage','BEA'],notes:'For BA\'s centenary in 2019, Airbus A319 G-EUPJ was painted in the red-and-black livery of British European Airways (BEA), a BA predecessor.',sightings:[]},
  // ── Fleet depth: more types & liveries per airline ──
  {id:200,airline:'Air France',tail:'F-HRBA',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','dreamliner'],notes:'Air France\'s Boeing 787-9 Dreamliner in the blue-white-and-red livery.',sightings:[]},
  {id:201,airline:'Air France',tail:'F-GSPZ',type:'Boeing 777-200ER',era:'2000s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','widebody'],notes:'An Air France Boeing 777-200ER, a long-haul mainstay.',sightings:[]},
  {id:202,airline:'Air France',tail:'F-HZUA',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current'],notes:'Air France\'s Airbus A220-300, the modern backbone of its short-haul fleet.',sightings:[]},
  {id:203,airline:'Aer Lingus',tail:'EI-EDY',type:'Airbus A330-300',era:'2010s',livery:'Shamrock (current)',colors:['#006272','#FFFFFF','#9CA299'],tags:['current','shamrock','widebody'],notes:'An Aer Lingus Airbus A330-300 on the transatlantic run, with the teal shamrock tail.',sightings:[]},
  {id:204,airline:'Aer Lingus',tail:'EI-LRA',type:'Airbus A321neo LR',era:'2020s',livery:'Shamrock (current)',colors:['#006272','#FFFFFF','#9CA299'],tags:['current','shamrock'],notes:'Aer Lingus uses the long-range Airbus A321neo LR to fly narrowbody transatlantic routes.',sightings:[]},
  {id:205,airline:'Air India',tail:'VT-EXF',type:'Airbus A320neo',era:'2010s',livery:'Current',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['current'],notes:'An Air India Airbus A320neo on domestic and regional routes.',sightings:[]},
  {id:206,airline:'Air New Zealand',tail:'ZK-NZE',type:'Boeing 787-9',era:'2010s',livery:'Black (current)',colors:['#0E0E0E','#1A1A1A','#FFFFFF'],tags:['current','dreamliner'],notes:'Air New Zealand\'s sleek all-black livery on a Boeing 787-9 Dreamliner.',sightings:[]},
  {id:208,airline:'Alaska Airlines',tail:'N932AK',type:'Boeing 737 MAX 9',era:'2020s',livery:'Eskimo (current)',colors:['#01426A','#00467F','#76858F'],tags:['current','eskimo'],notes:'Alaska Airlines\' newest narrowbody, the Boeing 737-9 MAX, with the Eskimo tail.',sightings:[]},
  {id:209,airline:'All Nippon Airways',tail:'JA381A',type:'Airbus A380',era:'2020s',livery:'Flying Honu (blue)',colors:['#0A4DA0','#00A1E0','#FFFFFF'],tags:['special','superjumbo','honu','rare'],notes:'ANA\'s "Flying Honu" Airbus A380, painted as a Hawaiian green sea turtle, on the Tokyo–Honolulu route. JA381A is the blue "Lani" jet.',sightings:[]},
  {id:210,airline:'All Nippon Airways',tail:'JA882A',type:'Boeing 787-9',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','dreamliner'],notes:'An ANA Boeing 787-9 in the blue Triton livery — ANA is the largest 787 operator in the world.',sightings:[]},
  {id:211,airline:'American Airlines',tail:'N791AN',type:'Boeing 777-300ER',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'American 777-300ER N791AN in the grey "oneworld" alliance livery.',sightings:[]},
  {id:212,airline:'Asiana Airlines',tail:'HL7775',type:'Boeing 777-200ER',era:'2010s',livery:'Current',colors:['#CF112A','#6E6F72','#FFFFFF'],tags:['current','widebody'],notes:'An Asiana Airlines Boeing 777-200ER.',sightings:[]},
  {id:213,airline:'Austrian Airlines',tail:'OE-LWP',type:'Embraer 195',era:'2010s',livery:'Current',colors:['#D80B16','#FFFFFF','#A6A6A6'],tags:['current','regional'],notes:'An Austrian Airlines Embraer 195 on European regional routes.',sightings:[]},
  {id:214,airline:'Austrian Airlines',tail:'OE-LBP',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#D80B16','#FFFFFF','#A6A6A6'],tags:['current'],notes:'An Austrian Airlines Airbus A320 in the red-and-white livery.',sightings:[]},
  {id:215,airline:'British Airways',tail:'G-ZBKA',type:'Boeing 787-9',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','dreamliner'],notes:'A British Airways Boeing 787-9 Dreamliner in the current Chatham Dockyard livery.',sightings:[]},
  {id:216,airline:'British Airways',tail:'G-XWBA',type:'Airbus A350-1000',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','widebody'],notes:'G-XWBA was British Airways\' first Airbus A350-1000, the flagship of its modern long-haul fleet.',sightings:[]},
  {id:217,airline:'British Airways',tail:'G-STBA',type:'Boeing 777-300ER',era:'2010s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','widebody'],notes:'A British Airways Boeing 777-300ER in the current livery.',sightings:[]},
  {id:218,airline:'Cathay Pacific',tail:'B-LRA',type:'Airbus A350-900',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','widebody','brushwing'],notes:'A Cathay Pacific Airbus A350-900 in the green brushwing livery.',sightings:[]},
  {id:219,airline:'China Airlines',tail:'B-18917',type:'Airbus A350-900',era:'2010s',livery:'Plum blossom (current)',colors:['#C8102E','#E8E0CF','#1A3C6E'],tags:['current','widebody'],notes:'A China Airlines Airbus A350-900 in the plum-blossom livery.',sightings:[]},
  {id:220,airline:'China Airlines',tail:'B-18206',type:'Boeing 747-400',era:'2000s',livery:'Plum blossom (current)',colors:['#C8102E','#E8E0CF','#1A3C6E'],tags:['jumbo','widebody'],notes:'A China Airlines Boeing 747-400 — the carrier flew the passenger 747-400 until retiring the type in 2021.',sightings:[]},
  {id:221,airline:'China Southern',tail:'B-2725',type:'Boeing 787-8',era:'2010s',livery:'Kapok (current)',colors:['#0066B3','#E4002B','#FFFFFF'],tags:['current','dreamliner'],notes:'A China Southern Boeing 787-8 Dreamliner with the red kapok-flower logo.',sightings:[]},
  {id:222,airline:'Delta Air Lines',tail:'N401DZ',type:'Airbus A330-900',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget','widebody'],notes:'A Delta Airbus A330-900neo in the current widget livery.',sightings:[]},
  {id:223,airline:'Delta Air Lines',tail:'N935AT',type:'Boeing 717-200',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget'],notes:'Delta operates the largest Boeing 717 fleet in the world on short domestic hops.',sightings:[]},
  {id:224,airline:'Delta Air Lines',tail:'N101DU',type:'Airbus A220-100',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','widget'],notes:'N101DU was Delta\'s first Airbus A220-100.',sightings:[]},
  {id:225,airline:'easyJet',tail:'G-UZHA',type:'Airbus A320neo',era:'2010s',livery:'Current (orange)',colors:['#FF6600','#FFFFFF','#5A5A5A'],tags:['current','low-cost'],notes:'An easyJet Airbus A320neo in the bright-orange livery.',sightings:[]},
  {id:226,airline:'easyJet',tail:'G-EZBT',type:'Airbus A319',era:'2010s',livery:'Current (orange)',colors:['#FF6600','#FFFFFF','#5A5A5A'],tags:['current','low-cost'],notes:'An easyJet Airbus A319, long the mainstay of its fleet.',sightings:[]},
  {id:227,airline:'El Al',tail:'4X-EKU',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#003DA5','#FFFFFF','#A6A6A6'],tags:['current'],notes:'An El Al Boeing 737-800 on short- and medium-haul routes.',sightings:[]},
  {id:229,airline:'Emirates',tail:'A6-ENV',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','widebody'],notes:'Emirates flies the world\'s largest Boeing 777 fleet; A6-ENV is a 777-300ER.',sightings:[]},
  {id:230,airline:'Ethiopian Airlines',tail:'ET-ASK',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#15803C','#E4A400','#D5121E'],tags:['current','widebody'],notes:'An Ethiopian Airlines Boeing 777-300ER.',sightings:[]},
  {id:231,airline:'Ethiopian Airlines',tail:'ET-AVC',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#15803C','#E4A400','#D5121E'],tags:['current','widebody'],notes:'An Ethiopian Airlines Airbus A350-900, the flagship of Africa\'s largest carrier.',sightings:[]},
  {id:232,airline:'Etihad Airways',tail:'A6-BMI',type:'Boeing 787-10',era:'2010s',livery:'Current',colors:['#BD8B13','#4A4A4A','#FFFFFF'],tags:['current','dreamliner'],notes:'Etihad Airways\' Boeing 787-10 Dreamliner, the largest of the 787 family.',sightings:[]},
  {id:233,airline:'Etihad Airways',tail:'A6-API',type:'Airbus A380',era:'2010s',livery:'Current',colors:['#BD8B13','#4A4A4A','#FFFFFF'],tags:['current','superjumbo'],notes:'An Etihad Airways Airbus A380 — home to "The Residence", a three-room suite.',sightings:[]},
  {id:234,airline:'EVA Air',tail:'B-16722',type:'Boeing 777-300ER',era:'2010s',livery:'Hello Kitty',colors:['#E89AC7','#005E3C','#FFFFFF'],tags:['special','hello kitty','rare'],notes:'EVA Air\'s famous Hello Kitty jet — a Boeing 777-300ER covered in Sanrio characters inside and out.',sightings:[]},
  {id:235,airline:'EVA Air',tail:'B-17881',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#005E3C','#F0A800','#FFFFFF'],tags:['current','dreamliner'],notes:'An EVA Air Boeing 787-9 in the green-and-orange livery.',sightings:[]},
  {id:236,airline:'Finnair',tail:'OH-LTO',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#0B1560','#FFFFFF','#A0A0A0'],tags:['current','widebody'],notes:'A Finnair Airbus A330-300 on long-haul routes to Asia.',sightings:[]},
  {id:237,airline:'Finnair',tail:'OH-LWL',type:'Airbus A350-900',era:'2010s',livery:'Marimekko (Kivet)',colors:['#0B1560','#3A6FB0','#FFFFFF'],tags:['special','marimekko'],notes:'A Finnair Airbus A350 wearing the Marimekko "Kivet" (stones) pattern — a collaboration with the Finnish design house.',sightings:[]},
  {id:238,airline:'Frontier Airlines',tail:'N701FR',type:'Airbus A321',era:'2010s',livery:'Animal tail (current)',colors:['#00754A','#FFFFFF','#6CC24A'],tags:['current','animal'],notes:'A Frontier Airbus A321; each Frontier jet carries a different wild-animal portrait on its tail.',sightings:[]},
  {id:239,airline:'Frontier Airlines',tail:'N230FR',type:'Airbus A320',era:'2010s',livery:'Animal tail (current)',colors:['#00754A','#FFFFFF','#6CC24A'],tags:['current','animal'],notes:'A Frontier Airbus A320 with one of the airline\'s signature animal tails.',sightings:[]},
  {id:240,airline:'Garuda Indonesia',tail:'PK-GPA',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#1A6AAE','#0E8A3C','#FFFFFF'],tags:['current','widebody'],notes:'A Garuda Indonesia Airbus A330-300.',sightings:[]},
  {id:241,airline:'Hawaiian Airlines',tail:'N202HA',type:'Airbus A321neo',era:'2010s',livery:'Pualani (current)',colors:['#4C1F7A','#E6007E','#F5A800'],tags:['current'],notes:'A Hawaiian Airlines Airbus A321neo, used on US-mainland routes.',sightings:[]},
  {id:242,airline:'Hawaiian Airlines',tail:'N480HA',type:'Boeing 717-200',era:'2010s',livery:'Pualani (current)',colors:['#4C1F7A','#E6007E','#F5A800'],tags:['current'],notes:'Hawaiian flies Boeing 717s on short inter-island hops across the Hawaiian islands.',sightings:[]},
  {id:243,airline:'Iberia',tail:'EC-MAA',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','widebody'],notes:'An Iberia Airbus A330-300 in the red-and-yellow livery.',sightings:[]},
  {id:244,airline:'Lufthansa',tail:'D-AIXD',type:'Airbus A350-900',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','widebody'],notes:'A Lufthansa Airbus A350-900 in the navy-and-yellow crane livery.',sightings:[]},
  {id:245,airline:'Lufthansa',tail:'D-ABVM',type:'Boeing 747-400',era:'2000s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['jumbo','widebody'],notes:'A Lufthansa Boeing 747-400 — Lufthansa was the largest operator of the passenger 747-400.',sightings:[]},
  {id:246,airline:'KLM',tail:'PH-BHA',type:'Boeing 787-9',era:'2010s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','dreamliner'],notes:'PH-BHA was KLM\'s first Boeing 787-9 Dreamliner.',sightings:[]},
  {id:247,airline:'Singapore Airlines',tail:'9V-SWA',type:'Boeing 777-300ER',era:'2000s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','widebody'],notes:'A Singapore Airlines Boeing 777-300ER.',sightings:[]},
  {id:248,airline:'Singapore Airlines',tail:'9V-SMF',type:'Airbus A350-900',era:'2010s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','widebody'],notes:'A Singapore Airlines Airbus A350-900, used on some of the world\'s longest flights.',sightings:[]},
  {id:249,airline:'Qatar Airways',tail:'A7-ALA',type:'Airbus A350-900',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','widebody','oryx'],notes:'A7-ALA was the world\'s first Airbus A350 in service, delivered to Qatar Airways in 2014.',sightings:[]},
  {id:250,airline:'Qatar Airways',tail:'A7-APA',type:'Airbus A380',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','superjumbo'],notes:'A7-APA was Qatar Airways\' first Airbus A380.',sightings:[]},
  {id:251,airline:'Turkish Airlines',tail:'TC-LLA',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','dreamliner'],notes:'A Turkish Airlines Boeing 787-9 Dreamliner.',sightings:[]},
  {id:252,airline:'Japan Airlines',tail:'JA01XJ',type:'Airbus A350-900',era:'2010s',livery:'Tsurumaru (current)',colors:['#C8102E','#FFFFFF','#B0B0B0'],tags:['current','widebody','crane'],notes:'JA01XJ was Japan Airlines\' first Airbus A350-900, with the red Tsurumaru crane.',sightings:[]},
  {id:253,airline:'Virgin Atlantic',tail:'G-VLUX',type:'Airbus A350-1000',era:'2010s',livery:'Current',colors:['#E10A0A','#FFFFFF','#4B0082'],tags:['current','widebody'],notes:'A Virgin Atlantic Airbus A350-1000, the modern flagship of the Virgin fleet.',sightings:[]},
  {id:254,airline:'JetBlue',tail:'N2002J',type:'Airbus A321neo',era:'2010s',livery:'Current',colors:['#003876','#FFFFFF','#6CACE4'],tags:['current'],notes:'A JetBlue Airbus A321neo, used on transcon and transatlantic routes.',sightings:[]},
  {id:255,airline:'Air Canada',tail:'C-FIVR',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','widebody'],notes:'An Air Canada Boeing 777-300ER in the red-and-black livery.',sightings:[]},
  {id:256,airline:'Korean Air',tail:'HL8348',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#1B4DA1','#7AB3E0','#FFFFFF'],tags:['current'],notes:'A Korean Air Boeing 737-8 MAX.',sightings:[]},
  {id:257,airline:'Korean Air',tail:'HL8081',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#1B4DA1','#7AB3E0','#FFFFFF'],tags:['current','dreamliner'],notes:'A Korean Air Boeing 787-9 Dreamliner.',sightings:[]},
  // ── Big-carrier fleet depth (live-hydrated by reg via the photo API) ──
  {id:300,airline:'Air Canada',tail:'C-GROV',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'The Airbus A220-300 has become a cornerstone of Air Canada\'s narrowbody fleet, with dozens in service.',sightings:[]},
  {id:301,airline:'Air Canada',tail:'C-GFUR',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A330-300, a long-haul workhorse on transatlantic and high-density routes.',sightings:[]},
  {id:302,airline:'Air Canada',tail:'C-FSDB',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Boeing 737 MAX 8, flown on domestic, US and transatlantic sectors.',sightings:[]},
  {id:303,airline:'Air Canada',tail:'C-FIVK',type:'Boeing 777-200LR',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'Air Canada\'s Boeing 777-200LR — an ultra-long-range twin used on some of its longest routes.',sightings:[]},
  {id:304,airline:'Air Canada',tail:'C-GHPQ',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','dreamliner'],notes:'An Air Canada Boeing 787-8 Dreamliner in the red-and-black livery.',sightings:[]},
  {id:305,airline:'American Airlines',tail:'N304RB',type:'Boeing 737 MAX 8',era:'2020s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Boeing 737 MAX 8, a core narrowbody of its domestic fleet.',sightings:[]},
  {id:306,airline:'American Airlines',tail:'N803NN',type:'Boeing 737-800',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'A standard-livery American Airlines Boeing 737-800 — the backbone of its narrowbody fleet.',sightings:[]},
  {id:307,airline:'American Airlines',tail:'N835AN',type:'Boeing 787-9',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','dreamliner'],notes:'An American Airlines Boeing 787-9 Dreamliner on long-haul international routes.',sightings:[]},
  {id:308,airline:'American Airlines',tail:'N93003',type:'Airbus A319',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Airbus A319 in the 2013 \'New American\' livery.',sightings:[]},
  {id:309,airline:'American Airlines',tail:'N400AN',type:'Airbus A321neo',era:'2020s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Airbus A321neo, the largest of its single-aisle fleet.',sightings:[]},
  {id:310,airline:'United Airlines',tail:'N66825',type:'Boeing 737-900ER',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Airlines Boeing 737-900ER in the blue globe livery.',sightings:[]},
  {id:311,airline:'United Airlines',tail:'N653UA',type:'Boeing 767-300ER',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Boeing 767-300ER, a long-serving transatlantic widebody.',sightings:[]},
  {id:312,airline:'United Airlines',tail:'N13014',type:'Boeing 787-10',era:'2020s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','dreamliner'],notes:'A United Boeing 787-10 Dreamliner, the largest of the 787 family.',sightings:[]},
  {id:313,airline:'Delta Air Lines',tail:'N844MH',type:'Boeing 767-400ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'Delta is the world\'s only passenger operator of the Boeing 767-400ER.',sightings:[]},
  {id:314,airline:'British Airways',tail:'G-ZBLB',type:'Boeing 787-10',era:'2020s',livery:'Chatham Dockyard (current)',colors:['#0051A5','#EB2226','#FFFFFF'],tags:['current','dreamliner'],notes:'A British Airways Boeing 787-10 Dreamliner in the Chatham Dockyard livery.',sightings:[]},
  {id:315,airline:'Lufthansa',tail:'D-ABPB',type:'Boeing 787-9',era:'2020s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','dreamliner'],notes:'A Lufthansa Boeing 787-9 Dreamliner — a recent addition to its long-haul fleet.',sightings:[]},
  {id:316,airline:'Lufthansa',tail:'D-AIND',type:'Airbus A320neo',era:'2020s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','narrowbody'],notes:'A Lufthansa Airbus A320neo in the navy-and-yellow crane livery.',sightings:[]},
  {id:317,airline:'Lufthansa',tail:'D-AIHW',type:'Airbus A340-600',era:'2010s',livery:'Crane (current)',colors:['#05164D','#FFFFFF','#FFAD00'],tags:['current','narrowbody'],notes:'Lufthansa is one of the last operators of the stretched, four-engined Airbus A340-600.',sightings:[]},
  {id:318,airline:'Air France',tail:'F-HEPA',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','narrowbody'],notes:'An Air France Airbus A320 on European short-haul routes.',sightings:[]},
  {id:319,airline:'Air France',tail:'F-GZCA',type:'Airbus A330-200',era:'2010s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','narrowbody'],notes:'An Air France Airbus A330-200 widebody.',sightings:[]},
  {id:320,airline:'Air France',tail:'F-HUVA',type:'Airbus A350-900',era:'2020s',livery:'Current',colors:['#002157','#FFFFFF','#EE2737'],tags:['current','narrowbody'],notes:'An Air France Airbus A350-900, the modern flagship of its long-haul fleet.',sightings:[]},
  {id:321,airline:'Emirates',tail:'A6-EWA',type:'Boeing 777-200LR',era:'2010s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','narrowbody'],notes:'Emirates\' Boeing 777-200LR — for years the world\'s longest-range airliner — on ultra-long routes.',sightings:[]},
  {id:322,airline:'Emirates',tail:'A6-EXA',type:'Airbus A350-900',era:'2020s',livery:'Current',colors:['#D71921','#FFFFFF','#C9A227'],tags:['current','narrowbody'],notes:'Emirates began taking Airbus A350-900s in 2024, broadening a fleet long built around the A380 and 777.',sightings:[]},
  {id:323,airline:'Qatar Airways',tail:'A7-ANA',type:'Airbus A350-1000',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','narrowbody'],notes:'Qatar Airways was the launch customer of the Airbus A350-1000.',sightings:[]},
  {id:324,airline:'Qatar Airways',tail:'A7-BEG',type:'Boeing 777-300ER',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','narrowbody'],notes:'A Qatar Airways Boeing 777-300ER, a mainstay of its long-haul fleet.',sightings:[]},
  {id:325,airline:'Qatar Airways',tail:'A7-BBI',type:'Boeing 777-200LR',era:'2010s',livery:'Oryx (current)',colors:['#5C0632','#FFFFFF','#A9A9A9'],tags:['current','narrowbody'],notes:'A Qatar Airways Boeing 777-200LR, flown on its longest ultra-long-haul routes.',sightings:[]},
  {id:326,airline:'Singapore Airlines',tail:'9V-SCR',type:'Boeing 787-10',era:'2010s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','dreamliner'],notes:'Singapore Airlines was the launch customer of the Boeing 787-10 Dreamliner.',sightings:[]},
  {id:327,airline:'Singapore Airlines',tail:'9V-MBP',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#F7A800','#003E7E','#FFFFFF'],tags:['current','narrowbody'],notes:'A Singapore Airlines Boeing 737-8 MAX, flown on regional routes (inherited via the SilkAir merger).',sightings:[]},
  {id:328,airline:'Cathay Pacific',tail:'B-LXA',type:'Airbus A350-1000',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','narrowbody'],notes:'A Cathay Pacific Airbus A350-1000 in the green brushwing livery.',sightings:[]},
  {id:329,airline:'Cathay Pacific',tail:'B-LAK',type:'Airbus A330-300',era:'2010s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','narrowbody'],notes:'A Cathay Pacific Airbus A330-300, a regional-widebody workhorse.',sightings:[]},
  {id:330,airline:'Cathay Pacific',tail:'B-HPI',type:'Airbus A321neo',era:'2020s',livery:'Brushwing (current)',colors:['#006564','#FFFFFF','#9C8C5A'],tags:['current','narrowbody'],notes:'A Cathay Pacific Airbus A321neo, the airline\'s newest narrowbody.',sightings:[]},
  {id:331,airline:'Iberia',tail:'EC-KHM',type:'Airbus A319',era:'2010s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','narrowbody'],notes:'An Iberia Airbus A319 in the red-and-yellow livery.',sightings:[]},
  {id:332,airline:'Iberia',tail:'EC-NER',type:'Airbus A320neo',era:'2020s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','narrowbody'],notes:'An Iberia Airbus A320neo on short- and medium-haul European routes.',sightings:[]},
  {id:333,airline:'Iberia',tail:'EC-MYA',type:'Airbus A330-200',era:'2010s',livery:'Current',colors:['#D40F2D','#F6B500','#FFFFFF'],tags:['current','narrowbody'],notes:'An Iberia Airbus A330-200 widebody on transatlantic routes to the Americas.',sightings:[]},
  {id:334,airline:'All Nippon Airways',tail:'JA813A',type:'Boeing 787-8',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','dreamliner'],notes:'ANA is the world\'s largest operator of the Boeing 787; JA813A is a 787-8.',sightings:[]},
  {id:335,airline:'All Nippon Airways',tail:'JA714A',type:'Boeing 777-200ER',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','narrowbody'],notes:'An ANA Boeing 777-200ER in the blue Triton livery.',sightings:[]},
  {id:336,airline:'All Nippon Airways',tail:'JA608A',type:'Boeing 767-300ER',era:'2010s',livery:'Triton (current)',colors:['#1B0088','#00A1E0','#FFFFFF'],tags:['current','narrowbody'],notes:'An ANA Boeing 767-300ER, long a backbone of its domestic and regional network.',sightings:[]},
  {id:337,airline:'KLM',tail:'PH-BXA',type:'Boeing 737-800',era:'2010s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','narrowbody'],notes:'A KLM Boeing 737-800, the mainstay of its European short-haul fleet.',sightings:[]},
  {id:338,airline:'KLM',tail:'PH-BKA',type:'Boeing 787-10',era:'2020s',livery:'Current (blue)',colors:['#00A1DE','#FFFFFF','#003082'],tags:['current','dreamliner'],notes:'A KLM Boeing 787-10 Dreamliner in the sky-blue livery.',sightings:[]},
  {id:339,airline:'Qantas',tail:'VH-ZNG',type:'Boeing 787-9',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','dreamliner'],notes:'A Qantas Boeing 787-9 Dreamliner, flown on ultra-long routes such as Perth–London.',sightings:[]},
  {id:340,airline:'Qantas',tail:'VH-QPH',type:'Airbus A330-300',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','narrowbody'],notes:'A Qantas Airbus A330-300 on domestic trunk and regional-international routes.',sightings:[]},
  {id:341,airline:'Qantas',tail:'VH-EBG',type:'Airbus A330-200',era:'2010s',livery:'Flying Roo (current)',colors:['#E40000','#FFFFFF','#C0C0C0'],tags:['current','narrowbody'],notes:'A Qantas Airbus A330-200 widebody.',sightings:[]},
  // ── More fleet depth: North American majors (Air Canada A320/A321 families, US3 widebodies) ──
  {id:342,airline:'Air Canada',tail:'C-FDQQ',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A320 — part of a narrowbody fleet of around 30 A320-family jets.',sightings:[]},
  {id:343,airline:'Air Canada',tail:'C-FKCK',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A320 on a domestic or US transborder route.',sightings:[]},
  {id:344,airline:'Air Canada',tail:'C-FNVU',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A320 in the red-and-black livery.',sightings:[]},
  {id:345,airline:'Air Canada',tail:'C-FGKP',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A321, the largest of its A320-family narrowbodies.',sightings:[]},
  {id:346,airline:'Air Canada',tail:'C-GIUF',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A321 on a high-density domestic route.',sightings:[]},
  {id:347,airline:'Air Canada',tail:'C-GITU',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A321 in the current livery.',sightings:[]},
  {id:348,airline:'Air Canada',tail:'C-GHLM',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'Another of Air Canada\'s Airbus A330-300s, used on transatlantic and high-density routes.',sightings:[]},
  {id:349,airline:'Air Canada',tail:'C-GJXN',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A220-300, built in Mirabel, Québec.',sightings:[]},
  {id:350,airline:'Air Canada',tail:'C-GJXW',type:'Airbus A220-300',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air Canada Airbus A220-300 on a North American route.',sightings:[]},
  {id:351,airline:'Air Canada',tail:'C-GEHV',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Air Canada Boeing 737 MAX 8, flown on domestic and transborder routes.',sightings:[]},
  {id:352,airline:'Air Canada',tail:'C-GHPX',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#D8222A','#202020','#FFFFFF'],tags:['current','dreamliner'],notes:'Another Air Canada Boeing 787-8 Dreamliner.',sightings:[]},
  {id:353,airline:'American Airlines',tail:'N721AN',type:'Boeing 777-300ER',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','narrowbody'],notes:'An American Airlines Boeing 777-300ER — the flagship of its long-haul fleet — in the standard 2013 livery.',sightings:[]},
  {id:354,airline:'American Airlines',tail:'N802AN',type:'Boeing 787-8',era:'2010s',livery:'New American (2013)',colors:['#0078D2','#C8102E','#B0B7BC'],tags:['current','dreamliner'],notes:'An American Airlines Boeing 787-8 Dreamliner.',sightings:[]},
  {id:355,airline:'United Airlines',tail:'N17122',type:'Boeing 757-200',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Boeing 757-200, flown on transcon and some transatlantic routes.',sightings:[]},
  {id:356,airline:'United Airlines',tail:'N66051',type:'Boeing 767-400ER',era:'2010s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'United is one of only two passenger operators of the Boeing 767-400ER.',sightings:[]},
  {id:357,airline:'United Airlines',tail:'N47280',type:'Boeing 737 MAX 8',era:'2020s',livery:'Globe (current)',colors:['#004B87','#FFFFFF','#A2AAAD'],tags:['current','narrowbody'],notes:'A United Boeing 737 MAX 8 in the blue globe livery.',sightings:[]},
  {id:358,airline:'Delta Air Lines',tail:'N3748Y',type:'Boeing 737-800',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Boeing 737-800, a core narrowbody of its domestic fleet.',sightings:[]},
  {id:359,airline:'Delta Air Lines',tail:'N821DN',type:'Boeing 737-900ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Boeing 737-900ER, the largest of its 737 family.',sightings:[]},
  {id:360,airline:'Delta Air Lines',tail:'N858NW',type:'Airbus A330-200',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Airbus A330-200 widebody, inherited from the Northwest merger.',sightings:[]},
  {id:361,airline:'Delta Air Lines',tail:'N810NW',type:'Airbus A330-300',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Airbus A330-300 on transatlantic and transpacific routes.',sightings:[]},
  {id:362,airline:'Delta Air Lines',tail:'N188DN',type:'Boeing 767-300ER',era:'2010s',livery:'Widget (current)',colors:['#E01933','#003366','#FFFFFF'],tags:['current','narrowbody'],notes:'A Delta Boeing 767-300ER, a long-serving transatlantic widebody.',sightings:[]},
  // ── More fleet depth: Aeroméxico, Air China + thin world carriers (live-hydrated by reg) ──
  {id:363,airline:'Aeroméxico',tail:'XA-AMT',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','narrowbody'],notes:'An Aeroméxico Boeing 737 MAX 8, the core of its narrowbody fleet.',sightings:[]},
  {id:364,airline:'Aeroméxico',tail:'XA-MAQ',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Aeroméxico Boeing 737 MAX 8.',sightings:[]},
  {id:365,airline:'Aeroméxico',tail:'XA-AML',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','narrowbody'],notes:'An Aeroméxico Boeing 737-800.',sightings:[]},
  {id:366,airline:'Aeroméxico',tail:'XA-AMU',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','narrowbody'],notes:'An Aeroméxico Boeing 737-800 on a domestic or US route.',sightings:[]},
  {id:367,airline:'Aeroméxico',tail:'N967AM',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#0B2B5B','#E40521','#FFFFFF'],tags:['current','dreamliner'],notes:'An Aeroméxico Boeing 787-8 Dreamliner, a long-haul flagship.',sightings:[]},
  {id:368,airline:'Air China',tail:'B-2032',type:'Boeing 777-300ER',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air China Boeing 777-300ER on long-haul intercontinental routes.',sightings:[]},
  {id:369,airline:'Air China',tail:'B-2087',type:'Boeing 777-300ER',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Air China Boeing 777-300ER.',sightings:[]},
  {id:370,airline:'Air China',tail:'B-7878',type:'Boeing 787-9',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','dreamliner'],notes:'An Air China Boeing 787-9 Dreamliner.',sightings:[]},
  {id:371,airline:'Air China',tail:'B-1466',type:'Boeing 787-9',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','dreamliner'],notes:'An Air China Boeing 787-9 Dreamliner in the phoenix livery.',sightings:[]},
  {id:372,airline:'Air China',tail:'B-5916',type:'Airbus A330-300',era:'2010s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air China Airbus A330-300, a regional-widebody workhorse.',sightings:[]},
  {id:373,airline:'Air China',tail:'B-1085',type:'Airbus A350-900',era:'2020s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air China Airbus A350-900, the flagship of its modern fleet.',sightings:[]},
  {id:374,airline:'Air China',tail:'B-32F1',type:'Airbus A350-900',era:'2020s',livery:'Current (phoenix)',colors:['#C8102E','#E8B100','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Air China Airbus A350-900.',sightings:[]},
  {id:375,airline:'Japan Airlines',tail:'JA831J',type:'Boeing 787-8',era:'2010s',livery:'Tsurumaru (current)',colors:['#C8102E','#FFFFFF','#B0B0B0'],tags:['current','dreamliner'],notes:'A Japan Airlines Boeing 787-8 Dreamliner with the red Tsurumaru crane.',sightings:[]},
  {id:376,airline:'Turkish Airlines',tail:'TC-LCH',type:'Boeing 737 MAX 8',era:'2020s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','narrowbody'],notes:'A Turkish Airlines Boeing 737 MAX 8.',sightings:[]},
  {id:377,airline:'Turkish Airlines',tail:'TC-JVA',type:'Boeing 737-800',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','narrowbody'],notes:'A Turkish Airlines Boeing 737-800, a short-haul workhorse.',sightings:[]},
  {id:378,airline:'Turkish Airlines',tail:'TC-JOH',type:'Airbus A330-300',era:'2010s',livery:'Current',colors:['#C70A0C','#FFFFFF','#1A1A1A'],tags:['current','narrowbody'],notes:'A Turkish Airlines Airbus A330-300.',sightings:[]},
  {id:379,airline:'Saudia',tail:'HZ-AR25',type:'Boeing 787-10',era:'2020s',livery:'Current',colors:['#005430','#7BA05B','#FFFFFF'],tags:['current','dreamliner'],notes:'A Saudia Boeing 787-10 Dreamliner.',sightings:[]},
  {id:380,airline:'Saudia',tail:'HZ-ARF',type:'Boeing 787-9',era:'2010s',livery:'Current',colors:['#005430','#7BA05B','#FFFFFF'],tags:['current','dreamliner'],notes:'A Saudia Boeing 787-9 Dreamliner.',sightings:[]},
  {id:381,airline:'Air India',tail:'VT-ALM',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['current','narrowbody'],notes:'An Air India Boeing 777-300ER on ultra-long-haul routes to North America.',sightings:[]},
  {id:382,airline:'Air India',tail:'VT-ALP',type:'Boeing 777-300ER',era:'2010s',livery:'Current',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Air India Boeing 777-300ER.',sightings:[]},
  {id:383,airline:'Air India',tail:'VT-JRA',type:'Airbus A350-900',era:'2020s',livery:'Current',colors:['#D31247','#FF6A13','#FFFFFF'],tags:['current','narrowbody'],notes:'VT-JRA was among Air India\'s first Airbus A350-900s, the flagship of its post-2022 fleet renewal.',sightings:[]},
  {id:384,airline:'LATAM',tail:'CC-CXJ',type:'Boeing 767-300ER',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','narrowbody'],notes:'A LATAM Boeing 767-300ER, long a widebody mainstay across the Americas.',sightings:[]},
  {id:385,airline:'LATAM',tail:'CC-BBC',type:'Boeing 787-8',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','dreamliner'],notes:'A LATAM Boeing 787-8 Dreamliner.',sightings:[]},
  {id:386,airline:'LATAM',tail:'CC-BLA',type:'Airbus A320',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','narrowbody'],notes:'A LATAM Airbus A320 on a domestic South American route.',sightings:[]},
  {id:387,airline:'LATAM',tail:'CC-BEA',type:'Airbus A321',era:'2010s',livery:'Current',colors:['#1B0088','#E40046','#FFFFFF'],tags:['current','narrowbody'],notes:'A LATAM Airbus A321, the largest of its single-aisle fleet.',sightings:[]},
  {id:388,airline:'Vietnam Airlines',tail:'VN-A897',type:'Airbus A350-900',era:'2010s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','narrowbody'],notes:'A Vietnam Airlines Airbus A350-900 with the golden-lotus emblem.',sightings:[]},
  {id:389,airline:'Vietnam Airlines',tail:'VN-A888',type:'Airbus A350-900',era:'2010s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','narrowbody'],notes:'Another Vietnam Airlines Airbus A350-900.',sightings:[]},
  {id:390,airline:'Vietnam Airlines',tail:'VN-A872',type:'Boeing 787-10',era:'2020s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','dreamliner'],notes:'A Vietnam Airlines Boeing 787-10 Dreamliner.',sightings:[]},
  {id:391,airline:'Vietnam Airlines',tail:'VN-A622',type:'Airbus A321neo',era:'2020s',livery:'Golden Lotus (current)',colors:['#16599A','#C49A3A','#FFFFFF'],tags:['current','narrowbody'],notes:'A Vietnam Airlines Airbus A321neo on regional routes.',sightings:[]},
  // ── More liveries: alliance schemes (Star Alliance / oneworld / SkyTeam), retro & specials ──
  {id:392,airline:'Singapore Airlines',tail:'9V-SWI',type:'Boeing 777-300ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'A Singapore Airlines Boeing 777-300ER in the all-white Star Alliance livery, marking its membership in the global alliance.',sightings:[]},
  {id:393,airline:'Turkish Airlines',tail:'TC-JJU',type:'Boeing 777-300ER',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','widebody'],notes:'A Turkish Airlines Boeing 777-300ER wearing the Star Alliance livery.',sightings:[]},
  {id:394,airline:'Turkish Airlines',tail:'TC-JRR',type:'Airbus A321',era:'2010s',livery:'Star Alliance',colors:['#0A2D6E','#FFFFFF','#A2AAAD'],tags:['special','star alliance','narrowbody'],notes:'A Turkish Airlines Airbus A321 in the Star Alliance livery.',sightings:[]},
  {id:395,airline:'Finnair',tail:'OH-LWB',type:'Airbus A350-900',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A Finnair Airbus A350-900 in the grey oneworld alliance livery.',sightings:[]},
  {id:396,airline:'Japan Airlines',tail:'JA732J',type:'Boeing 777-300ER',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A Japan Airlines Boeing 777-300ER in the oneworld alliance livery.',sightings:[]},
  {id:397,airline:'Qatar Airways',tail:'A7-BAF',type:'Boeing 777-300ER',era:'2010s',livery:'oneworld',colors:['#A7A9AC','#1A1A2E','#FFFFFF'],tags:['special','oneworld','widebody'],notes:'A Qatar Airways Boeing 777-300ER in the oneworld alliance livery.',sightings:[]},
  {id:398,airline:'KLM',tail:'PH-BVD',type:'Boeing 777-300ER',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','widebody'],notes:'A KLM Boeing 777-300ER in the blue SkyTeam alliance livery.',sightings:[]},
  {id:399,airline:'Air France',tail:'F-GTAE',type:'Airbus A321',era:'2010s',livery:'SkyTeam',colors:['#0F3F87','#8C9BB5','#FFFFFF'],tags:['special','skyteam','narrowbody'],notes:'An Air France Airbus A321 in the silver-and-blue SkyTeam alliance livery.',sightings:[]},
  {id:400,airline:'Icelandair',tail:'TF-FIU',type:'Boeing 757-200',era:'2010s',livery:'Hekla Aurora',colors:['#0A2240','#2BAE66','#F2C200'],tags:['special','aurora','rare'],notes:'‘Hekla Aurora’ — an Icelandair Boeing 757-200 painted in a shimmering northern-lights livery, with green-and-blue auroras down the fuselage and yellow engines.',sightings:[]},
  {id:401,airline:'American Airlines',tail:'N915NN',type:'Boeing 737-800',era:'2010s',livery:'TWA heritage',colors:['#C8102E','#FFFFFF','#C0C0C0'],tags:['retro','heritage','TWA'],notes:'A TWA heritage retrojet — American 737-800 N915NN wears the red-cheatline livery of Trans World Airlines, which American absorbed in 2001.',sightings:[]},
  {id:402,airline:'Alaska Airlines',tail:'N570AS',type:'Boeing 737-800',era:'2010s',livery:'Eskimo (current)',colors:['#01426A','#00467F','#76858F'],tags:['current','eskimo'],notes:'An Alaska Airlines Boeing 737-800 in the standard ‘Eskimo’ livery, with the parka-hooded Alaska Native face on the tail.',sightings:[]},
  // ── Military aircraft (rare catches) ──
  {id:101,category:'military',airline:'U.S. Air Force',tail:'04-4070',type:'F-22 Raptor',era:'2010s',livery:'Air dominance grey',colors:['#5A6470','#3E4651','#8A95A3'],tags:['fighter','stealth','rare'],notes:'Fifth-generation air-superiority fighter. The Raptor\'s low-observable grey is rarely seen outside air shows.',sightings:[]},
  {id:102,category:'military',airline:'U.S. Navy',tail:'168912',type:'F/A-18 Super Hornet',era:'2010s',livery:'Tactical grey',colors:['#6B7480','#4A525C','#9AA4B0'],tags:['fighter','carrier','navy'],notes:'Carrier-based multirole fighter in standard tactical paint.',sightings:[]},
  {id:103,category:'military',airline:'U.S. Navy',tail:'165664',type:'F/A-18 Super Hornet',era:'2020s',livery:'Blue Angels',colors:['#002F6C','#FFC72C','#FFFFFF'],tags:['display','rare','iconic'],notes:'U.S. Navy flight demonstration squadron. The Blue Angels switched to the blue-and-gold F/A-18E/F Super Hornet in 2021 — a prized airshow catch.',sightings:[]},
  {id:104,category:'military',airline:'U.S. Air Force',tail:'87-0293',type:'F-16 Fighting Falcon',era:'2020s',livery:'Thunderbirds',colors:['#C8102E','#0A2472','#FFFFFF'],tags:['display','rare','iconic'],notes:'USAF Air Demonstration Squadron. The red-white-and-blue Thunderbirds F-16C is a rare-catch airshow favourite.',sightings:[]},
  {id:105,category:'military',airline:'Royal Air Force',tail:'ZK308',type:'Eurofighter Typhoon',era:'2010s',livery:'Air-defence grey',colors:['#5C6670','#3A424C','#8993A0'],tags:['fighter','RAF','europe'],notes:'RAF multirole fighter in standard air-defence grey.',sightings:[]},
  {id:106,category:'military',airline:'U.S. Air Force',tail:'82-1066',type:'B-2 Spirit',era:'1990s',livery:'Stealth black',colors:['#2A2D33','#1A1C20','#3E424A'],tags:['bomber','stealth','very rare'],notes:'Stealth strategic bomber — only 21 were ever built, making a B-2 the rarest of finds. 82-1066 "Spirit of America" was the very first B-2.',sightings:[]},
  {id:107,category:'military',airline:'U.S. Air Force',tail:'80-0221',type:'A-10 Thunderbolt II',era:'2010s',livery:'Warthog grey',colors:['#5A5F4D','#3E4234','#7A7F6A'],tags:['attack','warthog','rare'],notes:'The A-10 "Warthog" close-air-support jet, built around its enormous 30 mm GAU-8 cannon, in low-visibility grey.',sightings:[]},
  {id:108,category:'military',airline:'U.S. Air Force',tail:'60-0034',type:'B-52H Stratofortress',era:'2010s',livery:'Bomber grey',colors:['#4C4F45','#33352D','#6B6E60'],tags:['bomber','strategic','rare'],notes:'The B-52H heavy bomber — in USAF service since the 1960s and projected to keep flying into the 2050s.',sightings:[]},
  {id:109,category:'military',airline:'U.S. Air Force',tail:'84-0001',type:'F-15 Eagle',era:'2010s',livery:'Air-superiority grey',colors:['#5E6770','#3F464D','#8A93A0'],tags:['fighter','eagle'],notes:'The F-15 Eagle air-superiority fighter, famed for an undefeated air-to-air record, in two-tone grey.',sightings:[]},
  {id:110,category:'military',airline:'U.S. Navy',tail:'168267',type:'EA-18G Growler',era:'2010s',livery:'Tactical grey',colors:['#6B7480','#4A525C','#9AA4B0'],tags:['carrier','electronic warfare'],notes:'The EA-18G Growler — the U.S. Navy\'s carrier-based electronic-attack jet, derived from the F/A-18F Super Hornet.',sightings:[]},
  {id:111,category:'military',airline:'Royal Air Force',tail:'XX219',type:'BAE Hawk T1',era:'2010s',livery:'Red Arrows',colors:['#E1001A','#FFFFFF','#1B3A8B'],tags:['display','red arrows','iconic','rare'],notes:'The Red Arrows — the RAF Aerobatic Team — fly the BAE Hawk T1 in their famous red display livery. A prized airshow catch.',sightings:[]},
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
  16:{by:'Lewis Rowland',link:'https://www.planespotters.net/photo/1481199/g-civb-british-airways-boeing-747-436'},
  17:{by:'Lewis Zhao',link:'https://www.planespotters.net/photo/1933782/g-xlea-british-airways-airbus-a380-841'},
  18:{by:'Simone Bertarini',link:'https://www.planespotters.net/photo/1921129/d-abya-lufthansa-boeing-747-830'},
  19:{by:'Martin Nimmervoll',link:'https://www.planespotters.net/photo/1898163/d-aima-lufthansa-airbus-a380-841'},
  20:{by:'Hector A Rivera Valentin -HR Planespotter',link:'https://www.planespotters.net/photo/1055259/f-hpja-air-france-airbus-a380-861'},
  21:{by:'Toni Marimon',link:'https://www.planespotters.net/photo/1917242/f-gznt-air-france-boeing-777-328er'},
  23:{by:'Aldo Martinelli',link:'https://www.planespotters.net/photo/1930074/ph-bva-klm-royal-dutch-airlines-boeing-777-306er'},
  24:{by:'Jason D’Adamo',link:'https://www.planespotters.net/photo/1923488/vh-oqa-qantas-airbus-a380-842'},
  25:{by:'Gerald Lee',link:'https://www.planespotters.net/photo/784944/9v-ska-singapore-airlines-airbus-a380-841'},
  26:{by:'Luo Chun Hui',link:'https://www.planespotters.net/photo/916542/b-kpb-cathay-pacific-boeing-777-367er'},
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
  45:{by:'mySpotter2747',link:'https://www.planespotters.net/photo/1353316/9m-mnb-malaysia-airlines-airbus-a380-841'},
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
  66:{by:'Clemens Hager',link:'https://www.planespotters.net/photo/1927325/tf-fia-icelandair-boeing-757-256-wl'},
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
const SEED_VERSION = 14;
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
