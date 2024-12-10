import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdvCyaVQeYQqwgLTmVsRXvGJ24M21DMsg",
  authDomain: "socialyzz.firebaseapp.com",
  projectId: "socialyzz",
  storageBucket: "socialyzz.firebasestorage.app",
  messagingSenderId: "447705705468",
  appId: "1:447705705468:web:9eb887136733e3bc4fa079",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
