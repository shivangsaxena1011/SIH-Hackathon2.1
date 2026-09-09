'use client';

import { Car } from 'lucide-react';
import Link from 'next/link';
import { seedVehicles } from '@/data/seed';

export default function VehiclesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">VEHICLE REGISTRY</h1>
          <p className="text-gray-400 mt-2 text-sm">Automated Number Plate Recognition (ANPR) linked entities (Demo Data).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seedVehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5 hover:border-purple-500/30 transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-mono">{vehicle.registration}</h3>
                <p className="text-xs text-gray-500">{vehicle.type}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-800 pb-1">
                <span className="text-gray-500">Make/Model</span>
                <span className="text-gray-300">{vehicle.make} {vehicle.model}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1">
                <span className="text-gray-500">Color</span>
                <span className="text-gray-300">{vehicle.color}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1">
                <span className="text-gray-500">Linked Persons</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {(vehicle.associatedPersonIds || []).map((pid: string) => (
                    <Link
                      key={pid}
                      href={`/persons/${pid}`}
                      className="text-xs text-purple-400 hover:text-purple-300 underline font-mono"
                    >
                      {pid}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">Associated Cases</p>
              <div className="flex flex-wrap gap-2">
                {(vehicle.associatedCaseIds || []).map((cid: string) => (
                  <Link
                    key={cid}
                    href={`/cases/${cid}`}
                    className="text-xs bg-gray-800 hover:bg-purple-900/40 px-2 py-1 rounded text-purple-300 border border-gray-700 hover:border-purple-500/50 transition-colors font-mono"
                  >
                    {cid}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
