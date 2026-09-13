import { seedInsights } from '@/data/seed';
import type { EvidenceChain, EvidenceChainStep } from '@/types';

/**
 * Evidence Chain Service
 * Generates transparent, step-by-step reasoning chains answering:
 * "WHY THIS INSIGHT?" and "HOW DID SENTINEL CONNECT THESE ENTITIES?"
 */

export function getEvidenceChainForInsight(insightId: string): EvidenceChain {
  const insight = seedInsights.find(i => i.id === insightId || i.insightId === insightId);

  // If INS-001 (Cross-Case Correlation)
  if (!insight || insight.insightId === 'INS-001' || insight.id === 'INS-001') {
    const steps: EvidenceChainStep[] = [
      {
        stepNumber: 1,
        entityId: 'P-1042',
        entityType: 'PERSON',
        entityName: 'Rahul Mehra',
        actionOrRelation: 'Primary Subject in Case #2026-041 (Operation Trishul)',
        source: 'Case File C-001 Docket Entry',
        confidence: 97,
        timestamp: '2026-07-15T09:00:00Z'
      },
      {
        stepNumber: 2,
        entityId: 'V-001',
        entityType: 'VEHICLE',
        entityName: 'MP09-DEMO-4821',
        actionOrRelation: 'Registered & Observed in Physical Custody of Rahul Mehra',
        source: 'Transport Dept Database & Field ANPR Record',
        confidence: 94,
        timestamp: '2026-09-09T10:20:00Z'
      },
      {
        stepNumber: 3,
        entityId: 'C-002',
        entityType: 'CASE',
        entityName: 'Case #2026-017 (Operation Kavach)',
        actionOrRelation: 'Same Vehicle MP09-DEMO-4821 Flagged at Indore Transit Checkpoint',
        source: 'Inter-Agency Cross-Jurisdiction ANPR Exchange',
        confidence: 89,
        timestamp: '2026-09-09T11:45:00Z'
      },
      {
        stepNumber: 4,
        entityId: 'P-2041',
        entityType: 'PERSON',
        entityName: 'Arjun Verma',
        actionOrRelation: 'Co-Occupant Observed with Same Vehicle in Case #2026-017',
        source: 'Surveillance Camera Cluster Demo-12',
        confidence: 86,
        timestamp: '2026-09-09T12:15:00Z'
      }
    ];

    return {
      insightId: insight?.id || 'INS-001',
      title: insight?.title || 'Cross-Case Entity Association: Case #2026-041 \u2194 Case #2026-017',
      targetEntity: 'Rahul Mehra & Vehicle MP09-DEMO-4821',
      steps,
      conclusion: 'A shared physical conduit (Vehicle MP09-DEMO-4821) establishes a verifiable 4-step evidential linkage between Operation Trishul and Operation Kavach.',
      verificationRecommendations: [
        'Issue inter-jurisdictional evidentiary request to Indore Zone for raw CCTV footage',
        'Verify registered vehicle lease agreement with State Transport Department',
        'Subject co-occupant Arjun Verma to authorized supervisory interview'
      ]
    };
  }

  // Generic fallback chain for any other insight
  return {
    insightId: insight.id,
    title: insight.title,
    targetEntity: 'Subject Entities in Case Docket',
    steps: insight.supportingIndicators.map((ind, idx) => ({
      stepNumber: idx + 1,
      entityId: `IND-${idx + 1}`,
      entityType: 'EVENT',
      entityName: ind.label,
      actionOrRelation: ind.description,
      source: ind.sourceType || 'Automated Pipeline',
      confidence: ind.status === 'confirmed' ? 95 : 75
    })),
    conclusion: insight.explanation,
    verificationRecommendations: [
      insight.recommendedAction,
      'Review cryptographic hashes in Evidence Registry',
      'Validate source sensor calibrations'
    ]
  };
}
