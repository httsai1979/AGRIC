import React from 'react';
import { ArrowLeft, ShoppingCart, ShieldCheck, MapPin, Package, Clock, Info, Plus, Minus } from 'lucide-react';

const ProductDetailView = ({ product, onBack, addToCart }) => {
  const [qty, setQty] = React.useState(1);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  const scrollRef = React.useRef(null);

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

  return (
    <div className="pb-40 animate-in fade-in slide-in-from-right-4 duration-500 bg-white min-h-screen">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 px-4 py-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack}
          className="bg-white/80 backdrop-blur-md text-emerald-800 p-2.5 rounded-2xl shadow-xl border border-white/50 active:scale-90 transition-all pointer-events-auto"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Image Carousel */}
      <div className="relative h-[450px] w-full bg-gray-100">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full"
        >
          {images.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
              <img src={img} alt={`${product.name}-${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        
        {/* Page Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-12 right-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest z-20">
            {currentImgIndex + 1} / {images.length}
          </div>
        )}
        
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-emerald-900/5 border border-emerald-50">
          {/* Tags & Title */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest">
              {product.category}
            </span>
            {details.certification && (
              <span className="bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1.5 rounded-full border border-amber-100 flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> {details.certification}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-8">{product.name}</h1>
          
          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">產地</span>
              </div>
              <p className="text-sm font-black text-gray-700">{details.origin || '台灣'}</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">規格</span>
              </div>
              <p className="text-sm font-black text-gray-700">{details.spec || '依包裝所示'}</p>
            </div>
          </div>

          {/* Description with Read More */}
          <div className="mb-8">
            <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center">
              <Info className="w-4 h-4 mr-2 text-emerald-600" /> 產品詳情
            </h3>
            <div className="relative">
              <div className={`text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-wrap ${!isExpanded ? 'line-clamp-5' : ''}`}>
                {details.description || '精選契作小農作物，堅持自然熟成，為您帶來最鮮活的大地滋味。'}
              </div>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-emerald-600 text-xs font-black uppercase tracking-widest flex items-center hover:text-emerald-700"
            >
              {isExpanded ? '收合商品資訊' : '展開完整商品資訊'}
              <Plus className={`ml-1 w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/30 border border-amber-100/50">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider mb-0.5">保存方式</p>
                <p className="text-xs text-amber-700 font-bold">{details.storage || '常溫保存，避免陽光直射；開封後建議冷藏以保持風味。'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t border-gray-100 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Price</p>
            <p className="text-2xl font-black text-amber-600">
              {product.price === null ? '請電洽' : <><span className="text-sm mr-1">NT$</span>{product.price * qty}</>}
            </p>
          </div>
          <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-200">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-2 text-gray-400 hover:text-emerald-600 active:scale-90 transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-sm font-black w-8 text-center text-gray-800">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              className="p-2 text-gray-400 hover:text-emerald-600 active:scale-90 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => {
            for(let i=0; i<qty; i++) addToCart(product);
          }}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <ShoppingCart className="w-6 h-6" />
          立即加入購物車
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
