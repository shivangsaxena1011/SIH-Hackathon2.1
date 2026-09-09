import { NextResponse } from 'next/server';
import { getFullGraph } from '@/lib/graph/graph-service';

export async function GET() {
  const data = getFullGraph();
  return NextResponse.json(data);
}
