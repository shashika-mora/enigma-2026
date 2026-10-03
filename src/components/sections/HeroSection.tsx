"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { Terminal, ArrowRight, Calendar } from "lucide-react";

export const HeroSection: React.FC = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* ── Background Image ───────────────────────────────────────────── */}
      <Image
        src="/back_1.jpg"
        alt="Imitation Game background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Heavy vignette — darkens the edges, keeps centre readable */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.82) 100%)"
        }}
      />

      {/* Bottom fade so it merges cleanly into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[2]" />

      {/* ── Foreground Content ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

        {/* Dual Organizer Logos */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {/* Mathematics Society */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-black/60 backdrop-blur-md border border-[#D4A843]/40 rounded-2xl p-3 shadow-xl shadow-black/50 hover:border-[#D4A843]/80 hover:shadow-[#D4A843]/20 transition-all duration-300">
              <Image src="/maths_society.png" alt="Mathematics Society" fill className="object-contain p-1" />
            </div>

            {/* Separator */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4A843]/40 to-transparent" />

            {/* Enigma */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-black/60 backdrop-blur-md border border-[#D4A843]/40 rounded-2xl p-3 shadow-xl shadow-black/50 hover:border-[#D4A843]/80 hover:shadow-[#D4A843]/20 transition-all duration-300">
              <Image src="/enigmagoldnew.png" alt="Enigma Logo" fill className="object-contain p-1" />
            </div>
          </div>

          {/* Combined caption */}
          <span className="font-mono-code text-[10px] sm:text-xs text-white/50 tracking-[0.2em] uppercase">
            Mathamatics Society, University of Moratuwa
          </span>
        </div>

        {/* ── Main Title ────────────────────────────────────────────────────── */}
        {/* Dark panel behind the title — the key fix for legibility */}
        <div className="relative">
          {/* Blurred dark backdrop card */}
          <div className="absolute inset-x-0 -inset-y-4 sm:-inset-y-6 bg-black/50 backdrop-blur-sm rounded-2xl border border-white/5 -z-10" />

          <div className="space-y-3 py-2 overflow-hidden">
            <h1
              className="font-serif-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight uppercase whitespace-nowrap"
              style={{
                color: "#F5D78A",
                textShadow: "0 0 40px rgba(212,168,67,0.6), 0 2px 8px rgba(0,0,0,0.9), 0 0 80px rgba(212,168,67,0.25)"
              }}
            >
              <TextScramble text="ENIGMA 2026" autostart={true} periodicInterval={22000} />
            </h1>
          </div>
        </div>

        {/* Story Tagline */}
        <p
          className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans font-light"
          style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
        >
          Step into Bletchley Park&apos;s codebreaking huts. Confront the unsolvable cipher where pure mathematics, algorithmic logic, and quiet triumph collide.
        </p>

        {/* Key Information Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono-code text-[11px] sm:text-xs">
          {[
            { dot: "#D4A843", label: "THEME: ALAN TURING CRYPTANALYSIS" },
            { dot: "#D4A843", label: "FORMAT: 3 STAGES" },
            { dot: "#D4A843", label: "TARGET: UNDERGRADUATE" },
          ].map(({ dot, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
              style={{
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(8px)",
                borderColor: `${dot}44`,
                color: "rgba(255,255,255,0.65)"
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: dot }} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#timeline" className="w-full sm:w-auto">
            <GlowingButton variant="amber" className="w-full sm:w-auto">
              <Calendar size={16} />
              <TextScramble text="VIEW TIMELINE" />
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
