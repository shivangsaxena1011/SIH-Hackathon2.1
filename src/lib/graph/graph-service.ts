import {
  seedPersons, seedCases, seedVehicles, seedIdentifiers,
  seedLocations, seedDocuments, seedOrganizations, seedRelationships
} from '@/data/seed';
import type { GraphNode, GraphEdge, GraphData, EntityType } from '@/types';

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
  const connectedNodeIds = new Set<string>();
  connectedNodeIds.add(entityId);

  const edges = fullGraph.edges.filter(e => {
    if (e.source === entityId || e.target === entityId) {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
      return true;
    }
    return false;
  });

  const nodes = fullGraph.nodes.filter(n => connectedNodeIds.has(n.id));
  return { nodes, edges };
}

export function getCaseGraph(caseId: string): GraphData {
  const fullGraph = getFullGraph();
  const nodes = fullGraph.nodes.filter(n => n.caseIds.includes(caseId));
  const nodeIds = new Set(nodes.map(n => n.id));
  const edges = fullGraph.edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));
  
  return { nodes, edges };
}

export function getNodeDetails(nodeId: string) {
  const fullGraph = getFullGraph();
  const node = fullGraph.nodes.find(n => n.id === nodeId);
  if (!node) return null;
  
  const edges = fullGraph.edges.filter(e => e.source === nodeId || e.target === nodeId);
  const connections = edges.map(e => {
    const isSource = e.source === nodeId;
    const otherId = isSource ? e.target : e.source;
    const otherNode = fullGraph.nodes.find(n => n.id === otherId);
    return {
      edge: e,
      connectedNode: otherNode
    };
  }).filter(c => c.connectedNode);

  return { node, connections };
}

export function calculateCentrality(nodeId: string): number {
  const fullGraph = getFullGraph();
  const node = fullGraph.nodes.find(n => n.id === nodeId);
  return node ? node.connectionCount : 0;
}

export function getCrossCaseConnections() {
  const fullGraph = getFullGraph();
  const entitiesInMultipleCases = fullGraph.nodes.filter(n => n.caseIds.length > 1);
  return entitiesInMultipleCases;
}
