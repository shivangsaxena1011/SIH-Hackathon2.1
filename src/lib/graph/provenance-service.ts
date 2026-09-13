import { seedRelationships } from '@/data/seed';
import type { RelationshipProvenance, DataProvenance } from '@/types';

/**
 * Data Provenance Service
 * Clearly demarcates:
 * 1. RECORDED FACTS: Hard physical captures, ANPR sensor logs, official case dockets, official registries.
 * 2. INFERRED CORRELATIONS: AI entity resolution, graph cluster heuristics, cross-case linkage models.
 */

export function getRelationshipProvenance(
  relationshipId: string,
  sourceName: string = 'Source Entity',
  targetName: string = 'Target Entity'
): RelationshipProvenance {
  const rel = seedRelationships.find(r => r.id === relationshipId);

  // Default fallback if synthetic ID
  if (!rel) {
    return {
      relationshipId,
      sourceEntityName: sourceName,
      targetEntityName: targetName,
      type: 'INFERRED',
      sourceEngine: 'SENTINEL Graph Correlation Engine v2.4',
      sourceDocumentOrSensor: 'Automated Multi-Source Linkage',
      recordedAt: new Date().toISOString(),
      confidence: 75,
      verificationStatus: 'UNVERIFIED',
      rationale: `Automated association identified through graph proximity between ${sourceName} and ${targetName}. Requires authorized officer review.`
    };
  }

  // Determine if recorded or inferred based on source
  const sourceLower = (rel.source || '').toLowerCase();
  const isRecorded =
    sourceLower.includes('case assignment') ||
    sourceLower.includes('anpr') ||
    sourceLower.includes('surveillance') ||
    sourceLower.includes('cctv') ||
    sourceLower.includes('rto') ||
    sourceLower.includes('telecom') ||
    sourceLower.includes('official');

  const engine = isRecorded
    ? 'Official Jurisdictional Registry / Sensor Log'
    : 'SENTINEL AI Entity & Relationship Ingestion Engine';

  return {
    relationshipId: rel.id,
    sourceEntityName: rel.sourceEntityName || sourceName,
    targetEntityName: rel.targetEntityName || targetName,
    type: isRecorded ? 'RECORDED' : 'INFERRED',
    sourceEngine: engine,
    sourceDocumentOrSensor: rel.source || 'Docket Record',
    recordedAt: rel.createdAt || '2026-09-09T10:00:00Z',
    confidence: rel.confidence,
    verificationStatus: rel.confidence >= 90 ? 'VERIFIED' : 'UNVERIFIED',
    rationale: isRecorded
      ? `Direct factual record established via ${rel.source}. Recorded under official case evidentiary file.`
      : `AI-inferred correlation generated with ${rel.confidence}% confidence. Provided strictly as an investigative lead; not standalone judicial proof.`
  };
}

export function getNodeProvenance(entityType: string, label: string): DataProvenance {
  const type = entityType.toUpperCase();
  if (type === 'CASE' || type === 'EVIDENCE' || type === 'DOCUMENT') {
    return {
      type: 'RECORDED',
      sourceEngine: 'Judicial / Police Management Records',
      recordedAt: '2026-09-09T10:00:00Z',
      confidence: 100,
      verificationStatus: 'VERIFIED',
      rationale: 'Factual docket entry entered into official system.'
    };
  }

  return {
    type: 'INFERRED',
    sourceEngine: 'Multi-Modal Entity Resolution Pipeline',
    recordedAt: '2026-09-09T11:00:00Z',
    confidence: 88,
    verificationStatus: 'UNVERIFIED',
    rationale: `Entity record aggregated across cross-jurisdictional indices for subject ${label}. Subject to supervisory verification.`
  };
}
