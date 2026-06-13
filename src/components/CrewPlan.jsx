import { useEffect, useState, useCallback, useRef } from "react";
import { useApp } from "../context/AppContext.jsx";
import { coordinateJane } from "../lib/jane.js";

/* Jane runs point for the duo — a live sprint command center.

   She reads the team state (who's online, which steps are done and by
   whom, and the clock), shows progress and time left at a glance, then
   actively divides the next moves and calls the handoff. Only shows when
   the team is live and there's a mission to coordinate. */

function minutesOf(time) {
  if (!time) return 15;
  const t = String(time).toLowerCase();
  const hr = t.match(/([\d.]+)\s*h/);
  const min = t.match(/([\d.]+)\s*m/);
  let total = 0;
  if (hr) total += parseFloat(hr[1]) * 60;
  if (min) total += parseFloat(min[1]);
  if (!hr && !min) {
    const n = parseFloat(t);
    if (!isNaN(n)) total = n;
  }
  return Math.round(total) || 15;
}

function fmtLeft(mins) {
  if (mins <= 0) return "0m";
  return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
}

export default function CrewPlan({ pipe, city }) {
  const { team, completed, completedBy, profile } = useApp();
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const lastSig = useRef("");

  // Live clock — ticks every 30s so the pace read stays honest.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const steps = (pipe?.steps || []).map((s, i) => {
    const key = `${city?.id}-${pipe?.id}-${i}`;
    return { action: s.action, time: s.time, done: !!completed[key], by: completedBy[key] || null };
  });
  const total = steps.length;
  const doneCount = steps.filter((s) => s.done).length;
  const remainingMins = steps.filter((s) => !s.done).reduce((sum, s) => sum + minutesOf(s.time), 0);
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const buildAndRun = useCallback(async () => {
    if (!pipe || !city) return;
    const crew = team.members.length
      ? team.members.map((m) => ({ id: m.id, name: m.name, online: m.online }))
      : [{ id: team.userId, name: team.name || "You", online: true }];
    const me = { id: team.userId, name: team.name || "You" };
    const clock = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setLoading(true);
    try {
      const reply = await coordinateJane({
        pipelineTitle: pipe.title,
        crew, steps, clock, remainingMins, me,
        cityName: city.name, profile,
      });
      setPlan(reply);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipe, city, completed, completedBy, team, profile]);

  // Auto-replan when the picture changes (debounced), and once on mount.
  useEffect(() => {
    if (!team.shared || !pipe) return;
    const doneSig = steps.map((s) => (s.done ? "1" : "0")).join("");
    const sig = `${doneSig}|${team.onlineCount}`;
    if (sig === lastSig.current) return;
    lastSig.current = sig;
    const t = setTimeout(buildAndRun, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, team.onlineCount, team.shared, pipe, city]);

  if (!team.shared || !pipe) return null;

  const allDone = total > 0 && doneCount === total;

  return (
    <div className="bhumi-jane-rise" style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 14, padding: "16px 18px", marginBottom: 22, position: "relative", overflow: "hidden" }}>
      {/* momentum accent rail */}
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: allDone ? "#2D6B22" : "#9A6A1A" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: allDone ? "#2D6B22" : "#9A6A1A" }}>
            {allDone ? "Sprint complete" : "Live sprint"}
          </span>
          <span style={{ fontSize: 12, color: "#9A968A" }}>· {pipe.title}</span>
        </div>
        <button
          onClick={buildAndRun}
          disabled={loading}
          style={{ border: "1px solid #ECEAE1", background: "#FBFAF5", borderRadius: 20, padding: "4px 12px", fontSize: 11.5, fontWeight: 600, color: "#5A5848", cursor: loading ? "default" : "pointer", fontFamily: "inherit", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Reading the room…" : "Re-plan"}
        </button>
      </div>

      {/* Progress + clock */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1A14" }}>{doneCount}/{total}</span>
        <div style={{ flex: 1, height: 6, background: "#F2F0E8", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: allDone ? "#2D6B22" : "#9A6A1A", borderRadius: 20, transition: "width 400ms cubic-bezier(0.22,0.61,0.36,1)" }} />
        </div>
        <span style={{ fontSize: 11.5, color: "#9A968A", whiteSpace: "nowrap" }}>
          {allDone ? "done" : `~${fmtLeft(remainingMins)} left`}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
        <span style={{ fontSize: 11, color: "#A8A496" }}>
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · {team.onlineCount > 1 ? `${team.onlineCount} on the crew` : "1 on the crew"}
        </span>
      </div>

      {/* Jane's call */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#2D6B22" }}>Jane</span>
        <span style={{ fontSize: 12, color: "#9A968A" }}>· the call</span>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#1A1A14", margin: 0, whiteSpace: "pre-wrap" }}>
        {plan || "Jane's lining up the crew…"}
      </p>
    </div>
  );
}
