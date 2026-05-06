import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const CartView = ({ cart, updateCartQty, removeFromCart, setActiveTab }) => {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="pb-32 animate-in fade-in duration-300 h-full flex flex-col min-h-screen bg-gray-50">
      <div className="bg-white pt-6 pb-4 px-4 shadow-sm mb-2">
        <h1 className="text-2xl font-black text-emerald-800 flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2" /> 購物車
        </h1>
      </div>
      
      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center mt-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-10 h-10 text-gray-300" />
          </div>
          <p className="font-bold text-gray-500 mb-6">目前的購物車是空的！</p>
          <button 
            onClick={() => setActiveTab('shop')} 
            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-md"
          >
            去逛逛有機好物
          </button>
        </div>
      ) : (
        <div className="px-4">
          <div className="space-y-3 mt-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mb-1 inline-block">{item.category}</span>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1">{item.name}</h3>
                  <div className="flex items-end justify-between mt-2">
                    <span className="text-amber-600 font-black text-lg"><span className="text-xs">NT$</span>{item.price}</span>
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => updateCartQty(item.id, -1)} 
                        className="p-1.5 text-gray-600 active:bg-gray-200 rounded-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black w-6 text-center">{item.qty}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, 1)} 
                        className="p-1.5 text-gray-600 active:bg-gray-200 rounded-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-gray-300 hover:text-red-500 p-2 h-full flex flex-col justify-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white p-5 rounded-3xl shadow-sm border border-emerald-100">
            <div className="flex justify-between text-sm text-gray-600 font-medium mb-3">
              <span>商品小計</span>
              <span>NT$ {cartTotal}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 font-medium mb-4 pb-4 border-b border-gray-100">
              <span>冷藏/常溫運費</span>
              <span className="text-emerald-600 font-bold">滿額免運</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-gray-800 font-black">訂單總計</span>
              <span className="text-2xl font-black text-amber-600">
                <span className="text-sm mr-1">NT$</span>{cartTotal}
              </span>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-[65px] left-0 right-0 max-w-md mx-auto bg-white p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-gray-100 z-40">
          <button className="w-full bg-emerald-600 text-white font-black py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.98] transition">
            前往結帳 ({cart.reduce((sum, item) => sum + item.qty, 0)} 件商品)
          </button>
        </div>
      )}
    </div>
  );
};

export default CartView;
