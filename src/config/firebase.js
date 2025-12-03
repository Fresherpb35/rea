// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBv2D7k_GbmFogtWdLP3Tp9A89ssfAyHN8",
  authDomain: "ruready-dating-app.firebaseapp.com",
  projectId: "ruready-dating-app",
  storageBucket: "ruready-dating-app.firebasestorage.app",
  messagingSenderId: "291714283918",
  appId: "1:291714283918:web:59940966ae51dd686c8cdf",
  measurementId: "G-2V1ERYFLBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth & Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// ✅ Add this function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return { success: true, user };
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return { success: false, error };
  }
};

export default app;
