import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative w-full py-8 text-center border-b border-yellow-600/30 bg-gradient-to-b from-black to-[#0f0f0f]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-70"></div>
      
      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 font-cyber drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
        ABBASID <span className="text-white italic">FIRE</span>
      </h1>
      
      <div className="flex justify-center items-center mt-3 gap-2">
        <div className="h-[1px] w-12 bg-yellow-600/50"></div>
        <p className="text-yellow-600/80 uppercase tracking-[0.3em] text-xs md:text-sm font-history">
          The Golden Age of Battle Royale
        </p>
        <div className="h-[1px] w-12 bg-yellow-600/50"></div>
      </div>
      
      {/* Decorative geometrical elements */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-yellow-500/30"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-yellow-500/30"></div>
    </header>
  );
};