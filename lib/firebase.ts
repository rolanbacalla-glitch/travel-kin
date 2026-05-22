import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check if configuration is present (at least apiKey and projectId should exist)
const isFirebaseConfigValid = 
  typeof window !== "undefined"
    ? !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    : !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let app: any;
let auth: any;
let db: any;
let storage: any;
let analytics: any = null;

if (isFirebaseConfigValid) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch((err) => {
      console.warn("Firebase Analytics is not supported in this environment:", err);
    });
  }
} else {
  // Return dummy placeholder objects with safe methods to prevent runtime exceptions
  app = {
    name: "[DEFAULT]",
    options: {},
    automaticDataCollectionEnabled: false,
  } as any;

  auth = {
    currentUser: null,
    onAuthStateChanged: (nextOrObserver: any) => {
      // Call with null to prevent components from hanging in a loading state
      if (typeof nextOrObserver === "function") {
        setTimeout(() => nextOrObserver(null), 0);
      } else if (nextOrObserver && typeof nextOrObserver.next === "function") {
        setTimeout(() => nextOrObserver.next(null), 0);
      }
      return () => {};
    },
    onIdTokenChanged: (nextOrObserver: any) => {
      if (typeof nextOrObserver === "function") {
        setTimeout(() => nextOrObserver(null), 0);
      } else if (nextOrObserver && typeof nextOrObserver.next === "function") {
        setTimeout(() => nextOrObserver.next(null), 0);
      }
      return () => {};
    },
    signOut: async () => {},
  } as any;

  db = {} as any;
  storage = {} as any;
}

export const logFirebaseEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch (error) {
      console.warn(`Firebase Analytics failed to log event "${eventName}":`, error);
    }
  }
};

export { app, auth, db, storage, analytics };

