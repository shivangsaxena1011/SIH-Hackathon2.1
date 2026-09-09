import { ForensicData, OCRData, Document } from '@/types';

export function analyzeDocument(docMetadata: Partial<Document>): { ocrData: OCRData; forensicData: ForensicData } {
  // Deterministic mock based on filename or type
  const isSuspicious = docMetadata.fileName?.includes('suspicious') || docMetadata.fileName?.includes('fake');
  
  const ocrData: OCRData = {
    accuracy: isSuspicious ? 82 : 96,
    fields: [
      { fieldName: 'Name', value: 'Rahul Mehra', confidence: isSuspicious ? 75 : 98, matchStatus: isSuspicious ? 'REVIEW_REQUIRED' : 'MATCH' },
      { fieldName: 'DOB', value: '1994-08-17', confidence: 97, matchStatus: 'MATCH' },
      { fieldName: 'Document Number', value: 'DOC-DEMO-44192', confidence: 95, matchStatus: 'MATCH' },
      { fieldName: 'Nationality', value: 'IND', confidence: 99, matchStatus: 'MATCH' },
      { fieldName: 'Expiry', value: '2030-06-21', confidence: 94, matchStatus: 'MATCH' },
    ],
    rawText: 'DEMO IDENTITY CARD\nName: Rahul Mehra\nDOB: 17/08/1994\nDoc No: DOC-DEMO-44192\nNationality: IND\nExpiry: 21/06/2030',
    mrzData: { status: 'PASSED', fields: { line1: 'DEMO<<MEHRA<<RAHUL', line2: 'DOC-DEMO-44192<IND<9408171M3006217' } },
  };

  const forensicData: ForensicData = {
    overallScore: isSuspicious ? 64 : 88,
    imageQuality: { 
      status: 'NORMAL', 
      score: 91, 
      details: { resolution: '300 DPI', blur: 'Minimal', glare: 'None', compression: 'Standard', perspective: 'Normal' } 
    },
    visualIntegrity: { 
      status: isSuspicious ? 'SUSPICIOUS' : 'NORMAL', 
      score: isSuspicious ? 55 : 84, 
      details: { textRegion: 'Normal', imageRegion: isSuspicious ? 'Anomaly detected' : 'Normal', copyPaste: 'No indicators', syntheticPattern: isSuspicious ? 'Possible synthetic artifacts' : 'None' } 
    },
    textAnalysis: { 
      status: 'REVIEW', 
      score: 82, 
      details: { fontConsistency: 'Consistent', spacing: 'Normal', alignment: 'Minor deviation' } 
    },
    signals: isSuspicious ? [
      { name: 'Photo Boundary', status: 'SUSPICIOUS', description: 'Photo region shows potential manipulation indicators', explanation: 'Edge analysis detected subtle inconsistencies at the photo-to-background boundary.' },
      { name: 'Synthetic Check', status: 'REVIEW', description: 'Possible synthetic pattern indicators', explanation: 'Pattern analysis detected minor artifacts that warrant manual review.' }
    ] : [
      { name: 'Image Quality', status: 'NORMAL', description: 'Document image meets quality thresholds', explanation: 'Resolution, blur, and compression levels are within expected parameters.' }
    ],
  };

  return { ocrData, forensicData };
}
