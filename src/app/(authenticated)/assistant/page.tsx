'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Shield, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello, Investigator. I am NOVA, your AI Intelligence Assistant. How can I assist with your case analysis today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content })
      });
      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        sources: data.sources
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Assistant error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0B0716]">
      <div className="p-4 border-b border-gray-800 bg-[#1A0F2E] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
            <Bot className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-space text-white flex items-center">
              NOVA INVESTIGATION ASSISTANT
              <Sparkles className="w-4 h-4 ml-2 text-pink-400" />
            </h1>
            <p className="text-xs text-gray-400 flex items-center">
               <Shield className="w-3 h-3 mr-1 text-green-400" />
               Secure Investigation Environment (Demo)
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-pink-500/20 ml-3' : 'bg-purple-500/20 mr-3'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-pink-400" /> : <Bot className="w-4 h-4 text-purple-400" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-pink-500/10 border border-pink-500/20 text-white rounded-tr-sm' : 'bg-[#1A0F2E] border border-gray-800 text-gray-200 rounded-tl-sm'}`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-700/50">
                    <p className="text-xs font-semibold text-gray-400 mb-1">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((s, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded-md text-gray-300 border border-gray-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 mr-3 flex items-center justify-center">
                <Bot className="w-4 h-4 text-purple-400" />
              </div>
              <div className="p-4 rounded-2xl bg-[#1A0F2E] border border-gray-800 text-gray-200 rounded-tl-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-800 bg-[#1A0F2E]">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button onClick={() => setInput('Show connections for Rahul Mehra')} className="whitespace-nowrap text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700 transition-colors">
                👤 Connections for Rahul
            </button>
            <button onClick={() => setInput('Find connection between Rahul Mehra and Harsh Pandey')} className="whitespace-nowrap text-xs bg-purple-950/80 hover:bg-purple-900 text-purple-200 px-3 py-1.5 rounded-full border border-purple-500/40 transition-colors">
                🔗 Path Finder (Rahul ↔ Harsh)
            </button>
            <button onClick={() => setInput('What are the network clusters?')} className="whitespace-nowrap text-xs bg-purple-950/80 hover:bg-purple-900 text-purple-200 px-3 py-1.5 rounded-full border border-purple-500/40 transition-colors">
                🌐 Network Clusters
            </button>
            <button onClick={() => setInput('What changed in Case #2026-041?')} className="whitespace-nowrap text-xs bg-amber-950/80 hover:bg-amber-900 text-amber-200 px-3 py-1.5 rounded-full border border-amber-500/40 transition-colors">
                🔔 What Changed?
            </button>
            <button onClick={() => setInput('Show executive brief for Case #2026-041')} className="whitespace-nowrap text-xs bg-purple-950/80 hover:bg-purple-900 text-purple-200 px-3 py-1.5 rounded-full border border-purple-500/40 transition-colors">
                📋 Executive Brief
            </button>
            <button onClick={() => setInput('Which vehicles appear across multiple cases?')} className="whitespace-nowrap text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700 transition-colors">
                🚗 Cross-case vehicles
            </button>
            <button onClick={() => setInput('Summarize Case #2026-041')} className="whitespace-nowrap text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700 transition-colors">
                📁 Summarize Case #2026-041
            </button>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NOVA to analyze data, find connections, or summarize cases..."
            className="flex-1 bg-[#0B0716] border border-gray-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl px-4 py-3 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
