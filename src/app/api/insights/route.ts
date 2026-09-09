import { NextResponse } from 'next/server';
import { seedInsights } from '@/data/seed';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const caseId = searchParams.get('caseId');
  const severity = searchParams.get('severity');

  let filtered = [...seedInsights];

  if (caseId) {
    filtered = filtered.filter(i => i.caseId === caseId);
  }

  if (severity && severity !== 'ALL') {
    filtered = filtered.filter(i => i.severity === severity);
  }

  return NextResponse.json(filtered);
}
