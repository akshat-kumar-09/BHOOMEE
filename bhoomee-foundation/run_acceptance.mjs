import { generatePack } from "./pilgrim_engine.mjs";

/* FIXTURES = stand-ins for what the Body (OSM / EU-open-data) and the live
   Senses provider (Open-Meteo) would return. This is the ONLY place any
   place-specific fact lives. The engine itself never names a place. */

const CASES = [
  { name:"Adriatic coastal town", coords:{lat:42.42, lon:18.77},
    body:{ place_label:"Kotor",
      nearest_water:{form:"sea", distance_m:150, name:"the bay"},
      terrain_class:"upland", aridity:"temperate",
      wind_pattern:"falling down off the mountains toward the water",
      wild_growth:"caper and fig rooted straight into the old stone walls",
      darksky_bortle:4,
      soil_materials:["pale limestone","olive-root earth","sea-worn pebble","salt crust"] },
    liveState:{ daylight_phase:"hard midday", weather:"hot and still under a high sun", air_reading_plain:"clean and salt-touched" } },

  { name:"Glasgow", coords:{lat:55.86, lon:-4.25},
    body:{ place_label:"Glasgow",
      nearest_water:{form:"river", distance_m:300, name:"the Clyde"},
      terrain_class:"urban", aridity:"wet",
      wind_pattern:"coming up the river from the west",
      wild_growth:"buddleia and willowherb forcing up through the pavement cracks",
      darksky_bortle:7,
      soil_materials:["cracked sandstone","the dark soil of a tree pit","moss","wet grit"] },
    liveState:{ daylight_phase:"long low evening", weather:"soft grey with breaks of sun", air_reading_plain:"damp and green" } },

  { name:"Mumbai", coords:{lat:19.076, lon:72.877},
    body:{ place_label:"Mumbai",
      nearest_water:{form:"sea", distance_m:400, name:"the Arabian Sea"},
      terrain_class:"urban", aridity:"wet",
      wind_pattern:"driving in hard off the sea with the monsoon",
      wild_growth:"a peepal seedling in a wall, and grass exploding everywhere in the rain",
      darksky_bortle:9,
      soil_materials:["monsoon-wet clay","cracked concrete","tree-pit mud","salt and grit"] },
    liveState:{ daylight_phase:"bright wet morning", weather:"warm monsoon rain, heavy and alive", air_reading_plain:"washed and heavy with wet earth" } },
];

const date = new Date(Date.UTC(2026, 6, 6)); // 2026-07-06
const trip = { days:3, minutesPerDay:30, companion:"solo" };

for (const c of CASES) {
  const pack = generatePack({ coords:c.coords, date, trip, body:c.body, liveState:c.liveState });
  console.log("\n" + "═".repeat(72));
  console.log(`  ${c.name.toUpperCase()}  (${c.coords.lat}, ${c.coords.lon})`);
  console.log("═".repeat(72));
  console.log(`  place_kind (derived, not named): ${pack.place_kind}`);
  console.log(`  season: ${pack.senses.season}   daylight: ${pack.senses.daylight_hours}h` +
              `   ${pack.senses.long_days?"(white-night long days)":pack.senses.short_days?"(short days)":""}`);
  console.log(`  weather now: ${pack.senses.weather}`);
  console.log(`  missions in pack: ${pack.missionCount}  (cached offline, 0 live calls on the ground)`);
  for (const m of pack.missions) {
    console.log(`\n  ── ${m.northStar}   [${m.timeBudgetMin}m · day ${m.day} · ${m.id}]`);
    console.log(`     Jane: “${m.janeFraming}”`);
    console.log(`     Task: ${m.task}`);
    console.log(`     ↳ offering: ${m.artifact}`);
  }
}
console.log("\n" + "═".repeat(72));
console.log("  Engine source scanned for hardcoded place names: see grep check below.");
console.log("═".repeat(72));
