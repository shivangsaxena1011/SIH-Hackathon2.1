import { NextResponse } from 'next/server';
import { seedEvents, seedLocations } from '@/data/seed';
import type { MapPoint } from '@/types';

export async function GET() {
  const points: MapPoint[] = seedEvents.map(event => {
    const loc = seedLocations.find(l => l.id === event.locationId);
    if (!loc) return null;
    return {
      id: event.id,
      lat: loc.lat,
      lng: loc.lng,
      label: loc.name,
      type: event.entityType,
      eventId: event.id,
      entityId: event.entityId,
      entityName: event.entityName,
      timestamp: event.timestamp,
      description: event.description,
      confidence: event.confidence,
      caseId: event.caseId
    };
  }).filter(Boolean) as MapPoint[];

  return NextResponse.json(points);
}
