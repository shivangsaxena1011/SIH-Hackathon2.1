'use client';

import { motion } from 'framer-motion';
import { formatDateTime, getEntityTypeColor, getEntityTypeBg } from '@/lib/utils';
import type { Event } from '@/types';
import { Camera, Car, User, FileText, MapPin, Hash, Database, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineViewProps {
  events: Event[];
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'PERSON': return <User className="w-4 h-4" />;
    case 'VEHICLE': return <Car className="w-4 h-4" />;
    case 'DOCUMENT': return <FileText className="w-4 h-4" />;
    case 'LOCATION': return <MapPin className="w-4 h-4" />;
    case 'IDENTIFIER': return <Hash className="w-4 h-4" />;
    default: return <Database className="w-4 h-4" />;
  }
};

export function TimelineView({ events }: TimelineViewProps) {
  return (
    <div className="relative py-8 px-4 sm:px-10">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 transform -translate-x-1/2" />

      <div className="space-y-12">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              key={event.id}
              className={cn("flex items-center w-full", isLeft ? "justify-start" : "justify-end")}
            >
              <div className={cn("w-1/2 relative", isLeft ? "pr-8 text-right" : "pl-8 text-left")}>
                
                {/* Node on Timeline */}
                <div 
                  className={cn("absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0B0716] z-10 shadow-lg", getEntityTypeBg(event.entityType))}
                  style={{ color: getEntityTypeColor(event.entityType), [isLeft ? 'right' : 'left']: '-16px' }}
                >
                  {getEventIcon(event.entityType)}
                </div>

                <div className="bg-[#1A0F2E] border border-gray-800 p-5 rounded-2xl shadow-xl hover:border-gray-600 transition-colors group cursor-pointer relative overflow-hidden">
                  
                  {/* Confidence bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-800 w-full">
                    <div 
                      className="h-full transition-all" 
                      style={{ 
                        width: `${event.confidence}%`, 
                        backgroundColor: getEntityTypeColor(event.entityType)
                      }}
                    />
                  </div>

                  <div className={cn("text-xs text-gray-500 mb-2 font-mono flex items-center", isLeft ? "justify-end" : "justify-start")}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDateTime(event.timestamp)}
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-200 mb-1">{event.entityName}</h4>
                  
                  <div className={cn("flex items-center gap-2 mb-3 flex-wrap", isLeft ? "justify-end" : "justify-start")}>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 font-semibold tracking-wide">
                      {event.entityType}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                      {event.caseId}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className={cn("flex flex-col gap-1 text-xs text-gray-500", isLeft ? "items-end" : "items-start")}>
                    {event.locationName && (
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-red-400" /> {event.locationName}
                      </div>
                    )}
                    <div className="flex items-center mt-1">
                      <Camera className="w-3 h-3 mr-1 text-gray-400" /> Source: {event.source} ({event.confidence}% Conf.)
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
