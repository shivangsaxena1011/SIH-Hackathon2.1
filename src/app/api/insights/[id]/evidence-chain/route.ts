import { NextResponse } from 'next/server';
import { getEvidenceChainForInsight } from '@/lib/ai/evidence-chain';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const chain = getEvidenceChainForInsight(id);
  return NextResponse.json({ success: true, data: chain });
}
