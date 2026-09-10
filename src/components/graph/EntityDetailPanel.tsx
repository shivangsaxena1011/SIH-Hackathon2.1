'use client';

import { X, ExternalLink, Users, Layers, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEntityTypeBg, getEntityTypeColor, getPriorityColor } from '@/lib/utils';
import type { GraphNode, GraphEdge } from '@/types';

interface EntityDetailPanelProps {
  node: GraphNode | null;
  edges: GraphEdge[];
  onClose: () => void;
}

export function EntityDetailPanel({ node, edges, onClose }: EntityDetailPanelProps) {
  if (!node) return null;

  const connectedEdges = edges.filter(e => e.source === node.id || e.target === node.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className="fixed top-20 right-4 bottom-4 w-80 bg-[#1A0F2E]/95 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-[#0B0716]/50">
          <h3 className="font-semibold text-gray-200">SELECTED ENTITY</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getEntityTypeBg(node.entityType)}`}>
              <Activity className="w-6 h-6" style={{ color: getEntityTypeColor(node.entityType) }} />
            </div>
            <div>
              <div className="text-lg font-bold text-white">{node.label}</div>
              <div className="text-sm text-gray-400">{node.entityType}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0B0716] p-3 rounded-lg border border-gray-800">
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Entity Status</div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] text-gray-400">Risk Level</div>
                  {node.riskLevel ? (
                    <div className={`text-xs font-semibold ${getPriorityColor(node.riskLevel)} inline-block px-1.5 py-0.5 rounded mt-1`}>
                      {node.riskLevel}
                    </div>
                  ) : <div className="text-xs text-gray-300 mt-1">N/A</div>}
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Connections</div>
                  <div className="text-xs font-semibold text-white mt-1">{node.connectionCount} Links</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider flex items-center">
                <Users className="w-3 h-3 mr-1" /> Relationship Evidence
              </div>
              <div className="space-y-2">
                {connectedEdges.length === 0 ? (
                  <div className="text-xs text-gray-500">No relationships found.</div>
                ) : (
                  connectedEdges.map(edge => {
                    const isSource = edge.source === node.id;
                    const otherNodeId = isSource ? edge.target : edge.source;
                    const dirText = isSource ? 'Target' : 'Source';
                    const isRecorded = edge.type === 'LINKED_TO' || edge.type === 'VERIFIED_AS' || edge.confidence >= 95;
                    return (
                      <div key={edge.id} className="bg-[#0B0716] p-3 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-xs font-semibold ${isRecorded ? 'text-purple-400' : 'text-amber-400'}`}>
                            {isRecorded ? edge.type.replace(/_/g, ' ') : `Potential Association (${edge.confidence}% Demo Confidence)`}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isRecorded ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40' : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'}`}>
                            {isRecorded ? 'RECORDED' : 'INFERRED'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {dirText}: <span className="text-gray-400 font-mono text-[10px]">{otherNodeId}</span>
                        </div>
                        {edge.source_description && (
                          <div className="text-[10px] text-gray-500 mt-2 italic border-t border-gray-800 pt-1">
                            {edge.source_description}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            {node.caseIds && node.caseIds.length > 0 && (
              <div>
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider flex items-center">
                  <Layers className="w-3 h-3 mr-1" /> Associated Cases
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {node.caseIds.map(cid => (
                    <span key={cid} className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[10px] rounded flex items-center cursor-pointer hover:bg-blue-500/20 transition">
                      {cid} <ExternalLink className="w-2.5 h-2.5 ml-1" />
                    </span>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
