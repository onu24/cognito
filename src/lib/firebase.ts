import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBdtV4it7E5ovMcJPgZSHS_VsLbZieDrIg",
  authDomain: "cognito-inc-54999.firebaseapp.com",
  projectId: "cognito-inc-54999",
  storageBucket: "cognito-inc-54999.firebasestorage.app",
  messagingSenderId: "658766618276",
  appId: "1:658766618276:web:e11e936ba0b5472c2bd031",
  measurementId: "G-CRWM1KKNJC",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function loadAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  return (await isSupported()) ? getAnalytics(app) : null;
}
