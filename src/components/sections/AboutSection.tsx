"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { Lock, Cpu, Lightbulb } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // DECRYPTING THE CHALLENGE
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="HUT 8: THE STORY OF ENIGMA" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          Where pure logic meets mechanical ingenuity to crack the impossible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column: Visual Enigma Machine Illustration / Classified Dossier */}
        <div className="relative border border-[#B87333]/50 bg-[#1C1C1E] p-3 sm:p-4 rounded-2xl group hover:border-[#D4A843] transition-colors overflow-hidden">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-black">
            <Image
              src="/room.jpg"
              alt="Enigma Codebreaking Hut"
              fill
              className="object-cover opacity-60 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />

            {/* CLASSIFIED Stamp Overlay */}
            <div className="absolute top-4 left-4 border-2 border-red-600/80 text-red-600 px-3 py-1 font-mono-code font-bold text-xs tracking-widest rotate-[-12deg] select-none rounded-lg shadow-lg">
              CLASSIFIED // MORATUWA
            </div>

            {/* Monospace System Metadata */}
            <div className="absolute bottom-3 left-3 right-3 font-mono-code text-[10px] sm:text-[11px] text-[#39FF14] bg-black/85 p-2.5 sm:p-3 border border-[#39FF14]/30 rounded-lg">
              <div>&gt; CIPHER MATRIX: BLETCHLEY-1940</div>
              <div>&gt; ALAN TURING ARCHITECTURE DETECTED</div>
            </div>
          </div>
        </div>

        {/* Right Column: Dark Charcoal Card with Rounded Copper Border */}
        <div className="bg-[#1C1C1E] border border-[#B87333] p-6 sm:p-10 rounded-2xl space-y-6 relative glow-copper-border">
          <div className="flex items-center justify-between border-b border-[#B87333]/40 pb-4">
            <span className="font-mono-code text-xs text-[#D4A843] flex items-center gap-2">
              <Lock size={14} />
              <span>DOSSIER: ENIGMA 2026</span>
            </span>
            <span className="font-mono-code text-xs text-[#39FF14]">SEC-8 CLOTH</span>
          </div>

          <h3 className="font-serif-heading text-xl sm:text-2xl text-[#E5E5E7] font-semibold">
            Unraveling the Cipher of Pure Mathematics
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#E5E5E7]/80 leading-relaxed">
            Organized by the Mathematics Society of the University of Moratuwa, <strong>Enigma 2026</strong> invites undergraduate minds across Sri Lanka to step into the shoes of Bletchley Park cryptographers.
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#E5E5E7]/80 leading-relaxed">
            Participants are pushed beyond textbook formulas to solve intricate mathematical puzzles, design novel algorithmic strategies, and engineer logical breakthroughs.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono-code text-xs">
            <div className="p-3 bg-[#0A0A0A] border border-[#D4A843]/30 rounded-xl flex items-start gap-3">
              <Cpu className="text-[#D4A843] shrink-0 mt-0.5" size={16} />
              <div>
                <div className="text-[#D4A843] font-bold">ALGORITHMIC RIGOR</div>
                <div className="text-[#8E8E93] text-[11px] mt-0.5">Combinatorics & Graph Theory</div>
              </div>
            </div>

            <div className="p-3 bg-[#0A0A0A] border border-[#39FF14]/30 rounded-xl flex items-start gap-3">
              <Lightbulb className="text-[#39FF14] shrink-0 mt-0.5" size={16} />
              <div>
                <div className="text-[#39FF14] font-bold">LOGICAL SYNTHESIS</div>
                <div className="text-[#8E8E93] text-[11px] mt-0.5">Codebreaking Mechanics</div>
              </div>
            </div>
          </div>

          {/* Encryption Formula Footer */}
          <div className="pt-4 border-t border-[#B87333]/30 font-mono-code text-[11px] text-[#D4A843]/80 italic">
            &ldquo;When you have eliminated the impossible, whatever remains, however improbable, must be the truth.&rdquo;
          </div>
        </div>
      </div>
    </section>
  );
};
