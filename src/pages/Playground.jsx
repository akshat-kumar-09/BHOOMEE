import { useState, useRef, useEffect } from "react";
import Progress from "../components/Progress.jsx";
import JaneNote from "../components/JaneNote.jsx";
import { playgroundReply, parseSteps, janeIsLive } from "../lib/jane.js";
import { useApp } from "../context/AppContext.jsx";

const CHIPS = ["I saw something broken", "I have an idea", "Help me design an action"];
const PROMPTS = ["What did you notice today?", "What if everyone on your street…?"];
const ICONS = ["🌿", "💧", "🌊", "🌡️", "🫁", "🔥", "🌳", "♻️", "🐦", "✦"];

function slug(s) {
  return (s || "draft").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32) || "draft";
}

export default function Playground({ city, onBack, onSaved }) {
  const { profile, savePrivate, shareWithCity, proposeToBhumi, completed, toggleStep } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(null); // { title, subtitle, icon, color, steps:[] }
  const [confirmPropose, setConfirmPropose] = useState(false);
  const [savedNote, setSavedNote] = useState(null);

  const [prompt] = useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const canvasRef = useRef(null);
  const bottomRef = useRef(null);

  const handle = "@" + (profile?.life ? profile.life.toLowerCase().replace(/\s+/g, "") : "you");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg = { role: "user", content };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    const reply = await playgroundReply({ history, city, profile });
    const { clean, steps } = parseSteps(reply);

    setMessages((prev) => [...prev, { role: "assistant", content: clean || "Let's keep sharpening — tell me more." }]);

    if (steps.length > 0) {
      setDraft((prev) => {
        const base = prev || {
          title: deriveTitle(history),
          subtitle: "",
          icon: "🌿",
          color: "#2D6B22",
          steps: [],
        };
        return { ...base, steps: [...base.steps, ...steps] };
      });
    }
    setLoading(false);
  };

  const buildPipe = () => ({
    id: slug(draft.title) + "-" + Math.random().toString(36).slice(2, 6),
    title: draft.title || "Untitled pipeline",
    subtitle: draft.subtitle || "A community-designed action.",
    icon: draft.icon,
    color: draft.color,
    peopleActive: 1,
    steps: draft.steps,
  });

  const doSavePrivate = () => {
    const pipe = buildPipe();
    savePrivate(pipe, city.id);
    onSaved?.();
  };

  const doShare = () => {
    const pipe = buildPipe();
    shareWithCity(pipe, city.id, handle);
    setSavedNote(`Shared with ${city.name}. It now shows for everyone as Community · ${handle}.`);
  };

  const doPropose = () => {
    const pipe = buildPipe();
    proposeToBhumi(pipe, city.id, handle);
    setConfirmPropose(false);
    setSavedNote("Submitted to Bhumi's team for review. If it lands, it joins your city's official 333 plan.");
  };

  const canSave = draft && draft.steps.length >= 2;
  const cityKeyId = "draft";

  return (
    <div className="bhumi-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center", color: "#5A5848" }} aria-label="Back to Local">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1A14", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Playground</div>
          <div style={{ fontSize: 12, color: "#9A968A", marginTop: 2 }}>Brainstorm with Jane. Build something real.</div>
        </div>
      </div>

      {/* Live pipeline draft — sticky once it forms */}
      {draft && (
        <div style={{ position: "sticky", top: 0, zIndex: 20, paddingBottom: 12, background: "linear-gradient(#FAF8F2 78%, rgba(250,248,242,0))" }}>
          <DraftCard draft={draft} setDraft={setDraft} completed={completed} toggleStep={toggleStep} cityKeyId={cityKeyId} />
        </div>
      )}

      {/* Canvas */}
      <div ref={canvasRef} style={{ flex: 1, paddingBottom: 8 }}>
        {messages.length === 0 ? (
          <EmptyState prompt={prompt} onChip={(c) => send(c)} live={janeIsLive()} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="bhumi-rise" style={{ alignSelf: "flex-end", maxWidth: "82%", background: "#F1ECDD", border: "1px solid #E6DFCB", borderRadius: "14px 14px 4px 14px", padding: "11px 15px", fontSize: 14, color: "#3A3829", lineHeight: 1.5 }}>
                  {m.content}
                </div>
              ) : (
                <div key={i} className="bhumi-jane-rise" style={{ alignSelf: "flex-start", maxWidth: "88%", background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: "14px 14px 14px 4px", padding: "12px 15px" }}>
                  <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 11.5 }}>Jane</span>
                  <p style={{ margin: "6px 0 0", fontSize: 14, color: "#4A483A", lineHeight: 1.6 }}>{m.content}</p>
                </div>
              )
            )}
            {loading && (
              <div className="bhumi-jane-rise" style={{ alignSelf: "flex-start", background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: "14px 14px 14px 4px", padding: "12px 15px" }}>
                <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 11.5 }}>Jane</span>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "#A8A496", lineHeight: 1.6, fontStyle: "italic" }}>thinking it through…</p>
              </div>
            )}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Sticky footer — save tray + composer, lifted above the tab bar */}
      <div style={{ position: "sticky", bottom: "calc(62px + env(safe-area-inset-bottom, 0px))", background: "#FAF8F2", paddingTop: 10 }}>
        {canSave && (
          <div className="bhumi-rise" style={{ marginBottom: 10 }}>
            {savedNote ? (
              <div style={{ background: "#EAF2E5", border: "1px solid #C9E0B5", borderRadius: 12, padding: "13px 16px", fontSize: 13.5, color: "#2D6B22", lineHeight: 1.5 }}>
                {savedNote}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <TrayButton onClick={doSavePrivate} primary>Save privately</TrayButton>
                <TrayButton onClick={doShare}>Share with my city</TrayButton>
                <TrayButton onClick={() => setConfirmPropose(true)}>Propose to Bhumi</TrayButton>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: 6, alignItems: "center" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Tell Jane what you noticed…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, padding: "8px 12px", background: "transparent", color: "#1A1A14", fontFamily: "inherit" }}
          />
          <button
            onClick={() => send()}
            style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: "#2D6B22", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: input.trim() ? 1 : 0.4, transition: "opacity 0.2s", whiteSpace: "nowrap" }}
          >
            Send
          </button>
        </div>
      </div>

      {confirmPropose && (
        <ConfirmDialog
          onCancel={() => setConfirmPropose(false)}
          onConfirm={doPropose}
          city={city}
        />
      )}
    </div>
  );
}

