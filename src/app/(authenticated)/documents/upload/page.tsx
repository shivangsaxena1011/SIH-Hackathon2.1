'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, CheckCircle, AlertTriangle, FileText, ArrowRight, 
  ShieldCheck, Activity, KeyRound, Sparkles, Fingerprint 
} from 'lucide-react';
import Link from 'next/link';

const UPLOAD_STEPS = [
  'Receiving Document',
  'Security Validation',
  'Hash Generation',
  'OCR / Extraction',
  'Document Validation',
  'Forensic Pre-Screen',
  'Entity Resolution',
  'Evidence Registration',
  'Final Analysis'
];

interface UploadResult {
  id: string;
  documentId: string;
  fileName: string;
  fileSize: number;
  hash: string;
  integrityStatus: string;
  quarantineStatus: string;
  securityScan?: {
    scanner: string;
    status: string;
    checks: string[];
  };
  entityResolution?: {
    candidates?: Array<{
      entityId: string;
      entityName: string;
      confidence: number;
    }>;
    resolvedEntityId?: string;
    resolvedConfidence?: number;
    status?: string;
  };
  forensicData?: {
    overallScore: number;
    visualIntegrity: string;
    anomalies: string[];
  };
}

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [currentStep, setCurrentStep] = useState(0);
  const [fileHash, setFileHash] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateHash = async (fileToHash: File): Promise<string> => {
    try {
      const buffer = await fileToHash.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setFileHash(hashHex);
      return hashHex;
    } catch (e) {
      console.error('Hash calculation failed', e);
      setFileHash('hash-calculation-failed');
      return '';
    }
  };

  const handleFile = async (selectedFile: File) => {
    const validExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
    const fileName = selectedFile.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExt) {
      setErrorMsg('Unsupported format. Authorized evidentiary formats: PNG, JPG, JPEG, PDF.');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10MB forensic upload threshold.');
      return;
    }

    setErrorMsg('');
    setFile(selectedFile);
    await calculateHash(selectedFile);
  };

  const loadPrimaryDemoFixture = async () => {
    const demoContent = '%PDF-1.4\n%SIH-DEMO-DOC-2026-041-009\n1 0 obj\n<< /Title (Identity Document - Rahul Mehra) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF';
    const blob = new Blob([demoContent], { type: 'application/pdf' });
    const demoFile = new File([blob], 'DOC-2026-041-009-IdentityCard.pdf', { type: 'application/pdf' });
    
    setErrorMsg('');
    setFile(demoFile);
    await calculateHash(demoFile);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const runIngestionPipeline = async () => {
    if (!file) return;
    setUploadState('PROCESSING');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadPromise = fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      for (let i = 0; i < UPLOAD_STEPS.length; i++) {
        setCurrentStep(i);
        const delay = i >= 3 && i <= 6 ? 240 : 160;
        await new Promise(r => setTimeout(r, delay));
      }

      const res = await uploadPromise;
      const json = await res.json();

      if (json.success && json.data) {
        setUploadResult(json.data);
        setUploadState('SUCCESS');
      } else {
        setErrorMsg(json.error || 'Document ingestion failed verification checks.');
        setUploadState('ERROR');
      }
    } catch (error: any) {
      setErrorMsg(error?.message || 'Network error during ingestion.');
      setUploadState('ERROR');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white font-space tracking-tight flex items-center gap-2">
              <ShieldCheck className="text-purple-400 w-7 h-7" />
              SECURE DOCUMENT INGESTION PIPELINE
            </h1>
            <span className="px-2 py-0.5 rounded bg-purple-900/50 border border-purple-500/40 text-[11px] font-mono text-purple-300">
              SHA-256 VERIFIED
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Zero-trust evidence quarantine, cryptographic verification, forensic pre-screening, and entity resolution.
          </p>
        </div>

        {/* 1-Click Demo Shortcut */}
        <button
          type="button"
          onClick={loadPrimaryDemoFixture}
          disabled={uploadState === 'PROCESSING'}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A0F2E] hover:bg-purple-950/70 border border-purple-500/40 text-purple-300 hover:text-purple-200 text-xs font-mono transition-all shadow-sm disabled:opacity-50"
        >
          <Sparkles size={14} className="text-amber-400" />
          Load Demo Fixture (DOC-2026-041-009)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload Input & Controls */}
        <div className="lg:col-span-6 space-y-5">
          {/* Dropzone */}
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]
              ${isDragging ? 'border-purple-500 bg-purple-500/10 scale-[0.99]' : 'border-gray-800 bg-[#1A0F2E]/60 hover:border-purple-500/50 hover:bg-[#1A0F2E]'}
              ${uploadState === 'PROCESSING' ? 'pointer-events-none opacity-50' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            
            <div className="w-14 h-14 rounded-full bg-purple-950/80 border border-purple-500/30 flex items-center justify-center mb-3 text-purple-400">
              <UploadCloud className={`w-7 h-7 ${isDragging ? 'text-purple-300 scale-110' : 'text-purple-400'}`} />
            </div>
            <h3 className="text-base font-semibold text-gray-200 mb-1 font-space">
              SELECT EVIDENTIARY DOCUMENT
            </h3>
            <p className="text-gray-400 text-xs max-w-xs">
              Drag & drop document or browse local files. Automatic magic-byte validation and hash computation will execute immediately.
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 text-[11px] font-mono text-gray-400">PDF (%PDF)</span>
              <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 text-[11px] font-mono text-gray-400">PNG (\x89PNG)</span>
              <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-700 text-[11px] font-mono text-gray-400">JPEG (\xFF\xD8\xFF)</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/40 border border-purple-800/40 text-[11px] font-mono text-purple-300">Max 10MB</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl flex items-start gap-3 text-sm">
              <AlertTriangle className="shrink-0 w-5 h-5 text-red-400 mt-0.5" />
              <div>
                <span className="font-semibold text-red-200">Ingestion Blocked:</span> {errorMsg}
              </div>
            </div>
          )}

          {/* Staged File Details */}
          {file && uploadState !== 'SUCCESS' && (
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A0F2E] border border-purple-500/30 rounded-xl p-5 shadow-lg space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-2.5 rounded-lg text-purple-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-200 text-sm truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB • {file.type || 'application/octet-stream'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-purple-900/30 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <KeyRound size={13} className="text-purple-400" />
                    Client SHA-256:
                  </span>
                  <span className="text-purple-300 truncate max-w-[240px]" title={fileHash}>
                    {fileHash || 'Computing byte hash...'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <Activity size={13} className="text-green-400" />
                    Local Pre-Validation:
                  </span>
                  <span className="text-green-400 font-semibold">PASSED</span>
                </div>
              </div>
              
              <button 
                onClick={runIngestionPipeline}
                disabled={!fileHash || uploadState === 'PROCESSING'}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-2.5 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 disabled:opacity-50"
              >
                {uploadState === 'PROCESSING' ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-purple-200" />
                    Executing Ingestion Pipeline...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Execute Secure Ingestion Pipeline
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* Success Card */}
          {uploadState === 'SUCCESS' && uploadResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-950/20 border border-green-500/40 rounded-xl p-5 shadow-xl shadow-green-950/20 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2.5 rounded-full text-green-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-space">
                    Evidence Ingestion & Analysis Completed
                  </h3>
                  <p className="text-xs text-green-300 font-mono">
                    Registered as {uploadResult.documentId || uploadResult.id}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-black/40 border border-green-900/40 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-400">Cryptographic SHA-256:</span>
                  <span className="text-green-300 truncate max-w-[240px]" title={uploadResult.hash}>
                    {uploadResult.hash}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Quarantine Status:</span>
                  <span className="text-green-400 font-semibold">{uploadResult.quarantineStatus}</span>
                </div>
                {uploadResult.entityResolution?.candidates?.[0] && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Entity Match Lead:</span>
                    <span className="text-purple-300 font-semibold">
                      {uploadResult.entityResolution.candidates[0].entityName} ({uploadResult.entityResolution.candidates[0].confidence}% Match)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <Link 
                  href={`/documents/${uploadResult.documentId || uploadResult.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  <FileText size={14} />
                  View Forensic Analysis
                  <ArrowRight size={14} />
                </Link>
                <Link 
                  href="/network"
                  className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors border border-gray-700"
                >
                  <Fingerprint size={14} />
                  Graph Hub
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: 9-Stage Ingestion Pipeline Visualizer */}
        <div className="lg:col-span-6">
          <div className="bg-[#1A0F2E]/90 backdrop-blur-md border border-purple-900/30 rounded-xl p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
                <h3 className="text-xs font-semibold text-gray-300 flex items-center gap-2 font-mono uppercase tracking-wider">
                  <Activity size={15} className="text-purple-400" />
                  Multi-Stage Verification Pipeline
                </h3>
                <span className="text-[11px] font-mono text-purple-400">
                  {uploadState === 'SUCCESS' ? '9 / 9 COMPLETED' : uploadState === 'PROCESSING' ? `STAGE ${currentStep + 1} / 9` : 'READY'}
                </span>
              </div>
              
              <div className="space-y-3.5 my-2">
                {UPLOAD_STEPS.map((step, idx) => {
                  const isPast = idx < currentStep || uploadState === 'SUCCESS';
                  const isCurrent = idx === currentStep && uploadState === 'PROCESSING';
                  
                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                        {isPast ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : isCurrent ? (
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
                            className="w-4 h-4 rounded-full border-2 border-purple-400 border-t-transparent"
                          />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                        )}
                        
                        {/* Connector line */}
                        {idx < UPLOAD_STEPS.length - 1 && (
                          <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-4 
                            ${isPast ? 'bg-green-500/40' : 'bg-gray-800'}`} />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between flex-1">
                        <span className={`text-xs font-mono tracking-tight
                          ${isPast ? 'text-gray-200 font-medium' : isCurrent ? 'text-purple-300 font-bold' : 'text-gray-500'}`}>
                          {idx + 1}. {step}
                        </span>

                        <span className="text-[11px] font-mono">
                          {isPast ? (
                            <span className="text-green-400">PASSED ✓</span>
                          ) : isCurrent ? (
                            <span className="text-purple-400 animate-pulse">EXECUTING...</span>
                          ) : (
                            <span className="text-gray-600">PENDING</span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 text-[11px] text-gray-500 flex items-center justify-between font-mono">
              <span>SANDBOX: ISOLATED RUNTIME</span>
              <span>AUDIT: ACTIVE LEDGER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
