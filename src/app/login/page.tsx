'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  User,
  AlertCircle,
  Fingerprint,
  Loader2,
  Zap,
  CheckCircle2,
  BadgeCheck,
} from 'lucide-react';
import { DEMO_PASSWORD, DEMO_MFA_CODE } from '@/data/seed';

interface DemoPersona {
  role: string;
  name: string;
  officerId: string;
  badge: string;
  color: string;
}

const DEMO_PERSONAS: DemoPersona[] = [
  {
    role: 'Investigating Officer',
    name: 'Inspector Priya Sharma',
    officerId: 'officer.demo',
    badge: 'LEAD INVESTIGATOR',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    role: 'Super Admin',
    name: 'Admin Kumar',
    officerId: 'admin.demo',
    badge: 'COMMAND CLEARANCE',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    role: 'Forensic Lead',
    name: 'Dr. Kavita Reddy',
    officerId: 'forensic.demo',
    badge: 'FORENSIC LAB',
    color: 'from-emerald-600 to-teal-600',
  },
  {
    role: 'Intelligence Analyst',
    name: 'Analyst Rajan Patel',
    officerId: 'analyst.demo',
    badge: 'ANALYTICS',
    color: 'from-amber-600 to-orange-600',
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [officerId, setOfficerId] = useState('officer.demo');
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [mfaCode, setMfaCode] = useState(DEMO_MFA_CODE);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1: creds, 2: mfa, 3: validating
  const [selectedPersona, setSelectedPersona] = useState('officer.demo');

  const handleSelectPersona = (p: DemoPersona) => {
    setSelectedPersona(p.officerId);
    setOfficerId(p.officerId);
    setPassword(DEMO_PASSWORD);
    setMfaCode(DEMO_MFA_CODE);
    setError('');
  };

  const handleDirectDemoLogin = async (targetId: string = 'officer.demo') => {
    setError('');
    setIsLoading(true);
    setLoginStep(3);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officerId: targetId,
          password: DEMO_PASSWORD,
          mfaCode: DEMO_MFA_CODE,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTimeout(() => {
          login(data.data);
        }, 400);
      } else {
        setError(data.message || 'Authentication failed. Please check credentials.');
        setLoginStep(1);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Direct login error:', err);
      setError('An error occurred during authentication. Resetting demo credentials...');
      setLoginStep(1);
      setIsLoading(false);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim() || !password.trim()) {
      setError('Officer ID and Access Key are required.');
      return;
    }
    setError('');
    // Automatically guarantee MFA code is populated for demo experience
    if (!mfaCode) {
      setMfaCode(DEMO_MFA_CODE);
    }
    setLoginStep(2);
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveMfa = mfaCode.trim();
    if (!effectiveMfa) {
      setError('MFA verification code is required (Authorized Demo Code: 123456).');
      return;
    }

    setError('');
    setIsLoading(true);
    setLoginStep(3);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          officerId: officerId.trim(),
          password: password.trim(),
          mfaCode: effectiveMfa,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setTimeout(() => {
          login(data.data);
        }, 400);
      } else {
        setError(data.message || 'Authentication failed. Please check credentials.');
        setLoginStep(1);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Manual login error:', err);
      setError('An error occurred during authentication.');
      setLoginStep(1);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0716] flex flex-col items-center justify-center p-4 font-sans text-gray-300 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-purple-900/20 blur-[130px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-900/20 blur-[130px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04]"></div>
      </div>

      <div className="w-full max-w-lg z-10">
        {/* Branding header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center p-3.5 bg-purple-500/10 rounded-2xl border border-purple-500/30 mb-4 shadow-[0_0_35px_rgba(168,85,247,0.2)]"
          >
            <ShieldCheck size={42} className="text-purple-400" />
          </motion.div>
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl md:text-3xl font-space-grotesk font-bold text-white tracking-wider mb-2"
          >
            SENTINEL INTELLIGENCE ACCESS
          </motion.h1>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-purple-300/80 font-medium tracking-wide uppercase text-xs"
          >
            Secure Criminal Network & Document Intelligence Platform (PS189)
          </motion.p>
        </div>

        {/* Main login card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#1A0F2E]/85 backdrop-blur-xl p-7 md:p-8 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden"
        >
          {/* Top accent border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500"></div>

          {/* Quick Demo Hero Button */}
          <div className="mb-6">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDirectDemoLogin('officer.demo')}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-5 rounded-xl transition-all tracking-wider text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              <Zap size={18} className="text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>⚡ ONE-CLICK DEMO ACCESS (OFFICER)</span>
            </button>
            <p className="text-[11px] text-center text-gray-400 mt-1.5">
              Instantly logs into command center with Inspector Priya Sharma&apos;s credentials
            </p>
          </div>

          <div className="relative flex py-2 items-center mb-5">
            <div className="flex-grow border-t border-purple-500/20"></div>
            <span className="flex-shrink mx-3 text-[11px] text-gray-500 font-mono tracking-wider uppercase">
              Or Select Demo Persona
            </span>
            <div className="flex-grow border-t border-purple-500/20"></div>
          </div>

          {/* Persona selector pills */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {DEMO_PERSONAS.map((p) => {
              const isSelected = selectedPersona === p.officerId;
              return (
                <button
                  key={p.officerId}
                  type="button"
                  onClick={() => handleSelectPersona(p)}
                  className={`flex flex-col text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'bg-black/30 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[11px] font-bold text-white truncate">{p.role}</span>
                    {isSelected && <CheckCircle2 size={12} className="text-purple-400 shrink-0" />}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono truncate">{p.officerId}</span>
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-start space-x-2 text-xs text-red-300">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
              <div className="flex-1">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => handleDirectDemoLogin('officer.demo')}
                  className="block mt-1 text-purple-300 underline font-semibold hover:text-purple-200"
                >
                  Click here to force 1-click login as officer.demo
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {loginStep === 1 && (
              <motion.form
                key="step1"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                onSubmit={handleNextStep}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                    Officer ID / Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      value={officerId}
                      onChange={(e) => setOfficerId(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-purple-500/30 rounded-xl bg-[#0B0716] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-mono"
                      placeholder="officer.demo"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">
                    Access Key / Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <Lock size={16} />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-purple-500/30 rounded-xl bg-[#0B0716] text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all font-mono"
                      placeholder="Demo@12345"
                      required
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col space-y-2">
                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
                  >
                    PROCEED TO TWO-FACTOR VERIFICATION →
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDirectDemoLogin(officerId)}
                    className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-2.5 px-4 rounded-xl transition-colors text-xs border border-white/10 cursor-pointer"
                  >
                    Direct Login as {officerId || 'officer.demo'}
                  </button>
                </div>
              </motion.form>
            )}

            {loginStep === 2 && (
              <motion.form
                key="step2"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                onSubmit={handleManualLogin}
                className="space-y-5 text-center"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400 relative">
                    <Fingerprint size={40} className="animate-pulse" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">Two-Factor Authentication</h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Authorized Demo Key: <span className="font-mono text-purple-400 font-bold">123456</span>
                  </p>

                  <div className="flex justify-center mb-3">
                    <input
                      type="text"
                      maxLength={6}
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value.replace(/[^0-9]/g, ''))}
                      className="block w-48 text-center text-2xl tracking-[0.4em] py-2 border border-purple-500/40 rounded-xl bg-[#0B0716] text-white placeholder-gray-600 focus:outline-none focus:border-purple-400 font-mono"
                      placeholder="123456"
                      autoFocus
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setMfaCode(DEMO_MFA_CODE)}
                    className="text-[11px] text-purple-400 hover:text-purple-300 underline underline-offset-4"
                  >
                    Reset Demo Code (123456)
                  </button>
                </div>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setLoginStep(1)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium py-2.5 px-4 rounded-xl transition-colors text-xs border border-white/10 cursor-pointer"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors tracking-widest text-xs uppercase shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
                  >
                    VERIFY & ENTER
                  </button>
                </div>
              </motion.form>
            )}

            {loginStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <div className="relative">
                  <Loader2 size={54} className="text-purple-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck size={22} className="text-purple-300" />
                  </div>
                </div>

                <div className="text-center space-y-1.5">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">
                    ESTABLISHING SECURE SESSION
                  </h3>
                  <div className="flex flex-col space-y-0.5 text-[11px] text-purple-300/80 font-mono">
                    <span className="animate-pulse">Validating cryptographic credentials...</span>
                    <span className="animate-pulse delay-100">Granting clearance for {officerId}...</span>
                    <span className="animate-pulse delay-200">Opening command console...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Credentials Helper Callout */}
          <div className="mt-6 pt-4 border-t border-purple-500/20 flex items-center justify-between text-[11px] text-gray-400 font-mono">
            <div className="flex items-center space-x-1.5">
              <BadgeCheck size={14} className="text-emerald-400 shrink-0" />
              <span>Demo Creds:</span>
            </div>
            <div className="text-right text-gray-300">
              <span className="text-purple-400 font-bold">officer.demo</span> /{' '}
              <span className="text-purple-400 font-bold">Demo@12345</span> /{' '}
              <span className="text-purple-400 font-bold">123456</span>
            </div>
          </div>
        </motion.div>

        {/* Security disclaimer */}
        <div className="mt-6 text-center text-[10px] text-gray-500 space-y-1 font-mono tracking-wider">
          <p>AUTHORIZED LAW ENFORCEMENT & INVESTIGATION DEMO ENVIRONMENT</p>
          <p>PROTECTED BY RBAC & AUDIT LOGGING PROTOCOL</p>
        </div>
      </div>
    </div>
  );
}
