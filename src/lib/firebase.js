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

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseReady = () =>
  Boolean(config.apiKey && config.projectId && config.appId);

let db = null;
if (firebaseReady()) {
  try {
    const app = initializeApp(config);
    db = getFirestore(app);
  } catch (e) {
    console.warn("[Bhumi] Firebase failed to init — falling back to local mode.", e);
    db = null;
  }
}

export { db };
