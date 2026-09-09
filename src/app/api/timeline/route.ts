import { NextResponse } from 'next/server';
import { seedEvents } from '@/data/seed';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const caseId = searchParams.get('caseId');

  let events = [...seedEvents].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  if (type) {
    events = events.filter(e => e.entityType === type);
  }
  if (caseId) {
    events = events.filter(e => e.caseId === caseId);
  }

  return NextResponse.json(events);
}
