'use client';

import { useEffect, useState } from 'react';
import { IntelligenceMap } from '@/components/map/IntelligenceMap';
import type { MapPoint, EntityType } from '@/types';
import { Map, MapPin, Activity, Filter } from 'lucide-react';
import { getEntityTypeColor } from '@/lib/utils';

const entityTypes: EntityType[] = ['PERSON', 'VEHICLE', 'IDENTIFIER'];

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { getSyntheticMapPoints } from '@/lib/map/map-service';

export default function MapPage() {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<EntityType | null>(null);

  useEffect(() => {
    fetch('/api/events/map')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load map data');
        return res.json();
      })
      .then(d => {
        setPoints(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(err => {
        console.warn('[Map Offline Fallback] Using local synthetic map points:', err);
        setPoints(getSyntheticMapPoints());
        setLoading(false);
      });
  }, []);

  const filteredPoints = activeType ? points.filter(p => p.type === activeType) : points;

  return (
    <ErrorBoundary
      fallbackTitle="Geospatial Map Offline"
      fallbackMessage="Unable to stream map coordinates. Synthetic geospatial offline mode active."
    >
      <div className="flex flex-col h-full bg-[#0B0716]">
        <header className="p-6 border-b border-gray-800 bg-[#1A0F2E]/50 flex justify-between items-center z-10 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide font-display flex items-center">
              <Map className="w-6 h-6 mr-3 text-red-500" />
              INTELLIGENCE MAP
            </h1>
            <p className="text-gray-400 mt-1 text-sm font-sans">Geospatial Event Analysis • Zero External Map API Dependency (SVG Engine)</p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex space-x-6 mb-3">
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1 flex items-center justify-end"><MapPin className="w-3 h-3 mr-1"/> Logged Locations</div>
              <div className="text-lg font-mono text-red-400">{filteredPoints.length}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-3 h-3 text-gray-500" />
            <button
              onClick={() => setActiveType(null)}
              className={`px-2 py-0.5 text-[10px] rounded border transition-all ${
                activeType === null 
                  ? 'bg-gray-800 text-white border-gray-600' 
                  : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300'
              }`}
            >
              All
            </button>
            {entityTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-2 py-0.5 text-[10px] rounded border transition-all ${
                  activeType === type 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300'
                }`}
                style={{ 
                  borderColor: activeType === type ? getEntityTypeColor(type) : '',
                  color: activeType === type ? getEntityTypeColor(type) : ''
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full text-red-500">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
        ) : (
          <IntelligenceMap points={filteredPoints} />
        )}
      </main>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#1A0F2E]/80 backdrop-blur-md p-3 rounded-lg border border-gray-800 z-10 flex space-x-4 pointer-events-none">
        {entityTypes.map(type => (
          <div key={type} className="flex items-center text-xs text-gray-300">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getEntityTypeColor(type) }} />
            {type}
          </div>
        ))}
      </div>
    </div>
    </ErrorBoundary>
  );
}
