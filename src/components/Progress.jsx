export default function Progress({ done, needed, color }) {
  const pct = Math.min(100, Math.round((done / needed) * 100));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 4, background: "#ECEAE1", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 12, color: "#9A968A", fontVariantNumeric: "tabular-nums", minWidth: 44, textAlign: "right" }}>
        {done}/{needed}
      </span>
    </div>
  );
}
