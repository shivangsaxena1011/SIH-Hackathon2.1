'use client';
import { useState, useEffect } from 'react';
import { seedCases } from '@/data/seed';
import { CaseCard } from '@/components/cases/CaseCard';
import { Search, Filter, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Case } from '@/types';

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // In a real app, this would be a fetch call to /api/cases
    setCases(seedCases);
  }, []);

  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0716] text-gray-300 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-space-grotesk font-bold text-white">
              INVESTIGATION CASES
            </h1>
            <p className="text-gray-400 mt-1">Manage and monitor active investigations</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#1A0F2E] p-4 rounded-xl border border-purple-500/20">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search case number or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-gray-700 hover:border-purple-500/50 rounded-lg text-sm transition-colors w-full sm:w-auto justify-center text-white">
               <Filter className="w-4 h-4" /> Filter
             </button>
             <div className="flex bg-black/40 border border-gray-700 rounded-lg p-1">
               <button className="p-1.5 bg-purple-500/20 text-purple-400 rounded-md">
                 <LayoutGrid className="w-4 h-4" />
               </button>
               <button className="p-1.5 text-gray-500 hover:text-gray-300">
                 <ListIcon className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map(c => (
            <CaseCard key={c.id} data={c} />
          ))}
          {filteredCases.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No cases found matching your search.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
