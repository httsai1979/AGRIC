import React, { useState, useEffect } from 'react';
import { Leaf, Gift, Building2, ChevronRight, Plus, Heart, Loader2 } from 'lucide-react';
<<<<<<< HEAD
import { PRODUCTS, BLOG_POSTS, RESTAURANTS } from '../data/mockData';
=======
import { PRODUCTS, RESTAURANTS, BRAND_CONTACT } from '../data/mockData';
>>>>>>> fbabf8b4ab35bf35115887495726606fe4712d4f
import AgricLogo from '../components/AgricLogo';
import ProductImage from '../components/ProductImage';

const HomeView = ({ navigateTo, addToCart, setSelectedProduct }) => {
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    fetch('/data/stories.json')
      .then(res => res.json())
      .then(data => {
        const topStories = data.slice(0, 3); // Use top 3
        const aboutUsSlide = {
          id: 'about-us-hero',
          title: '源於一份守護土地的承諾',
          description: '由財團法人豐泰文教基金會獨資成立，以推廣永續農業、促進食品安全、提升有機農業產值為目標，帶動在地永續生態。',
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
          isAboutUs: true,
          type: 'Brand Legacy'
        };
        setFeaturedStories([aboutUsSlide, ...topStories]);
        setLoadingStories(false);
      })
      .catch(err => {
        console.error('Error loading stories for home:', err);
        setLoadingStories(false);
      });
  }, []);

  useEffect(() => {
    if (featuredStories.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIdx((prev) => (prev + 1) % featuredStories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredStories]);

  return (
    <div className="pb-24 animate-in fade-in duration-500">
      {/* Narrative-First Hero Carousel (Voice of the Land) */}
      <div className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        {featuredStories.length > 0 ? featuredStories.map((story, idx) => (
          <div 
            key={`hero-${story.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentHeroIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[var(--agric-cream)]"></div>
          </div>
        )) : (
          <div className="absolute inset-0 bg-emerald-900"></div>
        )}

        <div className="relative z-20 text-center flex flex-col items-center px-8 mt-12 w-full max-w-2xl">
          <div className="mb-8 animate-in zoom-in duration-1000">
            <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-[2rem] shadow-2xl inline-block border border-white">
              <AgricLogo className="w-40 md:w-56 h-auto" />
            </div>
          </div>
          
          <div className="space-y-6 w-full relative min-h-[220px] flex items-center justify-center">
            {featuredStories.length > 0 && featuredStories.map((story, idx) => (
              <div 
                key={`text-${story.id}`}
                className={`absolute inset-x-0 transition-all duration-1000 flex flex-col items-center justify-center ${idx === currentHeroIdx ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
              >
                <span className="text-amber-400 font-bold tracking-widest text-[10px] sm:text-xs mb-3 drop-shadow-md border border-amber-400/50 px-3 py-1 rounded-full backdrop-blur-sm uppercase">
                  {story.type === 'Brand Legacy' ? story.type : 'VOICE OF THE LAND'}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-2xl mb-4 text-center px-4">
                  {story.title}
                </h1>
                <div 
                  className="bg-black/30 backdrop-blur-md p-5 rounded-[2rem] border border-white/10 shadow-2xl w-full cursor-pointer hover:bg-black/40 transition-colors group"
                  onClick={() => story.isAboutUs ? navigateTo('about') : navigateTo('stories')}
                >
                  <p className="text-white/95 text-sm leading-relaxed font-medium line-clamp-3">
                    "{story.description}"
                  </p>
                  <div className="flex justify-end mt-3 text-emerald-300 text-xs font-bold items-center gap-1 group-hover:text-emerald-200 transition-colors">
                    {story.isAboutUs ? '探索品牌靈魂' : '閱讀完整故事'} <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-2">
            {featuredStories.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentHeroIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentHeroIdx ? 'w-8 bg-emerald-400' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Entry Points Upgrade */}
      <div className="flex justify-around bg-white py-5 px-2 shadow-xl shadow-gray-200/50 rounded-[2.5rem] relative -mt-8 z-30 mx-4 border border-white/50">
        {[
          { icon: Leaf, label: '小農契作', color: 'text-[#14532d]', bg: 'bg-emerald-50', view: 'shop', params: { initialCategory: '耘鄉好米' }, micro: '已支持 120 公頃有機轉型' },
          { icon: Gift, label: '六級加工', color: 'text-[#78350f]', bg: 'bg-amber-50', view: 'shop', params: { initialCategory: '小農特產' }, micro: '讓 100% 醜蔬果重獲新生' },
          { icon: Building2, label: '探索阿古力', color: 'text-teal-700', bg: 'bg-teal-50', view: 'discover', params: null, micro: '看見土地永續承諾' },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center justify-start cursor-pointer active:scale-95 transition-all duration-300 px-1 w-1/3 text-center" onClick={() => navigateTo(item.view, item.params)}>
            <div className={`p-4 rounded-[2rem] ${item.bg} mb-2 shadow-inner group-hover:shadow-md transition-shadow`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="text-xs md:text-sm text-gray-800 font-black tracking-tighter mb-1">{item.label}</span>
            <span className="text-[9px] md:text-[10px] text-emerald-700/70 font-bold leading-tight px-1 break-words">{item.micro}</span>
          </div>
        ))}
      </div>

          {/* 最新消息 Carousel */}
          <div className="mt-8 px-4">
            <h2 className="text-lg font-black text-gray-800 border-l-4 border-[#14532d] pl-2 mb-4">最新消息</h2>
            <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar snap-x">
              {BLOG_POSTS.filter(p => p.category === '最新消息').slice(0, 3).map(post => (
                <div key={post.id} className="min-w-[260px] bg-white rounded-[2.5rem] shadow-md border border-gray-100 p-4 snap-start flex flex-col hover:shadow-lg transition-shadow active:scale-95">
                  <h3 className="font-black text-gray-900 text-sm mb-2 line-clamp-2" title={post.title}>{post.title}</h3>
                  <p className="text-gray-600 text-xs flex-grow line-clamp-3" title={post.excerpt}>{post.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
          {/* 田間故事 精選 */}
          <div className="mt-8 px-4">
            <h2 className="text-lg font-black text-gray-800 border-l-4 border-[#14532d] pl-2 mb-4">田間故事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLOG_POSTS.filter(p => p.category === '田間故事').slice(0, 2).map(story => (
                <div key={story.id} className="flex bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow active:scale-95">
                  <img src={story.image || story.images?.[0]} alt={story.title} className="w-32 h-32 object-cover shrink-0" />
                  <div className="p-4 flex flex-col justify-between">
                    <h3 className="font-black text-gray-900 text-sm mb-1 line-clamp-2">{story.title}</h3>
                    <p className="text-gray-600 text-xs line-clamp-3">{story.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

      {/* 熱銷商品 */}
      <div className="mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black text-gray-800 border-l-4 border-[#14532d] pl-2">熱銷小農特產</h2>
          <span className="text-sm text-[#14532d] font-bold flex items-center cursor-pointer" onClick={() => navigateTo('shop')}>逛全部 <ChevronRight className="w-4 h-4" /></span>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar">
          {PRODUCTS.filter(p => p.category === '熱銷商品').slice(0, 8).map(product => (
            <div key={product.id} className="min-w-[160px] bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden snap-start flex flex-col cursor-pointer hover:shadow-md transition-all active:scale-95" onClick={() => setSelectedProduct(product)}>
              <div className="relative aspect-square">
                <ProductImage src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" />
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
          <h2 className="text-lg font-black text-gray-800 border-l-4 border-[#14532d] pl-2">精選農人誌</h2>
          <span className="text-sm text-[#14532d] font-bold flex items-center cursor-pointer" onClick={() => navigateTo('stories')}>更多故事 <ChevronRight className="w-4 h-4" /></span>
        </div>
        <div className="space-y-4">
          {loadingStories ? (
            <div className="flex items-center justify-center py-10 opacity-20">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            featuredStories.slice(0, 2).map(story => (
              <div key={story.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex gap-3 p-3 cursor-pointer hover:shadow-md transition-all active:scale-95" onClick={() => navigateTo('stories')}>
                <ProductImage src={story.image} alt={story.title} className="w-24 h-24 object-cover rounded-[1.2rem] shrink-0" />
                <div className="flex flex-col justify-center">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md w-fit mb-1 ${story.type === '活動' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {story.type}
                  </span>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1">{story.title}</h3>
                  <p className="text-[11px] text-gray-500 line-clamp-1">{story.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Farmer's Spirit (Emotional Hook) */}
      <div className="mx-4 mt-12 mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl relative cursor-pointer group" onClick={() => navigateTo('stories')}>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
        <img src="https://images.unsplash.com/photo-1595856752763-718617781b0a?auto=format&fit=crop&q=80&w=800" alt="Farmer's Hands" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
          <span className="text-amber-400 font-bold text-[10px] tracking-widest mb-2 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5" /> FARMER'S SPIRIT
          </span>
          <h3 className="text-xl font-black text-white mb-2 leading-tight">感受雙手溫度的<br/>真實故事</h3>
          <p className="text-white/80 text-xs font-medium max-w-[85%] mb-4 leading-relaxed">每一道刻痕，都是與土地共生的印記。探索阿古力契作農友的韌性篇章。</p>
          <div className="flex items-center text-white text-xs font-bold gap-1 group-hover:text-emerald-400 transition-colors">
            閱讀完整故事 <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 合作綠色餐廳橫幅 */}
      <div className="mx-4 mt-8 bg-amber-50 rounded-[2rem] p-6 flex flex-col justify-center shadow-sm relative overflow-hidden group">
        <Heart className="absolute -right-4 -bottom-4 w-24 h-24 text-amber-500/10 group-hover:scale-110 transition-transform duration-700" />
        <h3 className="font-black text-amber-800 text-sm mb-2 flex items-center"><Leaf className="w-4 h-4 mr-1" /> 有機之心・美食餐廳</h3>
        <p className="text-xs text-amber-700/80 mb-3 leading-relaxed font-medium">我們與 {RESTAURANTS.slice(0,3).join('、')} 等在地餐廳合作，將有機食材搬上餐桌！</p>
      </div>

      {/* 關注阿古力 */}
      <div className="mt-12 flex flex-col items-center pb-8 px-4 text-center">
        <div className="flex gap-6 mb-8">
          <a href={BRAND_CONTACT.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm active:scale-90 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href={BRAND_CONTACT.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 shadow-sm active:scale-90 transition-all">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975-.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.063-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
          </a>
        </div>
        <div className="max-w-[280px]">
          <h4 className="text-gray-900 font-black mb-2 flex items-center justify-center gap-2">
            關注阿古力 <Leaf className="w-5 h-5 text-emerald-600" />
          </h4>
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed mb-4">
            加入阿古力 LINE 官方帳號，獲取第一手有機農產優惠與田間生活驚喜！
          </p>
          <a 
            href={BRAND_CONTACT.line} 
            target="_blank" 
            rel="noreferrer"
            className="inline-block bg-[#06C755] text-white font-black px-8 py-3 rounded-2xl text-[13px] shadow-xl shadow-green-600/20 active:scale-95 transition-all"
          >
            立即加入 LINE 好友
          </a>
        </div>
        <p className="mt-12 text-[10px] text-gray-300 font-bold tracking-widest uppercase">
          Agric Social Enterprise © 2026
        </p>
      </div>
    </div>
  );
};

export default HomeView;
