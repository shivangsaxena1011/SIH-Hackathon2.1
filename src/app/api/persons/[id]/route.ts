import { NextResponse } from 'next/server';
import { seedPersons, seedRelationships } from '@/data/seed';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cleanId = (id || '').trim().toLowerCase();

  const person = seedPersons.find(
    p =>
      p.id.toLowerCase() === cleanId ||
      p.personId.toLowerCase() === cleanId ||
      p.name.toLowerCase() === cleanId ||
      p.aliases.some(a => a.toLowerCase() === cleanId)
  );

  if (!person) {
    return NextResponse.json({ error: 'Person not found' }, { status: 404 });
  }

  const relationships = seedRelationships.filter(
    r =>
      r.sourceEntityId.toLowerCase() === person.id.toLowerCase() ||
      r.targetEntityId.toLowerCase() === person.id.toLowerCase()
  );

  return NextResponse.json({ person, relationships });
}
