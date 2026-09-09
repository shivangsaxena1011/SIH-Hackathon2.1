import { seedAuditLogs } from '@/data/seed';
import type { AuditLog, AuditResult, UserRole } from '@/types';

// In-memory runtime audit store initialized with seed records
let runtimeAuditLogs: AuditLog[] = [...seedAuditLogs];

export function getAuditLogs(): AuditLog[] {
  return [...runtimeAuditLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function recordAuditLog(params: {
  userId: string;
  userName?: string;
  userRole?: UserRole;
  action: string;
  resource: string;
  resourceId?: string;
  caseId?: string;
  result: AuditResult;
  ipAddress?: string;
  sessionId?: string;
  metadata?: Record<string, string>;
}): AuditLog {
  const newLog: AuditLog = {
    id: `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userId: params.userId,
    userName: params.userName || params.userId,
    userRole: params.userRole || 'INVESTIGATING_OFFICER',
    action: params.action,
    resource: params.resource,
    resourceId: params.resourceId,
    caseId: params.caseId,
    result: params.result,
    ipAddress: params.ipAddress || '192.168.DEMO.102',
    sessionId: params.sessionId || 'SES-DEMO-CURRENT',
    timestamp: new Date().toISOString(),
    metadata: params.metadata,
  };

  runtimeAuditLogs.unshift(newLog);
  return newLog;
}

export function resetAuditLogs(): void {
  runtimeAuditLogs = [...seedAuditLogs];
}
