import { useState } from "react";
import ScoreRing from "../components/ScoreRing.jsx";
import ScoreBreakdown from "../components/ScoreBreakdown.jsx";
import PipelineCardLite from "../components/PipelineCardLite.jsx";
import AskJane from "../components/AskJane.jsx";
import BrandHeader from "../components/BrandHeader.jsx";
import { CITIES, GLOBAL_STATS, USER_CITY } from "../data/cities.js";
import { tierFor, dirMeta } from "../lib/score.js";
import { useApp } from "../context/AppContext.jsx";

export default function Global() {
  const { completed, toggleStep, cityId } = useApp();
  const [openCity, setOpenCity] = useState(null);
  const ranked = [...CITIES].sort((a, b) => a.score.total - b.score.total);
  const userCityId = cityId || USER_CITY;

  return (
    <div className="bhumi-page">
      <BrandHeader subtitle="Europe · 33 cities where the levers still move" />

      <div style={{ marginBottom: 22 }}>
        <h2 className="bhumi-display" style={{ fontSize: 22, color: "#1C1710", margin: "0 0 8px", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
          Same ground. Different cities.
        </h2>
        <p style={{ fontSize: 13.5, color: "#5A5848", lineHeight: 1.65, margin: 0, maxWidth: 540 }}>
          Not a ranking of damage — a working map of Europe, where FOIs, water boards, hearings and disclosure laws already exist.
          Ordered by need: lowest 333 score first, so the places that need witnesses most sit at the top.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 8, marginBottom: 28 }}>
        {GLOBAL_STATS.map((s) => (
          <div key={s.label} style={{ background: "#FFFFFF", borderRadius: 12, padding: "12px 14px", boxShadow: "var(--shadow-card)" }}>
            <div style={{ fontSize: 11, color: "#9A968A", marginBottom: 5 }}>{s.label}</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1A14", marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: s.bad ? "#A83A2A" : "#2D6B22", lineHeight: 1.3 }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 12 }}>
        By need · Belgrade → Oslo
      </div>

      {ranked.map((city, idx) => {
        const t = tierFor(city.score.total);
        const d = dirMeta[city.direction];
        const isOpen = openCity === city.id;
        const isUser = city.id === userCityId;
        return (
          <div
            key={city.id}
            style={{
              background: "#FFFFFF",
              borderRadius: 13,
              marginBottom: 8,
              overflow: "hidden",
              boxShadow: isOpen ? "var(--shadow-lift)" : "var(--shadow-card)",
              outline: isOpen ? "1px solid #C9C5B8" : "1px solid transparent",
              transition: "box-shadow 0.2s, outline-color 0.2s",
            }}
          >
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
                {city.pipelines.map((pipe) => (
                  <PipelineCardLite key={pipe.id} pipe={pipe} cityId={city.id} completed={completed} toggleStep={toggleStep} />
                ))}
              </div>
            )}
          </div>
        );
      })}

      <AskJane scope="global" />
    </div>
  );
}
