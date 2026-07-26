"use client";

import React from "react";
import { TextScramble } from "@/components/ui/TextScramble";
import { Disc, Sigma, Settings } from "lucide-react";

export const RoundsSection: React.FC = () => {
  const rounds = [
    {
      id: "ROUND 01",
      name: "THE CIPHER",
      scrambleDefault: "XKQZM",
      icon: Disc,
      iconColor: "#D4A843",
      tag: "PRELIMINARY STAGE",
      description:
        "Teams decipher fundamental mathematical sequences, modular arithmetic, and logical cryptograms to prove initial cryptanalytic clearance.",
      details: ["Time-bound Online Test", "Combinatorics & Logic", "Individual & Team Tasks"],
    },
    {
      id: "ROUND 02",
      name: "THE ALGORITHM",
      scrambleDefault: "BNGHS",
      icon: Sigma,
      iconColor: "#39FF14",
      tag: "INTERMEDIATE STAGE",
      description:
        "Advanced algorithmic problem solving requiring computational thinking, graph theory, and mathematical optimization.",
      details: ["Complex Problem Set", "Algorithmic Efficiency", "Team Collaboration"],
    },
    {
      id: "ROUND 03",
      name: "THE BOMBE",
      scrambleDefault: "RPTLW",
      icon: Settings,
      iconColor: "#B87333",
      tag: "GRAND FINALE",
      description:
        "The ultimate showdown inspired by Alan Turing's Bombe machine. The top teams solve live high-stakes mathematical puzzles under time pressure.",
      details: ["Live On-Campus Finale", "High-Stakes Presentation", "Trophy & Cash Prizes"],
    },
  ];

  return (
    <section id="rounds" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // COMPETITION ARCHITECTURE
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="THE CRYPTANALYTIC ROUNDS" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          Three progressive stages of mathematical rigor designed to strain the finest minds.
        </p>
      </div>

      {/* 3 Round Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {rounds.map((round) => {
          const IconComponent = round.icon;
          return (
            <div
              key={round.id}
              className="bg-[#1C1C1E] border border-[#B87333] p-6 sm:p-8 rounded-2xl relative flex flex-col justify-between group hover:border-[#D4A843] hover:shadow-[0_0_25px_rgba(212,168,67,0.3)] transition-all duration-300"
            >
              {/* Card Header & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-code text-xs text-[#D4A843] tracking-widest border border-[#D4A843]/40 px-3 py-1 bg-[#0A0A0A] rounded-lg">
                    {round.id}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#B87333]/50 flex items-center justify-center group-hover:border-[#D4A843] transition-colors">
                    <IconComponent size={24} style={{ color: round.iconColor }} className="group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                </div>

                {/* Scrambling Title */}
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#E5E5E7] group-hover:text-[#D4A843] transition-colors mb-2">
                  <TextScramble text={round.name} hoverToScramble={true} />
                </h3>

                <div className="font-mono-code text-[10px] text-[#39FF14] tracking-wider uppercase mb-4">
                  {round.tag}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-6">
                  {round.description}
                </p>
              </div>

              {/* Details Bullet List */}
              <div className="pt-6 border-t border-[#B87333]/30 font-mono-code text-xs space-y-2">
                {round.details.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#E5E5E7]/80">
                    <span className="text-[#39FF14]">&gt;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Connected Plugboard Progress Cable */}
      <div className="mt-12 sm:mt-16 bg-[#1C1C1E] border border-[#B87333]/40 p-5 sm:p-6 rounded-2xl">
        <div className="font-mono-code text-xs text-[#D4A843] mb-4 text-center">
          STAGE PROGRESSION CABLE // PLUGBOARD WIRING
        </div>

        <div className="relative flex items-center justify-between max-w-4xl mx-auto px-2 sm:px-4">
          <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-[#B87333] -translate-y-1/2 z-0" />

          <div className="relative z-10 flex flex-col items-center bg-[#0A0A0A] px-3 sm:px-4 py-2 border border-[#D4A843] rounded-xl">
            <span className="w-3 h-3 rounded-full bg-[#D4A843] animate-ping mb-1" />
            <span className="font-mono-code text-[10px] sm:text-[11px] text-[#D4A843]">STAGE 1</span>
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#0A0A0A] px-3 sm:px-4 py-2 border border-[#39FF14] rounded-xl">
            <span className="w-3 h-3 rounded-full bg-[#39FF14] mb-1" />
            <span className="font-mono-code text-[10px] sm:text-[11px] text-[#39FF14]">STAGE 2</span>
          </div>

          <div className="relative z-10 flex flex-col items-center bg-[#0A0A0A] px-3 sm:px-4 py-2 border border-[#B87333] rounded-xl">
            <span className="w-3 h-3 rounded-full bg-[#B87333] mb-1" />
            <span className="font-mono-code text-[10px] sm:text-[11px] text-[#B87333]">STAGE 3</span>
          </div>
        </div>
      </div>
    </section>
  );
};
