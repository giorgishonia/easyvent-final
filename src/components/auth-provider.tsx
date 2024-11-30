"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXjQORgaSyVZLLBCzmDHGKXo32uTh1VKE",
  authDomain: "evently-7686f.firebaseapp.com",
  projectId: "evently-7686f",
  storageBucket: "evently-7686f.appspot.com",
  messagingSenderId: "754613481069",
  appId: "1:754613481069:web:3ecec180751a26eafe9964",
  measurementId: "G-GM85DL693G",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in:", error);
    });
  };

  const signOut = () => {
    auth.signOut().catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setIsLoading(false); // Stop loading once we have the user info
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in:", error);
    });
  };

  const signOut = () => {
    auth.signOut().catch((error) => {
      console.error("Error signing out:", error);
    });
  };

  return { user, isLoading, signIn, signOut };
}
