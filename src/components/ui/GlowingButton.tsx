"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "amber" | "green" | "copper";
  children: React.ReactNode;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  variant = "amber",
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    amber:
      "bg-[#D4A843]/10 text-[#D4A843] border-[#D4A843] hover:bg-[#D4A843] hover:text-black hover:shadow-[0_0_25px_rgba(212,168,67,0.7)]",
    green:
      "bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14] hover:bg-[#39FF14] hover:text-black hover:shadow-[0_0_25px_rgba(57,255,20,0.7)]",
    copper:
      "bg-[#B87333]/10 text-[#B87333] border-[#B87333] hover:bg-[#B87333] hover:text-white hover:shadow-[0_0_25px_rgba(184,115,51,0.7)]",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 border text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 rounded-xl cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A843] active:scale-95 min-h-[44px]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};
