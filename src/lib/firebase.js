/* ════════════════════════════════════════════════════════════════
   Firebase — the shared backbone that lets two phones act as one team.

   Everything is env-gated. If the VITE_FIREBASE_* variables aren't set,
   firebaseReady() is false and the app runs in local-only mode (each
   device independent). Set the variables and the same TEAM_ID on both
   devices, and completed steps, community pipelines, proposals and
   presence sync live between them.
═══════════════════════════════════════════════════════════════════ */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase web config is public by design — access is controlled by
// Firestore security rules, not by hiding these values. So we bake in
// the project's config as defaults (env vars still override if set),
// which means the deployed app just works with zero Vercel setup.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA72eYqp2__KtiCy3wpcAKFnLCPRdk26BE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bhoomee-973a6.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bhoomee-973a6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bhoomee-973a6.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1020677901253",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1020677901253:web:b50101a86893ca943e59ac",
};

export const firebaseReady = () =>
  Boolean(config.apiKey && config.projectId && config.appId);

let db = null;
if (firebaseReady()) {
  try {
    const app = initializeApp(config);
    db = getFirestore(app);
  } catch (e) {
    console.warn("[Bhoomee] Firebase failed to init — falling back to local mode.", e);
    db = null;
  }
}

export { db };
