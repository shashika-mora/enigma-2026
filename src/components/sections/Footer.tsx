"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#B87333]/40 pt-20 pb-12 px-4 overflow-hidden">
      {/* Background Cipher Stream Fading Block */}
      <div className="absolute inset-0 select-none font-mono-code text-[10px] text-[#39FF14]/5 p-8 flex flex-col justify-between pointer-events-none">
        <div>XKQZM RPTLW BNGHS 01010101 ALAN TURING BLETCHLEY PARK 1940 MATHS MORATUWA</div>
        <div>010101 101010 ENIGMA 2026 UNBROKEN CIPHER MATHEMATICAL VICTORY PUZZLE</div>
        <div>SOLVED LOGIC ALGORITHM GRAPH THEORY COMBINATORICS QUANTUM CIPHER ENGINE</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Quote in Italic Amber Serif */}
        <blockquote className="font-serif-heading text-xl sm:text-2xl lg:text-3xl italic text-[#D4A843] glow-amber leading-relaxed max-w-3xl mx-auto">
          &ldquo;We can only see a short distance ahead, but we can see plenty there that needs to be done.&rdquo;
        </blockquote>
        <div className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          — ALAN TURING (1950)
        </div>

        <div className="w-16 h-0.5 bg-[#B87333] mx-auto opacity-60" />

        {/* Mathematics Society Credentials */}
        <div className="space-y-2">
          <div className="font-serif-heading text-lg font-bold text-[#E5E5E7] tracking-wider">
            ENIGMA 2026
          </div>
          <p className="font-mono-code text-xs text-[#8E8E93]">
            Organized by Mathematics Society, University of Moratuwa
          </p>
          <p className="font-mono-code text-[11px] text-[#8E8E93]/60">
            © 2026 Mathematics Society UoM. All Rights Reserved. Classified Clearance Document.
          </p>
        </div>
      </div>
    </footer>
  );
};
