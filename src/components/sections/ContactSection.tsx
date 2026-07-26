"use client";

import React from "react";
import Image from "next/image";
import { TextScramble } from "@/components/ui/TextScramble";
import { Phone, UserCheck } from "lucide-react";

export const ContactSection: React.FC = () => {
  const contacts = [
    { name: "Himath", role: "Chairperson", photo: "/contact/Himath.avif", phone: "+94 77 123 4567" },
    { name: "Nipun", role: "Event Co-Chair", photo: "/contact/Nipun.avif", phone: "+94 71 987 6543" },
    { name: "Manishi", role: "Secretary", photo: "/contact/Manishi.avif", phone: "+94 76 543 2109" },
    { name: "Nilakna", role: "Finance Lead", photo: "/contact/Nilakna.avif", phone: "+94 70 111 2233" },
    { name: "Nadha", role: "Technical Lead", photo: "/contact/Nadha.avif", phone: "+94 78 444 5566" },
    { name: "Thusajiny", role: "Logistics Lead", photo: "/contact/Thusajiny.avif", phone: "+94 75 777 8899" },
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12 sm:mb-16">
        <span className="font-mono-code text-xs text-[#39FF14] tracking-widest uppercase">
          // FIELD OPERATIONS & CONTACT
        </span>
        <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-[#D4A843]">
          <TextScramble text="ORGANIZING COMMITTEE" />
        </h2>
        <p className="font-sans text-[#8E8E93] max-w-xl mx-auto text-xs sm:text-sm">
          Reach out to our Bletchley committee leads for queries regarding clearance, rules, or logistics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {contacts.map((person, idx) => (
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
                className="object-cover group-hover:scale-105 transition-transform"
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
    </section>
  );
};
