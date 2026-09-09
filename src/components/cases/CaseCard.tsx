'use client';
import { Case } from '@/types';
import { formatDate, getStatusBgColor, getPriorityColor } from '@/lib/utils';
import { Users, Link as LinkIcon, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CaseCardProps {
  data: Case;
}

export function CaseCard({ data }: CaseCardProps) {
  return (
    <Link href={`/cases/${data.id}`}>
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-[#1A0F2E]/80 backdrop-blur-md rounded-xl border border-purple-500/20 p-5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all cursor-pointer h-full flex flex-col group"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-space-grotesk font-bold text-white group-hover:text-purple-400 transition-colors">
              {data.title}
            </h3>
            <p className="text-sm text-gray-400">{data.caseNumber}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className={`text-[10px] px-2 py-1 rounded-md border font-medium ${getStatusBgColor(data.status)}`}>
              {data.status}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getPriorityColor(data.priority)}`}>
              {data.priority}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-1">
          {data.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">{data.entityCount || 0} Entities</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <LinkIcon className="w-4 h-4 text-pink-400" />
            <span className="text-gray-300">{data.relationshipCount || 0} Relations</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Updated: {formatDate(data.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>View Case</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
