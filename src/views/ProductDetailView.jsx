import React, { useState, useRef } from 'react';
import { ArrowLeft, ShoppingCart, ShieldCheck, Plus, Minus, ChevronDown } from 'lucide-react';

const AccordionItem = ({ title, isOpen, onClick, children, bg = "bg-white", textSize = "text-sm" }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      onClick={onClick}
      className="w-full py-5 flex items-center justify-between text-left group"
    >
      <span className="text-sm font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
        {title}
      </span>
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
              <img src={img} alt={`${product.name}-${idx}`} className="w-full h-full object-cover" />
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
          
          <div className="h-px bg-gray-50 w-full mb-2"></div>

          {/* Accordion Sections */}
          <div className="space-y-1">
            <AccordionItem 
              title="商品介紹" 
              isOpen={openSections.intro} 
              onClick={() => toggleSection('intro')}
            >
              {details.intro || '暫無介紹內容'}
            </AccordionItem>

            <AccordionItem 
              title="規格說明" 
              isOpen={openSections.specs} 
              onClick={() => toggleSection('specs')}
              bg="bg-stone-50/50"
            >
              {details.specs || '暫無規格說明'}
            </AccordionItem>

            <AccordionItem 
              title="營養標示" 
              isOpen={openSections.nutrition} 
              onClick={() => toggleSection('nutrition')}
              bg="bg-gray-50"
              textSize="text-xs"
            >
              {details.nutrition || '暫無營養標示'}
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t border-gray-100 z-50 shadow-[0_-15px_30px_rgba(0,0,0,0.08)] rounded-t-[3rem]">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Price</p>
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
