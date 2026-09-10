import { NextResponse } from 'next/server';
import { seedEvents } from '@/data/seed';

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
    const cleanCase = caseId.trim().toLowerCase().replace(/^case[#\-_]?/, '').replace(/#/g, '');
    events = events.filter(e => {
      const eCase = (e.caseId || '').toLowerCase();
      return (
        eCase === caseId.toLowerCase() ||
        eCase === cleanCase ||
        (cleanCase === '2026-041' && eCase === 'c-001') ||
        (cleanCase === '2026-017' && eCase === 'c-002') ||
        (cleanCase === '2025-089' && eCase === 'c-003') ||
        (cleanCase === '2026-052' && eCase === 'c-004')
      );
    });
  }

  return NextResponse.json(events);
}
