'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, User, Key, AlertCircle, Fingerprint, Loader2 } from 'lucide-react';
import { DEMO_PASSWORD, DEMO_MFA_CODE } from '@/data/seed';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const { login } = useAuth();
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1: creds, 2: mfa, 3: validating

  const handleDemoFill = () => {
    setOfficerId('officer.demo');
    setPassword(DEMO_PASSWORD);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId || !password) {
      setError('Officer ID and Password are required.');
      return;
    }
    setError('');
    setLoginStep(2);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaCode) {
      setError('MFA Code is required.');
      return;
    }

    setError('');
    setIsLoading(true);
    setLoginStep(3);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officerId, password, mfaCode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Add a slight delay for command-center effect
        setTimeout(() => {
          login(data.data);
        }, 1500);
      } else {
        setError(data.message || 'Authentication failed');
        setLoginStep(1);
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during authentication.');
      setLoginStep(1);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0716] flex flex-col items-center justify-center p-4 font-sans text-gray-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] bg-center opacity-[0.02]"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-2xl border border-purple-500/30 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >
            <ShieldCheck size={48} className="text-purple-400" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-space-grotesk font-bold text-white tracking-widest mb-2"
          >
            SECURE INTELLIGENCE ACCESS
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 font-medium tracking-wide uppercase text-sm"
          >
            Authorized Investigation Environment
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#1A0F2E]/80 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

          <div className="mb-6 flex items-center justify-center space-x-2 bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest">
            <AlertCircle size={14} />
            <span>DEMO ENVIRONMENT</span>
          </div>

          <AnimatePresence mode="wait">
            {loginStep === 1 && (
              <motion.form
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleNextStep}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Officer ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-purple-500/30 rounded-xl bg-[#0B0716] text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      placeholder="Enter ID"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                    Access Key
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-purple-500/30 rounded-xl bg-[#0B0716] text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      placeholder="Enter Access Key"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 flex items-start">
                    <AlertCircle size={16} className="mt-0.5 mr-2 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors tracking-widest text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                >
                  AUTHENTICATE
                </button>
                
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="w-full mt-4 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 px-4 rounded-xl transition-colors text-sm border border-white/10"
                >
                  Use Demo Account
                </button>
              </motion.form>
            )}

            {loginStep === 2 && (
              <motion.form
                key="step2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                onSubmit={handleLogin}
                className="space-y-6 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400 relative">
                    <Fingerprint size={48} className="animate-pulse" />
                    {/* Scanner line effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-purple-400 opacity-50 shadow-[0_0_10px_#A855F7] animate-[scan_2s_ease-in-out_infinite]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400 mb-6">Enter the 6-digit code sent to your secure device.</p>
                  
                  <div className="flex justify-center space-x-2 mb-6">
                    <input
                      type="text"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value.replace(/[^0-9]/g, ''))}
                      className="block w-full max-w-[200px] text-center text-2xl tracking-[0.5em] py-3 border border-purple-500/30 rounded-xl bg-[#0B0716] text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono"
                      placeholder="------"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 flex items-start text-left mb-4">
                    <AlertCircle size={16} className="mt-0.5 mr-2 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setLoginStep(1)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-3 px-4 rounded-xl transition-colors text-sm border border-white/10"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors tracking-widest text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  >
                    VERIFY
                  </button>
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setMfaCode(DEMO_MFA_CODE)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4"
                  >
                    Fill Demo MFA Code (123456)
                  </button>
                </div>
              </motion.form>
            )}

            {loginStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-6"
              >
                <div className="relative">
                  <Loader2 size={64} className="text-purple-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck size={24} className="text-purple-300" />
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-widest">ESTABLISHING SECURE CONNECTION</h3>
                  <div className="flex flex-col space-y-1 text-xs text-purple-400 font-mono">
                    <span className="animate-pulse">Validating credentials...</span>
                    <span className="animate-pulse delay-150">Verifying security clearance...</span>
                    <span className="animate-pulse delay-300">Decrypting workspace...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center text-xs text-gray-500 space-y-2 font-mono"
        >
          <p>WARNING: THIS SYSTEM IS FOR AUTHORIZED PERSONNEL ONLY.</p>
          <p>ALL ACTIVITIES ARE LOGGED AND MONITORED.</p>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(48px); }
          100% { transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
