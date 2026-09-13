import { NextResponse } from 'next/server';
import { validateCredentials, createSession, setSessionCookie, SESSION_COOKIE } from '@/lib/auth/session';
import { recordAuditLog } from '@/lib/audit/audit-service';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const officerId = body.officerId || '';
    const password = body.password || '';
    const mfaCode = body.mfaCode || '';

    const user = validateCredentials(officerId, password, mfaCode);
    if (!user) {
      recordAuditLog({
        userId: officerId || 'UNKNOWN',
        userName: officerId || 'Unknown Attempt',
        action: 'FAILED_LOGIN_ATTEMPT',
        resource: 'Authentication',
        result: 'DENIED',
        metadata: { reason: 'Invalid Officer ID, password, or MFA code' },
      });
      return NextResponse.json({ success: false, message: 'Invalid Officer ID, Access Key, or MFA code' }, { status: 401 });
    }

    const token = createSession(user);
    await setSessionCookie(token);

    recordAuditLog({
      userId: user.officerId,
      userName: user.name,
      userRole: user.role,
      action: 'LOGIN',
      resource: 'Authentication',
      result: 'ALLOWED',
      metadata: { department: user.department },
    });

    const response = NextResponse.json({ success: true, data: user });
    // Explicitly reinforce cookie on the response header
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
