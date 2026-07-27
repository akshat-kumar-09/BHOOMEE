import { useState } from "react";
import BrandHeader from "../components/BrandHeader.jsx";
import StepCoach from "../components/StepCoach.jsx";
import JaneNote from "../components/JaneNote.jsx";
import Progress from "../components/Progress.jsx";
import LocationMap from "../components/LocationMap.jsx";
import { getPosition, isEurope, buildContext } from "../lib/geo.js";
import { generatePack } from "../lib/pilgrimEngine.js";
import { useApp } from "../context/AppContext.jsx";

const DOMAIN_META = {
  Water: { color: "#1E5F8C", icon: "💧" },
  Air: { color: "#5A5848", icon: "🌬️" },
  Light: { color: "#9A6A1A", icon: "☀️" },
  Noise: { color: "#6E4F8C", icon: "👂" },
  Soil: { color: "#2D6B22", icon: "🌱" },
  Waste: { color: "#8C4A2D", icon: "♻️" },
};

function groupByDomain(missions) {
  const map = {};
  for (const m of missions) (map[m.domain] ||= []).push(m);
  return Object.entries(map).map(([domain, steps]) => ({ domain, steps }));
}

export default function Home() {
  const { todayPack, setTodayPack, completed, toggleStep } = useApp();
  const [state, setState] = useState(todayPack ? "ready" : "idle"); // idle | working | ready | notEurope | error
  const [pack, setPack] = useState(todayPack);
  const [coords, setCoords] = useState(todayPack?.coords || null);
  const [errorMsg, setErrorMsg] = useState("");
  const [countryName, setCountryName] = useState("");
  const [openDomain, setOpenDomain] = useState(null);

  async function findMissions() {
    setState("working");
    setErrorMsg("");
    try {
      const c = await getPosition();
      setCoords(c);
      const { europe, place } = await isEurope(c.lat, c.lon);
      if (!europe) {
        setCountryName(place?.countryName || "");
        setState("notEurope");
        return;
      }
      const { body, liveState } = await buildContext(c.lat, c.lon);
      const built = generatePack({
        coords: c,
        date: new Date(),
        trip: { days: 1, minutesPerDay: 45, companion: "solo" },
        body,
        liveState,
      });
      setPack(built);
      setTodayPack(built);
      setState("ready");
      setOpenDomain(built.missions[0]?.domain || null);
    } catch (err) {
      setErrorMsg(err?.message || "Couldn't get a location fix — check your device's location permission.");
      setState("error");
    }
  }

  const domains = pack ? groupByDomain(pack.missions) : [];

  return (
    <div className="bhumi-page">
      <BrandHeader subtitle={pack ? `${pack.place_label} · your ground, right now` : "Your ground, right now"} />

      {coords && state === "ready" && <LocationMap lat={coords.lat} lon={coords.lon} />}

      {state === "idle" && <EmptyState onFind={findMissions} />}

      {state === "working" && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#8A8678", fontSize: 14 }}>Reading the ground under you…</div>
      )}

      {state === "error" && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <p style={{ color: "#9A6A1A", fontSize: 14, marginBottom: 16 }}>{errorMsg}</p>
          <RetryButton onClick={findMissions} />
        </div>
      )}

      {state === "notEurope" && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <p style={{ color: "#4A483A", fontSize: 14.5, lineHeight: 1.6, marginBottom: 16 }}>
            {countryName ? `You're in ${countryName} right now, and ` : "You're outside the footprint, and "}
            Bhoomee's missions only cover Europe for the moment. More ground soon.
          </p>
          <RetryButton onClick={findMissions} label="Check again" />
        </div>
      )}

      {state === "ready" && pack && (
        <>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 12, color: "#9A968A" }}>
              {pack.senses.season} · {pack.senses.daylight_hours}h of daylight · {pack.senses.weather}
            </span>
            <button onClick={findMissions} style={{ border: "none", background: "transparent", color: "#9A968A", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
              Refresh
            </button>
          </div>

          <p style={{ fontSize: 13.5, color: "#5A5848", lineHeight: 1.6, margin: "10px 0 20px" }}>
            Every place breaks down into the same handful of things worth noticing — water, air, light, the ground underfoot.
            Here's the picture forming for <strong>{pack.place_label}</strong>. Each one below builds toward a fuller portrait, not just a task.
          </p>

          {domains.map((group) => (
            <DomainPipeline
              key={group.domain}
              group={group}
              place={pack.place_label}
              completed={completed}
              toggleStep={toggleStep}
              expanded={openDomain === group.domain}
              onToggle={() => setOpenDomain(openDomain === group.domain ? null : group.domain)}
            />
          ))}
        </>
      )}
    </div>
  );
}

