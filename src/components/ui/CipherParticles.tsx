"use client";

import React, { useEffect, useRef, useState } from "react";

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
  "P=NP?", "DET(A)", "φ(n)", "HEX", "ENIGMA", "1940",
  "10110", "01001", "XOR", "AES", "RSA", "∑∞", "∇²ψ", "Δx",
];

export const CipherParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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

    // Initialize 80 floating & falling cipher text particles
    const particles: Particle[] = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.4 + Math.random() * 1.6,
      text: CIPHER_SNIPPETS[Math.floor(Math.random() * CIPHER_SNIPPETS.length)],
      size: 10 + Math.floor(Math.random() * 7),
      opacity: 0.12 + Math.random() * 0.35,
      color: Math.random() > 0.4 ? "#39FF14" : "#D4A843",
    }));

    const render = () => {
      // Fade trail — dark semi-transparent fill instead of clearRect gives matrix rain feel
      ctx.fillStyle = "rgba(10, 10, 10, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // Mouse Tracking Light Aura on Canvas
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 320);
        gradient.addColorStop(0, "rgba(212, 168, 67, 0.22)");
        gradient.addColorStop(0.45, "rgba(57, 255, 20, 0.07)");
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mx, my, 320, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Floating & Falling Cipher Rain Particles
      particles.forEach((p) => {
        // Move downwards (matrix rain)
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
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          offsetX = (dx / dist) * force * 28;
          offsetY = (dy / dist) * force * 28;
        }

        ctx.save();
        ctx.font = `${p.size}px "JetBrains Mono", "Courier New", monospace`;
        ctx.globalAlpha = dist < 200 ? Math.min(p.opacity + 0.4, 0.9) : p.opacity;
        ctx.fillStyle = p.color;
        // Add glow effect for particles near the cursor
        if (dist < 200) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillText(p.text, p.x + offsetX, p.y + offsetY);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  // Don't render canvas on server — avoids hydration mismatch
  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
