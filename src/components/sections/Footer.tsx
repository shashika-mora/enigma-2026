"use client";

import React from "react";
import { Github } from "lucide-react";
import { TextScramble } from "@/components/ui/TextScramble";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#B87333]/40 pt-20 pb-12 px-4 overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Quote in Italic Amber Serif */}
        <blockquote className="font-serif-heading text-xl sm:text-2xl lg:text-3xl italic text-[#D4A843] glow-amber leading-relaxed max-w-3xl mx-auto">
          &ldquo;We can only see a short distance ahead, but we can see plenty there that needs to be done.&rdquo;
        </blockquote>
        <div className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          — ALAN TURING (1950)
        </div>

        <div className="w-16 h-0.5 bg-[#B87333] mx-auto opacity-60" />

        {/* Brand Logos */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="relative w-11 h-11 border border-[#D4A843]/60 p-1 flex items-center justify-center bg-[#1C1C1E] rounded-xl shadow-lg">
            <img
              src="/maths_society.png"
              alt="Mathematics Society"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="relative w-11 h-11 border border-[#D4A843]/60 p-1 flex items-center justify-center bg-[#1C1C1E] rounded-xl shadow-lg">
            <img
              src="/enigma-icon.png"
              alt="Enigma Emblem"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>

        {/* Mathematics Society Credentials */}
        <div className="space-y-2">
          <div className="font-serif-heading text-lg font-bold text-[#E5E5E7] tracking-wider">
            ENIGMA 2026
          </div>
          <p className="font-mono-code text-xs text-[#8E8E93]">
            Organized by Mathematics Society, University of Moratuwa
          </p>
          <p className="font-mono-code text-[11px] text-[#8E8E93]/60">
            © 2026 Mathematics Society UoM. All Rights Reserved.
          </p>

          {/* Designer Credit */}
          <div className="pt-3 flex items-center justify-center gap-2">
            <span className="font-mono-code text-[11px] text-[#8E8E93]/50">
              Designed by Shashika Dayarathna
            </span>
            <a
              href="https://github.com/shashika-mora"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#8E8E93]/50 hover:text-[#D4A843] transition-colors"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
