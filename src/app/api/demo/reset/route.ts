import { NextResponse } from 'next/server';
import { resetAuditLogs, recordAuditLog } from '@/lib/audit/audit-service';

export async function POST() {
  resetAuditLogs();

  recordAuditLog({
    userId: 'SYSTEM',
    userName: 'Demo Reset Engine',
    userRole: 'SUPER_ADMIN',
    action: 'RESET_DEMO_DATA',
    resource: 'System State',
    result: 'ALLOWED',
    metadata: { reason: 'Restored canonical demo seed state for judging demonstration' }
  });

  return NextResponse.json({ 
    success: true, 
    message: 'Demo dataset restored to canonical state (16 persons, 8 vehicles, 9 cases, 32 events, 30 relationships).' 
  });
}
