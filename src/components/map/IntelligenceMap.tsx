'use client';

import { useState, useRef, useMemo } from 'react';
import type { MapPoint } from '@/types';
import { getEntityTypeColor } from '@/lib/utils';
import { MapEventDetail } from './MapEventDetail';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface IntelligenceMapProps {
  points: MapPoint[];
}

export function IntelligenceMap({ points }: IntelligenceMapProps) {
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize coords. Assuming Bhopal approx bounds: lat 23.19-23.32, lng 77.33-77.49
  const MIN_LAT = 23.19;
  const MAX_LAT = 23.32;
  const MIN_LNG = 77.33;
  const MAX_LNG = 77.49;

  const getNormalizedCoords = (lat: number, lng: number) => {
    const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 800; // SVG width approx 800
    const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 600; // SVG height approx 600 (inverted y)
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newZoom = zoom + (e.deltaY < 0 ? 0.1 : -0.1);
    setZoom(Math.max(0.5, Math.min(newZoom, 4)));
  };

  // Group by location id (if points represent the same location but different events)
  const groupedPoints = useMemo(() => {
    const map = new Map<string, MapPoint[]>();
    points.forEach(p => {
      const key = `${p.lat},${p.lng}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    });
    return Array.from(map.values());
  }, [points]);

  // Connect sequential events
  const paths = useMemo(() => {
    const sorted = [...points].sort((a, b) => new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime());
    const result = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const p1 = getNormalizedCoords(sorted[i].lat, sorted[i].lng);
      const p2 = getNormalizedCoords(sorted[i + 1].lat, sorted[i + 1].lng);
      result.push(
        <line 
          key={`path-${i}`}
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke="rgba(168, 85, 247, 0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      );
    }
    return result;
  }, [points]);

  return (
    <div 
      className="relative w-full h-full bg-[#05030A] overflow-hidden"
      ref={containerRef}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 bg-[#1A0F2E] p-2 rounded-lg border border-gray-800">
        <button onClick={() => setZoom(z => Math.min(z + 0.2, 4))} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><ZoomIn className="w-4 h-4"/></button>
        <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><ZoomOut className="w-4 h-4"/></button>
        <button onClick={() => { setZoom(1); setPan({x:0, y:0}); }} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><Maximize className="w-4 h-4"/></button>
      </div>

      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 600"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center' }}
        >
          {/* Grid background */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          </pattern>
          <rect width="800" height="600" fill="url(#grid)" />

          {/* Paths connecting events */}
          {paths}

          {/* Location Points */}
          {groupedPoints.map((group, i) => {
            const point = group[0];
            const { x, y } = getNormalizedCoords(point.lat, point.lng);
            const color = getEntityTypeColor(point.type);
            const isSelected = selectedPoint?.id === point.id;

            return (
              <g 
                key={`point-${i}`} 
                transform={`translate(${x}, ${y})`}
                onClick={(e) => { e.stopPropagation(); setSelectedPoint(point); }}
                className="cursor-pointer"
              >
                <circle r={isSelected ? 12 : 8} fill={`${color}40`} />
                <circle r={isSelected ? 6 : 4} fill={color} stroke="#000" strokeWidth="1.5" />
                
                {group.length > 1 && (
                  <g transform="translate(6, -6)">
                    <circle r="6" fill="#1A0F2E" stroke={color} strokeWidth="1" />
                    <text x="0" y="3" fontSize="8" fill="#FFF" textAnchor="middle" fontFamily="sans-serif">{group.length}</text>
                  </g>
                )}
                
                <text x="12" y="4" fontSize="10" fill="#AAA" fontFamily="sans-serif">{point.label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <MapEventDetail point={selectedPoint} onClose={() => setSelectedPoint(null)} />
    </div>
  );
}
