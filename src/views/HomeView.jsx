import React from 'react';
import { Leaf, Gift, Building2, ChevronRight, Plus, Sprout, Heart } from 'lucide-react';
import { PRODUCTS, STORIES, RESTAURANTS } from '../data/mockData';
import AgricLogo from '../components/AgricLogo';


const HomeView = ({ setActiveTab, addToCart }) => (
  <div className="pb-24 animate-in fade-in duration-300">
    {/* 品牌標頭 */}
    <div className="relative h-64 bg-emerald-800 flex flex-col items-center justify-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?auto=format&fit=crop&q=80&w=800" alt="Farm" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
      <div className="relative z-10 text-center flex flex-col items-center px-4">
        <AgricLogo className="w-14 h-14 mb-3 border-2 border-emerald-400" />
        <h1 className="text-3xl font-black text-white tracking-widest mb-2 drop-shadow-md">AGRIC 阿古力</h1>
        <p className="text-sm font-medium text-emerald-50 bg-emerald-900/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
          連結田間故事與永續契作的食農藍圖
        </p>
      </div>
    </div>

    {/* 快捷功能 */}
    <div className="flex justify-around bg-white py-5 px-2 shadow-sm rounded-b-3xl relative -mt-4 z-20 mx-2">
      {[
        { icon: Leaf, label: '小農契作', color: 'text-emerald-600', bg: 'bg-emerald-50', tab: 'shop' },
        { icon: Gift, label: '六級加工', color: 'text-amber-500', bg: 'bg-amber-50', tab: 'shop' },
        { icon: Building2, label: 'ESG採購', color: 'text-teal-600', bg: 'bg-teal-50', tab: 'esg' },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform" onClick={() => setActiveTab(item.tab)}>
          <div className={`p-3.5 rounded-2xl ${item.bg} mb-2 shadow-inner`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <span className="text-xs text-gray-700 font-bold tracking-wide">{item.label}</span>
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
        {PRODUCTS.filter(p => p.category === '熱銷商品').slice(0, 4).map(product => (
          <div key={product.id} className="min-w-[160px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden snap-start flex flex-col">
            <div className="relative aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="text-sm text-gray-800 font-bold line-clamp-2 h-10 leading-snug">{product.name}</h3>
              <div className="mt-auto pt-2 flex items-center justify-between">
                <span className="text-amber-600 font-black">NT${product.price}</span>
                <button onClick={() => addToCart(product)} className="bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-emerald-700 active:scale-90 transition">
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
    <div className="mx-4 mt-8 mb-4 bg-amber-50 rounded-2xl p-4 flex flex-col justify-center border border-amber-100 shadow-sm relative overflow-hidden">
      <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500/10" />
      <h3 className="font-black text-amber-800 text-sm mb-2 flex items-center"><Sprout className="w-4 h-4 mr-1" /> 有機之心・美食餐廳</h3>
      <p className="text-xs text-amber-700/80 mb-3 leading-relaxed">我們與 {RESTAURANTS.slice(0,3).join('、')} 等在地餐廳合作，將有機食材搬上餐桌！</p>
    </div>
  </div>
);

export default HomeView;
