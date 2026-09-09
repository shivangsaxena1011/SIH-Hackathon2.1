import { NextResponse } from 'next/server';
import { seedDocuments } from '@/data/seed';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const document = seedDocuments.find(d => d.id === id || d.documentId === id);
  
  if (!document) {
    return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
  }
  
  return NextResponse.json({ success: true, data: document });
}
