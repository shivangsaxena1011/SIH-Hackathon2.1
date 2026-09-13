import { seedCases } from '@/data/seed';
import type { Case, UserRole } from '@/types';

/**
 * Case Service & Canonical Lookup Engine
 * Dynamically resolves any case number, alias, or internal ID using seed dataset.
 * Eliminates hardcoded case ID mappings across graph, timeline, and insights.
 */

export function normalizeCaseQuery(query: string): string {
  if (!query) return '';
  return query
    .trim()
    .toLowerCase()
    .replace(/^(case\s*[#\-_]?|#)/i, '')
    .replace(/[#\s]/g, '');
}

/**
 * Finds a Case object dynamically by case number or canonical ID.
 */
export function findCanonicalCase(query: string): Case | undefined {
  if (!query) return undefined;
  const clean = normalizeCaseQuery(query);
  const rawClean = query.trim().toLowerCase();

  return seedCases.find(c => {
    const cId = c.id.toLowerCase();
    const cNum = c.caseNumber.toLowerCase();
    return (
      cId === clean ||
      cNum === clean ||
      cId === rawClean ||
      cNum === rawClean ||
      normalizeCaseQuery(c.caseNumber) === clean ||
      normalizeCaseQuery(c.id) === clean
    );
  });
}

/**
 * Returns canonical case ID (e.g. 'C-001') for any case query or number.
 */
export function getCanonicalCaseId(query: string): string {
  const found = findCanonicalCase(query);
  return found ? found.id : query;
}

/**
 * Returns formatted case number (e.g. '2026-041') for any case query or ID.
 */
export function getCaseNumber(query: string): string {
  const found = findCanonicalCase(query);
  return found ? found.caseNumber : query;
}

/**
 * Check if a case is restricted and if the given role is authorized.
 */
export function isCaseAuthorized(caseQuery: string, role: UserRole): boolean {
  const found = findCanonicalCase(caseQuery);
  if (!found) return true;
  // C-999 / 2026-999 restricted case policy
  if (found.id === 'C-999' || found.caseNumber === '2026-999') {
    return role === 'SUPER_ADMIN';
  }
  return true;
}

export function getAllCases(): Case[] {
  return seedCases;
}
