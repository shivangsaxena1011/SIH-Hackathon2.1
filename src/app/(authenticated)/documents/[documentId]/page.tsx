'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { seedDocuments } from '@/data/seed';
import type { Document } from '@/types';
import { 
  FileText, ShieldAlert, Fingerprint, Network, ScanText, FileImage, 
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Info, Link as LinkIcon,
  CheckCircle2, RefreshCw, ExternalLink, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [doc, setDoc] = useState<Document | null>(null);
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    const docId = params.documentId as string;
    const found = seedDocuments.find(d => 
      d.id.toLowerCase() === docId?.toLowerCase() || 
      d.documentId.toLowerCase() === docId?.toLowerCase()
    ) || seedDocuments[0];

    if (found) {
      setDoc(found);
      if (found.entityResolution?.status === 'RESOLVED') {
        setIsResolved(true);
      }
    }
  }, [params.documentId]);

  if (!doc) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 font-mono">Loading document data...</div>
      </div>
    );
  }

  const ocr = doc.ocrData;
  const forensics = doc.forensicData;
  const resolution = doc.entityResolution;
  const isSuspicious = forensics?.overallScore && forensics.overallScore < 85;

  const handleResolveEntity = async () => {
    setIsResolving(true);
    try {
      // Record in audit log
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'officer.demo',
          userName: 'Inspector Priya Sharma',
          userRole: 'INVESTIGATING_OFFICER',
          action: 'RESOLVE_ENTITY',
          resource: 'Entity Resolution',
          resourceId: `${doc.documentId} → Rahul Mehra (P-1042)`,
          caseId: doc.caseId,
          result: 'ALLOWED',
          metadata: {
            confidence: '94%',
            candidate: 'Rahul Mehra (P-1042)',
            documentNumber: 'DOC-DEMO-44192',
          }
        })
      });

      // Simulate network response
      await new Promise(r => setTimeout(r, 800));
      setIsResolved(true);
    } catch (err) {
      console.error('Resolution error', err);
    } finally {
      setIsResolving(false);
    }
  };

  const handleReAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'officer.demo',
          userName: 'Inspector Priya Sharma',
          userRole: 'INVESTIGATING_OFFICER',
          action: 'RUN_FORENSIC_ANALYSIS',
          resource: 'Document Forensics',
          resourceId: doc.documentId,
          caseId: doc.caseId,
          result: 'ALLOWED',
        })
      });
      await new Promise(r => setTimeout(r, 1200));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ErrorBoundary
      fallbackTitle="Document Forensics Offline"
      fallbackMessage="Unable to stream real-time forensic scanner. Deterministic document intelligence loaded."
    >
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white font-space">DOCUMENT ANALYSIS</h1>
            <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded border border-purple-500/30 font-medium font-mono">
              DEMO ANALYTICS
            </span>
          </div>
          <p className="text-gray-400 text-sm">{doc.fileName} • {doc.documentType} • Linked to Case {doc.caseId}</p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="text-xs text-gray-500">
            Hash (SHA-256): <span className="font-mono text-purple-400" title={doc.hash}>{doc.hash.substring(0, 24)}...</span>
          </div>
          <button
            onClick={handleReAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-lg border border-gray-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin text-purple-400' : ''}`} />
            {isAnalyzing ? 'Analyzing Document...' : 'Re-Run Forensic Analysis'}
          </button>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-300">
          Prototype confidence values are simulated for demonstration. Entity resolution provides an investigative lead and does not establish identity or guilt.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Core Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Analysis Panel */}
          <section className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ScanText className="text-purple-400" />
              INTELLIGENCE SUMMARY
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">OCR Status</div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-400 font-medium text-sm">PASSED ({ocr?.accuracy || 96}%)</span>
                </div>
              </div>
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">Document Structure</div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-400 font-medium text-sm">CONSISTENT</span>
                </div>
              </div>
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">MRZ Check</div>
                <div className="flex items-center gap-2">
                  {ocr?.mrzData?.status === 'PASSED' ? (
                    <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-400 font-medium text-sm">PASSED</span></>
                  ) : (
                    <span className="text-gray-400 font-medium text-sm">NOT APPLICABLE</span>
                  )}
                </div>
              </div>
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">Field Consistency</div>
                <div className="flex items-center gap-2">
                  {ocr?.fields.some(f => f.matchStatus === 'REVIEW_REQUIRED') ? (
                    <><AlertTriangle className="w-4 h-4 text-amber-500" /><span className="text-amber-400 font-medium text-sm">REVIEW REQUIRED (88%)</span></>
                  ) : (
                    <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-400 font-medium text-sm">CONSISTENT (94%)</span></>
                  )}
                </div>
              </div>
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">Forensic Pre-Screen</div>
                <div className="flex items-center gap-2">
                  {isSuspicious ? (
                    <><AlertTriangle className="w-4 h-4 text-amber-500" /><span className="text-amber-400 font-medium text-sm">SUSPICIOUS ({forensics?.overallScore}%)</span></>
                  ) : (
                    <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-400 font-medium text-sm">NORMAL ({forensics?.overallScore || 90}%)</span></>
                  )}
                </div>
              </div>
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 mb-1">Identity Match</div>
                <div className="flex items-center gap-2">
                  {resolution?.resolvedConfidence ? (
                    <><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-green-400 font-medium text-sm">HIGH ({resolution.resolvedConfidence}%)</span></>
                  ) : (
                    <><AlertTriangle className="w-4 h-4 text-amber-500" /><span className="text-amber-400 font-medium text-sm">LOW/MEDIUM (61%)</span></>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Extracted Fields */}
          <section className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ScanText className="text-purple-400" />
              DOCUMENT FIELD EXTRACTION
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-xs text-gray-400">
                    <th className="py-2 px-3 font-medium">FIELD</th>
                    <th className="py-2 px-3 font-medium">OCR DATA</th>
                    <th className="py-2 px-3 font-medium">MRZ/ENCODED DATA</th>
                    <th className="py-2 px-3 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {ocr?.fields.map((field, idx) => (
                    <tr key={idx} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 text-sm text-gray-300 font-medium">{field.fieldName}</td>
                      <td className="py-3 px-3 text-sm text-white font-mono">{field.value}</td>
                      <td className="py-3 px-3 text-sm text-gray-400 font-mono">
                        {field.fieldName === 'Photo Region' ? 'N/A' : field.value}
                      </td>
                      <td className="py-3 px-3">
                        {field.matchStatus === 'MATCH' ? (
                          <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs border border-green-500/20">
                            MATCH ✓
                          </span>
                        ) : field.matchStatus === 'REVIEW_REQUIRED' ? (
                          <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-xs border border-amber-500/20 font-medium">
                            REVIEW REQUIRED ⚠
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-500/10 text-gray-400 px-2 py-0.5 rounded text-xs border border-gray-500/20">
                            N/A
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Forensics Panel */}
          <section className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileImage className="text-purple-400" />
              DOCUMENT FORENSICS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">Image Quality</span>
                  <span className={`text-xs font-bold ${forensics?.imageQuality.status === 'NORMAL' ? 'text-green-400' : 'text-amber-400'}`}>
                    {forensics?.imageQuality.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1 mt-3">
                  {forensics?.imageQuality.details && Object.entries(forensics.imageQuality.details).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="capitalize">{k}:</span>
                      <span className="text-gray-300">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#0B0716] p-4 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-300">Visual Integrity</span>
                  <span className={`text-xs font-bold ${forensics?.visualIntegrity.status === 'NORMAL' ? 'text-green-400' : 'text-amber-400'}`}>
                    {forensics?.visualIntegrity.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1 mt-3">
                  {forensics?.visualIntegrity.details && Object.entries(forensics.visualIntegrity.details).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className={`${v.toLowerCase().includes('anomaly') ? 'text-amber-400 font-medium' : 'text-gray-300'}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Forensic Signals</h3>
              {forensics?.signals.map((sig, idx) => (
                <div key={idx} className={`border rounded-lg overflow-hidden ${sig.status === 'SUSPICIOUS' ? 'border-amber-500/30' : 'border-gray-700'}`}>
                  <button 
                    onClick={() => setExpandedSignal(expandedSignal === sig.name ? null : sig.name)}
                    className="w-full flex items-center justify-between p-3 bg-[#0B0716] hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {sig.status === 'SUSPICIOUS' ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
                      <span className="text-sm font-medium text-gray-200">{sig.name}</span>
                      <span className="text-xs text-gray-500 hidden sm:inline-block">— {sig.description}</span>
                    </div>
                    {expandedSignal === sig.name ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </button>
                  <AnimatePresence>
                    {expandedSignal === sig.name && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#0B0716] px-3 pb-3 border-t border-gray-800"
                      >
                        <div className="pt-3 text-sm text-gray-400">
                          <span className="font-semibold text-gray-300">Why?</span> {sig.explanation}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column - Resolution & Fusion */}
        <div className="space-y-6">
          
          {/* Entity Resolution Panel */}
          <section className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Network className="text-purple-400" />
              ENTITY RESOLUTION
            </h2>
            
            <div className="mb-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Resolution Status</div>
              <div className={`p-3 rounded-lg border flex items-center gap-2 ${isResolved ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
                {isResolved ? <CheckCircle className="w-5 h-5 text-green-400" /> : <AlertTriangle className="w-5 h-5" />}
                <span className="font-medium text-sm">
                  {isResolved ? 'CONFIRMED MATCH: RAHUL MEHRA (P-1042)' : 'PENDING RESOLUTION CONFIRMATION'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-gray-500 uppercase tracking-wider">Candidate Matches</div>
              {resolution?.candidates.map((cand, idx) => (
                <div key={idx} className={`bg-[#0B0716] border rounded-lg p-3 ${idx === 0 && isResolved ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-gray-800'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-200">{cand.entityName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${idx === 0 && cand.confidence > 80 ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-800 text-gray-400'}`}>
                      {cand.confidence}% Match
                    </span>
                  </div>
                  <div className="space-y-1">
                    {cand.matchSignals.map((ms, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-gray-500">{ms.field}</span>
                        <span className={ms.score > 90 ? 'text-green-400' : ms.score > 50 ? 'text-amber-400' : 'text-gray-600'}>
                          {ms.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {!isResolved ? (
              <button 
                onClick={handleResolveEntity}
                disabled={isResolving}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-purple-600/20 disabled:opacity-50"
              >
                <LinkIcon className={`w-4 h-4 ${isResolving ? 'animate-spin' : ''}`} />
                {isResolving ? 'Resolving Identity in Knowledge Graph...' : 'RESOLVE ENTITY (CONNECT TO RAHUL MEHRA)'}
              </button>
            ) : (
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
                  <span>Document linked to Rahul Mehra (P-1042) in criminal knowledge graph.</span>
                </div>
                <Link
                  href="/network"
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-lg transition-colors text-sm font-medium"
                >
                  VIEW CONNECTIONS IN NETWORK GRAPH <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </section>

          {/* Evidence Fusion Panel */}
          <section className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ShieldAlert className="text-purple-400" />
              EVIDENCE FUSION
            </h2>
            
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Investigation Priority</div>
              <div className="text-sm text-red-300 font-medium">HIGH PRIORITY FOR AUTHORIZED REVIEW</div>
              <div className="text-[10px] text-red-400/70 mt-1 uppercase font-mono">PRIORITY ≠ GUILT</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
                <span className="text-gray-300">OCR Extraction</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
                <span className="text-gray-300">Document Rules</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
                <span className="text-gray-300">MRZ Validation</span>
                {ocr?.mrzData?.status === 'PASSED' ? <CheckCircle className="w-4 h-4 text-green-500" /> : <span className="text-gray-500 text-xs">N/A</span>}
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5 border border-amber-500/20">
                <span className="text-amber-400 font-medium">Forensic Pre-Screen</span>
                {isSuspicious ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <CheckCircle className="w-4 h-4 text-green-500" />}
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5 border border-amber-500/20">
                <span className="text-amber-400 font-medium">Identity Match Variance</span>
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
                <span className="text-gray-300">Cross-Case Association</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
                <span className="text-gray-300">Network Association</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-800">
              <details className="group" open>
                <summary className="text-sm text-purple-400 font-medium cursor-pointer list-none flex justify-between items-center">
                  4 Supporting Indicators
                  <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <ul className="mt-3 space-y-2 text-xs text-gray-400 list-disc pl-4">
                  <li>Inconsistent visual boundary detected on primary photo.</li>
                  <li>Identity resolution match score 94% with alias R. Mehra.</li>
                  <li>Existing cross-case association with Case #2026-017.</li>
                  <li>Entity associated with Vehicle MP09-DEMO-4821.</li>
                </ul>
              </details>
            </div>
          </section>
          
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}
