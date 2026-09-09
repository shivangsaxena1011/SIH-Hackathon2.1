'use client';

import { Filter, Maximize, RotateCcw, Search } from 'lucide-react';
import type { EntityType } from '@/types';
import { getEntityTypeColor } from '@/lib/utils';

const entityTypes: EntityType[] = ['PERSON', 'CASE', 'VEHICLE', 'IDENTIFIER', 'LOCATION', 'ORGANIZATION', 'DOCUMENT'];

interface GraphFilterBarProps {
  onFilterChange: (type: EntityType) => void;
  activeFilters: Set<EntityType>;
  onSearch: (q: string) => void;
  onReset: () => void;
  onFit: () => void;
}

export function GraphFilterBar({ onFilterChange, activeFilters, onSearch, onReset, onFit }: GraphFilterBarProps) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-2 items-center justify-between bg-[#1A0F2E]/80 backdrop-blur-md p-2 rounded-xl border border-gray-800">
      <div className="flex items-center space-x-2 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400 ml-2" />
        {entityTypes.map(type => (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${
              activeFilters.has(type) 
                ? 'bg-gray-800 text-white' 
                : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300'
            }`}
            style={{ 
              borderColor: activeFilters.has(type) ? getEntityTypeColor(type) : '',
              color: activeFilters.has(type) ? getEntityTypeColor(type) : ''
            }}
          >
            {type}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-2.5 top-1.5" />
          <input 
            type="text" 
            placeholder="Search nodes..." 
            onChange={(e) => onSearch(e.target.value)}
            className="bg-[#0B0716] border border-gray-800 text-white text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-purple-500 w-48"
          />
        </div>
        <button onClick={onReset} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition" title="Reset Layout">
          <RotateCcw className="w-4 h-4" />
        </button>
        <button onClick={onFit} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition" title="Fit to Screen">
          <Maximize className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
