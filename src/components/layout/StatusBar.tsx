'use client';

import React, { useState, useEffect } from 'react';
import { formatDateTime } from '@/lib/utils';
import { ShieldCheck, Activity, AlertTriangle } from 'lucide-react';

export default function StatusBar() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Initial set
    setTime(formatDateTime(new Date().toISOString()));
    
    // Update every second
    const interval = setInterval(() => {
      setTime(formatDateTime(new Date().toISOString()));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 bg-[#0B0716] border-t border-purple-500/20 flex items-center justify-between px-4 text-[11px] font-mono shrink-0 select-none">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-1.5 text-green-500">
          <ShieldCheck size={12} />
          <span>SECURITY STATUS: PROTECTED</span>
        </div>
        
        <div className="flex items-center space-x-1.5 text-green-500">
          <Activity size={12} />
          <span>AUDIT: ACTIVE</span>
        </div>
        
        <div className="flex items-center space-x-1.5 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          <AlertTriangle size={12} />
          <span className="font-bold">ENVIRONMENT: DEMO</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">SIH-INTEL-V1.0</span>
        <span className="text-gray-400">{time}</span>
      </div>
    </div>
  );
}
