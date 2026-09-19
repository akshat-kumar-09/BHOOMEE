/* ════════════════════════════════════════════════════════════════
   BHOOMEE — 33 cities. Movement infrastructure, not a climate-tech demo.

   Score out of 333 = Earth (111) + People (111) + Momentum (111).
   Lower score = more need for a witness. Ordered by need.

   Selection rule: one persuaded person can move mountains.
   Council-election calendars beat population. A university town in a
   fracking fight is worth ten capitals sitting still. We pick for:
     - upcoming or just-run municipal elections
     - recent climate disasters that have not been weaponized yet
     - university towns where students actually run things
     - anywhere a mayor just pissed everyone off
     - civic mechanisms a single person can pull (FOI, hearing, petition,
       citizen sensor, reconstruction contract, student union)

   Mix (33):
     Europe 11 — hand-picked, not a continent demo
     Asia 9 — a second action hub
     North America 5 · South America 3 · Africa 3 · Oceania 2
     Every inhabited continent. Antarctica has no city to stand in.
═══════════════════════════════════════════════════════════════════ */

export const USER_CITY = "london";

export const CITIES = [
  /* ── North America ─────────────────────────────────────────── */
  {
    id: "denton", name: "Denton", country: "United States", region: "North America",
    score: { earth: 22, people: 28, momentum: 21, total: 71 }, direction: "rising",
    headline: "A university town that banned fracking, got preempted by the state, then elected a mayor by 47 votes — and is now staring down data-centre water.",
    briefing: "Denton, Texas (University of North Texas) is the proof that council calendars beat population. In 2014 residents banned fracking inside city limits; Austin passed HB 40 and forced a repeal. In June 2026 the mayor's race went to a 47-vote runoff while council tees up a data-centre moratorium over water and power. One well-organised campus and one hearing still move more than a quiet Phoenix.",
    pipelines: [
      { id: "denton-water", title: "Keep the water local", subtitle: "Fracking was round one. Data centres are round two.", icon: "💧", color: "#1E5F8C", peopleActive: 14, steps: [
        { action: "Show up to the next data-centre hearing", detail: "Denton City Council has been taking public comment on a possible 90-day moratorium. Put your name on the speaker list. Ninety seconds. Say what the well in your neighbourhood already taught you about extraction.", time: "2 hrs", peopleNeeded: 40, peopleDone: 14, jane: "HB 40 took the frack ban. It did not take your microphone. A 47-vote mayor is listening whether he likes it or not." },
        { action: "File a water-use open records request", detail: "Ask the city for the last 24 months of industrial and proposed data-centre water commitments. Texas Public Information Act. They have ten business days.", time: "12 min", peopleNeeded: 25, peopleDone: 4, jane: "They'll talk jobs. You want acre-feet. Put the gallons on paper and the hearing writes itself." },
      ]},
    ],
  },

  /* ── Asia ──────────────────────────────────────────────────── */
  {
    id: "quezon-city", name: "Quezon City", country: "Philippines", region: "Asia",
    score: { earth: 23, people: 30, momentum: 21, total: 74 }, direction: "rising",
    headline: "Flood-control billions vanished; UP Diliman walked out of class. Manila Bay is still being filled.",
    briefing: "Quezon City is where Philippine student politics still runs things — the University of the Philippines campus that emptied for People Power is emptying again over ghost flood-control projects. Reclamation of Manila Bay resumed after a presidential pause. The disaster (typhoons, floods, a landfill fire on reclaimed land) has not been used as a civic weapon yet. A hearing, a contract number, a campus rally: that's the lever.",
    pipelines: [
      { id: "qc-floods", title: "Name the missing flood wall", subtitle: "The money was appropriated. The water still comes in.", icon: "🌧️", color: "#1E5F8C", peopleActive: 18, steps: [
        { action: "Photograph the flood project nearest you", detail: "Find a billed flood-control site in QC or along the bay. Wide shot, plaque or contractor board, and the water it was supposed to hold. GPS on.", time: "30 min", peopleNeeded: 50, peopleDone: 18, jane: "A ghost project looks like a finished one until someone stands in the flood it didn't stop. That's the photo." },
        { action: "Join the next UP Diliman walkout — or send the photo if you can't", detail: "Campus already moved 3,000 people over this scandal. One more document in the thread is a person. FOI the DPWH contract number if you have twenty minutes.", time: "varies", peopleNeeded: 40, peopleDone: 7, jane: "They stole the language of climate to steal the budget. Give the language back, with a contract number attached." },
      ]},
    ],
  },
  {
    id: "jakarta", name: "Jakarta", country: "Indonesia", region: "Asia",
    score: { earth: 18, people: 34, momentum: 25, total: 77 }, direction: "declining",
    headline: "The world's largest city is sinking into the Java Sea while the capital packs for Borneo.",
    briefing: "North Jakarta drops by as much as 25cm a year from groundwater pumping; ~40% of the city is already below sea level. The government is building seawalls and a new capital in Kalimantan. Gen Z already burned a summer of protest. The lever here is not 'raise awareness of sinking' — it's document illegal wells, map the next flood, and put it in front of the neighbourhood lurah before Nusantara takes the cameras with it.",
    pipelines: [
      { id: "jakarta-sink", title: "Witness the sink", subtitle: "Seawalls go up. The ground still drops.", icon: "🌊", color: "#1E5F8C", peopleActive: 16, steps: [
        { action: "Mark last flood's high-water line", detail: "In your RT/RW, photograph the stain on walls from the last inundation. Note the street and the date it happened. That's the city's missing dataset.", time: "20 min", peopleNeeded: 60, peopleDone: 16, jane: "They measure the seawall in kilometres. You measure the stain on a neighbour's tiles. Guess which number is honest." },
        { action: "Report an unlicensed groundwater well", detail: "Jakarta's sink is pumped. If you know a commercial well with no meter, report it to the provincial water agency. One well is a case.", time: "15 min", peopleNeeded: 30, peopleDone: 5, jane: "Every unmetered pump is a vote to put the next block underwater. Name it." },
      ]},
    ],
  },
  {
    id: "lahore", name: "Lahore", country: "Pakistan", region: "Asia",
    score: { earth: 19, people: 33, momentum: 28, total: 80 }, direction: "rising",
    headline: "Citizen sensors dragged smog into the High Court. A 22-year-old is now suing for the right to breathe.",
    briefing: "Lahore's winter smog became public in 2017 because residents published their own monitor readings — then the High Court ordered Punjab to treat it as a public-health emergency. Pakistan Air Quality Initiative and campus labs still outrun the official network. Hania Imran's 2024 'right to breathe' case is the unfinished weapon. One sensor on a roof still moves a court.",
    pipelines: [
      { id: "lahore-smog", title: "Publish the air they deny", subtitle: "The court already said smog is a danger. The winter still comes.", icon: "🫁", color: "#8A3A5A", peopleActive: 21, steps: [
        { action: "Log a dawn PM2.5 reading", detail: "On a still winter morning, screenshot IQAir or a local monitor with time and neighbourhood. Post it where your union council can see it.", time: "5 min", peopleNeeded: 80, peopleDone: 21, jane: "The High Court moved because someone published a number the government wouldn't. Do it again. Dawn is when the lie is thinnest." },
        { action: "Host or fund a rooftop monitor", detail: "PAQI and campus groups still need nodes. A ~$50 sensor on a roof is a legal exhibit the next time someone files.", time: "varies", peopleNeeded: 25, peopleDone: 6, jane: "They will call your sensor unofficial. Courts have already used unofficial. Put it up anyway." },
      ]},
    ],
  },

  /* ── South America ─────────────────────────────────────────── */
  {
    id: "porto-alegre", name: "Porto Alegre", country: "Brazil", region: "South America",
    score: { earth: 24, people: 32, momentum: 27, total: 83 }, direction: "stalling",
    headline: "The 2024 floods drowned a city that invented participatory budgeting — and the mayor is being sued over the floodgates.",
    briefing: "May 2024 put much of Porto Alegre underwater. The flood-protection system failed; the state court of auditors and residents are now in court with Mayor Sebastião Melo's administration. El Niño is lining up again. This is a disaster that has not been turned into a permanent civic machine yet — and this is the city that once proved ordinary people can write the budget. The lever is the floodgate log, the hearing, the next rain.",
    pipelines: [
      { id: "poa-floodgates", title: "Watch the gates", subtitle: "The walls exist. Someone has to log whether they work.", icon: "🌧️", color: "#1E5F8C", peopleActive: 12, steps: [
        { action: "Photograph your nearest floodgate or pump", detail: "The 2024 failure was mechanical and political. Find the gate or pump that is supposed to protect your bairro. Photo, plaque, date. Before the next El Niño.", time: "25 min", peopleNeeded: 40, peopleDone: 12, jane: "A lawsuit needs a picture of the thing that didn't close. Take it while it's still dry." },
        { action: "File at the court of auditors hearing — or send the photo to who will", detail: "TCE-RS is already in this. Public comment and evidence packets are how a drowned street becomes an exhibit.", time: "30 min", peopleNeeded: 20, peopleDone: 3, jane: "You invented orçamento participativo. Use the habit. The flood is a budget line that lied." },
      ]},
    ],
  },

  /* ── Europe (11, hand-picked) ──────────────────────────────── */
  {
    id: "valencia", name: "Valencia", country: "Spain", region: "Europe",
    score: { earth: 26, people: 35, momentum: 25, total: 86 }, direction: "rising",
    headline: "After DANA, neighbours built faster networks than the Generalitat. Reconstruction money is the fight now.",
    briefing: "29 October 2024: 200+ dead, €10bn in losses. Citizens stood up 22 mutual-aid networks because the regional government froze. Carlos Mazón later resigned; reconstruction contracts are only now being published. Catarroja, Utiel, Alzira mayors are asking for powers the Diputación still holds. The disaster has not been fully weaponized into a standing civic infrastructure. A contract number and a blocked barranco are the lever.",
    pipelines: [
      { id: "dana-rebuild", title: "Follow the reconstruction euro", subtitle: "The water receded. The invoices didn't.", icon: "🌧️", color: "#1E5F8C", peopleActive: 15, steps: [
        { action: "Map one unrepaired barranco or underpass", detail: "Walk a stretch that flooded. Photograph what is still unrestored — a blocked culvert, an underground car park, a missing warning siren. Date and street.", time: "30 min", peopleNeeded: 45, peopleDone: 15, jane: "They will rebuild the road first. The thing that drowned people second. Point at the second thing." },
        { action: "Pull one reconstruction contract", detail: "The Diputación's 2026 portal lists emergency awards. Pick a contractor on your street. Ask who else they donated to. Transparency law. Twenty minutes.", time: "20 min", peopleNeeded: 25, peopleDone: 4, jane: "A flood becomes a scandal when someone reads the annex. Be that someone." },
      ]},
    ],
  },
  {
    id: "durban", name: "Durban", country: "South Africa", region: "Africa",
    score: { earth: 25, people: 29, momentum: 35, total: 89 }, direction: "stalling",
    headline: "Municipal elections 4 November 2026. The 2022 floods still sit in unfinished canals. The mayor just got escorted out of a crowd.",
    briefing: "eThekwini is one of the most contested metros in South Africa's 4 November 2026 local elections. April 2022 floods killed hundreds; canals and informal-settlement drainage are still half-done. Mayor Cyril Xaba was pulled from a hostile crowd in September 2026. The climate disaster has been swallowed by other fights. A ward meeting about a blocked culvert is still a vote.",
    pipelines: [
      { id: "ethekwini-drains", title: "Unblock the ward", subtitle: "Elections are 4 November. The canal is still full of rubble.", icon: "🌧️", color: "#1E5F8C", peopleActive: 11, steps: [
        { action: "Photograph the blocked canal or storm drain in your ward", detail: "The 2022 water came through places the city already knew. GPS, date, ward number. That's a campaign leaflet whether they like it or not.", time: "20 min", peopleNeeded: 50, peopleDone: 11, jane: "Every candidate will say 'service delivery.' Hand them a picture of the drain on their leaflet street." },
        { action: "Put it in the ward committee minutes before 4 November", detail: "Ward committees still take community issues. One item on an agenda is a record the next council inherits.", time: "45 min", peopleNeeded: 20, peopleDone: 3, jane: "An election without a drain on the minutes is just a personality contest. Write the drain in." },
      ]},
    ],
  },
  {
    id: "asheville", name: "Asheville", country: "United States", region: "North America",
    score: { earth: 28, people: 36, momentum: 28, total: 92 }, direction: "rising",
    headline: "Helene rerouted rivers through a mountain city. Recovery money is moving — and so is a data-centre moratorium.",
    briefing: "September 2024: Helene dropped a season of rain on the French Broad and Swannanoa in 72 hours. Churches and coffee shops became resilience hubs faster than FEMA. In 2026 council shifted tens of millions toward home repair and voted a data-centre moratorium while the riverfront is being redesigned as floodplain. The disaster is still unweaponized as a standing civic practice. One comment at a recovery hearing still relocates a dollar.",
    pipelines: [
      { id: "helene-watch", title: "Keep recovery honest", subtitle: "$225m in disaster money. Someone has to watch where it lands.", icon: "🌧️", color: "#2D6B22", peopleActive: 13, steps: [
        { action: "Walk a Helene-scarred bank and log what's still raw", detail: "French Broad or Swannanoa. Photo of unstabilised slope, ruined trailer, or a park that became a river. Date it.", time: "40 min", peopleNeeded: 40, peopleDone: 13, jane: "Recovery loves a ribbon-cutting. The bank that still slides is the agenda item." },
        { action: "Speak at the next CDBG-DR or riverfront session", detail: "Council is allocating federal disaster dollars and redesigning river parks as floodplain. Public comment is how a trailer park stays on the list.", time: "2 hrs", peopleNeeded: 20, peopleDone: 4, jane: "They already proved a coffee shop can outrun FEMA. Now make the budget outrun the press release." },
      ]},
    ],
  },
  {
    id: "lismore", name: "Lismore", country: "Australia", region: "Oceania",
    score: { earth: 27, people: 31, momentum: 37, total: 95 }, direction: "rising",
    headline: "A regional city drowned in 2022. Four years on, CSIRO is still arguing dams while the levee question sits with council.",
    briefing: "The 2022 Northern Rivers floods killed seven nearby and wrecked Lismore's CBD over a levee that overtopped by metres. Council now runs a billion-dollar restoration portfolio — 133 projects done, 140 still live. CSIRO's 2026 work says extra dams would have cut the peak by ~2m and still not saved the levee. This is a small city where a council vote on buybacks and floodplain use is worth more than a still capital. Show up.",
    pipelines: [
      { id: "lismore-levee", title: "Decide the floodplain", subtitle: "The next peak is not a surprise. The land use still is.", icon: "🌧️", color: "#1E5F8C", peopleActive: 9, steps: [
        { action: "Map one house that should be a park", detail: "Walk a street that went under in 2022. Photograph a repeated-flood house or a shop still gutted. That's a buyback argument.", time: "25 min", peopleNeeded: 30, peopleDone: 9, jane: "Parks, not people, in the delta. Point at the address before the next peak does." },
        { action: "Lodge at the next floodplain or restoration meeting", detail: "Lismore City Council's recovery program is public. One deputation about buybacks vs dams changes the minutes.", time: "varies", peopleNeeded: 15, peopleDone: 2, jane: "CSIRO can model dams forever. You live behind the levee. Speak as if the peak is this season — because it is." },
      ]},
    ],
  },
  {
    id: "krakow", name: "Kraków", country: "Poland", region: "Europe",
    score: { earth: 26, people: 34, momentum: 38, total: 98 }, direction: "rising",
    headline: "Residents forced Poland's first coal-stove ban. The low-emission zone then got used as a recall weapon.",
    briefing: "Krakow Smog Alarm — neighbours, not a ministry — made the basin's winter air a legal fact and won a regional solid-fuel ban. The unfinished work is the last stoves and a low-emission zone that opponents tried to turn into a mayor's recall. This is still a city where a chimney photo and a hearing move national policy.",
    pipelines: [
      { id: "smog-krakow", title: "Finish the coal-stove phase-out", subtitle: "The ban is law. Some chimneys didn't get the memo.", icon: "🫁", color: "#8A3A5A", peopleActive: 9, steps: [
        { action: "Log air on a still winter morning", detail: "Screenshot PM2.5 at dawn in your dzielnica, when the basin traps smoke. That's the same genre of evidence that won the ban.", time: "5 min", peopleNeeded: 60, peopleDone: 9, jane: "Kraków's smog hides in still air. A timestamped reading is how a grassroots group beat a voivodeship." },
        { action: "Report a stove still burning coal or waste", detail: "Solid-fuel heating is banned in the city. Black smoke from a chimney: photo to the environmental hotline.", time: "10 min", peopleNeeded: 30, peopleDone: 4, jane: "One law on paper and one stove still lit are two different things. Close the gap, chimney by chimney." },
      ]},
    ],
  },
  {
    id: "belgrade", name: "Belgrade", country: "Serbia", region: "Europe",
    score: { earth: 24, people: 38, momentum: 39, total: 101 }, direction: "declining",
    headline: "Ne davimo Beograd already proved a waterfront can be a movement. The Sava is still being fenced.",
    briefing: "Belgrade sits where the Sava meets the Danube. A decade of waterfront development has fenced public land; 'Don't Let Belgrade Drown' became one of the region's largest civic forces — and now a political party. Bajdina Forest and remaining river access are the live fights. A photo of a new fence is still a leaflet.",
    pipelines: [
      { id: "sava", title: "Reclaim the riverbank", subtitle: "A public river, incrementally privatised by fence.", icon: "💧", color: "#1E5F8C", peopleActive: 10, steps: [
        { action: "Document a blocked access point", detail: "Walk the Sava or Danube. Photograph fenced-off public land, dumping, or construction on the water's edge. GPS on.", time: "30 min", peopleNeeded: 40, peopleDone: 10, jane: "Every metre of riverbank that gets fenced is one this city won't easily get back. A photo is the record it was public." },
        { action: "Take it to the next Ne davimo assembly or local board", detail: "The movement already turned a waterfront into a politics. One more exhibit keeps the river on the agenda.", time: "varies", peopleNeeded: 20, peopleDone: 3, jane: "They named themselves after drowning. Don't let the next fence be the quiet one." },
      ]},
    ],
  },
  {
    id: "valparaiso", name: "Valparaíso", country: "Chile", region: "South America",
    score: { earth: 29, people: 33, momentum: 42, total: 104 }, direction: "rising",
    headline: "Hills that burn, a port that thirsts — and a brand-new communal climate plan that will die without witnesses.",
    briefing: "February 2024 fire jumped from Lago Peñuelas into Valparaíso and Viña, killing and wiping hillsides. In 2026 the Concejo unanimously passed the city's first Plan de Acción Comunal de Cambio Climático — 28 measures on fire interface, water, landslides. Plans this young are where one resident still writes the implementation. The lever is the cerro, the hydrant, the consejo session.",
    pipelines: [
      { id: "valpo-cerros", title: "Keep the plan off the shelf", subtitle: "28 measures. The next fire will not read them.", icon: "🔥", color: "#8A5F1A", peopleActive: 8, steps: [
        { action: "Map a fire-interface block with no escape or hydrant", detail: "Walk a cerro edge. Photograph missing hydrants, single-exit alleys, eucalyptus against houses. That's the PACCC's first test.", time: "35 min", peopleNeeded: 30, peopleDone: 8, jane: "They passed a plan because the last fire was unforgivable. Make the next consejo look at your alley, not the PDF." },
        { action: "Claim one of the 28 measures at public audience", detail: "Chile's municipal climate law requires local plans. Ask which measure is funded this year on your cerro. Put the answer in the minutes.", time: "1 hr", peopleNeeded: 15, peopleDone: 2, jane: "Unanimous approval is the easy night. Funding is the fight. Ask for the line item." },
      ]},
    ],
  },
  {
    id: "oberlin", name: "Oberlin", country: "United States", region: "North America",
    score: { earth: 40, people: 36, momentum: 31, total: 107 }, direction: "stalling",
    headline: "A college town of 8,000 just watched its sustainability coordinator get fired. Students still fill the chamber.",
    briefing: "Oberlin, Ohio — college, climate action plan, tiny council. In 2026 the city manager's restructure fired the sustainability coordinator, public-works director and planner. The chamber filled with protesters. Council then signed onto Cleveland 2030 in the same night. This is the opposite of Phoenix: one organised dorm can outvote a quiet restructure. The next Monday meeting is the lever.",
    pipelines: [
      { id: "oberlin-cap", title: "Hold the climate action plan", subtitle: "They fired the person who kept it. Keep the plan anyway.", icon: "⚡", color: "#9A6A1A", peopleActive: 11, steps: [
        { action: "Read the CAP and circle what's now unstaffed", detail: "The Climate Action Plan named owners. If those jobs are gone, list the orphaned actions. One page. That's public comment.", time: "40 min", peopleNeeded: 20, peopleDone: 11, jane: "A restructure that 'eliminates a department' is a climate repeal by HR. Write the orphans down." },
        { action: "Fill the next council chamber", detail: "Oberlin council is small. Students already proved they can pack it. Speak for 90 seconds on the implementation group they floated and didn't form.", time: "2 hrs", peopleNeeded: 30, peopleDone: 8, jane: "In a town this size, fifteen people in folding chairs is a mandate. Use it." },
      ]},
    ],
  },
  {
    id: "athens-ga", name: "Athens-Clarke", country: "United States", region: "North America",
    score: { earth: 34, people: 40, momentum: 36, total: 110 }, direction: "rising",
    headline: "UGA's town just ran a mayoral race on data centres, Helene near-misses, and who owns the night-time grid.",
    briefing: "Athens-Clarke County, Georgia: a consolidated government students actually vote in. The 2026 mayor's race put five candidates on a scientist-led energy forum — resilience, transit, greenspace, and a Georgia Power data centre that arrived 'by right' with no local veto. Dexter Fisher won the June runoff. The lever is still the commission agenda and the next by-right utility project.",
    pipelines: [
      { id: "athens-ga-grid", title: "Take the by-right fight", subtitle: "The data centre didn't need your permission. The next one might.", icon: "⚡", color: "#9A6A1A", peopleActive: 10, steps: [
        { action: "Ask the commission for a data-centre overlay", detail: "If Georgia Power can site by right, the county can still zone water, noise and setbacks. One agenda request starts a staff report.", time: "20 min", peopleNeeded: 25, peopleDone: 10, jane: "They told you it was legal. Legal is not the same as unopposed. Ask for the overlay." },
        { action: "Log night-time load or generator noise near campus", detail: "Photo, time, street. Helene already showed the grid is a climate issue here. Put a number on the next forum.", time: "15 min", peopleNeeded: 30, peopleDone: 4, jane: "Five candidates already had to talk energy because residents made them. Keep making them." },
      ]},
    ],
  },
  {
    id: "chennai", name: "Chennai", country: "India", region: "Asia",
    score: { earth: 30, people: 41, momentum: 42, total: 113 }, direction: "rising",
    headline: "A city that floods and thirsts in the same year — and still has resident welfare associations that can stop a marsh grab.",
    briefing: "Chennai's 2015 and later floods, cyclone seasons, and vanishing Pallikaranai marsh sit next to a fierce civic habit: RWAs, student unions, and court PILs that have already paused encroachments. The IT corridor and the marsh are the same fight. One association letter still delays a dump.",
    pipelines: [
      { id: "chennai-marsh", title: "Hold Pallikaranai", subtitle: "The marsh is the flood defence. It's also the real-estate plan.", icon: "🌿", color: "#2D6B22", peopleActive: 12, steps: [
        { action: "Photograph a fresh fill or dump on the marsh edge", detail: "Wide, close, landmark. Tamil Nadu PCB and the court have used citizen photos before.", time: "30 min", peopleNeeded: 40, peopleDone: 12, jane: "Every truck of construction debris on that marsh is a future drowning in Velachery. Date it." },
        { action: "File or join a PIL / RWA notice", detail: "Resident welfare associations here still move collectors. A one-page notice with your photos is the local FOI.", time: "25 min", peopleNeeded: 20, peopleDone: 3, jane: "Chennai doesn't lack law. It lacks the third photograph. Be late for work. Take it." },
      ]},
    ],
  },
  {
    id: "chiang-mai", name: "Chiang Mai", country: "Thailand", region: "Asia",
    score: { earth: 31, people: 38, momentum: 47, total: 116 }, direction: "rising",
    headline: "A university city that disappears into haze every burning season — and students are done treating it as weather.",
    briefing: "Chiang Mai's PM2.5 spikes from agricultural burning and forest fire routinely make it one of the world's worst air days. CMU and Mae Jo students have turned seasonal haze into a political fact — masks, sensors, and pressure on provincial burning permits. This is not Bangkok sitting still. A sensor on a dorm and a letter to the governor is the lever.",
    pipelines: [
      { id: "cm-haze", title: "Make haze a date, not a season", subtitle: "If it has a start date, it has a responsible office.", icon: "🫁", color: "#8A3A5A", peopleActive: 14, steps: [
        { action: "Publish a campus AQI diary for seven mornings", detail: "Same hour, same gate, screenshot. One week is a dossier the provincial office can't call weather.", time: "5 min / day", peopleNeeded: 40, peopleDone: 14, jane: "Haze is a season until someone gives it seven timestamps. Then it's a permit problem." },
        { action: "Write the governor for the burning-permit log", detail: "Ask which tambon got exemptions this season. Official Information Act. Attach your diary.", time: "20 min", peopleNeeded: 15, peopleDone: 2, jane: "They already know who lit the fields. They are waiting to see if a student asks." },
      ]},
    ],
  },
  {
    id: "bucharest", name: "Bucharest", country: "Romania", region: "Europe",
    score: { earth: 28, people: 44, momentum: 47, total: 119 }, direction: "rising",
    headline: "Europe's greediest capital for pavement — except the wetland residents refused to let die.",
    briefing: "Bucharest has among the EU's worst green-space ratios. Văcărești, an abandoned reservoir, went wild for thirty years; naturalists forced it into becoming Romania's first urban nature park in 2016. That is the model: one defended vacancy. The next lot is the lever.",
    pipelines: [
      { id: "vacaresti", title: "Defend the wild wetland", subtitle: "Left alone, then defended. That's the whole method.", icon: "🌿", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "Join a species count in the park", detail: "Log birds, plants, insects on iNaturalist. The park exists because people proved it was already alive.", time: "1 hr", peopleNeeded: 30, peopleDone: 8, jane: "Sighting by sighting they made a legal wetland. Every count is another brick." },
        { action: "Nominate the next neglected lot to your sector", detail: "Identify a vacancy that could rewild. Write the primărie. One page, one map pin.", time: "20 min", peopleNeeded: 25, peopleDone: 3, jane: "Văcărești wasn't planted. It was left alone and then guarded. The cheapest park is the one nobody paves." },
      ]},
    ],
  },
  {
    id: "dhaka", name: "Dhaka", country: "Bangladesh", region: "Asia",
    score: { earth: 21, people: 48, momentum: 53, total: 122 }, direction: "rising",
    headline: "A megacity of students who already toppled a government — sitting in a bowl that floods when the wetlands are filled.",
    briefing: "Dhaka's flood risk is a filled-in floodplain. Student politics here is not decorative; campus networks have national consequences. The lever is not another awareness walk — it's a khal (canal) photograph and a RAJUK encroachment complaint before the next monsoon.",
    pipelines: [
      { id: "dhaka-khal", title: "Reopen a khal", subtitle: "The canal was the drain. Then it became a plot.", icon: "💧", color: "#1E5F8C", peopleActive: 17, steps: [
        { action: "Photograph an encroached or garbage-choked khal", detail: "Name the neighbourhood. Wide and blocked-section shots. That's a RAJUK or DNCC complaint.", time: "25 min", peopleNeeded: 50, peopleDone: 17, jane: "A filled canal is a future drowning with a land title. Show the title who's boss." },
        { action: "File the encroachment complaint and copy a campus paper", detail: "Students here already know how to move a story. One complaint plus one reporter is a monsoon policy.", time: "20 min", peopleNeeded: 20, peopleDone: 4, jane: "You don't need a new movement. You need this khal in the minutes of one that exists." },
      ]},
    ],
  },
  {
    id: "oxford", name: "Oxford", country: "United Kingdom", region: "Europe",
    score: { earth: 42, people: 46, momentum: 37, total: 125 }, direction: "rising",
    headline: "Students contest the wards. May 2026 already put climate, housing and buses on the city-council ballot.",
    briefing: "Oxford is the European university town where students don't just march — they stand in wards. The 7 May 2026 city elections had current and recent students on Labour, Green and Lib Dem tickets, arguing net-zero 2030, flood alleys, and short lets. County vs city split on transport is the live fight. One ward meeting still outruns a quiet shire.",
    pipelines: [
      { id: "oxford-wards", title: "Win the ward, not the headline", subtitle: "Net-zero 2030 is a council motion. Flooding is a street.", icon: "🗳️", color: "#2D6B22", peopleActive: 16, steps: [
        { action: "Map a flood alley or bus cut in your ward", detail: "Photo the bit of Oxford that contradicts the manifesto. Cowley, Headington, Osney — pick the water or the missing bus.", time: "20 min", peopleNeeded: 35, peopleDone: 16, jane: "They published climate chapters. You publish the puddle on Abingdon Road. Guess which one the next leaflet needs." },
        { action: "Put a student in the room — or be one", detail: "Ward councillor surgeries and planning committees are open. Two students in the second row change the vote more than a thousand-signature petition no one reads.", time: "1 hr", peopleNeeded: 20, peopleDone: 6, jane: "Oxford already proved students can be the candidates. The rest of you can at least be the gallery." },
      ]},
    ],
  },
  {
    id: "athens", name: "Athens", country: "Greece", region: "Europe",
    score: { earth: 32, people: 48, momentum: 48, total: 128 }, direction: "declining",
    headline: "Hottest capital in Europe. First Chief Heat Officer. The shade map is still a volunteer project.",
    briefing: "Athens appointed Europe's first Chief Heat Officer because summers now kill. Pocket parks and cool routes exist as policy; the unshaded streets are still a resident dataset. Wildfire and drought sit at the edge of the basin. The lever is a midday walk and a vacant-lot nomination.",
    pipelines: [
      { id: "cool", title: "Cool the neighbourhoods", subtitle: "Shade is infrastructure. Most streets don't have it.", icon: "🌡️", color: "#8A5F1A", peopleActive: 16, steps: [
        { action: "Map the shadeless streets at noon", detail: "Photograph exposed asphalt, no trees, no awning. These are the heat traps the Chief Heat Officer can actually use.", time: "20 min", peopleNeeded: 50, peopleDone: 16, jane: "She cannot cool what she cannot see. Your noon walk is her map." },
        { action: "Nominate a vacant lot as a pocket park", detail: "Athens converts tiny lots. Identify one. Jane points you at the nomination form.", time: "30 min", peopleNeeded: 20, peopleDone: 4, jane: "Two parking spaces of green drop a block's temperature. Find the gap." },
      ]},
    ],
  },
  {
    id: "nairobi", name: "Nairobi", country: "Kenya", region: "Africa",
    score: { earth: 33, people: 50, momentum: 48, total: 131 }, direction: "rising",
    headline: "University city on a wetland that keeps getting titled as a plot. Students already know how to shut a city down.",
    briefing: "Nairobi's floods track vanished wetlands and a dying Nairobi Dam. Campus politics (UoN, Kenyatta) is real muscle. Encroachment on riparian reserves is illegal on paper and routine on the ground. A NEMA complaint with photographs is still a lever one person can pull before the next long rains.",
    pipelines: [
      { id: "nairobi-wetland", title: "Title the water, not the plot", subtitle: "If it's a wetland on the map, it can't be a car park in real life.", icon: "🌿", color: "#2D6B22", peopleActive: 13, steps: [
        { action: "Photograph a riparian grab", detail: "Nairobi River, Ngong, or Nairobi Dam edge. Fence, fill, or new slab in the reserve. GPS and date.", time: "30 min", peopleNeeded: 40, peopleDone: 13, jane: "The title deed will look very sure of itself. Your photo of the old high-water mark is ruder, and more accurate." },
        { action: "File a NEMA / county riparian complaint", detail: "One complaint with photos forces an inspection number. Share the number with a campus paper.", time: "20 min", peopleNeeded: 20, peopleDone: 3, jane: "Kenya already wrote the setback. Someone has to mail it to itself." },
      ]},
    ],
  },
  {
    id: "london", name: "London", country: "United Kingdom", region: "Europe",
    score: { earth: 34, people: 62, momentum: 38, total: 134 }, direction: "stalling",
    headline: "Richest civic kit in Europe — and not one of 600km of rivers at good status. Borough elections just made climate a mayoral job.",
    briefing: "London is here because the levers are sharp, not because it is the most damaged. Thames21, River Action, FOIs to Thames Water, Assembly hearings, School Streets on fifteen signatures. May 2026 locals produced Green borough leadership (Hackney) that put climate at the centre of the weekly job. The water company is in crisis. Ask it something.",
    pipelines: [
      { id: "thames-tribs", title: "Adopt a river", subtitle: "Zero London rivers at good status. The Wandle, Lea, Crane all in crisis.", icon: "💧", color: "#1E5F8C", peopleActive: 41, steps: [
        { action: "Find your nearest river", detail: "Most Londoners live within a mile of a river. Wandle, Lea, Brent, Crane. Go look at it.", time: "20 min", peopleNeeded: 200, peopleDone: 41, jane: "There are rivers under your feet the Victorians buried. The ones still above ground need witnesses." },
        { action: "Catch the overflow in the act", detail: "Thames Water publishes storm-overflow alerts. Next rain: screenshot the overflow nearest you, time and duration.", time: "5 min", peopleNeeded: 150, peopleDone: 33, jane: "They were forced to publish this, then bet nobody would look. A screenshot at the right minute is the case." },
        { action: "File an FOI to Thames Water", detail: "Request discharge data for the overflow nearest you. They have 20 working days.", time: "8 min", peopleNeeded: 50, peopleDone: 7, jane: "Thames Water is in crisis. Their data is public record. Right now almost nobody's asking." },
        { action: "Submit to the London Assembly Environment Committee", detail: "They take public evidence on swimmable rivers. Data, not opinion.", time: "15 min", peopleNeeded: 30, peopleDone: 2, jane: "Hearings need exhibits. You already have the exhibit if you did the walk." },
      ]},
      { id: "london-air", title: "Clean the air around schools", subtitle: "Fifteen parents' signatures trigger a School Street review.", icon: "🫁", color: "#8A3A5A", peopleActive: 19, steps: [
        { action: "Check air at the school gate at 8:30", detail: "Screenshot PM2.5 where engines idle. That's evidence.", time: "5 min", peopleNeeded: 100, peopleDone: 19, jane: "You can't see the thing that's hurting them, so measure it in front of the people who can switch off an engine." },
        { action: "Petition for a School Street", detail: "Traffic restriction at drop-off. Fifteen signatures starts a council review.", time: "20 min", peopleNeeded: 50, peopleDone: 4, jane: "Fifteen. Not fifteen thousand. That's a Tuesday WhatsApp group." },
      ]},
    ],
  },
  {
    id: "glasgow", name: "Glasgow", country: "United Kingdom", region: "Europe",
    score: { earth: 44, people: 52, momentum: 42, total: 138 }, direction: "rising",
    headline: "97% of Scotland's sewage overflows are unmonitored. The Clyde is the map they won't draw.",
    briefing: "Scottish Water has thousands of overflow pipes and monitors a fraction. Glasgow's civic muscle (River Clyde, Friends groups, FOI culture) is real. One photographed outfall plus one FOI is still how an unmonitored pipe becomes a political object.",
    pipelines: [
      { id: "clyde-sewage", title: "Make the Clyde countable", subtitle: "Unmonitored pipes don't show up in the annual report.", icon: "💧", color: "#1E5F8C", peopleActive: 23, steps: [
        { action: "Photograph an overflow pipe", detail: "Walk the Clyde. See a pipe, snap it, GPS-tag it.", time: "15 min", peopleNeeded: 30, peopleDone: 14, jane: "Scottish Water has thousands of overflow pipes and monitors a handful. You're building the map they won't." },
        { action: "FOI Scottish Water for the nearest overflow's data", detail: "Ask for discharge records. Free. 20 working days.", time: "8 min", peopleNeeded: 20, peopleDone: 3, jane: "FOI is boring on purpose. Boring is how an unmonitored pipe gets a number." },
      ]},
    ],
  },
  {
    id: "medellin", name: "Medellín", country: "Colombia", region: "South America",
    score: { earth: 46, people: 55, momentum: 41, total: 142 }, direction: "rising",
    headline: "The city that proved cable cars and civic design can move a mountain — now fighting the air in the valley and the river at the bottom.",
    briefing: "Medellín already showed what organised citizens plus a municipal experiment can do. The Aburrá Valley still traps PM2.5; the Medellín River is a recovery project that needs eyes more than slogans. Contraloría complaints and Área Metropolitana hearings are the levers, not another branding campaign.",
    pipelines: [
      { id: "aburra-air", title: "Open the valley air", subtitle: "The metro hid the mountain. The inversion still hides the air.", icon: "🫁", color: "#8A3A5A", peopleActive: 10, steps: [
        { action: "Log PM2.5 on an inversion morning in your comuna", detail: "SIATA publishes readings. Screenshot plus a photo of the visible haze from your corner.", time: "10 min", peopleNeeded: 40, peopleDone: 10, jane: "Medellín already did the hard civic miracle once. The second one is just insisting the air is a public number." },
        { action: "Take the number to the Área Metropolitana hearing", detail: "Air contingencies are declared from this data. Public comment is how a comuna stays on the map when the average looks fine.", time: "1 hr", peopleNeeded: 15, peopleDone: 2, jane: "A city average is how they lose your hillside. Bring the hillside." },
      ]},
    ],
  },
  {
    id: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "Europe",
    score: { earth: 52, people: 50, momentum: 44, total: 146 }, direction: "rising",
    headline: "18 March 2026: municipal elections where non-Dutch residents vote — and councils now decide who owns the heat.",
    briefing: "Dutch municipal elections decide heating zones under the Collective Heat Act: majority-public heat companies, street-by-street gas phase-out. In university cities, thousands of extra local-only voters can swing seats. Amsterdam's 45-seat council is a climate machine if people actually use the ballot and the inspraak. One consultation response still redraws a heating zone.",
    pipelines: [
      { id: "ams-heat", title: "Own the heat", subtitle: "The pipe in your street is a political object this year.", icon: "🔥", color: "#9A6A1A", peopleActive: 12, steps: [
        { action: "Check whether your block is in a designated heat zone", detail: "The municipality publishes zone maps. Screenshot yours. If you're not on it, that's the comment.", time: "10 min", peopleNeeded: 40, peopleDone: 12, jane: "They will decide who owns your radiator in a room you weren't in. Print the map. Be in the room." },
        { action: "File an inspraak on the next heat or adaptation plan", detail: "Dutch participation procedures are real. One reasoned objection delays a bad contract.", time: "30 min", peopleNeeded: 20, peopleDone: 3, jane: "Internationals can vote here. That's not a trivia fact. That's a bloc. Use it or watch VVD write the zone." },
      ]},
    ],
  },
  {
    id: "kathmandu", name: "Kathmandu", country: "Nepal", region: "Asia",
    score: { earth: 36, people: 52, momentum: 62, total: 150 }, direction: "rising",
    headline: "A valley of campuses, brick kilns and a river people still treat as a drain — student unions included.",
    briefing: "Kathmandu Valley air (kilns, traffic, winter inversion) and the Bagmati's civic cleanup campaigns are unfinished student projects. Local elections and ward chairs still take a crowd. One kiln photo upwind of a school is a ward agenda item.",
    pipelines: [
      { id: "ktm-bagmati", title: "Give the Bagmati a ward number", subtitle: "A holy river with an open sewer's workload.", icon: "💧", color: "#1E5F8C", peopleActive: 11, steps: [
        { action: "Photograph an outfall or kiln plume at a school hour", detail: "Bagmati bank or a brick-kiln plume over a playground. Time stamp it.", time: "20 min", peopleNeeded: 35, peopleDone: 11, jane: "The valley already knows. The ward chair needs it in an envelope, not a vibe." },
        { action: "Put it on the ward chair's Saturday table", detail: "Kathmandu wards still do face-to-face. One page, two photos.", time: "45 min", peopleNeeded: 15, peopleDone: 2, jane: "Student unions here have toppled bigger things than a kiln. Start with the kiln anyway." },
      ]},
    ],
  },
  {
    id: "oaxaca", name: "Oaxaca", country: "Mexico", region: "North America",
    score: { earth: 38, people: 58, momentum: 59, total: 155 }, direction: "rising",
    headline: "A civic city that already knows how to shut a centro — now doing it over water.",
    briefing: "Oaxaca de Juárez has a deeper protest muscle than most capitals, and a worsening water schedule: pipas, cuts, aquifer stress. Community assemblies and student contingents still set the week. The lever is a well log and an ayuntamiento appearance, not a national march.",
    pipelines: [
      { id: "oaxaca-water", title: "Count the pipas", subtitle: "If water arrives by truck, someone is deciding the queue.", icon: "💧", color: "#1E5F8C", peopleActive: 9, steps: [
        { action: "Log a week of cuts or pipa arrivals on your block", detail: "Times, plates if you can, neighbourhood. That's the dataset the ayuntamiento doesn't publish.", time: "5 min / day", peopleNeeded: 25, peopleDone: 9, jane: "A shortage without a log is a rumour. A shortage with seven timestamps is a scandal." },
        { action: "Take the log to cabildo or your municipal agency", detail: "Open citizen slot. Ask for the well concessions serving your colonia.", time: "1 hr", peopleNeeded: 12, peopleDone: 2, jane: "This city already knows how to occupy a square. Occupy a spreadsheet first. It's ruder." },
      ]},
    ],
  },
  {
    id: "cape-town", name: "Cape Town", country: "South Africa", region: "Africa",
    score: { earth: 48, people: 56, momentum: 57, total: 161 }, direction: "rising",
    headline: "Day Zero taught a city to count litres. Informal settlements still wait for the tap that lesson promised.",
    briefing: "Cape Town's drought made household water data a civic sport. The unfinished work is the disparity: suburbs that learned to leak-spot vs settlements still on shared taps, plus a coastline under squeeze. A reported leak and a ward water question remain high-leverage because the city already built the response machine.",
    pipelines: [
      { id: "cpt-leaks", title: "Finish Day Zero's promise", subtitle: "The dashboard exists. The last tap doesn't.", icon: "💧", color: "#1E5F8C", peopleActive: 14, steps: [
        { action: "Report a visible leak on the city portal", detail: "Cape Town's leak report tool actually dispatches. Photo, meter if you see one, street.", time: "8 min", peopleNeeded: 50, peopleDone: 14, jane: "You already learned to fear a number on a dam wall. Fear the hiss in the street the same way." },
        { action: "Ask your ward councillor for the settlement tap schedule", detail: "One written question about shared-tap hours in the nearest informal settlement. Put the reply next to suburban dam stats.", time: "15 min", peopleNeeded: 20, peopleDone: 3, jane: "Day Zero was equalising until it wasn't. Make them show the hours." },
      ]},
    ],
  },
  {
    id: "taipei", name: "Taipei", country: "Taiwan", region: "Asia",
    score: { earth: 58, people: 60, momentum: 51, total: 169 }, direction: "rising",
    headline: "Civic-tech capital: the budget is already online. Air and heat are waiting for the same treatment.",
    briefing: "Taipei (and Taiwan's vTaiwan / participatory-budget habit) is what movement infrastructure looks like when the pipes work. University districts still swing local races. The lever is a participatory-budget proposal and a neighbourhood PM2.5 node — not inventing democracy from scratch.",
    pipelines: [
      { id: "taipei-pb", title: "Put heat on the ballot that already exists", subtitle: "They built civic tech. Aim it at a street that bakes.", icon: "🗳️", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "File a participatory-budget idea for shade or a rain garden", detail: "One concrete block, one cost line. Taipei already runs the form.", time: "25 min", peopleNeeded: 30, peopleDone: 8, jane: "Most cities would kill for this form. Use it before it becomes a museum of 2016." },
        { action: "Host a neighbourhood air or heat logger", detail: "Campus groups will help site it. Publish weekly. Attach it to the next li meeting.", time: "varies", peopleNeeded: 15, peopleDone: 2, jane: "Open data without a sweaty street is a hobby. Pick the street." },
      ]},
    ],
  },
  {
    id: "bristol", name: "Bristol", country: "United Kingdom", region: "Europe",
    score: { earth: 50, people: 64, momentum: 62, total: 176 }, direction: "rising",
    headline: "A student city that already declared a climate emergency — now drowning in the same sewage story as the rest of England, with sharper civic teeth.",
    briefing: "Bristol's universities and civic groups (The Bristol Cable, river groups, a directly elected mayor history) make it a place where a Wessex Water overflow screenshot still becomes a story by Thursday. The Avon and Frome are the live water fight. One FOI, one councillor question.",
    pipelines: [
      { id: "avon-sewage", title: "Catch Wessex in the act", subtitle: "Same Victorian overflow trick. A ruder local press.", icon: "💧", color: "#1E5F8C", peopleActive: 12, steps: [
        { action: "Screenshot the next Avon or Frome overflow", detail: "Use the company's event map after rain. Time, duration, outfall name.", time: "5 min", peopleNeeded: 40, peopleDone: 12, jane: "They publish because they were made to. Reading it is the part they didn't budget for." },
        { action: "FOI Wessex and copy your councillor + The Bristol Cable", detail: "One overflow, twelve months of spills. Local media here actually runs it.", time: "12 min", peopleNeeded: 20, peopleDone: 3, jane: "London has the Assembly. You have a city that likes a scrap. Use the scrap." },
      ]},
    ],
  },
  {
    id: "leipzig", name: "Leipzig", country: "Germany", region: "Europe",
    score: { earth: 54, people: 66, momentum: 63, total: 183 }, direction: "rising",
    headline: "Student city on the lip of the coal district — Bürgerbegehren still works, and the last pits are a calendar.",
    briefing: "Leipzig's universities sit next to Lusatian/Central German coal politics. Bürgerbegehren (citizen petitions) and a loud street can still force council onto energy, water and the next logistics park. This is not Berlin's brand shop. One petition threshold in a compact city is doable.",
    pipelines: [
      { id: "leipzig-petition", title: "Use the petition law", subtitle: "Germany already wrote you a lever. Most weeks nobody pulls it.", icon: "🗳️", color: "#2D6B22", peopleActive: 9, steps: [
        { action: "Pick the live fight: pit, park, or logistics shed", detail: "Photograph the edge — open-cast approach, a threatened alluvial wood, a new shed on wet ground.", time: "30 min", peopleNeeded: 25, peopleDone: 9, jane: "Coal calendars are political calendars. Date the hole in the ground." },
        { action: "Start or sign the Bürgerbegehren / Einwohneranfrage", detail: "Leipzig's thresholds are reachable with campuses. One formal question on the next Stadtrat agenda.", time: "20 min", peopleNeeded: 40, peopleDone: 5, jane: "A German city that ignores a valid petition is a German city in breach. Make them breach it in public or yield." },
      ]},
    ],
  },
  {
    id: "busan", name: "Busan", country: "South Korea", region: "Asia",
    score: { earth: 60, people: 64, momentum: 67, total: 191 }, direction: "rising",
    headline: "Port city on the Nakdong — civic groups already fight reclamation and the next industrial spill.",
    briefing: "Busan is not Seoul's press corps. Nakdong estuary, reclamation schemes, and a port that externalises spills onto beaches are fights with real local organisations and university departments. A beach transect after a storm and a city-council petition are the levers.",
    pipelines: [
      { id: "nakdong", title: "Keep the estuary public", subtitle: "Reclamation loves an unwatched mouth of a river.", icon: "🌊", color: "#1E5F8C", peopleActive: 7, steps: [
        { action: "Walk a Nakdong or Taejongdae transect after weather", detail: "Photo sheen, fill, or blocked public access. Same points each month if you can.", time: "40 min", peopleNeeded: 25, peopleDone: 7, jane: "Ports count containers. You count whether a kid can still reach the water." },
        { action: "File a city-council resident petition", detail: "Korean local councils accept resident petitions. One spill or fill, attached.", time: "25 min", peopleNeeded: 15, peopleDone: 2, jane: "Seoul will write the national plan. Busan will live the outfall. Stay in Busan." },
      ]},
    ],
  },
  {
    id: "christchurch", name: "Christchurch", country: "New Zealand", region: "Oceania",
    score: { earth: 62, people: 70, momentum: 67, total: 199 }, direction: "rising",
    headline: "The city that learned to rebuild in pop-ups after the quakes — now teaching everyone else, including Asheville, how recovery can stay civic.",
    briefing: "Gap Filler and the Red Zone taught the world that vacant land after disaster is a laboratory, not a vacuum for the first developer. Climate now adds flood, heat and a coastline. Christchurch City Council still has a public that knows how to occupy a vacant lot productively. The lever is the next Red Zone or floodplain decision.",
    pipelines: [
      { id: "chch-redzone", title: "Keep the Red Zone a commons", subtitle: "Empty land is a policy, not an absence.", icon: "🌿", color: "#2D6B22", peopleActive: 8, steps: [
        { action: "Visit a Red Zone or flood-buyout parcel and log its current use", detail: "Is it regenerating, dumped, or quietly fenced for a future sale? Photo and parcel note.", time: "30 min", peopleNeeded: 20, peopleDone: 8, jane: "You already taught Asheville that a vacant lot can be a civic room. Don't let yours become a quiet subdivision." },
        { action: "Submit on the next district-plan or buyout consultation", detail: "One paragraph on keeping floodable land public. Council still reads these here.", time: "20 min", peopleNeeded: 15, peopleDone: 2, jane: "The most expensive park is the one you buy after you let houses go back on the floodplain. Say no early." },
      ]},
    ],
  },
];

export const GLOBAL_STATS = [
  { label: "Cities on the map", value: "33", delta: "six continents", bad: false },
  { label: "Europe, on purpose", value: "11", delta: "hand-picked levers — not a demo", bad: false },
  { label: "Asia, a hub", value: "9", delta: "students, courts, floods, haze", bad: false },
];
