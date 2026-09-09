import { NextResponse } from 'next/server';
import { seedPersons, seedCases, seedVehicles, seedLocations, seedDocuments, seedIdentifiers } from '@/data/seed';

interface SearchResultItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  link: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) return NextResponse.json<SearchResultItem[]>([]);

  const results: SearchResultItem[] = [];

  // Search Persons
  seedPersons.forEach(p => {
    if (
      p.name.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query) ||
      p.personId.toLowerCase().includes(query) ||
      (p.aliases && p.aliases.some(a => a.toLowerCase().includes(query)))
    ) {
      results.push({ id: p.id, type: 'PERSON', title: p.name, subtitle: `ID: ${p.id} | ${p.status}`, link: `/persons/${p.id}` });
    }
  });

  // Search Cases
  seedCases.forEach(c => {
    if (
      c.title.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query) ||
      c.caseNumber.toLowerCase().includes(query)
    ) {
      results.push({ id: c.id, type: 'CASE', title: `Case #${c.caseNumber}: ${c.title}`, subtitle: `${c.status} (${c.priority})`, link: `/cases/${c.id}` });
    }
  });

  // Search Vehicles
  seedVehicles.forEach(v => {
    if (
      v.registration.toLowerCase().includes(query) ||
      v.id.toLowerCase().includes(query) ||
      (v.make && v.make.toLowerCase().includes(query)) ||
      (v.model && v.model.toLowerCase().includes(query))
    ) {
      results.push({ id: v.id, type: 'VEHICLE', title: v.registration, subtitle: `${v.make} ${v.model} (${v.type})`, link: `/vehicles` });
    }
  });

  // Search Identifiers
  seedIdentifiers.forEach(i => {
    if (
      i.value.toLowerCase().includes(query) ||
      i.valueMasked.toLowerCase().includes(query) ||
      i.identifierId.toLowerCase().includes(query)
    ) {
      results.push({ id: i.id, type: 'IDENTIFIER', title: i.identifierId, subtitle: `${i.type}: ${i.valueMasked}`, link: `/identifiers` });
    }
  });

  // Search Documents
  seedDocuments.forEach(d => {
    if (
      d.documentId.toLowerCase().includes(query) ||
      d.fileName.toLowerCase().includes(query) ||
      d.documentType.toLowerCase().includes(query)
    ) {
      results.push({ id: d.id, type: 'DOCUMENT', title: d.documentId, subtitle: `${d.documentType} - ${d.fileName}`, link: `/documents/${d.id}` });
    }
  });

  // Search Locations
  seedLocations.forEach(l => {
    if (
      l.name.toLowerCase().includes(query) ||
      l.locationId.toLowerCase().includes(query)
    ) {
      results.push({ id: l.id, type: 'LOCATION', title: l.name, subtitle: `${l.type} - ${l.zone}`, link: `/map` });
    }
  });

  return NextResponse.json(results);
}
