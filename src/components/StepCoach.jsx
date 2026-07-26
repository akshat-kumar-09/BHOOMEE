import { useState, useRef, useEffect } from "react";
import { coachJane, janeIsLive } from "../lib/jane.js";
import { useApp } from "../context/AppContext.jsx";
import { CITIES, USER_CITY } from "../data/cities.js";

// Downscales on-device before it ever leaves the phone — mission photos are
// often taken on data out in the field, so keep the upload small.
function resizeImage(file, maxDim = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve({ dataUrl, base64: dataUrl.split(",")[1], mediaType: "image/jpeg" });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* StepCoach — a small "Do it with Jane" button under any action step.
   Tapping it opens a focused, real-time coaching conversation where
   Jane walks the user through performing that exact action, fast. */
export default function StepCoach({ step, color = "#2D6B22" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          marginTop: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 12,
          fontWeight: 600,
          color,
          background: "transparent",
          border: `1px solid ${color}33`,
          borderRadius: 20,
          padding: "5px 12px",
          transition: "all 0.2s",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        Do it with Jane
      </button>
      {open && <ActionCoach step={step} color={color} onClose={() => setOpen(false)} />}
    </>
  );
}

function ActionCoach({ step, color, onClose }) {
  const { profile, cityId } = useApp();
  const city = CITIES.find((c) => c.id === (cityId || USER_CITY));
  const cityName = city?.name || "your city";

  const seed = { role: "user", hidden: true, content: `I'm ready to do this now. Walk me through "${step.action}", fast.` };
  const [messages, setMessages] = useState([seed]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [pendingImage, setPendingImage] = useState(null); // { dataUrl, base64, mediaType }
  const bottomRef = useRef(null);
  const startedRef = useRef(false);
  const fileInputRef = useRef(null);

  const attachImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const img = await resizeImage(file);
    setPendingImage(img);
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    (async () => {
      const reply = await coachJane({ history: [seed], step, cityName, profile });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if ((!text && !pendingImage) || loading) return;

    const content = pendingImage
      ? [
          { type: "image", source: { type: "base64", media_type: pendingImage.mediaType, data: pendingImage.base64 } },
          { type: "text", text: text || "Here's what I've got." },
        ]
      : text;

    const history = [...messages, { role: "user", content, displayText: text, displayImage: pendingImage?.dataUrl }];
    setMessages(history);
    setInput("");
    setPendingImage(null);
    setLoading(true);
    const reply = await coachJane({ history, step, cityName, profile });
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const visible = messages.filter((m) => !m.hidden);

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(26,26,20,0.34)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 70 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bhumi-jane-rise"
        style={{
          width: "100%",
          maxWidth: 680,
          maxHeight: "82vh",
          background: "#FAF8F2",
          borderRadius: "18px 18px 0 0",
          border: "1px solid #ECEAE1",
          borderBottom: "none",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #ECEAE1", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontWeight: 600, color, fontSize: 11.5 }}>Jane</span>
              <span style={{ color: "#C9C5B8", fontSize: 11 }}>·</span>
              <span style={{ fontSize: 11, color: "#9A968A" }}>doing it with you</span>
              {step.time && <span style={{ marginLeft: "auto", fontSize: 11, color: "#8A8678", background: "#F2F0E8", padding: "2px 8px", borderRadius: 20 }}>{step.time}</span>}
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: "#1A1A14", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{step.action}</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2, color: "#9A968A", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Conversation */}
        <div className="bhumi-no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
          {visible.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="bhumi-rise" style={{ alignSelf: "flex-end", maxWidth: "82%", background: "#F1ECDD", border: "1px solid #E6DFCB", borderRadius: "14px 14px 4px 14px", padding: m.displayImage ? 6 : "11px 15px", fontSize: 14, color: "#3A3829", lineHeight: 1.5 }}>
                {m.displayImage && (
                  <img src={m.displayImage} alt="attached" style={{ display: "block", width: "100%", maxWidth: 220, borderRadius: 9, marginBottom: m.displayText ? 8 : 0 }} />
                )}
                {m.displayImage ? (m.displayText && <div style={{ padding: "0 9px 6px" }}>{m.displayText}</div>) : m.content}
              </div>
            ) : (
              <div key={i} className="bhumi-jane-rise" style={{ alignSelf: "flex-start", maxWidth: "90%", background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: "14px 14px 14px 4px", padding: "12px 15px" }}>
                <span style={{ fontWeight: 600, color, fontSize: 11.5 }}>Jane</span>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "#4A483A", lineHeight: 1.6 }}>{m.content}</p>
              </div>
            )
          )}
          {loading && (
            <div className="bhumi-jane-rise" style={{ alignSelf: "flex-start", background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: "14px 14px 14px 4px", padding: "12px 15px" }}>
              <span style={{ fontWeight: 600, color, fontSize: 11.5 }}>Jane</span>
              <p style={{ margin: "6px 0 0", fontSize: 14, color: "#A8A496", lineHeight: 1.6, fontStyle: "italic" }}>working out your first move…</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Composer */}
        <div style={{ padding: "10px 14px calc(14px + env(safe-area-inset-bottom, 0px))", borderTop: "1px solid #ECEAE1", background: "#FAF8F2" }}>
          {!janeIsLive() && (
            <div style={{ fontSize: 11, color: "#B0AC9E", marginBottom: 8, textAlign: "center" }}>Demo mode — add a VITE_ANTHROPIC_API_KEY for the live Jane.</div>
          )}
          {pendingImage && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 10, padding: 6 }}>
              <img src={pendingImage.dataUrl} alt="attached" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6 }} />
              <span style={{ fontSize: 12, color: "#8A8678", flex: 1 }}>Photo attached</span>
              <button onClick={() => setPendingImage(null)} aria-label="Remove photo" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9A968A", padding: 4 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: 6, alignItems: "center" }}>
            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={attachImage} style={{ display: "none" }} />
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach a photo"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8A8678", padding: "6px 4px 6px 6px", flexShrink: 0, display: "flex" }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M21 15v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.7" /><path d="M4 17l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 2v6M15 5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Tell Jane what you see…"
              style={{ flex: 1, border: "none", outline: "none", fontSize: 14, padding: "8px 12px", background: "transparent", color: "#1A1A14", fontFamily: "inherit" }}
            />
            <button
              onClick={send}
              style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: color, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: (input.trim() || pendingImage) ? 1 : 0.4, transition: "opacity 0.2s", whiteSpace: "nowrap" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
