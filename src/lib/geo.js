/* ════════════════════════════════════════════════════════════════
   GEO — turns "here, right now" into the Body/Senses inputs the
   pilgrim engine needs. Every source here is free, keyless, and
   called straight from the browser:
     - navigator.geolocation      → precise coords
     - BigDataCloud reverse-geocode-client → place name + country
     - Open-Meteo forecast (current) → live weather + wind
     - Open-Meteo elevation        → upland vs lowland
     - Overpass API (OSM)          → nearest real water feature
   Every network call fails soft: if it's down or slow, the pack
   still generates from whatever we do have (coords + date always
   give real season/daylight — the rest gracefully falls back to
   the engine's place-blind defaults).
═══════════════════════════════════════════════════════════════════ */

// ISO 3166-1 alpha-2 codes for Europe (geographic, incl. UK/CH/NO/IS etc).
const EUROPE_COUNTRY_CODES = new Set([
  "AL","AD","AT","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR",
  "DE","GR","HU","IS","IE","IT","XK","LV","LI","LT","LU","MT","MD","MC",
  "ME","NL","MK","NO","PL","PT","RO","SM","RS","SK","SI","ES","SE","CH",
  "UA","GB","VA",
]);

// Rough bounding box, used only as a fast pre-filter and as a fallback
// when reverse geocoding is unavailable (network down, rate-limited).
function inEuropeBounds(lat, lon) {
  return lat >= 34 && lat <= 71 && lon >= -25 && lon <= 45;
}

export function getPosition({ timeout = 10000 } = {}) {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation isn't available on this device."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout, maximumAge: 60000 }
    );
  });
}

async function fetchJSON(url, opts, timeoutMs = 6000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

export async function reverseGeocode(lat, lon) {
  try {
    const d = await fetchJSON(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    return {
      countryCode: d.countryCode || null,
      countryName: d.countryName || null,
      label: d.city || d.locality || d.principalSubdivision || d.countryName || "this stretch of ground",
    };
  } catch {
    return { countryCode: null, countryName: null, label: "this stretch of ground" };
  }
}

export async function isEurope(lat, lon) {
  if (!inEuropeBounds(lat, lon)) return { europe: false, place: null };
  const place = await reverseGeocode(lat, lon);
  if (place.countryCode) return { europe: EUROPE_COUNTRY_CODES.has(place.countryCode), place };
  return { europe: true, place }; // bbox already passed; geocode just failed
}

const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
function compassOf(deg) {
  if (deg == null || Number.isNaN(deg)) return null;
  return COMPASS[Math.round(((deg % 360) / 45)) % 8];
}

// WMO weather codes → the words the engine's wet_now regex looks for.
const WEATHER_CODE_TEXT = {
  0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast",
  45: "fog", 48: "freezing fog",
  51: "light drizzle", 53: "drizzle", 55: "heavy drizzle",
  61: "light rain", 63: "rain", 65: "heavy rain",
  71: "light snow", 73: "snow", 75: "heavy snow",
  80: "rain showers", 81: "rain showers", 82: "violent rain showers",
  85: "snow showers", 86: "heavy snow showers",
  95: "thunderstorm", 96: "thunderstorm with hail", 99: "severe thunderstorm with hail",
};

function phaseFromHour(hour, { longDays, wetNow }) {
  if (hour >= 5 && hour < 7) return "early morning";
  if (hour >= 7 && hour < 11) return wetNow ? "bright wet morning" : "bright morning";
  if (hour >= 11 && hour < 14) return "hard midday";
  if (hour >= 14 && hour < 17) return "warm afternoon";
  if (hour >= 17 && hour < 20) return longDays ? "long low evening" : "low evening";
  if (hour >= 20 && hour < 22) return "dusk";
  return "night";
}

export async function fetchWeather(lat, lon) {
  try {
    const d = await fetchJSON(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code&timezone=auto`
    );
    const code = d?.current?.weather_code;
    const weatherText = WEATHER_CODE_TEXT[code] || "clear";
    const localHour = new Date(d.current.time).getHours();
    const dir = compassOf(d?.current?.wind_direction_10m);
    return {
      weatherText,
      localHour,
      windPattern: dir ? `moving in off the ${dir}` : null,
      airReadingPlain: /fog|smoke|overcast/.test(weatherText) ? "a little heavy today" : "clear enough to breathe easy",
    };
  } catch {
    return { weatherText: "clear", localHour: new Date().getHours(), windPattern: null, airReadingPlain: "clear enough to breathe easy" };
  }
}

export async function fetchElevation(lat, lon) {
  try {
    const d = await fetchJSON(`https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`);
    return Array.isArray(d.elevation) ? d.elevation[0] : null;
  } catch {
    return null;
  }
}

function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// Nearest real water feature from OpenStreetMap, within 3km. Fails soft to
// "none found" — the engine already has a true-everywhere fallback line for
// that ("even the rain in the gutter is her, passing through").
export async function fetchNearestWater(lat, lon) {
  const query = `[out:json][timeout:8];(
    way["natural"="coastline"](around:3000,${lat},${lon});
    way["natural"="water"](around:3000,${lat},${lon});
    way["waterway"~"river|stream|canal"](around:3000,${lat},${lon});
  );out center tags 12;`;
  try {
    const d = await fetchJSON(
      "https://overpass-api.de/api/interpreter",
      { method: "POST", body: "data=" + encodeURIComponent(query) },
      7000
    );
    let best = null;
    for (const el of d.elements || []) {
      const c = el.center;
      if (!c) continue;
      const dist = haversineMeters(lat, lon, c.lat, c.lon);
      if (!best || dist < best.distance_m) {
        const tags = el.tags || {};
        let form = "lake";
        if (tags.natural === "coastline") form = "sea";
        else if (tags.waterway) form = tags.waterway === "river" ? "river" : "waterway";
        best = { distance_m: Math.round(dist), form, name: tags.name || null };
      }
    }
    return best;
  } catch {
    return null;
  }
}

// Assembles the `body` + `liveState` the pilgrim engine expects, from a
// single set of coordinates. Every field degrades to the engine's own
// place-blind default if its source is unreachable.
export async function buildContext(lat, lon) {
  const [place, weather, elevation, water] = await Promise.all([
    reverseGeocode(lat, lon),
    fetchWeather(lat, lon),
    fetchElevation(lat, lon),
    fetchNearestWater(lat, lon),
  ]);

  const body = {
    place_label: place.label,
    nearest_water: water,
    aridity: "temperate",
    terrain_class: elevation != null && elevation > 500 ? "upland" : "lowland",
    wind_pattern: weather.windPattern,
    darksky_bortle: 5,
  };

  const liveState = {
    weather: weather.weatherText,
    daylight_phase: phaseFromHour(weather.localHour, {
      longDays: false, // engine recomputes long_days for real; phase text just needs a hint
      wetNow: /rain|monsoon|wet|storm|drizzle|snow|fog|mist/i.test(weather.weatherText),
    }),
    air_reading_plain: weather.airReadingPlain,
  };

  return { body, liveState, place };
}
