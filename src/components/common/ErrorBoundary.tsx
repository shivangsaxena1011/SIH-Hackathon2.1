'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Database, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-[#1A0F2E] border border-red-500/30 rounded-xl p-8 text-center max-w-xl mx-auto my-6 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              {this.props.fallbackTitle || 'Visualization Unavailable'}
            </h3>
            <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto">
              {this.props.fallbackMessage || 'The analytical service encountered an unexpected error. Offline deterministic fallback is active.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleRetry}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors shadow"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry Component
            </button>
            <Link
              href="/cases/C-001"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium rounded-lg flex items-center gap-2 border border-gray-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Primary Case
            </Link>
          </div>
          <p className="text-[11px] text-gray-500 font-mono">
            SIH Mode: Deterministic Demo Data Preserved
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
