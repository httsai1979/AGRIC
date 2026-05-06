import React, { useState } from 'react';
import { Home, ShoppingBag, BookOpen, Building2, ShoppingCart, Sprout } from 'lucide-react';
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import StoriesView from './views/StoriesView';
import EsgView from './views/EsgView';
import CartView from './views/CartView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`已將 ${product.name} 加入購物車`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans selection:bg-emerald-200 text-gray-800 shadow-2xl">
      
      {/* 快閃通知 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl whitespace-nowrap animate-in slide-in-from-top-4 fade-in flex items-center">
          <Sprout className="w-4 h-4 mr-2 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* 內容區塊 */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} addToCart={addToCart} />}
        {activeTab === 'shop' && <ShopView addToCart={addToCart} />}
        {activeTab === 'stories' && <StoriesView />}
        {activeTab === 'esg' && <EsgView />}
        {activeTab === 'cart' && <CartView 
          cart={cart} 
          updateCartQty={updateCartQty} 
          removeFromCart={removeFromCart} 
          setActiveTab={setActiveTab} 
        />}
      </div>

      {/* 底部導覽列 */}
      <div className="bg-white border-t border-gray-100 flex justify-around items-center h-[65px] pb-safe shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 rounded-t-3xl">
        {[
          { id: 'home', icon: Home, label: '首頁' },
          { id: 'shop', icon: ShoppingBag, label: '逛市集' },
          { id: 'stories', icon: BookOpen, label: '農人誌' },
          { id: 'esg', icon: Building2, label: 'ESG' },
          { id: 'cart', icon: ShoppingCart, label: '購物車', badge: totalItems },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-500'}`}
          >
            <div className="relative mt-1">
              <tab.icon className={`w-[22px] h-[22px] transition-all duration-300 ${activeTab === tab.id ? 'scale-110 stroke-[2.5px]' : 'stroke-2'}`} />
              {tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white shadow-sm">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] ${activeTab === tab.id ? 'font-black' : 'font-bold'}`}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
