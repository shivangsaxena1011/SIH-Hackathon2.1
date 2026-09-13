import { NextResponse } from 'next/server';
import { seedEvents } from '@/data/seed';
import { getCanonicalCaseId, getCaseNumber } from '@/lib/cases/case-service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const caseId = searchParams.get('caseId');

  let events = [...seedEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (type) {
    events = events.filter(e => e.entityType.toUpperCase() === type.toUpperCase());
  }

  if (caseId) {
    const canonicalId = getCanonicalCaseId(caseId).toLowerCase();
    const caseNum = getCaseNumber(caseId).toLowerCase();
    events = events.filter(e => {
      const eCase = (e.caseId || '').toLowerCase();
      return eCase === canonicalId || eCase === caseNum;
    });
  }

  return NextResponse.json(events);
}
