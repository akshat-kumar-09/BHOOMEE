import Progress from "./Progress.jsx";
import JaneNote from "./JaneNote.jsx";
import StepCoach from "./StepCoach.jsx";
import { useApp } from "../context/AppContext.jsx";

/* Full pipeline card — used on Local. `badge` optionally marks a card
   as the user's own ("Yours", gold dot) or community-proposed. */
export default function PipelineCard({ pipe, cityId, completed, toggleStep, expanded, onToggle, badge }) {
  const { completedBy, team } = useApp();
  const doneCount = pipe.steps.filter((_, i) => completed[`${cityId}-${pipe.id}-${i}`]).length;
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${expanded ? "#C9C5B8" : "#ECEAE1"}`,
        borderRadius: 14,
        marginBottom: 10,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer", userSelect: "none" }}>
        <span style={{ fontSize: 22 }}>{pipe.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1A1A14" }}>{pipe.title}</span>
            {badge && <Badge badge={badge} />}
          </div>
          <div style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.4 }}>{pipe.subtitle}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A14" }}>{pipe.peopleActive ?? 1}</div>
          <div style={{ fontSize: 10.5, color: "#9A968A" }}>active</div>
        </div>
        <span style={{ fontSize: 18, color: "#C9C5B8", transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "none", flexShrink: 0 }}>›</span>
      </div>

      {expanded && (
        <div style={{ borderTop: "1px solid #F2F0E8", padding: "0 18px 18px" }}>
          <div style={{ padding: "14px 0 8px" }}>
            <Progress done={doneCount} needed={pipe.steps.length} color={pipe.color} />
          </div>
          {pipe.steps.map((step, i) => {
            const key = `${cityId}-${pipe.id}-${i}`;
            const done = completed[key];
            return (
              <div key={i} style={{ padding: "15px 0", borderTop: i > 0 ? "1px solid #F6F4EC" : "none", opacity: done ? 0.5 : 1, transition: "opacity 0.2s" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <button
                    onClick={() => toggleStep(key)}
                    style={{
                      width: 24, height: 24, borderRadius: 7, flexShrink: 0, marginTop: 1, padding: 0,
                      border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer",
                      background: done ? pipe.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
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
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{step.action}</span>
                      <span style={{ fontSize: 11, color: "#8A8678", background: "#F2F0E8", padding: "2px 8px", borderRadius: 20, flexShrink: 0, whiteSpace: "nowrap" }}>{step.time}</span>
                      {done && team.shared && completedBy[key] && (
                        <span style={{ fontSize: 10.5, fontWeight: 600, color: "#2D6B22", background: "#EAF2E5", padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>✓ {completedBy[key]}</span>
                      )}
                    </div>
                    {step.detail && <p style={{ fontSize: 13, color: "#8A8678", lineHeight: 1.55, margin: "0 0 10px" }}>{step.detail}</p>}
                    <Progress done={step.peopleDone ?? 0} needed={step.peopleNeeded} color={pipe.color} />
                    {step.jane && <JaneNote>{step.jane}</JaneNote>}
                    {!done && <StepCoach step={step} color={pipe.color} />}
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

function Badge({ badge }) {
  if (badge === "yours") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 600, color: "#9A6A1A", background: "#F8F0DC", padding: "2px 8px", borderRadius: 20 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C99A2A", display: "inline-block" }} />
        Yours
      </span>
    );
  }
  if (typeof badge === "object" && badge.kind === "community") {
    return (
      <span style={{ fontSize: 10.5, fontWeight: 600, color: "#1E5F8C", background: "#E6EFF6", padding: "2px 8px", borderRadius: 20 }}>
        Community · {badge.handle}
      </span>
    );
  }
  return null;
}
