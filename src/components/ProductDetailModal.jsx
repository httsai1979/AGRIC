import React from 'react';
import { X, CheckCircle, MapPin, Package, ShieldCheck, ShoppingCart, Minus, Plus } from 'lucide-react';

const ProductDetailModal = ({ product, isOpen, onClose, addToCart }) => {
  const [qty, setQty] = React.useState(1);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500 max-h-[90vh] flex flex-col">
        {/* Header Image */}
        <div className="relative h-64 shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute top-4 left-4 flex gap-2">
            {product.certifications?.map((cert, i) => (
              <span key={i} className="bg-emerald-600/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-emerald-600 font-black text-xs bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 mb-2 inline-block uppercase tracking-widest">
                {product.category}
              </span>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{product.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Unit Price</p>
              <p className="text-2xl font-black text-amber-600">NT$ {product.price}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <Package className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">規格</p>
                <p className="text-xs font-black text-gray-700">{product.specs}</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">產地</p>
                <p className="text-xs font-black text-gray-700">{product.origin}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-xs text-gray-600 font-bold bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
              <CheckCircle className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
              保存方式：{product.storage}
            </div>
            <div className="flex items-center text-xs text-gray-600 font-bold bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
              <CheckCircle className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
              配送說明：全台配送，滿 $1500 免運費
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-gray-100 flex items-center gap-4 shrink-0">
          <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-2.5 text-gray-500 hover:bg-white hover:text-emerald-600 active:scale-90 rounded-xl transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-sm font-black w-10 text-center text-gray-800">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              className="p-2.5 text-gray-500 hover:bg-white hover:text-emerald-600 active:scale-90 rounded-xl transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={() => {
              for (let i = 0; i < qty; i++) addToCart(product);
              onClose();
            }}
            className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-5 h-5" />
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
