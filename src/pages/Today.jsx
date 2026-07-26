import { useState } from "react";
import BrandHeader from "../components/BrandHeader.jsx";
import StepCoach from "../components/StepCoach.jsx";
import { getPosition, isEurope, buildContext } from "../lib/geo.js";
import { generatePack } from "../lib/pilgrimEngine.js";
import { useApp } from "../context/AppContext.jsx";

const DOMAIN_COLOR = {
  Water: "#1E5F8C", Air: "#5A5848", Light: "#9A6A1A",
  Noise: "#6E4F8C", Soil: "#2D6B22", Waste: "#8C4A2D",
};

export default function Today() {
  const { todayPack, setTodayPack } = useApp();
  const [state, setState] = useState(todayPack ? "ready" : "idle"); // idle | working | ready | notEurope | error
  const [pack, setPack] = useState(todayPack);
  const [errorMsg, setErrorMsg] = useState("");
  const [countryName, setCountryName] = useState("");

  async function findMissions() {
    setState("working");
    setErrorMsg("");
    try {
      const coords = await getPosition();
      const { europe, place } = await isEurope(coords.lat, coords.lon);
      if (!europe) {
        setCountryName(place?.countryName || "");
        setState("notEurope");
        return;
      }
      const { body, liveState } = await buildContext(coords.lat, coords.lon);
      const built = generatePack({
        coords,
        date: new Date(),
        trip: { days: 1, minutesPerDay: 45, companion: "solo" },
        body,
        liveState,
      });
      setPack(built);
      setTodayPack(built);
      setState("ready");
    } catch (err) {
      setErrorMsg(err?.message || "Couldn't get a location fix — check your device's location permission.");
      setState("error");
    }
  }

  return (
    <div className="bhumi-page">
      <BrandHeader subtitle="Today's missions, wherever you're standing" />

      {state === "idle" && (
        <EmptyState onFind={findMissions} note="Europe only for now — Jane's still learning the rest of the map." />
      )}

      {state === "working" && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#8A8678", fontSize: 14 }}>
          Reading the ground under you…
        </div>
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
            Bhoomee's daily mission list only covers Europe for the moment. More ground soon.
          </p>
          <RetryButton onClick={findMissions} label="Check again" />
        </div>
      )}

      {state === "ready" && pack && <MissionList pack={pack} onRefresh={findMissions} />}
    </div>
  );
}

function EmptyState({ onFind, note }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 0 20px" }}>
      <p style={{ fontSize: 14.5, color: "#4A483A", lineHeight: 1.6, marginBottom: 6, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
        Jane can read the season, the light, and the water nearest to you right now, and hand you a short list of things worth doing today.
      </p>
      <p style={{ fontSize: 12.5, color: "#9A968A", marginBottom: 22 }}>{note}</p>
      <button
        onClick={onFind}
        style={{
          border: "none", borderRadius: 999, background: "#2D6B22", color: "#fff",
          fontSize: 14, fontWeight: 600, padding: "12px 24px", cursor: "pointer", fontFamily: "inherit",
        }}
      >
        Find today's missions
      </button>
    </div>
  );
}

function RetryButton({ onClick, label = "Try again" }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "1px solid #ECEAE1", borderRadius: 999, background: "#FFFFFF", color: "#4A483A",
        fontSize: 13, fontWeight: 600, padding: "9px 18px", cursor: "pointer", fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

function MissionList({ pack, onRefresh }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: "#1A1A14", letterSpacing: "-0.01em" }}>{pack.place_label}</span>
        <button onClick={onRefresh} style={{ border: "none", background: "transparent", color: "#9A968A", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          Refresh
        </button>
      </div>
      <div style={{ fontSize: 12, color: "#9A968A", marginBottom: 20 }}>
        {pack.senses.season} · {pack.senses.daylight_hours}h of daylight · {pack.senses.weather}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {pack.missions.map((m) => (
          <div key={m.id} className="bhumi-rise" style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: DOMAIN_COLOR[m.domain] || "#5A5848" }}>
                {m.domain}
              </span>
              <span style={{ color: "#E0DCCE" }}>·</span>
              <span style={{ fontSize: 11.5, color: "#9A968A" }}>{m.timeBudgetMin} min</span>
            </div>
            <p style={{ fontSize: 13.5, fontStyle: "italic", color: "#6d6553", lineHeight: 1.55, margin: "0 0 10px" }}>
              {m.janeFraming}
            </p>
            <p style={{ fontSize: 14.5, color: "#1A1A14", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>{m.task}</p>
            <StepCoach step={{ action: m.task, time: `${m.timeBudgetMin} min`, detail: m.janeFraming, jane: m.janeFraming }} color={DOMAIN_COLOR[m.domain] || "#2D6B22"} />
          </div>
        ))}
      </div>
    </div>
  );
}
