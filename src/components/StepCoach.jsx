import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { coachJane, janeIsLive } from "../lib/jane.js";
import { useApp } from "../context/AppContext.jsx";
import { CITIES, USER_CITY } from "../data/cities.js";

const MAX_IMAGES = 6;
const MEDIA_ACCEPT = "image/*,video/*,.heic,.heif";

// Downscales on-device before upload. Uses createImageBitmap when available
// so iPad HEIC photos (the default Camera format) still go through.
function resizeImage(file, maxDim = 1280, quality = 0.82) {
  return decodeToBitmap(file).then((bitmap) => {
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
    if (typeof bitmap.close === "function") bitmap.close();
    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    return { dataUrl, base64: dataUrl.split(",")[1], mediaType: "image/jpeg", kind: "image" };
  });
}

function decodeToBitmap(file) {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file).catch(() => decodeViaImageElement(file));
  }
  return decodeViaImageElement(file);
}

function decodeViaImageElement(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn't read that photo"));
    };
    img.src = url;
  });
}

// Claude accepts images, not video files — pull a still from the clip so the
// user can still send what they filmed on iPad.
function frameFromVideo(file, maxDim = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");

    const fail = (err) => {
      URL.revokeObjectURL(url);
      reject(err instanceof Error ? err : new Error("Couldn't read that video"));
    };

    video.onloadeddata = () => {
      const seekTo = Math.min(0.25, (video.duration || 1) / 2);
      const capture = () => {
        try {
          const scale = Math.min(1, maxDim / Math.max(video.videoWidth || 1, video.videoHeight || 1));
          const w = Math.max(1, Math.round((video.videoWidth || 640) * scale));
          const h = Math.max(1, Math.round((video.videoHeight || 480) * scale));
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(video, 0, 0, w, h);
          URL.revokeObjectURL(url);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve({
            dataUrl,
            base64: dataUrl.split(",")[1],
            mediaType: "image/jpeg",
            kind: "video",
            label: file.name || "video",
          });
        } catch (err) {
          fail(err);
        }
      };
      if (seekTo > 0 && Number.isFinite(video.duration)) {
        video.onseeked = capture;
        try {
          video.currentTime = seekTo;
        } catch {
          capture();
        }
      } else {
        capture();
      }
    };
    video.onerror = fail;
    video.src = url;
  });
}

async function prepareMedia(file) {
  if (file.type.startsWith("video/")) return frameFromVideo(file);
  return resizeImage(file);
}

