/* Bottom tab bar — Home · Global · Library · Playground · You.
   Fixed to the bottom, centered within the 680px column. The active
   tab is marked with the earth-green accent. Switching is instant. */

const TABS = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "global", label: "Global", icon: GlobeIcon },
  { id: "library", label: "Library", icon: BookIcon },
  { id: "playground", label: "Playground", icon: SparkIcon },
  { id: "you", label: "You", icon: PersonIcon },
];

export default function TabBar({ page, onChange }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 680,
          background: "rgba(250,248,242,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderTop: "1px solid #ECEAE1",
          display: "flex",
          padding: "8px 8px calc(8px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {TABS.map((tab) => {
          const active = page === tab.id;
          const color = active ? "#2D6B22" : "#9A968A";
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                padding: "6px 0",
                transition: "color 0.2s",
              }}
            >
              <Icon color={color} />
              <span style={{ fontSize: 11, fontWeight: active ? 600 : 500, color }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HomeIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transition: "stroke 0.2s" }}>
      <path d="M4 11.5 12 4l8 7.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9.5h12V10" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 19.5V14h4v5.5" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.7" />
      <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" stroke={color} strokeWidth="1.7" />
    </svg>
  );
}

function SparkIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3.5c.6 3.8 1.7 4.9 5.5 5.5-3.8.6-4.9 1.7-5.5 5.5-.6-3.8-1.7-4.9-5.5-5.5 3.8-.6 4.9-1.7 5.5-5.5Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 14.5c.3 1.7.8 2.2 2.5 2.5-1.7.3-2.2.8-2.5 2.5-.3-1.7-.8-2.2-2.5-2.5 1.7-.3 2.2-.8 2.5-2.5Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 4.5c2.2-1 5-1 8 .5 3-1.5 5.8-1.5 8-.5v14c-2.2-1-5-1-8 .5-3-1.5-5.8-1.5-8-.5v-14Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 5v14" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function PersonIcon({ color }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke={color} strokeWidth="1.7" />
      <path d="M5.5 19.5c.7-3.4 3.3-5.5 6.5-5.5s5.8 2.1 6.5 5.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
