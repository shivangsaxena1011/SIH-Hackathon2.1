'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import type { AuditLog } from '@/types';

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/audit');
        const data = await res.json();
        setLogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(term) ||
      log.resource.toLowerCase().includes(term) ||
      (log.userName && log.userName.toLowerCase().includes(term)) ||
      log.userId.toLowerCase().includes(term) ||
      (log.caseId && log.caseId.toLowerCase().includes(term))
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">AUDIT LOG CENTER</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Immutable, tamper-evident logging of all system access and actions.
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..." 
              className="pl-9 pr-4 py-2 bg-[#1A0F2E] border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500 w-64"
            />
          </div>
          <button className="px-4 py-2 bg-[#1A0F2E] border border-gray-800 rounded-lg text-gray-300 text-sm flex items-center hover:bg-gray-800 transition-colors">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading audit trail...</div>
      ) : (
        <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-800">
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Timestamp</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Resource</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Result</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">IP/Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-800/20 transition-colors">
                  <td className="p-4 text-xs text-gray-400 font-mono whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="p-4 text-sm text-gray-300 font-medium">
                    {log.userName || log.userId}
                  </td>
                  <td className="p-4 text-xs text-gray-500">
                    {log.userRole || 'N/A'}
                  </td>
                  <td className="p-4 text-sm text-purple-400 font-mono">
                    {log.action}
                  </td>
                  <td className="p-4 text-sm text-gray-300">
                    {log.resource} {log.resourceId ? `(${log.resourceId})` : ''}
                    {log.caseId && <div className="text-xs text-gray-500 mt-1">Case: {log.caseId}</div>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${
                      log.result === 'ALLOWED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-mono">
                    {log.ipAddress}<br/>
                    {log.sessionId ? `${log.sessionId.substring(0,8)}...` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
