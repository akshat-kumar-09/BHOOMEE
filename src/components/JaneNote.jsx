/* Jane's signature note — the small green-tagged italic line that
   appears under steps and in briefings throughout Bhoomee. */

export default function JaneNote({ children, tone = "step" }) {
  if (tone === "step") {
    return (
      <div style={{ marginTop: 10, background: "#FAFAF4", borderRadius: 8, padding: "9px 13px", fontSize: 12.5, color: "#5A5848", lineHeight: 1.5 }}>
        <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 11.5 }}>Jane</span>
        <span style={{ color: "#D6D2C8", margin: "0 6px" }}>·</span>
        <span style={{ fontStyle: "italic" }}>{children}</span>
      </div>
    );
  }
  // tone === "card" — the larger cream briefing card
  return (
    <div style={{ background: "#F7F5EE", border: "1px solid #ECEAE1", borderRadius: 12, padding: "14px 18px" }}>
      <span style={{ fontWeight: 600, color: "#2D6B22", fontSize: 13 }}>Jane</span>
      <p style={{ marginTop: 7, marginBottom: 0, fontSize: 14, color: "#4A483A", lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}
