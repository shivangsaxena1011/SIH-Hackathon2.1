import {
  seedPersons, seedCases, seedVehicles, seedIdentifiers,
  seedLocations, seedDocuments, seedOrganizations, seedRelationships
} from '@/data/seed';
import type { GraphNode, GraphEdge, GraphData } from '@/types';
import { getCanonicalCaseId, getCaseNumber } from '@/lib/cases/case-service';

export function getFullGraph(): GraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const entityCountMap: Record<string, number> = {};
  
  seedRelationships.forEach(rel => {
    entityCountMap[rel.sourceEntityId] = (entityCountMap[rel.sourceEntityId] || 0) + 1;
    entityCountMap[rel.targetEntityId] = (entityCountMap[rel.targetEntityId] || 0) + 1;
    
    edges.push({
      id: rel.id,
      source: rel.sourceEntityId,
      target: rel.targetEntityId,
      type: rel.type,
      confidence: rel.confidence,
      label: rel.type,
      source_description: rel.source
    });
  });

  seedPersons.forEach(p => {
    nodes.push({
      id: p.id, entityId: p.id, entityType: 'PERSON', label: p.name,
      properties: { riskLevel: p.riskLevel, status: p.status, aliases: p.aliases.join(', ') },
      connectionCount: entityCountMap[p.id] || 0,
      caseIds: p.associatedCaseIds, riskLevel: p.riskLevel
    });
  });

  seedCases.forEach(c => {
    nodes.push({
      id: c.id, entityId: c.id, entityType: 'CASE', label: c.caseNumber,
      properties: { title: c.title, status: c.status, priority: c.priority },
      connectionCount: entityCountMap[c.id] || 0,
      caseIds: [c.id], riskLevel: c.priority
    });
  });

  seedVehicles.forEach(v => {
    nodes.push({
      id: v.id, entityId: v.id, entityType: 'VEHICLE', label: v.registration,
      properties: { type: v.type, make: v.make, model: v.model },
      connectionCount: entityCountMap[v.id] || 0,
      caseIds: v.associatedCaseIds
    });
  });

  seedIdentifiers.forEach(i => {
    nodes.push({
      id: i.id, entityId: i.id, entityType: 'IDENTIFIER', label: i.valueMasked,
      properties: { type: i.type },
      connectionCount: entityCountMap[i.id] || 0,
      caseIds: i.associatedCaseIds
    });
  });

  seedLocations.forEach(l => {
    nodes.push({
      id: l.id, entityId: l.id, entityType: 'LOCATION', label: l.name,
      properties: { type: l.type, zone: l.zone },
      connectionCount: entityCountMap[l.id] || 0,
      caseIds: []
    });
  });

  seedDocuments.forEach(d => {
    nodes.push({
      id: d.id, entityId: d.id, entityType: 'DOCUMENT', label: d.documentType,
      properties: { fileName: d.fileName },
      connectionCount: entityCountMap[d.id] || 0,
      caseIds: [d.caseId]
    });
  });

  seedOrganizations.forEach(o => {
    nodes.push({
      id: o.id, entityId: o.id, entityType: 'ORGANIZATION', label: o.name,
      properties: { type: o.type },
      connectionCount: entityCountMap[o.id] || 0,
      caseIds: []
    });
  });

  // Filter out nodes with 0 connections to clean up the graph, except if we want all
  return { nodes: nodes.filter(n => n.connectionCount > 0), edges };
}

export function getEntityGraph(entityId: string): GraphData {
  const fullGraph = getFullGraph();
  const cleanId = (entityId || '').trim().toLowerCase();

  // Match target node by ID or label
  const targetNode = fullGraph.nodes.find(
    n => n.id.toLowerCase() === cleanId || n.label.toLowerCase() === cleanId
  );
  const resolvedId = targetNode ? targetNode.id : entityId;

  const connectedNodeIds = new Set<string>();
  connectedNodeIds.add(resolvedId.toLowerCase());

  const edges = fullGraph.edges.filter(e => {
    if (e.source.toLowerCase() === resolvedId.toLowerCase() || e.target.toLowerCase() === resolvedId.toLowerCase()) {
      connectedNodeIds.add(e.source.toLowerCase());
      connectedNodeIds.add(e.target.toLowerCase());
      return true;
    }
    return false;
  });

  const nodes = fullGraph.nodes.filter(n => connectedNodeIds.has(n.id.toLowerCase()));
  return { nodes: nodes.length > 0 ? nodes : (targetNode ? [targetNode] : fullGraph.nodes.slice(0, 10)), edges };
}

export function getCaseGraph(caseId: string): GraphData {
  const fullGraph = getFullGraph();
  const canonicalId = getCanonicalCaseId(caseId).toLowerCase();
  const caseNum = getCaseNumber(caseId).toLowerCase();

  const nodes = fullGraph.nodes.filter(n =>
    n.caseIds.some(cid => {
      const c = cid.toLowerCase();
      return c === canonicalId || c === caseNum;
    })
  );
  const nodeIds = new Set(nodes.map(n => n.id.toLowerCase()));
  const edges = fullGraph.edges.filter(e => nodeIds.has(e.source.toLowerCase()) && nodeIds.has(e.target.toLowerCase()));

  return { nodes: nodes.length > 0 ? nodes : fullGraph.nodes.slice(0, 10), edges };
}

export function getNodeDetails(nodeId: string) {
  const fullGraph = getFullGraph();
  const cleanId = (nodeId || '').trim().toLowerCase();
  const node = fullGraph.nodes.find(
    n => n.id.toLowerCase() === cleanId || n.label.toLowerCase() === cleanId
  );
  if (!node) return null;

  const targetId = node.id.toLowerCase();
  const edges = fullGraph.edges.filter(e => e.source.toLowerCase() === targetId || e.target.toLowerCase() === targetId);
  const connections = edges.map(e => {
    const isSource = e.source.toLowerCase() === targetId;
    const otherId = isSource ? e.target : e.source;
    const otherNode = fullGraph.nodes.find(n => n.id.toLowerCase() === otherId.toLowerCase());
    return {
      edge: e,
      connectedNode: otherNode
    };
  }).filter(c => c.connectedNode);

  return { node, connections };
}

/**
 * Connection Centrality (Degree Centrality)
 * Prototype runtime calculation: returns the number of direct incident edges for a node in the graph.
 * In a production deployment, this is backed by an enterprise graph database (e.g., Neo4j GDS library)
 * with PageRank, Betweenness Centrality, and Louvain community detection.
 */
export function getNodeDegree(nodeId: string): number {
  const fullGraph = getFullGraph();
  const cleanId = (nodeId || '').trim().toLowerCase();
  const node = fullGraph.nodes.find(
    n => n.id.toLowerCase() === cleanId || n.label.toLowerCase() === cleanId
  );
  return node ? node.connectionCount : 0;
}

export const calculateNetworkDegree = getNodeDegree;
export const calculateCentrality = getNodeDegree;

export function getCrossCaseConnections() {
  const fullGraph = getFullGraph();
  const entitiesInMultipleCases = fullGraph.nodes.filter(n => n.caseIds.length > 1);
  return entitiesInMultipleCases;
}