function deriveTitle(history) {
  const first = history.find((m) => m.role === "user");
  if (!first) return "New pipeline";
  const words = first.content.split(/\s+/).slice(0, 5).join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function EmptyState({ prompt, onChip, live }) {
  return (
    <div className="bhumi-jane-rise" style={{ paddingTop: 8 }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 16, padding: "24px 22px", textAlign: "center" }}>
        <div style={{ fontSize: 26, marginBottom: 10 }}>✦</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#1A1A14", marginBottom: 8, letterSpacing: "-0.01em" }}>{prompt}</div>
        <p style={{ fontSize: 13.5, color: "#8A8678", lineHeight: 1.6, margin: "0 auto", maxWidth: 360 }}>
          Tell Jane something you saw, or an idea you've been turning over. She'll help you sharpen it into a real, doable pipeline for your city.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 18 }}>
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => onChip(c)}
              style={{ cursor: "pointer", fontFamily: "inherit", background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 20, padding: "8px 14px", fontSize: 13, fontWeight: 500, color: "#5A5848", transition: "all 0.2s" }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      {!live && (
        <p style={{ fontSize: 11.5, color: "#B0AC9E", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Running in demo mode — add a VITE_ANTHROPIC_API_KEY for the live Jane.
        </p>
      )}
    </div>
  );
}

function DraftCard({ draft, setDraft, completed, toggleStep, cityKeyId }) {
  const [editing, setEditing] = useState(false);
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #C9C5B8", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A6A1A", background: "#F8F0DC", padding: "3px 8px", borderRadius: 20 }}>Draft</span>
          <span style={{ fontSize: 11, color: "#9A968A" }}>{draft.steps.length} step{draft.steps.length === 1 ? "" : "s"} so far</span>
          <button onClick={() => setEditing((e) => !e)} style={{ marginLeft: "auto", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600, color: "#2D6B22" }}>
            {editing ? "Done" : "Edit"}
          </button>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {editing ? (
            <select value={draft.icon} onChange={(e) => set({ icon: e.target.value })} style={{ fontSize: 22, border: "1px solid #ECEAE1", borderRadius: 8, background: "#FAFAF4", cursor: "pointer", padding: "2px 4px", fontFamily: "inherit" }}>
              {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          ) : (
            <span style={{ fontSize: 24, lineHeight: 1.1 }}>{draft.icon}</span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            {editing ? (
              <>
                <input value={draft.title} onChange={(e) => set({ title: e.target.value })} placeholder="Pipeline title"
                  style={{ width: "100%", border: "1px solid #ECEAE1", borderRadius: 8, padding: "6px 9px", fontSize: 15, fontWeight: 600, color: "#1A1A14", fontFamily: "inherit", marginBottom: 6, outline: "none" }} />
                <input value={draft.subtitle} onChange={(e) => set({ subtitle: e.target.value })} placeholder="The why — one line"
                  style={{ width: "100%", border: "1px solid #ECEAE1", borderRadius: 8, padding: "6px 9px", fontSize: 12.5, color: "#8A8678", fontFamily: "inherit", outline: "none" }} />
              </>
            ) : (
              <>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A14", marginBottom: 2 }}>{draft.title || "Untitled pipeline"}</div>
                <div style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.4 }}>{draft.subtitle || "Jane is still shaping the why…"}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #F2F0E8", padding: "10px 16px 14px", maxHeight: 230, overflowY: "auto" }} className="bhumi-no-scrollbar">
        {draft.steps.map((step, i) => {
          const key = `${cityKeyId}-${i}`;
          const done = completed[key];
          return (
            <div key={i} className="bhumi-rise" style={{ padding: "11px 0", borderTop: i > 0 ? "1px solid #F6F4EC" : "none", opacity: done ? 0.5 : 1 }}>
              <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <button onClick={() => toggleStep(key)} style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, padding: 0, border: done ? "none" : "1.5px solid #D6D2C8", cursor: "pointer", background: done ? draft.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {done && <svg className="bhumi-grow" width="12" height="12" viewBox="0 0 14 14"><path d="M3 7l3 3 5-5.5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1A14", textDecoration: done ? "line-through" : "none" }}>{step.action}</span>
                    <span style={{ fontSize: 10.5, color: "#8A8678", background: "#F2F0E8", padding: "2px 7px", borderRadius: 20 }}>{step.time}</span>
                  </div>
                  {step.detail && <p style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.5, margin: "0 0 8px" }}>{step.detail}</p>}
                  <Progress done={step.peopleDone ?? 0} needed={step.peopleNeeded} color={draft.color} />
                  {step.jane && <JaneNote>{step.jane}</JaneNote>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrayButton({ children, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600,
        padding: "11px 6px", borderRadius: 10, transition: "all 0.2s", lineHeight: 1.2,
        background: primary ? "#2D6B22" : "#FFFFFF",
        color: primary ? "#FFFFFF" : "#2D6B22",
        border: primary ? "none" : "1px solid #C9E0B5",
      }}
    >
      {children}
    </button>
  );
}

function ConfirmDialog({ onCancel, onConfirm, city }) {
  return (
    <div onClick={onCancel} style={{ position: "fixed", inset: 0, background: "rgba(26,26,20,0.32)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 60 }}>
      <div onClick={(e) => e.stopPropagation()} className="bhumi-jane-rise" style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 16, padding: "22px 22px", maxWidth: 380, width: "100%" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A14", marginBottom: 8 }}>Propose to Bhumi?</div>
        <p style={{ fontSize: 13.5, color: "#5A5848", lineHeight: 1.6, margin: "0 0 18px" }}>
          This will be reviewed by Bhumi's team and may become an official pipeline in {city.name}'s 333 plan. Continue?
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCancel} style={{ flex: 1, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "11px 0", borderRadius: 10, background: "#F7F5EE", border: "1px solid #ECEAE1", color: "#5A5848" }}>
            Not yet
          </button>
          <button onClick={onConfirm} style={{ flex: 1, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "11px 0", borderRadius: 10, background: "#2D6B22", border: "none", color: "#FFFFFF" }}>
            Yes, propose it
          </button>
        </div>
      </div>
    </div>
  );
}
