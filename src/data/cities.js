/* ════════════════════════════════════════════════════════════════
   BHOOMEE — 33 European cities. A working map, not a damage ranking.

   Score out of 333 = Earth (111) + People (111) + Momentum (111).
   Lower score = more need for witnesses. Ordered Belgrade → Oslo.

   Europe first: not because it's the worst continent, but because
   the levers still move here — FOIs, water boards, public hearings,
   disclosure laws. Each city has real civic mechanisms a person
   can pull. More ground later.
═══════════════════════════════════════════════════════════════════ */

export const USER_CITY = "london"; // detected location — set to London for the day

export const CITIES = [
  {
    id: "belgrade", name: "Belgrade", country: "Serbia", region: "Europe",
    score: { earth: 24, people: 26, momentum: 26, total: 76 }, direction: "declining",
    headline: "Where the Sava meets the Danube — and a decade-long waterfront project keeps walling the public off from both.",
    briefing: "Belgrade sits on one of Europe's great river confluences. A massive riverside development has spent a decade fencing off public land along the Sava, opposed the whole way by 'Ne davimo Beograd' ('Don't Let Belgrade Drown'), one of the region's largest grassroots movements. The rivers are still here. So is the fight for public access to them.",
    pipelines: [
      { id: "sava", title: "Reclaim the riverbank", subtitle: "A public river, increasingly walled off by development.", icon: "💧", color: "#1E5F8C", peopleActive: 10, steps: [
        { action: "Document a blocked or degraded access point", detail: "Walk the Sava or Danube bank near you. Photograph any fenced-off public land, dumping, or construction encroaching on the water's edge.", time: "30 min", peopleNeeded: 40, peopleDone: 10, jane: "Every metre of riverbank that gets fenced off is one this city won't easily get back. A photo today is the record that it was ever public." },
        { action: "Join a river cleanup", detail: "Local groups run cleanups along both rivers, especially after floods wash debris downstream. Jane connects you to the next one.", time: "3 hrs", peopleNeeded: 30, peopleDone: 3, jane: "Two rivers meet at this city and carried it for a thousand years. An afternoon pulling trash out is the smallest repayment." },
      ]},
    ],
  },
  {
    id: "krakow", name: "Kraków", country: "Poland", region: "Europe",
    score: { earth: 26, people: 28, momentum: 34, total: 88 }, direction: "rising",
    headline: "Winter smog ranks among the worst in Europe — but a citizen movement forced the country's first coal ban.",
    briefing: "Kraków's basin geography traps coal smoke every winter, and for years officials denied how bad it was. Krakow Smog Alarm, a grassroots group founded by residents, changed that — pushing through Poland's first regional ban on coal and wood home heating. The ban is real; getting the last old stoves out is the unfinished part.",
    pipelines: [
      { id: "smog-krakow", title: "Finish the coal-stove phase-out", subtitle: "Poland's first coal ban started here. Some stoves remain.", icon: "🫁", color: "#8A3A5A", peopleActive: 9, steps: [
        { action: "Log an air quality reading on a still winter day", detail: "Use an air quality app or a personal sensor on a cold, windless morning — when smog is worst. Screenshot the reading with time and location.", time: "5 min", peopleNeeded: 60, peopleDone: 9, jane: "Kraków's smog hides in still air on cold mornings. A single screenshot, taken at the right hour, is the same evidence that got the ban passed in the first place." },
        { action: "Report a stove still burning coal or waste", detail: "The ban prohibits solid-fuel heating in the city. If you spot black smoke from a chimney, report it to the city's environmental hotline with photos.", time: "10 min", peopleNeeded: 30, peopleDone: 4, jane: "One law on paper and one stove still lit are two different things. Reporting closes that gap, chimney by chimney." },
      ]},
    ],
  },
  {
    id: "bucharest", name: "Bucharest", country: "Romania", region: "Europe",
    score: { earth: 28, people: 30, momentum: 36, total: 94 }, direction: "rising",
    headline: "One of Europe's lowest green-space ratios — except for a wetland residents refused to let be paved.",
    briefing: "Bucharest has less green space per person than almost any EU capital. But Văcărești — an abandoned Communist-era reservoir — grew wild for thirty years and became a genuine urban wetland, alive with herons, foxes and orchids. Local naturalists fought to protect it instead of letting it be developed, and in 2016 it became Romania's first urban nature park. It's proof the city can still choose wild over paved.",
    pipelines: [
      { id: "vacaresti", title: "Defend the wild wetland", subtitle: "An abandoned reservoir that became a nature park by refusing to be built over.", icon: "🌿", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "Join a species count in the park", detail: "Văcărești Nature Park runs citizen bio-monitoring walks. Log birds, plants and insects you see with iNaturalist.", time: "1 hr", peopleNeeded: 30, peopleDone: 8, jane: "This park exists because people proved, sighting by sighting, that it was already alive. Every count you add is another brick in that case." },
        { action: "Push for a second wild space", detail: "Bucharest has dozens of neglected lots that could rewild the way Văcărești did. Identify one near you and propose it to your local council.", time: "20 min", peopleNeeded: 25, peopleDone: 3, jane: "Văcărești wasn't planted — it was simply left alone and then defended. The cheapest park in the world is the one nobody paves." },
      ]},
    ],
  },
  {
    id: "milan", name: "Milan", country: "Italy", region: "Europe",
    score: { earth: 30, people: 33, momentum: 33, total: 96 }, direction: "stalling",
    headline: "Trapped by the Alps, the Po Valley's air is some of the most polluted in Europe — and Milan sits at its centre.",
    briefing: "Milan's basin geography traps pollution against the Alps, giving the Po Valley some of the worst PM2.5 readings on the continent most winters. The city has fought back with 'Piazze Aperte' — turning car junctions into plazas — and one of Europe's most ambitious low-emission zones. The geography won't change. The traffic can.",
    pipelines: [
      { id: "po-valley-air", title: "Clear the valley air", subtitle: "Trapped by the Alps, some of Europe's worst PM2.5 readings.", icon: "🫁", color: "#8A3A5A", peopleActive: 12, steps: [
        { action: "Check air quality outside a school at drop-off", detail: "Open an air quality app during the morning rush. Screenshot the PM2.5 reading outside a school gate, where idling engines concentrate.", time: "5 min", peopleNeeded: 60, peopleDone: 12, jane: "The valley traps what the cars put out. A school gate at 8am is where that trapped air lands hardest — on the smallest lungs." },
        { action: "Support the next Piazza Aperta", detail: "Milan converts car junctions into plazas through public consultation. Back a proposal near you or nominate a junction that needs one.", time: "15 min", peopleNeeded: 30, peopleDone: 4, jane: "Every square metre of asphalt turned to piazza is one less place for engines to idle. Small junctions, real air." },
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
    id: "zagreb", name: "Zagreb", country: "Croatia", region: "Europe",
    score: { earth: 36, people: 38, momentum: 38, total: 112 }, direction: "stalling",
    headline: "The Sava runs through the city and a wild mountain forest sits at its edge — both taken for granted.",
    briefing: "Zagreb has genuine natural wealth on its doorstep: the Sava river cutting through the city, and Medvednica, a forested mountain nature park rising straight from the northern suburbs. Both see more traffic and litter each year than active stewardship. The infrastructure to protect them exists — the attention doesn't always follow.",
    pipelines: [
      { id: "sava-medvednica", title: "Steward the river and the mountain", subtitle: "A wild river and a mountain forest, both underwatched.", icon: "🌿", color: "#2D6B22", peopleActive: 7, steps: [
        { action: "Photograph a stretch of the Sava riverbank", detail: "Walk any accessible stretch of the Sava within the city. Photograph litter, erosion or illegal dumping. GPS-tag it.", time: "30 min", peopleNeeded: 30, peopleDone: 7, jane: "A river running straight through a capital city and mostly unwatched is rare. Being the person who watches it is rarer still." },
        { action: "Report trail damage on Medvednica", detail: "Erosion and illegal off-trail riding damage the nature park's paths. Report damaged sections to the park authority with a photo.", time: "10 min", peopleNeeded: 20, peopleDone: 3, jane: "A mountain inside city-bus range is a gift most capitals don't have. Reporting a broken trail is how you say thank you." },
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
    id: "budapest", name: "Budapest", country: "Hungary", region: "Europe",
    score: { earth: 38, people: 42, momentum: 42, total: 122 }, direction: "stalling",
    headline: "Famous for its thermal baths, less famous for what all that warm water eventually does to the Danube.",
    briefing: "Budapest's thermal springs feed the city's famous baths — and much of that heated, mineral-rich water eventually reaches the Danube, alongside runoff and litter from a fast-growing riverside. The Danube is one of Europe's most-monitored rivers on paper. Ground-level reporting from residents is still what catches what the monitors miss.",
    pipelines: [
      { id: "danube-budapest", title: "Watch the river the baths feed", subtitle: "Thermal water and city runoff, both heading for the Danube.", icon: "💧", color: "#1E5F8C", peopleActive: 9, steps: [
        { action: "Document a stretch of the Danube embankment", detail: "Walk a section of the embankment. Photograph litter, discharge points, or erosion. GPS-tag what you find.", time: "30 min", peopleNeeded: 40, peopleDone: 9, jane: "The Danube runs through ten countries and gets talked about in all of them. What it actually looks like on your stretch is something only you can show." },
        { action: "Join a riverbank cleanup", detail: "Local groups run Danube cleanup days, especially after spring floods bring debris downstream. Jane connects you to the next one.", time: "3 hrs", peopleNeeded: 25, peopleDone: 3, jane: "A river this famous deserves better than being everyone's problem and no one's responsibility. Take an afternoon and make it yours." },
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
      { id: "london-sprint", title: "The 6-hour sprint", subtitle: "One day. One river. Real evidence by sundown.", icon: "⚡", color: "#9A6A1A", peopleActive: 27, steps: [
        { action: "Hour 0 · Pick your patch", detail: "Open a map and find the river or stream nearest you — Wandle, Lea, Brent, Crane, Roding. Pick one access point you can walk to. Screenshot it. That's basecamp for the day.", time: "10 min", peopleNeeded: 40, peopleDone: 27, jane: "Don't overthink it — the nearest water wins. A sprint dies in the planning. Pick, screenshot, go." },
        { action: "Hour 1 · Walk it and shoot it", detail: "Walk one kilometre of bank. Photograph everything wrong: outfalls, foam, litter traps, fly-tipping. Wide, close, landmark — location on. You're making a field record, not art.", time: "1 hr", peopleNeeded: 40, peopleDone: 21, jane: "By the end of this walk you'll know more about that river than the people deciding its fate. That's not a boast. That's the gap." },
        { action: "Hour 2 · Catch it discharging", detail: "Open Thames Water's live storm-overflow map for your stretch. If it rained recently, screenshot any overflow that ran, with the time and duration. Pair it with your photos.", time: "30 min", peopleNeeded: 40, peopleDone: 16, jane: "Your photos plus their own discharge data, same place, same day. That pairing is what turns a walk into a case." },
        { action: "Hour 3 · Test the water", detail: "Sample at two points — upstream and downstream of an outfall — with a Thames21 kit or a cheap nitrate/phosphate strip. Log both numbers against the spot.", time: "45 min", peopleNeeded: 40, peopleDone: 11, jane: "Two readings, one outfall between them. If the downstream number is worse, you found a culprit before lunch." },
        { action: "Hour 4 · Make the map", detail: "Drop every photo, GPS point and reading into one shared map or a single thread. Title it with the river and today's date. This is your artifact.", time: "45 min", peopleNeeded: 40, peopleDone: 9, jane: "A whole day's work, in one link. Now it travels without you having to be in the room." },
        { action: "Hour 5 · Put it in front of power", detail: "Post the map and tag your MP, your councillor, Thames21 and @riveractionuk with one true sentence. Then fire off a 2-minute FOI to Thames Water for the outfall you found.", time: "30 min", peopleNeeded: 40, peopleDone: 6, jane: "You spent five hours earning the right to be loud for thirty seconds. Spend them well." },
        { action: "Hour 6 · Recruit one", detail: "Send the link to one person who lives near that river and ask them to adopt the next kilometre. Hand off the relay.", time: "20 min", peopleNeeded: 40, peopleDone: 4, jane: "You can't watch the whole river. But if everyone takes a kilometre, the river is never unwatched again." },
      ]},
      { id: "thames-tribs", title: "Adopt a river", subtitle: "Zero London rivers at good status. The Wandle, Lea, Crane all in crisis.", icon: "💧", color: "#1E5F8C", peopleActive: 41, steps: [
        { action: "Find your nearest river", detail: "Most Londoners live within a mile of a river. The Wandle, Lea, Brent, Crane. Jane tells you which. Go look at it.", time: "20 min", peopleNeeded: 200, peopleDone: 41, jane: "There are rivers under your feet the Victorians buried. The ones still above ground need witnesses." },
        { action: "Catch the overflow in the act", detail: "Thames Water now publishes storm-overflow alerts in near real time. The next time it rains, open their discharge map, screenshot the overflow nearest your river, and note the date and how long it ran.", time: "5 min", peopleNeeded: 150, peopleDone: 33, jane: "They were forced to publish this data, then bet that nobody would look. A screenshot at the right minute is worth a thousand polite complaints." },
        { action: "Join Thames21 water testing", detail: "They provide the kit. You sample your river. Submit the data. Your reading becomes part of the case.", time: "30 min", peopleNeeded: 100, peopleDone: 28, jane: "When 100 people test the same river, it stops being an anecdote and becomes a dataset." },
        { action: "File an FOI to Thames Water", detail: "Request discharge data for the overflow nearest you. Jane fills the template. They have 20 working days.", time: "8 min", peopleNeeded: 50, peopleDone: 7, jane: "Thames Water is in crisis. Their data is public record. Right now nobody's asking for it." },
        { action: "Submit evidence to the London Assembly", detail: "The Environment Committee is investigating swimmable rivers now. They accept public submissions.", time: "15 min", peopleNeeded: 30, peopleDone: 2, jane: "They held hearings in February. The next round needs your data, not your opinion." },
        { action: "Name London's next swim spot", detail: "Pick one stretch of the Lea, Thames or Roding that could become a designated bathing water — the first legal swim in London since the 1950s. Photograph the access, the bank, the flow. Designation begins with one person pointing.", time: "45 min", peopleNeeded: 60, peopleDone: 4, jane: "Ilkley got its stretch of river protected for swimming by simply refusing to shut up about it. London has 600km of river and not one legal swim. Be the one who points and says 'here'." },
      ]},
      { id: "london-air", title: "Clean the air around schools", subtitle: "PM2.5 at 2.4× WHO limits. The poorest kids breathe the worst.", icon: "🫁", color: "#8A3A5A", peopleActive: 19, steps: [
        { action: "Check air quality at your nearest school", detail: "Open IQAir. Stand outside a school at 8:30am. Screenshot the reading. That's what children breathe.", time: "5 min", peopleNeeded: 100, peopleDone: 19, jane: "Parliament launched an air inquiry in 2026 and asked the public for evidence. This is evidence." },
        { action: "Chalk the number on the pavement", detail: "On a dry morning, chalk the live PM2.5 reading on the pavement at the school gate, right where idling cars queue. Photograph it before the day rubs it out.", time: "15 min", peopleNeeded: 60, peopleDone: 5, jane: "You can't see the thing that's hurting them, so draw it on the ground in front of the people who can switch off an engine." },
        { action: "Host a Breathe London sensor", detail: "Imperial College lends air sensors to residents. Bolt one to your railings or balcony. Your home becomes a monitoring node the Mayor's team actually reads.", time: "varies", peopleNeeded: 40, peopleDone: 7, jane: "One sensor on your fence turns your street from an anecdote into a dot on the city's map. Cheap power." },
        { action: "Petition for a School Street", detail: "A traffic-restricted zone at drop-off. 15 parents' signatures triggers council review. Jane gives you the wording.", time: "20 min", peopleNeeded: 50, peopleDone: 4, jane: "Fifteen signatures. Not fifteen thousand. Fifteen parents who agree kids shouldn't breathe exhaust at 8am." },
      ]},
      { id: "london-rain", title: "Let the rain back in", subtitle: "London floods because it's paved. Give the water somewhere to go.", icon: "🌧️", color: "#2D6B22", peopleActive: 12, steps: [
        { action: "Map where the water pools", detail: "After heavy rain, photograph the spots on your street where water sheets across the pavement and overwhelms the drains. GPS-tag each one. These are the exact addresses a rain garden would save.", time: "10 min", peopleNeeded: 80, peopleDone: 12, jane: "London's drains were built for a drier century. Your phone, the morning after a storm, finds the gaps no engineer sees from a desk." },
        { action: "Depave two square metres", detail: "Lift one slab of paving from a front garden and plant it — or join a community depaving day. Two-thirds of London's front gardens are now paved, and each one sheds its rain onto the road.", time: "varies", peopleNeeded: 50, peopleDone: 6, jane: "Un-pave a single front garden and you hand the whole street back a sponge. The flood you prevent is everyone's." },
        { action: "Adopt an empty tree pit", detail: "Walk your road and find the dead or empty tree pits. Nominate one to your borough for a replacement — many run sponsorship schemes. A mature street tree drinks around 100 litres of stormwater a day.", time: "10 min", peopleNeeded: 60, peopleDone: 9, jane: "The pit is already there. The council planned a tree and forgot it. You're not asking for something new — you're collecting a debt." },
        { action: "Nominate a rain garden", detail: "Thames21 and the boroughs turn dead kerbside strips into rain gardens that swallow road runoff. Photograph a likely stretch and send it to your council's drainage team.", time: "15 min", peopleNeeded: 40, peopleDone: 3, jane: "A rain garden is a flood defence that happens to be beautiful. Point at the next strip of lifeless kerb and call it." },
      ]},
      { id: "london-rewild", title: "Rewild a corner", subtitle: "London is a National Park City on paper. Make one square metre of it true.", icon: "🦋", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "Count the life on one street", detail: "Spend twenty minutes logging every bird, bee and butterfly on a single street with iNaturalist. The map of London's wild is built from walks exactly like this.", time: "20 min", peopleNeeded: 50, peopleDone: 8, jane: "You live in the world's first National Park City and most Londoners have no idea. Proving it starts with counting what's already here." },
        { action: "Propose a no-mow verge", detail: "Find a mown grass verge that could be left to flower. Propose it to your council for their 'no-mow' list. A strip of long grass feeds more insects than an entire manicured park.", time: "15 min", peopleNeeded: 40, peopleDone: 4, jane: "The bravest thing a tidy city can do is leave a corner messy on purpose. Ask for the mess — in writing." },
        { action: "Back the London beavers", detail: "Beavers are back in London — Enfield, Ealing — for the first time in 400 years, building wetlands that hold back floods downstream. Back the next reintroduction or visit a site and report on it.", time: "varies", peopleNeeded: 30, peopleDone: 3, jane: "Four centuries after we wiped them out, beavers are doing London's flood engineering for free. The least we can do is make room." },
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
      { id: "canals-bham", title: "Wake the canals", subtitle: "35 miles of waterway, more than Venice, mostly ignored.", icon: "💧", color: "#1E5F8C", peopleActive: 9, steps: [
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
    id: "helsinki", name: "Helsinki", country: "Finland", region: "Europe",
    score: { earth: 52, people: 54, momentum: 54, total: 160 }, direction: "rising",
    headline: "The Baltic Sea just offshore is one of the most polluted seas on Earth — fed by farmland hundreds of miles inland.",
    briefing: "Helsinki's own coastal waters are relatively clean, but the Baltic Sea it opens onto suffers severe eutrophication — algae blooms fed by phosphorus runoff from farms across nine countries. Finnish organisations like the John Nurminen Foundation have shown real progress is possible, funding phosphorus-removal upgrades at treatment plants around the sea. The problem is regional. So is the fix.",
    pipelines: [
      { id: "baltic-helsinki", title: "Push back the algae blooms", subtitle: "A sea stressed by farms hundreds of miles away.", icon: "🌊", color: "#1E5F8C", peopleActive: 10, steps: [
        { action: "Report a summer algal bloom", detail: "Log the location, date and severity of any blue-green algae bloom you see on the coast. Regional monitoring bodies use citizen reports to track bloom spread.", time: "5 min", peopleNeeded: 30, peopleDone: 10, jane: "The Baltic's blooms move fast and monitoring can't be everywhere. A bather noticing green water is sometimes the earliest warning there is." },
        { action: "Back a phosphorus-reduction project", detail: "Organisations fund treatment-plant upgrades around the Baltic. Support or share their current project — every tonne of phosphorus kept out is measurable.", time: "15 min", peopleNeeded: 20, peopleDone: 3, jane: "This sea won't be saved from Helsinki's shoreline alone. It'll be saved nine countries at a time. Add your weight to one of them." },
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
    id: "ljubljana", name: "Ljubljana", country: "Slovenia", region: "Europe",
    score: { earth: 64, people: 64, momentum: 64, total: 192 }, direction: "rising",
    headline: "Europe's greenest capital on paper — car-free centre, zero-waste target — still short of both.",
    briefing: "Ljubljana banned cars from its historic centre in 2007 and set one of Europe's most ambitious zero-waste targets soon after, earning it European Green Capital in 2016. It's a genuine model. It's also not finished — recycling rates have plateaued short of the target, and the Ljubljanica still carries litter through the postcard centre everyone photographs.",
    pipelines: [
      { id: "ljubljanica", title: "Close the gap to zero waste", subtitle: "A model city, short of its own target.", icon: "♻️", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "Audit your own waste for a week", detail: "Track what you throw away for a week and sort what could have been recycled or composted instead. Log the gap. Jane shows you where the city's own target sits.", time: "varies", peopleNeeded: 30, peopleDone: 8, jane: "A city can set a target. Only its residents can actually hit it. This is where the gap between the two lives." },
        { action: "Photograph litter on the Ljubljanica", detail: "Walk the river through the old town. Photograph any litter caught against the banks or bridges. The postcard view and the real one are often different.", time: "20 min", peopleNeeded: 25, peopleDone: 3, jane: "Every tourist photographs this river from the bridges. Almost no one photographs what's actually floating in it. Be the second kind." },
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
      { id: "canals-ams", title: "Bring the canals to life", subtitle: "Mastered for transport, now made into habitat.", icon: "💧", color: "#1E5F8C", peopleActive: 10, steps: [
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

export const GLOBAL_STATS = [
  { label: "Cities on the map", value: "33", delta: "Europe for now", bad: false },
  { label: "Score scale", value: "/333", delta: "Earth · People · Momentum", bad: false },
  { label: "Ordered by", value: "Need", delta: "lowest score first", bad: false },
];
