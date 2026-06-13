import { useState } from "react";
import BrandHeader from "../components/BrandHeader.jsx";
import { useApp } from "../context/AppContext.jsx";
import { CITIES } from "../data/cities.js";

const cityName = (id) => CITIES.find((c) => c.id === id)?.name || id;

export default function You() {
  const { profile, completedCount, privatePipelines, communityPipelines, proposals, team } = useApp();

  const communityFlat = Object.entries(communityPipelines).flatMap(([cid, pipes]) =>
    pipes.map((p) => ({ ...p, cityId: cid }))
  );

  const rows = profile
    ? [
        { label: "Time", value: profile.time },
        { label: "Life", value: profile.life },
        { label: "Reach", value: profile.reach },
        { label: "Comfort", value: profile.comfort },
        { label: "Connections", value: (profile.connections || []).join(", ") || "None" },
      ]
    : [];

  return (
    <div className="bhumi-page">
      <BrandHeader subtitle="Your work on the ground" />

      {/* Headline numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
        <Stat value={completedCount} label="steps done" />
        <Stat value={privatePipelines.length + communityFlat.length} label="pipelines" />
        <Stat value={proposals.length} label="proposed" />
      </div>

      {/* Team */}
      <SectionLabel>Your team</SectionLabel>
      <TeamSection team={team} />

      {/* Profile */}
      <SectionLabel>Your calibration</SectionLabel>
      <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 14, padding: "6px 18px", marginBottom: 12 }}>
        {profile ? (
          rows.map((r, i) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i > 0 ? "1px solid #F6F4EC" : "none" }}>
              <span style={{ fontSize: 13, color: "#9A968A" }}>{r.label}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1A1A14", textAlign: "right" }}>{r.value}</span>
            </div>
          ))
        ) : (
          <p style={{ fontSize: 14, color: "#8A8678", padding: "14px 0" }}>You haven't calibrated yet.</p>
        )}
      </div>
      <div style={{ marginBottom: 28 }} />

      {/* Pipelines from the Playground */}
      <SectionLabel>Your pipelines</SectionLabel>
      {privatePipelines.length === 0 && communityFlat.length === 0 && proposals.length === 0 ? (
        <EmptyHint />
      ) : (
        <>
          {privatePipelines.map((p) => (
            <PipeRow key={`p-${p.id}`} pipe={p} tag="Private" tagColor="#9A6A1A" tagBg="#F8F0DC" city={p.cityId} />
          ))}
          {communityFlat.map((p) => (
            <PipeRow key={`c-${p.id}`} pipe={p} tag={`Community · ${p.handle}`} tagColor="#1E5F8C" tagBg="#E6EFF6" city={p.cityId} />
          ))}
          {proposals.map((pr, i) => (
            <PipeRow key={`pr-${i}`} pipe={pr.pipe} tag="Proposed · in review" tagColor="#2D6B22" tagBg="#EAF2E5" city={pr.cityId} />
          ))}
        </>
      )}
    </div>
  );
}

function TeamSection({ team }) {
  const [draft, setDraft] = useState(team.name || "");
  const [copied, setCopied] = useState(false);

  const shareLink = (() => {
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("team", team.teamId);
      return u.origin + u.pathname + "?team=" + team.teamId;
    } catch {
      return team.teamId;
    }
  })();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  if (!team.shared) {
    return (
      <div style={{ background: "#FBFAF5", border: "1px dashed #C9C5B8", borderRadius: 14, padding: "16px 18px", marginBottom: 28 }}>
        <div style={{ fontSize: 13.5, color: "#5A5848", lineHeight: 1.6 }}>
          You're working solo on this device. To act together with someone on another phone, deploy with Firebase configured — then you'll both share progress live. (See the README.)
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 14, padding: "16px 18px", marginBottom: 28 }}>
      {/* Your name */}
      <div style={{ fontSize: 12, color: "#9A968A", marginBottom: 7 }}>Your name on the team</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => team.setName(draft)}
          onKeyDown={(e) => e.key === "Enter" && team.setName(draft)}
          placeholder="e.g. Arjun"
          style={{ flex: 1, border: "1px solid #ECEAE1", borderRadius: 10, padding: "10px 12px", fontSize: 14, color: "#1A1A14", fontFamily: "inherit", outline: "none", background: "#FAFAF4" }}
        />
        <button onClick={() => team.setName(draft)} style={{ padding: "0 16px", border: "none", borderRadius: 10, background: "#2D6B22", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Save
        </button>
      </div>

      {/* Members */}
      <div style={{ fontSize: 12, color: "#9A968A", marginBottom: 9 }}>On the team</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {team.members.length === 0 && (
          <span style={{ fontSize: 13, color: "#8A8678" }}>Just you so far. Invite your teammate below.</span>
        )}
        {team.members.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: m.online ? "#2D6B22" : "#C2BEB0", flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1A1A14" }}>{m.name}</span>
            {m.id === team.userId && <span style={{ fontSize: 11, color: "#9A968A" }}>you</span>}
            <span style={{ marginLeft: "auto", fontSize: 11.5, color: m.online ? "#2D6B22" : "#A8A496" }}>{m.online ? "online" : "away"}</span>
          </div>
        ))}
      </div>

      {/* Invite link */}
      <div style={{ fontSize: 12, color: "#9A968A", marginBottom: 7 }}>Invite your teammate</div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0, border: "1px solid #ECEAE1", borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: "#5A5848", background: "#FAFAF4", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {shareLink}
        </div>
        <button onClick={copy} style={{ padding: "0 16px", border: "1px solid #C9E0B5", borderRadius: 10, background: copied ? "#EAF2E5" : "#FFFFFF", color: "#2D6B22", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <div style={{ fontSize: 11, color: "#A8A496", marginTop: 8 }}>Open this link on the other phone to join team “{team.teamId}”.</div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#1A1A14", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#9A968A", marginTop: 6 }}>{label}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A8A496", marginBottom: 12 }}>
      {children}
    </div>
  );
}

function PipeRow({ pipe, tag, tagColor, tagBg, city }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 12, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 13 }}>
      <span style={{ fontSize: 22 }}>{pipe.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: "#1A1A14" }}>{pipe.title}</span>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: tagBg, color: tagColor }}>{tag}</span>
        </div>
        <div style={{ fontSize: 12, color: "#8A8678" }}>{cityName(city)} · {pipe.steps.length} steps</div>
      </div>
    </div>
  );
}

function EmptyHint() {
  return (
    <div style={{ background: "#FBFAF5", border: "1px dashed #C9C5B8", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
      <p style={{ fontSize: 13.5, color: "#8A8678", lineHeight: 1.6, margin: 0 }}>
        Nothing here yet. Open the Playground, notice something, and build your first pipeline with Jane.
      </p>
    </div>
  );
}
