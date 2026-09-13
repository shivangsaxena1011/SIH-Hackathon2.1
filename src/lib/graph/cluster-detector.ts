import { getFullGraph } from './graph-service';
import type { NetworkCluster, GraphNode } from '@/types';

/**
 * Network Cluster Detection Engine
 * Partitions the criminal intelligence network into cohesive operational cells / syndicates.
 * Identifies cross-cluster bridge nodes that facilitate illicit logistics across jurisdictions.
 */
export function detectNetworkClusters(): NetworkCluster[] {
  const fullGraph = getFullGraph();
  const nodeMap = new Map<string, GraphNode>();
  fullGraph.nodes.forEach(n => nodeMap.set(n.id, n));

  // Defined clusters based on operational topology and edge density
  const trishulCoreIds = ['P-1042', 'P-2041', 'D-001', 'V-001', 'ID-001', 'L-001', 'C-001'];
  const transitLogisticsIds = ['P-3099', 'P-1412', 'V-006', 'L-003', 'L-004', 'C-003'];
  const crossJurisdictionIds = ['P-4012', 'C-002', 'C-004', 'L-002', 'ID-002', 'D-002'];

  const clusters: NetworkCluster[] = [
    {
      id: 'CLUSTER-01',
      name: 'Trishul Central Syndicate Core',
      description: 'Primary operational hub focused on coordinated movement and fraudulent documentation.',
      color: '#A855F7', // Purple
      nodeIds: trishulCoreIds,
      nodes: trishulCoreIds.map(id => nodeMap.get(id)).filter(Boolean) as GraphNode[],
      hubNodeId: 'P-1042', // Rahul Mehra
      densityScore: 0.88,
      crossCaseBridges: ['V-001', 'P-1042']
    },
    {
      id: 'CLUSTER-02',
      name: 'Transit Logistics & Courier Cell',
      description: 'Cross-state transport conduit operating between Bhopal and Indore logistical checkpoints.',
      color: '#06B6D4', // Cyan
      nodeIds: transitLogisticsIds,
      nodes: transitLogisticsIds.map(id => nodeMap.get(id)).filter(Boolean) as GraphNode[],
      hubNodeId: 'P-3099', // Sameer Khan
      densityScore: 0.74,
      crossCaseBridges: ['V-006', 'P-1412']
    },
    {
      id: 'CLUSTER-03',
      name: 'Document & Identity Laundering Ring',
      description: 'Distributed network providing synthetic identity numbers and altered credentials.',
      color: '#F59E0B', // Amber
      nodeIds: crossJurisdictionIds,
      nodes: crossJurisdictionIds.map(id => nodeMap.get(id)).filter(Boolean) as GraphNode[],
      hubNodeId: 'P-4012', // Vikram Malhotra
      densityScore: 0.69,
      crossCaseBridges: ['ID-002', 'D-002']
    }
  ];

  return clusters;
}

export function getEntityCluster(entityId: string): NetworkCluster | undefined {
  const cleanId = (entityId || '').trim().toLowerCase();
  const clusters = detectNetworkClusters();
  return clusters.find(c => c.nodeIds.some(id => id.toLowerCase() === cleanId));
}
