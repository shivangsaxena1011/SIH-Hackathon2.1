// Server-side session management using cookies
import { cookies } from 'next/headers';
import type { AuthUser } from '@/types';
import { seedUsers, DEMO_PASSWORD, DEMO_MFA_CODE } from '@/data/seed';

const SESSION_COOKIE = 'sih_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours

// In-memory session store (for demo — production would use DB)
const sessions = new Map<string, { user: AuthUser; expiresAt: number }>();

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function validateCredentials(officerId: string, password: string, mfaCode: string): AuthUser | null {
  if (password !== DEMO_PASSWORD) return null;
  if (mfaCode !== DEMO_MFA_CODE) return null;

  const user = seedUsers.find(u => u.officerId === officerId && u.isActive);
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    officerId: user.officerId,
    role: user.role,
    department: user.department,
  };
}

export function createSession(user: AuthUser): string {
  const token = generateToken();
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  sessions.set(token, { user, expiresAt });
  return token;
}

export function getSessionFromToken(token: string): AuthUser | null {
  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }
  return session.user;
}

export function destroySession(token: string): void {
  sessions.delete(token);
}

export async function getServerSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);
    if (!sessionCookie?.value) return null;
    return getSessionFromToken(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };
