import React from 'react';
import { Building2, Leaf, Sprout, Users, CheckCircle2, TrendingUp, Mail, ArrowLeft, Download } from 'lucide-react';
import { ESG_DATA } from '../data/mockData';

const EsgView = ({ onBack }) => (
  <div className="pb-24 animate-in fade-in duration-500 bg-gray-50 min-h-screen">
    {/* Professional Header */}
    <div className="bg-emerald-900 pt-12 pb-16 px-8 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
      <button 
        onClick={onBack}
        className="mb-6 bg-white/10 backdrop-blur-md text-white p-2 rounded-xl hover:bg-white/20 transition-colors border border-white/10"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700/20 rounded-full -ml-20 -mb-20 blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500/20 rounded-xl backdrop-blur-sm border border-emerald-400/30">
            <Building2 className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">B2B Sustainability</span>
        </div>
        <h1 className="text-3xl font-black text-white mb-4 leading-tight">企業 ESG <br/>永續轉型解決方案</h1>
        <p className="text-emerald-100/80 text-sm font-medium leading-relaxed max-w-xs">
          阿古力陪伴企業將「價格導向」轉向「價值導向」，透過食農教育與綠色採購實踐自然資本投資。
        </p>
      </div>
    </div>

    <div className="px-5 -mt-8 relative z-20 space-y-6">
      {/* Services Section */}
      <div className="bg-white rounded-[2.5rem] p-7 shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-gray-900 flex items-center">
            <Sprout className="w-6 h-6 mr-2 text-emerald-600" /> 六大永續解決方案
          </h2>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="grid gap-4">
          {ESG_DATA.esg_services.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 group hover:bg-emerald-50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-700 font-bold leading-snug group-hover:text-emerald-900">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Download Section */}
      <div className="bg-white rounded-[2.5rem] p-7 shadow-xl shadow-gray-200/50 border border-gray-100">
        <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center">
          <Download className="w-6 h-6 mr-2 text-emerald-600" /> 資源下載專區
        </h2>
        
        <div className="space-y-4">
          {[
            {
              title: '2025 企業福委會 ESG 綠色採購提案',
              summary: '針對企業福委會設計，涵蓋節慶禮盒、員工日常採購及綠色點心方案，協助企業實踐永續採購並提升員工滿意度。',
              link: '#'
            },
            {
              title: '阿古力社會企業：企業永續與員工福祉共好提案',
              summary: '深度結合食農教育與企業內部活動，透過契作認養、產地參訪與產地到餐桌的實踐，強化員工對企業 ESG 目標的認同感與參與度。',
              link: '#'
            }
          ].map((doc, i) => (
            <div key={i} className="group p-5 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-black text-gray-800 group-hover:text-emerald-900 mb-2">{doc.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{doc.summary}</p>
                </div>
                <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Clients & Trends */}
      <div className="bg-white rounded-[2.5rem] p-7 shadow-xl shadow-gray-200/50 border border-gray-100">
        <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-amber-500" /> 合作價值與市場趨勢
        </h2>
        
        <div className="mb-6">
          <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-3">Key Target Clients</p>
          <div className="flex flex-wrap gap-2">
            {ESG_DATA.target_clients.map((tag, i) => (
              <span key={i} className="bg-amber-50 text-amber-700 text-[10px] font-black px-4 py-2 rounded-xl border border-amber-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Industry Trends</p>
          {ESG_DATA.key_trends.map((trend, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <p className="text-xs text-gray-600 font-bold leading-relaxed">{trend}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="pt-4 pb-8">
        <button className="w-full bg-emerald-600 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-emerald-600/40 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
          <Mail className="w-5 h-5" />
          聯絡專人規劃企業方案
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-4 font-bold">
          已有超過 50 家上市櫃企業選擇阿古力作為永續夥伴
        </p>
      </div>
    </div>
  </div>
);

export default EsgView;
