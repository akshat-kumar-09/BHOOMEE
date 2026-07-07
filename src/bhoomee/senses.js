/* ─────────────────────────────────────────────────────────────
   LIVE SENSES + BODY provider — place-blind, keyless, CORS-safe.
   Turns real device coordinates into { label, body, liveState }
   for the Pilgrim Engine. Every call is best-effort with a
   fallback, so the app NEVER breaks if a network call fails.
     · Open-Meteo         → weather, daylight, wind   (no key)
     · BigDataCloud       → place name (reverse geocode, no key)
     · Overpass (OSM)     → nearest water (best-effort)
   Works identically at any coordinate on Earth.
   ───────────────────────────────────────────────────────────── */

export function getCurrentCoords() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject(new Error("no-geolocation"));
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude, accuracy: p.coords.accuracy }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
    );
  });
}

async function jget(url, ms = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error("http " + r.status);
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

function compass(deg) {
  if (deg == null || isNaN(deg)) return null;
  const dirs = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
  return dirs[Math.round(deg / 45) % 8];
}

function haversine(a, b) {
  const R = 6371000, toR = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toR, dLon = (b.lon - a.lon) * toR;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

const WMO = {
  0: "clear and open", 1: "mostly clear", 2: "part-clouded", 3: "overcast and grey",
  45: "wrapped in fog", 48: "wrapped in freezing fog",
  51: "with a light drizzle", 53: "drizzling steadily", 55: "with a heavy drizzle",
  61: "with soft rain", 63: "raining steadily", 65: "with heavy rain, alive and loud",
  66: "with freezing rain", 67: "with heavy freezing rain",
  71: "with light snow", 73: "snowing steadily", 75: "under heavy snow", 77: "with snow grains",
  80: "with passing showers", 81: "with rain showers", 82: "with violent showers",
  85: "with snow showers", 86: "with heavy snow showers",
  95: "under a thunderstorm", 96: "under a hailing storm", 99: "under a heavy hailing storm",
};
const WET_CODES = new Set([45, 48, 51, 53, 55, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99]);

function phaseFrom(isDay, hour) {
  if (!isDay) return "deep night";
  if (hour < 8) return "clear dawn";
  if (hour < 11) return "bright morning";
  if (hour < 16) return "bright midday";
  if (hour < 19) return "long golden evening";
  return "dusk light";
}

async function reverseGeocode(coords) {
  try {
    const d = await jget(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat}&longitude=${coords.lon}&localityLanguage=en`, 7000);
    return d.city || d.locality || d.principalSubdivision || d.countryName || "here";
  } catch {
    return "here";
  }
}

async function fetchWeather(coords) {
  try {
    const d = await jget(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}` +
      `&current=weather_code,is_day,precipitation,temperature_2m,wind_speed_10m,wind_direction_10m&timezone=auto`, 8000
    );
    const c = d.current || {};
    const isDay = c.is_day == null ? true : !!c.is_day;
    let hour = new Date().getHours();
    if (c.time) { const m = /T(\d{2}):/.exec(c.time); if (m) hour = parseInt(m[1], 10); }
    const wet = (c.precipitation || 0) > 0 || WET_CODES.has(c.weather_code);
    const desc = WMO[c.weather_code] || "still";
    const dir = compass(c.wind_direction_10m);
    return {
      daylight_phase: phaseFrom(isDay, hour),
      weather: (wet ? "wet, " : "") + desc,
      air_reading_plain: wet ? "washed and heavy with wet earth" : (c.weather_code === 0 ? "clean and bright" : "soft and settled"),
      wind_pattern: dir ? `coming in from the ${dir}` : "moving across the open ground",
      _isDay: isDay,
    };
  } catch {
    const h = new Date().getHours();
    return { daylight_phase: phaseFrom(h > 6 && h < 20, h), weather: "still", air_reading_plain: "soft and settled", wind_pattern: "moving across the open ground", _isDay: h > 6 && h < 20 };
  }
}

async function fetchNearestWater(coords) {
  const q =
    `[out:json][timeout:8];(` +
    `way(around:2500,${coords.lat},${coords.lon})[natural=coastline];` +
    `way(around:2000,${coords.lat},${coords.lon})[natural=water];` +
    `relation(around:2000,${coords.lat},${coords.lon})[natural=water];` +
    `way(around:2000,${coords.lat},${coords.lon})[waterway=river];` +
    `);out center tags 12;`;
  const endpoints = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
  for (const ep of endpoints) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 9000);
      const r = await fetch(ep, { method: "POST", body: "data=" + encodeURIComponent(q), signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) continue;
      const d = await r.json();
      const els = (d.elements || []).map((e) => {
        const p = e.center || (e.lat ? { lat: e.lat, lon: e.lon } : null);
        if (!p) return null;
        const dist = haversine(coords, p);
        let form = "water";
        if (e.tags?.natural === "coastline") form = "sea";
        else if (e.tags?.waterway === "river") form = "river";
        else if (e.tags?.water === "lake" || e.tags?.water === "reservoir") form = "lake";
        return { form, distance_m: Math.round(dist), name: e.tags?.name || null };
      }).filter(Boolean).sort((a, b) => a.distance_m - b.distance_m);
      if (els.length) return els[0];
    } catch { /* try next endpoint */ }
  }
  return { form: "none", distance_m: 99999, name: null };
}

/* Resolve a real coordinate into engine inputs. Never throws. */
export async function resolvePlace(coords) {
  const [label, live, water] = await Promise.all([
    reverseGeocode(coords),
    fetchWeather(coords),
    fetchNearestWater(coords).catch(() => ({ form: "none", distance_m: 99999, name: null })),
  ]);
  const body = {
    place_label: label,
    nearest_water: water,
    terrain_class: "urban",
    aridity: "temperate",
    wind_pattern: live.wind_pattern,
    wild_growth: null,
    darksky_bortle: 6,
    soil_materials: null,
  };
  const liveState = {
    daylight_phase: live.daylight_phase,
    weather: live.weather,
    air_reading_plain: live.air_reading_plain,
  };
  return { id: "live", label, coords, body, liveState, live: true };
}
