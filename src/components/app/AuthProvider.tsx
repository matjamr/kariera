'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from '~/lib/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isDemoMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_USER_KEY = 'kariera-demo-user';

function readDemoUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(DEMO_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setUser(readDemoUser());
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? { uid: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName }
          : null,
      );
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const demoSignIn = (email: string, displayName?: string) => {
    const demoUser: AuthUser = {
      uid: 'demo-user',
      email,
      displayName: displayName ?? email.split('@')[0],
    };
    window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const value: AuthContextValue = {
    user,
    loading,
    isDemoMode: !isFirebaseConfigured,
    signIn: async (email, password) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        if (!email || password.length < 6) throw new Error('Invalid email or password (min. 6 characters).');
        demoSignIn(email);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
    },
    signUp: async (name, email, password) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        if (!email || password.length < 6) throw new Error('Invalid email or password (min. 6 characters).');
        demoSignIn(email, name);
        return;
      }
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(credential.user, { displayName: name });
        setUser({ uid: credential.user.uid, email: credential.user.email, displayName: name });
      }
    },
    signInWithGoogle: async () => {
      const auth = getFirebaseAuth();
      if (!auth) {
        demoSignIn('demo@kariera.app', 'Demo User');
        return;
      }
      await signInWithPopup(auth, new GoogleAuthProvider());
    },
    resetPassword: async (email) => {
      const auth = getFirebaseAuth();
      if (!auth) {
        if (!email) throw new Error('Enter your email address.');
        return;
      }
      await sendPasswordResetEmail(auth, email);
    },
    signOut: async () => {
      const auth = getFirebaseAuth();
      if (!auth) {
        window.localStorage.removeItem(DEMO_USER_KEY);
        setUser(null);
        return;
      }
      await firebaseSignOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
