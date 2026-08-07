"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { Clock } from "lucide-react";

// PARTNERS_DISABLED: Sponsor logos and content are temporarily hidden.
// Re-enable by setting SHOW_SPONSORS = true when sponsors are confirmed.
const SHOW_SPONSORS = false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _SPONSORS_DATA = [
  { name: "Superloop", logo: "/superloop.jpeg" },
  { name: "Yaala Labs", logo: "/Yaala_Labs.jpg" },
  { name: "Atlato", logo: "/Atlato.png" },
];

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#B87333]/20">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // ALLIED UNITS &amp; SPONSORS
        </span>
        <h2 className="font-serif-heading text-2xl sm:text-4xl font-bold text-[#D4A843] glow-amber">
          <TextScramble text="ORGANIZERS & PARTNERS" periodicInterval={28000} />
        </h2>
      </div>

      <div className={`grid gap-8 sm:gap-12 items-center ${SHOW_SPONSORS ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-md mx-auto"}`}>
        {/* Organizer Branding with Dual Logos */}
        <div className="bg-[#1C1C1E] border border-[#B87333] p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-4 shadow-xl">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 p-2 bg-[#0A0A0A] border border-[#D4A843] rounded-2xl shadow-md">
              <Image
                src="/maths_society.png"
                alt="Mathematics Society, University of Moratuwa"
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 p-2 bg-[#0A0A0A] border border-[#D4A843] rounded-2xl shadow-md">
              <Image
                src="/enigmagoldnew.png"
                alt="Enigma Gold Emblem Logo"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <div>
            <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#E5E5E7]">
              Mathematics Society
            </h3>
            <p className="font-mono-code text-xs text-[#D4A843]">
              UNIVERSITY OF MORATUWA
            </p>
          </div>
          <p className="font-sans text-xs text-[#8E8E93] max-w-xs leading-relaxed">
            Fostering mathematical research, computational logic, and cryptanalytic innovation across Sri Lanka.
          </p>
        </div>

        {/* Sponsor Grid — shown only when SHOW_SPONSORS = true */}
        {SHOW_SPONSORS && (
          <div className="space-y-4">
            <div className="font-mono-code text-xs text-[#8E8E93] uppercase tracking-wider text-center md:text-left">
              PARTNERS &amp; SPONSORS:
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {_SPONSORS_DATA.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-[#1C1C1E] border border-[#B87333]/50 p-3 sm:p-4 h-20 sm:h-24 rounded-2xl relative flex items-center justify-center grayscale hover:grayscale-0 hover:border-[#D4A843] transition-all shadow-md"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2 sm:p-3"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pending placeholder — shown when SHOW_SPONSORS = false */}
        {!SHOW_SPONSORS && (
          <div className="bg-[#1C1C1E]/50 border border-[#B87333]/30 border-dashed p-8 rounded-2xl flex flex-col items-center justify-center gap-3 text-center">
            <Clock size={28} className="text-[#D4A843]/60 animate-pulse" />
            <p className="font-mono-code text-xs text-[#8E8E93] uppercase tracking-widest">
              Partners &amp; Sponsors
            </p>
            <p className="font-serif-heading text-sm text-[#D4A843]/70 font-semibold">
              Announcements Pending
            </p>
            <p className="font-sans text-xs text-[#8E8E93]/60 max-w-xs leading-relaxed">
              Partnership details will be revealed soon. Stay tuned.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
