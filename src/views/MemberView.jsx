import React from 'react';
import { User, Package, MessageSquare, HelpCircle, ShieldCheck, CreditCard, ChevronRight, LogOut, PhoneCall, Sprout } from 'lucide-react';
import { SUPPORT_INFO } from '../data/mockData';

const MemberView = ({ navigateTo }) => (
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

      {/* Support Center Link */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
        <h3 className="font-black text-gray-800 flex items-center mb-4">
          <HelpCircle className="w-5 h-5 mr-2 text-amber-500" /> 幫助與支援
        </h3>
        <div className="space-y-3">
          <button 
            onClick={() => navigateTo('support')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-gray-700">常見問題 FAQ</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600" />
          </button>
          
          <button 
            onClick={() => navigateTo('support')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-sm font-bold text-gray-700">幫助中心 / FAQ</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="px-1 flex gap-3">
        <a 
          href="tel:056337510" 
          className="flex-1 bg-white border border-gray-100 p-5 rounded-[2rem] shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-all"
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] font-black text-gray-700">聯絡客服專線</span>
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); alert('正在開啟 LINE 客服...'); }}
          className="flex-1 bg-white border border-gray-100 p-5 rounded-[2rem] shadow-sm flex flex-col items-center gap-2 active:scale-95 transition-all"
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[11px] font-black text-gray-700">LINE 線上客服</span>
        </a>
      </div>

      {/* About Section */}
      <div className="bg-stone-100/50 rounded-[2rem] p-6 border border-stone-200/50">
        <h3 className="font-black text-stone-800 flex items-center mb-3 text-sm">
          <Sprout className="w-4 h-4 mr-2 text-emerald-600" /> 關於阿古力
        </h3>
        <p className="text-[11px] text-stone-500 leading-relaxed font-medium">
          豐泰文教基金會 2016 年獨資成立。推廣永續農業與友善食農，守護土地，穩定小農銷路。
        </p>
      </div>

      {/* Logout */}
      <button className="w-full flex items-center justify-center gap-2 text-gray-400 font-black py-4 text-sm hover:text-red-500 transition-colors">
        <LogOut className="w-4 h-4" /> 登出帳號
      </button>
    </div>
  </div>
);

export default MemberView;