function DomainPipeline({ group, place, completed, toggleStep, expanded, onToggle }) {
  const meta = DOMAIN_META[group.domain] || { color: "#5A5848", icon: "•" };
  const doneCount = group.steps.filter((m) => completed[m.id]).length;
  const complete = doneCount === group.steps.length;

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 12,
        overflow: "hidden",
        borderLeft: `4px solid ${meta.color}`,
        boxShadow: expanded ? "var(--shadow-lift)" : "var(--shadow-card)",
        transition: "box-shadow 0.2s",
      }}
    >
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer", userSelect: "none" }}>
        <div
          style={{
            width: 42, height: 42, borderRadius: "50%", flexShrink: 0, fontSize: 19,
            background: `${meta.color}17`, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {meta.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="bhumi-display" style={{ fontSize: 16.5, color: "#1C1710", marginBottom: 2 }}>{group.domain} portrait of {place}</div>
          <div style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.4 }}>
            {complete ? "Complete — every mission done" : `${group.steps.length} mission${group.steps.length > 1 ? "s" : ""} building the picture`}
          </div>
        </div>
        {complete && !expanded && <span style={{ fontSize: 15 }}>✓</span>}
        <span style={{ fontSize: 18, color: "#C9C5B8", transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "none", flexShrink: 0 }}>›</span>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid #F2F0E8", padding: "0 18px 18px" }}>
          <div style={{ padding: "14px 0 8px" }}>
            <Progress done={doneCount} needed={group.steps.length} color={meta.color} />
          </div>
          {group.steps.map((m, i) => {
            const done = completed[m.id];
            return (
              <div key={m.id} style={{ padding: "15px 0", borderTop: i > 0 ? "1px solid #F6F4EC" : "none", opacity: done ? 0.5 : 1, transition: "opacity 0.2s" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <button
                    onClick={() => toggleStep(m.id)}
                    style={{
                      width: 24, height: 24, borderRadius: 7, flexShrink: 0, marginTop: 1, padding: 0,
                      border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer",
                      background: done ? meta.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                    }}
                  >
                    {done && (
                      <svg className="bhumi-grow" width="14" height="14" viewBox="0 0 14 14">
                        <path d="M3 7l3 3 5-5.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{m.task}</span>
                      <span style={{ fontSize: 11, color: "#8A8678", background: "#F2F0E8", padding: "2px 8px", borderRadius: 20, flexShrink: 0, whiteSpace: "nowrap" }}>{m.timeBudgetMin} min</span>
                    </div>
                    <JaneNote>{m.janeFraming}</JaneNote>
                    {!done && <StepCoach step={{ action: m.task, time: `${m.timeBudgetMin} min`, detail: m.janeFraming, jane: m.janeFraming }} color={meta.color} />}
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

function EmptyState({ onFind }) {
  return (
    <div style={{ textAlign: "center", padding: "36px 24px 28px", background: "#FFFFFF", borderRadius: 20, boxShadow: "var(--shadow-card)" }}>
      <div
        style={{
          width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px", fontSize: 28,
          background: "radial-gradient(circle at 32% 28%, #A9C9E8, #3E6B6A 70%)",
          boxShadow: "0 4px 14px -4px rgba(62,107,106,0.55), inset 0 1px 1px rgba(255,255,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        🧭
      </div>
      <p className="bhumi-display" style={{ fontSize: 19, color: "#1C1710", lineHeight: 1.35, marginBottom: 10, maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
        Jane can read the season, the light, and the water nearest to you — right now.
      </p>
      <p style={{ fontSize: 13.5, color: "#8A7F68", lineHeight: 1.6, marginBottom: 22, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
        Not a to-do list — a pipeline worth finishing. Europe only for now, while Jane learns the rest of the map.
      </p>
      <button
        onClick={onFind}
        style={{
          border: "none", borderRadius: 999, color: "#fff", fontSize: 14.5, fontWeight: 600, padding: "13px 28px", cursor: "pointer", fontFamily: "inherit",
          background: "linear-gradient(135deg, #4E8A47, #2D6B22)",
          boxShadow: "0 6px 16px -4px rgba(45,107,34,0.5)",
        }}
      >
        Find my ground
      </button>
    </div>
  );
}

function RetryButton({ onClick, label = "Try again" }) {
  return (
    <button
      onClick={onClick}
      style={{ border: "1px solid #ECEAE1", borderRadius: 999, background: "#FFFFFF", color: "#4A483A", fontSize: 13, fontWeight: 600, padding: "9px 18px", cursor: "pointer", fontFamily: "inherit", boxShadow: "var(--shadow-card)" }}
    >
      {label}
    </button>
  );
}
