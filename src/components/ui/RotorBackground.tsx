"use client";

import React, { useEffect, useState } from "react";

// Pre-compute static pin positions once so they are identical on every render
// (avoids float-precision hydration mismatch between SSR and client).
const ROTOR_A_PINS = Array.from({ length: 26 }).map((_, i) => {
  const angle = (i * 360) / 26;
  const rad = (angle * Math.PI) / 180;
  const x1 = Number((250 + 160 * Math.cos(rad)).toFixed(4));
  const y1 = Number((250 + 160 * Math.sin(rad)).toFixed(4));
  const x2 = Number((250 + 200 * Math.cos(rad)).toFixed(4));
  const y2 = Number((250 + 200 * Math.sin(rad)).toFixed(4));
  return { x1, y1, x2, y2 };
});

const ROTOR_B_WIRES = Array.from({ length: 13 }).map((_, i) => {
  const a1 = (i * 360) / 26;
  const a2 = ((i + 7) * 360) / 26;
  const r1 = (a1 * Math.PI) / 180;
  const r2 = (a2 * Math.PI) / 180;
  const x1 = Number((250 + 120 * Math.cos(r1)).toFixed(4));
  const y1 = Number((250 + 120 * Math.sin(r1)).toFixed(4));
  const x2 = Number((250 + 120 * Math.cos(r2)).toFixed(4));
  const y2 = Number((250 + 120 * Math.sin(r2)).toFixed(4));
  return { x1, y1, x2, y2 };
});

export const RotorBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [normMouse, setNormMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setNormMouse({ x: normX, y: normY });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Don't render anything on server — avoids hydration float-precision mismatch
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Authentic Bletchley Lamp Cursor Light Aura Tracking Mouse */}
      <div
        className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[110px] transition-transform duration-300 ease-out opacity-30"
        style={{
          left: `${mousePos.x - 300}px`,
          top: `${mousePos.y - 300}px`,
          background: "radial-gradient(circle, rgba(212,168,67,0.45) 0%, rgba(57,255,20,0.15) 45%, transparent 70%)",
        }}
      />

      {/* Subtle Laser Crosshair Axis Following Mouse */}
      <div
        className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-[#39FF14]/15 to-transparent transition-all duration-150 ease-out"
        style={{ left: `${mousePos.x}px` }}
      />
      <div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A843]/15 to-transparent transition-all duration-150 ease-out"
        style={{ top: `${mousePos.y}px` }}
      />

      {/* Primary Enigma Rotor Wireframe - Top Right (Tilt & Scroll Rotation) */}
      <div
        className="absolute -top-16 -right-16 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] transition-transform duration-300 ease-out opacity-20"
        style={{
          transform: `translate3d(${normMouse.x * -35}px, ${normMouse.y * -35}px, 0) rotate(${scrollY * 0.12 + normMouse.x * 20}deg)`,
        }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full stroke-[#D4A843]" fill="none" strokeWidth="1">
          <circle cx="250" cy="250" r="240" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="200" strokeDasharray="12 6" />
          <circle cx="250" cy="250" r="160" />
          <circle cx="250" cy="250" r="100" strokeDasharray="2 4" />
          <circle cx="250" cy="250" r="40" />

          {/* Rotor Pins & Contacts — pre-computed to fixed 4 decimals */}
          {ROTOR_A_PINS.map((pin, i) => (
            <g key={i}>
              <line x1={pin.x1} y1={pin.y1} x2={pin.x2} y2={pin.y2} stroke="#D4A843" strokeWidth="1.5" />
              <circle cx={pin.x2} cy={pin.y2} r="3" fill="#B87333" />
            </g>
          ))}
        </svg>
      </div>

      {/* Secondary Enigma Rotor Wireframe - Bottom Left */}
      <div
        className="absolute -bottom-24 -left-24 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] transition-transform duration-300 ease-out opacity-20"
        style={{
          transform: `translate3d(${normMouse.x * 45}px, ${normMouse.y * 45}px, 0) rotate(${-scrollY * 0.08 - normMouse.y * 18}deg)`,
        }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full stroke-[#B87333]" fill="none" strokeWidth="1">
          <circle cx="250" cy="250" r="230" strokeDasharray="8 8" />
          <circle cx="250" cy="250" r="180" />
          <circle cx="250" cy="250" r="120" strokeDasharray="10 10" />
          <circle cx="250" cy="250" r="60" />

          {/* Internal Wiring Connections — pre-computed to fixed 4 decimals */}
          {ROTOR_B_WIRES.map((wire, i) => (
            <path
              key={i}
              d={`M ${wire.x1} ${wire.y1} Q 250 250 ${wire.x2} ${wire.y2}`}
              stroke="#D4A843"
              strokeWidth="0.8"
              opacity="0.6"
            />
          ))}
        </svg>
      </div>

      {/* Floating Mathematical Formula Ambient Nodes reacting to mouse movement */}
      <div
        className="absolute inset-0 font-mono-code text-[11px] text-[#39FF14]/20 p-8 sm:p-16 flex flex-wrap justify-between items-center gap-16 sm:gap-24 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${normMouse.x * 20}px, ${normMouse.y * 20}px, 0)`,
        }}
      >
        <span className="glow-green">σ ∈ Sₙ</span>
        <span className="text-[#D4A843]/30 font-serif-heading italic text-sm">|Sₙ| = n!</span>
        <span>E(x) = P(R(P(x)))</span>
        <span className="glow-amber text-[#D4A843]/40">λ(x) = x ⊕ K</span>
        <span>det(A - λI) = 0</span>
        <span className="text-[#39FF14]/40 font-bold">P = NP ?</span>
        <span>φ(n) = (p-1)(q-1)</span>
        <span>H(X) = -∑ p(x) log p(x)</span>
      </div>
    </div>
  );
};
