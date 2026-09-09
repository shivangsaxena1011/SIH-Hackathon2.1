import { NextResponse } from 'next/server';
import { resolveEntity } from '@/lib/entity-resolution/resolver';

export async function POST(request: Request) {
  try {
    const { name, dob, documentNumber } = await request.json();
    
    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    
    const resolution = resolveEntity(name, dob, documentNumber);
    
    return NextResponse.json({ success: true, data: resolution });
  } catch (error) {
    console.error('Entity resolution error:', error);
    return NextResponse.json({ success: false, error: 'Entity resolution failed' }, { status: 500 });
  }
}
