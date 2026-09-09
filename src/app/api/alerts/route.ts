import { NextResponse } from 'next/server';
import { seedAlerts } from '@/data/seed';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const severity = searchParams.get('severity');
  
  let filtered = seedAlerts;
  if (severity) {
    filtered = filtered.filter(a => a.severity === severity);
  }
  
  return NextResponse.json(filtered);
}
