'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { hasPermission } from '@/lib/auth/rbac';
import type { UserRole } from '@/types';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Car,
  Fingerprint,
  FileText,
  Share2,
  Clock,
  MapPin,
  Bell,
  Brain,
  ShieldCheck,
  ScrollText,
  Settings,
  ChevronLeft,
  ChevronRight,
  GitMerge,
  Bot,
  Shield,
  Play
} from 'lucide-react';

interface SidebarProps {
  userRole: UserRole;
}

const NAV_ITEMS = [
  { label: 'Command Center', icon: LayoutDashboard, href: '/dashboard', resource: 'dashboard' },
  { label: 'Investigation Cases', icon: Briefcase, href: '/cases', resource: 'cases' },
  { label: 'Persons Registry', icon: Users, href: '/persons', resource: 'persons' },
  { label: 'ANPR Vehicles', icon: Car, href: '/vehicles', resource: 'vehicles' },
  { label: 'Identifiers', icon: Fingerprint, href: '/identifiers', resource: 'identifiers' },
  { label: 'Document Intelligence', icon: FileText, href: '/documents', resource: 'documents' },
  { label: 'Knowledge Graph', icon: Share2, href: '/network', resource: 'network' },
  { label: 'Cross-Case Analysis', icon: GitMerge, href: '/cross-case', resource: 'insights' },
  { label: 'Timeline Analysis', icon: Clock, href: '/timeline', resource: 'timeline' },
  { label: 'Intelligence Map', icon: MapPin, href: '/map', resource: 'map' },
  { label: 'Alerts', icon: Bell, href: '/alerts', resource: 'alerts' },
  { label: 'AI Insights Engine', icon: Brain, href: '/insights', resource: 'insights' },
  { label: 'NOVA AI Assistant', icon: Bot, href: '/assistant', resource: 'assistant' },
  { label: 'Evidence Registry', icon: ShieldCheck, href: '/evidence', resource: 'evidence' },
  { label: 'Audit Logs', icon: ScrollText, href: '/audit', resource: 'audit' },
  { label: 'Security & Trust', icon: Shield, href: '/security', resource: 'security' },
  { label: 'Guided Demo Mode', icon: Play, href: '/demo', resource: 'dashboard', highlight: true },
  { label: 'Settings', icon: Settings, href: '/settings', resource: 'settings' },
];

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-[#1A0F2E] border-r border-purple-500/20 transition-all duration-300 relative z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-purple-500/20">
        {!isCollapsed ? (
          <Link href="/dashboard" className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0 shadow-md shadow-purple-600/30">
              <ShieldCheck className="text-white shrink-0" size={18} />
            </div>
            <div>
              <span className="font-space font-bold text-white tracking-wider block text-sm leading-tight">
                SENTINEL
              </span>
              <span className="text-[10px] text-purple-400 font-mono tracking-tighter">
                CRIMINAL INTEL
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/dashboard" className="flex justify-center w-full">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-white shrink-0" size={18} />
            </div>
          </Link>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
        <ul className="space-y-1 px-2">
          {NAV_ITEMS.map((item) => {
            const isAccessible = hasPermission(userRole, item.resource, 'read');
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            if (!isAccessible) {
              return (
                <li key={item.label}>
                  <div
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg opacity-35 cursor-not-allowed",
                      isCollapsed && "justify-center"
                    )}
                    title={`${item.label} (Access Restricted for ${userRole})`}
                  >
                    <item.icon size={18} className="shrink-0 text-gray-500" />
                    {!isCollapsed && (
                      <span className="ml-3 text-xs font-medium text-gray-500 truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-all group relative",
                    isActive
                      ? "bg-purple-600/25 text-purple-300 font-semibold border border-purple-500/30 shadow-sm"
                      : item.highlight
                        ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-pink-300 border border-pink-500/30 hover:border-pink-500/60"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      "shrink-0 transition-colors",
                      isActive 
                        ? "text-purple-400" 
                        : item.highlight 
                          ? "text-pink-400 animate-pulse" 
                          : "text-gray-400 group-hover:text-gray-200"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="ml-3 text-xs font-medium truncate">
                      {item.label}
                    </span>
                  )}
                  {item.highlight && !isCollapsed && (
                    <span className="ml-auto text-[9px] font-mono bg-pink-500/30 text-pink-200 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                      DEMO
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-purple-500/20 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center w-full text-xs font-medium gap-2"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse Menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
