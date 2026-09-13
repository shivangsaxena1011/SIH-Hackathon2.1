'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  Car,
  FileText,
  Fingerprint
} from 'lucide-react';
import type { Event, EntityType } from '@/types';

interface InvestigationReplayProps {
  events: Event[];
  onEventChange?: (event: Event, index: number) => void;
  selectedEventId?: string;
}

export default function InvestigationReplay({
  events,
  onEventChange,
  selectedEventId
}: InvestigationReplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2000); // 2 sec per event

  // Auto playback loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= events.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          if (onEventChange && events[next]) {
            onEventChange(events[next], next);
          }
          return next;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, events, playbackSpeed, onEventChange]);

  const handleStep = (idx: number) => {
    if (idx >= 0 && idx < events.length) {
      setCurrentIndex(idx);
      if (onEventChange) {
        onEventChange(events[idx], idx);
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    handleStep(0);
  };

  const currentEvent = events[currentIndex] || events[0];

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'PERSON': return <User className="w-4 h-4 text-purple-400" />;
      case 'VEHICLE': return <Car className="w-4 h-4 text-blue-400" />;
      case 'DOCUMENT': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'LOCATION': return <MapPin className="w-4 h-4 text-rose-400" />;
      case 'IDENTIFIER': return <Fingerprint className="w-4 h-4 text-cyan-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl bg-[#1A0F2E] border border-purple-500/30 p-4 shadow-xl text-gray-100">
      {/* Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-purple-900/50 text-purple-300">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-space font-bold uppercase tracking-wider text-white">
              INVESTIGATION REPLAY CONTROLLER
            </div>
            <div className="text-[10px] font-mono text-gray-400">
              Synchronized Multi-Modal Playback (Step {currentIndex + 1} of {events.length})
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#0B0716] hover:bg-purple-900/40 text-gray-400 hover:text-white transition-colors"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleStep(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-lg bg-[#0B0716] hover:bg-purple-900/40 disabled:opacity-40 text-gray-300 transition-colors"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Play Replay
              </>
            )}
          </button>
          <button
            onClick={() => handleStep(currentIndex + 1)}
            disabled={currentIndex === events.length - 1}
            className="p-1.5 rounded-lg bg-[#0B0716] hover:bg-purple-900/40 disabled:opacity-40 text-gray-300 transition-colors"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <select
            value={playbackSpeed}
            onChange={e => setPlaybackSpeed(Number(e.target.value))}
            className="bg-[#0B0716] text-[11px] font-mono border border-purple-500/30 rounded px-2 py-1 text-gray-300 focus:outline-none"
          >
            <option value={3000}>0.5x</option>
            <option value={2000}>1.0x</option>
            <option value={1000}>2.0x</option>
          </select>
        </div>
      </div>

      {/* Progress Scrubber */}
      <div className="py-3">
        <div className="relative w-full h-2 bg-[#0B0716] rounded-full overflow-hidden border border-purple-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / events.length) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-1">
          <span>{new Date(events[0].timestamp).toLocaleDateString()}</span>
          <span>{new Date(events[events.length - 1].timestamp).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Active Event Showcase Card */}
      {currentEvent && (
        <motion.div
          key={currentEvent.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-lg bg-[#0B0716] border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3"
        >
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded bg-purple-950 border border-purple-500/30 mt-0.5">
              {getEntityIcon(currentEvent.entityType)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white font-space">
                  {currentEvent.entityName || currentEvent.entityId}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300">
                  {currentEvent.entityType}
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  {new Date(currentEvent.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">{currentEvent.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            {currentEvent.locationName && (
              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> {currentEvent.locationName}
              </div>
            )}
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> {currentEvent.confidence}% conf
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
