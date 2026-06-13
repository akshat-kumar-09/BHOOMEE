import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════════════════
   JANE — 33 cities, researched and ranked by need.
   Score out of 333 = Earth (111) + People (111) + Momentum (111)
   Lower score = more urgent. These 33 are picked not as the worst,
   but as the most SOLVABLE — civic mechanisms exist, people can act.
═══════════════════════════════════════════════════════════════════ */

const USER_CITY = "glasgow"; // detected location

const CITIES = [
  {
    id: "mumbai", name: "Mumbai", country: "India", region: "South Asia",
    score: { earth: 22, people: 24, momentum: 32, total: 78 }, direction: "declining",
    headline: "The Mithi River is an open sewer. The mangroves that shield the city are being built over.",
    briefing: "Mumbai has India's fiercest environmental lawyers and its most relentless construction lobby. Both are right here. The mangroves are the city's flood wall — and they're vanishing one permit at a time.",
    pipelines: [
      { id: "mithi", title: "Defend the mangroves", subtitle: "The city's natural flood barrier, disappearing.", icon: "🌿", color: "#2D6B22", peopleActive: 31, steps: [
        { action: "Photograph mangrove encroachment", detail: "Walk the coastline near Mahim or Versova. Photograph any construction, dumping, or clearing in mangrove zones. GPS-tag it.", time: "30 min", peopleNeeded: 40, peopleDone: 18, jane: "Every photo with a timestamp and coordinate is admissible. You're building a case file, not a scrapbook." },
        { action: "File a complaint with the Mangrove Cell", detail: "Maharashtra has a dedicated Mangrove Cell. Jane gives you the form and the email. Attach your photos.", time: "10 min", peopleNeeded: 30, peopleDone: 6, jane: "It exists because activists forced it into existence. Use what they built." },
        { action: "Tag the National Green Tribunal", detail: "The NGT has ordered mangrove protection before. A coordinated social campaign with evidence gets cases reopened.", time: "10 min", peopleNeeded: 100, peopleDone: 4, jane: "India's courts have teeth on environment. The bottleneck is getting cases in front of them." },
      ]},
    ],
  },
  {
    id: "jakarta", name: "Jakarta", country: "Indonesia", region: "Southeast Asia",
    score: { earth: 24, people: 28, momentum: 33, total: 85 }, direction: "declining",
    headline: "The city is sinking faster than any on Earth. The air ranks among the world's worst.",
    briefing: "Jakarta is sinking up to 25cm a year as groundwater is pumped out. The government is literally moving the capital. But 10 million people stay — and the rivers can still be saved.",
    pipelines: [
      { id: "ciliwung", title: "Reclaim the Ciliwung River", subtitle: "Choked with plastic, the city's main river still flows.", icon: "💧", color: "#1E5F8C", peopleActive: 22, steps: [
        { action: "Join a river cleanup", detail: "Community groups run weekend cleanups on the Ciliwung. Jane connects you. Bring gloves, leave with data on what you pulled out.", time: "3 hrs", peopleNeeded: 50, peopleDone: 22, jane: "The waste you collect gets weighed and logged. That weight becomes the argument for upstream action." },
        { action: "Document a plastic source", detail: "Trace the trash upstream. Find where it enters the river — a market, a factory drain, an informal dump. Photograph it.", time: "45 min", peopleNeeded: 30, peopleDone: 8, jane: "Cleaning the river is mopping the floor with the tap running. Finding the tap is the real win." },
      ]},
    ],
  },
  {
    id: "mexico-city", name: "Mexico City", country: "Mexico", region: "Latin America",
    score: { earth: 28, people: 31, momentum: 33, total: 92 }, direction: "stalling",
    headline: "A city built on a drained lake is running out of water while sinking into the ground.",
    briefing: "Mexico City pumps water from an aquifer faster than rain can refill it, so the ground sinks — cracking pipes, losing 40% of water to leaks. The lake it was built on could be its salvation.",
    pipelines: [
      { id: "agua", title: "Stop the water leaks", subtitle: "40% of the city's water is lost before it reaches a tap.", icon: "💧", color: "#1E5F8C", peopleActive: 18, steps: [
        { action: "Report a visible leak", detail: "Burst pipes and street flooding are everywhere. Photograph, locate, report to SACMEX. Jane logs it to build the map.", time: "5 min", peopleNeeded: 100, peopleDone: 18, jane: "Four out of ten litres never arrive. Each leak you report is water a family doesn't get." },
        { action: "Install a rain capture point", detail: "Jane connects you to Isla Urbana, who install rainwater systems. Host one, or fund one for a household in Iztapalapa.", time: "varies", peopleNeeded: 25, peopleDone: 5, jane: "The city sits under a rainy season it wastes entirely. Catching it is the oldest technology there is." },
      ]},
    ],
  },
  {
    id: "bangkok", name: "Bangkok", country: "Thailand", region: "Southeast Asia",
    score: { earth: 30, people: 33, momentum: 35, total: 98 }, direction: "stalling",
    headline: "Seasonal smog closes schools. The canals that named the 'Venice of the East' run black.",
    briefing: "Bangkok's PM2.5 season turns the sky grey and empties the schools. The old canal network — the khlongs — could move water and cool the city, if they weren't treated as drains.",
    pipelines: [
      { id: "khlong", title: "Revive the khlongs", subtitle: "The historic canals, now treated as sewers.", icon: "🌿", color: "#2D6B22", peopleActive: 14, steps: [
        { action: "Map a polluted khlong", detail: "Pick a canal near you. Photograph the worst pollution points and any direct waste pipes. GPS-tag everything.", time: "30 min", peopleNeeded: 40, peopleDone: 14, jane: "These canals once carried boats and breeze. They can again. First, we map the wounds." },
        { action: "Report illegal discharge", detail: "Direct sewage pipes into khlongs are illegal but common. Report them to the BMA with your photo evidence.", time: "10 min", peopleNeeded: 30, peopleDone: 3, jane: "The law is already on your side here. It's just not being read aloud. Be the one who reads it." },
      ]},
    ],
  },
  {
    id: "athens", name: "Athens", country: "Greece", region: "Europe",
    score: { earth: 32, people: 36, momentum: 37, total: 105 }, direction: "declining",
    headline: "Record heat, drought, and wildfire. The hottest European capital is getting hotter.",
    briefing: "Athens appointed Europe's first Chief Heat Officer because summers now kill. The ancient city has little shade and less water. But it's also acting faster than most — pocket parks, cool routes, tree corridors.",
    pipelines: [
      { id: "cool", title: "Cool the neighbourhoods", subtitle: "Athens is the hottest capital in Europe. Shade is survival.", icon: "🌡️", color: "#8A5F1A", peopleActive: 16, steps: [
        { action: "Map the shadeless streets", detail: "Walk your neighbourhood at midday. Photograph streets with no tree cover, no shade, exposed asphalt. These are the heat traps.", time: "20 min", peopleNeeded: 50, peopleDone: 16, jane: "The Chief Heat Officer needs to know where people are baking. Your walk is her data." },
        { action: "Propose a pocket park", detail: "Athens is converting tiny vacant lots into green refuges. Identify one near you. Jane shows you how to nominate it.", time: "30 min", peopleNeeded: 20, peopleDone: 4, jane: "A space the size of two parking spots can drop the local temperature by degrees. Find the gap." },
      ]},
    ],
  },
  {
    id: "tel-aviv", name: "Tel Aviv", country: "Israel", region: "Middle East",
    score: { earth: 34, people: 40, momentum: 37, total: 111 }, direction: "stalling",
    headline: "A coast of jellyfish blooms and sewage spills, in a country that mastered water but not its sea.",
    briefing: "Israel recycles 90% of its wastewater — a world record — yet the Mediterranean coast still takes spills and plastic. The Yarkon River was once dead. It's been clawed back to life. That playbook works.",
    pipelines: [
      { id: "yarkon", title: "Protect the Yarkon's comeback", subtitle: "A river brought back from the dead, still fragile.", icon: "💧", color: "#1E5F8C", peopleActive: 12, steps: [
        { action: "Survey the riverbank", detail: "Walk the Yarkon. Note pollution, invasive plants, or dumping. The recovery is real but reversible. Log what you see.", time: "30 min", peopleNeeded: 30, peopleDone: 12, jane: "This river was a punchline for decades. Now fish are back. Don't let it slide again on your watch." },
        { action: "Report a coastal spill", detail: "If you see oil, sewage, or a fish die-off on the coast, photograph and report to the Environmental Protection Ministry.", time: "10 min", peopleNeeded: 40, peopleDone: 3, jane: "The sea can't file a complaint. You can." },
      ]},
    ],
  },
  {
    id: "naples", name: "Naples", country: "Italy", region: "Europe",
    score: { earth: 36, people: 38, momentum: 42, total: 116 }, direction: "stalling",
    headline: "Decades of waste mismanagement poisoned the 'Land of Fires'. The bay is paying too.",
    briefing: "Naples carries the scars of the waste crisis — illegal dumping, burning, contaminated land. But citizen monitoring forced it into the open, and the Bay of Naples is still one of the Mediterranean's treasures.",
    pipelines: [
      { id: "fires", title: "Document the Land of Fires", subtitle: "Illegal waste dumping and burning, still happening.", icon: "🔥", color: "#A83A2A", peopleActive: 19, steps: [
        { action: "Report an illegal dump", detail: "Spot fly-tipping or burning? Photograph from a safe distance, GPS-tag, report to the Carabinieri environmental unit.", time: "10 min", peopleNeeded: 40, peopleDone: 19, jane: "Citizen reports cracked this open once before. The cameras in your pocket are the deterrent the land never had." },
        { action: "Join an air monitoring network", detail: "Community groups run low-cost air sensors. Host one. The data has stood up in court.", time: "varies", peopleNeeded: 25, peopleDone: 5, jane: "When citizens measured the air themselves, the official denials stopped working." },
      ]},
    ],
  },
  {
    id: "cape-town", name: "Cape Town", country: "South Africa", region: "Africa",
    score: { earth: 40, people: 42, momentum: 40, total: 122 }, direction: "stalling",
    headline: "The city that nearly hit 'Day Zero' — the day the taps run dry — still lives on the edge.",
    briefing: "Cape Town stared down Day Zero in 2018 and pulled back through sheer collective behaviour change. That muscle memory is the city's superpower. The unique fynbos ecosystem and the rivers need it now.",
    pipelines: [
      { id: "rivers", title: "Clean the urban rivers", subtitle: "The Black, Liesbeek and Salt rivers carry the city's pollution to sea.", icon: "💧", color: "#1E5F8C", peopleActive: 15, steps: [
        { action: "Join a river warrior cleanup", detail: "Groups run cleanups on the Liesbeek and Black rivers. Jane connects you. Log what comes out.", time: "3 hrs", peopleNeeded: 40, peopleDone: 15, jane: "This city moved as one to beat Day Zero. The rivers are the next thing worth moving for." },
        { action: "Clear invasive alien plants", detail: "Invasive species drink the water fynbos and rivers need. Volunteer hack groups remove them. Powerful, physical, effective.", time: "4 hrs", peopleNeeded: 30, peopleDone: 6, jane: "Pulling invasive pines literally returns water to the catchment. You can measure it in litres." },
      ]},
    ],
  },
  {
    id: "madrid", name: "Madrid", country: "Spain", region: "Europe",
    score: { earth: 42, people: 44, momentum: 41, total: 127 }, direction: "stalling",
    headline: "Drought tightens its grip while summer heat in the city core turns lethal.",
    briefing: "Madrid built a car-free urban heart and a 75km forest ring — bold moves. But Spain's drought is structural now, and the heat island in the centre still bakes the people with the least.",
    pipelines: [
      { id: "bosque", title: "Grow the Metropolitan Forest", subtitle: "A 75km green ring planned around the city. It needs hands.", icon: "🌿", color: "#2D6B22", peopleActive: 13, steps: [
        { action: "Join a planting day", detail: "The Bosque Metropolitano needs volunteers for planting seasons. Jane tells you when and where.", time: "4 hrs", peopleNeeded: 50, peopleDone: 13, jane: "A 75-kilometre forest ring around a capital. You can plant a tree that your grandchildren will picnic under." },
        { action: "Adopt a tree pit", detail: "Empty tree pits across the city centre could be filled. Identify and report them to the Ayuntamiento.", time: "15 min", peopleNeeded: 30, peopleDone: 4, jane: "Every empty pit is a tree the city already planned for and forgot. Remind them." },
      ]},
    ],
  },
  {
    id: "london", name: "London", country: "England", region: "Europe",
    score: { earth: 34, people: 62, momentum: 35, total: 131 }, direction: "stalling",
    headline: "Not one of London's 600km of rivers meets good ecological status. Not one.",
    briefing: "London has the richest civic infrastructure for action of almost any city — Thames21, River Action, dozens of Friends groups. The people are ready. The momentum is stalled by a near-bankrupt water company and Victorian pipes.",
    pipelines: [
      { id: "thames-tribs", title: "Adopt a river", subtitle: "Zero London rivers at good status. The Wandle, Lea, Crane all in crisis.", icon: "💧", color: "#1E5F8C", peopleActive: 41, steps: [
        { action: "Find your nearest river", detail: "Most Londoners live within a mile of a river. The Wandle, Lea, Brent, Crane. Jane tells you which. Go look at it.", time: "20 min", peopleNeeded: 200, peopleDone: 41, jane: "There are rivers under your feet the Victorians buried. The ones still above ground need witnesses." },
        { action: "Join Thames21 water testing", detail: "They provide the kit. You sample your river. Submit the data. Your reading becomes part of the case.", time: "30 min", peopleNeeded: 100, peopleDone: 28, jane: "When 100 people test the same river, it stops being an anecdote and becomes a dataset." },
        { action: "File an FOI to Thames Water", detail: "Request discharge data for the overflow nearest you. Jane fills the template. They have 20 working days.", time: "8 min", peopleNeeded: 50, peopleDone: 7, jane: "Thames Water is in crisis. Their data is public record. Right now nobody's asking for it." },
        { action: "Submit evidence to the London Assembly", detail: "The Environment Committee is investigating swimmable rivers now. They accept public submissions.", time: "15 min", peopleNeeded: 30, peopleDone: 2, jane: "They held hearings in February. The next round needs your data, not your opinion." },
      ]},
      { id: "london-air", title: "Clean the air around schools", subtitle: "PM2.5 at 2.4× WHO limits. The poorest kids breathe the worst.", icon: "🫁", color: "#8A3A5A", peopleActive: 19, steps: [
        { action: "Check air quality at your nearest school", detail: "Open IQAir. Stand outside a school at 8:30am. Screenshot the reading. That's what children breathe.", time: "5 min", peopleNeeded: 100, peopleDone: 19, jane: "Parliament launched an air inquiry in 2026 and asked the public for evidence. This is evidence." },
        { action: "Petition for a School Street", detail: "A traffic-restricted zone at drop-off. 15 parents' signatures triggers council review. Jane gives you the wording.", time: "20 min", peopleNeeded: 50, peopleDone: 4, jane: "Fifteen signatures. Not fifteen thousand. Fifteen parents who agree kids shouldn't breathe exhaust at 8am." },
      ]},
    ],
  },
  {
    id: "rome", name: "Rome", country: "Italy", region: "Europe",
    score: { earth: 38, people: 48, momentum: 47, total: 133 }, direction: "stalling",
    headline: "The Tiber runs thick with plastic past monuments, while summers grow unbearable.",
    briefing: "Rome treats the Tiber as scenery, not a living river. Plastic gathers at its bends. But the city has Europe's deepest reservoir of civic pride — turn that toward the river and it moves.",
    pipelines: [
      { id: "tevere", title: "Reclaim the Tiber", subtitle: "The river of an empire, now a plastic conveyor belt.", icon: "💧", color: "#1E5F8C", peopleActive: 11, steps: [
        { action: "Document plastic accumulation", detail: "Walk the Tiber banks. Photograph where plastic gathers — bends, bridges, drains. Map the hotspots.", time: "30 min", peopleNeeded: 40, peopleDone: 11, jane: "The river carried Rome for three thousand years. The least we can do is see what it's carrying now." },
        { action: "Join a riverbank cleanup", detail: "Tevere Day and local groups organise cleanups. Jane connects you. The hauls are documented and weighed.", time: "3 hrs", peopleNeeded: 30, peopleDone: 5, jane: "Romans cleaned this river for an emperor's triumph once. Do it for the eels that still live in it." },
      ]},
    ],
  },
  {
    id: "marseille", name: "Marseille", country: "France", region: "Europe",
    score: { earth: 40, people: 46, momentum: 51, total: 137 }, direction: "rising",
    headline: "Mediterranean heat and sea pollution meet France's most unequal access to green space.",
    briefing: "Marseille has the Calanques — a national park inside the city — and some of France's worst urban heat in its northern districts. The gap between the two is the work.",
    pipelines: [
      { id: "calanques", title: "Protect the Calanques", subtitle: "A national park at the city's edge, loved to near death.", icon: "🌊", color: "#1E5F8C", peopleActive: 17, steps: [
        { action: "Report pollution or damage", detail: "Spot anchoring on seagrass, litter, or erosion in the Calanques? Report to the park authority with photos.", time: "10 min", peopleNeeded: 40, peopleDone: 17, jane: "Posidonia seagrass stores carbon for a thousand years. One careless anchor undoes centuries. Watch for it." },
        { action: "Green a northern district", detail: "The quartiers nord have the least shade and the most heat. Join or start a planting initiative there.", time: "varies", peopleNeeded: 30, peopleDone: 6, jane: "The postcard south has the park. The north has the heat. Equity is planting where it's hottest." },
      ]},
    ],
  },
  {
    id: "birmingham", name: "Birmingham", country: "England", region: "Europe",
    score: { earth: 44, people: 50, momentum: 47, total: 141 }, direction: "stalling",
    headline: "More canals than Venice, mostly forgotten, in a city fighting its air quality.",
    briefing: "Birmingham has 35 miles of canals — more than Venice — running like green-blue threads through the city. Most are underused and polluted. The Clean Air Zone is a start, but the canals are the sleeping asset.",
    pipelines: [
      { id: "canals", title: "Wake the canals", subtitle: "35 miles of waterway, more than Venice, mostly ignored.", icon: "💧", color: "#1E5F8C", peopleActive: 9, steps: [
        { action: "Survey a canal stretch", detail: "Walk a section of the canal network. Photograph litter, pollution, and overgrown access points.", time: "30 min", peopleNeeded: 40, peopleDone: 9, jane: "Venice gets the tourists. Birmingham has more canal and no one looking. That's an opportunity, not an insult." },
        { action: "Join a canal cleanup", detail: "Canal & River Trust runs volunteer days. Jane connects you. They pull shopping trolleys, plastic, the lot.", time: "3 hrs", peopleNeeded: 30, peopleDone: 4, jane: "A cleared canal is a wildlife corridor, a cool route, and a walking path. Three wins, one Saturday." },
      ]},
    ],
  },
  {
    id: "manchester", name: "Manchester", country: "England", region: "Europe",
    score: { earth: 46, people: 52, momentum: 47, total: 145 }, direction: "stalling",
    headline: "The birthplace of the industrial revolution still breathes its legacy in the air.",
    briefing: "Manchester's rivers — the Irwell, the Medlock — carried the filth of the first industrial age. They're cleaner now but still struggling. The city has bold transport plans; the waterways are catching up.",
    pipelines: [
      { id: "irwell", title: "Restore the Irwell", subtitle: "The river that powered the industrial revolution, recovering.", icon: "💧", color: "#1E5F8C", peopleActive: 10, steps: [
        { action: "Walk and document the Irwell", detail: "Photograph pollution, outfalls, and litter along the river. The recovery is real but uneven. Log the gaps.", time: "30 min", peopleNeeded: 40, peopleDone: 10, jane: "This river ran black with the world's first factories. It's clawing back. Document the comeback." },
        { action: "Report a pollution incident", detail: "Discoloured water, foam, dead fish? Report to the Environment Agency hotline. Log it with Jane too.", time: "5 min", peopleNeeded: 30, peopleDone: 4, jane: "The first industrial river deserves to be the first one fully reborn. Be the eyes." },
      ]},
    ],
  },
  {
    id: "warsaw", name: "Warsaw", country: "Poland", region: "Europe",
    score: { earth: 42, people: 50, momentum: 55, total: 147 }, direction: "rising",
    headline: "Coal-fired winter smog blankets the city, but the wild Vistula runs through its heart.",
    briefing: "Warsaw has one of Europe's last wild urban rivers — the Vistula, with sandy beaches inside the city. It also has winter smog from coal heating. The contrast is the city's story: wildness and soot, side by side.",
    pipelines: [
      { id: "smog", title: "Map the winter smog", subtitle: "Coal heating chokes the city every winter.", icon: "🫁", color: "#8A3A5A", peopleActive: 14, steps: [
        { action: "Log air quality readings", detail: "Use the government's air app or a sensor. Log readings on cold still days. Build the seasonal picture.", time: "5 min", peopleNeeded: 60, peopleDone: 14, jane: "The smog comes from old coal stoves — 'kopciuchy'. Replacement grants exist. The map shows where they're needed most." },
        { action: "Report an illegal coal burner", detail: "Burning waste or banned coal is illegal. The Straż Miejska investigates reports. Jane shows you how.", time: "10 min", peopleNeeded: 30, peopleDone: 5, jane: "One bad stove can foul a whole street. Reporting it is neighbourly, not nosy." },
      ]},
    ],
  },
  {
    id: "glasgow", name: "Glasgow", country: "Scotland", region: "Europe",
    score: { earth: 52, people: 38, momentum: 58, total: 148 }, direction: "rising",
    headline: "97% of Scotland's sewage overflows are unmonitored. The Clyde is improving anyway.",
    briefing: "The Clyde ran brown for 200 years. It's been running clearer for 6. Glasgow has real momentum — £50m in blue-green infrastructure, burns being daylighted, a swimmable Clyde campaign. What's missing is people who know it's happening. That's where you come in.",
    pipelines: [
      { id: "clyde-sewage", title: "Make the Clyde swimmable", subtitle: "97% of sewage overflows are unmonitored. Let's fix that.", icon: "💧", color: "#1E5F8C", peopleActive: 23, steps: [
        { action: "Call SEPA's pollution hotline", detail: "Next time you walk by the Clyde and something smells off — 0800 80 70 60. Log it. 3 minutes. Your call becomes data.", time: "3 min", peopleNeeded: 50, peopleDone: 14, jane: "One call doesn't feel like much. Fifty calls in one month is a pattern SEPA can't file away." },
        { action: "Photograph an overflow pipe", detail: "Dozens line the Clyde, unmonitored. Walk the riverbank. See a pipe, snap it, GPS-tag it, upload to Jane.", time: "15 min", peopleNeeded: 30, peopleDone: 14, jane: "Scottish Water has 3,617 overflow pipes and monitors 123. You're building the map they won't." },
        { action: "Send one FOI to Scottish Water", detail: "Ask for discharge data at your nearest overflow. Jane fills the template — add your postcode, hit send.", time: "8 min", peopleNeeded: 20, peopleDone: 3, jane: "FOI requests are free, legal, and they must answer in 20 days. The pen is mightier." },
        { action: "Share the swimmable Clyde story", detail: "Post one reel. Film the river. Say one true thing. Tag @swimmableclyde. That's it.", time: "10 min", peopleNeeded: 100, peopleDone: 6, jane: "Paris made the Seine swimmable for the Olympics. Glasgow's round table started February 2026. Be early. Be loud." },
        { action: "Show up at the council water committee", detail: "Jane notifies you when it's scheduled. You sit. You listen. Speak for 2 minutes if you want. Mostly, you're counted.", time: "2 hrs", peopleNeeded: 15, peopleDone: 0, jane: "Councils count the room. 15 people sitting silently changes a vote. You don't even have to speak." },
      ]},
      { id: "kelvin-invasives", title: "Clear the Kelvin of invasives", subtitle: "Giant Hogweed burns skin. Knotweed cracks concrete. Both spreading.", icon: "🌿", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "Spot and tag invasive species", detail: "Walk the Kelvin. Hogweed: tall, white flowers. Knotweed: heart leaves, bamboo stems. Balsam: pink flowers. Photograph, GPS-tag, submit.", time: "30 min", peopleNeeded: 20, peopleDone: 8, jane: "You're a field scientist now. Glasgow City Council genuinely uses this data." },
        { action: "Join a Balsam bash", detail: "Himalayan Balsam pulls out by hand before it seeds (June–Oct). Jane organises the group. You bring gloves.", time: "3 hrs", peopleNeeded: 12, peopleDone: 0, jane: "Twelve people on one Saturday clear a kilometre of riverbank. That's not a metaphor. That's the maths." },
      ]},
      { id: "glasgow-flooding", title: "Map the flood risk", subtitle: "15 families evacuated in Drumchapel 2021. Drainage flagged, never fixed.", icon: "🌊", color: "#8A5F1A", peopleActive: 5, steps: [
        { action: "Walk your area after heavy rain", detail: "Photograph pooling water, overwhelmed drains, flooded paths. GPS-tag everything. Jane builds the map.", time: "20 min", peopleNeeded: 40, peopleDone: 5, jane: "Glasgow's rivers can rise 6 metres in 12 hours. Your street-level data is what flood models miss." },
        { action: "Report blocked drains on FixMyStreet", detail: "Go to fixmystreet.com. Drop a pin. Describe it. Upload your photo. The council must log it.", time: "5 min", peopleNeeded: 30, peopleDone: 11, jane: "One report gets filed. Thirty in the same ward get a councillor's attention." },
      ]},
    ],
  },
  {
    id: "lisbon", name: "Lisbon", country: "Portugal", region: "Europe",
    score: { earth: 50, people: 51, momentum: 52, total: 153 }, direction: "rising",
    headline: "Rising seas threaten the waterfront while the Tagus estuary's birdlife hangs on.",
    briefing: "Lisbon was European Green Capital and it shows — but the Tagus estuary, one of Europe's great wetlands, sits beside a growing city. The flamingos and the development are negotiating, and the wetland needs an advocate.",
    pipelines: [
      { id: "tejo", title: "Guard the Tagus estuary", subtitle: "One of Europe's great wetlands, beside a growing city.", icon: "🌊", color: "#1E5F8C", peopleActive: 13, steps: [
        { action: "Join a bird census", detail: "The estuary hosts flamingos and tens of thousands of waders. Citizen counts track its health. Jane connects you.", time: "3 hrs", peopleNeeded: 30, peopleDone: 13, jane: "You can stand inside a European capital and count flamingos. Few cities can say that. Help keep it true." },
        { action: "Report estuary pollution", detail: "Spot dumping, oil, or illegal construction at the water's edge? Photograph and report to ICNF.", time: "10 min", peopleNeeded: 25, peopleDone: 4, jane: "The wetland filters the water and feeds the birds. Anything dumped here travels the whole food chain." },
      ]},
    ],
  },
  {
    id: "sydney", name: "Sydney", country: "Australia", region: "Oceania",
    score: { earth: 54, people: 53, momentum: 51, total: 158 }, direction: "stalling",
    headline: "Bushfire smoke, bleaching reefs offshore, and stormwater fouling the famous harbour beaches.",
    briefing: "Sydney's beaches close after rain as stormwater carries the city into the sea. The harbour is iconic and fragile. Australians know fire and drought now in their bones — that knowledge is ready to mobilise.",
    pipelines: [
      { id: "harbour", title: "Keep the beaches open", subtitle: "Stormwater closes Sydney's beaches after every big rain.", icon: "🌊", color: "#1E5F8C", peopleActive: 16, steps: [
        { action: "Log a beach pollution event", detail: "Beach closed or murky after rain? Note it, photograph it, submit to Jane. Build the rainfall-pollution pattern.", time: "5 min", peopleNeeded: 50, peopleDone: 16, jane: "Beachgoers notice closures but nobody connects the dots across the city. You're the dot-connector." },
        { action: "Adopt a stormwater drain", detail: "Drains marked with a fish flow straight to the sea. Keep yours clear of litter. Stencil it if it isn't marked.", time: "20 min", peopleNeeded: 40, peopleDone: 7, jane: "Whatever goes down that drain is on the beach by tomorrow. No filter. No treatment. Just the sea." },
      ]},
    ],
  },
  {
    id: "dublin", name: "Dublin", country: "Ireland", region: "Europe",
    score: { earth: 56, people: 54, momentum: 52, total: 162 }, direction: "rising",
    headline: "The Liffey and Dublin Bay carry the city's runoff into a UNESCO biosphere.",
    briefing: "Dublin Bay is a UNESCO biosphere — seals, seabirds, salt marsh — right beside the capital. The Liffey runs through the centre. Ireland's environmental awakening is recent but fierce, and the bay is the prize.",
    pipelines: [
      { id: "liffey", title: "Protect Dublin Bay", subtitle: "A UNESCO biosphere on the city's doorstep.", icon: "🌊", color: "#1E5F8C", peopleActive: 12, steps: [
        { action: "Join a bay cleanup", detail: "Groups clean Bull Island and the bay shores. Jane connects you. The hauls are sorted and recorded.", time: "3 hrs", peopleNeeded: 40, peopleDone: 12, jane: "A biosphere reserve beside a capital city is rare. Dublin has one and half the city's never visited. Go." },
        { action: "Report a Liffey pollution incident", detail: "Discolouration, foam, dead fish in the Liffey or its streams? Report to the council and the EPA.", time: "5 min", peopleNeeded: 30, peopleDone: 4, jane: "The Liffey ends in the biosphere. What enters in the city arrives at the seals." },
      ]},
    ],
  },
  {
    id: "liverpool", name: "Liverpool", country: "England", region: "Europe",
    score: { earth: 52, people: 56, momentum: 57, total: 165 }, direction: "rising",
    headline: "The Mersey, once 'an affront to decency', is now a recovery story still being written.",
    briefing: "The Mersey was declared one of the most polluted rivers in Europe. The cleanup brought back salmon and porpoises. It's a genuine success — and exactly the kind of momentum Jane exists to push further.",
    pipelines: [
      { id: "mersey", title: "Finish the Mersey's recovery", subtitle: "From 'an affront to decency' to porpoises. Keep going.", icon: "💧", color: "#1E5F8C", peopleActive: 14, steps: [
        { action: "Survey the riverbank", detail: "Walk the Mersey. Photograph remaining pollution, litter traps, and outfalls. The recovery isn't finished.", time: "30 min", peopleNeeded: 40, peopleDone: 14, jane: "Porpoises came back to a river that was a sewer. That's what's possible. Now finish the job." },
        { action: "Join a beach and river clean", detail: "Groups clean the Mersey shore and Crosby beach. Jane connects you. Famous for the Gormley statues and the plastic.", time: "3 hrs", peopleNeeded: 30, peopleDone: 6, jane: "A hundred iron men stand in the sea at Crosby. Don't let them stand in plastic." },
      ]},
    ],
  },
  {
    id: "hamburg", name: "Hamburg", country: "Germany", region: "Europe",
    score: { earth: 56, people: 56, momentum: 56, total: 168 }, direction: "rising",
    headline: "Europe's third-largest port balances container ships against the tidal Elbe's ecology.",
    briefing: "Hamburg is a port city threaded with water — canals, the Elbe, the Alster lakes. It's green-minded and wealthy, but the working harbour and the river ecology are in constant negotiation.",
    pipelines: [
      { id: "elbe", title: "Balance the Elbe", subtitle: "A working port and a tidal river ecosystem, sharing one channel.", icon: "🌊", color: "#1E5F8C", peopleActive: 11, steps: [
        { action: "Monitor the tidal mudflats", detail: "The Elbe's mudflats feed migratory birds. Join citizen monitoring to track their health against dredging pressure.", time: "2 hrs", peopleNeeded: 30, peopleDone: 11, jane: "The port pays the bills; the mudflats feed the birds. Good cities hold both. Help hold the line." },
        { action: "Report water pollution", detail: "Oil sheen, foam, or discharge in the canals or harbour? Photograph and report to the environmental authority.", time: "10 min", peopleNeeded: 25, peopleDone: 4, jane: "A city this rich has no excuse for a dirty canal. Point at the ones that are." },
      ]},
    ],
  },
  {
    id: "brussels", name: "Brussels", country: "Belgium", region: "Europe",
    score: { earth: 58, people: 58, momentum: 56, total: 172 }, direction: "rising",
    headline: "The Senne river was buried under the city; its tributaries fight for daylight.",
    briefing: "Brussels literally buried its river — the Senne runs under the city. Now there's a movement to bring waterways back to the surface. The capital of Europe is rethinking its relationship with water.",
    pipelines: [
      { id: "senne", title: "Daylight the waterways", subtitle: "The Senne was buried. Its tributaries want out.", icon: "💧", color: "#1E5F8C", peopleActive: 9, steps: [
        { action: "Map the buried streams", detail: "Brussels has hidden watercourses under its streets. Citizen mapping projects trace them. Jane connects you.", time: "varies", peopleNeeded: 30, peopleDone: 9, jane: "A city that buries its rivers forgets it has them. Mapping them is the first act of remembering." },
        { action: "Support a daylighting project", detail: "Local efforts aim to reopen sections of stream to the surface. Add your voice to the next proposal.", time: "15 min", peopleNeeded: 25, peopleDone: 3, jane: "Bringing a stream back to daylight cools the city, holds floodwater, and gives kids a frog to find. Triple win." },
      ]},
    ],
  },
  {
    id: "barcelona", name: "Barcelona", country: "Spain", region: "Europe",
    score: { earth: 60, people: 60, momentum: 57, total: 177 }, direction: "rising",
    headline: "Drought and mass tourism strain a city pioneering 'superblocks' of car-free space.",
    briefing: "Barcelona's superblocks — reclaiming streets from cars for people and trees — are studied worldwide. But drought is biting and tourism strains everything. The model is bold; the pressure is real.",
    pipelines: [
      { id: "superblocks", title: "Grow the superblocks", subtitle: "Car-free blocks reclaimed for people and trees. More, please.", icon: "🌿", color: "#2D6B22", peopleActive: 15, steps: [
        { action: "Nominate a street for greening", detail: "Identify a street that could become a superblock or green axis. Photograph it. Jane shows you how to propose it.", time: "20 min", peopleNeeded: 40, peopleDone: 15, jane: "Each superblock drops local pollution and temperature measurably. The city wants more. Point at the next one." },
        { action: "Report a dry or dying street tree", detail: "Drought is killing street trees. Report struggling ones so they're watered or replaced before they're lost.", time: "5 min", peopleNeeded: 30, peopleDone: 5, jane: "A mature street tree is decades of cooling. Losing one to a missed watering is a slow tragedy. Flag it." },
      ]},
    ],
  },
  {
    id: "paris", name: "Paris", country: "France", region: "Europe",
    score: { earth: 60, people: 64, momentum: 58, total: 182 }, direction: "rising",
    headline: "The Seine is swimmable again for the first time in a century. The work continues.",
    briefing: "Paris spent €1.4bn to make the Seine swimmable for the Olympics — and it worked. The proof that a dead urban river can return is now standing in the middle of Europe. Paris is the case study Jane points everyone toward.",
    pipelines: [
      { id: "seine", title: "Keep the Seine swimmable", subtitle: "A century of 'no swimming', reversed. Don't let it slip.", icon: "🌊", color: "#1E5F8C", peopleActive: 18, steps: [
        { action: "Monitor a swimming site", detail: "The new public swimming spots need water-quality vigilance. Citizen monitoring keeps the pressure on after the cameras left.", time: "30 min", peopleNeeded: 40, peopleDone: 18, jane: "The world watched Paris swim the Seine. The world stopped watching. That's exactly when rivers slide back. Don't." },
        { action: "Report a misconnected drain", detail: "The €1.4bn fix relied on stopping wrong connections. New ones appear. Report suspected ones to Eau de Paris.", time: "10 min", peopleNeeded: 30, peopleDone: 5, jane: "They spent over a billion euros to disconnect the wrong pipes. One new bad connection insults all of it." },
      ]},
    ],
  },
  {
    id: "berlin", name: "Berlin", country: "Germany", region: "Europe",
    score: { earth: 62, people: 64, momentum: 60, total: 186 }, direction: "rising",
    headline: "Lakes, the Spree, and Europe's wildest urban green — under pressure from drought and growth.",
    briefing: "Berlin is astonishingly green — lakes you can swim in, forests inside the city, the Spree running through. But the region is one of Germany's driest and the groundwater is dropping. The wildness needs defending.",
    pipelines: [
      { id: "spree", title: "Protect the Spree and lakes", subtitle: "Swimmable lakes and a city river, threatened by drought.", icon: "🌊", color: "#1E5F8C", peopleActive: 13, steps: [
        { action: "Join lake water monitoring", detail: "Berlin's bathing lakes need regular quality checks. Citizen science programmes track algae and clarity. Jane connects you.", time: "2 hrs", peopleNeeded: 30, peopleDone: 13, jane: "You can swim in a lake inside Berlin. Most capitals would kill for that. Measuring its health is how you keep it." },
        { action: "Report low water or pollution", detail: "Note unusually low water, fish die-offs, or pollution in the Spree or lakes. Build the drought record.", time: "10 min", peopleNeeded: 25, peopleDone: 4, jane: "The Spree is partly fed by water that won't exist when the coal mines close. This is a slow emergency. Watch it." },
      ]},
    ],
  },
  {
    id: "toronto", name: "Toronto", country: "Canada", region: "North America",
    score: { earth: 64, people: 64, momentum: 64, total: 192 }, direction: "rising",
    headline: "Lake Ontario's shoreline and the ravine network — a wild green web most cities can't imagine.",
    briefing: "Toronto sits on Lake Ontario and is laced with ravines — a hidden wilderness running through the city. The lake is the drinking water for millions. Both are in decent shape and worth keeping that way.",
    pipelines: [
      { id: "ravines", title: "Steward the ravines", subtitle: "A wild green network threading the whole city.", icon: "🌿", color: "#2D6B22", peopleActive: 17, steps: [
        { action: "Survey a ravine for invasives", detail: "Garlic mustard, dog-strangling vine and buckthorn choke the ravines. Map them on a walk. Jane logs the data.", time: "45 min", peopleNeeded: 40, peopleDone: 17, jane: "You have a wilderness running behind your houses. Most cities paved theirs. Toronto kept its. Tend it." },
        { action: "Join a ravine cleanup or planting", detail: "Groups restore native plants and clear trash from the ravines. Jane connects you to the next event.", time: "3 hrs", peopleNeeded: 30, peopleDone: 6, jane: "Native plantings in a ravine ripple out — birds, insects, cooler air downstream. Small patch, wide effect." },
      ]},
    ],
  },
  {
    id: "munich", name: "Munich", country: "Germany", region: "Europe",
    score: { earth: 66, people: 66, momentum: 66, total: 198 }, direction: "rising",
    headline: "The Isar river was freed from its concrete and now flows wild through the city — a model.",
    briefing: "Munich tore the concrete off the Isar and let it run wild again — people swim and surf in it downtown. It's one of Europe's great river restorations. The job now is protecting that win and spreading the lesson.",
    pipelines: [
      { id: "isar", title: "Guard the wild Isar", subtitle: "A river freed from concrete. Protect what was won.", icon: "🌊", color: "#1E5F8C", peopleActive: 12, steps: [
        { action: "Monitor the renaturalised banks", detail: "The restored Isar has gravel banks and braided channels. Track erosion, litter, and habitat. Jane connects you to the survey.", time: "1 hr", peopleNeeded: 30, peopleDone: 12, jane: "They surf a river wave in the middle of Munich. That's what de-paving a river gives you. Keep it wild." },
        { action: "Report litter or damage", detail: "Heavy summer use brings litter and bank damage. Report problem spots so they're managed before they degrade.", time: "5 min", peopleNeeded: 25, peopleDone: 3, jane: "A loved river gets trampled. Loving it well means pointing at the wear before it becomes a scar." },
      ]},
    ],
  },
  {
    id: "vienna", name: "Vienna", country: "Austria", region: "Europe",
    score: { earth: 68, people: 66, momentum: 65, total: 199 }, direction: "rising",
    headline: "Consistently the world's most liveable city — with a Danube island built for nature and people.",
    briefing: "Vienna routinely tops liveability rankings, with half the city green and the Danube island a 21km park. It's close to a model. Jane's role here is to keep raising the ceiling, not the floor.",
    pipelines: [
      { id: "danube", title: "Enrich the Danube island", subtitle: "A 21km park-island. Make it wilder, not just tidier.", icon: "🌿", color: "#2D6B22", peopleActive: 10, steps: [
        { action: "Map biodiversity on the island", detail: "Record species you see on the Donauinsel — birds, insects, plants. Citizen data shapes how it's managed.", time: "1 hr", peopleNeeded: 30, peopleDone: 10, jane: "A tidy park and a living one aren't the same thing. Your sightings push it toward living." },
        { action: "Advocate for wild zones", detail: "Support leaving sections of the island unmown and natural. Add your voice to management consultations.", time: "15 min", peopleNeeded: 25, peopleDone: 3, jane: "The bravest thing a perfect city can do is leave a corner messy on purpose. Ask for the mess." },
      ]},
    ],
  },
  {
    id: "stockholm", name: "Stockholm", country: "Sweden", region: "Europe",
    score: { earth: 70, people: 68, momentum: 65, total: 203 }, direction: "rising",
    headline: "Built on 14 islands in clean water you can swim and fish in from the city centre.",
    briefing: "Stockholm is a third water, a third green, a third city — and you can fish salmon and swim downtown. It's a global model. The Baltic Sea beyond it, though, is one of the most stressed seas on Earth.",
    pipelines: [
      { id: "baltic", title: "Defend the Baltic", subtitle: "Clean water in the city, a stressed sea beyond it.", icon: "🌊", color: "#1E5F8C", peopleActive: 11, steps: [
        { action: "Join a coastal eelgrass survey", detail: "Eelgrass meadows are the Baltic's nurseries and carbon stores. Citizen divers and snorkellers map them. Jane connects you.", time: "3 hrs", peopleNeeded: 30, peopleDone: 11, jane: "You can fish salmon from a bridge in Stockholm. That salmon was born in eelgrass. Protect the cradle." },
        { action: "Report algal blooms", detail: "The Baltic suffers severe summer blooms from farm runoff. Logging them feeds the regional monitoring picture.", time: "5 min", peopleNeeded: 25, peopleDone: 4, jane: "The blue water hides a green problem offshore. Your reports keep the dead zones on the radar." },
      ]},
    ],
  },
  {
    id: "copenhagen", name: "Copenhagen", country: "Denmark", region: "Europe",
    score: { earth: 72, people: 72, momentum: 60, total: 204 }, direction: "rising",
    headline: "A harbour so clean the whole city swims in it — the global benchmark for urban water.",
    briefing: "Copenhagen cleaned its harbour so thoroughly that people swim in the city centre. It's the proof-of-concept the whole world cites. The next frontier is cloudbursts — the intense rain that overwhelms even great cities.",
    pipelines: [
      { id: "cloudburst", title: "Cloudburst-proof the streets", subtitle: "Even the cleanest city floods when the rain comes hard.", icon: "🌊", color: "#8A5F1A", peopleActive: 9, steps: [
        { action: "Map flood-prone spots", detail: "After heavy rain, photograph where water pools and overwhelms drains. The city's cloudburst plan needs ground truth.", time: "20 min", peopleNeeded: 30, peopleDone: 9, jane: "Copenhagen swims in its harbour and still floods in a cloudburst. Even paradise has a to-do list." },
        { action: "Support a green street proposal", detail: "The city converts streets into water-absorbing 'cloudburst boulevards'. Back the next one near you.", time: "15 min", peopleNeeded: 25, peopleDone: 3, jane: "A street that drinks the rain instead of drowning in it. They've built some. Ask for yours." },
      ]},
    ],
  },
  {
    id: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "Europe",
    score: { earth: 74, people: 72, momentum: 65, total: 211 }, direction: "rising",
    headline: "A city below sea level that turned water management into an art — and now, ecology.",
    briefing: "Amsterdam mastered holding back the sea centuries ago. The new challenge is making its canals and the IJ ecologically alive, not just navigable. A city this skilled at water can lead on water-as-habitat.",
    pipelines: [
      { id: "canals", title: "Bring the canals to life", subtitle: "Mastered for transport, now made into habitat.", icon: "💧", color: "#1E5F8C", peopleActive: 10, steps: [
        { action: "Join a canal fishing-for-litter trip", detail: "Plastic Whale and others run boat trips that pull plastic from the canals. You fish for trash. Jane connects you.", time: "2 hrs", peopleNeeded: 30, peopleDone: 10, jane: "You can spend an afternoon fishing plastic out of a 400-year-old canal from a boat made of it. Very Amsterdam." },
        { action: "Support floating nature", detail: "Floating gardens and underwater structures turn dead canal walls into habitat. Back the next install.", time: "15 min", peopleNeeded: 25, peopleDone: 3, jane: "A canal wall is a vertical desert. A few floating plants make it a reef. Cheap miracle." },
      ]},
    ],
  },
  {
    id: "zurich", name: "Zurich", country: "Switzerland", region: "Europe",
    score: { earth: 78, people: 74, momentum: 66, total: 218 }, direction: "rising",
    headline: "Drinking-water-clean lake and river running through the centre — a near-perfect baseline.",
    briefing: "Zurich's lake and the Limmat are clean enough to swim in everywhere, fed by Alpine water. It's about as good as urban nature gets. The work here is guarding the Alpine source as glaciers retreat.",
    pipelines: [
      { id: "limmat", title: "Guard the Alpine source", subtitle: "Glacier-fed clarity, threatened upstream by melt.", icon: "🌊", color: "#1E5F8C", peopleActive: 8, steps: [
        { action: "Monitor river temperature", detail: "Warming rivers stress fish even when clean. Citizen temperature logging tracks the Limmat's heat over summers.", time: "10 min", peopleNeeded: 30, peopleDone: 8, jane: "The water's crystal clear and slowly warming. Clarity hides the real threat. Measure the temperature, not the view." },
        { action: "Support glacier-region protection", detail: "The clean water starts in the mountains. Back catchment and glacier protection efforts upstream.", time: "15 min", peopleNeeded: 20, peopleDone: 3, jane: "Your tap is a glacier. As it retreats, so does the certainty. Defend the source, not just the faucet." },
      ]},
    ],
  },
  {
    id: "oslo", name: "Oslo", country: "Norway", region: "Europe",
    score: { earth: 82, people: 76, momentum: 73, total: 231 }, direction: "rising",
    headline: "Reopened rivers, a fjord turning swimmable, and forest covering two-thirds of the city.",
    briefing: "Oslo reopened buried rivers, is cleaning its fjord toward swimmable, and is two-thirds forest. It's arguably the highest-scoring city Jane tracks. Here, Jane is about pushing an already-great city to be the proof of what's possible.",
    pipelines: [
      { id: "fjord", title: "Finish the fjord cleanup", subtitle: "Nearly swimmable citywide. Close the gap.", icon: "🌊", color: "#1E5F8C", peopleActive: 9, steps: [
        { action: "Survey a fjord-edge habitat", detail: "Map seabird nesting, eelgrass, and shoreline health along the fjord. Citizen data guides the final cleanup push.", time: "2 hrs", peopleNeeded: 30, peopleDone: 9, jane: "Oslo reopened rivers it had buried in pipe. If they can dig a river back up, the fjord's last mile is nothing." },
        { action: "Report any remaining pollution", detail: "Pinpoint the last discharge points and litter traps keeping sections unswimmable. Photograph and report.", time: "10 min", peopleNeeded: 25, peopleDone: 4, jane: "You're not fixing a disaster here. You're chasing perfection. That's a luxury most cities would envy. Use it." },
      ]},
    ],
  },
];

