"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Terminal, ArrowRight } from "lucide-react";

const BG_IMAGES = ["/back_1.jpg", "/back_2.jpg"];

export const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Crossfading Movie Background Images ─────────────────────────── */}
      {BG_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Imitation Game background"
          fill
          priority={i === 0}
          className="object-cover object-center transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        />
      ))}

      {/* Dark cinematic overlay so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 z-[1]" />

      {/* Amber / green tint that matches theme palette */}
      <div className="absolute inset-0 bg-[#D4A843]/5 mix-blend-overlay z-[2] pointer-events-none" />

      {/* Ambient radial glow centred on content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#D4A843]/8 rounded-full blur-3xl pointer-events-none z-[2]" />

      {/* ── Foreground Content ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">

        {/* Dual Organizer Logos */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {/* Mathematics Society */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-black/50 backdrop-blur-sm border border-[#B87333]/50 rounded-2xl p-3 shadow-lg shadow-[#D4A843]/10 hover:border-[#D4A843]/70 transition-colors duration-300">
              <Image src="/maths_society.png" alt="Mathematics Society" fill className="object-contain p-1" />
            </div>

            {/* Separator */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#B87333]/60 to-transparent" />

            {/* Enigma */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-black/50 backdrop-blur-sm border border-[#B87333]/50 rounded-2xl p-3 shadow-lg shadow-[#D4A843]/10 hover:border-[#D4A843]/70 transition-colors duration-300">
              <Image src="/enigmagoldnew.png" alt="Enigma Logo" fill className="object-contain p-1" />
            </div>
          </div>

          {/* Combined caption */}
          <span className="font-mono-code text-[10px] sm:text-xs text-[#8E8E93] tracking-widest uppercase">
            Maths Society, University of Moratuwa
          </span>
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
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#B87333]/30">
            <span className="w-2 h-2 bg-[#39FF14] rounded-full animate-pulse" />
            <span>THEME: ALAN TURING CRYPTANALYSIS</span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#B87333]/30">
            <span className="w-2 h-2 bg-[#D4A843] rounded-full" />
            <span>FORMAT: 3 STAGES</span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#B87333]/30">
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

      </div>
    </section>
  );
};
