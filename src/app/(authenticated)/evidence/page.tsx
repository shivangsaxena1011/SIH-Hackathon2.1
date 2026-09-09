'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, File, Hash, Download, Lock, Search } from 'lucide-react';
import type { Evidence } from '@/types';

export default function EvidencePage() {
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const res = await fetch('/api/evidence');
        const data = await res.json();
        setEvidence(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvidence();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">EVIDENCE REGISTRY</h1>
          <p className="text-gray-400 mt-2 text-sm flex items-center">
            <Lock className="w-4 h-4 mr-2 text-purple-500" />
            Integrity status indicates whether the stored file matches the recorded cryptographic hash.
          </p>
        </div>
        <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search evidence ID or description..." 
              className="pl-9 pr-4 py-2 bg-[#1A0F2E] border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500 w-72"
            />
          </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading evidence registry...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evidence.map((item) => (
            <div key={item.id} className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <File className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{item.id}</h3>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                </div>
                {item.integrityStatus === 'VERIFIED' ? (
                  <span className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                    <ShieldCheck className="w-3 h-3 mr-1" /> VERIFIED
                  </span>
                ) : (
                  <span className="flex items-center text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    <Lock className="w-3 h-3 mr-1" /> COMPROMISED
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-300 mb-4 flex-1">{item.description}</p>
              
              <div className="space-y-3 bg-black/30 p-3 rounded-lg border border-gray-800/50 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Case Link:</span>
                  <span className="text-purple-400">{item.caseId}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Uploaded By:</span>
                  <span className="text-gray-300">{item.uploadedBy}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Date:</span>
                  <span className="text-gray-300">{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-800/50">
                <div className="flex items-center text-xs text-gray-500 font-mono">
                  <Hash className="w-3 h-3 mr-1" />
                  {item.hash.substring(0, 16)}...
                </div>
                <button className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded transition-colors flex items-center">
                  <Download className="w-3 h-3 mr-1" /> Access
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
