'use client';

import React, { useState, useMemo, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitMerge,
  Clock,
  MapPin,
  Brain,
  Filter,
  FileText,
  AlertTriangle,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Share2,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findCanonicalCase, getCanonicalCaseId } from '@/lib/cases/case-service';
import { calculateInvestigationPriorityScore } from '@/lib/ai/priority-score';
import { getCaseGraph } from '@/lib/graph/graph-service';
import { seedEvents, seedLocations, seedInsights, seedCases } from '@/data/seed';
import { NetworkGraph } from '@/components/graph/NetworkGraph';
import { IntelligenceMap } from '@/components/map/IntelligenceMap';
import { TimelineView } from '@/components/timeline/TimelineView';
import PathFinderModal from '@/components/graph/PathFinderModal';
import InvestigationBriefModal from '@/components/investigation/InvestigationBriefModal';
import InvestigationReplay from '@/components/investigation/InvestigationReplay';
import InvestigationChangeBanner from '@/components/investigation/InvestigationChangeBanner';
import WhyInsightModal from '@/components/investigation/WhyInsightModal';
import type { Event, MapPoint, EntityType, CasePriority } from '@/types';

type WorkspaceTab = 'NETWORK' | 'TIMELINE' | 'MAP' | 'INSIGHTS' | 'QUERY';

