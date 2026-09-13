'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, ChevronRight, X, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { getCaseDeltas } from '@/lib/cases/delta-monitor';
import type { InvestigationDelta } from '@/types';

interface InvestigationChangeBannerProps {
  caseQuery: string;
}

export default function InvestigationChangeBanner({ caseQuery }: InvestigationChangeBannerProps) {
  const [delta] = useState<InvestigationDelta>(() => getCaseDeltas(caseQuery));
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !delta || delta.items.length === 0) return null;

  return (
    <>
      {/* Subtle Top Notification Bar */}
      <div className="bg-gradient-to-r from-purple-950/80 via-[#1A0F2E] to-purple-950/80 border border-purple-500/30 rounded-xl p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="relative p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-space font-bold text-white flex items-center gap-2">
              <span>{delta.totalDeltas} NEW INTELLIGENCE UPDATES</span>
              <span className="text-[10px] font-mono font-normal text-purple-300 px-1.5 py-0.5 rounded bg-purple-900/60">
                SINCE LAST REVIEW
              </span>
            </div>
            <p className="text-[11px] text-gray-300">
              New vehicle transit checkpoint log and cross-case association detected for Case #{delta.caseNumber}.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-md"
          >
            REVIEW CHANGES <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#1A0F2E] border border-purple-500/30 rounded-xl shadow-2xl p-6 text-gray-100 flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded bg-amber-500/20 text-amber-300">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-space font-bold text-white">WHAT CHANGED IN THIS INVESTIGATION?</h3>
                    <p className="text-xs text-gray-400">
                      Case #{delta.caseNumber} • Deltas since {new Date(delta.lastReviewedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delta Items List */}
              <div className="py-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
                {delta.items.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg bg-[#0B0716] border border-purple-500/20 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          item.severity === 'ALERT'
                            ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                            : item.severity === 'WARNING'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-950 text-blue-300 border border-blue-500/30'
                        }`}>
                          {item.type.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Deltas verified via SENTINEL Change Monitor</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setDismissed(true);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Check className="w-4 h-4" /> ACKNOWLEDGE & MARK REVIEWED
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
