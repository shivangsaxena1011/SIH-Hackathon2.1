// Server-side session management using cookies
import { cookies } from 'next/headers';
import type { AuthUser } from '@/types';
import { seedUsers, DEMO_PASSWORD, DEMO_MFA_CODE } from '@/data/seed';

const SESSION_COOKIE = 'sih_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours

/**
 * ============================================================================
 * ARCHITECTURAL NOTE: PROTOTYPE SESSION STORE vs PRODUCTION ARCHITECTURE
 * ============================================================================
 * CURRENT PROTOTYPE IMPLEMENTATION:
 * - Runtime in-memory session store mapped on `globalThis.__SIH_SESSIONS__` combined
 *   with base64url-encoded stateless session tokens.
 * - This provides deterministic, zero-external-dependency execution suitable for
 *   isolated offline evaluation, hackathon judging, and edge deployments.
 *
 * FUTURE PERSISTENT PRODUCTION ARCHITECTURE:
 * - Distributed Redis Enterprise / Dragonfly cluster with sliding window TTLs.
 * - Hardware Security Module (HSM) / KMS-signed JWT/PASETO tokens.
 * - Multi-region active-active session replication with automated revocation lists.
 * ============================================================================
 */
interface GlobalSessionStore {
  __SIH_SESSIONS__?: Map<string, { user: AuthUser; expiresAt: number }>;
}

const globalStore = globalThis as unknown as GlobalSessionStore;
if (!globalStore.__SIH_SESSIONS__) {
  globalStore.__SIH_SESSIONS__ = new Map();
}
const sessions = globalStore.__SIH_SESSIONS__;

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function validateCredentials(officerId: string, password: string, mfaCode?: string): AuthUser | null {
  const cleanId = (officerId || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();
  const cleanMfa = (mfaCode || '').trim();

  // Permissive demo password check (supports DEMO_PASSWORD, Demo@123, or demo)
  const isDemoPassword = cleanPass === DEMO_PASSWORD || cleanPass === 'Demo@123' || cleanPass === 'demo';
  if (!isDemoPassword) return null;

  // Permissive demo MFA check (allow DEMO_MFA_CODE, 123456, 000000, or empty in 1-click demo access)
  const isDemoMfa = !cleanMfa || cleanMfa === DEMO_MFA_CODE || cleanMfa === '123456' || cleanMfa === '000000';
  if (!isDemoMfa) return null;

  // Find user by officerId (exact or prefix like 'officer' -> 'officer.demo')
  const user = seedUsers.find(u => {
    const uId = u.officerId.toLowerCase();
    return (uId === cleanId || uId === `${cleanId}.demo` || uId.startsWith(cleanId)) && u.isActive;
  });

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
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  // Encode self-contained stateless payload so session works across workers, chunks & reloads
  const payload = Buffer.from(JSON.stringify(user)).toString('base64url');
  const nonce = generateToken();
  const token = `${payload}.${expiresAt}.${nonce}`;
  
  sessions.set(token, { user, expiresAt });
  return token;
}

export function getSessionFromToken(token: string): AuthUser | null {
  if (!token) return null;

  // 1. Check in-memory store
  const session = sessions.get(token);
  if (session) {
    if (Date.now() > session.expiresAt) {
      sessions.delete(token);
      return null;
    }
    return session.user;
  }

  // 2. Decode self-contained stateless token fallback
  try {
    const parts = token.split('.');
    if (parts.length >= 2) {
      const payloadStr = Buffer.from(parts[0], 'base64url').toString('utf-8');
      const expiresAt = parseInt(parts[1], 10);
      if (Number.isFinite(expiresAt) && Date.now() > expiresAt) {
        return null;
      }
      const user = JSON.parse(payloadStr) as AuthUser;
      if (user && user.officerId && user.role) {
        // Cache back into memory store
        sessions.set(token, { user, expiresAt: expiresAt || (Date.now() + SESSION_MAX_AGE * 1000) });
        return user;
      }
    }
  } catch {
    // Malformed token
  }

  return null;
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
    // Allow HTTP in demo environments (localhost, 127.0.0.1, LAN IP) without browser rejecting Secure cookies
    secure: process.env.COOKIE_SECURE === 'true',
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
