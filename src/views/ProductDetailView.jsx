import React from 'react';
import { ArrowLeft, ShoppingCart, ShieldCheck, MapPin, Package, Clock, Info, Plus, Minus } from 'lucide-react';

const ProductDetailView = ({ product, onBack, addToCart }) => {
  const [qty, setQty] = React.useState(1);

  if (!product) return null;

  const details = product.level2_details || {};

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-right-4 duration-500 bg-white min-h-screen">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 px-4 py-6 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="bg-white/80 backdrop-blur-md text-emerald-800 p-2.5 rounded-2xl shadow-xl border border-white/50 active:scale-90 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="px-6 -mt-16 relative z-10">
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

          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-end justify-between mb-8 pb-8 border-b border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Pricing</p>
              <p className="text-3xl font-black text-amber-600">
                <span className="text-lg mr-1">NT$</span>{product.price || '電洽'}
              </p>
            </div>
            <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-200">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-2 text-gray-500 hover:text-emerald-600 active:scale-90 transition-all"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-sm font-black w-10 text-center text-gray-800">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="p-2 text-gray-500 hover:text-emerald-600 active:scale-90 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

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

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2 text-emerald-600" /> 產品描述
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {details.description || '精選契作小農作物，堅持自然熟成，為您帶來最鮮活的大地滋味。'}
            </p>
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

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
        <button 
          onClick={() => {
            for(let i=0; i<qty; i++) addToCart(product);
          }}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-[2rem] shadow-2xl shadow-emerald-600/40 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <ShoppingCart className="w-6 h-6" />
          立即加入購物車
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
