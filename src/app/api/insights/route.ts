import { NextResponse } from 'next/server';
import { seedInsights } from '@/data/seed';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const caseId = searchParams.get('caseId');
  const severity = searchParams.get('severity');

  let filtered = [...seedInsights];

  if (caseId) {
    const cleanCase = caseId.trim().toLowerCase().replace(/^case[#\-_]?/, '').replace(/#/g, '');
    filtered = filtered.filter(i => {
      const iCase = (i.caseId || '').toLowerCase();
      return (
        iCase === caseId.toLowerCase() ||
        iCase === cleanCase ||
        (cleanCase === '2026-041' && iCase === 'c-001') ||
        (cleanCase === '2026-017' && iCase === 'c-002') ||
        (cleanCase === '2025-089' && iCase === 'c-003') ||
        (cleanCase === '2026-052' && iCase === 'c-004')
      );
    });
  }

  if (severity && severity !== 'ALL') {
    filtered = filtered.filter(i => i.severity.toUpperCase() === severity.toUpperCase());
  }

  return NextResponse.json(filtered);
}
