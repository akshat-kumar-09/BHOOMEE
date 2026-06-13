import { useState } from "react";
import ScoreRing from "../components/ScoreRing.jsx";
import ScoreBreakdown from "../components/ScoreBreakdown.jsx";
import PipelineCard from "../components/PipelineCard.jsx";
import JaneNote from "../components/JaneNote.jsx";
import Progress from "../components/Progress.jsx";
import StepCoach from "../components/StepCoach.jsx";
import AskJane from "../components/AskJane.jsx";
import BrandHeader from "../components/BrandHeader.jsx";
import TeamBar from "../components/TeamBar.jsx";
import CrewPlan from "../components/CrewPlan.jsx";
import { tierFor, dirMeta } from "../lib/score.js";
import { calibrate } from "../lib/calibration.js";
import { useApp } from "../context/AppContext.jsx";

export default function Local({ city, onOpenPlayground }) {
  const { profile, completed, toggleStep, privatePipelines, communityPipelines } = useApp();
  const [openPipe, setOpenPipe] = useState(city.pipelines[0]?.id || null);

  const t = tierFor(city.score.total);
  const d = dirMeta[city.direction];

  const { starters, locked } = profile ? calibrate(city, profile) : { starters: [], locked: [] };
  const lockedReal = locked.filter((l) => l.reason !== null);

  const mine = privatePipelines.filter((p) => p.cityId === city.id);
  const community = communityPipelines[city.id] || [];

  return (
    <div className="bhumi-page">
      <BrandHeader subtitle={`${city.name} · The Earth has work for you`} />
      <TeamBar />

      {/* City header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
        <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
          <ScoreRing score={city.score.total} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1A14", lineHeight: 1 }}>{city.score.total}</span>
            <span style={{ fontSize: 9, color: "#A8A496" }}>/333</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#1A1A14", letterSpacing: "-0.01em" }}>{city.name}</span>
            <span style={{ fontSize: 13, color: "#9A968A" }}>{city.country}</span>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: t.bg, color: t.color }}>{t.label}</span>
          </div>
          <div style={{ marginTop: 8 }}><ScoreBreakdown score={city.score} /></div>
        </div>
      </div>

      {/* Jane's briefing */}
      <div style={{ background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 12, padding: "14px 18px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
          <span style={{ color: "#C9C5B8" }}>·</span>
          <span style={{ color: "#9A968A", fontSize: 12 }}>{city.name} briefing</span>
          <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: d.color }}>{d.arrow} {d.label}</span>
        </div>
        <p style={{ fontSize: 14, color: "#4A483A", lineHeight: 1.65, margin: 0, fontWeight: 400 }}>{city.briefing}</p>
      </div>

      {/* Jane coordinating the crew on the lead mission */}
      <CrewPlan pipe={city.pipelines[0]} city={city} />

      {/* Start here — calibrated starter tasks */}
      {profile && starters.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2D6B22" }}>Start here</span>
            <span style={{ fontSize: 12, color: "#9A968A" }}>your 3 first moves, tuned to you</span>
          </div>
          {starters.map((task, i) => (
            <StarterTask key={task.key} task={task} index={i} done={completed[task.key]} onToggle={() => toggleStep(task.key)} />
          ))}

          {lockedReal.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, color: "#A8A496", marginBottom: 8, fontWeight: 500 }}>The ladder above you</div>
              {lockedReal.slice(0, 5).map(({ task, reason }) => (
                <LockedTask key={task.key} task={task} reason={reason} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* The user's own + community pipelines */}
      {(mine.length > 0 || community.length > 0) && (
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 12 }}>
            From the Playground
          </div>
          {mine.map((pipe) => (
            <PipelineCard key={`mine-${pipe.id}`} pipe={pipe} cityId={city.id} completed={completed} toggleStep={toggleStep}
              expanded={openPipe === `mine-${pipe.id}`} onToggle={() => setOpenPipe(openPipe === `mine-${pipe.id}` ? null : `mine-${pipe.id}`)} badge="yours" />
          ))}
          {community.map((pipe) => (
            <PipelineCard key={`comm-${pipe.id}`} pipe={pipe} cityId={city.id} completed={completed} toggleStep={toggleStep}
              expanded={openPipe === `comm-${pipe.id}`} onToggle={() => setOpenPipe(openPipe === `comm-${pipe.id}` ? null : `comm-${pipe.id}`)}
              badge={{ kind: "community", handle: pipe.handle }} />
          ))}
        </div>
      )}

      {/* Active pipelines */}
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 12 }}>
        Active pipelines · {city.pipelines.length} open
      </div>
      {city.pipelines.map((pipe) => (
        <PipelineCard key={pipe.id} pipe={pipe} cityId={city.id} completed={completed} toggleStep={toggleStep}
          expanded={openPipe === pipe.id} onToggle={() => setOpenPipe(openPipe === pipe.id ? null : pipe.id)} />
      ))}

      {/* Playground nudge */}
      <button
        onClick={onOpenPlayground}
        style={{
          width: "100%", marginTop: 14, textAlign: "left", cursor: "pointer",
          background: "#FFFFFF", border: "1px dashed #C9C5B8", borderRadius: 14, padding: "16px 18px",
          display: "flex", alignItems: "center", gap: 14, fontFamily: "inherit", transition: "border-color 0.2s",
        }}
      >
        <span style={{ fontSize: 22 }}>✦</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A14", marginBottom: 2 }}>Noticed something? Build a pipeline.</div>
          <div style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.4 }}>Open the Playground and design a real action with Jane.</div>
        </div>
        <span style={{ fontSize: 18, color: "#C9C5B8" }}>›</span>
      </button>

      <AskJane city={city} scope="local" />
    </div>
  );
}

