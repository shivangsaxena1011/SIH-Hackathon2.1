import { NextResponse } from 'next/server';
import { seedEvidence } from '@/data/seed';

export async function GET() {
  return NextResponse.json(seedEvidence);
}
