import { useEffect, useState, useCallback, useRef } from "react";
import { useApp } from "../context/AppContext.jsx";
import { coordinateJane } from "../lib/jane.js";

/* Jane runs point for the duo. She reads the live team state — who's
   online, which sprint steps are done and by whom, and the clock — and
   actively divides the next moves, calls the handoff, and reads the pace.
   Only shows when the team is live and there's a mission to coordinate. */

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

export default function CrewPlan({ pipe, city }) {
  const { team, completed, completedBy, profile } = useApp();
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const lastSig = useRef("");

  const buildAndRun = useCallback(async () => {
    if (!pipe || !city) return;
    const steps = pipe.steps.map((s, i) => {
      const key = `${city.id}-${pipe.id}-${i}`;
      return { action: s.action, time: s.time, done: !!completed[key], by: completedBy[key] || null };
    });
    const remainingMins = steps.filter((s) => !s.done).reduce((sum, s) => sum + minutesOf(s.time), 0);
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
  }, [pipe, city, completed, completedBy, team, profile]);

  // Auto-replan when the picture changes (debounced), and once on mount.
  useEffect(() => {
    if (!team.shared || !pipe) return;
    const doneSig = pipe.steps.map((_, i) => (completed[`${city.id}-${pipe.id}-${i}`] ? "1" : "0")).join("");
    const sig = `${doneSig}|${team.onlineCount}`;
    if (sig === lastSig.current) return;
    lastSig.current = sig;
    const t = setTimeout(buildAndRun, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, team.onlineCount, team.shared, pipe, city]);

  if (!team.shared || !pipe) return null;

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 14, padding: "16px 18px", marginBottom: 22, animation: "fadeUp 280ms ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#9A6A1A" }}>Jane</span>
          <span style={{ fontSize: 12, color: "#9A968A" }}>· crew plan</span>
        </div>
        <button
          onClick={buildAndRun}
          disabled={loading}
          style={{ border: "1px solid #ECEAE1", background: "#FBFAF5", borderRadius: 20, padding: "4px 12px", fontSize: 11.5, fontWeight: 600, color: "#5A5848", cursor: loading ? "default" : "pointer", fontFamily: "inherit", opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Reading the room…" : "Re-plan"}
        </button>
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#1A1A14", margin: 0, whiteSpace: "pre-wrap" }}>
        {plan || "Jane's lining up the crew…"}
      </p>
      <div style={{ fontSize: 11, color: "#A8A496", marginTop: 10 }}>
        {team.onlineCount > 1 ? `Coordinating ${team.onlineCount} of you, live` : "You're the only one online — Jane plans for when your crew joins"}
      </div>
    </div>
  );
}
