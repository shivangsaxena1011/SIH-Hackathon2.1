import { NextResponse } from 'next/server';
import { calculateInvestigationPriorityScore } from '@/lib/ai/priority-score';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const priority = calculateInvestigationPriorityScore(id);
  return NextResponse.json({ success: true, data: priority });
}
