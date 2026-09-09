'use client';

import { useState } from 'react';
import { seedDocuments } from '@/data/seed';
import { formatDate, getStatusColor, getStatusBgColor } from '@/lib/utils';
import Link from 'next/link';
import { FileText, Upload, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDocs = seedDocuments.filter(doc => 
    doc.documentId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.caseId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-space">DOCUMENT INTELLIGENCE</h1>
          <p className="text-gray-400 mt-1">Analyze, authenticate, and extract entities from evidentiary documents.</p>
        </div>
        <Link 
          href="/documents/upload" 
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <Upload size={18} />
          Upload New Document
        </Link>
      </div>

      <div className="bg-[#1A0F2E]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by Document ID, File Name, or Case ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0716] border border-gray-700 focus:border-purple-500 text-white rounded-lg pl-10 pr-4 py-2 outline-none transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0B0716] border border-gray-700 hover:border-gray-500 rounded-lg text-gray-300 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 text-sm">
                <th className="py-3 px-4 font-medium">DOCUMENT ID</th>
                <th className="py-3 px-4 font-medium">TYPE</th>
                <th className="py-3 px-4 font-medium">FILE NAME</th>
                <th className="py-3 px-4 font-medium">CASE ID</th>
                <th className="py-3 px-4 font-medium">STATUS</th>
                <th className="py-3 px-4 font-medium">UPLOADED</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, idx) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-800/50 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <Link href={`/documents/${doc.id}`} className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 font-medium group-hover:text-purple-200 transition-colors">{doc.documentId}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{doc.documentType}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm truncate max-w-[200px]" title={doc.fileName}>{doc.fileName}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20">
                      {doc.caseId}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusBgColor(doc.analysisStatus)} ${getStatusColor(doc.analysisStatus)}`}>
                      {doc.analysisStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {formatDate(doc.createdAt)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredDocs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No documents found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
