import { useState } from "react";
import { askJane } from "../lib/jane.js";
import { useApp } from "../context/AppContext.jsx";

/* Ask Jane — sits at the bottom of Local and Global. Renders her reply
   in the cream briefing card style. */
export default function AskJane({ city, scope = "local" }) {
  const { profile } = useApp();
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const placeholder =
    scope === "local" && city ? `Ask Jane about ${city.name}...` : "Ask Jane about the bigger picture...";

  const submit = async () => {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setReply(null);
    setQuestion("");
    const answer = await askJane({ question: q, city, profile, scope });
    setReply(answer);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 26 }}>
      <div style={{ display: "flex", gap: 8, background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: 6, alignItems: "center" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={placeholder}
          style={{ flex: 1, border: "none", outline: "none", fontSize: 14, padding: "8px 12px", background: "transparent", color: "#1A1A14", fontFamily: "inherit", fontWeight: 400 }}
        />
        <button
          onClick={submit}
          style={{ padding: "8px 16px", border: "none", borderRadius: 8, background: "#2D6B22", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", opacity: question.trim() ? 1 : 0.4, transition: "opacity 0.2s", whiteSpace: "nowrap" }}
        >
          Ask Jane
        </button>
      </div>
      {(loading || reply) && (
        <div className="bhumi-jane-rise" style={{ marginTop: 10, background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 12, padding: "14px 18px" }}>
          <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
          <p style={{ marginTop: 7, marginBottom: 0, fontSize: 14, color: loading ? "#A8A496" : "#4A483A", lineHeight: 1.65 }}>
            {loading ? "listening..." : reply}
          </p>
        </div>
      )}
    </div>
  );
}
