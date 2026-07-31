"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TextScramble } from "@/components/ui/TextScramble";
import { Menu, X, ShieldAlert } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "ROUNDS", href: "#rounds" },
    { name: "RULES", href: "#rules" },
    { name: "TIMELINE", href: "#timeline" },
    { name: "GALLERY", href: "#gallery" },
    { name: "REGISTRATION", href: "#registration" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#B87333]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logos: Mathematics Society & Enigma Gold Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 border border-[#D4A843]/60 p-1 flex items-center justify-center bg-[#1C1C1E] rounded-xl group-hover:border-[#D4A843] transition-colors shadow-md">
            <Image
              src="/maths_society.png"
              alt="Mathematics Society Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="relative w-10 h-10 border border-[#D4A843]/60 p-1 flex items-center justify-center bg-[#1C1C1E] rounded-xl group-hover:border-[#D4A843] transition-colors shadow-md">
            <Image
              src="/enigmagoldnew.png"
              alt="Enigma Gold Emblem Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-serif-heading text-lg font-bold text-[#D4A843] tracking-widest group-hover:text-white transition-colors">
            <TextScramble text="ENIGMA 2026" periodicInterval={6000} />
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-mono-code font-semibold text-xs text-[#E5E5E7]/90 hover:text-[#D4A843] transition-colors tracking-wider uppercase flex items-center gap-1 group py-2"
            >
              <span className="text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                &gt;
              </span>
              <TextScramble text={link.name} hoverToScramble={true} />
            </Link>
          ))}
        </nav>

        {/* Status Clearance Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-[#1C1C1E] border border-[#39FF14]/50 rounded-xl font-mono-code text-xs text-[#39FF14] shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <span>STATUS: UNBROKEN CIPHER</span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#D4A843] border border-[#D4A843]/40 p-2 rounded-xl focus:outline-none bg-[#1C1C1E]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#B87333] px-6 pt-3 pb-6 space-y-3 font-mono-code text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm text-[#E5E5E7] hover:text-[#D4A843] border-b border-[#B87333]/20"
            >
              &gt; <TextScramble text={link.name} hoverToScramble={true} />
            </Link>
          ))}
          <div className="pt-2 text-xs text-[#39FF14] flex items-center gap-2">
            <ShieldAlert size={14} />
            <span>SECURITY LEVEL: CLASSIFIED</span>
          </div>
        </div>
      )}
    </header>
  );
};
