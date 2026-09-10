'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, Activity, ShieldAlert, FileText, Calendar, 
  MapPin, ShieldCheck, Brain, ArrowLeft, ExternalLink, Hash, Car
} from 'lucide-react';
import type { Case, Person, Vehicle, Identifier, Document, Evidence, Event, Insight } from '@/types';
import { 
  seedPersons, seedCases, seedVehicles, seedIdentifiers, seedLocations,
  seedDocuments, seedEvidence, seedEvents, seedInsights, seedAuditLogs
} from '@/data/seed';
import { getStatusBgColor, getPriorityColor, formatDate, formatDateTime } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseIdParam = params?.caseId as string;

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function loadCase() {
      setLoading(true);
      try {
        const res = await fetch(`/api/cases/${caseIdParam}`);
        const json = await res.json();
        if (res.status === 403 || json.error === 'ACCESS_DENIED') {
          setAccessDenied(json.message || 'You do not have permission to access this investigation resource.');
          setCaseData(null);
        } else if (json.success && json.data) {
          setCaseData(json.data);
          setAccessDenied(null);
        } else {
          setCaseData(null);
        }
      } catch (err) {
        console.warn('Network issue fetching case, using local seed fallback:', err);
        const cleanId = caseIdParam?.replace(/^(case[#\-_]?|#)/i, '').toLowerCase();
        if (caseIdParam?.includes('999')) {
          setAccessDenied('You do not have permission to access this investigation resource.');
          setCaseData(null);
        } else {
          const fallbackCase = seedCases.find(
            c => c.id.toLowerCase() === caseIdParam?.toLowerCase() ||
                 c.caseNumber.toLowerCase() === caseIdParam?.toLowerCase() ||
                 c.caseNumber.toLowerCase() === cleanId ||
                 c.id.toLowerCase() === cleanId
          ) || seedCases[0];
          setCaseData(fallbackCase);
          setAccessDenied(null);
        }
      } finally {
        setLoading(false);
      }
    }
    if (caseIdParam) {
      loadCase();
    }
  }, [caseIdParam]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400 space-y-3">
        <Activity className="w-8 h-8 animate-spin text-purple-500" />
        <p className="text-sm font-mono">LOADING INVESTIGATION CASE FILE...</p>
      </div>
    );
  }

  // Access Denied State (RBAC demo)
  if (accessDenied) {
    return (
      <div className="max-w-2xl mx-auto mt-16 p-8 bg-[#1A0F2E] border-2 border-red-500/50 rounded-2xl text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-space text-red-400 tracking-wider">ACCESS DENIED</h1>
          <p className="text-xs text-red-500/80 font-mono mt-1 uppercase">SECURITY ENFORCEMENT • RESTRICTED CLASSIFICATION</p>
        </div>
        <div className="p-4 bg-black/40 rounded-xl border border-red-500/20 text-sm text-gray-300">
          <p className="font-medium text-red-300 mb-1">Reason:</p>
          <p>{accessDenied}</p>
        </div>
        <p className="text-xs text-gray-500">
          A security violation log has been recorded in the tamper-evident audit ledger (Result: DENIED).
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/cases')}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded-xl transition flex items-center gap-2 border border-gray-700"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Cases
          </button>
          <button
            onClick={() => router.push('/audit')}
            className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium rounded-xl transition border border-red-500/40"
          >
            View Audit Log
          </button>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-[#1A0F2E] border border-gray-800 rounded-xl text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Case Not Found</h2>
        <p className="text-sm text-gray-400">The requested case record does not exist in the synthetic dataset.</p>
        <button
          onClick={() => router.push('/cases')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm"
        >
          View All Cases
        </button>
      </div>
    );
  }

  // Filter linked items
  const linkedPersons = seedPersons.filter(p => p.associatedCaseIds.includes(caseData.id));
  const linkedVehicles = seedVehicles.filter(v => v.associatedCaseIds.includes(caseData.id));
  const linkedIdentifiers = seedIdentifiers.filter(i => i.associatedCaseIds.includes(caseData.id));
  const linkedDocuments = seedDocuments.filter(d => d.caseId === caseData.id);
  const linkedEvidence = seedEvidence.filter(e => e.caseId === caseData.id);
  const linkedEvents = seedEvents.filter(e => e.caseId === caseData.id);
  const linkedInsights = seedInsights.filter(i => i.caseId === caseData.id);
  const linkedAudit = seedAuditLogs.filter(a => a.caseId === caseData.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'entities', label: `Entities (${linkedPersons.length + linkedVehicles.length + linkedIdentifiers.length})` },
    { id: 'evidence', label: `Evidence (${linkedEvidence.length})` },
    { id: 'documents', label: `Documents (${linkedDocuments.length})` },
    { id: 'network', label: 'Network' },
    { id: 'timeline', label: `Timeline (${linkedEvents.length})` },
    { id: 'map', label: 'Map' },
    { id: 'insights', label: `AI Insights (${linkedInsights.length})` },
    { id: 'audit', label: `Audit (${linkedAudit.length})` },
  ];

  return (
    <ErrorBoundary
      fallbackTitle="Case Investigation Workspace Offline"
      fallbackMessage="Unable to stream real-time docket updates. Deterministic case investigation data loaded."
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
      <div className="bg-[#1A0F2E] rounded-xl border border-purple-500/20 p-6 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-space font-bold text-white">
              CASE #{caseData.caseNumber} — {caseData.title}
            </h1>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl">{caseData.description}</p>
        </div>
        <div className="flex flex-col gap-2 items-start md:items-end shrink-0">
          <div className="flex gap-2">
            <span className={`text-[10px] px-3 py-1 rounded-md border font-medium uppercase tracking-wider ${getStatusBgColor(caseData.status)}`}>
              {caseData.status}
            </span>
            <span className={`text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${getPriorityColor(caseData.priority)}`}>
              {caseData.priority} PRIORITY
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Lead: <span className="text-gray-200 font-medium">{caseData.leadOfficerName}</span>
          </div>
          <div className="text-[11px] text-gray-500">
            Created: {formatDate(caseData.createdAt)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-800 overflow-x-auto pb-px scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap",
              activeTab === tab.id
                ? "border-purple-500 text-purple-400 bg-purple-500/5"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-[#1A0F2E]/70 p-4 rounded-xl border border-purple-500/10">
                <div className="text-xs text-gray-500 mb-1">Entities</div>
                <div className="text-2xl font-bold text-white font-mono">{caseData.entityCount || 12}</div>
              </div>
              <div className="bg-[#1A0F2E]/70 p-4 rounded-xl border border-purple-500/10">
                <div className="text-xs text-gray-500 mb-1">Relationships</div>
                <div className="text-2xl font-bold text-purple-400 font-mono">{caseData.relationshipCount || 7}</div>
              </div>
              <div className="bg-[#1A0F2E]/70 p-4 rounded-xl border border-purple-500/10">
                <div className="text-xs text-gray-500 mb-1">Events</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">{caseData.eventCount || 5}</div>
              </div>
              <div className="bg-[#1A0F2E]/70 p-4 rounded-xl border border-purple-500/10">
                <div className="text-xs text-gray-500 mb-1">Cross-Case Links</div>
                <div className="text-2xl font-bold text-pink-400 font-mono">{caseData.crossCaseLinks || 3}</div>
              </div>
              <div className="bg-[#1A0F2E]/70 p-4 rounded-xl border border-purple-500/10">
                <div className="text-xs text-gray-500 mb-1">Alerts</div>
                <div className="text-2xl font-bold text-red-400 font-mono">{caseData.alertCount || 2}</div>
              </div>
              <div className="bg-[#1A0F2E]/70 p-4 rounded-xl border border-purple-500/10">
                <div className="text-xs text-gray-500 mb-1">Evidence Items</div>
                <div className="text-2xl font-bold text-green-400 font-mono">{caseData.evidenceCount || 4}</div>
              </div>
            </div>

            <div className="bg-[#1A0F2E] p-6 rounded-xl border border-purple-500/20 space-y-4">
              <h3 className="text-lg font-space font-semibold text-white">Investigation Summary</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Multiple entities appearing across separate events and cases have been correlated into a common investigation network. Initial surveillance and automated number plate recognition (ANPR) points indicate synchronized vehicular movements between Bhopal Central Zone and industrial corridors.
              </p>
              <div className="text-xs text-pink-400/90 bg-pink-500/10 p-3 rounded-lg border border-pink-500/20 italic">
                IMPORTANT: This is demo-generated investigative language to assist authorized officers. It does not establish guilt or legal culpability.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1A0F2E] p-5 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Primary Key Entities</h4>
                  <Link href="/network" className="text-xs text-purple-400 hover:underline">Explore Graph &rarr;</Link>
                </div>
                <div className="space-y-2">
                  {linkedPersons.slice(0, 3).map(p => (
                    <div key={p.id} className="p-3 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium text-sm">{p.name}</span>
                        <p className="text-xs text-gray-500 font-mono">{p.id} • {p.status}</p>
                      </div>
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                        {p.riskLevel} PRIORITY
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1A0F2E] p-5 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Active Documents</h4>
                  <Link href="/documents" className="text-xs text-purple-400 hover:underline">All Documents &rarr;</Link>
                </div>
                <div className="space-y-2">
                  {linkedDocuments.map(d => (
                    <div key={d.id} className="p-3 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-white font-medium text-sm">{d.documentId}</span>
                        <p className="text-xs text-gray-500">{d.documentType} ({d.fileName})</p>
                      </div>
                      <Link href={`/documents/${d.id}`} className="text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1 rounded transition">
                        Analyze
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENTITIES TAB */}
        {activeTab === 'entities' && (
          <div className="space-y-6">
            <div className="bg-[#1A0F2E] p-6 rounded-xl border border-purple-500/20 space-y-6">
              <div>
                <h3 className="text-lg font-space font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" /> Persons Linked to Case ({linkedPersons.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {linkedPersons.map(p => (
                    <div key={p.id} className="p-4 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">{p.name}</div>
                        <div className="text-xs text-gray-500 font-mono">ID: {p.id} | Status: {p.status}</div>
                        {p.aliases && p.aliases.length > 0 && (
                          <div className="text-[11px] text-gray-400 mt-1">Aliases: {p.aliases.join(', ')}</div>
                        )}
                      </div>
                      <Link href={`/persons/${p.id}`} className="text-xs text-purple-400 hover:underline">
                        View Profile &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-lg font-space font-semibold text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-400" /> Associated Vehicles ({linkedVehicles.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {linkedVehicles.map(v => (
                    <div key={v.id} className="p-4 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center">
                      <div>
                        <div className="text-amber-400 font-mono font-bold text-base">{v.registration}</div>
                        <div className="text-xs text-gray-400">{v.make} {v.model} ({v.type}) • Color: {v.color}</div>
                      </div>
                      <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded">ANPR Tracked</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-lg font-space font-semibold text-white flex items-center gap-2">
                  <Hash className="w-5 h-5 text-violet-400" /> Registered Identifiers ({linkedIdentifiers.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {linkedIdentifiers.map(i => (
                    <div key={i.id} className="p-3 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-500 uppercase">{i.type}</span>
                        <div className="text-white font-mono text-sm">{i.valueMasked}</div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{i.identifierId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EVIDENCE TAB */}
        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {linkedEvidence.map(item => (
                <div key={item.id} className="bg-[#1A0F2E] p-5 rounded-xl border border-gray-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono text-purple-400">{item.evidenceId}</span>
                      <h4 className="text-white font-medium text-sm mt-0.5">{item.type}</h4>
                    </div>
                    <span className="flex items-center text-xs text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 mr-1" /> {item.integrityStatus}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{item.description}</p>
                  <div className="p-2 bg-black/40 rounded font-mono text-[10px] text-gray-400 truncate" title={item.hash}>
                    SHA-256: {item.hash}
                  </div>
                  <div className="text-[11px] text-gray-500 flex justify-between">
                    <span>Uploaded: {formatDateTime(item.createdAt)}</span>
                    <span>By: {item.uploadedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {linkedDocuments.map(doc => (
                <div key={doc.id} className="bg-[#1A0F2E] p-5 rounded-xl border border-gray-800 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono text-purple-400">{doc.documentId}</span>
                      <h4 className="text-white font-medium text-base mt-0.5">{doc.documentType}</h4>
                    </div>
                    <span className="text-xs bg-green-500/10 border border-green-500/30 text-green-400 px-2 py-0.5 rounded">
                      {doc.analysisStatus}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>File: <span className="text-gray-200">{doc.fileName}</span> ({(doc.fileSize / 1024).toFixed(1)} KB)</div>
                    <div className="font-mono text-[11px] truncate">Hash: {doc.hash}</div>
                  </div>
                  <Link 
                    href={`/documents/${doc.id}`}
                    className="inline-flex items-center justify-center w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition"
                  >
                    Open Forensic Analysis & Entity Resolution &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NETWORK TAB */}
        {activeTab === 'network' && (
          <div className="bg-[#1A0F2E] p-8 rounded-xl border border-purple-500/20 text-center space-y-4">
            <Activity className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
            <h3 className="text-lg font-space font-semibold text-white">Interactive Criminal Intelligence Network</h3>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Case #{caseData.caseNumber} connects 12 entities and 7 relationships into a central knowledge graph.
            </p>
            <div className="pt-2">
              <Link
                href="/network"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-purple-600/20"
              >
                Launch Full Network Graph <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="bg-[#1A0F2E] p-6 rounded-xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Chronological Investigation Events</h3>
            <div className="space-y-3">
              {linkedEvents.map(evt => (
                <div key={evt.id} className="p-3 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400">{formatDateTime(evt.timestamp)}</span>
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded uppercase">{evt.entityType}</span>
                    </div>
                    <p className="text-sm text-gray-200 mt-1">{evt.description}</p>
                    <p className="text-xs text-gray-500">Location: {evt.locationName} | Source: {evt.source}</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400">{evt.confidence}% Conf.</span>
                </div>
              ))}
              {linkedEvents.length === 0 && <p className="text-gray-500 text-sm">No events logged for this case.</p>}
            </div>
          </div>
        )}

        {/* MAP TAB */}
        {activeTab === 'map' && (
          <div className="bg-[#1A0F2E] p-8 rounded-xl border border-purple-500/20 text-center space-y-4">
            <MapPin className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-lg font-space font-semibold text-white">Geospatial Surveillance Map</h3>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              5 movement events detected across Bhopal Central Zone, Transit Checkpoint Alpha, and Industrial Sector 7.
            </p>
            <div className="pt-2">
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-red-600/20"
              >
                Open Full Intelligence Map <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* AI INSIGHTS TAB */}
        {activeTab === 'insights' && (
          <div className="space-y-4">
            {linkedInsights.map(ins => (
              <div key={ins.id} className="bg-[#1A0F2E] p-6 rounded-xl border border-purple-500/20 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-purple-400">{ins.insightId}</span>
                    <h4 className="text-lg font-bold text-white mt-1">{ins.title}</h4>
                  </div>
                  <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                    {ins.severity} PRIORITY
                  </span>
                </div>
                <p className="text-sm text-gray-300">{ins.summary}</p>
                <div className="p-4 bg-black/40 rounded-lg border border-gray-800 space-y-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Why This Insight:</div>
                  <p className="text-xs text-gray-300">{ins.explanation}</p>
                </div>
                <div className="text-xs text-purple-400 font-medium">
                  Recommended Action: {ins.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AUDIT TAB */}
        {activeTab === 'audit' && (
          <div className="bg-[#1A0F2E] p-6 rounded-xl border border-gray-800 space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Access & Modification Trail</h3>
            <div className="space-y-2">
              {linkedAudit.map(log => (
                <div key={log.id} className="p-3 bg-black/40 rounded-lg border border-gray-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-gray-400 font-mono">{formatDateTime(log.timestamp)}</span>
                    <span className="text-purple-400 font-medium ml-2">{log.action}</span>
                    <span className="text-gray-500 ml-2">by {log.userName} ({log.userRole})</span>
                  </div>
                  <span className={log.result === 'ALLOWED' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                    {log.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
