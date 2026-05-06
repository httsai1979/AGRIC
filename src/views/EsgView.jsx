import React from 'react';
import { Building2, Leaf, Sprout, Users } from 'lucide-react';
import { ESG_DATA } from '../data/mockData';

const EsgView = () => (
  <div className="pb-24 animate-in fade-in duration-300 bg-gray-50 min-h-screen">
    <div className="bg-emerald-800 pt-8 pb-10 px-6 rounded-b-[40px] shadow-md relative overflow-hidden">
      <Leaf className="absolute -right-10 -top-10 w-48 h-48 text-emerald-700/50 mix-blend-overlay" />
      <h1 className="text-2xl font-black text-white relative z-10">企業 ESG 永續服務</h1>
      <p className="text-emerald-100 text-sm mt-2 font-medium relative z-10 leading-relaxed">
        阿古力陪伴上市櫃企業，將「價格導向」轉向「價值導向」，共同實踐綠色採購與自然資本(TNFD)投資。
      </p>
    </div>

    <div className="px-4 -mt-6 relative z-20 space-y-4">
      {/* 服務項目 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-base font-black text-emerald-800 mb-4 flex items-center">
          <Sprout className="w-5 h-5 mr-2 text-amber-500" /> 六大永續解決方案
        </h2>
        <ul className="space-y-3">
          {ESG_DATA.esg_services.map((item, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700 font-medium leading-snug">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 目標客群 */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-base font-black text-emerald-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-amber-500" /> 合作對象與趨勢
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {ESG_DATA.target_clients.map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">{tag}</span>
          ))}
        </div>
        <div className="space-y-3">
          {ESG_DATA.key_trends.map((trend, idx) => (
            <div key={idx} className="text-xs text-gray-500 font-medium leading-relaxed bg-gray-50 p-3 rounded-xl">
              {trend}
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-amber-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-amber-500/30 hover:bg-amber-600 active:scale-95 transition mt-4 mb-8">
        聯絡專人規劃
      </button>
    </div>
  </div>
);

export default EsgView;
