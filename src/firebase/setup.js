import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyANfse-pMmrepbG5zmIPvKszhjatEgKzAA",
  authDomain: "otpa-20ece.firebaseapp.com",
  projectId: "otpa-20ece",
  storageBucket: "otpa-20ece.firebasestorage.app",
  messagingSenderId: "891559465549",
  appId: "1:891559465549:web:aa57c9cf0209c2a2ccc204",
  measurementId: "G-RS6YCWHBSZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
