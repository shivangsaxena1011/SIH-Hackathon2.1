'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, ChevronDown, ChevronUp, Link as LinkIcon, Shield, Network, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Insight } from '@/types';
import { seedInsights } from '@/data/seed';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>('INS-001'); // Auto-expand INS-001 for demo
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch('/api/insights');
        if (!res.ok) throw new Error('Failed to fetch insights');
        const data = await res.json();
        setInsights(Array.isArray(data) ? data : seedInsights);
      } catch (error) {
        console.warn("[Insights Offline Fallback] Using local deterministic seed insights:", error);
        setInsights(seedInsights);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'MEDIUM': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredInsights = filter === 'ALL' ? insights : insights.filter(i => i.severity === filter);

  return (
    <ErrorBoundary
      fallbackTitle="AI Intelligence Engine Offline"
      fallbackMessage="Unable to connect to live analytical engine. Deterministic rule-based insights loaded."
    >
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold font-space text-white flex items-center gap-2.5">
            <ShieldAlert className="text-purple-500 w-7 h-7" />
            EXPLAINABLE AI INVESTIGATION ENGINE
          </h1>
          <p className="text-gray-400 mt-1 text-sm flex items-center">
            <Shield className="w-4 h-4 mr-2 text-purple-400" />
            AI-generated investigation leads with deterministic evidence citations. Not a determination of guilt.
          </p>
        </div>
        <div className="flex space-x-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                filter === f 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' 
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-center justify-between text-xs text-red-300">
        <span className="font-medium">
          PRIORITY NOTICE: AI insights provide structured hypotheses based on synthetic co-occurrences. Human review is strictly required before taking operational action.
        </span>
        <span className="font-mono font-bold uppercase tracking-wider text-red-400 shrink-0 ml-2">PRIORITY ≠ GUILT</span>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12 font-mono text-sm">Generating investigation insights...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredInsights.map((insight, idx) => {
            const isExpanded = expandedId === insight.id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={insight.id}
                className={`bg-[#1A0F2E] border rounded-xl overflow-hidden shadow-lg transition-all ${
                  insight.id === 'INS-001' ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-gray-800'
                }`}
              >
                <div className="p-6">
                  {/* Insight Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center border ${getSeverityColor(insight.severity)}`}>
                        {insight.severity} PRIORITY
                      </span>
                      <span className="text-xs text-gray-400 font-mono font-semibold">{insight.insightId}</span>
                      {insight.caseId && (
                        <span className="text-xs bg-black/40 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20 font-mono">
                          Case Link: {insight.caseId}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-2xl font-bold text-purple-400 font-space font-mono">{insight.confidence}%</span>
                        <span className="text-[10px] text-gray-500 uppercase block font-mono">Demo Confidence</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 font-space">{insight.title}</h2>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">{insight.summary}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Supporting Indicators */}
                    <div className="bg-[#0B0716]/60 rounded-xl p-4 border border-gray-800/80 space-y-3">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                        <LinkIcon className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
                        Supporting Indicators ({insight.supportingIndicators.length})
                      </h3>
                      <div className="space-y-2">
                        {insight.supportingIndicators.map((ind, i) => (
                          <div key={i} className="text-xs text-gray-300 flex items-start gap-2 bg-black/30 p-2 rounded-lg border border-gray-800/50">
                            <span className="text-green-400 font-bold">✓</span>
                            <div>
                              <span className="font-semibold text-white">{ind.label}: </span>
                              <span className="text-gray-400">{ind.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Action & Evidence Links */}
                    <div className="bg-[#0B0716]/60 rounded-xl p-4 border border-gray-800/80 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recommended Operational Action</h3>
                        <p className="text-xs text-gray-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-gray-800/50">
                          {insight.recommendedAction}
                        </p>
                      </div>

                      {insight.evidenceIds && insight.evidenceIds.length > 0 && (
                        <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                          <span className="text-xs text-gray-500">Evidence Citations:</span>
                          <div className="flex gap-1.5">
                            {insight.evidenceIds.map(eid => (
                              <Link
                                key={eid}
                                href="/evidence"
                                className="px-2 py-0.5 bg-gray-800 hover:bg-gray-700 text-purple-300 font-mono text-xs rounded border border-purple-500/30 transition"
                              >
                                {eid}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Explainability Accordion Button */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : insight.id)}
                    className="w-full flex items-center justify-between p-3.5 bg-purple-600/15 hover:bg-purple-600/25 text-purple-300 rounded-xl transition-colors text-xs font-medium border border-purple-500/30"
                  >
                    <span className="flex items-center font-bold font-mono tracking-wide">
                      WHY THIS INSIGHT? <span className="ml-2 text-xs text-purple-400/80 font-normal">(Deterministic Explainability Rationale)</span>
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-purple-400" /> : <ChevronDown className="w-4 h-4 text-purple-400" />}
                  </button>

                  {/* Expanded Explainability Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-5 bg-black/50 border border-purple-500/20 rounded-xl text-xs text-gray-300 leading-relaxed space-y-3"
                      >
                        <div>
                          <span className="font-bold text-purple-400 block mb-1 font-mono uppercase">Algorithmic Correlation Logic:</span>
                          <p>{insight.explanation}</p>
                        </div>
                        <div className="pt-3 border-t border-gray-800/80 flex flex-wrap gap-3 justify-end">
                          <Link
                            href="/network"
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition font-medium flex items-center gap-1.5 shadow-sm"
                          >
                            <Network className="w-3.5 h-3.5" /> View in Knowledge Graph
                          </Link>
                          <Link
                            href="/cross-case"
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg transition font-medium flex items-center gap-1.5 border border-gray-700"
                          >
                            View Cross-Case Overlap <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      </div>
    </ErrorBoundary>
  );
}
