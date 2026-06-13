import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Local from "./pages/Local.jsx";
import Global from "./pages/Global.jsx";
import Playground from "./pages/Playground.jsx";
import You from "./pages/You.jsx";
import TabBar from "./components/TabBar.jsx";
import { CITIES, USER_CITY } from "./data/cities.js";

function Shell() {
  const { cityId } = useApp();
  const [page, setPage] = useState("local");

  const city = CITIES.find((c) => c.id === (cityId || USER_CITY));

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 1.25rem", paddingBottom: 96 }}>
        {/* Local / Global / You remount on switch for the 250ms cross-fade.
            Playground stays mounted (display toggle) to preserve the
            conversation and draft as the user tabs away and back. */}
        {page === "local" && <Local key="local" city={city} onOpenPlayground={() => setPage("playground")} />}
        {page === "global" && <Global key="global" />}
        {page === "you" && <You key="you" />}

        <div style={{ display: page === "playground" ? "block" : "none" }}>
          <Playground
            city={city}
            onBack={() => setPage("local")}
            onSaved={() => setPage("local")}
          />
        </div>
      </div>

      <TabBar page={page} onChange={setPage} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
