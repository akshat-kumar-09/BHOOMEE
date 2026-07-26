import { useState } from "react";
import BrandHeader from "../components/BrandHeader.jsx";
import { LIBRARY, LIBRARY_TYPES } from "../data/library.js";

const TYPE_LABEL = {
  documentary: "Documentary",
  essay: "Essay",
  video: "Video",
  article: "Article",
};

const TYPE_ICON = {
  documentary: "▶",
  essay: "✎",
  video: "▶",
  article: "▤",
};

export default function Library() {
  const [filter, setFilter] = useState("all");
  const items = filter === "all" ? LIBRARY : LIBRARY.filter((i) => i.type === filter);

  return (
    <div className="bhumi-page">
      <BrandHeader subtitle="What's actually going on, from the people who did the work" />

      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 20, paddingBottom: 2 }}>
        <FilterChip label="All" active={filter === "all"} onClick={() => setFilter("all")} />
        {LIBRARY_TYPES.map((t) => (
          <FilterChip key={t} label={TYPE_LABEL[t] + "s"} active={filter === t} onClick={() => setFilter(t)} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => (
          <a
            key={item.title}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bhumi-rise"
            style={{
              display: "block",
              background: "#FFFFFF",
              border: "1px solid #ECEAE1",
              borderRadius: 14,
              padding: "14px 16px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: "#2D6B22" }}>{TYPE_ICON[item.type]}</span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#9A968A" }}>
                {TYPE_LABEL[item.type]}
              </span>
              <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 20, background: "#F7F5EE", color: "#8A8678" }}>
                {item.tag}
              </span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1A1A14", marginBottom: 3, letterSpacing: "-0.01em" }}>
              {item.title}
            </div>
            <div style={{ fontSize: 12, color: "#9A968A", marginBottom: 7 }}>{item.creator}</div>
            <p style={{ fontSize: 13.5, color: "#4A483A", lineHeight: 1.55, margin: 0 }}>{item.blurb}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        border: active ? "1px solid #2D6B22" : "1px solid #ECEAE1",
        background: active ? "#EAF2E5" : "#FFFFFF",
        color: active ? "#2D6B22" : "#5A5848",
        fontSize: 12.5,
        fontWeight: 600,
        borderRadius: 999,
        padding: "7px 14px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
