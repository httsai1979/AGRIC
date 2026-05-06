import { Compass, BookOpen, Building2, HelpCircle, User, ChevronRight, ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import { BRAND_CONTACT, GLOBAL_LINKS } from '../data/mockData';
import SocialMatrix from '../components/SocialMatrix';

const DiscoveryCard = ({ title, subtitle, icon: Icon, onClick, color, bgColor }) => (
  <button 
    onClick={onClick}
    className="w-full bg-white rounded-[2.5rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-6 group hover:border-emerald-200 transition-all active:scale-[0.98]"
  >
    <div className={`w-16 h-16 ${bgColor} rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
      <Icon className={`w-8 h-8 ${color}`} />
    </div>
    <div className="flex-1 text-left">
      <h3 className="text-lg font-black text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-400 font-bold leading-relaxed">{subtitle}</p>
    </div>
    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
      <ChevronRight className="w-5 h-5" />
    </div>
  </button>
);

const DiscoverView = ({ navigateTo }) => {
  const menuItems = [
    { 
      id: 'stories', 
      title: '農人誌', 
      subtitle: '探索田間最真實的友善故事', 
      icon: BookOpen, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50' 
    },
    { 
      id: 'esg', 
      title: '企業永續', 
      subtitle: '量身打造的綠色採購與 ESG 方案', 
      icon: Building2, 
      color: 'text-teal-600', 
      bgColor: 'bg-teal-50' 
    },
    { 
      id: 'support', 
      title: '支援中心', 
      subtitle: '常見問題與退換貨政策說明', 
      icon: HelpCircle, 
      color: 'text-amber-500', 
      bgColor: 'bg-amber-50' 
    },
    { 
      id: 'member', 
      title: '會員中心', 
      subtitle: '查看訂單狀態與個人化設定', 
      icon: User, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50' 
    }
  ];

  return (
    <div className="pb-32 animate-in fade-in duration-500 bg-stone-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-emerald-900 pt-16 pb-20 px-8 rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-800/40 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700/20 rounded-full -ml-32 -mb-32 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 border border-white/20 shadow-2xl">
            <Compass className="w-10 h-10 text-emerald-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3 tracking-tight">探索阿古力</h1>
          <p className="text-emerald-100/60 text-sm font-medium max-w-[240px]">
            從土地到餐桌，發現更多關於永續生活的可能
          </p>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-6 -mt-12 relative z-10 space-y-4">
        {menuItems.map(item => (
          <DiscoveryCard 
            key={item.id}
            {...item}
            onClick={() => navigateTo(item.id)}
          />
        ))}
      </div>

      {/* 檢驗報告專區 */}
      <div className="mt-8 px-6">
        <a 
          href={GLOBAL_LINKS.inspection_reports}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-emerald-600 rounded-[2.5rem] p-8 shadow-xl shadow-emerald-900/20 flex items-center gap-6 group hover:bg-emerald-700 transition-all active:scale-[0.98]"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-black text-white mb-1">安心檢驗報告</h3>
            <p className="text-emerald-50/70 text-xs font-bold leading-relaxed">透明公開的食安紀錄，為您嚴格把關</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <ArrowRight className="w-5 h-5" />
          </div>
        </a>
      </div>

      {/* ESG 資源下載專區 */}
      <div className="mt-8 px-6">
        <button 
          onClick={() => navigateTo('esg')}
          className="w-full bg-teal-600 rounded-[2.5rem] p-8 shadow-xl shadow-teal-900/20 flex items-center gap-6 group hover:bg-teal-700 transition-all active:scale-[0.98] text-left"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-white mb-1">ESG 資源下載</h3>
            <p className="text-teal-50/70 text-xs font-bold leading-relaxed">企業永續提案與綠色採購文件</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Featured Insight / Info Box */}
      <div className="mt-8 px-6">
        <button 
          onClick={() => navigateTo('esg')}
          className="w-full bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden group text-left active:scale-[0.98] transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Brand Mission</span>
          </div>
          <h4 className="text-xl font-black text-gray-900 mb-4">由豐泰文教基金會<br/>獨資成立的社會企業</h4>
          <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
            自 2016 年以來，我們始終堅持與小農建立長期穩定的契作關係，為您把關每一份安心食材。
          </p>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-black">
            了解更多關於我們的故事 <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* 關注我們 Social Matrix */}
      <div className="mt-12 px-6">
        <SocialMatrix />
      </div>

      {/* Trust Badges */}
      <div className="mt-8 px-6 flex justify-around py-6 opacity-50">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-5 h-5 text-gray-400" />
          <span className="text-[8px] font-black uppercase text-gray-400">100% Traceable</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Leaf className="w-5 h-5 text-gray-400" />
          <span className="text-[8px] font-black uppercase text-gray-400">Eco Friendly</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Building2 className="w-5 h-5 text-gray-400" />
          <span className="text-[8px] font-black uppercase text-gray-400">ESG Support</span>
        </div>
      </div>
    </div>
  );
};

export default DiscoverView;
