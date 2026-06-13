import { useState } from "react";
import Progress from "./Progress.jsx";

/* Compact pipeline card — used inside the Global hierarchy. */
export default function PipelineCardLite({ pipe, cityId, completed, toggleStep }) {
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
                  <button
                    onClick={() => toggleStep(key)}
                    style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, padding: 0,
                      border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer", background: done ? pipe.color : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {done && (
                      <svg className="bhumi-grow" width="12" height="12" viewBox="0 0 14 14">
                        <path d="M3 7l3 3 5-5.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{step.action}</span>
                      <span style={{ fontSize: 10.5, color: "#8A8678", background: "#F2F0E8", padding: "2px 7px", borderRadius: 20 }}>{step.time}</span>
                    </div>
                    <p style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.5, margin: "0 0 8px" }}>{step.detail}</p>
                    <Progress done={step.peopleDone ?? 0} needed={step.peopleNeeded} color={pipe.color} />
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
