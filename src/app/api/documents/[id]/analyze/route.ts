import { NextResponse } from 'next/server';
import { analyzeDocument } from '@/lib/documents/analyzer';
import { seedDocuments } from '@/data/seed';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cleanId = (id || '').trim().toLowerCase();
  const doc = seedDocuments.find(
    d => d.id.toLowerCase() === cleanId || d.documentId.toLowerCase() === cleanId
  );

  if (!doc) {
    return NextResponse.json({ success: false, error: 'Document not found' }, { status: 404 });
  }

  // Simulate realistic forensic processing delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const analysis = analyzeDocument({
    id: doc.id,
    fileName: doc.fileName,
    fileSize: doc.fileSize,
    mimeType: doc.mimeType,
  });

  return NextResponse.json({
    success: true,
    data: {
      ...doc,
      ...analysis,
      analysisStatus: 'COMPLETED'
    }
  });
}
