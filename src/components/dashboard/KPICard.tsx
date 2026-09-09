'use client';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export function KPICard({ title, value, icon: Icon, trend, color = 'text-purple-500' }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(0);

  useEffect(() => {
    if (typeof value === 'number') {
      const start = 0;
      const end = value;
      const duration = 1000;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setDisplayValue(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(end);
        }
      };
      window.requestAnimationFrame(step);
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#1A0F2E]/80 backdrop-blur-md rounded-xl border border-purple-500/20 p-5 flex items-center shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all"
    >
      <div className={cn("p-3 rounded-lg bg-black/40 mr-4", color)}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm text-gray-400 font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {displayValue}
          </span>
          {trend && (
            <span className="text-xs text-green-400">{trend}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
