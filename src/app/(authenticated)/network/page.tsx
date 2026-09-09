'use client';

import { useEffect, useState } from 'react';
import { NetworkGraph } from '@/components/graph/NetworkGraph';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { getFullGraph } from '@/lib/graph/graph-service';
import type { GraphData } from '@/types';
import { Network, Search, Link as LinkIcon, Activity } from 'lucide-react';

export default function NetworkPage() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/network')
      .then(res => {
        if (!res.ok) throw new Error('Network API request failed');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.warn('[Network Offline Fallback] Using local deterministic graph:', err);
        setData(getFullGraph());
        setLoading(false);
      });
  }, []);

  return (
    <ErrorBoundary
      fallbackTitle="Network Visualization Offline"
      fallbackMessage="Unable to stream real-time cluster. Deterministic offline knowledge graph loaded."
    >
      <div className="flex flex-col h-full bg-[#0B0716]">
        <header className="p-6 border-b border-gray-800 bg-[#1A0F2E]/50 flex justify-between items-center z-10 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide font-display flex items-center">
              <Network className="w-6 h-6 mr-3 text-purple-500" />
              CRIMINAL INTELLIGENCE NETWORK
            </h1>
            <p className="text-gray-400 mt-1 text-sm font-sans">Entity Relationship Analysis • Central Hub: Rahul Mehra (P-1042)</p>
          </div>
          
          {data && (
            <div className="flex space-x-6">
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1 flex items-center justify-end"><Search className="w-3 h-3 mr-1"/> Connected Entities</div>
                <div className="text-lg font-mono text-purple-400">{data.nodes.length}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1 flex items-center justify-end"><LinkIcon className="w-3 h-3 mr-1"/> Known Links</div>
                <div className="text-lg font-mono text-blue-400">{data.edges.length}</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-xs text-gray-500 mb-1 flex items-center justify-end"><Activity className="w-3 h-3 mr-1"/> Potential Hubs</div>
                <div className="text-lg font-mono text-amber-400">
                  {data.nodes.filter(n => n.connectionCount > 3).length}
                </div>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 relative overflow-hidden">
          {loading || !data ? (
            <div className="flex items-center justify-center h-full text-purple-500">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
          ) : (
            <NetworkGraph data={data} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
