'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  SlidersHorizontal,
  Search,
  GitMerge,
  Filter,
  ExternalLink,
  ShieldCheck,
  User,
  Car,
  FileText,
  Briefcase,
  Fingerprint,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { getFullGraph } from '@/lib/graph/graph-service';
import { seedCases } from '@/data/seed';
import PathFinderModal from '@/components/graph/PathFinderModal';
import type { EntityType, CasePriority } from '@/types';

export default function InvestigationQueryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<EntityType | 'ALL'>('ALL');
  const [selectedCase, setSelectedCase] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [minConfidence, setMinConfidence] = useState<number>(60);
  const [isPathFinderOpen, setIsPathFinderOpen] = useState(false);
  const [pathFinderTarget, setPathFinderTarget] = useState<string>('P-1412');

  const fullGraph = useMemo(() => getFullGraph(), []);

  const filteredResults = useMemo(() => {
    return fullGraph.nodes.filter(node => {
      // Type filter
      if (selectedType !== 'ALL' && node.entityType !== selectedType) return false;

      // Case filter
      if (selectedCase !== 'ALL' && !node.caseIds.some(cid => cid.toLowerCase() === selectedCase.toLowerCase())) {
        return false;
      }

      // Risk filter
      if (selectedRisk !== 'ALL' && node.riskLevel !== selectedRisk) {
        return false;
      }

      // Text search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const labelMatch = node.label.toLowerCase().includes(q);
        const idMatch = node.id.toLowerCase().includes(q);
        const aliasMatch = ((node.properties?.aliases as string) || '').toLowerCase().includes(q);
        if (!labelMatch && !idMatch && !aliasMatch) return false;
      }

      return true;
    });
  }, [fullGraph.nodes, selectedType, selectedCase, selectedRisk, searchQuery]);

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'PERSON': return <User className="w-4 h-4 text-purple-400" />;
      case 'VEHICLE': return <Car className="w-4 h-4 text-blue-400" />;
      case 'CASE': return <Briefcase className="w-4 h-4 text-amber-400" />;
      case 'DOCUMENT': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'IDENTIFIER': return <Fingerprint className="w-4 h-4 text-cyan-400" />;
      default: return <Sparkles className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>CROSS-DATASET INTELLIGENCE SEARCH</span>
          </div>
          <h1 className="text-2xl font-space font-bold text-white tracking-wide">
            INVESTIGATION QUERY BUILDER
          </h1>
          <p className="text-xs text-gray-400">
            Execute structured multi-dimensional queries across persons, vehicles, identifiers, and documents
          </p>
        </div>

        <button
          onClick={() => {
            setPathFinderTarget('P-1412');
            setIsPathFinderOpen(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg flex items-center gap-2 transition-all self-start"
        >
          <GitMerge className="w-4 h-4" /> PATH FINDER &rarr;
        </button>
      </div>

      {/* Query Control Matrix */}
      <div className="p-5 rounded-xl bg-[#1A0F2E] border border-purple-500/30 shadow-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Text Input */}
          <div className="md:col-span-4">
            <label className="text-[11px] font-mono text-gray-400 uppercase block mb-1">Search Keywords</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Entity name, alias, registration plate, ID..."
                className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Entity Type Dropdown */}
          <div className="md:col-span-3">
            <label className="text-[11px] font-mono text-gray-400 uppercase block mb-1">Entity Category</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value as EntityType | 'ALL')}
              className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="PERSON">PERSONS</option>
              <option value="VEHICLE">VEHICLES</option>
              <option value="DOCUMENT">DOCUMENTS</option>
              <option value="IDENTIFIER">IDENTIFIERS</option>
              <option value="LOCATION">LOCATIONS</option>
            </select>
          </div>

          {/* Case Scope */}
          <div className="md:col-span-3">
            <label className="text-[11px] font-mono text-gray-400 uppercase block mb-1">Case Scope</label>
            <select
              value={selectedCase}
              onChange={e => setSelectedCase(e.target.value)}
              className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="ALL">ENTIRE JURISDICTION (ALL CASES)</option>
              {seedCases.map(c => (
                <option key={c.id} value={c.id}>
                  Case #{c.caseNumber} — {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Level */}
          <div className="md:col-span-2">
            <label className="text-[11px] font-mono text-gray-400 uppercase block mb-1">Priority Tier</label>
            <select
              value={selectedRisk}
              onChange={e => setSelectedRisk(e.target.value)}
              className="w-full bg-[#0B0716] border border-purple-500/30 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="ALL">ALL TIERS</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>

        {/* Query Summary Strip */}
        <div className="pt-3 border-t border-purple-500/20 flex flex-wrap items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-purple-300 font-mono font-semibold">
              {filteredResults.length} RECORD{filteredResults.length !== 1 ? 'S' : ''} MATCHED
            </span>
            <span>•</span>
            <span>Deterministic Runtime Indexed Filter</span>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('ALL');
              setSelectedCase('ALL');
              setSelectedRisk('ALL');
            }}
            className="text-xs text-purple-400 hover:text-white transition-colors"
          >
            Reset Query Filters
          </button>
        </div>
      </div>

      {/* Query Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResults.map(node => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-[#1A0F2E] border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded bg-purple-950/80 border border-purple-500/30">
                    {getEntityIcon(node.entityType)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/40 text-purple-300 font-semibold">
                    {node.entityType}
                  </span>
                </div>
                {node.riskLevel && (
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    node.riskLevel === 'CRITICAL' || node.riskLevel === 'HIGH'
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                  }`}>
                    {node.riskLevel}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-space font-bold text-white mt-1">{node.label}</h3>
              <p className="text-xs font-mono text-gray-400 mt-0.5">{node.id}</p>

              {node.properties?.aliases ? (
                <div className="text-[11px] text-gray-300 mt-2">
                  <span className="text-gray-500">Aliases:</span> {node.properties.aliases as string}
                </div>
              ) : null}

              <div className="mt-3 flex flex-wrap gap-1.5">
                {node.caseIds.map(cid => (
                  <span
                    key={cid}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-gray-300 border border-purple-500/20"
                  >
                    {cid}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs">
              <span className="font-mono text-purple-300 font-semibold">
                {node.connectionCount} connections
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setPathFinderTarget(node.id);
                    setIsPathFinderOpen(true);
                  }}
                  className="text-purple-300 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                >
                  <GitMerge className="w-3 h-3" /> Path
                </button>
                {node.caseIds[0] && (
                  <Link
                    href={`/cases/${node.caseIds[0]}/workspace`}
                    className="text-indigo-300 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                  >
                    Workspace &rarr;
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <PathFinderModal
        isOpen={isPathFinderOpen}
        onClose={() => setIsPathFinderOpen(false)}
        defaultSource="P-1042"
        defaultTarget={pathFinderTarget}
      />
    </div>
  );
}
