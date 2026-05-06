import React, { useState } from 'react';
import { MessageCircle, Copy, CheckCircle2 } from 'lucide-react';
import { BRAND_CONTACT } from '../data/mockData';

const Facebook = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Toast = ({ message, visible }) => (
  <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
    <CheckCircle2 className="w-5 h-5 text-green-400" />
    <span className="text-sm font-bold whitespace-nowrap">{message}</span>
  </div>
);

const SocialMatrix = ({ className = "" }) => {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(BRAND_CONTACT.line_id);
    setCopied(true);
    showNotification('已複製 ID，準備加入 LINE 好友');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineClick = (e) => {
    e.preventDefault();
    showNotification('感謝您支持小農，正在開啟 LINE 客服');
    setTimeout(() => {
      window.open('https://line.me/R/ti/p/@bej6255a', '_blank');
    }, 1500);
  };

  return (
    <div className={`bg-stone-100/50 rounded-[3.5rem] p-10 border border-stone-200/50 flex flex-col items-center text-center ${className} relative`}>
      <h3 className="text-xl font-black text-gray-900 mb-2">點擊與阿古力對話</h3>
      <p className="text-[10px] text-gray-400 font-bold mb-10 tracking-[0.2em] uppercase italic">Stay connected with our mission</p>
      
      <div className="flex flex-col gap-8 w-full max-w-[300px]">
        {/* IG with Descriptive Text */}
        <a 
          href="https://www.instagram.com/agric.tw" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white p-5 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center gap-5 group hover:border-pink-200 transition-all active:scale-[0.98]"
        >
          <div className="w-14 h-14 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-500/20 group-hover:rotate-[15deg] transition-transform">
            <Instagram className="w-7 h-7" />
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-gray-900">Instagram</p>
            <p className="text-[11px] text-gray-400 font-bold leading-relaxed">看阿古力田間日常</p>
          </div>
        </a>

        {/* FB */}
        <a 
          href="https://www.facebook.com/agric.tw" 
          target="_blank" 
          rel="noreferrer"
          className="bg-white p-5 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center gap-5 group hover:border-blue-200 transition-all active:scale-[0.98]"
        >
          <div className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:rotate-[-15deg] transition-transform">
            <Facebook className="w-7 h-7" />
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-gray-900">Facebook</p>
            <p className="text-[11px] text-gray-400 font-bold leading-relaxed">最新活動與永續資訊</p>
          </div>
        </a>

        {/* LINE with Copy ID */}
        <div className="bg-white p-5 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col gap-4">
          <a 
            href="https://line.me/R/ti/p/@bej6255a" 
            target="_blank" 
            rel="noreferrer"
            onClick={handleLineClick}
            className="flex items-center gap-5 group transition-all"
          >
            <div className="w-14 h-14 bg-[#06C755] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-sm font-black text-gray-900">LINE 客服</p>
              <p className="text-[11px] text-gray-400 font-bold leading-relaxed">即時諮詢與訂單協助</p>
            </div>
          </a>
          <button 
            onClick={handleCopy}
            className="w-full bg-emerald-50/50 py-3 rounded-2xl border border-emerald-100 flex items-center justify-center gap-3 text-emerald-700 hover:bg-emerald-100 transition-colors active:scale-[0.98]"
          >
            <span className="text-[11px] font-black uppercase tracking-wider">
              ID: {BRAND_CONTACT.line_id}
            </span>
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="text-[11px] font-black">{copied ? '已複製成功' : '點擊複製 ID'}</span>
          </button>
        </div>
      </div>
      <Toast message={toastMessage} visible={showToast} />
    </div>
  );
};

export default SocialMatrix;
