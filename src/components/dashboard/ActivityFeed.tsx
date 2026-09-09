'use client';
import { seedEvents } from '@/data/seed';
import { formatTime, getEntityTypeColor, getEntityTypeBg } from '@/lib/utils';
import { motion } from 'framer-motion';

export function ActivityFeed() {
  const recentEvents = seedEvents.slice(0, 10);

  return (
    <div className="bg-[#1A0F2E] rounded-xl border border-purple-500/20 p-5 h-full overflow-hidden flex flex-col">
      <h3 className="text-lg font-space-grotesk font-semibold text-white mb-4">Case Activity Timeline</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {recentEvents.map((event, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={event.id} 
            className="flex gap-3 text-sm relative"
          >
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: getEntityTypeColor(event.entityType) }} />
              {i !== recentEvents.length - 1 && <div className="w-px h-full bg-purple-500/20 mt-1" />}
            </div>
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-400">{formatTime(event.timestamp)}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${getEntityTypeBg(event.entityType)}`}>
                  {event.entityType}
                </span>
              </div>
              <p className="text-gray-200">
                <span className="font-medium text-white">{event.entityName}</span> {event.description.replace(event.entityName || '', '').trim()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
