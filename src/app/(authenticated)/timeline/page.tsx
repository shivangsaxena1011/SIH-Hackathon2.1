'use client';

import { useEffect, useState } from 'react';
import { TimelineView } from '@/components/timeline/TimelineView';
import type { Event, EntityType } from '@/types';
import { Calendar, Filter, Activity } from 'lucide-react';
import { getEntityTypeColor } from '@/lib/utils';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { seedEvents } from '@/data/seed';

const entityTypes: EntityType[] = ['PERSON', 'VEHICLE', 'IDENTIFIER', 'LOCATION', 'DOCUMENT'];

export default function TimelinePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState<EntityType | null>(null);

  useEffect(() => {
    let url = '/api/timeline';
    if (activeType) {
      url += `?type=${activeType}`;
    }
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load timeline events');
        return res.json();
      })
      .then(d => {
        setEvents(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(err => {
        console.warn('[Timeline Offline Fallback] Using local seed events:', err);
        const fallbackEvents = activeType
          ? seedEvents.filter(e => e.entityType === activeType)
          : seedEvents;
        setEvents(fallbackEvents);
        setLoading(false);
      });
  }, [activeType]);

  return (
    <ErrorBoundary
      fallbackTitle="Timeline Analysis Offline"
      fallbackMessage="Unable to stream chronological sequence. Offline deterministic timeline loaded."
    >
      <div className="flex flex-col h-full bg-[#0B0716] overflow-y-auto custom-scrollbar">
        <header className="p-6 border-b border-gray-800 bg-[#1A0F2E]/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide font-display flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-cyan-500" />
                INVESTIGATION TIMELINE
              </h1>
              <p className="text-gray-400 mt-1 text-sm font-sans">Chronological Analysis of Events • Multi-Source Correlated Sequence</p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-xs text-gray-500 mb-1">Total Events</div>
              <div className="text-xl font-mono text-cyan-400">{events.length}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
            <Filter className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
            <button
              onClick={() => setActiveType(null)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                activeType === null 
                  ? 'bg-gray-800 text-white border-gray-600' 
                  : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300'
              }`}
            >
              All Events
            </button>
            {entityTypes.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
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
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-cyan-500">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Calendar className="w-12 h-12 mb-4 opacity-50" />
              <p>No events found for the selected filter.</p>
            </div>
          ) : (
            <TimelineView events={events} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
