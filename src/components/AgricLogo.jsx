import React from 'react';
import { Sprout } from 'lucide-react';

const AgricLogo = ({ className = "w-8 h-8" }) => (
  <div className={`flex items-center justify-center bg-white rounded-full p-2 shadow-md border-2 border-emerald-100 ${className}`}>
    <Sprout className="w-full h-full text-emerald-600" />
  </div>
);

export default AgricLogo;
