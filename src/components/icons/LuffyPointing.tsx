import React from 'react';

export const LuffyPointing: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Dynamic Pointing Silhouette with Curly Nika Clouds */}
    <path d="M130 150 C110 110 150 70 190 90 C220 60 270 80 280 120 C320 130 340 180 310 210 C330 260 280 300 240 280 C200 320 140 300 130 250 C90 230 90 170 130 150 Z" fill="white" stroke="black" strokeWidth="8" strokeLinejoin="round" />
    <path d="M260 160 L360 130 L320 180 Z" fill="white" stroke="black" strokeWidth="8" strokeLinejoin="round" />
    <circle cx="210" cy="180" r="8" fill="black" />
    <circle cx="250" cy="180" r="8" fill="black" />
    <path d="M210 220 Q230 240 250 220" stroke="black" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);