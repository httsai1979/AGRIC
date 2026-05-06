import React from 'react';
import { Leaf } from 'lucide-react';

const AgricLogo = ({ className = "w-12 h-12" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Outer Earth Circle */}
    <div className="absolute inset-0 bg-[#78350f]/10 rounded-full scale-110"></div>
    {/* Main Circle */}
    <div className="relative w-full h-full bg-white rounded-full p-2 shadow-xl border-2 border-[#14532d]/20 flex items-center justify-center overflow-hidden group">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#14532d] stroke-[6]" strokeLinecap="round" strokeLinejoin="round">
        {/* Abstract Leaf/Sprout Totem */}
        <path d="M50 85 C 50 85, 20 60, 20 40 A 30 30 0 0 1 80 40 C 80 60, 50 85, 50 85 Z" fill="#14532d" fillOpacity="0.1" />
        <path d="M50 20 V 85" className="group-hover:stroke-emerald-600 transition-colors" />
        <path d="M50 40 Q 80 35, 75 60" />
        <path d="M50 55 Q 20 50, 25 75" />
        <circle cx="50" cy="15" r="5" fill="#78350f" stroke="none" />
      </svg>
    </div>
  </div>
);

export default AgricLogo;
