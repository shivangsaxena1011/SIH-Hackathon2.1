import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const user = await getServerSession();
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
