import { NextResponse } from 'next/server';
import { getAuditLogs, recordAuditLog } from '@/lib/audit/audit-service';

export async function GET() {
  const logs = getAuditLogs();
  return NextResponse.json(logs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const log = recordAuditLog(body);
    return NextResponse.json({ success: true, data: log });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to record audit log' }, { status: 400 });
  }
}
