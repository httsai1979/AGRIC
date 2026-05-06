import React from 'react';
import { User, Package, MessageSquare, HelpCircle, ShieldCheck, CreditCard, ChevronRight, LogOut, PhoneCall } from 'lucide-react';
import { SUPPORT_INFO } from '../data/mockData';

const MemberView = () => (
  <div className="pb-24 animate-in fade-in duration-500 bg-gray-50 min-h-screen">
    {/* Profile Header */}
    <div className="bg-white p-8 rounded-b-[3rem] shadow-sm mb-6 flex flex-col items-center">
      <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-emerald-50 shadow-inner">
        <User className="w-12 h-12 text-emerald-600" />
      </div>
      <h2 className="text-xl font-black text-gray-900">小農守護者 #0812</h2>
      <p className="text-xs text-gray-400 font-bold mt-1">普通會員 | 累積點數：120pt</p>
    </div>

    <div className="px-5 space-y-6">
      {/* Order Tracking Placeholder */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-black text-gray-800 flex items-center">
            <Package className="w-5 h-5 mr-2 text-emerald-600" /> 我的訂單
          </h3>
          <span className="text-[10px] text-emerald-600 font-black flex items-center">全部訂單 <ChevronRight className="w-3 h-3" /></span>
        </div>
        <div className="flex justify-around py-2">
          {[
            { label: '待付款', icon: CreditCard },
            { label: '待出貨', icon: Package },
            { label: '待收貨', icon: ShieldCheck },
            { label: '退換貨', icon: MessageSquare },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust & Support (FAQ) */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
        <h3 className="font-black text-gray-800 flex items-center mb-4">
          <HelpCircle className="w-5 h-5 mr-2 text-amber-500" /> 常見問題與規範
        </h3>
        <div className="space-y-4">
          {SUPPORT_INFO.faq.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <p className="text-sm font-black text-gray-700 mb-1 group-hover:text-emerald-600 transition-colors">Q: {item.q}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-50">
          <h4 className="text-[10px] text-gray-400 font-black uppercase mb-3 tracking-widest">退換貨須知</h4>
          <p className="text-xs text-gray-500 leading-relaxed bg-amber-50 p-4 rounded-2xl border border-amber-100">
            {SUPPORT_INFO.return_policy}
          </p>
        </div>
      </div>

      {/* Customer Service */}
      <div className="bg-emerald-900 rounded-[2rem] p-6 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <h3 className="font-black text-lg mb-2 flex items-center relative z-10">
          <MessageSquare className="w-5 h-5 mr-2 text-emerald-400" /> 需要協助？
        </h3>
        <p className="text-emerald-100/70 text-xs mb-6 leading-relaxed relative z-10">
          我們的客服專員將於週一至週五 09:00 - 18:00 為您服務。
        </p>
        <div className="flex gap-3 relative z-10">
          <button className="flex-1 bg-white text-emerald-900 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            <PhoneCall className="w-4 h-4" /> 撥打客服
          </button>
          <button className="flex-1 bg-emerald-500 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            LINE 客服
          </button>
        </div>
      </div>

      {/* Logout / Other */}
      <button className="w-full flex items-center justify-center gap-2 text-gray-400 font-black py-8 text-sm hover:text-red-500 transition-colors">
        <LogOut className="w-4 h-4" /> 登出帳號
      </button>
    </div>
  </div>
);

export default MemberView;
