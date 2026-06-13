import { useState } from "react";
import BrandHeader from "../components/BrandHeader.jsx";

/* Five tap-only questions — Time, Life, Reach, Comfort, Connections.
   No typing. After Q5, Jane writes a one-line acknowledgment in her
   voice, then routes to Local with calibrated starter tasks. */

const QUESTIONS = [
  { key: "time", label: "Time", prompt: "How much do you actually have each week?", options: ["15 min", "1 hour", "A few hours", "I'm all in"] },
  { key: "life", label: "Life", prompt: "What's your day-to-day right now?", options: ["Student", "Working", "Parent", "Retired", "Mixed"] },
  { key: "reach", label: "Reach", prompt: "Anywhere you can be heard?", options: ["Social media", "Community group", "Blog/newsletter", "None yet"] },
  { key: "comfort", label: "Comfort", prompt: "What feels doable today?", options: ["Just observing", "Posting online", "Writing", "Showing up in person", "All of it"] },
  { key: "connections", label: "Connections", prompt: "Know anyone in…?", sub: "Tap any that apply", options: ["Local government", "Media", "Business", "None — that's fine"], multi: true },
];

function acknowledgment(profile) {
  const time = {
    "15 min": "fifteen minutes a week",
    "1 hour": "an hour a week",
    "A few hours": "a few hours a week",
    "I'm all in": "all in",
  }[profile.time] || "some time";

  const comfort = {
    "Just observing": "happy to watch and document for now",
    "Posting online": "ready to post",
    "Writing": "ready to write",
    "Showing up in person": "ready to show up in person",
    "All of it": "ready for all of it",
  }[profile.comfort] || "ready";

  const reach = profile.reach && profile.reach !== "None yet" ? `, heard through ${profile.reach.toLowerCase()}` : "";

  return `Got it — ${time}${reach}, ${comfort}. I'll start you small and earn the bigger asks. The Earth has work for you, and it begins with one thing you can do this week.`;
}

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const select = (option) => {
    if (q.multi) {
      setAnswers((prev) => {
        const cur = prev[q.key] || [];
        const next = cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option];
        return { ...prev, [q.key]: next };
      });
      return;
    }
    const next = { ...answers, [q.key]: option };
    setAnswers(next);
    if (isLast) setDone(true);
    else setStep(step + 1);
  };

  const continueMulti = () => {
    setAnswers((prev) => ({ ...prev, [q.key]: prev[q.key] || ["None — that's fine"] }));
    setDone(true);
  };

  const profile = answers;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "2rem 1.25rem 3rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <BrandHeader subtitle="Let's tune the work to you" />

        {!done ? (
          <div className="bhumi-page" key={step} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* Progress dots */}
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              {QUESTIONS.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= step ? "#2D6B22" : "#ECEAE1", transition: "background 0.3s" }} />
              ))}
            </div>

            {step === 0 && (
              <div style={{ marginBottom: 22 }}>
                <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
                <p style={{ marginTop: 7, marginBottom: 0, fontSize: 15, color: "#4A483A", lineHeight: 1.6 }}>
                  I'm Jane — the voice of the ground beneath your feet. Five quick taps and I'll know exactly where to start you. No wrong answers.
                </p>
              </div>
            )}

            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 8 }}>
              {q.label}
            </div>
            <h2 style={{ fontSize: 23, fontWeight: 700, color: "#1A1A14", margin: "0 0 4px", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{q.prompt}</h2>
            {q.sub && <div style={{ fontSize: 13, color: "#9A968A", marginBottom: 20 }}>{q.sub}</div>}
            <div style={{ marginTop: q.sub ? 0 : 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((option) => {
                const selected = q.multi ? (answers[q.key] || []).includes(option) : answers[q.key] === option;
                return (
                  <button
                    key={option}
                    onClick={() => select(option)}
                    className="bhumi-rise"
                    style={{
                      textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                      background: selected ? "#EAF2E5" : "#FFFFFF",
                      border: `1px solid ${selected ? "#2D6B22" : "#ECEAE1"}`,
                      borderRadius: 12, padding: "16px 18px", fontSize: 15, fontWeight: 500,
                      color: selected ? "#2D6B22" : "#1A1A14",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      transition: "all 0.2s",
                    }}
                  >
                    <span>{option}</span>
                    {q.multi && (
                      <span style={{ width: 20, height: 20, borderRadius: 6, border: `1.5px solid ${selected ? "#2D6B22" : "#D6D2C8"}`, background: selected ? "#2D6B22" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selected && <svg width="12" height="12" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {q.multi && (
              <button
                onClick={continueMulti}
                style={{ marginTop: 24, padding: "14px 0", border: "none", borderRadius: 12, background: "#2D6B22", color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Continue
              </button>
            )}
          </div>
        ) : (
          <div className="bhumi-page" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="bhumi-jane-rise" style={{ background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 14, padding: "20px 22px", marginBottom: 24 }}>
              <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
              <p style={{ marginTop: 9, marginBottom: 0, fontSize: 16, color: "#4A483A", lineHeight: 1.6 }}>{acknowledgment(profile)}</p>
            </div>
            <button
              onClick={() => onComplete(profile)}
              style={{ padding: "16px 0", border: "none", borderRadius: 12, background: "#2D6B22", color: "white", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Show me where to start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
