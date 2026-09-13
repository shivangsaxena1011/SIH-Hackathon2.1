import { NextResponse } from 'next/server';
import { seedInsights } from '@/data/seed';
import { getCanonicalCaseId, getCaseNumber } from '@/lib/cases/case-service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const caseId = searchParams.get('caseId');
  const severity = searchParams.get('severity');

  let filtered = [...seedInsights];

  if (caseId) {
    const canonicalId = getCanonicalCaseId(caseId).toLowerCase();
    const caseNum = getCaseNumber(caseId).toLowerCase();
    filtered = filtered.filter(i => {
      const iCase = (i.caseId || '').toLowerCase();
      return iCase === canonicalId || iCase === caseNum;
    });
  }

  if (severity && severity !== 'ALL') {
    filtered = filtered.filter(i => i.severity.toUpperCase() === severity.toUpperCase());
  }

  return NextResponse.json(filtered);
}
