import { NextResponse } from 'next/server';
import { seedCases } from '@/data/seed';
import { getServerSession } from '@/lib/auth/session';
import { recordAuditLog } from '@/lib/audit/audit-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: caseId } = await params;
  const cleanId = caseId.replace(/^(case[#\-_]?|#)/i, '').toLowerCase();
  const caseData = seedCases.find(
    c => c.id.toLowerCase() === caseId.toLowerCase() ||
         c.caseNumber.toLowerCase() === caseId.toLowerCase() ||
         c.caseNumber.toLowerCase() === cleanId ||
         c.id.toLowerCase() === cleanId
  );

  if (!caseData) {
    return NextResponse.json({ success: false, error: 'Case not found' }, { status: 404 });
  }

  const session = await getServerSession();
  const userRole = session?.role || 'INVESTIGATING_OFFICER';
  const officerId = session?.officerId || 'officer.demo';
  const userName = session?.name || 'Inspector Priya Sharma';

  // RBAC Check for Restricted Case #2026-999
  if (caseData.id === 'C-999' || caseData.caseNumber === '2026-999') {
    if (userRole !== 'SUPER_ADMIN') {
      recordAuditLog({
        userId: officerId,
        userName,
        userRole,
        action: 'UNAUTHORIZED_CASE_ACCESS_ATTEMPT',
        resource: 'Case',
        resourceId: `Case #${caseData.caseNumber}`,
        caseId: caseData.id,
        result: 'DENIED',
        metadata: { reason: 'Unauthorized — case restricted to SUPER_ADMIN' },
      });

      return NextResponse.json(
        {
          success: false,
          error: 'ACCESS_DENIED',
          message: 'You do not have permission to access this investigation resource.',
          caseNumber: caseData.caseNumber,
        },
        { status: 403 }
      );
    }
  }

  // Allowed access: log case view
  recordAuditLog({
    userId: officerId,
    userName,
    userRole,
    action: 'VIEW_CASE',
    resource: 'Case',
    resourceId: `Case #${caseData.caseNumber}`,
    caseId: caseData.id,
    result: 'ALLOWED',
  });

  return NextResponse.json({ success: true, data: caseData });
}
