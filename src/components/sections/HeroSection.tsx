"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Terminal, Shield, ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Radial Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#D4A843]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Organizer Header Badge with Dual Logos */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1C1C1E] border border-[#B87333]/60 rounded-xl font-mono-code text-xs text-[#D4A843] shadow-lg">
          <div className="relative w-5 h-5 shrink-0">
            <Image src="/maths_society.png" alt="Maths Society Logo" fill className="object-contain" />
          </div>
          <span>MATHEMATICS SOCIETY — UNIVERSITY OF MORATUWA</span>
          <div className="relative w-5 h-5 shrink-0">
            <Image src="/enigmagoldnew.png" alt="Enigma Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Main Serif Title with Scramble Cipher Animation */}
        <div className="space-y-3">
          <h1 className="font-serif-heading text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-[#D4A843] glow-amber uppercase">
            <TextScramble text="ENIGMA 2026" autostart={true} periodicInterval={5000} />
          </h1>
          <p className="font-mono-code text-sm sm:text-lg text-[#39FF14] tracking-widest uppercase glow-green">
            [ <TextScramble text="XKQZM RPTLW BNGHS" scrambleSpeed={30} periodicInterval={4000} /> ]
          </p>
        </div>

        {/* Story Tagline */}
        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#E5E5E7]/90 leading-relaxed font-sans font-light">
          Step into Bletchley Park&apos;s codebreaking huts. Confront the unsolvable cipher where pure mathematics, algorithmic logic, and quiet triumph collide.
        </p>

        {/* Key Information Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono-code text-xs text-[#8E8E93]">
          <div className="flex items-center gap-2 bg-[#1C1C1E] px-3 py-1.5 rounded-lg border border-[#B87333]/30">
            <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse" />
            <span>THEME: ALAN TURING CRYPTANALYSIS</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1C1C1E] px-3 py-1.5 rounded-lg border border-[#B87333]/30">
            <span className="w-2 h-2 bg-[#D4A843] rounded-full" />
            <span>FORMAT: 3 STAGES</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1C1C1E] px-3 py-1.5 rounded-lg border border-[#B87333]/30">
            <span className="w-2 h-2 bg-[#B87333] rounded-full" />
            <span>TARGET: UNDERGRADUATE CRYPTOGRAPHERS</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#registration" className="w-full sm:w-auto">
            <GlowingButton variant="amber" className="w-full sm:w-auto">
              <Terminal size={16} />
              <TextScramble text="BEGIN CRYPTANALYSIS" />
              <ArrowRight size={16} />
            </GlowingButton>
          </a>
          <a href="#about" className="w-full sm:w-auto">
            <GlowingButton variant="copper" className="w-full sm:w-auto">
              <TextScramble text="ENTER HUT 8" />
            </GlowingButton>
          </a>
        </div>

        {/* Decorative Encryption Equation */}
        <div className="pt-6 font-mono-code text-[10px] sm:text-xs text-[#B87333]/80 overflow-x-auto whitespace-nowrap">
          E_k(x) = P^{-1} \circ R_3(t_3) \circ R_2(t_2) \circ R_1(t_1) \circ U \circ R_1^{-1}(t_1) \circ R_2^{-1}(t_2) \circ R_3^{-1}(t_3) \circ P(x)
        </div>
      </div>
    </section>
  );
};
