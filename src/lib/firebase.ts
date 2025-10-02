// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOoNSZJ95bk_K_qyMk5IrH3q4O5tYnB2k",
  authDomain: "garutech-50ea7.firebaseapp.com",
  projectId: "garutech-50ea7",
  storageBucket: "garutech-50ea7.firebasestorage.app",
  messagingSenderId: "1047666362406",
  appId: "1:1047666362406:web:02ad055106b2954f34fee7",
  measurementId: "G-W4PJN0ZMEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;