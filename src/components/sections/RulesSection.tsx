"use client";

import React from "react";
import { TextScramble } from "@/components/ui/TextScramble";
import { ShieldCheck, Users, Globe, Monitor, AlertTriangle, Trophy } from "lucide-react";

const rules = [
  {
    icon: Globe,
    color: "#D4A843",
    title: "ELIGIBILITY",
    items: [
      "Open to all undergraduate students nationwide across Sri Lanka.",
      "Participants must be currently enrolled at a recognized university.",
      "Both local and international undergraduates may participate.",
    ],
  },
  {
    icon: Users,
    color: "#D4A843",
    title: "TEAM STRUCTURE",
    items: [
      "Participants may compete individually or in teams of 1 to 3 members.",
      "All team members must be from the same university.",
      "Teams must be registered as a unit — no mid-competition merges.",
    ],
  },
  {
    icon: ShieldCheck,
    color: "#D4A843",
    title: "REGISTRATION",
    items: [
      "All participants must register via the official registration link.",
      "Registration must be completed before the stated deadline.",
      "Only registered participants are eligible to compete in any round.",
    ],
  },
  {
    icon: Monitor,
    color: "#B87333",
    title: "VIRTUAL ROUND",
    items: [
      "The qualifying virtual hackathon is conducted online via HackerRank.",
      "Duration: 6 hours. Participants must complete the round independently.",
      "Any form of external assistance or plagiarism results in disqualification.",
    ],
  },
  {
    icon: Trophy,
    color: "#D4A843",
    title: "FINAL ROUND",
    items: [
      "Top 10 performers from the virtual round qualify for the on-campus finale.",
      "The finale is a 4-hour event held at the University of Moratuwa.",
      "Cash prizes will be awarded to the top 3 teams or individuals.",
    ],
  },
  {
    icon: AlertTriangle,
    color: "#B87333",
    title: "GENERAL CONDUCT",
    items: [
      "Participants must adhere to the competition's code of conduct at all times.",
      "Organizers reserve the right to disqualify any participant for misconduct.",
      "The organizing committee's decisions are final and binding.",
    ],
  },
];

export const RulesSection: React.FC = () => {
  return (
    <section id="rules" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // OPERATIONAL DIRECTIVES
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="RULES &amp; REGULATIONS" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          All participants are required to read and comply with the following guidelines before registering.
        </p>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {rules.map((rule, idx) => {
          const IconComponent = rule.icon;
          return (
            <div
              key={idx}
              className="bg-[#1C1C1E] border border-[#B87333]/60 p-6 rounded-2xl flex flex-col gap-4 hover:border-[#D4A843] hover:shadow-[0_0_20px_rgba(212,168,67,0.2)] transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl bg-[#0A0A0A] border flex items-center justify-center shrink-0"
                  style={{ borderColor: `${rule.color}55` }}
                >
                  <IconComponent size={18} style={{ color: rule.color }} />
                </div>
                <h3
                  className="font-mono-code text-sm font-bold tracking-wider"
                  style={{ color: rule.color }}
                >
                  {rule.title}
                </h3>
              </div>

              {/* Rule Items */}
              <ul className="space-y-2.5">
                {rule.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-xs text-[#8E8E93] leading-relaxed">
                    <span className="text-[#39FF14] font-mono-code mt-0.5 shrink-0">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Summary Banner */}
      <div className="mt-12 bg-[#1C1C1E] border border-[#D4A843]/40 rounded-2xl p-6 sm:p-8 font-mono-code text-xs text-center space-y-2">
        <div className="text-[#D4A843] font-bold tracking-widest text-sm">QUICK REFERENCE</div>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[#8E8E93] pt-2">
          <span><span className="text-[#39FF14]">&gt;</span> Teams: 1–3 members · Same university</span>
          <span><span className="text-[#39FF14]">&gt;</span> Qualifying: 6-hr online · HackerRank</span>
          <span><span className="text-[#39FF14]">&gt;</span> Finale: 4-hr on-campus · UoM</span>
          <span><span className="text-[#39FF14]">&gt;</span> Prizes: Top 3 teams · Cash awards</span>
        </div>
      </div>
    </section>
  );
};
