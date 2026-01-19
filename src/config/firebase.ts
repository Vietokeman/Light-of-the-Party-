// TEMPORARILY COMMENTED FOR UI TESTING

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration from environment variables
// Trim values to remove any whitespace/newlines (especially from Vercel env vars)
const firebaseConfig = {
  apiKey: "AIzaSyApu5LSV-zFlQ70J1MuSxPbvihcw6Jxx4U",
  authDomain: "light-of-the-party.firebaseapp.com",
  projectId: "light-of-the-party",
  storageBucket: "light-of-the-party.firebasestorage.app",
  messagingSenderId: "547560678376",
  appId: "1:547560678376:web:387c5b00bede671fffba5d",
  measurementId: "G-61PSPE1RP4"
};

// Debug logging for development
if (import.meta.env.DEV) {
  console.log("🔥 Firebase ENV Check:", {
    projectId: firebaseConfig.projectId,
    hasApiKey: !!firebaseConfig.apiKey,
    mode: import.meta.env.MODE,
  });
}

// Initialize Firebase (singleton pattern)
function initializeFirebase(): FirebaseApp {
  if (getApps().length === 0) {
    const newApp = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully for Light of the Party');
    return newApp;
  }
  return getApps()[0];
}

// Initialize on module load
const app = initializeFirebase();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

// Analytics only in production and browser environment
let analytics: Analytics | undefined;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

export { app, db, auth, analytics };


// MOCK EXPORTS FOR UI TESTING (WITHOUT FIREBASE)
// console.log('⚠️ Firebase is DISABLED - Using mock data for UI testing');

// export const app: any = null;
// export const db: any = null;
// export const auth: any = null;
// export const analytics: any = undefined;
// export default app;
