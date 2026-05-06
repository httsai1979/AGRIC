import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ShieldCheck, ArrowRight, Leaf } from 'lucide-react';
import ProductImage from '../components/ProductImage';

const CartView = ({ cart, updateCartQty, removeFromCart, setActiveTab }) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex flex-col h-full bg-stone-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl pt-8 pb-6 px-6 shadow-sm border-b border-gray-100 z-30 shrink-0">
        <h1 className="text-2xl font-black text-emerald-800 flex items-center">
          <ShoppingCart className="w-7 h-7 mr-3 text-emerald-600" /> 我的購物車
        </h1>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pb-10">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95 duration-700">
            <div className="w-48 h-48 bg-emerald-50 rounded-full flex items-center justify-center mb-8 shadow-inner relative">
              <div className="absolute inset-0 bg-emerald-100/50 rounded-full animate-ping [animation-duration:3000ms]"></div>
              <ShoppingCart className="w-20 h-20 text-emerald-600 relative z-10" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">您的購物車還空著</h2>
            <button 
              onClick={() => setActiveTab('shop')} 
              className="bg-emerald-600 text-white px-12 py-4 rounded-[2rem] font-black shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-2"
            >
              去逛逛有機市集 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden">
                  <ProductImage src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover rounded-[1.5rem] shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-gray-800 truncate mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-black">
                      NT$ {item.price}
                    </span>
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                      <button onClick={() => updateCartQty(item.id, -1)} className="p-1.5 text-gray-500"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="text-xs font-black w-8 text-center">{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="p-1.5 text-gray-500"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-200 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}

            {/* Checkout Summary Block */}
            <div className="mt-8 bg-white p-8 rounded-[3rem] shadow-xl shadow-gray-200/40 border border-emerald-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
              
              <div className="flex justify-between text-sm text-gray-500 font-bold mb-4">
                <span>商品小計 ({cart.reduce((sum, item) => sum + item.qty, 0)} 件)</span>
                <span>NT$ {cartTotal}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-dashed border-gray-100">
                <span className="text-sm text-gray-500 font-bold">阿古力物流專車</span>
                <span className="text-emerald-600 font-black text-xs bg-emerald-50 px-2 py-1 rounded-md">免運門檻達成</span>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-900 font-black text-lg">訂單總計</span>
                <span className="text-3xl font-black text-amber-600">NT$ {cartTotal}</span>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 flex items-start gap-3 border border-stone-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                  本平台支持「三章一Q」溯源認證。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Persistent Checkout Footer */}
      {cart.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.06)] border-t border-gray-100 z-40 rounded-t-[3rem] shrink-0 mt-auto">
          <div className="flex justify-between items-center mb-2 px-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Amount</span>
              <span className="text-2xl font-black text-amber-600">NT$ {cartTotal}</span>
            </div>
            <button className="bg-emerald-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-2">
              前往結帳 <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
