'use client';

import { Book, HelpCircle, FileText } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-space text-white">DOCUMENTATION & HELP</h1>
          <p className="text-gray-400 mt-2 text-sm flex items-center">
             <HelpCircle className="w-4 h-4 mr-2 text-purple-500" />
             System reference and user guides.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Book className="w-5 h-5 mr-2 text-purple-400" />
                Quick Reference Guide
            </h2>
            <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">•</span>
                    <strong>Global Search:</strong> Use the top bar (Ctrl+K) to find entities, cases, or vehicles across the database.
                </li>
                <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">•</span>
                    <strong>Network Graph:</strong> Double-click nodes to expand their connections. Drag to rearrange.
                </li>
                <li className="flex items-start">
                    <span className="text-purple-500 mr-2 font-bold">•</span>
                    <strong>AI Assistant:</strong> Chat with NOVA for quick summaries or pattern queries.
                </li>
            </ul>
         </div>

         <div className="bg-[#1A0F2E] border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-pink-400" />
                SIH Evaluation Notes
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
                This prototype demonstrates the core capabilities of the Criminal Intelligence Platform. 
                Data presented is entirely synthetic (seed data) and designed to showcase specific analytical workflows, such as cross-case association and network hub identification.
            </p>
            <div className="p-3 bg-black/30 rounded border border-gray-800/50 text-xs text-gray-500">
                Version: 1.0.0-prototype<br/>
                Environment: Demo/Evaluation
            </div>
         </div>
      </div>
    </div>
  );
}
