'use client';

import { X, Clock, Target, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEntityTypeColor, formatDateTime } from '@/lib/utils';
import type { MapPoint } from '@/types';

interface MapEventDetailProps {
  point: MapPoint | null;
  onClose: () => void;
}

export function MapEventDetail({ point, onClose }: MapEventDetailProps) {
  if (!point) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-80 bg-[#1A0F2E]/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#0B0716]/80">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-400" />
            <h3 className="font-semibold text-gray-200 text-sm">LOCATION EVENT</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <h4 className="text-lg font-bold text-white mb-1">{point.label}</h4>
          
          <div className="flex items-center text-xs text-gray-400 mb-4 pb-2 border-b border-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            {point.timestamp ? formatDateTime(point.timestamp) : 'Time unknown'}
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Entity Involved</div>
              <div className="flex items-center">
                <div 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: getEntityTypeColor(point.type) }}
                />
                <span className="text-gray-200 text-sm font-semibold">{point.entityName}</span>
                <span className="ml-2 text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">{point.type}</span>
              </div>
            </div>

            {point.description && (
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Activity</div>
                <p className="text-xs text-gray-300 bg-[#0B0716] p-2 rounded border border-gray-800">
                  {point.description}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center text-xs">
                <AlertTriangle className="w-3 h-3 text-amber-500 mr-1" />
                <span className="text-gray-400">Confidence: </span>
                <span className="text-amber-500 font-bold ml-1">{point.confidence}%</span>
              </div>
              
              {point.caseId && (
                <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded font-mono">
                  {point.caseId}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
