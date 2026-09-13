import { NextResponse } from 'next/server';
import { detectNetworkClusters } from '@/lib/graph/cluster-detector';

export async function GET() {
  const clusters = detectNetworkClusters();
  return NextResponse.json({ success: true, data: clusters });
}
