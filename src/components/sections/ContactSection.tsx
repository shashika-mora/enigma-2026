"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { Phone, UserCheck, Shield } from "lucide-react";

const coChairs = [
  {
    name: "Vishwa Srinath",
    role: "Co-Chair",
    photo: "/contact/co-chair-Vishwa-Srinath.jpeg",
    phone: "+94 71 345 5941",
  },
  {
    name: "Thisandi Rajapaksha",
    role: "Co-Chair",
    photo: "/contact/co-chair-Thisandi-Rajapaksha.jpeg",
    phone: "+94 70 350 4806",
  },
  {
    name: "Thisara Adhikarinayake",
    role: "Co-Chair",
    photo: "/contact/co-chair-Thisara-Adhikarinayake.jpeg",
    phone: "+94 71 928 7736",
  },
];

const leads = [
  {
    name: "Dilumi Ganhewa",
    role: "Delegate Handling Lead",
    photo: "/contact/Delegate-Handling-Lead-Dilumi-Ganhewa.jpg",
  },
  {
    name: "Venura Shiromal",
    role: "Design Lead",
    photo: "/contact/Design-Lead-Venura-Shiromal.jpeg",
  },
  {
    name: "Lithmi Hemachandra",
    role: "Editorial Lead",
    photo: "/contact/Editorial-Lead-Lithmi-Hemachandra.jpeg",
  },
  {
    name: "Thisangi Dewmini",
    role: "Publicity Committee Lead",
    photo: "/contact/Publicity-committee-lead-Thisangi-Dewmini.jpg",
  },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // FIELD OPERATIONS &amp; CONTACT
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="ORGANIZING COMMITTEE" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          Reach out to our committee leads for queries regarding clearance, rules, or logistics.
        </p>
      </div>

      {/* Co-Chairs */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Shield size={14} className="text-[#D4A843]" />
          <span className="font-mono-code text-xs text-[#D4A843] tracking-widest uppercase">Co-Chairs</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {coChairs.map((person, idx) => (
            <div
              key={idx}
              className="bg-[#1C1C1E] border border-[#B87333] p-5 sm:p-6 rounded-2xl relative flex items-center gap-4 sm:gap-5 group hover:border-[#D4A843] transition-colors shadow-lg"
            >
              {/* Profile Avatar */}
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 bg-[#0A0A0A] border border-[#D4A843]/60 rounded-xl shrink-0 overflow-hidden">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Profile Info */}
              <div className="space-y-1 overflow-hidden">
                <h3 className="font-serif-heading text-base sm:text-lg font-bold text-[#E5E5E7] group-hover:text-[#D4A843] transition-colors truncate">
                  <TextScramble text={person.name} hoverToScramble={true} />
                </h3>

                <div className="font-mono-code text-xs text-[#39FF14] flex items-center gap-1">
                  <UserCheck size={12} />
                  <span>{person.role}</span>
                </div>

                <div className="font-mono-code text-[11px] text-[#8E8E93] flex items-center gap-1 pt-1">
                  <Phone size={12} className="text-[#B87333]" />
                  <span>{person.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leads */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Shield size={14} className="text-[#B87333]" />
          <span className="font-mono-code text-xs text-[#B87333] tracking-widest uppercase">Committee Leads</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leads.map((person, idx) => (
            <div
              key={idx}
              className="bg-[#1C1C1E] border border-[#B87333]/60 p-5 rounded-2xl flex items-center gap-4 group hover:border-[#D4A843] transition-colors shadow-lg"
            >
              {/* Profile Avatar */}
              <div className="relative w-14 sm:w-16 h-14 sm:h-16 bg-[#0A0A0A] border border-[#B87333]/60 rounded-xl shrink-0 overflow-hidden">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Profile Info */}
              <div className="space-y-1 overflow-hidden">
                <h3 className="font-serif-heading text-sm font-bold text-[#E5E5E7] group-hover:text-[#D4A843] transition-colors">
                  <TextScramble text={person.name} hoverToScramble={true} />
                </h3>
                <div className="font-mono-code text-[10px] text-[#B87333] flex items-center gap-1">
                  <UserCheck size={11} />
                  <span className="leading-tight">{person.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

