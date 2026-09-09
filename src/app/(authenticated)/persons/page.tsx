'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Search, Filter, ShieldAlert, Activity } from 'lucide-react';
import type { Person } from '@/types';

export default function PersonsPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const res = await fetch('/api/persons');
        const data = await res.json();
        setPersons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersons();
  }, []);

  const filteredPersons = persons.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.aliases && p.aliases.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">PERSON INTELLIGENCE REGISTRY</h1>
          <p className="text-gray-400 mt-2 text-sm flex items-center">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            Centralized database of individuals associated with ongoing investigations.
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search name or alias..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#1A0F2E] border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500 w-64"
            />
          </div>
          <button className="px-4 py-2 bg-[#1A0F2E] border border-gray-800 rounded-lg text-gray-300 text-sm flex items-center hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading registry...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersons.map((person) => (
            <Link href={`/persons/${person.id}`} key={person.id} className="block group">
              <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5 group-hover:border-purple-500/50 transition-colors h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex items-center justify-center">
                      {person.photoUrl ? (
                        <img src={person.photoUrl} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg group-hover:text-purple-400 transition-colors">{person.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{person.id}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4 flex-1">
                  <div>
                     <p className="text-xs text-gray-500 mb-1">Status</p>
                     <span className={`px-2 py-1 rounded text-xs font-semibold border inline-block ${
                        person.riskLevel === 'HIGH' || person.riskLevel === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        person.riskLevel === 'MEDIUM' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                     }`}>
                        {person.status ? person.status.replace('_', ' ') : 'UNDER REVIEW'}
                     </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Priority Level</p>
                    <div className="flex items-center">
                       <Activity className={`w-4 h-4 mr-1 ${
                          person.riskLevel === 'CRITICAL' || person.riskLevel === 'HIGH' ? 'text-red-500' :
                          person.riskLevel === 'MEDIUM' ? 'text-orange-500' : 'text-green-500'
                       }`} />
                       <span className="text-sm text-gray-300 font-mono">{person.riskLevel}</span>
                    </div>
                  </div>
                  {person.aliases && person.aliases.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Known Aliases</p>
                      <div className="flex flex-wrap gap-1">
                        {person.aliases.map((alias, i) => (
                          <span key={i} className="text-xs bg-gray-800/80 text-gray-400 px-2 py-0.5 rounded">
                            {alias}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-4 border-t border-gray-800/50 flex justify-between items-center">
                   <div className="text-xs text-gray-500 flex items-center">
                      <ShieldAlert className="w-3 h-3 mr-1" />
                      {(person.associatedCaseIds || []).length} Associated Case(s)
                   </div>
                   <span className="text-xs text-purple-400 font-medium group-hover:underline">View Profile &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
