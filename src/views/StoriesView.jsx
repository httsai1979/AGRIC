import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, ArrowRight, ArrowLeft, Loader2, User, Heart, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import ProductImage from '../components/ProductImage';

// Google Apps Script Web App URL
// Note: Placeholder URL used. Replace with actual GAS URL when ready.
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxA-XXXXX-XXXXX/exec"; 

const StoriesView = ({ addToCart, setSelectedProduct, onBack }) => {
  const [stories, setStories] = useState([]);
  const [activeTab, setActiveTab] = useState('field_story');
  const [loading, setLoading] = useState(true);
  const [expandedStoryId, setExpandedStoryId] = useState(null);

  useEffect(() => {
    // Fetching from Live Google Sheet API (GAS)
    fetch(GAS_API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        // Map Sheet columns to application state
        const mappedData = data.map((item, index) => ({
          id: item.id || index,
          title: item.Title || item.title || '未命名故事',
          content: item.Content || item.description || '',
          type: item.Type || item.type || '故事',
          category: item.Category || item.category || (item.URL?.includes('食農教育') ? 'food_education' : 'field_story'),
          images: item.Images 
            ? item.Images.split(',').map(img => img.trim()) 
            : (item.images ? item.images : (item.image ? [item.image] : [])),
          keyFigures: item.Key_Figures || item.key_figures || '阿古力小農'
        }));
        setStories(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.warn('Live API unavailable or CORS blocked. Falling back to local data.', err);
        // Fallback to local JSON if API fails or is blocked by CORS
        fetch('/data/stories.json')
          .then(res => res.json())
          .then(localData => {
            const mappedLocal = localData.map((s, idx) => ({
              id: s.id || idx,
              title: s.title,
              content: s.description,
              type: s.type || '故事',
              category: s.category || 'field_story',
              images: s.images || (s.image ? [s.image] : []),
              keyFigures: s.key_figures || '阿古力小農'
            }));
            setStories(mappedLocal);
            setLoading(false);
          })
          .catch(fallbackErr => {
            console.error('Critical Error: Fallback also failed.', fallbackErr);
            setLoading(false);
          });
      });
  }, []);

  const filteredStories = stories.filter(s => s.category === activeTab);

  // Helper to find related products by Key_Figures
  const getRelatedProducts = (keyFigures) => {
    if (!keyFigures || keyFigures === '阿古力小農') return [];
    return PRODUCTS.filter(p => 
      p.name.includes(keyFigures) || 
      p.level2_details?.intro?.includes(keyFigures) ||
      p.level2_details?.specs?.includes(keyFigures)
    ).slice(0, 3);
  };

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
            <span className="text-[10px] text-emerald-700 font-black tracking-widest uppercase">Live Content Hub</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-emerald-800 flex items-center mb-6">
          < BookOpen className="w-8 h-8 mr-3 text-emerald-600" /> 農人誌
        </h1>

        {/* Tab Bar */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
          <button 
            onClick={() => { setActiveTab('field_story'); setExpandedStoryId(null); }}
            className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all duration-300 ${activeTab === 'field_story' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-400'}`}
          >
            田間故事
          </button>
          <button 
            onClick={() => { setActiveTab('food_education'); setExpandedStoryId(null); }}
            className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all duration-300 ${activeTab === 'food_education' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-400'}`}
          >
            食農教育
          </button>
        </div>
      </div>
      
      <div className="px-5 space-y-8 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-600" />
            <p className="text-sm font-bold">同步雲端故事中...</p>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold">目前尚無相關內容</p>
          </div>
        ) : (
          filteredStories.map(story => {
            const isExpanded = expandedStoryId === story.id;
            const relatedProducts = getRelatedProducts(story.keyFigures);
            const coverImage = (story.images && story.images.length > 0) 
              ? story.images[0] 
              : 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400';

            return (
              <div key={story.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col group animate-in slide-in-from-bottom-4 duration-500">
                <div className="relative h-64 overflow-hidden">
                  <ProductImage 
                    src={coverImage} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 ${story.type === '活動' ? 'bg-amber-500/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
                      {story.type}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] text-emerald-600 font-black uppercase tracking-widest">{activeTab === 'field_story' ? 'Farmer Spirit' : 'Educational'}</span>
                    <div className="h-px bg-emerald-100 flex-1"></div>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
                    {story.title}
                  </h3>

                  {/* Expandable Detail Section */}
                  <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[2000px] mb-6' : 'max-h-24 mb-4'}`}>
                    <p className={`text-gray-500 leading-relaxed whitespace-pre-wrap ${isExpanded ? 'text-base text-gray-800 leading-[1.8]' : 'text-sm line-clamp-3'}`}>
                      {story.content}
                    </p>
                  </div>

                  <button 
                    onClick={() => setExpandedStoryId(isExpanded ? null : story.id)}
                    className="flex items-center text-emerald-600 text-sm font-black mb-6 hover:translate-x-1 transition-transform"
                  >
                    {isExpanded ? (
                      <span className="flex items-center gap-1.5 underline decoration-2 underline-offset-4"><ChevronUp className="w-4 h-4" /> 收合內容</span>
                    ) : (
                      <span className="flex items-center gap-1.5 underline decoration-2 underline-offset-4">閱讀全文 <ArrowRight className="w-4 h-4" /></span>
                    )}
                  </button>

                  {/* Related Products Section: Support this Farmer */}
                  {isExpanded && relatedProducts.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-stone-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="flex items-center gap-2 mb-6">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <h4 className="text-sm font-black text-gray-900">支持這位小農：{story.keyFigures}</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {relatedProducts.map(product => (
                          <div 
                            key={product.id} 
                            onClick={() => setSelectedProduct(product)}
                            className="bg-emerald-50/50 rounded-2xl p-3 flex items-center gap-4 border border-emerald-100 hover:border-emerald-300 transition-all cursor-pointer group/item"
                          >
                            <ProductImage src={product.images?.[0] || product.image} alt={product.name} className="w-14 h-14 object-cover rounded-xl shadow-sm group-hover/item:scale-105 transition-transform" />
                            <div className="flex-1">
                              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">小農產物</p>
                              <p className="text-xs font-black text-gray-800 line-clamp-1">{product.name}</p>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="bg-white text-emerald-600 border border-emerald-200 p-2.5 rounded-xl shadow-sm hover:bg-emerald-600 hover:text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-stone-400 font-bold flex items-center">
                      <User className="w-3.5 h-3.5 mr-1.5 text-stone-300" />
                      人物：{story.keyFigures}
                    </span>
                    {!isExpanded && story.images && story.images.length > 1 && (
                       <div className="flex -space-x-2">
                        {story.images.slice(1, 4).map((img, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-sm bg-stone-100">
                            <img src={img} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Footer Section */}
      <div className="mt-12 mb-8 px-6 text-center">
        <div className="bg-emerald-800 rounded-3xl p-8 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h4 className="text-white font-black mb-2 relative z-10">訂閱阿古力電子報</h4>
          <p className="text-sm text-emerald-100/70 mb-6 relative z-10 font-medium">第一手接收來自雲端與田間的真實故事。</p>
          <div className="flex gap-2 relative z-10">
            <input type="email" placeholder="您的電子郵件" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            <button className="bg-emerald-500 text-white font-black px-6 py-2.5 rounded-xl text-sm shadow-lg active:scale-95 transition-all">
              訂閱
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesView;
