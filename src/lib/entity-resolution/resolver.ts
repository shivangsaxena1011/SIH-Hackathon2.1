import { seedPersons } from '@/data/seed';
import { EntityCandidate, EntityResolutionResult, MatchSignal } from '@/types';

export function resolveEntity(
  name: string,
  dob?: string,
  documentNumber?: string
): EntityResolutionResult {
  const candidates: EntityCandidate[] = [];

  for (const person of seedPersons) {
    let score = 0;
    const signals: MatchSignal[] = [];

    // Simple mock logic for demo
    if (person.name.toLowerCase() === name.toLowerCase()) {
      score += 50;
      signals.push({ field: 'Name similarity', score: 96, description: 'Exact name match' });
    } else if (person.aliases.some((alias) => alias.toLowerCase() === name.toLowerCase())) {
      score += 40;
      signals.push({ field: 'Name similarity', score: 82, description: 'Alias match' });
    } else if (person.name.toLowerCase().includes(name.split(' ')[0]?.toLowerCase() || '')) {
      score += 20;
      signals.push({ field: 'Name similarity', score: 55, description: 'Partial name match' });
    }

    if (dob && person.dob === dob) {
      score += 30;
      signals.push({ field: 'DOB match', score: 100, description: 'Date of birth matches exactly' });
    }

    // In a real app we would query identifiers for the document number
    if (documentNumber) {
      // Mock document linkage
      if (person.id === 'P-1042' && documentNumber.includes('44192')) {
        score += 20;
        signals.push({ field: 'Document linkage', score: 100, description: 'Document number linked to entity record' });
      } else {
        // Just generic fallback
        if (score > 30) {
          signals.push({ field: 'Historical association', score: 87, description: 'Entity has prior investigation history' });
        }
      }
    }

    if (score > 0) {
      candidates.push({
        entityId: person.id,
        entityName: person.name,
        confidence: Math.min(Math.round(score * 1.1), 99),
        matchSignals: signals,
      });
    }
  }

  candidates.sort((a, b) => b.confidence - a.confidence);
  const bestMatch = candidates[0];

  return {
    candidates: candidates.slice(0, 3), // Return top 3
    resolvedEntityId: bestMatch && bestMatch.confidence > 80 ? bestMatch.entityId : undefined,
    resolvedConfidence: bestMatch ? bestMatch.confidence : undefined,
    status: bestMatch && bestMatch.confidence > 80 ? 'RESOLVED' : bestMatch ? 'REVIEW_REQUIRED' : 'NO_MATCH',
  };
}
