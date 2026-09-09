'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Database, RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [resetting, setResetting] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = async () => {
    setResetting(true);
    setMessage('');
    setShowConfirm(false);
    try {
      const res = await fetch('/api/demo/reset', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setMessage('DEMO ENVIRONMENT RESTORED — Redirecting to Dashboard...');
        setTimeout(() => {
          router.push('/dashboard?reset=true');
        }, 1000);
      } else {
        setMessage('Failed to reset demo data.');
      }
    } catch (e) {
      setMessage('Error connecting to reset API.');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">SYSTEM SETTINGS</h1>
          <p className="text-gray-400 mt-1 text-sm flex items-center">
             <SettingsIcon className="w-4 h-4 mr-2 text-purple-500" />
             Platform configuration and demo management.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-amber-300">DEMO ENVIRONMENT • SYNTHETIC DATA</span>
        </div>
      </div>

      <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Database className="w-5 h-5 mr-2 text-purple-400" />
            Demo Data & Scenario Management
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Manage the synthetic dataset used for the SIH evaluation. Resetting will restore all cases, persons, vehicles, and audit state to their canonical default values.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowConfirm(true)}
              disabled={resetting}
              className="flex items-center px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${resetting ? 'animate-spin' : ''}`} />
              {resetting ? 'Resetting Data...' : 'Reset Demo Dataset'}
            </button>
            <button
              onClick={handleReset}
              disabled={resetting}
              className="flex items-center px-4 py-2.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-lg transition-colors text-sm font-medium"
            >
              <ShieldCheck className="w-4 h-4 mr-2 text-purple-400" />
              Load Primary Scenario (Operation Trishul)
            </button>
          </div>

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="mt-4 p-4 bg-black/60 border border-red-500/50 rounded-xl space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-white">Confirm Demo Data Reset</p>
                  <p className="text-gray-400 mt-1">
                    This will re-initialize runtime activity logs, clear temporary document analyses, and reset all 9 cases and 16 person profiles to default seed state.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-500"
                >
                  Yes, Reset Everything
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start text-sm text-green-300">
              <CheckCircle2 className="w-4 h-4 mr-2 text-green-400 mt-0.5 shrink-0" />
              <span>{message}</span>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">UI & Security Preferences</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-800/50">
              <div>
                <div className="font-medium text-gray-200">Dark Command Center Theme</div>
                <div className="text-xs text-gray-500">Optimized for low-light operations room environments</div>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/30">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-gray-800/50">
              <div>
                <div className="font-medium text-gray-200">Simulated ANPR / Telecom Streaming</div>
                <div className="text-xs text-gray-500">Synthetic vehicle logs and cell-tower identifier correlation</div>
              </div>
              <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/30">
                ENABLED (DEMO)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