const timeOf = (at) => new Date(at || Date.now()).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

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
  const { profile, cityId, getChat, setChat } = useApp();
  const city = CITIES.find((c) => c.id === (cityId || USER_CITY));
  const cityName = city?.name || "your city";

  // Keyed by the step's own action text, so the same mission's conversation
  // survives closing this panel, or navigating away and back to the page
  // that opened it (both of which unmount this component).
  const chatKey = step.action;
  const seed = { role: "user", hidden: true, content: `I'm ready to do this now. Walk me through "${step.action}", fast.`, at: Date.now() };
  const cached = getChat(chatKey);
  const [messages, setMessages] = useState(cached || [seed]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(!cached);
  const [pendingImages, setPendingImages] = useState([]); // [{ dataUrl, base64, mediaType, kind }]
  const [attachError, setAttachError] = useState("");
  const listRef = useRef(null);
  const startedRef = useRef(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const attachImages = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setAttachError("");
    const room = MAX_IMAGES - pendingImages.length;
    const slice = files.slice(0, Math.max(room, 0));
    const results = await Promise.allSettled(slice.map(prepareMedia));
    const ok = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
    const failed = results.length - ok.length;
    if (ok.length) setPendingImages((prev) => [...prev, ...ok]);
    if (failed) setAttachError(failed === results.length ? "Couldn't attach that media — try a photo or a shorter clip." : "Some files couldn't be attached.");
  };

  const removeImage = (idx) => setPendingImages((prev) => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    if (cached) { setLoading(false); return; } // resuming — Jane already opened this one
    (async () => {
      const reply = await coachJane({ history: [seed], step, cityName, profile });
      setMessages((prev) => [...prev, { role: "assistant", content: reply, at: Date.now() }]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setChat(chatKey, messages);
  }, [messages, chatKey, setChat]);

  // Scroll only the conversation pane — never the page. scrollIntoView on
  // iPad Safari often shifts the whole fixed sheet so the composer drops
  // under the tab bar / below the visible viewport.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, loading, pendingImages]);

  // Auto-grow the composer, WhatsApp-style, up to ~5 lines.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 112) + "px";
  }, [input]);

  // Hide the tab bar + lock scroll for the life of this sheet. On iPad
  // (especially landscape / installed PWA) the fixed tab bar otherwise
  // paints over the reply row even when the sheet is portaled.
  useEffect(() => {
    document.body.classList.add("bhumi-jane-open");
    return () => { document.body.classList.remove("bhumi-jane-open"); };
  }, []);

  const canSend = (input.trim() || pendingImages.length > 0) && !loading;

  const send = async () => {
    const text = input.trim();
    if (!canSend) return;

    const hasVideo = pendingImages.some((p) => p.kind === "video");
    const fallbackText = hasVideo
      ? "Here's a still from the video I just took."
      : "Here's what I've got.";

    const content = pendingImages.length
      ? [
          ...pendingImages.map((img) => ({ type: "image", source: { type: "base64", media_type: img.mediaType, data: img.base64 } })),
          { type: "text", text: text || fallbackText },
        ]
      : text;

    const history = [...messages, { role: "user", content, displayText: text, displayImages: pendingImages.map((p) => p.dataUrl), at: Date.now() }];
    setMessages(history);
    setInput("");
    setPendingImages([]);
    setAttachError("");
    setLoading(true);
    const reply = await coachJane({ history, step, cityName, profile });
    setMessages((prev) => [...prev, { role: "assistant", content: reply, at: Date.now() }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const visible = messages.filter((m) => !m.hidden);

  // Portal to <body> so the sheet isn't trapped under Home's stacking
  // context — on iPad the tab bar was painting over the reply/composer row.
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,26,20,0.45)",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bhumi-jane-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Jane"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          margin: "0 auto",
          width: "100%",
          maxWidth: 680,
          // Fill almost the whole screen so the composer is never below the fold —
          // portrait or landscape.
          top: "max(8px, env(safe-area-inset-top, 0px))",
          display: "grid",
          gridTemplateRows: "auto minmax(0, 1fr) auto",
          background: "#EFEAE0",
          borderRadius: "18px 18px 0 0",
          border: "1px solid #ECEAE1",
          borderBottom: "none",
          overflow: "hidden",
          boxShadow: "0 -8px 28px -10px rgba(28,23,16,0.35)",
        }}
      >
        {/* Header */}
        <div style={{ padding: "14px 18px 12px", borderBottom: "1px solid #E4DFD1", display: "flex", alignItems: "flex-start", gap: 12, background: "#FAF8F2" }}>
          <div
            style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0, marginTop: 1,
              background: `${color}1c`, display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 14, color,
            }}
          >
            J
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 1 }}>
              <span style={{ fontWeight: 600, color: "#1A1A14", fontSize: 13.5 }}>Jane</span>
              {step.time && <span style={{ marginLeft: "auto", fontSize: 11, color: "#8A8678", background: "#F2F0E8", padding: "2px 8px", borderRadius: 20, flexShrink: 0 }}>{step.time}</span>}
            </div>
            <div style={{ fontSize: 12.5, color: "#8A8678", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{step.action}</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2, color: "#9A968A", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={listRef}
          className="bhumi-no-scrollbar"
          style={{ minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "14px 14px 6px", display: "flex", flexDirection: "column", gap: 8 }}
        >
          {visible.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="bhumi-rise" style={{ alignSelf: "flex-end", maxWidth: "80%", background: "#DDF3C8", borderRadius: "13px 13px 3px 13px", padding: m.displayImages?.length ? 5 : "8px 11px", boxShadow: "0 1px 1px rgba(0,0,0,0.06)" }}>
                {m.displayImages?.length > 0 && <ImageGrid images={m.displayImages} />}
                {(!m.displayImages?.length || m.displayText) && (
                  <div style={{ padding: m.displayImages?.length ? "5px 6px 2px" : 0, display: "flex", alignItems: "flex-end", gap: 8 }}>
                    <span style={{ fontSize: 14, color: "#2B2B1F", lineHeight: 1.45, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{m.displayImages?.length ? m.displayText : m.content}</span>
                    <span style={{ fontSize: 10, color: "#7A8A6A", flexShrink: 0, marginLeft: "auto" }}>{timeOf(m.at)}</span>
                  </div>
                )}
                {m.displayImages?.length > 0 && !m.displayText && (
                  <div style={{ padding: "0 6px 2px", textAlign: "right" }}>
                    <span style={{ fontSize: 10, color: "#7A8A6A" }}>{timeOf(m.at)}</span>
                  </div>
                )}
              </div>
            ) : (
              <div key={i} className="bhumi-jane-rise" style={{ alignSelf: "flex-start", maxWidth: "84%", background: "#FFFFFF", borderRadius: "13px 13px 13px 3px", padding: "9px 12px", boxShadow: "0 1px 1px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  <p style={{ margin: 0, fontSize: 14, color: "#2B2B1F", lineHeight: 1.5 }}>{m.content}</p>
                  <span style={{ fontSize: 10, color: "#A8A496", flexShrink: 0, marginLeft: "auto", whiteSpace: "nowrap" }}>{timeOf(m.at)}</span>
                </div>
              </div>
            )
          )}
          {loading && (
            <div className="bhumi-jane-rise" style={{ alignSelf: "flex-start", background: "#FFFFFF", borderRadius: "13px 13px 13px 3px", padding: "12px 15px", boxShadow: "0 1px 1px rgba(0,0,0,0.06)" }}>
              <TypingDots color={color} />
            </div>
          )}
        </div>

        {/* Composer — grid row 3, always on-screen */}
        <div style={{ padding: "8px 10px calc(12px + env(safe-area-inset-bottom, 0px))", background: "#F0EDE4", borderTop: "1px solid #E4DFD1" }}>
          {!janeIsLive() && (
            <div style={{ fontSize: 11, color: "#B0AC9E", marginBottom: 6, textAlign: "center" }}>Demo mode — add a VITE_ANTHROPIC_API_KEY for the live Jane.</div>
          )}
          {attachError && (
            <div style={{ fontSize: 11, color: "#9A6A1A", marginBottom: 6, textAlign: "center" }}>{attachError}</div>
          )}
          {pendingImages.length > 0 && (
            <div className="bhumi-no-scrollbar" style={{ display: "flex", gap: 8, marginBottom: 8, overflowX: "auto", padding: "2px 2px" }}>
              {pendingImages.map((img, i) => (
                <div key={i} style={{ position: "relative", flexShrink: 0 }}>
                  <img src={img.dataUrl} alt="attached" style={{ width: 62, height: 62, objectFit: "cover", borderRadius: 10, display: "block" }} />
                  {img.kind === "video" && (
                    <span style={{ position: "absolute", left: 4, bottom: 4, fontSize: 9, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.55)", borderRadius: 4, padding: "1px 4px" }}>VIDEO</span>
                  )}
                  <button
                    onClick={() => removeImage(i)}
                    aria-label="Remove attachment"
                    style={{
                      position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%",
                      background: "#1A1A14", border: "2px solid #F0EDE4", color: "#fff", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                  </button>
                </div>
              ))}
              {pendingImages.length < MAX_IMAGES && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Add another photo or video"
                  style={{ width: 62, height: 62, borderRadius: 10, border: "1.5px dashed #C9C5B8", background: "transparent", color: "#9A968A", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>
          )}
          <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
            <input
              ref={fileInputRef}
              type="file"
              accept={MEDIA_ACCEPT}
              multiple
              onChange={attachImages}
              style={{ display: "none" }}
            />
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4, background: "#FFFFFF", borderRadius: 22, padding: "4px 6px 4px 6px", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach photos or videos"
                disabled={pendingImages.length >= MAX_IMAGES}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#8A8678", padding: 7, flexShrink: 0, display: "flex", opacity: pendingImages.length >= MAX_IMAGES ? 0.4 : 1 }}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none"><path d="M21 15v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.7" /><path d="M4 17l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 2v6M15 5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
              </button>
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell Jane what you see…"
                enterKeyHint="send"
                style={{ flex: 1, border: "none", outline: "none", resize: "none", fontSize: 16, padding: "8px 4px", background: "transparent", color: "#1A1A14", fontFamily: "inherit", lineHeight: 1.4, maxHeight: 112 }}
              />
            </div>
            <button
              type="button"
              onClick={send}
              disabled={!canSend}
              aria-label="Send"
              style={{
                width: 44, height: 44, borderRadius: "50%", border: "none", flexShrink: 0,
                background: canSend ? color : "#D8D3C4", color: "white", cursor: canSend ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 19V6M6 11l6-6 6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ImageGrid({ images }) {
  const shown = images.slice(0, 4);
  const extra = images.length - 4;
  const cols = shown.length === 1 ? 1 : 2;
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 3, borderRadius: 9, overflow: "hidden" }}>
      {shown.map((src, i) => (
        <div key={i} style={{ position: "relative", aspectRatio: shown.length === 1 ? "4/3" : "1/1" }}>
          <img src={src} alt="attached" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {i === 3 && extra > 0 && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 17, fontWeight: 700 }}>
              +{extra}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TypingDots({ color }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "3px 2px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6, height: 6, borderRadius: "50%", background: color, opacity: 0.5,
            animation: "bhumi-typing-dot 1.1s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
