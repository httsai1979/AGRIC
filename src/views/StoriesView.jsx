import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import ProductImage from '../components/ProductImage';

const StoriesView = ({ addToCart, setSelectedProduct, onBack }) => {
  const [stories, setStories] = useState([]);
  const [activeTab, setActiveTab] = useState('field_story'); // 'field_story' or 'food_education'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/stories.json')
      .then(res => res.json())
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stories:', err);
        setLoading(false);
      });
  }, []);

  const filteredStories = stories.filter(s => s.category === activeTab);

  return (
    <div className="pb-24 animate-in fade-in duration-500 bg-stone-50 min-h-screen">
      <div className="bg-white pt-8 pb-4 px-6 shadow-sm border-b border-stone-100 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="bg-gray-50 p-2 rounded-xl text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <span className="text-[10px] text-emerald-700 font-black tracking-widest uppercase">Content Hub</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-emerald-800 flex items-center mb-6">
          <BookOpen className="w-8 h-8 mr-3 text-emerald-600" /> 農人誌
        </h1>

        {/* Tab Bar */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('field_story')}
            className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all duration-300 ${activeTab === 'field_story' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-400'}`}
          >
            田間故事
          </button>
          <button 
            onClick={() => setActiveTab('food_education')}
            className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all duration-300 ${activeTab === 'food_education' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-400'}`}
          >
            食農教育
          </button>
        </div>
      </div>
      
      <div className="px-5 space-y-8 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-sm font-bold">載入故事中...</p>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold">目前尚無相關內容</p>
          </div>
        ) : (
          filteredStories.map(story => {
            const relatedProduct = PRODUCTS.find(p => p.id === story.related_product_id);
            
            return (
              <div key={story.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col group animate-in slide-in-from-bottom-4 duration-500">
                <div className="relative h-64 overflow-hidden">
                  <ProductImage 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 ${story.type === '活動' ? 'bg-amber-500/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
                      {story.type}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] text-emerald-600 font-black uppercase tracking-widest">{activeTab === 'field_story' ? 'Farmer Story' : 'Food Education'}</span>
                    <div className="h-px bg-emerald-100 flex-1"></div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-6">
                    {story.description}
                  </p>
                  
                  {relatedProduct && (
                    <div className="bg-emerald-50 rounded-2xl p-4 mb-6 flex items-center gap-4 border border-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer" onClick={() => setSelectedProduct(relatedProduct)}>
                      <ProductImage src={relatedProduct.images?.[0] || relatedProduct.image} alt={relatedProduct.name} className="w-12 h-12 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1">
                        <p className="text-[10px] text-emerald-600 font-black uppercase">支持小農產物</p>
                        <p className="text-xs font-black text-gray-800 truncate">{relatedProduct.name}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(relatedProduct);
                        }}
                        className="bg-emerald-600 text-white p-2 rounded-xl shadow-md"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-bold flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                      人物：{story.key_figures}
                    </span>
                    <button className="flex items-center text-emerald-600 text-sm font-black hover:translate-x-1 transition-transform">
                      閱讀全文 <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Footer Section */}
      <div className="mt-12 mb-8 px-6 text-center">
        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
          <h4 className="text-emerald-800 font-black mb-2">想要聽更多故事？</h4>
          <p className="text-sm text-emerald-600/80 mb-4">加入我們的電子報，第一手掌握田間大小事。</p>
          <button className="bg-emerald-600 text-white font-black px-6 py-2.5 rounded-xl text-sm shadow-lg shadow-emerald-600/20">
            立即訂閱
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoriesView;
