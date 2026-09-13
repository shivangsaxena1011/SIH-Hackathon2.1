'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitMerge,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  X,
  Search,
  Sparkles,
  Info,
  Car,
  User,
  FileText,
  Briefcase,
  MapPin,
  Fingerprint
} from 'lucide-react';
import { findInvestigationPath } from '@/lib/graph/path-finder';
import type { InvestigationPath, EntityType } from '@/types';

interface PathFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSource?: string;
  defaultTarget?: string;
}

const PRESET_PATHS = [
  { source: 'P-1042', target: 'P-1412', label: 'Rahul Mehra \u2194 Harsh Pandey' },
  { source: 'P-1042', target: 'C-002', label: 'Rahul Mehra \u2194 Case #2026-017' },
  { source: 'P-1042', target: 'L-003', label: 'Rahul Mehra \u2194 Indore Logistics Hub' },
  { source: 'P-2041', target: 'P-3099', label: 'Arjun Verma \u2194 Sameer Khan' }
];

export default function PathFinderModal({
  isOpen,
  onClose,
  defaultSource = 'Rahul Mehra',
  defaultTarget = 'Harsh Pandey'
}: PathFinderModalProps) {
  const [source, setSource] = useState(defaultSource);
  const [target, setTarget] = useState(defaultTarget);
  const [pathResult, setPathResult] = useState<InvestigationPath | null>(() =>
    findInvestigationPath(defaultSource, defaultTarget)
  );
  const [maxHops, setMaxHops] = useState(5);

  const handleSearch = (s: string = source, t: string = target) => {
    const res = findInvestigationPath(s, t, maxHops);
    setPathResult(res);
  };

  const selectPreset = (presetSource: string, presetTarget: string) => {
    setSource(presetSource);
    setTarget(presetTarget);
    handleSearch(presetSource, presetTarget);
  };

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'PERSON': return <User className="w-4 h-4 text-purple-400" />;
      case 'VEHICLE': return <Car className="w-4 h-4 text-blue-400" />;
      case 'CASE': return <Briefcase className="w-4 h-4 text-amber-400" />;
      case 'DOCUMENT': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'LOCATION': return <MapPin className="w-4 h-4 text-rose-400" />;
      case 'IDENTIFIER': return <Fingerprint className="w-4 h-4 text-cyan-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A0F2E] border border-purple-500/30 rounded-xl shadow-2xl p-6 text-gray-100 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-400">
                <GitMerge className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-space font-bold text-white flex items-center gap-2">
                  INVESTIGATION PATH FINDER
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
                    MULTI-HOP CORRELATION
                  </span>
                </h2>
                <p className="text-xs text-gray-400">
                  Trace indirect syndicates, shared conduits, vehicle handoffs, and cross-case bridges
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-purple-900/40 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Demo Presets */}
          <div className="py-3 flex items-center gap-2 flex-wrap border-b border-purple-500/10">
            <span className="text-xs text-purple-300 font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> PRESETS:
            </span>
            {PRESET_PATHS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => selectPreset(p.source, p.target)}
                className="text-xs px-2.5 py-1 rounded bg-purple-950/60 hover:bg-purple-900/70 text-purple-200 border border-purple-500/20 hover:border-purple-400/40 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 py-4">
            <div className="md:col-span-5">
              <label className="text-[11px] font-mono text-gray-400 block mb-1">ORIGIN ENTITY</label>
              <input
                type="text"
                value={source}
                onChange={e => setSource(e.target.value)}
                placeholder="e.g. Rahul Mehra or P-1042"
                className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="md:col-span-5">
              <label className="text-[11px] font-mono text-gray-400 block mb-1">DESTINATION ENTITY</label>
              <input
                type="text"
                value={target}
                onChange={e => setTarget(e.target.value)}
                placeholder="e.g. Harsh Pandey or Case #2026-017"
                className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <button
                onClick={() => handleSearch()}
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Search className="w-4 h-4" /> TRACE
              </button>
            </div>
          </div>

          {/* Result Section */}
          {pathResult ? (
            <div className="space-y-4 pt-2">
              {/* Path Summary Metric Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#0B0716] border border-purple-500/20">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Path Separation</div>
                  <div className="text-xl font-bold text-white mt-1 flex items-baseline gap-1">
                    {pathResult.hops} <span className="text-xs font-normal text-purple-400">Degrees / Hops</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0B0716] border border-purple-500/20">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Composite Confidence</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1 flex items-baseline gap-1">
                    {pathResult.overallConfidence}% <span className="text-xs font-normal text-gray-400">Harmonic Avg</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0B0716] border border-purple-500/20">
                  <div className="text-[10px] font-mono text-gray-400 uppercase">Chain Validation</div>
                  <div className="text-sm font-bold text-purple-300 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Evidence Supported
                  </div>
                </div>
              </div>

              {/* Visual Node Sequence */}
              <div className="p-4 rounded-xl bg-[#0B0716]/80 border border-purple-500/30 overflow-x-auto">
                <div className="text-xs font-mono text-gray-400 mb-3 uppercase tracking-wider">
                  Sequential Graph Conduit Trail
                </div>
                <div className="flex items-center gap-3 min-w-max py-2">
                  {pathResult.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      {/* From Node */}
                      <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-950/70 border border-purple-500/40">
                        <div className="p-1.5 rounded bg-purple-900/50">
                          {getEntityIcon(step.fromNode.entityType)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">{step.fromNode.label}</div>
                          <div className="text-[10px] font-mono text-purple-400">{step.fromNode.entityType}</div>
                        </div>
                      </div>

                      {/* Edge Arrow */}
                      <div className="flex flex-col items-center px-1">
                        <span className="text-[10px] font-mono text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 mb-1">
                          {step.edge.type}
                        </span>
                        <div className="flex items-center text-purple-400">
                          <div className="h-[2px] w-6 bg-purple-500/50"></div>
                          <ArrowRight className="w-4 h-4 -ml-1 text-purple-400" />
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 mt-0.5">
                          {step.edge.confidence}% conf
                        </span>
                      </div>

                      {/* Render toNode only on final step */}
                      {idx === pathResult.steps.length - 1 && (
                        <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-purple-950/70 border border-purple-500/40">
                          <div className="p-1.5 rounded bg-purple-900/50">
                            {getEntityIcon(step.toNode.entityType)}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">{step.toNode.label}</div>
                            <div className="text-[10px] font-mono text-purple-400">{step.toNode.entityType}</div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Narrative & Provenance Box */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-3">
                <div className="text-xs font-semibold text-purple-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-purple-400" /> INVESTIGATIVE EXPLANATION
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {pathResult.explanation}
                </p>

                {/* Evidence items */}
                <div className="mt-3 pt-3 border-t border-purple-500/10 space-y-1.5">
                  <div className="text-[11px] font-mono text-gray-400 uppercase">Supporting Evidence & Provenance:</div>
                  {pathResult.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start justify-between text-xs py-1 px-2 rounded bg-black/40 border border-purple-500/10">
                      <span className="text-gray-300">
                        Step {idx + 1}: <strong className="text-white">{step.fromNode.label}</strong> &rarr; <strong className="text-white">{step.toNode.label}</strong>
                      </span>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                        step.provenance?.type === 'RECORDED'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}>
                        {step.provenance?.type || 'INFERRED'} ({step.provenance?.sourceEngine || 'SENTINEL Engine'})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <ShieldAlert className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <p className="text-sm">No viable connection path identified within {maxHops} hops.</p>
              <p className="text-xs text-gray-500 mt-1">Try selecting a different preset or adjusting entity names.</p>
            </div>
          )}

          {/* Footer Safety Notice */}
          <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-[11px] text-gray-500">
            <span>PRIORITY != GUILT — Path analysis provides investigative leads for officer verification.</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-purple-900/40 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
