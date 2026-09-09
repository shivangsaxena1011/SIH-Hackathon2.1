import { NextResponse } from 'next/server';
import { validateCredentials, createSession, setSessionCookie } from '@/lib/auth/session';
import { recordAuditLog } from '@/lib/audit/audit-service';

export async function POST(req: Request) {
  try {
    const { officerId, password, mfaCode } = await req.json();

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
      return NextResponse.json({ success: false, message: 'Invalid credentials or MFA code' }, { status: 401 });
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

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
