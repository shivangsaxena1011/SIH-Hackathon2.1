import { NextResponse } from 'next/server';
import { getEntityGraph } from '@/lib/graph/graph-service';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ entityId: string }> }
) {
  const { entityId } = await params;
  const data = getEntityGraph(entityId);
  return NextResponse.json(data);
}
