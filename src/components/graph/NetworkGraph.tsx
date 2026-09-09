'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, {
  Node, Edge, Background, Controls,
  useNodesState, useEdgesState,
  MarkerType, ConnectionMode, useReactFlow, ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GraphNodeComponent } from './GraphNode';
import { EntityDetailPanel } from './EntityDetailPanel';
import { GraphFilterBar } from './GraphFilterBar';
import type { GraphData, EntityType, GraphNode as AppGraphNode } from '@/types';
import { getEntityTypeColor } from '@/lib/utils';
import { Focus, RotateCcw, Maximize } from 'lucide-react';

const nodeTypes = {
  custom: GraphNodeComponent
};

const LEGEND_ITEMS: { type: EntityType; label: string }[] = [
  { type: 'PERSON', label: 'Person' },
  { type: 'CASE', label: 'Case Docket' },
  { type: 'VEHICLE', label: 'ANPR Vehicle' },
  { type: 'IDENTIFIER', label: 'Identifier' },
  { type: 'LOCATION', label: 'Location' },
  { type: 'DOCUMENT', label: 'Document' },
  { type: 'ORGANIZATION', label: 'Organization' },
  { type: 'EVENT', label: 'Event' }
];

function InnerNetworkGraph({ data }: { data: GraphData }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstance = useReactFlow();
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<EntityType>>(new Set([
    'PERSON', 'CASE', 'VEHICLE', 'IDENTIFIER', 'LOCATION', 'ORGANIZATION', 'DOCUMENT', 'EVENT'
  ]));
  const [searchQuery, setSearchQuery] = useState('');

  const selectedAppNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return data.nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId, data.nodes]);

  // Deterministic radial layout centered around Rahul Mehra (P-1042)
  const initializeGraph = useCallback(() => {
    const centerNodeId = 'P-1042'; // Rahul Mehra
    const originX = 650;
    const originY = 400;
    
    let filteredNodes = data.nodes.filter(n => activeFilters.has(n.entityType));
    
    if (searchQuery) {
      filteredNodes = filteredNodes.filter(n => 
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Direct first-degree connections of Rahul Mehra
    const firstDegreeIds = new Set<string>();
    data.edges.forEach(e => {
      if (e.source === centerNodeId) firstDegreeIds.add(e.target);
      if (e.target === centerNodeId) firstDegreeIds.add(e.source);
    });

    const firstDegreeList: AppGraphNode[] = [];
    const outerList: AppGraphNode[] = [];

    filteredNodes.forEach(node => {
      if (node.id === centerNodeId) return;
      if (firstDegreeIds.has(node.id)) {
        firstDegreeList.push(node);
      } else {
        outerList.push(node);
      }
    });

    const newNodes: Node[] = [];

    // Center Node (Rahul Mehra)
    const centerNode = filteredNodes.find(n => n.id === centerNodeId);
    if (centerNode) {
      newNodes.push({
        id: centerNode.id,
        type: 'custom',
        position: { x: originX, y: originY },
        data: { ...centerNode, isHub: true },
      });
    }

    // Ring 1: Direct connections in an even circle (Radius: 260px)
    const ring1Radius = 260;
    firstDegreeList.forEach((node, idx) => {
      const angle = (idx / firstDegreeList.length) * 2 * Math.PI - Math.PI / 2;
      const x = originX + ring1Radius * Math.cos(angle);
      const y = originY + ring1Radius * Math.sin(angle);
      newNodes.push({
        id: node.id,
        type: 'custom',
        position: { x, y },
        data: node,
      });
    });

    // Ring 2: Outer connections in an outer circle (Radius: 480px)
    const ring2Radius = 480;
    outerList.forEach((node, idx) => {
      const angle = (idx / outerList.length) * 2 * Math.PI - Math.PI / 4;
      const x = originX + ring2Radius * Math.cos(angle);
      const y = originY + ring2Radius * Math.sin(angle);
      newNodes.push({
        id: node.id,
        type: 'custom',
        position: { x, y },
        data: node,
      });
    });

    const nodeIds = new Set(newNodes.map(n => n.id));
    
    const newEdges: Edge[] = data.edges
      .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map((edge) => {
        const isHubEdge = edge.source === centerNodeId || edge.target === centerNodeId;
        const color = isHubEdge ? '#A855F7' : 'rgba(168, 85, 247, 0.35)';
        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: `${edge.type.replace(/_/g, ' ')} (${edge.confidence}%)`,
          labelStyle: { fill: '#D1D5DB', fontSize: 10, fontFamily: 'monospace', fontWeight: 500 },
          labelBgStyle: { fill: '#1A0F2E', fillOpacity: 0.9, stroke: 'rgba(168, 85, 247, 0.4)', rx: 4, ry: 4 },
          labelBgPadding: [6, 2],
          animated: isHubEdge && edge.confidence >= 85,
          style: { stroke: color, strokeWidth: isHubEdge ? 2 : 1.2 },
          markerEnd: { type: MarkerType.ArrowClosed, color },
        };
      });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data, activeFilters, searchQuery, setNodes, setEdges]);

  useEffect(() => {
    initializeGraph();
  }, [initializeGraph]);

  const toggleFilter = (type: EntityType) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const handleFit = () => {
    reactFlowInstance.fitView({ padding: 0.2, duration: 800 });
  };

  const handleCenterHub = () => {
    reactFlowInstance.setCenter(650, 400, { zoom: 1.1, duration: 800 });
    setSelectedNodeId('P-1042');
  };

  return (
    <div className="w-full h-full relative">
      <GraphFilterBar 
        activeFilters={activeFilters}
        onFilterChange={toggleFilter}
        onSearch={setSearchQuery}
        onReset={initializeGraph}
        onFit={handleFit}
      />

      {/* Floating Canvas Quick Controls */}
      <div className="absolute top-16 right-4 z-10 flex gap-2 bg-[#1A0F2E]/90 border border-purple-500/20 p-1.5 rounded-xl shadow-lg backdrop-blur-md">
        <button
          onClick={handleCenterHub}
          className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-xs rounded-lg border border-purple-500/40 transition flex items-center gap-1.5 font-medium"
          title="Focus on Rahul Mehra (Primary Hub)"
        >
          <Focus className="w-3.5 h-3.5 text-purple-400" /> Focus Hub (Rahul Mehra)
        </button>
        <button
          onClick={handleFit}
          className="px-3 py-1.5 bg-gray-800/80 hover:bg-gray-700 text-gray-300 text-xs rounded-lg border border-gray-700 transition flex items-center gap-1"
          title="Fit graph to view"
        >
          <Maximize className="w-3.5 h-3.5" /> Fit View
        </button>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-[#0B0716]"
      >
        <Background color="#1A0F2E" gap={24} size={1.5} />
        <Controls className="bg-[#1A0F2E] border border-gray-800 text-white fill-white rounded-lg shadow-lg" />
      </ReactFlow>

      {/* Entity Legend */}
      <div className="absolute bottom-4 left-4 bg-[#1A0F2E]/90 backdrop-blur-md p-3.5 rounded-xl border border-gray-800 z-10 shadow-xl max-w-xl">
        <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-2 font-bold">
          ENTITY TYPE LEGEND
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-300">
          {LEGEND_ITEMS.map(item => (
            <div key={item.type} className="flex items-center gap-1.5">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: getEntityTypeColor(item.type) }}
              />
              <span className="text-[11px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Entity Panel */}
      <EntityDetailPanel 
        node={selectedAppNode} 
        edges={data.edges} 
        onClose={() => setSelectedNodeId(null)} 
      />
    </div>
  );
}

export function NetworkGraph({ data }: { data: GraphData }) {
  return (
    <ReactFlowProvider>
      <InnerNetworkGraph data={data} />
    </ReactFlowProvider>
  );
}
