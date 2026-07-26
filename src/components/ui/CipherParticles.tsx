"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  text: string;
  size: number;
  opacity: number;
  color: string;
}

const CIPHER_SNIPPETS = [
  "XKQZM", "RPTLW", "BNGHS", "0101", "1010", "σ∈Sₙ", "|Sₙ|=n!", 
  "BOMBE", "TURING", "CIPHER", "E(x)", "MOD26", "λ(x)", "0110",
  "P=NP?", "DET(A)", "φ(n)", "HEX", "ENIGMA", "1940"
];

export const CipherParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize 65 floating & falling cipher text particles
    const particles: Particle[] = Array.from({ length: 65 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 1.5,
      text: CIPHER_SNIPPETS[Math.floor(Math.random() * CIPHER_SNIPPETS.length)],
      size: 10 + Math.floor(Math.random() * 6),
      opacity: 0.15 + Math.random() * 0.4,
      color: Math.random() > 0.4 ? "#39FF14" : "#D4A843",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Mouse Tracking Light Aura on Canvas
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
        gradient.addColorStop(0, "rgba(212, 168, 67, 0.25)");
        gradient.addColorStop(0.5, "rgba(57, 255, 20, 0.08)");
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mx, my, 280, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Floating & Falling Cipher Rain Particles
      particles.forEach((p) => {
        // Move downwards
        p.y += p.speed;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.text = CIPHER_SNIPPETS[Math.floor(Math.random() * CIPHER_SNIPPETS.length)];
        }

        // Slight mouse displacement interaction
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let offsetX = 0;
        let offsetY = 0;
        if (dist < 180) {
          const force = (180 - dist) / 180;
          offsetX = (dx / dist) * force * 25;
          offsetY = (dy / dist) * force * 25;
        }

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dist < 200 ? Math.min(p.opacity + 0.3, 0.85) : p.opacity;
        ctx.fillText(p.text, p.x + offsetX, p.y + offsetY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
