'use client';

import { KPICard } from '@/components/dashboard/KPICard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { 
  FileSearch, AlertTriangle, GitMerge, Link as LinkIcon, FileKey, 
  ShieldAlert, Activity, ShieldCheck, Cpu, Map, ArrowRight, Network, CheckCircle2, X 
} from 'lucide-react';
import { seedAlerts, seedInsights, seedEvidence, seedCases } from '@/data/seed';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [showResetBanner, setShowResetBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('reset=true')) {
      setShowResetBanner(true);
      const timer = setTimeout(() => setShowResetBanner(false), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const topAlerts = seedAlerts.slice(0, 5);
  const primaryInsight = seedInsights[0];
  const recentEvidence = seedEvidence.slice(0, 3);
  const primaryCase = seedCases[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {showResetBanner && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-xl flex items-center justify-between text-emerald-300 text-sm shadow-lg">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider">DEMO ENVIRONMENT RESTORED:</span> All synthetic cases, document forensics, and network relationships reset to canonical state.
            </div>
          </div>
          <button 
            onClick={() => setShowResetBanner(false)}
            className="p-1 hover:bg-emerald-500/20 rounded-md text-emerald-400 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-space font-bold text-white flex items-center gap-2.5">
            <ShieldAlert className="text-purple-500 w-7 h-7" />
            SECURE CRIMINAL INTELLIGENCE COMMAND
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Centralized multi-source correlation • Identity & Document Intelligence • Real-Time Network Analysis
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/cases/C-001"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-600/25 flex items-center gap-1.5 transition"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            START DEMO (Case #2026-041) &rarr;
          </Link>
          <Link
            href="/demo"
            className="px-3.5 py-2 bg-[#1A0F2E] hover:bg-white/10 text-purple-300 border border-purple-500/30 font-medium text-xs rounded-xl flex items-center gap-1.5 transition"
          >
            Guided 11-Step Tour
          </Link>
          <div className="px-3 py-1.5 border border-pink-400/40 text-pink-300 text-xs font-mono font-bold rounded-lg tracking-wider bg-pink-500/10">
            SIH DEMO • SYNTHETIC DATA
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <KPICard title="Active Investigations" value={47} icon={FileSearch} color="text-purple-400" />
        <KPICard title="High Priority Alerts" value="08" icon={AlertTriangle} color="text-red-400" />
        <KPICard title="Entities Correlated Today" value={126} icon={GitMerge} color="text-blue-400" />
        <KPICard title="Cross-Case Connections" value={19} icon={LinkIcon} color="text-pink-400" />
        <KPICard title="Evidence Items" value={342} icon={FileKey} color="text-emerald-400" />
        <KPICard title="Audit Events" value="1,284" icon={Activity} color="text-amber-400" />
      </div>

      {/* Main Grid: Activity Feed, Network Core, Priority Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Activity Feed */}
        <div className="col-span-1 h-full min-h-[440px]">
          <ActivityFeed />
        </div>

        {/* CENTER: Primary Active Investigation Network Summary */}
        <div className="col-span-1 bg-[#1A0F2E] rounded-xl border border-purple-500/20 p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#1A0F2E] to-[#1A0F2E]"></div>
          
          <div className="z-10 w-full space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-purple-400 tracking-wider font-bold">PRIMARY FOCUS DOCKET</span>
                <h3 className="text-lg font-space font-bold text-white">Case #2026-041 (Operation Trishul)</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30 font-bold font-mono">
                HIGH PRIORITY
              </span>
            </div>

            {/* Central Network Graphic */}
            <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center border-2 border-purple-500/40 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="absolute inset-2 border border-pink-400/30 rounded-full animate-pulse"></div>
              <div className="absolute inset-6 border border-purple-400/20 rounded-full"></div>
              <div className="text-center z-10">
                <div className="text-3xl font-bold text-white font-mono">P-1042</div>
                <div className="text-[10px] text-purple-300 font-bold uppercase mt-0.5">Rahul Mehra (Hub)</div>
                <div className="text-[10px] text-gray-500">7 Direct Links</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-black/40 rounded-xl border border-gray-800">
              <div>
                <div className="text-base font-bold text-purple-400 font-mono">12</div>
                <div className="text-gray-500 text-[10px] uppercase">Entities</div>
              </div>
              <div>
                <div className="text-base font-bold text-pink-400 font-mono">4</div>
                <div className="text-gray-500 text-[10px] uppercase">Cross-Case</div>
              </div>
              <div>
                <div className="text-base font-bold text-emerald-400 font-mono">94%</div>
                <div className="text-gray-500 text-[10px] uppercase">Resolution</div>
              </div>
            </div>
          </div>

          <div className="z-10 pt-4 flex gap-2">
            <Link
              href="/cases/C-001"
              className="flex-1 py-2 text-center bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium rounded-lg border border-gray-700 transition"
            >
              Open Case File
            </Link>
            <Link
              href="/network"
              className="flex-1 py-2 text-center bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg transition flex items-center justify-center gap-1 shadow-md shadow-purple-600/20"
            >
              <Network className="w-3.5 h-3.5" /> Launch Graph
            </Link>
          </div>
        </div>

        {/* RIGHT: Real Priority Alerts */}
        <div className="col-span-1 bg-[#1A0F2E] rounded-xl border border-purple-500/20 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-space font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Priority Investigation Alerts
              </h3>
              <Link href="/alerts" className="text-xs text-purple-400 hover:underline">
                All Alerts ({seedAlerts.length}) &rarr;
              </Link>
            </div>

            <div className="space-y-2.5">
              {topAlerts.map(alert => (
                <Link
                  key={alert.id}
                  href={alert.caseId ? `/cases/${alert.caseId}` : '/alerts'}
                  className="block bg-black/30 p-3 rounded-lg border border-red-500/20 hover:border-purple-500/40 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                      {alert.severity}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{alert.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{alert.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-800 text-right">
            <Link href="/alerts" className="text-xs text-purple-400 hover:text-purple-300 font-medium">
              Open Full Alert Center &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick Access Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Map */}
        <Link href="/map" className="bg-[#1A0F2E] p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition group block">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-medium text-sm flex items-center gap-2">
              <Map className="w-4 h-4 text-purple-400"/> Surveillance Map
            </h4>
            <span className="text-[10px] font-mono text-gray-500">12 LOCATIONS</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">Interactive SVG vector trail across Bhopal checkposts.</p>
          <div className="text-xs text-purple-400 group-hover:underline flex items-center gap-1 font-medium">
            Open Map View <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
        
        {/* Evidence */}
        <Link href="/evidence" className="bg-[#1A0F2E] p-4 rounded-xl border border-purple-500/20 hover:border-emerald-500/50 transition group block">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-medium text-sm flex items-center gap-2">
              <FileKey className="w-4 h-4 text-emerald-400"/> Evidence Vault
            </h4>
            <span className="text-[10px] font-mono text-emerald-400">SHA-256 OK</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">10 verified evidence items stored with cryptographic hashes.</p>
          <div className="text-xs text-emerald-400 group-hover:underline flex items-center gap-1 font-medium">
            Verify Integrity <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* AI Insights */}
        <Link href="/insights" className="bg-[#1A0F2E] p-4 rounded-xl border border-purple-500/20 hover:border-pink-500/50 transition group block">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-medium text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4 text-pink-400"/> Explainable AI
            </h4>
            <span className="text-[10px] font-mono text-pink-400">8 INSIGHTS</span>
          </div>
          <p className="text-xs text-gray-400 mb-2 truncate" title={primaryInsight?.summary}>
            {primaryInsight?.summary || 'Multi-case entity association detected.'}
          </p>
          <div className="text-xs text-pink-400 group-hover:underline flex items-center gap-1 font-medium">
            Review Findings <ArrowRight className="w-3 h-3" />
          </div>
        </Link>

        {/* Security Health */}
        <Link href="/security" className="bg-[#1A0F2E] p-4 rounded-xl border border-purple-500/20 hover:border-blue-500/50 transition group block">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-medium text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400"/> Zero-Trust Posture
            </h4>
            <span className="text-[10px] font-mono text-green-400">HEALTH: 98%</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">Server RBAC active, HttpOnly sessions, immutable audit trail.</p>
          <div className="text-xs text-blue-400 group-hover:underline flex items-center gap-1 font-medium">
            Trust Center <ArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>
    </div>
  );
}
