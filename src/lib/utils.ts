import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  });
}

export function getStatusColor(status: string): string {
  switch (status.toUpperCase()) {
    case 'ACTIVE': case 'VERIFIED': case 'ALLOWED': case 'NORMAL': case 'MATCH': case 'PROTECTED': case 'RESOLVED':
      return 'text-green-400';
    case 'HIGH': case 'CRITICAL': case 'DENIED': case 'SUSPICIOUS': case 'COMPROMISED':
      return 'text-red-400';
    case 'MEDIUM': case 'WARNING': case 'REVIEW': case 'REVIEW_REQUIRED': case 'UNDER_REVIEW': case 'PROCESSING':
      return 'text-amber-400';
    case 'LOW': case 'INFO': case 'PENDING': case 'MONITORING':
      return 'text-blue-400';
    case 'CLOSED': case 'ARCHIVED': case 'CLEARED':
      return 'text-gray-400';
    default:
      return 'text-gray-300';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status.toUpperCase()) {
    case 'ACTIVE': case 'VERIFIED': case 'ALLOWED': case 'NORMAL': case 'PROTECTED':
      return 'bg-green-500/10 border-green-500/30';
    case 'HIGH': case 'CRITICAL': case 'DENIED': case 'SUSPICIOUS':
      return 'bg-red-500/10 border-red-500/30';
    case 'MEDIUM': case 'WARNING': case 'REVIEW': case 'UNDER_REVIEW':
      return 'bg-amber-500/10 border-amber-500/30';
    case 'LOW': case 'INFO': case 'PENDING':
      return 'bg-blue-500/10 border-blue-500/30';
    default:
      return 'bg-gray-500/10 border-gray-500/30';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'CRITICAL': return 'text-red-400 bg-red-500/10 border-red-500/30';
    case 'HIGH': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    case 'MEDIUM': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    case 'LOW': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
  }
}

export function getEntityTypeColor(type: string): string {
  switch (type) {
    case 'PERSON': return '#A855F7';
    case 'CASE': return '#3B82F6';
    case 'VEHICLE': return '#F59E0B';
    case 'DOCUMENT': return '#10B981';
    case 'LOCATION': return '#EF4444';
    case 'IDENTIFIER': return '#8B5CF6';
    case 'ORGANIZATION': return '#EC4899';
    case 'EVENT': return '#06B6D4';
    default: return '#6B7280';
  }
}

export function getEntityTypeBg(type: string): string {
  switch (type) {
    case 'PERSON': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'CASE': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'VEHICLE': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'DOCUMENT': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'LOCATION': return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'IDENTIFIER': return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
    case 'ORGANIZATION': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
    case 'EVENT': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
