"use client";

import React from "react";

interface PlugboardCableProps {
  className?: string;
  horizontal?: boolean;
}

export const PlugboardCable: React.FC<PlugboardCableProps> = ({
  className = "",
  horizontal = true,
}) => {
  return (
    <div className={`w-full overflow-hidden my-4 ${className}`}>
      {horizontal ? (
        <svg viewBox="0 0 1200 40" className="w-full h-8 stroke-[#B87333]" fill="none">
          <path
            d="M 0 20 Q 300 38 600 20 T 1200 20"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="opacity-70"
          />
          <circle cx="200" cy="20" r="4" fill="#D4A843" />
          <circle cx="600" cy="20" r="4" fill="#D4A843" />
          <circle cx="1000" cy="20" r="4" fill="#D4A843" />
        </svg>
      ) : (
        <svg viewBox="0 0 40 400" className="h-full w-8 stroke-[#B87333]" fill="none">
          <path
            d="M 20 0 Q 38 100 20 200 T 20 400"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="opacity-70"
          />
          <circle cx="20" cy="100" r="4" fill="#D4A843" />
          <circle cx="20" cy="300" r="4" fill="#D4A843" />
        </svg>
      )}
    </div>
  );
};
