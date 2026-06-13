import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { USER_CITY } from "../data/cities.js";
import { db, firebaseReady } from "../lib/firebase.js";

const AppContext = createContext(null);

// Onboarding is paused for now, so everyone starts from a sensible
// default calibration. Swap this back to `null` to re-enable the
// 5-question flow (the Onboarding page is still wired up in App).
const DEFAULT_PROFILE = {
  time: "A few hours",
  life: "Mixed",
  reach: "Social media",
  comfort: "All of it",
  connections: ["Local government"],
};

const SHARED = firebaseReady() && !!db;

// ─── Team identity (per device) ───────────────────────────────────

function readTeamId() {
  try {
    const url = new URLSearchParams(window.location.search).get("team");
    if (url) {
      localStorage.setItem("bhumi_team", url);
      return url;
    }
    return (
      import.meta.env.VITE_TEAM_ID ||
      localStorage.getItem("bhumi_team") ||
      "bhoomee-duo"
    );
  } catch {
    return "bhoomee-duo";
  }
}

function readUserId() {
  try {
    let id = localStorage.getItem("bhumi_uid");
    if (!id) {
      id = "u_" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("bhumi_uid", id);
    }
    return id;
  } catch {
    return "u_" + Math.random().toString(36).slice(2, 10);
  }
}

function readName() {
  try {
    return localStorage.getItem("bhumi_name") || "";
  } catch {
    return "";
  }
}

const TEAM_ID = readTeamId();
const ONLINE_WINDOW = 70 * 1000; // 70s presence window

export function AppProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [cityId, setCityId] = useState(USER_CITY);
  const [privatePipelines, setPrivatePipelines] = useState([]); // local only — private to this device

  // Shared (or local-mirror) collaborative state
  const [completed, setCompleted] = useState({});
  const [completedBy, setCompletedBy] = useState({});
  const [communityPipelines, setCommunityPipelines] = useState({}); // { [cityId]: [pipe] }
  const [proposals, setProposals] = useState([]);
  const [members, setMembers] = useState({});

  const userId = useRef(readUserId());
  const [name, setNameState] = useState(readName());

  // Live mirrors so write helpers can compute next-array values safely.
  const communityRef = useRef(communityPipelines);
  const proposalsRef = useRef(proposals);
  const completedRef = useRef(completed);
  useEffect(() => { communityRef.current = communityPipelines; }, [communityPipelines]);
  useEffect(() => { proposalsRef.current = proposals; }, [proposals]);
  useEffect(() => { completedRef.current = completed; }, [completed]);

  const teamDoc = useCallback(() => doc(db, "teams", TEAM_ID), []);

  // ── Realtime subscription + presence heartbeat ──
  useEffect(() => {
    if (!SHARED) return;
    const ref = teamDoc();
    const displayName = readName() || "Member";

    // Announce presence.
    setDoc(ref, { members: { [userId.current]: { name: displayName, at: Date.now() } } }, { merge: true }).catch(() => {});

    const unsub = onSnapshot(ref, (snap) => {
      const d = snap.data() || {};
      setCompleted(d.completed || {});
      setCompletedBy(d.completedBy || {});
      setCommunityPipelines(d.community || {});
      setProposals(d.proposals || []);
      setMembers(d.members || {});
    });

    const beat = setInterval(() => {
      setDoc(ref, { members: { [userId.current]: { name: readName() || "Member", at: Date.now() } } }, { merge: true }).catch(() => {});
    }, 25 * 1000);

    return () => {
      unsub();
      clearInterval(beat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Write helpers (shared → Firestore, else local) ──

  const toggleStep = useCallback((key) => {
    if (SHARED) {
      const next = !completedRef.current[key];
      setDoc(teamDoc(), {
        completed: { [key]: next },
        completedBy: { [key]: next ? (readName() || "Member") : null },
      }, { merge: true }).catch(() => {});
      // optimistic
      setCompleted((p) => ({ ...p, [key]: next }));
      setCompletedBy((p) => ({ ...p, [key]: next ? (readName() || "Member") : null }));
      return;
    }
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  }, [teamDoc]);

  const savePrivate = useCallback((pipe, city) => {
    // Private pipelines stay on this device only.
    setPrivatePipelines((prev) => [{ ...pipe, cityId: city }, ...prev]);
  }, []);

  const shareWithCity = useCallback((pipe, city, handle) => {
    const entry = { ...pipe, handle, kind: "community" };
    if (SHARED) {
      const next = [entry, ...(communityRef.current[city] || [])];
      setDoc(teamDoc(), { community: { [city]: next } }, { merge: true }).catch(() => {});
      setCommunityPipelines((prev) => ({ ...prev, [city]: next }));
      return;
    }
    setCommunityPipelines((prev) => ({ ...prev, [city]: [entry, ...(prev[city] || [])] }));
  }, [teamDoc]);

  const proposeToBhumi = useCallback((pipe, city, handle) => {
    const entry = { pipe, cityId: city, handle, at: Date.now() };
    if (SHARED) {
      const next = [entry, ...proposalsRef.current];
      setDoc(teamDoc(), { proposals: next }, { merge: true }).catch(() => {});
      setProposals(next);
      return;
    }
    setProposals((prev) => [entry, ...prev]);
  }, [teamDoc]);

  const setName = useCallback((n) => {
    const clean = (n || "").trim().slice(0, 24);
    try { localStorage.setItem("bhumi_name", clean); } catch { /* ignore */ }
    setNameState(clean);
    if (SHARED) {
      setDoc(teamDoc(), { members: { [userId.current]: { name: clean || "Member", at: Date.now() } } }, { merge: true }).catch(() => {});
    }
  }, [teamDoc]);

  const completedCount = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );

  const memberList = useMemo(() => {
    const now = Date.now();
    return Object.entries(members)
      .map(([id, m]) => ({ id, name: m?.name || "Member", at: m?.at || 0, online: now - (m?.at || 0) < ONLINE_WINDOW }))
      .sort((a, b) => b.at - a.at);
  }, [members]);

  const value = {
    profile,
    setProfile,
    cityId,
    setCityId,
    completed,
    completedBy,
    toggleStep,
    completedCount,
    privatePipelines,
    communityPipelines,
    proposals,
    savePrivate,
    shareWithCity,
    proposeToBhumi,
    // team
    team: {
      shared: SHARED,
      teamId: TEAM_ID,
      userId: userId.current,
      name,
      setName,
      members: memberList,
      onlineCount: memberList.filter((m) => m.online).length,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
