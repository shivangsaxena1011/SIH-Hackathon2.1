'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, Activity } from 'lucide-react';
import type { Person, Relationship } from '@/types';
import { seedCases, seedVehicles, seedLocations, seedDocuments } from '@/data/seed';

export default function PersonProfilePage() {
  const params = useParams();
  const personIdParam = params?.personId as string;
  const [data, setData] = useState<{person: Person, relationships: Relationship[]} | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const res = await fetch(`/api/persons/${personIdParam}`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (personIdParam) {
      fetchPerson();
    }
  }, [personIdParam]);

  if (loading) return <div className="p-6 text-gray-400">Loading profile...</div>;
  if (!data || !data.person) return <div className="p-6 text-red-400">Profile not found.</div>;

  const { person, relationships = [] } = data;
  const associatedCases = seedCases.filter(c => (person.associatedCaseIds || []).includes(c.id));
  const associatedVehicles = seedVehicles.filter(v => (v.associatedPersonIds || []).includes(person.id));
  const associatedDocuments = seedDocuments.filter(d => d.personId === person.id);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden shrink-0 flex items-center justify-center">
           {person.photoUrl ? (
              <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
           ) : (
              <User className="w-12 h-12 text-gray-500" />
           )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold font-space text-white">{person.name}</h1>
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${
                person.riskLevel === 'HIGH' || person.riskLevel === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                person.riskLevel === 'MEDIUM' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                'bg-gray-500/10 text-gray-400 border-gray-500/20'
            }`}>
                {person.status ? person.status.replace('_', ' ') : 'UNDER REVIEW'}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="font-mono bg-gray-900 px-2 py-1 rounded border border-gray-800">{person.id}</span>
            <span className="flex items-center">
              <Activity className="w-4 h-4 mr-1 text-pink-400" /> Priority: {person.riskLevel}
            </span>
          </div>
          {person.aliases && person.aliases.length > 0 && (
            <div className="mt-3 flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Aliases:</span>
                {person.aliases.map((a, i) => <span key={i} className="text-gray-300 bg-gray-800 px-2 py-0.5 rounded text-xs">{a}</span>)}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-800 overflow-x-auto pb-px">
        {['OVERVIEW', 'RELATIONSHIPS', 'CASES', 'VEHICLES', 'DOCUMENTS'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-medium text-white mb-4">Demo Analytics</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-gray-800/50">
                      <span className="text-gray-400 text-sm">Network Centrality</span>
                      <span className="text-purple-400 font-mono">0.82 (High Hub Score)</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-gray-800/50">
                      <span className="text-gray-400 text-sm">Cross-Case Presence</span>
                      <span className="text-pink-400 font-mono">{(person.associatedCaseIds || []).length} Cases</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-gray-800/50">
                      <span className="text-gray-400 text-sm">Known Associates</span>
                      <span className="text-white font-mono">{relationships.length} Entities</span>
                   </div>
                </div>
             </div>
             
             <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-medium text-white mb-4">Personal Details</h3>
                <div className="space-y-3 text-sm">
                   <div className="grid grid-cols-3 gap-2 border-b border-gray-800 pb-2">
                      <span className="text-gray-500">Date of Birth</span>
                      <span className="col-span-2 text-gray-300">{person.dob || 'Unknown'}</span>
                   </div>
                   <div className="grid grid-cols-3 gap-2 border-b border-gray-800 pb-2">
                      <span className="text-gray-500">Nationality</span>
                      <span className="col-span-2 text-gray-300">{person.nationality || 'IND (Demo)'}</span>
                   </div>
                   <div className="grid grid-cols-3 gap-2 border-b border-gray-800 pb-2">
                      <span className="text-gray-500">Gender</span>
                      <span className="col-span-2 text-gray-300">{person.gender || 'Unknown'}</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'RELATIONSHIPS' && (
           <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                 <thead className="bg-gray-900/50">
                    <tr>
                       <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Entity</th>
                       <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Type</th>
                       <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Description</th>
                       <th className="p-4 text-xs font-semibold text-gray-400 uppercase">Confidence</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-800">
                    {relationships.map(rel => (
                       <tr key={rel.id} className="hover:bg-gray-800/20">
                          <td className="p-4 text-sm text-purple-400 font-medium">
                             {rel.sourceEntityId === person.id ? (rel.targetEntityName || rel.targetEntityId) : (rel.sourceEntityName || rel.sourceEntityId)}
                          </td>
                          <td className="p-4 text-sm text-gray-300">{rel.type.replace('_', ' ')}</td>
                          <td className="p-4 text-sm text-gray-400">{rel.description || rel.source}</td>
                          <td className="p-4 text-sm">
                             <span className="text-gray-300">{rel.confidence}%</span>
                          </td>
                       </tr>
                    ))}
                    {relationships.length === 0 && (
                       <tr><td colSpan={4} className="p-4 text-center text-gray-500">No known relationships.</td></tr>
                    )}
                 </tbody>
              </table>
           </div>
        )}

        {activeTab === 'CASES' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {associatedCases.map(c => (
                <div key={c.id} className="p-4 bg-[#1A0F2E] border border-gray-800 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-purple-400 font-semibold">Case #{c.caseNumber}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">{c.status}</span>
                  </div>
                  <h4 className="text-white font-medium mb-1">{c.title}</h4>
                  <p className="text-xs text-gray-400">{c.description}</p>
                </div>
              ))}
              {associatedCases.length === 0 && <p className="text-gray-500 p-4">No associated cases found.</p>}
           </div>
        )}

        {activeTab === 'VEHICLES' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {associatedVehicles.map(v => (
                <div key={v.id} className="p-4 bg-[#1A0F2E] border border-gray-800 rounded-xl">
                  <div className="font-mono text-amber-400 font-semibold text-lg mb-1">{v.registration}</div>
                  <p className="text-sm text-gray-300">{v.make} {v.model} ({v.color}) — {v.type}</p>
                </div>
              ))}
              {associatedVehicles.length === 0 && <p className="text-gray-500 p-4">No associated vehicles found.</p>}
           </div>
        )}

        {activeTab === 'DOCUMENTS' && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {associatedDocuments.map(d => (
                <div key={d.id} className="p-4 bg-[#1A0F2E] border border-gray-800 rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-emerald-400 text-sm">{d.documentId}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{d.documentType}</span>
                  </div>
                  <p className="text-sm text-gray-300">{d.fileName}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">Hash: {d.hash.substring(0, 16)}...</p>
                </div>
              ))}
              {associatedDocuments.length === 0 && <p className="text-gray-500 p-4">No documents directly assigned.</p>}
           </div>
        )}
      </div>
    </div>
  );
}
