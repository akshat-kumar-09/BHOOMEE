import { useApp } from "../context/AppContext.jsx";

/* A compact presence strip — shows who's on the team right now.
   When Firebase isn't configured it shows a quiet "solo" chip. */
export default function TeamBar() {
  const { team } = useApp();

  if (!team.shared) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, padding: "8px 12px", background: "#FBFAF5", border: "1px solid #F2F0E8", borderRadius: 10 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C2BEB0", flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#9A968A" }}>Solo on this device · team sync off</span>
      </div>
    );
  }

  const members = team.members.length ? team.members : [{ id: team.userId, name: team.name || "You", online: true }];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: "8px 12px", background: "#FFFFFF", border: "1px solid #ECEAE1", borderRadius: 10 }}>
      <div style={{ display: "flex" }}>
        {members.slice(0, 4).map((m, i) => (
          <Avatar key={m.id} name={m.name} online={m.online} mine={m.id === team.userId} offset={i} />
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1A1A14" }}>
          {team.onlineCount > 0 ? `${team.onlineCount} on the team right now` : "Team is quiet"}
        </div>
        <div style={{ fontSize: 11, color: "#9A968A" }}>Working together · {team.teamId}</div>
      </div>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: team.onlineCount > 0 ? "#2D6B22" : "#C2BEB0", flexShrink: 0 }} />
    </div>
  );
}

function initials(name) {
  const parts = (name || "?").trim().split(/\s+/);
  return ((parts[0]?.[0] || "?") + (parts[1]?.[0] || "")).toUpperCase();
}

function Avatar({ name, online, mine, offset }) {
  return (
    <div
      title={name + (mine ? " (you)" : "")}
      style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        marginLeft: offset === 0 ? 0 : -8,
        background: online ? "#EAF2E5" : "#F2F0E8",
        border: `1.5px solid ${online ? "#2D6B22" : "#E0DCD0"}`,
        color: online ? "#2D6B22" : "#A8A496",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, position: "relative",
      }}
    >
      {initials(name)}
    </div>
  );
}
