// Server-side session management using cookies
import { cookies } from 'next/headers';
import type { AuthUser } from '@/types';
import { seedUsers, DEMO_PASSWORD, DEMO_MFA_CODE } from '@/data/seed';

import crypto from 'crypto';

const SESSION_COOKIE = 'sih_session';
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours
const SESSION_SECRET = process.env.SESSION_SECRET || 'sentinel-secure-hmac-sha256-demo-secret-sih-2026';

/**
 * ============================================================================
 * ARCHITECTURAL NOTE: PROTOTYPE SESSION STORE vs PRODUCTION ARCHITECTURE
 * ============================================================================
 * CURRENT PROTOTYPE IMPLEMENTATION:
 * - Runtime session store mapped on `globalThis.__SIH_SESSIONS__` backed by
 *   tamper-proof HMAC-SHA256 cryptographically signed tokens.
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
  __SIH_REVOKED__?: Set<string>;
}

const globalStore = globalThis as unknown as GlobalSessionStore;
if (!globalStore.__SIH_SESSIONS__) {
  globalStore.__SIH_SESSIONS__ = new Map();
}
if (!globalStore.__SIH_REVOKED__) {
  globalStore.__SIH_REVOKED__ = new Set();
}
const sessions = globalStore.__SIH_SESSIONS__;
const revokedTokens = globalStore.__SIH_REVOKED__;

function computeHmac(data: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
}

function verifyHmac(data: string, signature: string): boolean {
  try {
    const expected = computeHmac(data);
    const expectedBuf = Buffer.from(expected);
    const signatureBuf = Buffer.from(signature);
    if (expectedBuf.length !== signatureBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, signatureBuf);
  } catch {
    return false;
  }
}

export function validateCredentials(officerId: string, password: string, mfaCode?: string): AuthUser | null {
  const cleanId = (officerId || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();
  const cleanMfa = (mfaCode || '').trim();

  // Strict demo password check: canonical DEMO_PASSWORD only
  if (cleanPass !== DEMO_PASSWORD) return null;

  // Strict demo MFA check: canonical DEMO_MFA_CODE only (strictly required)
  if (!cleanMfa || cleanMfa !== DEMO_MFA_CODE) return null;

  // Find user by officerId (exact or canonical persona alias)
  const user = seedUsers.find(u => {
    const uId = u.officerId.toLowerCase();
    return (uId === cleanId || uId === `${cleanId}.demo`) && u.isActive;
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
  const payload = Buffer.from(JSON.stringify(user)).toString('base64url');
  const nonce = crypto.randomBytes(16).toString('hex');
  const unsigned = `${payload}.${expiresAt}.${nonce}`;
  const signature = computeHmac(unsigned);
  const token = `${unsigned}.${signature}`;
  
  sessions.set(token, { user, expiresAt });
  return token;
}

export function getSessionFromToken(token: string): AuthUser | null {
  if (!token || typeof token !== 'string') return null;

  // Reject revoked tokens immediately
  if (revokedTokens.has(token)) return null;

  // 1. Check in-memory store
  const session = sessions.get(token);
  if (session) {
    if (Date.now() > session.expiresAt) {
      sessions.delete(token);
      return null;
    }
    return session.user;
  }

  // 2. Cryptographic signature check for distributed/stateless verification
  try {
    const parts = token.split('.');
    if (parts.length === 4) {
      const [payloadStr, expiresAtStr, nonce, receivedSignature] = parts;
      const unsigned = `${payloadStr}.${expiresAtStr}.${nonce}`;
      
      // Strict cryptographic signature verification - unsigned/tampered tokens are rejected
      if (!verifyHmac(unsigned, receivedSignature)) {
        return null;
      }

      const expiresAt = parseInt(expiresAtStr, 10);
      if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
        return null;
      }

      const rawUser = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8')) as AuthUser;
      if (!rawUser || !rawUser.officerId || !rawUser.role) {
        return null;
      }

      // Verify that user exists in the active registry
      const verifiedUser = seedUsers.find(
        u => u.officerId === rawUser.officerId && u.role === rawUser.role && u.isActive
      );
      if (!verifiedUser) {
        return null;
      }

      const user: AuthUser = {
        id: verifiedUser.id,
        name: verifiedUser.name,
        officerId: verifiedUser.officerId,
        role: verifiedUser.role,
        department: verifiedUser.department,
      };

      // Cache back into memory store
      sessions.set(token, { user, expiresAt });
      return user;
    }
  } catch {
    // Malformed token
  }

  return null;
}

export function destroySession(token: string): void {
  if (token) {
    sessions.delete(token);
    revokedTokens.add(token);
  }
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
