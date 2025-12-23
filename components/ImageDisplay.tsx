import React from 'react';
import { GeneratedImage } from '../types';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  loading: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center items-center h-[400px] md:h-[600px] bg-[#0a0a0a] border border-yellow-900/30 rounded-xl relative overflow-hidden">
        {/* Loading Animation */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-24 h-24 border-4 border-yellow-900/30 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="mt-6 font-cyber text-yellow-500 animate-pulse tracking-widest text-sm">MENYINTESIS SEJARAH & MASA DEPAN...</p>
        </div>
        
        {/* Abstract Matrix Background */}
        <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 h-full">
                {Array.from({length: 12}).map((_, i) => (
                    <div key={i} className="border-r border-yellow-900/20 h-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                ))}
            </div>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 flex flex-col justify-center items-center h-[200px] border-2 border-dashed border-gray-800 rounded-xl text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-cyber text-sm tracking-wider">BELUM ADA GAMBAR DIHASILKAN</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-4 animate-fade-in-up">
      <div className="relative group rounded-xl overflow-hidden border border-yellow-600/30 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
        {/* Image */}
        <img 
          src={image.url} 
          alt={image.prompt} 
          className="w-full h-auto object-contain bg-black"
        />
        
        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-yellow-500 font-cyber text-xs uppercase mb-1">Prompt Digunakan</p>
          <p className="text-white text-sm line-clamp-2 italic font-history">{image.prompt}</p>
          
          <div className="mt-4 flex gap-3">
            <a 
              href={image.url} 
              download={`abbasid-fire-${image.timestamp}.png`}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black text-sm font-bold rounded flex items-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              UNDUH HD
            </a>
          </div>
        </div>

        {/* Corner Decors */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-yellow-500 rounded-tl-lg pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-yellow-500 rounded-tr-lg pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-yellow-500 rounded-bl-lg pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-yellow-500 rounded-br-lg pointer-events-none"></div>
      </div>
    </div>
  );
};