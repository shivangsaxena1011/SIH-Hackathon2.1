import { NextResponse } from 'next/server';
import { clearSessionCookie, getServerSession, destroySession, SESSION_COOKIE } from '@/lib/auth/session';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    
    if (token) {
      destroySession(token);
    }
    
    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
