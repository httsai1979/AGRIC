import React, { useState } from 'react';
import { Building2, Leaf, Users, Heart, TrendingUp, Download, ArrowLeft, Gift } from 'lucide-react';

const ESG_SOLUTIONS = [
  {
    id: 1,
    title: '永續三節綠色採購',
    icon: Gift,
    caseStudy: '「糙吉萊斯禮盒」綠色採購',
    impact: '每盒減少 15% 碳足跡',
    desc: '從產地到餐桌的零碳排計畫，為企業員工打造專屬中秋、端午綠色禮盒，將預算轉化為實質的環境貢獻。'
  },
  {
    id: 2,
    title: '企業員工食農教育',
    icon: Leaf,
    caseStudy: '產地到餐桌系列講座',
    impact: '提升 80% 員工永續意識',
    desc: '深入淺出的綠色飲食講座，帶領員工認識在地食材與友善農法，強化企業內部永續共識。'
  },
  {
    id: 3,
    title: '綠色低碳餐飲服務',
    icon: Heart,
    caseStudy: '百人低碳員工餐計畫',
    impact: '大幅降低食物里程',
    desc: '選用雲林在地有機食材，為企業提供低碳排放的健康餐飲與茶會解決方案。'
  },
  {
    id: 4,
    title: '有機農場體驗與契作',
    icon: Building2,
    caseStudy: '企業專屬一畝田',
    impact: '認養 5 公頃有機轉型農地',
    desc: '帶領企業認養農地，員工親自參與農作，將 CSR 預算直接投資於自然資本。'
  },
  {
    id: 5,
    title: '企業家庭日 ESG 專案',
    icon: Users,
    caseStudy: '農村生態探索家庭日',
    impact: '深化家庭永續教育',
    desc: '結合生態導覽與親子共遊的家庭日方案，帶領員工與家人親近自然，落實企業社會責任。'
  },
  {
    id: 6,
    title: '企業永續報告書（CSR）',
    icon: TrendingUp,
    caseStudy: '完整減碳數據追蹤與故事',
    impact: '提供量化 ESG 績效',
    desc: '提供企業編撰 ESG 報告所需的永續量化數據與具體社會影響力故事。'
  }
];

