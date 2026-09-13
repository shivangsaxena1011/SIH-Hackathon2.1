import { seedAuditLogs } from '@/data/seed';
import type { AuditLog, AuditResult, UserRole } from '@/types';

/**
 * ============================================================================
 * ARCHITECTURAL NOTE: PROTOTYPE AUDIT STORE vs PRODUCTION ARCHITECTURE
 * ============================================================================
 * CURRENT PROTOTYPE IMPLEMENTATION:
 * - In-memory append-only array initialized with seed audit logs.
 * - Captures user ID, IP address, timestamp, role, resource, action, and result
 *   for live judge demonstration and RBAC enforcement.
 *
 * FUTURE PERSISTENT PRODUCTION ARCHITECTURE:
 * - Immutable Write-Once-Read-Many (WORM) storage (e.g. AWS S3 Object Lock,
 *   Chronicle SIEM, or enterprise OpenSearch).
 * - Cryptographic Merkle-tree chaining of consecutive audit records for
 *   tamper-evident proof of integrity admissible in Indian judicial proceedings
 *   under Section 65B of the Indian Evidence Act.
 * ============================================================================
 */
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
