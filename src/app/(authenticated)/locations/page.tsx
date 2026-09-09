'use client';

import { MapPin, Search } from 'lucide-react';
import { seedLocations } from '@/data/seed';

export default function LocationsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">LOCATIONS</h1>
          <p className="text-gray-400 mt-2 text-sm">Key coordinates and zones of interest.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seedLocations.map(location => (
          <div key={location.id} className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{location.name}</h3>
                <p className="text-xs text-gray-500">{location.type.replace('_', ' ')}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm bg-black/20 p-3 rounded-lg border border-gray-800/50">
              <div className="flex justify-between">
                <span className="text-gray-500">Zone</span>
                <span className="text-gray-300 font-medium">{location.zone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Coordinates</span>
                <span className="text-gray-400 font-mono text-xs">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
