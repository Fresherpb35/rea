// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('User signed in:', user);
      
      // Store user info in localStorage
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.displayName);
      localStorage.setItem('userPhoto', user.photoURL);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isGuest', 'false');
      
      return { success: true, user };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message);
      
      // Handle specific error codes
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed. Please try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Sign-in popup was blocked by the browser.');
      }
      
      return { success: false, error: error.message };
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      
      // Clear localStorage
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userPhoto');
      localStorage.removeItem('isLoggedIn');
      
      console.log('User signed out');
      return { success: true };
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        console.log('User is logged in:', currentUser.email);
      } else {
        console.log('User is logged out');
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};