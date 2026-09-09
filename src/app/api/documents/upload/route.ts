import { NextResponse } from 'next/server';
import { analyzeDocument } from '@/lib/documents/analyzer';
import type { DocumentAnalysisStatus } from '@/types';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // In a real app we'd save the file to storage here
    // Generate a pseudo-random ID for demo
    const newDocId = `D-NEW-${Date.now()}`;
    const status: DocumentAnalysisStatus = 'COMPLETED';
    const docMeta = {
      id: newDocId,
      documentId: `DOC-NEW-${Math.floor(Math.random() * 10000)}`,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      analysisStatus: status,
      createdAt: new Date().toISOString(),
    };

    const analysis = analyzeDocument(docMeta);
    
    return NextResponse.json({
      success: true,
      data: {
        ...docMeta,
        ...analysis,
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
