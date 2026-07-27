/* Bhoomee brand mark. The body is Bhoomee; the voice is Jane. */
export default function BrandHeader({ subtitle = "The Earth has work for you" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 22 }}>
      <div
        style={{
          width: 46, height: 46, borderRadius: "50%", flexShrink: 0,
          background: "radial-gradient(circle at 32% 28%, #F3D6A8, #E5A15B 55%, #C97A38 100%)",
          boxShadow: "0 3px 8px -2px rgba(197,122,56,0.55), inset 0 1px 1px rgba(255,255,255,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21,
        }}
      >
        🌍
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="bhumi-display" style={{ fontSize: 25, color: "#1C1710", lineHeight: 1, letterSpacing: "-0.01em" }}>Bh∞mee</div>
        <div style={{ fontSize: 12.5, color: "#8A7F68", marginTop: 4, fontWeight: 500 }}>{subtitle}</div>
      </div>
    </div>
  );
}
