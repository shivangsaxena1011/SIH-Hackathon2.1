import { NextResponse } from 'next/server';
import { seedPersons } from '@/data/seed';

export async function GET() {
  return NextResponse.json(seedPersons);
}