const EsgView = ({ onBack }) => {
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [selectedRole, setSelectedRole] = useState('hr');

  return (
    <div className="pb-24 animate-in fade-in duration-500 bg-gray-50 min-h-screen">
      {/* Professional Header */}
      <div className="bg-emerald-900 pt-12 pb-16 px-8 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <button 
          onClick={onBack}
          className="mb-6 bg-white/10 backdrop-blur-md text-white p-2 rounded-xl hover:bg-white/20 transition-colors border border-white/10 relative z-20"
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
            <span className="text-emerald-400 font-black text-xs uppercase tracking-widest">B2B Consultant Portal</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-4 leading-tight">企業 ESG <br/>永續轉型解決方案</h1>
          <p className="text-emerald-100/80 text-sm font-medium leading-relaxed max-w-xs">
            阿古力陪伴企業將「價格導向」轉向「價值導向」，提供具體可行的綠色採購與永續提案。
          </p>
        </div>
      </div>

      <div className="px-5 -mt-8 relative z-20 space-y-6">
        {/* Solutions Grid */}
        <div className="bg-white rounded-[2.5rem] p-7 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-gray-900 flex items-center">
              <Leaf className="w-6 h-6 mr-2 text-emerald-600" /> 六大永續解決方案
            </h2>
          </div>
          <div className="grid gap-4">
            {ESG_SOLUTIONS.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedSolution(item)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-black leading-snug group-hover:text-emerald-800">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium mt-1">查看專案實績與減碳效益</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2026 ESG 提案資源中心 (Resource Center Hub) */}
        <div className="bg-emerald-50 rounded-[2.5rem] p-7 shadow-inner border border-emerald-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl"></div>
          <h2 className="text-lg font-black text-emerald-900 mb-6 flex items-center relative z-10">
            <Download className="w-6 h-6 mr-2 text-emerald-600" /> 2026 ESG 提案資源中心
          </h2>
          
          <div className="grid gap-4 relative z-10">
            {[
              {
                title: '2026 企業福委會綠色採購提案',
                tag: '採購/福委',
                link: '/asserts/docs/2026 企業福委會 ESG 綠色採購提案.pdf'
              },
              {
                title: '企業永續與員工福祉共好提案',
                tag: 'HR/永續部',
                link: '/asserts/docs/阿古力社會企業：企業永續與員工福祉共好提案.pdf'
              },
              {
                title: 'ESG 家庭日生態專案',
                tag: '活動企劃',
                link: '/asserts/docs/阿古力社會企業：企業永續與員工福祉共好提案.pdf'
              }
            ].map((doc, i) => (
              <a 
                key={i} 
                href={doc.link}
                download
                className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
              >
                <div className="w-12 h-14 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                   <span className="text-red-500 font-black text-[10px]">PDF</span>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-1 inline-block">{doc.tag}</span>
                  <h3 className="text-sm font-black text-gray-800 leading-tight">{doc.title}</h3>
                </div>
                <Download className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Immediate Inquiry CTA */}
        <div className="pt-2 pb-8">
          <div className="bg-white rounded-[2.5rem] p-7 shadow-xl shadow-emerald-900/5 border border-emerald-50">
            <h3 className="font-black text-gray-900 mb-2 text-center text-lg">獲取量身定制的 ESG 計畫</h3>
            <p className="text-xs text-gray-500 text-center mb-6 font-medium">請選擇您的身分，我們將為您提供專屬諮詢</p>
            
            <div className="flex gap-3 mb-6">
              <button 
                onClick={() => setSelectedRole('hr')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${selectedRole === 'hr' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-100 text-gray-400 hover:border-emerald-200'}`}
              >
                HR / 福委會
              </button>
              <button 
                onClick={() => setSelectedRole('purchasing')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${selectedRole === 'purchasing' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-100 text-gray-400 hover:border-emerald-200'}`}
              >
                採購 / 永續部
              </button>
            </div>
            
            <a 
              href={`https://line.me/R/ti/p/@agric?text=${encodeURIComponent(`您好，我是${selectedRole === 'hr' ? 'HR/福委會' : '採購/永續部'}代表，希望能了解 2026 ESG 解決方案的客製化規劃。`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#06C755] text-white font-black py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:bg-[#05b34c] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="w-5 h-5 flex items-center justify-center"><svg className="fill-current w-full h-full" viewBox="0 0 24 24"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.939 8.909 9.399 9.613.366.079.866.244.992.56.113.284.073.729.035.986l-.213 1.28c-.053.308-.242 1.189 1.042.648 1.283-.541 6.924-4.081 9.429-6.969 2.152-2.453 3.316-5.184 3.316-8.118zm-15.011 3.51h-2.923c-.347 0-.629-.281-.629-.629V5.811c0-.347.282-.629.629-.629s.629.282.629.629v6.745h1.665c.347 0 .629.282.629.629s-.282.629-.629.629zm3.565 0h-1.258c-.347 0-.629-.281-.629-.629V5.811c0-.347.282-.629.629-.629s.629.282.629.629v7.374c0 .348-.282.629-.629.629zm5.342-4.992l-2.031 2.802v2.19c0 .347-.282.629-.629.629s-.629-.282-.629-.629V5.811c0-.347.282-.629.629-.629s.629.282.629.629v4.544l1.986-2.738c.198-.271.584-.332.855-.133.272.198.332.583.133.855l-2.148 2.96 2.228 3.072c.181.249.127.598-.122.779-.101.073-.217.108-.331.108-.161 0-.319-.074-.418-.211l-2.072-2.857z"/></svg></span>
              獲取專屬企劃與報價
            </a>
          </div>
        </div>
      </div>

      {/* Case-Study Detail Modal */}
      {selectedSolution && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedSolution(null)}>
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 pb-12 animate-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-emerald-100 rounded-2xl text-emerald-600 shadow-sm border border-emerald-200">
                <selectedSolution.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-gray-900 leading-tight">{selectedSolution.title}</h2>
            </div>
            
            <div className="space-y-5">
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-inner">
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Featured Case Study</p>
                <h3 className="text-lg font-bold text-emerald-900 mb-3">{selectedSolution.caseStudy}</h3>
                <div className="inline-block bg-white text-emerald-700 text-xs font-black px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100">
                  ✨ {selectedSolution.impact}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {selectedSolution.desc}
              </p>
              
              {selectedSolution.id === 5 && (
                <div className="mt-4 bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <p className="text-xs font-black text-gray-800 mb-3 flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-500" /> 活動內容精選 (Activities):</p>
                  <ul className="list-none space-y-2 text-xs text-gray-600 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Eagle Observation (黑鳶生態觀察)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Night Ecology Tour (夜間生態導覽)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Farm-to-Table Workshop (產地到餐桌手作體驗)</li>
                  </ul>
                </div>
              )}
            </div>
            
            <button onClick={() => setSelectedSolution(null)} className="mt-8 w-full bg-gray-900 text-white font-bold py-4 rounded-xl active:scale-95 transition-transform hover:bg-gray-800 shadow-lg shadow-gray-900/20">
              返回解決方案
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsgView;
