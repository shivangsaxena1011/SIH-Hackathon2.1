'use client';

import { GitMerge, ArrowRight, ShieldAlert, Check, Minus, Layers, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CrossCasePage() {
  const overlapMatrix = [
    { entity: 'Rahul Mehra (P-1042)', type: 'PERSON', c041: true, c017: true, c089: true, role: 'Primary Network Hub / Subject' },
    { entity: 'Vehicle MP09-DEMO-4821', type: 'VEHICLE', c041: true, c017: true, c089: false, role: 'Swift Sedan (ANPR Co-occurrence)' },
    { entity: 'Arjun Verma (P-2041)', type: 'PERSON', c041: true, c017: true, c089: false, role: 'Known Associate / Passenger' },
    { entity: 'ID-DEMO-88421', type: 'IDENTIFIER', c041: true, c017: true, c089: false, role: 'Phone (91-XXXX-XXX-421)' },
    { entity: 'Bhopal Central Zone (L-001)', type: 'LOCATION', c041: true, c017: true, c089: true, role: 'Surveillance Focal Point' },
    { entity: 'Industrial Sector 7 (L-003)', type: 'LOCATION', c041: true, c017: false, c089: true, role: 'BHEL Industrial Area Checkpoint' },
    { entity: 'Vehicle MP09-DEMO-1122', type: 'VEHICLE', c041: true, c017: false, c089: true, role: 'Maruti Eeco Van' },
    { entity: 'Rakesh Dubey (P-1634)', type: 'PERSON', c041: false, c017: false, c089: false, role: 'Connected in Case #052 & #038' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-space text-white flex items-center gap-3">
            <GitMerge className="text-purple-500 w-8 h-8" />
            CROSS-CASE CORRELATION ANALYSIS
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Automated intelligence correlation across seemingly disconnected investigation files.
          </p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-xl text-right">
          <div className="text-xs text-purple-400 font-mono uppercase tracking-wider">Correlation Strength</div>
          <div className="text-xl font-bold text-white">HIGH CONFIDENCE (87%)</div>
        </div>
      </div>

      {/* Cross-case banner */}
      <div className="bg-[#1A0F2E] border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-space font-bold text-white">2 HIGH-VALUE CROSS-CASE CONNECTIONS DETECTED</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Case 041 */}
          <div className="bg-[#0B0716] border border-purple-500/30 rounded-xl p-5 space-y-2">
            <div className="text-xs text-purple-400 font-mono font-semibold uppercase">PRIMARY CASE #2026-041</div>
            <h3 className="text-base font-bold text-white">Operation Trishul</h3>
            <p className="text-xs text-gray-400">Multi-entity document fraud and vehicle movements in Central Zone.</p>
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
              Lead: Inspector Priya Sharma
            </div>
          </div>
          
          {/* Overlap Indicator */}
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full">
              4 Shared Entities Detected
            </span>
            <div className="flex items-center justify-center gap-3 text-purple-400 py-1">
              <span className="font-mono text-sm">↕</span>
              <GitMerge className="w-6 h-6 text-purple-400 animate-pulse" />
              <span className="font-mono text-sm">↕</span>
            </div>
            <Link 
              href="/network"
              className="text-xs text-purple-400 hover:text-purple-300 underline font-medium flex items-center gap-1"
            >
              Inspect Shared Graph Nodes <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          
          {/* Case 017 */}
          <div className="bg-[#0B0716] border border-blue-500/30 rounded-xl p-5 space-y-2">
            <div className="text-xs text-blue-400 font-mono font-semibold uppercase">CROSS CASE #2026-017</div>
            <h3 className="text-base font-bold text-white">Operation Kavach</h3>
            <p className="text-xs text-gray-400">Financial document irregularity investigation with suspicious vehicle registrations.</p>
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-800">
              Lead: Inspector Priya Sharma
            </div>
          </div>
        </div>
      </div>

      {/* Overlap Matrix Section */}
      <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-space font-semibold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              Cross-Case Overlap Matrix
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Deterministic presence evaluation of persons, vehicles, identifiers, and locations across active dockets.
            </p>
          </div>
          <span className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
            DEMO ANALYTICS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#0B0716] text-xs text-gray-400 border-b border-gray-800">
                <th className="p-3 font-semibold">ENTITY & IDENTIFIER</th>
                <th className="p-3 font-semibold">TYPE</th>
                <th className="p-3 font-semibold text-center">CASE #2026-041 (Trishul)</th>
                <th className="p-3 font-semibold text-center">CASE #2026-017 (Kavach)</th>
                <th className="p-3 font-semibold text-center">CASE #2025-089 (Netra)</th>
                <th className="p-3 font-semibold">CORRELATION CONTEXT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {overlapMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-medium text-white font-mono text-xs">
                    {row.entity}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      {row.type}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {row.c041 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 font-bold text-xs">
                        ✓
                      </span>
                    ) : (
                      <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.c017 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 font-bold text-xs">
                        ✓
                      </span>
                    ) : (
                      <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-3 text-center">
                    {row.c089 ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 font-bold text-xs">
                        ✓
                      </span>
                    ) : (
                      <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-3 text-xs text-gray-300">
                    {row.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-gray-400">
          <div>
            Discovered 2 common surveillance locations and 1 identical transport vehicle across investigations.
          </div>
          <Link
            href="/network"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition font-medium flex items-center gap-1.5 shrink-0"
          >
            Launch Combined Knowledge Graph <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