function StarterTask({ task, index, done, onToggle }) {
  const { step, color } = task;
  return (
    <div className="bhumi-rise" style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: "15px 16px", marginBottom: 8, opacity: done ? 0.55 : 1, transition: "opacity 0.2s" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <button
          onClick={onToggle}
          style={{
            width: 24, height: 24, borderRadius: 7, flexShrink: 0, marginTop: 1, padding: 0,
            border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer",
            background: done ? color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
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
            <span style={{ fontSize: 9.5, fontWeight: 700, color: color, background: "#F2F0E8", borderRadius: 6, padding: "2px 6px" }}>{index + 1}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{step.action}</span>
            <span style={{ fontSize: 11, color: "#8A8678", background: "#F2F0E8", padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>{step.time}</span>
          </div>
          <p style={{ fontSize: 13, color: "#8A8678", lineHeight: 1.55, margin: "0 0 8px" }}>{step.detail}</p>
          <Progress done={step.peopleDone ?? 0} needed={step.peopleNeeded} color={color} />
          {step.jane && <JaneNote>{step.jane}</JaneNote>}
          {!done && <StepCoach step={step} color={color} />}
        </div>
      </div>
    </div>
  );
}

function LockedTask({ task, reason }) {
  const { step } = task;
  return (
    <div style={{ background: "#FBFAF5", border: "1px solid #F2F0E8", borderRadius: 11, padding: "12px 14px", marginBottom: 6, display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#F2F0E8" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="11" width="14" height="9" rx="2" stroke="#A8A496" strokeWidth="1.8" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="#A8A496" strokeWidth="1.8" />
        </svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "#9A968A" }}>{step.action}</span>
          <span style={{ fontSize: 10.5, color: "#A8A496", background: "#F2F0E8", padding: "2px 7px", borderRadius: 20 }}>{step.time}</span>
        </div>
        <div style={{ fontSize: 12, color: "#B0AC9E", fontStyle: "italic" }}>{reason}</div>
      </div>
    </div>
  );
}
