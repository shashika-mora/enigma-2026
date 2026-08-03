"use client";

import React from "react";
import { TextScramble } from "@/components/ui/TextScramble";
import { Calendar, Clock, Lightbulb } from "lucide-react";

const events = [
  {
    stage: "STAGE 01",
    title: "REGISTRATIONS OPEN",
    date: "5 August 2026",
    status: "OPEN NOW",
    desc: "Registration portal opens for all undergraduate participants. Teams of 1–3 members from any Sri Lankan university are welcome.",
  },
  {
    stage: "STAGE 02",
    title: "REGISTRATION DEADLINE",
    date: "19 August 2026",
    status: "UPCOMING",
    desc: "Final deadline to complete registration. No late entries will be accepted after this date. Secure your spot early.",
  },
  {
    stage: "STAGE 03",
    title: "WORKSHOP I",
    date: "20 August 2026",
    status: "UPCOMING",
    desc: "First online workshop — foundational mathematical concepts for competitive problem solving and algorithmic thinking.",
  },
  {
    stage: "STAGE 04",
    title: "WORKSHOP II",
    date: "25 August 2026",
    status: "UPCOMING",
    desc: "Second online workshop — advanced strategies and problem-solving techniques to sharpen your edge for the hackathon rounds.",
  },
  {
    stage: "STAGE 05",
    title: "ONLINE HACKATHON",
    date: "29 August 2026",
    status: "UPCOMING",
    desc: "6-hour qualifying round via HackerRank. Compete individually or in teams of 1–3. Top 10 teams advance to the on-campus finale.",
  },
  {
    stage: "STAGE 06",
    title: "PHYSICAL HACKATHON FINAL",
    date: "19 September 2026",
    status: "UPCOMING",
    desc: "4-hour on-campus finale at the University of Moratuwa. Top 10 qualifiers compete head-to-head for prestigious cash prizes.",
  },
];

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center space-y-3 mb-14 sm:mb-20">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // CHRONOLOGICAL DISPATCH
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="EVENT TIMELINE" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          From registration to the on-campus finale — track each stage of the competition. Exact dates will be announced soon.
        </p>
      </div>

      {/* DESKTOP HORIZONTAL CABLE TIMELINE (≥ 1024px) */}
      <div className="hidden lg:block space-y-16 pb-12">
        {/* ROW 1: Stages 01 to 03 */}
        <div className="relative">
          {/* Copper Cable Line passing through center of nodes */}
          <div className="absolute top-[52px] left-12 right-12 h-1 bg-[#B87333]/80 rounded-full z-0 glow-copper-border" />

          <div className="grid grid-cols-3 gap-6 relative z-10">
            {events.slice(0, 3).map((evt, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="font-mono-code text-xs text-[#D4A843] mb-3 bg-[#0A0A0A] px-3 py-1 border border-[#D4A843]/40 rounded-lg">
                  {evt.stage}
                </div>

                <div className="relative mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#1C1C1E] border-2 border-[#D4A843] flex items-center justify-center shadow-[0_0_20px_rgba(212,168,67,0.6)] group-hover:scale-110 transition-transform">
                    <div className="w-4 h-4 rounded-full bg-[#D4A843] animate-pulse" />
                  </div>
                  <Lightbulb size={16} className="text-[#D4A843] absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="bg-[#1C1C1E] border border-[#B87333] p-5 rounded-2xl w-full flex-1 flex flex-col justify-between group-hover:border-[#D4A843] transition-colors shadow-lg">
                  <div>
                    <h3 className="font-serif-heading text-sm font-bold text-[#E5E5E7] mb-2 group-hover:text-[#D4A843] transition-colors">
                      <TextScramble text={evt.title} hoverToScramble={true} />
                    </h3>
                    <div className="font-mono-code text-xs text-[#39FF14] mb-3 flex items-center justify-center gap-1.5 glow-green">
                      <Calendar size={13} />
                      <span>{evt.date}</span>
                    </div>
                    <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">{evt.desc}</p>
                  </div>
                  <div className={`mt-4 pt-3 border-t border-[#B87333]/30 font-mono-code text-[10px] flex items-center justify-center gap-1 ${evt.status === 'OPEN NOW' ? 'text-[#39FF14]' : 'text-[#D4A843]/70'}`}>
                    <Clock size={12} />
                    <span>STATUS: {evt.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Stages 04 to 06 */}
        <div className="relative max-w-5xl mx-auto">
          {/* Copper Cable Line passing through center of nodes */}
          <div className="absolute top-[52px] left-16 right-16 h-1 bg-[#B87333]/80 rounded-full z-0 glow-copper-border" />

          <div className="grid grid-cols-3 gap-6 relative z-10">
            {events.slice(3).map((evt, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="font-mono-code text-xs text-[#D4A843] mb-3 bg-[#0A0A0A] px-3 py-1 border border-[#D4A843]/40 rounded-lg">
                  {evt.stage}
                </div>

                <div className="relative mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#1C1C1E] border-2 border-[#D4A843] flex items-center justify-center shadow-[0_0_20px_rgba(212,168,67,0.6)] group-hover:scale-110 transition-transform">
                    <div className="w-4 h-4 rounded-full bg-[#D4A843] animate-pulse" />
                  </div>
                  <Lightbulb size={16} className="text-[#D4A843] absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="bg-[#1C1C1E] border border-[#B87333] p-5 rounded-2xl w-full flex-1 flex flex-col justify-between group-hover:border-[#D4A843] transition-colors shadow-lg">
                  <div>
                    <h3 className="font-serif-heading text-sm font-bold text-[#E5E5E7] mb-2 group-hover:text-[#D4A843] transition-colors">
                      <TextScramble text={evt.title} hoverToScramble={true} />
                    </h3>
                    <div className="font-mono-code text-xs text-[#39FF14] mb-3 flex items-center justify-center gap-1.5 glow-green">
                      <Calendar size={13} />
                      <span>{evt.date}</span>
                    </div>
                    <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">{evt.desc}</p>
                  </div>
                  <div className={`mt-4 pt-3 border-t border-[#B87333]/30 font-mono-code text-[10px] flex items-center justify-center gap-1 ${evt.status === 'OPEN NOW' ? 'text-[#39FF14]' : 'text-[#D4A843]/70'}`}>
                    <Clock size={12} />
                    <span>STATUS: {evt.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE VERTICAL CABLE TIMELINE (< 1024px) */}
      <div className="lg:hidden relative pl-6 sm:pl-10 space-y-8">
        <div className="absolute left-3 sm:left-5 top-4 bottom-4 w-1 bg-[#B87333]/80 rounded-full glow-copper-border" />

        {events.map((evt, idx) => (
          <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
            <div className="absolute -left-6 sm:-left-10 top-4 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1C1C1E] border-2 border-[#D4A843] flex items-center justify-center shadow-[0_0_15px_rgba(212,168,67,0.6)] shrink-0 z-10">
              <div className="w-3 h-3 rounded-full bg-[#D4A843] animate-pulse" />
            </div>

            <div className="bg-[#1C1C1E] border border-[#B87333] p-5 sm:p-6 rounded-2xl w-full group-hover:border-[#D4A843] transition-colors shadow-lg">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono-code text-[11px] text-[#D4A843] bg-[#0A0A0A] px-2.5 py-1 border border-[#D4A843]/40 rounded-lg">
                  {evt.stage}
                </span>
                <span className="font-mono-code text-[10px] text-[#D4A843]/70">
                  STATUS: {evt.status}
                </span>
              </div>

              <h3 className="font-serif-heading text-lg font-bold text-[#E5E5E7] mb-2 group-hover:text-[#D4A843] transition-colors">
                <TextScramble text={evt.title} hoverToScramble={true} />
              </h3>

              <div className="font-mono-code text-xs text-[#39FF14] mb-3 flex items-center gap-1.5 glow-green">
                <Calendar size={13} />
                <span>{evt.date}</span>
              </div>

              <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
