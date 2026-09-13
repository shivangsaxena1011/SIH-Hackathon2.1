import { getFullGraph } from './graph-service';
import type { GraphNode, GraphEdge, InvestigationPath, InvestigationPathStep } from '@/types';
import { getRelationshipProvenance } from './provenance-service';

/**
 * Investigation Path Finder
 * Implements deterministic shortest-path graph search across entities.
 * Traces indirect links, multi-hop syndicates, vehicle-sharing conduits, and cross-case bridges.
 */
export function findInvestigationPath(
  sourceQuery: string,
  targetQuery: string,
  maxHops: number = 5
): InvestigationPath | null {
  const fullGraph = getFullGraph();
  if (!fullGraph.nodes.length) return null;

  const cleanSource = (sourceQuery || '').trim().toLowerCase();
  const cleanTarget = (targetQuery || '').trim().toLowerCase();

  // Find source & target nodes by ID, label, or entityId
  const sourceNode = fullGraph.nodes.find(
    n =>
      n.id.toLowerCase() === cleanSource ||
      n.label.toLowerCase() === cleanSource ||
      ((n.properties?.aliases as string) || '').toLowerCase().includes(cleanSource)
  );

  const targetNode = fullGraph.nodes.find(
    n =>
      n.id.toLowerCase() === cleanTarget ||
      n.label.toLowerCase() === cleanTarget ||
      ((n.properties?.aliases as string) || '').toLowerCase().includes(cleanTarget)
  );

  if (!sourceNode || !targetNode) return null;
  if (sourceNode.id.toLowerCase() === targetNode.id.toLowerCase()) {
    return {
      sourceId: sourceNode.id,
      targetId: targetNode.id,
      sourceLabel: sourceNode.label,
      targetLabel: targetNode.label,
      hops: 0,
      steps: [],
      overallConfidence: 100,
      explanation: `Source and target entity refer to the same node (${sourceNode.label}).`,
      evidenceSummary: ['Identical entity identifier']
    };
  }

  // Build undirected adjacency list: nodeId -> Array<{ neighborId: string, edge: GraphEdge }>
  const adj = new Map<string, Array<{ neighborId: string; edge: GraphEdge }>>();
  fullGraph.nodes.forEach(n => adj.set(n.id.toLowerCase(), []));

  fullGraph.edges.forEach(edge => {
    const s = edge.source.toLowerCase();
    const t = edge.target.toLowerCase();
    if (adj.has(s) && adj.has(t)) {
      adj.get(s)!.push({ neighborId: t, edge });
      adj.get(t)!.push({ neighborId: s, edge });
    }
  });

  // BFS Queue: [ { currentId, pathNodes, pathEdges } ]
  interface QueueItem {
    currentId: string;
    pathNodeIds: string[];
    pathEdges: GraphEdge[];
  }

  const queue: QueueItem[] = [
    { currentId: sourceNode.id.toLowerCase(), pathNodeIds: [sourceNode.id.toLowerCase()], pathEdges: [] }
  ];
  const visited = new Set<string>([sourceNode.id.toLowerCase()]);
  const nodeMap = new Map<string, GraphNode>();
  fullGraph.nodes.forEach(n => nodeMap.set(n.id.toLowerCase(), n));

  let foundItem: QueueItem | null = null;

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.currentId === targetNode.id.toLowerCase()) {
      foundItem = current;
      break;
    }

    if (current.pathEdges.length >= maxHops) continue;

    const neighbors = adj.get(current.currentId) || [];
    for (const { neighborId, edge } of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push({
          currentId: neighborId,
          pathNodeIds: [...current.pathNodeIds, neighborId],
          pathEdges: [...current.pathEdges, edge]
        });
      }
    }
  }

  if (!foundItem) return null;

  // Construct steps
  const steps: InvestigationPathStep[] = [];
  const evidenceSummary: string[] = [];
  let confidenceProduct = 1.0;

  for (let i = 0; i < foundItem.pathEdges.length; i++) {
    const fromId = foundItem.pathNodeIds[i];
    const toId = foundItem.pathNodeIds[i + 1];
    const edge = foundItem.pathEdges[i];

    const fromNode = nodeMap.get(fromId)!;
    const toNode = nodeMap.get(toId)!;
    const prov = getRelationshipProvenance(edge.id, fromNode.label, toNode.label);

    steps.push({
      fromNode,
      toNode,
      edge,
      provenance: prov
    });

    confidenceProduct *= edge.confidence / 100;
    evidenceSummary.push(
      `${fromNode.label} [${fromNode.entityType}] ${edge.type.replace(/_/g, ' ')} ${toNode.label} [${toNode.entityType}] (${edge.confidence}% conf, via ${edge.source_description || 'Recorded Docket'})`
    );
  }

  const overallConfidence = Math.round(Math.pow(confidenceProduct, 1 / steps.length) * 100);
  const hops = steps.length;

  let explanation = '';
  if (hops === 1) {
    explanation = `Direct link identified between ${sourceNode.label} and ${targetNode.label} via relationship ${steps[0].edge.type} (Confidence: ${steps[0].edge.confidence}%).`;
  } else if (hops === 2) {
    const pivot = steps[0].toNode;
    explanation = `Indirect 2-hop connection: ${sourceNode.label} is connected to ${targetNode.label} through conduit ${pivot.label} (${pivot.entityType}).`;
  } else {
    explanation = `Multi-hop investigation trail spanning ${hops} degrees: Traced from ${sourceNode.label} to ${targetNode.label} across intermediate nodes (${steps.slice(0, -1).map(s => s.toNode.label).join(' \u2192 ')}).`;
  }

  return {
    sourceId: sourceNode.id,
    targetId: targetNode.id,
    sourceLabel: sourceNode.label,
    targetLabel: targetNode.label,
    hops,
    steps,
    overallConfidence,
    explanation,
    evidenceSummary
  };
}
