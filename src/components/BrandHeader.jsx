/* Bhoomee brand mark. The body is Bhoomee; the voice is Jane. */
export default function BrandHeader({ subtitle = "The Earth has work for you" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 20 }}>
      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#EAF2E5", border: "1px solid #C9E0B5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
        🌍
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: "#1A1A14", lineHeight: 1, letterSpacing: "-0.01em" }}>Bh∞mee</div>
        <div style={{ fontSize: 12, color: "#9A968A", marginTop: 2 }}>{subtitle}</div>
      </div>
    </div>
  );
}
