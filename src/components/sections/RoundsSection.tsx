"use client";

import React from "react";
import { TextScramble } from "@/components/ui/TextScramble";
import { BookOpen, Monitor, MapPin, Trophy } from "lucide-react";

export const RoundsSection: React.FC = () => {
  const phases = [
    {
      id: "PHASE 00",
      name: "WORKSHOP SERIES",
      icon: BookOpen,
      iconColor: "#B87333",
      tag: "PREPARATION",
      badge: "ONLINE",
      status: "CONCLUDED",
      description:
        "Two focused workshops covering mathematical concepts to sharpen programming skills, analytical thinking, and problem-solving strategies. Open to all registered participants.",
      details: [
        "2 Online Sessions",
        "Math for Programming",
        "Analytical Thinking",
        "Open to All Registrants",
      ],
      prize: null,
    },
    {
      id: "PHASE 01",
      name: "VIRTUAL HACKATHON",
      icon: Monitor,
      iconColor: "#D4A843",
      tag: "QUALIFYING ROUND",
      badge: "HACKERRANK",
      status: "CONCLUDED",
      description:
        "A 6-hour online qualifying round conducted via HackerRank. Top 10 finalist teams have advanced to the on-campus Final Hackathon.",
      details: [
        "6-Hour Online Round",
        "Platform: HackerRank",
        "Individual or Teams (1–3)",
        "Top 10 Advance (Decided)",
      ],
      prize: null,
    },
    {
      id: "PHASE 02",
      name: "FINAL HACKATHON",
      icon: MapPin,
      iconColor: "#D4A843",
      tag: "GRAND FINALE",
      badge: "ON-CAMPUS · UOM",
      status: "UPCOMING",
      description:
        "The sole remaining stage: A 4-hour on-site finale at the University of Moratuwa. The top 10 qualified teams face high-stakes mathematical challenges under time pressure. Top 3 win cash prizes.",
      details: [
        "4-Hour On-Campus Event",
        "University of Moratuwa",
        "Top 10 Qualifiers Only",
        "Top 3 Win Cash Prizes",
      ],
      prizes: [
        { place: "1ST", label: "CHAMPION", color: "#D4A843" },
        { place: "2ND", label: "1ST RUNNER UP", color: "#B87333" },
        { place: "3RD", label: "2ND RUNNER UP", color: "#8E8E93" },
      ],
    },
  ];

  return (
    <section id="rounds" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // COMPETITION STRUCTURE
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="THE COMPETITION PHASES" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          From preparation workshops to a live on-campus finale — three distinct phases designed to test the finest mathematical minds.
        </p>
      </div>

      {/* Phase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {phases.map((phase) => {
          const IconComponent = phase.icon;
          return (
            <div
              key={phase.id}
              className={`bg-[#1C1C1E] p-6 sm:p-8 rounded-2xl relative flex flex-col justify-between group transition-all duration-300 ${
                phase.status === "UPCOMING"
                  ? "border-2 border-[#D4A843] shadow-[0_0_30px_rgba(212,168,67,0.3)] ring-1 ring-[#D4A843]/50"
                  : "border border-[#B87333]/50 hover:border-[#D4A843] hover:shadow-[0_0_20px_rgba(212,168,67,0.2)]"
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-code text-xs text-[#D4A843] tracking-widest border border-[#D4A843]/40 px-3 py-1 bg-[#0A0A0A] rounded-lg">
                    {phase.id}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#B87333]/50 flex items-center justify-center group-hover:border-[#D4A843] transition-colors">
                    <IconComponent size={24} style={{ color: phase.iconColor }} className="group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                </div>

                {/* Platform / Format Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="font-mono-code text-[9px] text-[#B87333] tracking-widest uppercase border border-[#B87333]/40 px-2 py-0.5 rounded-md inline-block">
                    {phase.badge}
                  </div>
                  {phase.status === "CONCLUDED" ? (
                    <span className="font-mono-code text-[9px] text-[#D4A843]/60 border border-[#D4A843]/30 px-2 py-0.5 rounded-md bg-[#0A0A0A]">
                      CONCLUDED
                    </span>
                  ) : (
                    <span className="font-mono-code text-[9px] text-[#39FF14] border border-[#39FF14]/60 px-2 py-0.5 rounded-md bg-[#0A0A0A] font-bold glow-green animate-pulse">
                      REMAINING ROUND
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#E5E5E7] group-hover:text-[#D4A843] transition-colors mb-2">
                  <TextScramble text={phase.name} hoverToScramble={true} />
                </h3>

                <div className="font-mono-code text-[10px] text-[#39FF14] tracking-wider uppercase mb-4">
                  {phase.tag}
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-6">
                  {phase.description}
                </p>
              </div>

              {/* Details Bullet List */}
              <div>
                <div className="pt-5 border-t border-[#B87333]/30 font-mono-code text-xs space-y-2">
                  {phase.details.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#E5E5E7]/80">
                      <span className="text-[#39FF14]">&gt;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Cash Prize Podium — Gold, Silver, Bronze theme */}
      <div className="mt-6 bg-[#1C1C1E] border border-[#D4A843]/40 rounded-2xl px-5 sm:px-6 py-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={16} className="text-[#FFD700]" />
          <span className="font-mono-code text-xs text-[#FFD700] tracking-widest uppercase font-bold">
            CASH PRIZES — FINAL HACKATHON · TOP 3 PODIUM
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              place: "1ST",
              label: "CHAMPION",
              color: "#FFD700",
              bgColor: "rgba(255, 215, 0, 0.08)",
              borderColor: "rgba(255, 215, 0, 0.6)",
              glow: "0 0 20px rgba(255, 215, 0, 0.3)",
              badge: "GOLD MEDAL",
            },
            {
              place: "2ND",
              label: "1ST RUNNER UP",
              color: "#E0E0E0",
              bgColor: "rgba(192, 192, 192, 0.08)",
              borderColor: "rgba(192, 192, 192, 0.6)",
              glow: "0 0 20px rgba(192, 192, 192, 0.25)",
              badge: "SILVER MEDAL",
            },
            {
              place: "3RD",
              label: "2ND RUNNER UP",
              color: "#CD7F32",
              bgColor: "rgba(205, 127, 50, 0.08)",
              borderColor: "rgba(205, 127, 50, 0.6)",
              glow: "0 0 20px rgba(205, 127, 50, 0.25)",
              badge: "BRONZE MEDAL",
            },
          ].map((p) => (
            <div
              key={p.place}
              className="flex flex-col items-center justify-center py-5 px-4 rounded-xl border relative transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: p.bgColor,
                borderColor: p.borderColor,
                boxShadow: p.glow,
              }}
            >
              <span
                className="font-mono-code text-[9px] tracking-widest px-2 py-0.5 rounded border mb-2 font-bold"
                style={{ color: p.color, borderColor: p.borderColor }}
              >
                {p.badge}
              </span>
              <span
                className="font-mono-code text-3xl sm:text-4xl font-bold tracking-tight"
                style={{
                  color: p.color,
                  textShadow: `0 0 15px ${p.color}66`,
                }}
              >
                {p.place}
              </span>
              <span
                className="font-mono-code text-[10px] tracking-widest mt-1.5 font-bold uppercase"
                style={{ color: p.color }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Progression Cable */}
      <div className="mt-6 sm:mt-8 bg-[#1C1C1E] border border-[#B87333]/40 p-5 sm:p-6 rounded-2xl">
        <div className="font-mono-code text-xs text-[#D4A843] mb-4 text-center">
          PHASE PROGRESSION // REGISTRATION → WORKSHOPS → VIRTUAL ROUND → ON-CAMPUS FINALE
        </div>

        <div className="relative flex items-center justify-between max-w-4xl mx-auto px-2 sm:px-4">
          <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-[#B87333] -translate-y-1/2 z-0" />

          {[
            { label: "WORKSHOPS", color: "#B87333" },
            { label: "VIRTUAL ROUND", color: "#D4A843" },
            { label: "FINALE", color: "#D4A843" },
          ].map(({ label, color }) => (
            <div key={label} className="relative z-10 flex flex-col items-center bg-[#0A0A0A] px-2 sm:px-4 py-2 border rounded-xl" style={{ borderColor: color }}>
              <span className="w-3 h-3 rounded-full animate-pulse mb-1" style={{ backgroundColor: color }} />
              <span className="font-mono-code text-[9px] sm:text-[10px]" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
