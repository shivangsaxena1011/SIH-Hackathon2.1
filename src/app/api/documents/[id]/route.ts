import { NextResponse } from 'next/server';
import { seedDocuments } from '@/data/seed';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cleanId = (id || '').trim().toLowerCase();
  const document = seedDocuments.find(
    d => d.id.toLowerCase() === cleanId || d.documentId.toLowerCase() === cleanId
  );

  if (!document) {
    return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: document });
}
