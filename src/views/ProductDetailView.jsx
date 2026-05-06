import React, { useState, useRef } from 'react';
import { ArrowLeft, ShoppingCart, ShieldCheck, Plus, Minus, ChevronDown, MapPin, Flame, Activity, BookOpen, Info, FileText, BarChart3, Leaf, Share2 } from 'lucide-react';
import ProductImage from '../components/ProductImage';

const NutritionTable = ({ text }) => {
  const [viewMode, setViewMode] = useState('perServing'); // 'perServing' or 'per100g'
  
  if (!text) return null;

  try {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const servingSizeLine = lines.find(l => l.includes('每一份量'));
    const servingsPerPackLine = lines.find(l => l.includes('本包裝含'));
    
    const coreItems = ['熱量', '蛋白質', '脂肪', '飽和脂肪', '反式脂肪', '碳水化合物', '糖', '鈉'];
    const rows = [];
    let currentItem = null;
    let currentValues = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = coreItems.find(item => line.includes(item));
      if (match) {
        if (currentItem) rows.push({ item: currentItem, values: currentValues });
        currentItem = line;
        currentValues = [];
      } else if (currentItem) {
        if (/^[0-9.]/.test(line) || /^[a-zA-Z]/.test(line) || line.includes('公克') || line.includes('大卡') || line.includes('毫克')) {
          currentValues.push(line);
        }
      }
    }
    if (currentItem) rows.push({ item: currentItem, values: currentValues });

    const processedRows = rows.map(r => {
      let v1 = "", v2 = "";
      const vals = r.values;
      if (vals.length === 4) { v1 = `${vals[0]}${vals[1]}`; v2 = `${vals[2]}${vals[3]}`; }
      else if (vals.length === 2) { v1 = vals[0]; v2 = vals[1]; }
      else return null;
      return { item: r.item, perServing: v1, per100g: v2 };
    }).filter(r => r !== null);

    if (processedRows.length === 0) throw new Error('No items found');

    return (
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-widest px-1">
          <span>{servingSizeLine || '每一份量'}</span>
          <span>{servingsPerPackLine || ''}</span>
        </div>

        {/* Segmented Control */}
        <div className="bg-gray-100 p-1 rounded-2xl flex">
          <button 
            onClick={() => setViewMode('perServing')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${viewMode === 'perServing' ? 'bg-white text-emerald-700 shadow-md scale-[1.02]' : 'text-gray-500'}`}
          >
            每份 (Per Serving)
          </button>
          <button 
            onClick={() => setViewMode('per100g')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${viewMode === 'per100g' ? 'bg-white text-emerald-700 shadow-md scale-[1.02]' : 'text-gray-500'}`}
          >
            每 100g (Per 100g)
          </button>
        </div>

        {/* List View */}
        <div className="divide-y divide-gray-100 px-1">
          {processedRows.map((row, idx) => {
            const isHighlight = row.item.includes('熱量');
            return (
              <div key={idx} className="flex justify-between items-center py-4">
                <span className={`text-[13px] ${isHighlight ? 'text-gray-900 font-black' : 'text-gray-500 font-bold'}`}>
                  {row.item}
                </span>
                <span className={`text-sm ${isHighlight ? 'text-amber-600 font-black text-lg' : 'text-gray-800 font-black'}`}>
                  {viewMode === 'perServing' ? row.perServing : row.per100g}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (e) {
    return <div className="whitespace-pre-wrap text-gray-600 leading-relaxed">{text}</div>;
  }
};

const AccordionItem = ({ title, icon: Icon, isOpen, onClick, children, bg = "bg-white", textSize = "text-sm" }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left group"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
          {title}
        </span>
      </div>
      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
      <div className={`rounded-2xl p-5 ${bg} ${textSize} text-gray-600 leading-relaxed font-medium whitespace-pre-wrap`}>
        {children}
      </div>
    </div>
  </div>
);

const ProductDetailView = ({ product, onBack, addToCart }) => {
  const [qty, setQty] = useState(1);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [openSections, setOpenSections] = useState({ intro: true, specs: false, nutrition: false });
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const scrollRef = useRef(null);

  if (!product) return null;

  const details = product.level2_details || {};
  const images = product.images || [product.image];

  const handleScroll = (e) => {
    if (!scrollRef.current) return;
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const index = Math.round(scrollLeft / width);
    setCurrentImgIndex(index);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.level2_details?.intro?.substring(0, 80) + '...',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('已複製連結');
      }
    } catch (err) {
      console.log('Share failed:', err);
    }
  };

  return (
    <div className="pb-44 animate-in fade-in slide-in-from-right-4 duration-500 bg-white min-h-screen">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 px-4 py-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="bg-white/90 backdrop-blur-md text-emerald-800 p-2.5 rounded-2xl shadow-xl border border-white/50 active:scale-90 transition-all pointer-events-auto"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleShare}
          className="bg-white/90 backdrop-blur-md text-emerald-800 p-2.5 rounded-2xl shadow-xl border border-white/50 active:scale-90 transition-all pointer-events-auto"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative h-[480px] w-full bg-gray-50">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full"
        >
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
              <ProductImage src={img} alt={`${product.name}-${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        
        {/* Page Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-16 right-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest z-20">
            {currentImgIndex + 1} / {images.length}
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
          {/* Tags & Title */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1.5">
              <Leaf className="w-3 h-3" />
              {product.category}
            </span>
            {details.certification && (
              <span className="bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1.5 rounded-full border border-amber-100 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> {details.certification}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-6">{product.name}</h1>
          
          {/* Icon-based Specs */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <MapPin className="w-5 h-5 text-emerald-600 mb-2" />
              <span className="text-[11px] text-gray-900 font-black">{details.origin || '台灣'}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <Flame className="w-5 h-5 text-amber-500 mb-2" />
              <span className="text-[11px] text-gray-900 font-black">{details.roast_level || '中烘焙'}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <Activity className="w-5 h-5 text-teal-600 mb-2" />
              <span className="text-[11px] text-gray-900 font-black">{details.processing || '水洗'}</span>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-2"></div>

          {/* Accordion Sections */}
          <div className="space-y-1">
            <AccordionItem 
              title="商品介紹" 
              icon={Info}
              isOpen={openSections.intro} 
              onClick={() => toggleSection('intro')}
            >
              <div className="relative">
                <div className={`transition-all duration-500 overflow-hidden ${isIntroExpanded ? 'max-h-[5000px]' : 'max-h-32 opacity-80'}`}>
                  {details.intro || '暫無介紹內容'}
                </div>
                {!isIntroExpanded && details.intro?.length > 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsIntroExpanded(true); }}
                      className="text-emerald-600 text-xs font-black pb-2 flex items-center gap-1.5 hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> 閱讀全文
                    </button>
                  </div>
                )}
              </div>
            </AccordionItem>

            <AccordionItem 
              title="規格說明" 
              icon={FileText}
              isOpen={openSections.specs} 
              onClick={() => toggleSection('specs')}
              bg="bg-stone-50/50"
            >
              {details.specs || '暫無規格說明'}
            </AccordionItem>

            <AccordionItem 
              title="營養標示" 
              icon={BarChart3}
              isOpen={openSections.nutrition} 
              onClick={() => toggleSection('nutrition')}
              bg="bg-gray-50"
              textSize="text-xs"
            >
              <NutritionTable text={details.nutrition} />
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t border-gray-100 z-50 shadow-[0_-15px_30px_rgba(0,0,0,0.08)] rounded-t-[3rem]">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 flex items-center gap-1">
              <BarChart3 className="w-2.5 h-2.5" /> Total Price
            </p>
            <p className="text-2xl font-black text-amber-600">
              {product.price === null ? '請電洽' : <><span className="text-sm mr-0.5">NT$</span>{product.price * qty}</>}
            </p>
          </div>

          <div className="flex-1 flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-2xl p-1">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-2 text-gray-400 hover:text-emerald-600 active:scale-90 transition-all"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-sm font-black w-6 text-center text-gray-800">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="p-2 text-gray-400 hover:text-emerald-600 active:scale-90 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={() => {
                for(let i=0; i<qty; i++) addToCart(product);
              }}
              className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
