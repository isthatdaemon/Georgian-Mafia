// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3Xob1MSMxDw56iCexL1n8vJ1nd-uSQVM",
  authDomain: "georgian-mafia.firebaseapp.com",
  projectId: "georgian-mafia",
  storageBucket: "georgian-mafia.firebasestorage.app",
  messagingSenderId: "91181458545",
  appId: "1:91181458545:web:883c1b366bb9ab9ea867d0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
