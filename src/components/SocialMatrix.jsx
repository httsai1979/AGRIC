import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle, Copy, CheckCircle2 } from 'lucide-react';
import { BRAND_CONTACT } from '../data/mockData';

const SocialMatrix = ({ className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BRAND_CONTACT.line_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-stone-100/50 rounded-[3rem] p-10 border border-stone-200/50 flex flex-col items-center text-center ${className}`}>
      <h3 className="text-lg font-black text-gray-900 mb-2">關注我們</h3>
      <p className="text-[10px] text-gray-400 font-bold mb-8 tracking-widest uppercase">Stay connected with our mission</p>
      
      <div className="flex flex-col gap-6 w-full max-w-[280px]">
        {/* IG with Descriptive Text */}
        <a 
          href={BRAND_CONTACT.instagram} 
          target="_blank" 
          rel="noreferrer"
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:border-pink-200 transition-all"
        >
          <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
            <Instagram className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="text-xs font-black text-gray-900">Instagram</p>
            <p className="text-[10px] text-gray-400 font-bold">看阿古力田間日常</p>
          </div>
        </a>

        {/* FB */}
        <a 
          href={BRAND_CONTACT.facebook} 
          target="_blank" 
          rel="noreferrer"
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group hover:border-blue-200 transition-all"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <Facebook className="w-6 h-6" />
          </div>
          <div className="text-left">
            <p className="text-xs font-black text-gray-900">Facebook</p>
            <p className="text-[10px] text-gray-400 font-bold">最新活動與永續資訊</p>
          </div>
        </a>

        {/* LINE with Copy ID */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
          <a 
            href={BRAND_CONTACT.line} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-4 group transition-all"
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-gray-900">LINE 客服</p>
              <p className="text-[10px] text-gray-400 font-bold">即時諮詢與訂單協助</p>
            </div>
          </a>
          <button 
            onClick={handleCopy}
            className="w-full bg-emerald-50 py-2 rounded-xl border border-emerald-100 flex items-center justify-center gap-2 text-emerald-700 hover:bg-emerald-100 transition-colors active:scale-[0.98]"
          >
            <span className="text-[10px] font-black uppercase tracking-wider">
              ID: {BRAND_CONTACT.line_id}
            </span>
            {copied ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="text-[10px] font-black">{copied ? '已複製' : '點擊複製'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMatrix;