export default function CaseWorkspacePage({
  params
}: {
  params: Promise<{ caseId: string }>;
}) {
  const unwrappedParams = use(params);
  const rawId = unwrappedParams.caseId;
  const c = findCanonicalCase(rawId) || seedCases[0];

  if (!c) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<WorkspaceTab>('NETWORK');
  const [isPathFinderOpen, setIsPathFinderOpen] = useState(false);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [selectedInsightId, setSelectedInsightId] = useState<string | null>(null);

  // Replay synced event
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  // Query Filter State
  const [queryType, setQueryType] = useState<EntityType | 'ALL'>('ALL');
  const [querySearch, setQuerySearch] = useState('');
  const [minConfidence, setMinConfidence] = useState(70);

  // Data computations
  const priorityScore = useMemo(() => calculateInvestigationPriorityScore(c.id), [c.id]);
  const graphData = useMemo(() => getCaseGraph(c.id), [c.id]);

  const caseEvents = useMemo(() => {
    const canonical = c.id.toLowerCase();
    const num = c.caseNumber.toLowerCase();
    return seedEvents.filter(e => {
      const eCase = (e.caseId || '').toLowerCase();
      return eCase === canonical || eCase === num;
    });
  }, [c.id, c.caseNumber]);

  const mapPoints = useMemo<MapPoint[]>(() => {
    return caseEvents
      .filter(e => e.locationId)
      .map(e => {
        const loc = seedLocations.find(l => l.id === e.locationId);
        return {
          id: e.id,
          lat: loc ? loc.lat : 23.2599,
          lng: loc ? loc.lng : 77.4126,
          label: loc ? loc.name : e.locationName || 'Surveillance Sector',
          type: e.entityType,
          eventId: e.id,
          entityId: e.entityId,
          entityName: e.entityName,
          timestamp: e.timestamp,
          description: e.description,
          confidence: e.confidence,
          caseId: c.id
        };
      });
  }, [caseEvents, c.id]);

  const caseInsights = useMemo(() => {
    const canonical = c.id.toLowerCase();
    const num = c.caseNumber.toLowerCase();
    return seedInsights.filter(i => {
      const iCase = (i.caseId || '').toLowerCase();
      return iCase === canonical || iCase === num;
    });
  }, [c.id, c.caseNumber]);

  // Filtered graph entities for Query tab
  const filteredEntities = useMemo(() => {
    return graphData.nodes.filter(n => {
      if (queryType !== 'ALL' && n.entityType !== queryType) return false;
      if (querySearch && !n.label.toLowerCase().includes(querySearch.toLowerCase())) return false;
      return true;
    });
  }, [graphData.nodes, queryType, querySearch]);

  return (
    <div className="min-h-screen bg-[#0B0716] text-gray-100 flex flex-col">
      {/* Workspace Top Command Bar */}
      <div className="border-b border-purple-500/20 bg-[#130B24]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: Case Info */}
          <div className="flex items-center space-x-3">
            <Link
              href={`/cases/${c.id}`}
              className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 transition-colors"
              title="Return to Case File"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-400">
                  CASE #{c.caseNumber}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                  {c.status}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-500/30">
                  {c.priority}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-space font-bold text-white leading-tight">
                {c.title} — Unified Investigation Workspace
              </h1>
            </div>
          </div>

          {/* Center: Priority Score Badge */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0B0716] border border-purple-500/30">
            <div className="text-right">
              <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                PRIORITY INDEX
              </div>
              <div className="text-sm font-bold text-amber-400 font-mono flex items-baseline gap-1">
                {priorityScore.score}/100
                <span className="text-[10px] font-normal text-purple-300 font-sans">
                  {priorityScore.tier}
                </span>
              </div>
            </div>
            <div
              className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20"
              title="PRIORITY != GUILT: Urgency indicator for authorized review"
            >
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPathFinderOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            >
              <GitMerge className="w-3.5 h-3.5" /> FIND CONNECTION
            </button>
            <button
              onClick={() => setIsBriefOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 text-purple-200 border border-purple-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" /> EXECUTIVE BRIEF
            </button>
          </div>
        </div>

        {/* Change Monitor Delta Notification */}
        <div className="mt-3">
          <InvestigationChangeBanner caseQuery={c.id} />
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex items-center gap-1 mt-3 border-t border-purple-500/10 pt-2 overflow-x-auto">
          {[
            { id: 'NETWORK', label: 'Network Graph', icon: Share2, count: graphData.nodes.length },
            { id: 'TIMELINE', label: 'Timeline & Replay', icon: Clock, count: caseEvents.length },
            { id: 'MAP', label: 'Intelligence Map', icon: MapPin, count: mapPoints.length },
            { id: 'INSIGHTS', label: 'AI Insights', icon: Brain, count: caseInsights.length },
            { id: 'QUERY', label: 'Query Builder', icon: SlidersHorizontal, count: graphData.nodes.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as WorkspaceTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-purple-900 text-purple-200' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Canvas */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col">
        {/* Tab 1: Network Graph */}
        {activeTab === 'NETWORK' && (
          <div className="flex-1 rounded-xl border border-purple-500/30 overflow-hidden bg-[#130B24] min-h-[600px] flex flex-col">
            <div className="p-3 bg-[#1A0F2E] border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <span>CASE NODES: <strong className="text-white">{graphData.nodes.length}</strong></span>
                <span>•</span>
                <span>CORRELATED EDGES: <strong className="text-white">{graphData.edges.length}</strong></span>
                <span>•</span>
                <span className="text-purple-300">HUB: Rahul Mehra (P-1042 • 7 direct links)</span>
              </div>
              <button
                onClick={() => setIsPathFinderOpen(true)}
                className="text-xs text-purple-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                <GitMerge className="w-3.5 h-3.5" /> Trace Multi-Hop Path &rarr;
              </button>
            </div>
            <div className="flex-1 relative min-h-[550px]">
              <NetworkGraph data={graphData} />
            </div>
          </div>
        )}

        {/* Tab 2: Timeline & Replay */}
        {activeTab === 'TIMELINE' && (
          <div className="space-y-4">
            {/* Embedded Replay Controller */}
            <InvestigationReplay
              events={caseEvents}
              onEventChange={(ev) => setActiveEvent(ev)}
            />

            {/* Timeline Stream */}
            <div className="rounded-xl border border-purple-500/20 bg-[#130B24] p-4">
              <TimelineView events={caseEvents} />
            </div>
          </div>
        )}

        {/* Tab 3: Intelligence Map */}
        {activeTab === 'MAP' && (
          <div className="space-y-4">
            {activeEvent && (
              <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs text-purple-300">
                <span>ACTIVE REPLAY EVENT: <strong>{activeEvent.entityName}</strong> at {activeEvent.locationName || 'Bhopal Sector'}</span>
                <span className="font-mono text-emerald-400">{activeEvent.confidence}% confidence</span>
              </div>
            )}
            <div className="rounded-xl border border-purple-500/30 overflow-hidden bg-[#130B24] min-h-[550px]">
              <IntelligenceMap points={mapPoints} />
            </div>
          </div>
        )}

        {/* Tab 4: AI Insights & Evidence Chains */}
        {activeTab === 'INSIGHTS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseInsights.map(insight => (
              <div
                key={insight.id}
                className="p-5 rounded-xl bg-[#1A0F2E] border border-purple-500/30 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-rose-950 text-rose-300 border border-rose-500/30 uppercase">
                      {insight.severity} SEVERITY
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {insight.confidence}% CONFIDENCE
                    </span>
                  </div>
                  <h3 className="text-sm font-space font-bold text-white mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {insight.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedInsightId(insight.id)}
                    className="text-xs text-purple-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Brain className="w-3.5 h-3.5 text-purple-400" /> WHY THIS INSIGHT? &rarr;
                  </button>
                  <span className="text-[10px] text-gray-500 font-mono">
                    PRIORITY != GUILT
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Structured Query Builder */}
        {activeTab === 'QUERY' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="p-4 rounded-xl bg-[#1A0F2E] border border-purple-500/30 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-4">
                <label className="text-[10px] font-mono text-gray-400 block mb-1">SEARCH ENTITY</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={querySearch}
                    onChange={e => setQuerySearch(e.target.value)}
                    placeholder="Search name, ID, or vehicle plate..."
                    className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-mono text-gray-400 block mb-1">ENTITY CLASSIFICATION</label>
                <select
                  value={queryType}
                  onChange={e => setQueryType(e.target.value as EntityType | 'ALL')}
                  className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                >
                  <option value="ALL">ALL ENTITIES (Persons, Vehicles, Docs)</option>
                  <option value="PERSON">PERSONS ONLY</option>
                  <option value="VEHICLE">VEHICLES ONLY</option>
                  <option value="DOCUMENT">DOCUMENTS ONLY</option>
                  <option value="IDENTIFIER">IDENTIFIERS ONLY</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-mono text-gray-400 block mb-1">
                  CONFIDENCE THRESHOLD ({minConfidence}%)
                </label>
                <input
                  type="range"
                  min={50}
                  max={95}
                  value={minConfidence}
                  onChange={e => setMinConfidence(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>

            {/* Filtered Result Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredEntities.map(node => (
                <div
                  key={node.id}
                  className="p-3.5 rounded-lg bg-[#1A0F2E] border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold">
                        {node.entityType}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {node.connectionCount} connections
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1.5">{node.label}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{node.id}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-purple-500/10 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setIsPathFinderOpen(true);
                      }}
                      className="text-purple-300 hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      <GitMerge className="w-3 h-3" /> Trace Path
                    </button>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {node.riskLevel || 'MONITORED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <PathFinderModal
        isOpen={isPathFinderOpen}
        onClose={() => setIsPathFinderOpen(false)}
        defaultSource="P-1042"
        defaultTarget="P-1412"
      />

      <InvestigationBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        caseQuery={c.id}
      />

      {selectedInsightId && (
        <WhyInsightModal
          isOpen={!!selectedInsightId}
          onClose={() => setSelectedInsightId(null)}
          insightId={selectedInsightId}
        />
      )}
    </div>
  );
}
