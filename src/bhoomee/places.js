/* DEMO place fixtures — stand-ins for what the Body (OSM / EU open data)
   and the live Senses provider (Open-Meteo) will return once device GPS +
   those adapters are wired. This is the ONLY place-specific data in the new
   app; the engine (src/lib/pilgrimEngine.js) stays 100% place-blind.
   Season + daylight are still computed for real from the coordinates. */

export const DEMO_PLACES = [
  {
    id: "adriatic",
    label: "Adriatic coast",
    coords: { lat: 42.42, lon: 18.77 },
    body: {
      place_label: "Kotor",
      nearest_water: { form: "sea", distance_m: 150, name: "the bay" },
      terrain_class: "upland",
      aridity: "temperate",
      wind_pattern: "falling down off the mountains toward the water",
      wild_growth: "caper and fig rooted straight into the old stone walls",
      darksky_bortle: 4,
      soil_materials: ["pale limestone", "olive-root earth", "sea-worn pebble", "salt crust"],
    },
    liveState: { daylight_phase: "hard midday", weather: "hot and still under a high sun", air_reading_plain: "clean and salt-touched" },
  },
  {
    id: "river-city",
    label: "Northern river city",
    coords: { lat: 55.86, lon: -4.25 },
    body: {
      place_label: "Glasgow",
      nearest_water: { form: "river", distance_m: 300, name: "the Clyde" },
      terrain_class: "urban",
      aridity: "wet",
      wind_pattern: "coming up the river from the west",
      wild_growth: "buddleia and willowherb forcing up through the pavement cracks",
      darksky_bortle: 7,
      soil_materials: ["cracked sandstone", "the dark soil of a tree pit", "moss", "wet grit"],
    },
    liveState: { daylight_phase: "long low evening", weather: "soft grey with breaks of sun", air_reading_plain: "damp and green" },
  },
  {
    id: "monsoon-coast",
    label: "Monsoon megacity",
    coords: { lat: 19.076, lon: 72.877 },
    body: {
      place_label: "Mumbai",
      nearest_water: { form: "sea", distance_m: 400, name: "the Arabian Sea" },
      terrain_class: "urban",
      aridity: "wet",
      wind_pattern: "driving in hard off the sea with the monsoon",
      wild_growth: "a peepal seedling in a wall, and grass exploding everywhere in the rain",
      darksky_bortle: 9,
      soil_materials: ["monsoon-wet clay", "cracked concrete", "tree-pit mud", "salt and grit"],
    },
    liveState: { daylight_phase: "bright wet morning", weather: "warm monsoon rain, heavy and alive", air_reading_plain: "washed and heavy with wet earth" },
  },
  {
    id: "desert",
    label: "High desert town",
    coords: { lat: 33.69, lon: -111.87 },
    body: {
      place_label: "the high desert",
      nearest_water: { form: "none", distance_m: 9000, name: null },
      terrain_class: "urban",
      aridity: "arid",
      wind_pattern: "coming dry and steady across the open ground",
      wild_growth: "a low grey shrub holding water in its leaves, and a flower that waited a year for rain",
      darksky_bortle: 3,
      soil_materials: ["cracked clay", "pale grit", "sun-baked stone", "dust"],
    },
    liveState: { daylight_phase: "late golden afternoon", weather: "dry and clear, the heat easing", air_reading_plain: "dry and mineral" },
  },
  {
    id: "dark-north",
    label: "Far-north dark night",
    coords: { lat: 64.13, lon: -21.9 },
    body: {
      place_label: "the northern edge",
      nearest_water: { form: "sea", distance_m: 500, name: "the cold sea" },
      terrain_class: "upland",
      aridity: "temperate",
      wind_pattern: "coming off the water with a cold edge",
      wild_growth: "moss and thrift clinging low between black stones",
      darksky_bortle: 2,
      soil_materials: ["black volcanic grit", "moss", "cold stone", "peat"],
    },
    liveState: { daylight_phase: "deep dark night", weather: "cold and clear, the stars fully out", air_reading_plain: "cold and clean" },
  },
];
