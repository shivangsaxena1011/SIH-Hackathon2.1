import { getCanonicalCaseId, getCaseNumber } from './case-service';
import type { InvestigationDelta, InvestigationDeltaItem } from '@/types';

/**
 * Investigation Change Monitor ("WHAT CHANGED?")
 * Tracks incremental intelligence deltas since the officer's last briefing or shift handover.
 */

export function getCaseDeltas(caseQuery: string): InvestigationDelta {
  const caseId = getCanonicalCaseId(caseQuery);
  const caseNumber = getCaseNumber(caseQuery);

  const items: InvestigationDeltaItem[] = [
    {
      id: 'DELTA-01',
      type: 'NEW_CONNECTION',
      timestamp: '2026-09-09T11:20:00Z',
      title: 'New Cross-Case Person Association',
      description: 'Harsh Pandey (P-1412) was linked to Case #2026-041 via secondary vehicle registration overlap.',
      severity: 'ALERT',
      entityId: 'P-1412'
    },
    {
      id: 'DELTA-02',
      type: 'CONFIDENCE_CHANGE',
      timestamp: '2026-09-09T10:45:00Z',
      title: 'Forensic Pre-Screen Score Re-evaluated',
      description: 'Document DOC-2026-041-009 flagged with photo boundary manipulation (Confidence adjusted to 82%).',
      severity: 'WARNING',
      entityId: 'D-001'
    },
    {
      id: 'DELTA-03',
      type: 'NEW_EVIDENCE',
      timestamp: '2026-09-09T12:35:00Z',
      title: 'Automated Insight Artifact Logged',
      description: 'Cross-case association analysis artifact EV-2026-041-004 sealed with SHA-256 hash.',
      severity: 'INFO',
      entityId: 'E-004'
    },
    {
      id: 'DELTA-04',
      type: 'NEW_EVENT',
      timestamp: '2026-09-09T10:20:00Z',
      title: 'Transit Checkpoint ANPR Hit',
      description: 'Vehicle MP09-DEMO-4821 registered motion through Transit Checkpoint Alpha.',
      severity: 'ALERT',
      entityId: 'V-001'
    }
  ];

  return {
    caseId,
    caseNumber,
    lastReviewedAt: '2026-09-09T08:00:00Z',
    currentCheckAt: new Date().toISOString(),
    items,
    totalDeltas: items.length
  };
}
