"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { ShieldCheck, Sparkles } from "lucide-react";

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#B87333]/20">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // ALLIED UNITS &amp; SPONSORSHIP
        </span>
        <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-[#D4A843] glow-amber">
          <TextScramble text="ORGANIZERS & PARTNERS" periodicInterval={28000} />
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#8E8E93] max-w-lg mx-auto">
          Proudly organized by the Mathematics Society, University of Moratuwa with our esteemed industry partners.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
        {/* Organizer Branding Card */}
        <div className="bg-[#1C1C1E] border border-[#B87333] p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-between text-center space-y-6 shadow-xl relative overflow-hidden group hover:border-[#D4A843] transition-colors">
          <div className="space-y-4 w-full">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0A0A0A] border border-[#D4A843]/50 rounded-full font-mono-code text-[11px] text-[#D4A843] uppercase tracking-widest">
                <ShieldCheck size={13} className="text-[#D4A843]" />
                Official Organizer
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="relative w-20 sm:w-24 h-20 sm:h-24 p-2 bg-[#0A0A0A] border border-[#D4A843]/60 rounded-2xl shadow-md">
                <Image
                  src="/maths_society.png"
                  alt="Mathematics Society, University of Moratuwa"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="w-px h-12 bg-[#B87333]/40" />
              <div className="relative w-20 sm:w-24 h-20 sm:h-24 p-2 bg-[#0A0A0A] border border-[#D4A843]/60 rounded-2xl shadow-md">
                <Image
                  src="/enigmagoldnew.png"
                  alt="Enigma Gold Emblem Logo"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#E5E5E7]">
                Mathematics Society
              </h3>
              <p className="font-mono-code text-xs text-[#D4A843] tracking-widest mt-1">
                UNIVERSITY OF MORATUWA
              </p>
            </div>
          </div>

          <p className="font-sans text-xs text-[#8E8E93] max-w-sm leading-relaxed">
            Fostering mathematical research, computational logic, and cryptanalytic innovation across Sri Lanka.
          </p>
        </div>

        {/* Official Platinum Partner: Yaala Labs */}
        <div className="bg-[#1C1C1E] border-2 border-[#D4A843]/60 hover:border-[#D4A843] p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-between text-center space-y-6 shadow-2xl relative overflow-hidden group transition-all duration-300">
          {/* Glowing gradient border effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A843] to-transparent opacity-80" />

          <div className="w-full space-y-4">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#0A0A0A] border border-[#D4A843] rounded-full font-mono-code text-[11px] text-[#D4A843] uppercase tracking-[0.2em] shadow-md">
                <Sparkles size={13} className="text-[#39FF14] animate-pulse" />
                Official Platinum Partner
              </span>
            </div>

            <p className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase glow-green">
              // INTRODUCING
            </p>

            {/* Yaala Labs White Container (matches the official announcement banner) */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-2xl border border-white/20 w-full max-w-sm mx-auto transform group-hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center">
              <div className="relative w-full h-12 sm:h-14">
                <Image
                  src="/Yaala_Labs.jpg"
                  alt="Yaala Labs - Official Platinum Partner"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#E5E5E7]">
                Yaala Labs
              </h3>
              <p className="font-mono-code text-xs text-[#D4A843] tracking-wider mt-1">
                OFFICIAL PLATINUM PARTNER · ENIGMA 2026
              </p>
            </div>
          </div>

          <p className="font-sans text-xs text-[#8E8E93] max-w-sm leading-relaxed">
            Innovating next-generation capital markets technology and high-performance financial systems, proudly powering Enigma 2026.
          </p>
        </div>
      </div>
    </section>
  );
};
