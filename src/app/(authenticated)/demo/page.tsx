'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Play, ArrowRight, CheckCircle2, Shield, Sparkles, 
  FileText, Network, GitMerge, Calendar, MapPin, Brain, ShieldCheck, ScrollText, RotateCcw
} from 'lucide-react';

interface DemoStep {
  step: number;
  title: string;
  subtitle: string;
  desc: string;
  link: string;
  icon: React.ReactNode;
  actionText: string;
  keyObservation: string;
}

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const demoSteps: DemoStep[] = [
    {
      step: 1,
      title: 'Open Primary Investigation',
      subtitle: 'Case #2026-041 (Operation Trishul)',
      desc: 'Review the active narcotics docket, high priority classification, and 12 linked entities.',
      link: '/cases/C-001',
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      actionText: 'Open Case #2026-041 Workspace',
      keyObservation: 'Notice the 12 linked entities, 7 relationships, and the high-priority review status.'
    },
    {
      step: 2,
      title: 'Inspect Suspect Identity Document',
      subtitle: 'Document DOC-2026-041-009',
      desc: 'Open the evidentiary identity card submitted under Operation Trishul.',
      link: '/documents/D-001',
      icon: <FileText className="w-5 h-5 text-purple-400" />,
      actionText: 'Open Document DOC-2026-041-009',
      keyObservation: 'Inspect the document metadata, cryptographic SHA-256 hash, and file size.'
    },
    {
      step: 3,
      title: 'Run Document OCR & Forensics',
      subtitle: 'Multi-Modal Forensic Pre-Screening',
      desc: 'Simulate document OCR extraction, MRZ decoding, and visual integrity verification.',
      link: '/documents/D-001',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      actionText: 'Review Forensic Signals',
      keyObservation: 'OCR passes at 96%, but visual integrity flags photo region manipulation (Score: 74% / SUSPICIOUS).'
    },
    {
      step: 4,
      title: 'Resolve Identity & Match Signals',
      subtitle: 'Candidate Scoring & Linking',
      desc: 'Correlate extracted document fields against synthetic records with explicit disclaimers.',
      link: '/documents/D-001',
      icon: <CheckCircle2 className="w-5 h-5 text-green-400" />,
      actionText: 'Confirm Entity Resolution',
      keyObservation: 'Rahul Mehra matches at 94% confidence. Clicking RESOLVE ENTITY links the document directly into the knowledge graph.'
    },
    {
      step: 5,
      title: 'Explore Knowledge Graph',
      subtitle: 'Criminal Intelligence Network',
      desc: 'Visualize entity relationships in the interactive React Flow knowledge graph.',
      link: '/network',
      icon: <Network className="w-5 h-5 text-purple-400" />,
      actionText: 'Open Knowledge Graph',
      keyObservation: 'Rahul Mehra appears as the central network hub (7 direct links) connected to Vehicle MP09-DEMO-4821 and associate Arjun Verma.'
    },
    {
      step: 6,
      title: 'Highlight Cross-Case Connections',
      subtitle: 'Multi-Docket Overlap Matrix',
      desc: 'Examine connections linking Case #2026-041, Case #2026-017, and Case #2025-089.',
      link: '/cross-case',
      icon: <GitMerge className="w-5 h-5 text-pink-400" />,
      actionText: 'View Cross-Case Matrix',
      keyObservation: '2 high-value cross-case connections revealed: same subject and vehicle appear across separate investigations.'
    },
    {
      step: 7,
      title: 'Reconstruct Event Timeline',
      subtitle: 'Chronological Sequence of Movements',
      desc: 'Track timestamps from 09:40 to 12:10 across Bhopal surveillance corridors.',
      link: '/timeline',
      icon: <Calendar className="w-5 h-5 text-cyan-400" />,
      actionText: 'View Investigation Timeline',
      keyObservation: 'Chronological transit: 09:40 (Bhopal Central) → 10:15 (Checkpoint Alpha) → 11:05 (Industrial Sector 7) → 12:10 (Lake Road).'
    },
    {
      step: 8,
      title: 'Inspect Geospatial Intelligence Map',
      subtitle: 'Synthetic Surveillance Coordinates',
      desc: 'Trace movement routes on the interactive vector intelligence map.',
      link: '/map',
      icon: <MapPin className="w-5 h-5 text-red-400" />,
      actionText: 'Launch Vector Intelligence Map',
      keyObservation: 'Click camera cluster and ANPR checkpoint markers to view associated timestamps and confidence ratings.'
    },
    {
      step: 9,
      title: 'Review Explainable AI Insights',
      subtitle: 'Investigation Engine with Rationale',
      desc: 'Inspect deterministic rule-based insights with "Why This Insight?" explainability.',
      link: '/insights',
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      actionText: 'Open AI Investigation Insights',
      keyObservation: 'Insight #001 provides 4 explicit supporting indicators and notes that "Priority ≠ Guilt".'
    },
    {
      step: 10,
      title: 'Cryptographic Evidence & Security',
      subtitle: 'SHA-256 Integrity Verification',
      desc: 'Verify cryptographic hashes and test live tamper detection in the Security Center.',
      link: '/evidence',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      actionText: 'Verify Evidence & Security Center',
      keyObservation: 'Confirm tamper-evident SHA-256 hash match on EV-2026-041-001 and run the interactive 1-byte tamper simulation.'
    },
    {
      step: 11,
      title: 'Tamper-Evident Audit Ledger',
      subtitle: 'Oversight & Accountability Ledger',
      desc: 'Review the tamper-evident ledger recording all officer sessions, case views, and entity resolutions.',
      link: '/audit',
      icon: <ScrollText className="w-5 h-5 text-blue-400" />,
      actionText: 'Open System Audit Ledger',
      keyObservation: 'Every action taken during this demo—from login to document resolution to access denial—is permanently recorded.'
    },
  ];

  const handleCompleteStep = (stepIdx: number) => {
    if (!completedSteps.includes(stepIdx)) {
      setCompletedSteps(prev => [...prev, stepIdx]);
    }
    setActiveStep(prev => Math.min(prev + 1, demoSteps.length - 1));
  };

  const handleResetDemo = () => {
    setActiveStep(0);
    setCompletedSteps([]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold font-space text-white">SIH INVESTIGATION DEMO</h1>
            <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-full font-mono font-bold">
              JUDGE WALKTHROUGH
            </span>
          </div>
          <p className="text-gray-400 mt-2 text-sm max-w-2xl">
            This guided sequence walks judges through the complete end-to-end investigation story:
            <span className="text-purple-300 font-medium"> Case → Document → Forensics → Entity Resolution → Knowledge Graph → Cross-Case → Timeline → Map → AI Insight → Evidence → Audit.</span>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleResetDemo}
            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 rounded-lg border border-gray-700 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Tour
          </button>
          <div className="text-right bg-[#1A0F2E] border border-gray-800 px-4 py-2 rounded-xl">
            <div className="text-[10px] text-gray-500 uppercase font-mono">Progress</div>
            <div className="text-base font-bold text-purple-400 font-mono">
              {completedSteps.length} / {demoSteps.length} Steps Completed
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800/80 h-2 rounded-full overflow-hidden border border-gray-700">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
          style={{ width: `${(completedSteps.length / demoSteps.length) * 100}%` }}
        />
      </div>

      {/* Stepper */}
      <div className="space-y-4">
        {demoSteps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isDone = completedSteps.includes(idx);

          return (
            <div
              key={step.step}
              className={`p-5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-[#1A0F2E] border-purple-500 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30'
                  : isDone
                    ? 'bg-[#1A0F2E]/40 border-gray-800/80'
                    : 'bg-[#1A0F2E]/20 border-gray-800/40 opacity-70'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Step Icon / Number */}
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold text-sm">
                      ✓
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isActive ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {step.step}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <div>
                      <h3 className={`text-base font-bold font-space flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {step.title}
                        <span className="text-xs font-mono font-normal text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          {step.subtitle}
                        </span>
                      </h3>
                    </div>
                    {isDone && (
                      <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400">{step.desc}</p>

                  {/* Key Observation */}
                  <div className="p-3 bg-black/40 rounded-lg border border-gray-800 text-xs text-gray-300">
                    <span className="text-purple-400 font-semibold">Judge Observation: </span>
                    {step.keyObservation}
                  </div>

                  {/* Action Buttons */}
                  {isActive && (
                    <div className="pt-2 flex flex-wrap gap-3">
                      <Link
                        href={step.link}
                        onClick={() => handleCompleteStep(idx)}
                        className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg transition flex items-center gap-2 shadow-md shadow-purple-600/20"
                      >
                        {step.actionText} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleCompleteStep(idx)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium rounded-lg border border-gray-700 transition"
                      >
                        Next Step &rarr;
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
