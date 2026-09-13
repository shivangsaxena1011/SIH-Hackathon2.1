'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sih_user');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setUser(json.data);
          try {
            localStorage.setItem('sih_user', JSON.stringify(json.data));
          } catch {}
          setIsLoading(false);
          return;
        }
      }
      // Protected session cookie is the sole authority; revoke if server session invalid
      if (typeof window !== 'undefined') {
        try { localStorage.removeItem('sih_user'); } catch {}
      }
      setUser(null);
      setIsLoading(false);
      return;
    } catch (error) {
      console.warn('Session check network warning:', error);
      // Only during momentary network failure fallback to cached display user
      if (typeof window !== 'undefined') {
        try {
          const saved = localStorage.getItem('sih_user');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.officerId) {
              setUser(parsed);
              setIsLoading(false);
              return;
            }
          }
        } catch {}
      }
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    try {
      localStorage.setItem('sih_user', JSON.stringify(userData));
    } catch {}
    router.push('/dashboard');
    router.refresh();
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed', error);
    }
    try {
      localStorage.removeItem('sih_user');
    } catch {}
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login' && pathname !== '/') {
      router.push('/login');
    }
  }, [isLoading, user, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
