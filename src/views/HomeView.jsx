import React from 'react';
import { Leaf, Gift, Building2, ChevronRight, Plus, Sprout, Heart } from 'lucide-react';
import { PRODUCTS, STORIES, RESTAURANTS } from '../data/mockData';
import AgricLogo from '../components/AgricLogo';


const HomeView = ({ setActiveTab, addToCart, setSelectedProduct }) => (
  <div className="pb-24 animate-in fade-in duration-300">
    {/* 品牌標頭 (Branding Hero) */}
    <div className="relative h-72 bg-emerald-800 flex flex-col items-center justify-center overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
        alt="Farm Landscape" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" 
      />
      <div className="relative z-10 text-center flex flex-col items-center px-6">
        <AgricLogo className="w-16 h-16 mb-4" />
        <h1 className="text-4xl font-black text-white tracking-[0.2em] mb-3 drop-shadow-lg">AGRIC 阿古力</h1>
        <p className="text-[13px] font-bold text-white bg-emerald-900/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-xl">
          連結田間故事與永續契作的食農藍圖
        </p>
      </div>
    </div>

    {/* 快捷功能 */}
    <div className="flex justify-around bg-white py-6 px-2 shadow-xl shadow-gray-200/50 rounded-[2.5rem] relative -mt-8 z-20 mx-4 border border-white/50">
      {[
        { icon: Leaf, label: '小農契作', color: 'text-emerald-600', bg: 'bg-emerald-50', tab: 'shop' },
        { icon: Gift, label: '六級加工', color: 'text-amber-500', bg: 'bg-amber-50', tab: 'shop' },
        { icon: Building2, label: '探索阿古力', color: 'text-teal-600', bg: 'bg-teal-50', tab: 'discover' },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center cursor-pointer active:scale-95 transition-all duration-300 px-2" onClick={() => setActiveTab(item.tab)}>
          <div className={`p-5 rounded-[2rem] ${item.bg} mb-3 shadow-inner group-hover:shadow-md transition-shadow`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <span className="text-[13px] text-gray-700 font-black tracking-tighter">{item.label}</span>
        </div>
      ))}
    </div>

    {/* 熱銷商品 */}
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-gray-800 border-l-4 border-emerald-600 pl-2">熱銷小農特產</h2>
        <span className="text-sm text-emerald-600 font-bold flex items-center cursor-pointer" onClick={() => setActiveTab('shop')}>逛全部 <ChevronRight className="w-4 h-4" /></span>
      </div>
      <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar">
        {PRODUCTS.filter(p => p.category === '熱銷商品').slice(0, 8).map(product => (
          <div key={product.id} className="min-w-[160px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden snap-start flex flex-col cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedProduct(product)}>
            <div className="relative aspect-square">
              <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.level2_details?.certification?.includes('有機') && (
                <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-md shadow-sm border border-white/20">
                  ORGANIC
                </div>
              )}
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="text-sm text-gray-800 font-bold line-clamp-2 h-10 leading-snug">{product.name}</h3>
              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-amber-600 font-black">
                  {product.price === null ? '請電洽' : `NT$${product.price}`}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }} 
                  className="bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-emerald-700 active:scale-90 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 精選農人誌 */}
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-black text-gray-800 border-l-4 border-emerald-600 pl-2">精選農人誌</h2>
        <span className="text-sm text-emerald-600 font-bold flex items-center cursor-pointer" onClick={() => setActiveTab('stories')}>更多故事 <ChevronRight className="w-4 h-4" /></span>
      </div>
      <div className="space-y-4">
        {STORIES.slice(0, 2).map(story => (
          <div key={story.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex gap-3 p-3">
            <img src={story.image} alt={story.title} className="w-24 h-24 object-cover rounded-xl shrink-0" />
            <div className="flex flex-col justify-center">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md w-fit mb-1 ${story.type === '活動' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {story.type}
              </span>
              <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1">{story.title}</h3>
              <p className="text-[11px] text-gray-500 line-clamp-1">{story.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* 合作綠色餐廳橫幅 */}
    <div className="mx-4 mt-8 bg-amber-50 rounded-[2rem] p-6 flex flex-col justify-center shadow-sm relative overflow-hidden group">
      <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500/10 group-hover:scale-110 transition-transform duration-700" />
      <h3 className="font-black text-amber-800 text-sm mb-2 flex items-center"><Sprout className="w-4 h-4 mr-1" /> 有機之心・美食餐廳</h3>
      <p className="text-xs text-amber-700/80 mb-3 leading-relaxed font-medium">我們與 {RESTAURANTS.slice(0,3).join('、')} 等在地餐廳合作，將有機食材搬上餐桌！</p>
    </div>

    {/* ESG 企業採購 Banner (UX 提醒實作) */}
    <div className="mx-4 mt-6 bg-emerald-900 rounded-[2rem] p-6 shadow-xl relative overflow-hidden group cursor-pointer" onClick={() => setActiveTab('esg')}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] text-emerald-400 font-black uppercase tracking-[0.2em]">B2B & ESG Solutions</span>
        </div>
        <h3 className="text-lg font-black text-white mb-2 leading-tight">量身打造企業綠色採購方案</h3>
        <p className="text-emerald-100/60 text-xs mb-4 font-medium">提升企業永續價值，讓您的每一份採購都轉化為社會正向影響力。</p>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-black">
          立即洽詢 ESG 合作 <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>

    {/* Social Footer */}
    <div className="mt-16 px-8 py-12 bg-white border-t border-gray-100/50 flex flex-col items-center text-center">
      <div className="flex gap-6 mb-8">
        <a href="#" className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm active:scale-90 transition-all">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="#" className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm active:scale-90 transition-all">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
        </a>
      </div>
      <div className="max-w-[280px]">
        <h4 className="text-gray-900 font-black mb-2 flex items-center justify-center gap-2">
          關注阿古力 <Sprout className="w-5 h-5 text-emerald-600" />
        </h4>
        <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-4">
          加入阿古力 LINE 官方帳號，獲取第一手有機農產優惠與田間生活驚喜！
        </p>
        <button className="bg-[#06C755] text-white font-black px-8 py-3 rounded-2xl text-[13px] shadow-xl shadow-green-600/20 active:scale-95 transition-all">
          立即加入 LINE 好友
        </button>
      </div>
      <p className="mt-12 text-[10px] text-gray-300 font-bold tracking-widest uppercase">
        Agric Social Enterprise © 2026
      </p>
    </div>
  </div>
);

export default HomeView;
