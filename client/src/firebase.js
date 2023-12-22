// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yourplace-5cd5b.firebaseapp.com",
  projectId: "yourplace-5cd5b",
  storageBucket: "yourplace-5cd5b.appspot.com",
  messagingSenderId: "590872177820",
  appId: "1:590872177820:web:1e90e384270a8444291159"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth()