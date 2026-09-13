import { NextResponse } from 'next/server';
import { getCaseDeltas } from '@/lib/cases/delta-monitor';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deltas = getCaseDeltas(id);
  return NextResponse.json({ success: true, data: deltas });
}
