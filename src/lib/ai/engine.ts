import { seedCases, seedPersons, seedRelationships, seedEvents, seedVehicles, seedLocations } from '@/data/seed';

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidenceScore: number;
  type: 'NETWORK' | 'BEHAVIORAL' | 'CROSS_CASE' | 'ANOMALY';
  supportingEvidence: string[];
  explanation: string;
  recommendedAction: string;
  caseIds: string[];
  entityIds: string[];
  createdAt: string;
}

export function generateCaseSummary(caseId: string): string {
  const caseData = seedCases.find(c => c.id === caseId);
  if (!caseData) return 'Case not found.';
  return `${caseData.title} (${caseData.status}): ${caseData.description}`;
}

export function identifyCrossCaseAssociations(): AIInsight[] {
  // Simplified logic for demo
  return [
    {
      id: 'INS-001',
      title: 'High-Probability Cross-Case Network Identified',
      summary: 'Multiple entities linked across ongoing narcotics and weapons investigations.',
      severity: 'CRITICAL',
      confidenceScore: 92,
      type: 'CROSS_CASE',
      supportingEvidence: [
        'Vehicle RJ-14-CZ-8892 observed in both Case #2026-041 and Case #2026-089',
        'Person P-9921 (Vikram Singh) shows financial links to both networks'
      ],
      explanation: 'Graph traversal indicates that the primary suspect in the narcotics case shares a logistics node (vehicle and safehouse) with the weapons smuggling network. The timing of events suggests coordinated operations.',
      recommendedAction: 'Initiate joint task force review between Narcotics and Anti-Terror squads.',
      caseIds: ['C-2026-041', 'C-2026-089'],
      entityIds: ['P-9921', 'V-4421'],
      createdAt: new Date().toISOString()
    }
  ];
}

export function identifyNetworkHubs(): AIInsight[] {
  return [
    {
      id: 'INS-002',
      title: 'Hidden Logistics Coordinator Identified',
      summary: 'Individual identified as central communication hub despite low direct involvement in events.',
      severity: 'HIGH',
      confidenceScore: 88,
      type: 'NETWORK',
      supportingEvidence: [
        'High betweenness centrality in communication graph',
        'Direct links to 4 distinct operational cells'
      ],
      explanation: 'Network analysis reveals P-8832 (Amit Sharma) acts as a bridge between multiple unconnected groups. While rarely present at physical events, communication patterns peak immediately before significant incidents.',
      recommendedAction: 'Place target under active surveillance; monitor secondary communication channels.',
      caseIds: ['C-2026-041'],
      entityIds: ['P-8832'],
      createdAt: new Date().toISOString()
    }
  ];
}

export function identifyLocationPatterns(): AIInsight[] {
  return [
      {
          id: 'INS-003',
          title: 'Anomalous Financial Activity near Border',
          summary: 'Clustered ATM withdrawals and money transfers in border region.',
          severity: 'MEDIUM',
          confidenceScore: 75,
          type: 'BEHAVIORAL',
          supportingEvidence: [
            'Pattern of transactions under reporting threshold',
            'Correlates with recent cross-border movement alerts'
          ],
          explanation: 'Temporal analysis shows a 400% increase in small-value transactions in Zone B during night hours, matching historical patterns of funding for smuggling operations.',
          recommendedAction: 'Request CCTV footage from identified ATMs; alert border patrol.',
          caseIds: ['C-2026-089'],
          entityIds: ['L-1102'],
          createdAt: new Date().toISOString()
      }
  ];
}

export const getInsights = (): AIInsight[] => {
    return [
        ...identifyCrossCaseAssociations(),
        ...identifyNetworkHubs(),
        ...identifyLocationPatterns()
    ];
}
