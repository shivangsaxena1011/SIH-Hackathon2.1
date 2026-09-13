'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { getEvidenceChainForInsight } from '@/lib/ai/evidence-chain';
import type { EvidenceChain } from '@/types';

interface WhyInsightModalProps {
  isOpen: boolean;
  onClose: () => void;
  insightId: string;
}

export default function WhyInsightModal({
  isOpen,
  onClose,
  insightId
}: WhyInsightModalProps) {
  const [chain] = useState<EvidenceChain>(() => getEvidenceChainForInsight(insightId));

  if (!isOpen || !chain) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#1A0F2E] border border-purple-500/30 rounded-xl shadow-2xl p-6 text-gray-100 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-300">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block">
                  EXPLAINABLE AI EVIDENCE CHAIN
                </span>
                <h3 className="text-lg font-space font-bold text-white">
                  Why This Insight? — How SENTINEL Connected Entities
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-purple-900/40 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 space-y-4">
            {/* Title / Objective */}
            <div className="p-3.5 rounded-lg bg-[#0B0716] border border-purple-500/20">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Insight Proposition</div>
              <div className="text-sm font-bold text-white mt-0.5">{chain.title}</div>
              <div className="text-xs text-purple-300 mt-1 font-mono">
                Target Entity: {chain.targetEntity}
              </div>
            </div>

            {/* Step-by-Step Evidence Traversal */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                Multi-Hop Step-by-Step Evidential Provenance:
              </div>

              {chain.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#0B0716]/90 border border-purple-500/20 flex items-start space-x-3 relative"
                >
                  <div className="w-6 h-6 rounded-full bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{step.entityName}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300">
                          {step.entityType}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {step.confidence}% conf
                      </span>
                    </div>

                    <p className="text-xs text-gray-300 mt-1">{step.actionOrRelation}</p>

                    <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-gray-500">
                      <span>Source: {step.source}</span>
                      {step.timestamp && (
                        <span>• {new Date(step.timestamp).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* System Conclusion */}
            <div className="p-3.5 rounded-lg bg-purple-950/40 border border-purple-500/30">
              <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SYSTEM EXPLANATION & REASONING
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{chain.conclusion}</p>
            </div>

            {/* Supervisory Verification Inquiries */}
            <div className="p-3.5 rounded-lg bg-[#0B0716] border border-purple-500/20">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-4 h-4" /> Recommended Officer Verification Steps
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
                {chain.verificationRecommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between text-[11px] text-gray-500">
            <span>PRIORITY != GUILT • AI recommendations must be corroborated by authorized officers.</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
