"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  autostart?: boolean;
  scrambleSpeed?: number;
  hoverToScramble?: boolean;
  periodicInterval?: number; // Optional periodic auto scramble in ms
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*ØΣΔλΩ";

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = "",
  autostart = true,
  scrambleSpeed = 35,
  hoverToScramble = true,
  periodicInterval,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 2.5;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2.5) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, scrambleSpeed);
  }, [text, scrambleSpeed]);

  // Initial scramble on mount
  useEffect(() => {
    if (autostart) {
      triggerScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autostart, triggerScramble]);

  // Optional periodic auto-scramble
  useEffect(() => {
    if (!periodicInterval) return;
    const timer = setInterval(() => {
      triggerScramble();
    }, periodicInterval);
    return () => clearInterval(timer);
  }, [periodicInterval, triggerScramble]);

  return (
    <span
      onMouseEnter={() => {
        if (hoverToScramble) triggerScramble();
      }}
      className={`cursor-pointer inline-block transition-colors duration-200 ${
        isScrambling ? "text-[#39FF14] glow-green font-mono-code" : ""
      } ${className}`}
    >
      {displayText}
    </span>
  );
};
