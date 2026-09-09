'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import type { AuthUser } from '@/types';
import { Search, Bell, LogOut, ChevronDown, User, Briefcase, Car, FileText, MapPin, Hash, X } from 'lucide-react';
import { getRoleLabel, getRoleColor } from '@/lib/auth/rbac';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TopBarProps {
  user: AuthUser;
}

interface SearchResultItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  link: string;
}

export default function TopBar({ user: initialUser }: TopBarProps) {
  const { user: contextUser, logout } = useAuth();
  const router = useRouter();
  const user = contextUser || initialUser;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'PERSON': return <User className="w-3.5 h-3.5 text-purple-400" />;
      case 'CASE': return <Briefcase className="w-3.5 h-3.5 text-blue-400" />;
      case 'VEHICLE': return <Car className="w-3.5 h-3.5 text-amber-400" />;
      case 'DOCUMENT': return <FileText className="w-3.5 h-3.5 text-green-400" />;
      case 'LOCATION': return <MapPin className="w-3.5 h-3.5 text-red-400" />;
      default: return <Hash className="w-3.5 h-3.5 text-gray-400" />;
    }
  };

  return (
    <header className="h-16 bg-[#1A0F2E] border-b border-purple-500/20 flex items-center justify-between px-6 z-30 shrink-0">
      <div className="flex items-center flex-1 space-x-6">
        {/* Interactive Global Search */}
        <div className="relative w-96 max-w-md hidden md:block" ref={searchRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setShowDropdown(true)}
            placeholder="Search persons, cases, vehicles, documents..."
            className="block w-full pl-10 pr-10 py-2 border border-purple-500/30 rounded-lg leading-5 bg-[#0B0716]/60 text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-[#0B0716] focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/60 sm:text-xs transition-all font-sans"
          />
          {query ? (
            <button 
              onClick={() => { setQuery(''); setResults([]); setShowDropdown(false); }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-[10px] border border-gray-700 rounded px-1.5 py-0.5 font-mono">⌘K</span>
            </div>
          )}

          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1A0F2E] border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-xs text-gray-400 text-center font-mono">Searching across records...</div>
              ) : results.length > 0 ? (
                <div className="py-2 divide-y divide-gray-800">
                  {results.map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      onClick={() => {
                        setShowDropdown(false);
                        setQuery('');
                        router.push(item.link);
                      }}
                      className="px-4 py-2.5 hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-black/40 flex items-center justify-center shrink-0">
                          {getResultIcon(item.type)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{item.title}</div>
                          <div className="text-[11px] text-gray-400">{item.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-xs text-gray-400 text-center">
                  No records matching &quot;{query}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Case Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 uppercase font-mono">Active Case:</span>
          <Link 
            href="/cases/C-001"
            className="flex items-center space-x-2 text-xs text-gray-300 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-purple-500/20"
          >
            <span className="font-bold text-purple-300 font-mono">Operation Trishul (2026-041)</span>
            <ChevronDown size={12} className="text-gray-400" />
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-4 border-r border-gray-800 pr-5">
          <div className="flex items-center space-x-2 text-[11px]">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 font-mono font-bold tracking-wider">PROTECTED</span>
          </div>

          <Link 
            href="/alerts"
            className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="View Alerts"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-[#1A0F2E]"></span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-white">{user.name}</span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full mt-0.5 font-mono", getRoleColor(user.role))}>
              {getRoleLabel(user.role)}
            </span>
          </div>
          
          <div className="h-8 w-8 rounded-lg bg-purple-900/60 flex items-center justify-center border border-purple-500/50 text-purple-200 font-bold uppercase text-xs">
            {user.name.substring(0, 2)}
          </div>

          <button 
            onClick={() => logout()}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-1"
            title="Secure Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
