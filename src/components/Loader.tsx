"use client";

import { useState, useEffect } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => onFinish(), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[200] bg-obsidian flex items-center justify-center overflow-hidden">
      {/* Subtle palm shadow */}
      <div className="absolute top-0 right-0 w-[60%] h-[80%] opacity-[0.03] animate-palmShadow">
        <svg viewBox="0 0 200 300" fill="none" className="w-full h-full">
          <path d="M100 0 C100 80 40 120 30 200 C20 280 60 300 100 300 C140 300 180 280 170 200 C160 120 100 80 100 0Z" fill="currentColor" className="text-champagne"/>
          <path d="M100 50 C80 80 20 100 10 150" stroke="currentColor" strokeWidth="2" className="text-champagne"/>
          <path d="M100 50 C120 80 180 100 190 150" stroke="currentColor" strokeWidth="2" className="text-champagne"/>
        </svg>
      </div>

      {/* Line draw */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40">
        <div
          className={`h-[1px] bg-champagne transition-all duration-700 ease-out ${
            phase >= 0 ? "w-full" : "w-0"
          }`}
        />
      </div>

      {/* Brand text */}
      <div className="text-center relative z-10">
        <h1
          className={`font-[Cormorant_Garamond] text-3xl md:text-4xl font-semibold tracking-[0.2em] text-champagne transition-all duration-500 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          GEWA REALTY
        </h1>
        <p
          className={`font-[Manrope] text-[10px] tracking-[0.5em] text-sand/50 mt-3 transition-all duration-500 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          GOA &middot; INDIA
        </p>
      </div>
    </div>
  );
}
