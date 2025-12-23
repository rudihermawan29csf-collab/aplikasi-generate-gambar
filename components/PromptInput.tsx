import React, { useState } from 'react';
import { FusionStyle, GenerationConfig } from '../types';

interface PromptInputProps {
  onGenerate: (config: GenerationConfig) => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ onGenerate, isGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<FusionStyle>(FusionStyle.WARRIOR);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate({ prompt, style, aspectRatio });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-yellow-900/5 clip-path-polygon skew-y-1 rounded-xl pointer-events-none border border-yellow-500/10"></div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        
        {/* Main Input */}
        <div className="flex flex-col gap-2">
          <label className="text-yellow-500 font-cyber text-sm tracking-wider uppercase">
            Jelaskan Imajinasi Anda (Bahasa Indonesia/Inggris)
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Contoh: Seorang pemanah elit dengan jubah taktis emas berdiri di atas reruntuhan istana kuno..."
              className="relative w-full bg-[#0a0a0a] text-gray-100 border border-yellow-900/50 rounded-lg p-4 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all min-h-[100px] resize-none font-sans"
              disabled={isGenerating}
            />
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Style Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">Kategori Fusi</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(FusionStyle).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`px-3 py-2 text-xs md:text-sm border rounded-md transition-all duration-300 font-cyber ${
                    style === s 
                      ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.2)]' 
                      : 'bg-black border-gray-800 text-gray-500 hover:border-gray-600'
                  }`}
                >
                  {s.split('(')[1].replace(')', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Ratio Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider">Rasio Aspek</label>
            <div className="flex gap-2">
              {['1:1', '16:9', '9:16'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAspectRatio(r as any)}
                  className={`flex-1 py-2 text-sm border rounded-md transition-all font-mono ${
                    aspectRatio === r
                      ? 'bg-gray-800 border-gray-500 text-white'
                      : 'bg-black border-gray-800 text-gray-600 hover:bg-gray-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className={`w-full py-4 px-6 rounded-lg font-black font-cyber text-lg tracking-widest uppercase transition-all duration-300 transform flex items-center justify-center gap-3
              ${isGenerating 
                ? 'bg-gray-900 text-gray-500 cursor-not-allowed border border-gray-800' 
                : 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:-translate-y-1'
              }`}
          >
            {isGenerating ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                MEMPROSES FUSI...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                GENERATE ART
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};