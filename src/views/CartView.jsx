import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const CartView = ({ cart, updateCartQty, removeFromCart, setActiveTab }) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="pb-32 animate-in fade-in duration-500 h-full flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white pt-8 pb-6 px-6 shadow-sm mb-4 border-b border-gray-100 sticky top-0 z-30">
        <h1 className="text-2xl font-black text-emerald-800 flex items-center">
          <ShoppingCart className="w-7 h-7 mr-3 text-emerald-600" /> 我的購物車
        </h1>
      </div>
      
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center animate-in zoom-in-95 duration-500">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner border border-gray-200/50">
            <ShoppingCart className="w-14 h-14 text-gray-300" />
          </div>
          <h2 className="text-xl font-black text-gray-800 mb-2">您的購物車空空如也</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-[200px] leading-relaxed">
            還沒挑選心儀的有機好物嗎？快去市集逛逛吧！
          </p>
          <button 
            onClick={() => setActiveTab('shop')} 
            className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-95 transition-all"
          >
            去逛逛有機好物
          </button>
        </div>
      ) : (
        <div className="px-5">
          <div className="space-y-4 mt-2">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-emerald-700 font-black bg-emerald-50 px-2.5 py-1 rounded-lg mb-2 inline-block border border-emerald-100">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-black text-gray-800 truncate mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-black text-lg">
                      <span className="text-xs mr-0.5">NT$</span>{item.price}
                    </span>
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                      <button 
                        onClick={() => updateCartQty(item.id, -1)} 
                        className="p-1.5 text-gray-500 hover:bg-white hover:text-emerald-600 active:scale-90 rounded-lg transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black w-8 text-center text-gray-800">{item.qty}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, 1)} 
                        className="p-1.5 text-gray-500 hover:bg-white hover:text-emerald-600 active:scale-90 rounded-lg transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-gray-200 hover:text-red-500 p-2 transition-colors self-start"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="mt-8 bg-white p-7 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-emerald-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
            
            <div className="flex justify-between text-sm text-gray-500 font-bold mb-4">
              <span>商品小計 ({cart.reduce((sum, item) => sum + item.qty, 0)} 件)</span>
              <span>NT$ {cartTotal}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-dashed border-gray-100">
              <span className="text-sm text-gray-500 font-bold">阿古力物流專車</span>
              <div className="flex flex-col items-end text-right">
                <span className="text-emerald-600 font-black text-xs bg-emerald-50 px-2 py-1 rounded-md">已達 $1500 免運門檻</span>
                <span className="text-[10px] text-gray-300 mt-1">常溫/冷藏合併計算</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div className="flex flex-col">
                <span className="text-gray-900 font-black text-lg">訂單總計</span>
                <span className="text-[10px] text-emerald-600 font-bold">已套用小農友善折扣</span>
              </div>
              <span className="text-3xl font-black text-amber-600">
                <span className="text-sm mr-1 font-bold">NT$</span>{cartTotal}
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3 border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                本平台支持「三章一Q」溯源認證，農產品受天候影響，出貨時間約為 3-5 個工作天。若有運送損毀，請於 24 小時內聯繫客服。
              </p>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-[75px] left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg p-5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-t border-gray-100 z-40 rounded-t-[2.5rem]">
          <button className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            前往結帳流程
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
