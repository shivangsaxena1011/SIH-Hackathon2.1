'use client';

import { Hash } from 'lucide-react';
import Link from 'next/link';
import { seedIdentifiers } from '@/data/seed';

export default function IdentifiersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">IDENTIFIERS REGISTRY</h1>
          <p className="text-gray-400 mt-2 text-sm">Digital and physical identifiers linked to persons and cases (Demo Data).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seedIdentifiers.map(identifier => (
          <div key={identifier.id} className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5 hover:border-purple-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">{identifier.type.replace('_', ' ')}</p>
                <h3 className="text-lg font-mono text-purple-400 font-semibold">{identifier.value}</h3>
              </div>
              <div className="w-8 h-8 bg-purple-500/10 border border-purple-500/20 rounded flex items-center justify-center">
                <Hash className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Associated Person:</span>
                {identifier.associatedPersonId ? (
                  <Link
                    href={`/persons/${identifier.associatedPersonId}`}
                    className="text-xs font-mono text-purple-400 hover:text-purple-300 underline bg-gray-900 px-2 py-0.5 rounded border border-gray-800"
                  >
                    {identifier.associatedPersonId}
                  </Link>
                ) : (
                  <span className="text-xs text-gray-500">Unassigned</span>
                )}
              </div>
              {identifier.associatedCaseIds && identifier.associatedCaseIds.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Associated Cases:</span>
                  <div className="flex gap-1">
                    {identifier.associatedCaseIds.map((cid: string) => (
                      <Link
                        key={cid}
                        href={`/cases/${cid}`}
                        className="text-xs font-mono text-gray-300 hover:text-purple-300 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700"
                      >
                        {cid}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
