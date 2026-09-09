'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, AlertTriangle, Info, ArrowRight, Eye, Shield, CheckCircle2, Network, FileText, X } from 'lucide-react';
import Link from 'next/link';
import type { Alert } from '@/types';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('/api/alerts');
        const data = await res.json();
        setAlerts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'HIGH': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'MEDIUM': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ACKNOWLEDGED' } : a));
    if (selectedAlert?.id === alertId) {
      setSelectedAlert(prev => prev ? { ...prev, status: 'ACKNOWLEDGED' } : null);
    }

    try {
      await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'officer.demo',
          userName: 'Inspector Priya Sharma',
          userRole: 'INVESTIGATING_OFFICER',
          action: 'ACKNOWLEDGE_ALERT',
          resource: 'Alert Center',
          resourceId: alertId,
          result: 'ALLOWED',
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const filteredAlerts = filter === 'ALL' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">ALERT CENTER</h1>
          <p className="text-gray-400 mt-1 flex items-center text-sm">
            <Shield className="w-4 h-4 mr-2 text-purple-500" />
            Alerts are investigative leads, not criminal guilt determinations.
          </p>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors ${
                filter === f 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' 
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12 font-mono text-sm">Loading intelligence alerts...</div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              key={alert.id}
              className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-5 hover:border-purple-500/30 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center space-x-3 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-purple-400 uppercase font-mono font-medium">{alert.category}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400 font-mono">{new Date(alert.createdAt).toLocaleString()}</span>
                  {alert.status === 'ACKNOWLEDGED' && (
                    <span className="text-[10px] bg-green-500/10 border border-green-500/30 text-green-400 px-1.5 py-0.5 rounded">
                      ACKNOWLEDGED
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">{alert.title}</h3>
                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">{alert.description}</p>
                {alert.caseId && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs bg-black/40 text-purple-300 px-2 py-0.5 rounded border border-purple-500/20 font-mono">
                      Case Link: {alert.caseId}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                <Link
                  href={alert.caseId ? `/cases/${alert.caseId}` : '/cases'}
                  className="flex-1 md:flex-none px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center shadow-sm"
                >
                  Investigate Case <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="flex-1 md:flex-none px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium rounded-lg transition-colors border border-gray-700 flex items-center justify-center"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" /> View Details
                </button>
              </div>
            </motion.div>
          ))}
          {filteredAlerts.length === 0 && (
            <div className="text-center text-gray-500 py-12 border border-dashed border-gray-800 rounded-xl">
              No alerts match the selected priority filter.
            </div>
          )}
        </div>
      )}

      {/* Alert Detail Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A0F2E] border border-purple-500/40 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-start border-b border-gray-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getSeverityColor(selectedAlert.severity)}`}>
                      {selectedAlert.severity}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{selectedAlert.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedAlert.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-mono mb-1">Alert Description</p>
                  <p className="text-gray-300 text-xs leading-relaxed bg-black/40 p-3 rounded-lg border border-gray-800">
                    {selectedAlert.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-black/30 rounded-lg border border-gray-800">
                    <span className="text-gray-500 block mb-1">Associated Case</span>
                    <span className="text-purple-400 font-mono font-medium">{selectedAlert.caseId || 'Multi-Case'}</span>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg border border-gray-800">
                    <span className="text-gray-500 block mb-1">Timestamp</span>
                    <span className="text-gray-300 font-mono">{new Date(selectedAlert.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                <div className="flex gap-2">
                  <Link
                    href="/network"
                    onClick={() => setSelectedAlert(null)}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition flex items-center gap-1 border border-gray-700"
                  >
                    <Network className="w-3.5 h-3.5 text-purple-400" /> Graph
                  </Link>
                  <Link
                    href="/evidence"
                    onClick={() => setSelectedAlert(null)}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition flex items-center gap-1 border border-gray-700"
                  >
                    <FileText className="w-3.5 h-3.5 text-green-400" /> Evidence
                  </Link>
                </div>

                <div className="flex gap-2">
                  {selectedAlert.status !== 'ACKNOWLEDGED' && (
                    <button
                      onClick={() => handleAcknowledge(selectedAlert.id)}
                      className="px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-300 text-xs rounded-lg border border-green-500/40 transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledge
                    </button>
                  )}
                  <Link
                    href={selectedAlert.caseId ? `/cases/${selectedAlert.caseId}` : '/cases'}
                    onClick={() => setSelectedAlert(null)}
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg transition"
                  >
                    Open Case
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
