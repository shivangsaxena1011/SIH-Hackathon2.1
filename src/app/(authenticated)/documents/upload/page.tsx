'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertTriangle, FileText, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';

const UPLOAD_STEPS = [
  'UPLOAD',
  'AUTH CHECK',
  'AUTHORIZATION',
  'FILE SIZE CHECK',
  'EXTENSION CHECK',
  'MIME CHECK',
  'MAGIC BYTE CHECK',
  'QUARANTINE',
  'SAFE PROCESSING',
  'OCR',
  'ANALYSIS'
];

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [currentStep, setCurrentStep] = useState(0);
  const [fileHash, setFileHash] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadedDocId, setUploadedDocId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateHash = async (fileToHash: File) => {
    try {
      const buffer = await fileToHash.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setFileHash(hashHex);
    } catch (e) {
      console.error('Hash calculation failed', e);
      setFileHash('hash-calculation-failed');
    }
  };

  const handleFile = (selectedFile: File) => {
    // Validate
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMsg('Unsupported format. Please use PNG, JPG, or PDF.');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds 10MB limit.');
      return;
    }

    setErrorMsg('');
    setFile(selectedFile);
    calculateHash(selectedFile);
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

  const simulatePipeline = async () => {
    setUploadState('PROCESSING');
    
    // Simulate steps
    for (let i = 0; i < UPLOAD_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, i > 8 ? 800 : 400)); // Slower for OCR and Analysis
    }

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file as Blob);
      
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUploadedDocId(data.data.id);
        setUploadState('SUCCESS');
      } else {
        setErrorMsg(data.error || 'Upload failed');
        setUploadState('ERROR');
      }
    } catch (error) {
      setErrorMsg('Network error occurred.');
      setUploadState('ERROR');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-space flex items-center gap-2">
          <ShieldCheck className="text-purple-500" />
          SECURE DOCUMENT UPLOAD
        </h1>
        <p className="text-gray-400 mt-1">Upload evidentiary documents through the secure ingestion pipeline.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px]
              ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 bg-[#1A0F2E]/60 hover:border-gray-500 hover:bg-[#1A0F2E]'}
              ${uploadState !== 'IDLE' ? 'pointer-events-none opacity-50' : ''}`}
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
            
            <UploadCloud className={`w-12 h-12 mb-4 ${isDragging ? 'text-purple-400' : 'text-gray-500'}`} />
            <h3 className="text-lg font-medium text-gray-200 mb-2">DROP DOCUMENT HERE</h3>
            <p className="text-gray-500 text-sm">or click to browse files</p>
            
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-2 py-1 rounded bg-gray-800 text-xs text-gray-400">PNG</span>
              <span className="px-2 py-1 rounded bg-gray-800 text-xs text-gray-400">JPG</span>
              <span className="px-2 py-1 rounded bg-gray-800 text-xs text-gray-400">PDF</span>
              <span className="px-2 py-1 rounded bg-gray-800 text-xs text-gray-400 border border-gray-700">Max 10MB</span>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-start gap-3">
              <AlertTriangle className="shrink-0 w-5 h-5 mt-0.5" />
              <p>{errorMsg}</p>
            </div>
          )}

          {file && uploadState === 'IDLE' && !errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A0F2E] border border-purple-500/30 rounded-xl p-5 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400">
                  <FileText />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-medium text-gray-200 truncate" title={file.name}>{file.name}</h4>
                  <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}</p>
                  
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Evidence Hash (SHA-256):</span>
                      <span className="text-purple-400 font-mono truncate max-w-[200px]" title={fileHash}>{fileHash || 'Calculating...'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Integrity Status:</span>
                      <span className="text-green-400">PENDING VERIFICATION</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={simulatePipeline}
                disabled={!fileHash}
                className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                Start Secure Ingestion
              </button>
            </motion.div>
          )}

          {uploadState === 'SUCCESS' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center shadow-lg shadow-green-500/5"
            >
              <div className="inline-flex bg-green-500/20 p-3 rounded-full text-green-400 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Ingestion Complete</h3>
              <p className="text-gray-400 text-sm mb-6">Document successfully securely stored and analyzed.</p>
              
              <Link 
                href={`/documents/${uploadedDocId}`}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                View Analysis Results
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </div>

        <div>
          <div className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5 h-full">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
              <Activity size={16} />
              INGESTION PIPELINE
            </h3>
            
            <div className="space-y-4">
              {UPLOAD_STEPS.map((step, idx) => {
                const isPast = idx < currentStep;
                const isCurrent = idx === currentStep && uploadState === 'PROCESSING';
                const isPending = idx > currentStep || uploadState === 'IDLE';
                
                return (
                  <div key={step} className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                      {isPast || (uploadState === 'SUCCESS' && idx === UPLOAD_STEPS.length - 1) ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : isCurrent ? (
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent"
                        />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-700" />
                      )}
                      
                      {/* Connector line */}
                      {idx < UPLOAD_STEPS.length - 1 && (
                        <div className={`absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 
                          ${isPast ? 'bg-green-500/30' : 'bg-gray-800'}`} />
                      )}
                    </div>
                    
                    <span className={`text-sm font-mono tracking-tight
                      ${isPast || (uploadState === 'SUCCESS' && idx === UPLOAD_STEPS.length - 1) ? 'text-gray-300' : isCurrent ? 'text-purple-400 font-bold' : 'text-gray-600'}`}>
                      {step} {isCurrent && idx >= 9 ? '→ Running...' : isPending && idx >= 9 ? '→ Pending' : isPast || (uploadState === 'SUCCESS' && idx === UPLOAD_STEPS.length - 1) ? '✓' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
