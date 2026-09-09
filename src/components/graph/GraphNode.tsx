'use client';

import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { getEntityTypeColor, getPriorityColor, getEntityTypeBg } from '@/lib/utils';
import { 
  User, Briefcase, Car, FileText, MapPin, 
  Hash, Building2, Calendar, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EntityType } from '@/types';

const iconMap: Record<EntityType, React.ReactNode> = {
  PERSON: <User className="w-4 h-4" />,
  CASE: <Briefcase className="w-4 h-4" />,
  VEHICLE: <Car className="w-4 h-4" />,
  DOCUMENT: <FileText className="w-4 h-4" />,
  LOCATION: <MapPin className="w-4 h-4" />,
  IDENTIFIER: <Hash className="w-4 h-4" />,
  ORGANIZATION: <Building2 className="w-4 h-4" />,
  EVENT: <Calendar className="w-4 h-4" />
};

export const GraphNodeComponent = memo(({ data, selected }: { data: any, selected: boolean }) => {
  const bgColorClass = getEntityTypeBg(data.entityType as string);
  const color = getEntityTypeColor(data.entityType as string);
  const priorityClass = data.riskLevel ? getPriorityColor(data.riskLevel as string) : '';
  const isHub = data.isHub || data.connectionCount >= 6;
  
  return (
    <div className={cn(
      "px-4 py-2.5 shadow-lg rounded-xl border bg-[#1A0F2E] flex flex-col items-center justify-center transition-all cursor-pointer min-w-[130px]",
      isHub ? "border-purple-500 ring-2 ring-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-105" : "border-gray-800",
      selected ? "ring-2 ring-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.6)]" : "hover:border-purple-400/60",
      data.riskLevel === 'CRITICAL' ? "border-red-500/50" : ""
    )}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 rounded-full border-0 bg-transparent" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 rounded-full border-0 bg-transparent" />
      <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full border-0 bg-transparent" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full border-0 bg-transparent" />
      
      {isHub && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
          <Crown className="w-2.5 h-2.5" /> PRIMARY HUB
        </div>
      )}

      <div className={cn("w-9 h-9 rounded-full flex items-center justify-center mb-1.5", bgColorClass)} style={{ color }}>
        {iconMap[data.entityType as EntityType] || <Hash className="w-4 h-4" />}
      </div>
      
      <div className="text-center">
        <div className="text-xs font-bold text-gray-100 max-w-[120px] truncate">{data.label}</div>
        <div className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider font-mono">{data.entityType}</div>
      </div>
      
      {data.connectionCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#1A0F2E] shadow-sm">
          {data.connectionCount}
        </div>
      )}
      
      {data.riskLevel && data.riskLevel !== 'LOW' && (
        <div className={cn("absolute -bottom-2 -left-2 text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#1A0F2E]", priorityClass)}>
          {data.riskLevel}
        </div>
      )}
    </div>
  );
});

GraphNodeComponent.displayName = 'GraphNodeComponent';
