// TEMPORARILY COMMENTED FOR UI TESTING
/*
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration from environment variables
// Trim values to remove any whitespace/newlines (especially from Vercel env vars)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim(),
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
*/

// MOCK EXPORTS FOR UI TESTING (WITHOUT FIREBASE)
console.log('⚠️ Firebase is DISABLED - Using mock data for UI testing');

export const app: any = null;
export const db: any = null;
export const auth: any = null;
export const analytics: any = undefined;
export default app;
