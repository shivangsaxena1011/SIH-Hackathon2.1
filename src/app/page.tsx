'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Share2, FileText, Clock, MapPin, Brain, ShieldAlert, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0716] text-gray-300 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-[#0B0716]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="text-purple-500" size={28} />
            <span className="font-space-grotesk font-bold text-white tracking-widest text-xl">SENTINEL</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest">
              Demo Environment
            </div>
            <Link 
              href="/login"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              System Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-space-grotesk font-bold text-white tracking-tight mb-6 leading-tight">
              AI-POWERED <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                CRIMINAL INTELLIGENCE
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Turn fragmented investigation data into explainable connections. 
            A comprehensive command center for law enforcement to visualize networks, 
            verify documents, and uncover hidden intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] group"
              >
                <span>START INVESTIGATION DEMO</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center space-x-2 px-6 py-4 bg-[#1A0F2E] hover:bg-white/10 text-gray-200 font-semibold rounded-xl text-lg border border-purple-500/30 transition-all"
              >
                <span>Guided Presentation (11 Steps)</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-[#1A0F2E]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-space-grotesk font-bold text-white mb-4">Core Intelligence Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Advanced modules designed to accelerate investigations and provide actionable, explainable insights.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Share2} 
              title="Network Intelligence" 
              description="Visualize complex relationships between suspects, vehicles, organizations, and locations across multiple active cases."
              color="text-blue-400"
              bgColor="bg-blue-500/10"
              borderColor="border-blue-500/20"
            />
            <FeatureCard 
              icon={FileText} 
              title="Identity & Document Intelligence" 
              description="AI-driven OCR and forensic analysis to detect document tampering, synthetic elements, and identity anomalies."
              color="text-emerald-400"
              bgColor="bg-emerald-500/10"
              borderColor="border-emerald-500/20"
            />
            <FeatureCard 
              icon={Clock} 
              title="Timeline Analysis" 
              description="Chronological reconstruction of events across disparate data sources to identify patterns and sequence of activities."
              color="text-purple-400"
              bgColor="bg-purple-500/10"
              borderColor="border-purple-500/20"
            />
            <FeatureCard 
              icon={MapPin} 
              title="Geospatial Intelligence" 
              description="Map-based visualization of incidents, last known locations, and movement patterns based on ANPR and surveillance data."
              color="text-pink-400"
              bgColor="bg-pink-500/10"
              borderColor="border-pink-500/20"
            />
            <FeatureCard 
              icon={Brain} 
              title="Explainable AI" 
              description="Generates confidence scores and clear, human-readable explanations for all algorithmic inferences and risk alerts."
              color="text-amber-400"
              bgColor="bg-amber-500/10"
              borderColor="border-amber-500/20"
            />
            <FeatureCard 
              icon={ShieldAlert} 
              title="Security & Audit" 
              description="Strict Role-Based Access Control (RBAC) with immutable audit logging ensuring compliance and data integrity."
              color="text-red-400"
              bgColor="bg-red-500/10"
              borderColor="border-red-500/20"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-2">SIH Hackathon Prototype • Criminal Intelligence Platform</p>
          <p className="text-xs">
            NOTICE: This is a demo environment. All data, cases, and entities presented are synthetic and generated for demonstration purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, bgColor, borderColor }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "p-6 rounded-2xl bg-[#0B0716] border transition-all duration-300",
        borderColor,
        "hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
      )}
    >
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", bgColor)}>
        <Icon size={24} className={color} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