const GLOBAL_STATS = [
  { label: "CO₂ concentration", value: "424 ppm", delta: "highest in 800,000 years", bad: true },
  { label: "Global temperature rise", value: "+1.45°C", delta: "since pre-industrial", bad: true },
  { label: "Species threatened", value: "47,000+", delta: "on the IUCN Red List", bad: true },
  { label: "Renewable energy share", value: "32%", delta: "up from 22% in 2015", bad: false },
  { label: "Forest lost (2024)", value: "3.7M ha", delta: "primary tropical forest", bad: true },
  { label: "Cities Jane tracks", value: "33", delta: "and growing", bad: false },
];

/* ──────────────────────────────────────────────────────────────── */

const tierFor = (total) =>
  total < 110 ? { label: "Critical", color: "#A83A2A", bg: "#FAEDEA" }
  : total < 150 ? { label: "Struggling", color: "#9A6A1A", bg: "#F8F0DC" }
  : total < 195 ? { label: "Working", color: "#2D6B22", bg: "#EAF2E5" }
  : { label: "Rising", color: "#1E5F8C", bg: "#E6EFF6" };

const dirMeta = {
  rising: { label: "Rising", arrow: "↑", color: "#2D6B22" },
  stalling: { label: "Stalling", arrow: "→", color: "#9A6A1A" },
  declining: { label: "Declining", arrow: "↓", color: "#A83A2A" },
};

