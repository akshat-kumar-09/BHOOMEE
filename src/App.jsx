import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Home from "./pages/Home.jsx";
import Global from "./pages/Global.jsx";
import Library from "./pages/Library.jsx";
import Playground from "./pages/Playground.jsx";
import You from "./pages/You.jsx";
import TabBar from "./components/TabBar.jsx";
import { CITIES, USER_CITY } from "./data/cities.js";

function Shell() {
  const { cityId } = useApp();
  const [page, setPage] = useState("home");

  const city = CITIES.find((c) => c.id === (cityId || USER_CITY));

  return (
    <div style={{ minHeight: "100vh" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 1.25rem", paddingBottom: 96 }}>
        {/* Home / Global / You remount on switch for the 250ms cross-fade.
            Playground stays mounted (display toggle) to preserve the
            conversation and draft as the user tabs away and back. */}
        {page === "home" && <Home key="home" />}
        {page === "global" && <Global key="global" />}
        {page === "library" && <Library key="library" />}
        {page === "you" && <You key="you" />}

        <div style={{ display: page === "playground" ? "block" : "none" }}>
          <Playground
            city={city}
            onBack={() => setPage("home")}
            onSaved={() => setPage("home")}
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
