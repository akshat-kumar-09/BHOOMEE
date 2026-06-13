export default function ScoreBreakdown({ score, compact }) {
  const parts = [
    { label: "Earth", val: score.earth, color: "#2D6B22" },
    { label: "People", val: score.people, color: "#1E5F8C" },
    { label: "Momentum", val: score.momentum, color: "#9A6A1A" },
  ];
  return (
    <div style={{ display: "flex", gap: compact ? 12 : 18 }}>
      {parts.map((p) => (
        <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: compact ? 13 : 15, fontWeight: 600, color: p.color }}>{p.val}</span>
          <span style={{ fontSize: 11, color: "#9A968A" }}>{p.label}</span>
        </div>
      ))}
    </div>
  );
}