const ScoreRing = ({ score, max = 333, size = 64, stroke = 3 }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / max);
  const t = tierFor(score);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#ECEAE1" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={t.color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        transform={`rotate(-90 ${size/2} ${size/2})`} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }} />
    </svg>
  );
};

const Progress = ({ done, needed, color }) => {
  const pct = Math.min(100, Math.round((done / needed) * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 4, background: "#ECEAE1", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 12, color: "#9A968A", fontVariantNumeric: "tabular-nums", minWidth: 44, textAlign: "right" }}>{done}/{needed}</span>
    </div>
  );
};

const ScoreBreakdown = ({ score, compact }) => {
  const parts = [
    { label: "Earth", val: score.earth, color: "#2D6B22" },
    { label: "People", val: score.people, color: "#1E5F8C" },
    { label: "Momentum", val: score.momentum, color: "#9A6A1A" },
  ];
  return (
    <div style={{ display: "flex", gap: compact ? 12 : 18 }}>
      {parts.map(p => (
        <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: compact ? 13 : 15, fontWeight: 600, color: p.color }}>{p.val}</span>
          <span style={{ fontSize: 11, color: "#9A968A" }}>{p.label}</span>
        </div>
      ))}
    </div>
  );
};

function PipelineCard({ pipe, cityId, completed, toggleStep, expanded, onToggle }) {
  const doneCount = pipe.steps.filter((_, i) => completed[`${cityId}-${pipe.id}-${i}`]).length;
  return (
    <div style={{
      background: "#FFFFFF", border: `1px solid ${expanded ? "#C9C5B8" : "#ECEAE1"}`,
      borderRadius: 14, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer", userSelect: "none" }}>
        <span style={{ fontSize: 22 }}>{pipe.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A14", marginBottom: 2 }}>{pipe.title}</div>
          <div style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.4 }}>{pipe.subtitle}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A14" }}>{pipe.peopleActive}</div>
          <div style={{ fontSize: 10.5, color: "#9A968A" }}>active</div>
        </div>
        <span style={{ fontSize: 18, color: "#C9C5B8", transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "none", flexShrink: 0 }}>›</span>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid #F2F0E8", padding: "0 18px 18px" }}>
          <div style={{ padding: "14px 0 8px" }}>
            <Progress done={doneCount} needed={pipe.steps.length} color={pipe.color} />
          </div>
          {pipe.steps.map((step, i) => {
            const key = `${cityId}-${pipe.id}-${i}`;
            const done = completed[key];
            return (
              <div key={i} style={{ padding: "15px 0", borderTop: i > 0 ? "1px solid #F6F4EC" : "none", opacity: done ? 0.5 : 1, transition: "opacity 0.2s" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <button onClick={() => toggleStep(key)} style={{
                    width: 24, height: 24, borderRadius: 7, flexShrink: 0, marginTop: 1, padding: 0,
                    border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer",
                    background: done ? pipe.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                  }}>
                    {done && <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{step.action}</span>
                      <span style={{ fontSize: 11, color: "#8A8678", background: "#F2F0E8", padding: "2px 8px", borderRadius: 20, flexShrink: 0, whiteSpace: "nowrap" }}>{step.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#8A8678", lineHeight: 1.55, margin: "0 0 10px" }}>{step.detail}</p>
                    <Progress done={step.peopleDone} needed={step.peopleNeeded} color={pipe.color} />
                    <div style={{ marginTop: 10, background: "#FAFAF4", borderRadius: 8, padding: "9px 13px", fontSize: 12.5, color: "#5A5848", lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 11.5 }}>Jane</span>
                      <span style={{ color: "#D6D2C8", margin: "0 6px" }}>·</span>
                      <span style={{ fontStyle: "italic" }}>{step.jane}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CityDetail({ city, completed, toggleStep }) {
  const [openPipe, setOpenPipe] = useState(city.pipelines[0]?.id || null);
  const t = tierFor(city.score.total);
  const d = dirMeta[city.direction];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
        <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
          <ScoreRing score={city.score.total} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1A14", lineHeight: 1 }}>{city.score.total}</span>
            <span style={{ fontSize: 9, color: "#A8A496" }}>/333</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#1A1A14", letterSpacing: "-0.01em" }}>{city.name}</span>
            <span style={{ fontSize: 13, color: "#9A968A" }}>{city.country}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: t.bg, color: t.color }}>{t.label}</span>
          </div>
          <div style={{ marginTop: 8 }}><ScoreBreakdown score={city.score} /></div>
        </div>
      </div>

      <div style={{ background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
          <span style={{ color: "#C9C5B8" }}>·</span>
          <span style={{ color: "#9A968A", fontSize: 12 }}>{city.name} briefing</span>
          <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: d.color }}>{d.arrow} {d.label}</span>
        </div>
        <p style={{ fontSize: 14, color: "#4A483A", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>{city.briefing}</p>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 12 }}>
        Active pipelines · {city.pipelines.length} open
      </div>

      {city.pipelines.map(pipe => (
        <PipelineCard key={pipe.id} pipe={pipe} cityId={city.id} completed={completed} toggleStep={toggleStep}
          expanded={openPipe === pipe.id} onToggle={() => setOpenPipe(openPipe === pipe.id ? null : pipe.id)} />
      ))}
    </div>
  );
}

function GlobalView({ completed, toggleStep, onAskCity }) {
  const [openCity, setOpenCity] = useState(null);
  const ranked = [...CITIES].sort((a, b) => a.score.total - b.score.total);

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A14", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Earth has work in 33 cities</h2>
        <p style={{ fontSize: 13.5, color: "#8A8678", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
          Not the most damaged cities — the most <em>solvable</em> ones. Places where people can act and councils can be moved. Ranked by need: lowest scores first.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 28 }}>
        {GLOBAL_STATS.map(s => (
          <div key={s.label} style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 11, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#9A968A", marginBottom: 5 }}>{s.label}</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1A14", marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: s.bad ? "#A83A2A" : "#2D6B22", lineHeight: 1.3 }}>{s.bad ? "↑" : "↑"} {s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 12 }}>
        The hierarchy · most urgent first
      </div>

      {ranked.map((city, idx) => {
        const t = tierFor(city.score.total);
        const d = dirMeta[city.direction];
        const isOpen = openCity === city.id;
        const isUser = city.id === USER_CITY;
        return (
          <div key={city.id} style={{ background: "#FFFFFF", border: `1px solid ${isOpen ? "#C9C5B8" : "#ECEAE1"}`, borderRadius: 13, marginBottom: 8, overflow: "hidden", transition: "border-color 0.2s" }}>
            <div onClick={() => setOpenCity(isOpen ? null : city.id)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px", cursor: "pointer", userSelect: "none" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#C2BEB0", width: 22, flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>{idx + 1}</span>
              <div style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
                <ScoreRing score={city.score.total} size={42} stroke={2.5} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A14" }}>{city.score.total}</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A14" }}>{city.name}</span>
                  <span style={{ fontSize: 12, color: "#A8A496" }}>{city.country}</span>
                  {isUser && <span style={{ fontSize: 9.5, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: "#2D6B22", color: "white", letterSpacing: "0.04em" }}>YOU</span>}
                </div>
                <div style={{ fontSize: 12, color: "#8A8678", lineHeight: 1.4, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: isOpen ? "normal" : "nowrap" }}>{city.headline}</div>
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: d.color, flexShrink: 0 }}>{d.arrow}</span>
              <span style={{ fontSize: 16, color: "#C9C5B8", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none", flexShrink: 0 }}>›</span>
            </div>
            {isOpen && (
              <div style={{ borderTop: "1px solid #F2F0E8", padding: "16px 16px 18px", background: "#FCFBF6" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <ScoreBreakdown score={city.score} compact />
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: t.bg, color: t.color }}>{t.label} · {d.label}</span>
                </div>
                <p style={{ fontSize: 13, color: "#5A5848", lineHeight: 1.6, margin: "0 0 16px" }}>{city.briefing}</p>
                {city.pipelines.map(pipe => (
                  <PipelineCardLite key={pipe.id} pipe={pipe} cityId={city.id} completed={completed} toggleStep={toggleStep} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PipelineCardLite({ pipe, cityId, completed, toggleStep }) {
  const [open, setOpen] = useState(false);
  const doneCount = pipe.steps.filter((_, i) => completed[`${cityId}-${pipe.id}-${i}`]).length;
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 11, marginBottom: 8, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", cursor: "pointer" }}>
        <span style={{ fontSize: 18 }}>{pipe.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A14" }}>{pipe.title}</div>
          <div style={{ fontSize: 11.5, color: "#8A8678", marginTop: 1 }}>{pipe.subtitle}</div>
        </div>
        <span style={{ fontSize: 11, color: "#9A968A", flexShrink: 0 }}>{doneCount}/{pipe.steps.length}</span>
        <span style={{ fontSize: 15, color: "#C9C5B8", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none", flexShrink: 0 }}>›</span>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid #F2F0E8", padding: "4px 14px 14px" }}>
          {pipe.steps.map((step, i) => {
            const key = `${cityId}-${pipe.id}-${i}`;
            const done = completed[key];
            return (
              <div key={i} style={{ padding: "12px 0", borderTop: i > 0 ? "1px solid #F6F4EC" : "none", opacity: done ? 0.5 : 1 }}>
                <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <button onClick={() => toggleStep(key)} style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, padding: 0,
                    border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer", background: done ? pipe.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {done && <svg width="12" height="12" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{step.action}</span>
                      <span style={{ fontSize: 10.5, color: "#8A8678", background: "#F2F0E8", padding: "2px 7px", borderRadius: 20 }}>{step.time}</span>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.5, margin: "0 0 8px" }}>{step.detail}</p>
                    <Progress done={step.peopleDone} needed={step.peopleNeeded} color={pipe.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Jane() {
  const [page, setPage] = useState("local");
  const [completed, setCompleted] = useState({});
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const userCity = CITIES.find(c => c.id === USER_CITY);
  const toggleStep = (key) => setCompleted(prev => ({ ...prev, [key]: !prev[key] }));

  const askJane = async () => {
    const q = question.trim();
    if (!q) return;
    setLoading(true); setReply(null); setQuestion("");
    const context = page === "local"
      ? `You are speaking to someone in ${userCity.name}, ${userCity.country}. The city scores ${userCity.score.total}/333 and is ${userCity.direction}. Key issue: ${userCity.headline}`
      : `You are speaking about the global picture across the 33 cities Jane tracks. Be willing to compare cities and zoom out to planetary scale.`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are Jane — the voice of Mother Earth, translated into language people can act on. ${context}. You are warm, witty, specific, and brief. Never preachy, never vague. Every reply should make the person feel they can do one real thing. 2-4 sentences. You are not an AI assistant; you are Jane.`,
          messages: [{ role: "user", content: q }],
        }),
      });
      const data = await res.json();
      setReply(data.content?.find(b => b.type === "text")?.text || "Jane is out by the river. Try again shortly.");
    } catch {
      setReply("Jane is listening to the wind. Ask again in a moment.");
    }
    setLoading(false);
  };

  useEffect(() => { setReply(null); }, [page]);

  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", background: "#FAF8F2", minHeight: "100vh", padding: "0" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 1.25rem 3rem" }}>

        {/* Brand + page tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#EAF2E5", border: "1px solid #C9E0B5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🌍</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1A14", lineHeight: 1, letterSpacing: "-0.01em" }}>Jane</div>
            <div style={{ fontSize: 12, color: "#9A968A", marginTop: 2 }}>The Earth has work for you</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, background: "#F0EDE5", borderRadius: 12, padding: 4, marginBottom: 26 }}>
          {[{ id: "local", label: "Local", sub: userCity.name }, { id: "global", label: "Global", sub: "33 cities" }].map(tab => (
            <button key={tab.id} onClick={() => setPage(tab.id)} style={{
              flex: 1, padding: "9px 0", border: "none", borderRadius: 9, cursor: "pointer",
              background: page === tab.id ? "#FFFFFF" : "transparent",
              boxShadow: page === tab.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              transition: "all 0.2s", fontFamily: "inherit",
            }}>
              <div style={{ fontSize: 14, fontWeight: page === tab.id ? 600 : 500, color: page === tab.id ? "#1A1A14" : "#8A8678" }}>{tab.label}</div>
              <div style={{ fontSize: 11, color: "#A8A496", marginTop: 1 }}>{tab.sub}</div>
            </button>
          ))}
        </div>

        {page === "local"
          ? <CityDetail city={userCity} completed={completed} toggleStep={toggleStep} />
          : <GlobalView completed={completed} toggleStep={toggleStep} />}

        {/* Ask Jane */}
        <div style={{ marginTop: 26 }}>
          <div style={{ display: "flex", gap: 8, background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: 6, alignItems: "center" }}>
            <input value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => e.key === "Enter" && askJane()}
              placeholder={page === "local" ? `Ask Jane about ${userCity.name}...` : "Ask Jane about the bigger picture..."}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 14, padding: "8px 12px", background: "transparent", color: "#1A1A14", fontFamily: "inherit", fontWeight: 400 }} />
            <button onClick={askJane} style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: "#2D6B22", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: question.trim() ? 1 : 0.4, transition: "opacity 0.2s", whiteSpace: "nowrap" }}>
              Ask Jane
            </button>
          </div>
          {(loading || reply) && (
            <div style={{ marginTop: 10, background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 12, padding: "14px 18px" }}>
              <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
              <p style={{ marginTop: 7, marginBottom: 0, fontSize: 14, color: loading ? "#A8A496" : "#4A483A", lineHeight: 1.65 }}>
                {loading ? "listening..." : reply}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
