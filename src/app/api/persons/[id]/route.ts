import { NextResponse } from 'next/server';
import { seedPersons, seedRelationships } from '@/data/seed';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const person = seedPersons.find(p => p.id === id || p.personId === id);
  if (!person) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  const relationships = seedRelationships.filter(
    r => r.sourceEntityId === person.id || r.targetEntityId === person.id
  );
  
  return NextResponse.json({ person, relationships });
}
