import React, { useState } from 'react';
import { Home, ShoppingBag, BookOpen, Building2, ShoppingCart, Sprout, User } from 'lucide-react';
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import StoriesView from './views/StoriesView';
import EsgView from './views/EsgView';
import CartView from './views/CartView';
import MemberView from './views/MemberView';
import SupportView from './views/SupportView';
import ProductDetailView from './views/ProductDetailView';
import { PRODUCTS } from './data/mockData';

export default function App() {
  const [viewState, setViewState] = useState({ currentView: 'home', params: null });
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const activeTab = viewState.currentView === 'detail' ? 'shop' : viewState.currentView;

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

  const navigateTo = (view, params = null) => {
    setViewState({ currentView: view, params });
  };

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans selection:bg-emerald-200 text-gray-800 shadow-2xl">
      
      {/* 快閃通知 */}
      {toastMessage && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900/90 backdrop-blur-md text-white text-xs font-black px-6 py-4 rounded-[1.5rem] shadow-2xl whitespace-nowrap animate-slide-in-top flex items-center border border-white/10">
          <div className="bg-emerald-500 p-1 rounded-full mr-3">
            <Sprout className="w-3.5 h-3.5 text-white" />
          </div>
          {toastMessage}
        </div>
      )}

      {/* 內容區塊 */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {viewState.currentView === 'home' && <HomeView setActiveTab={(tab) => navigateTo(tab)} addToCart={addToCart} setSelectedProduct={(p) => navigateTo('detail', { productId: p.id })} />}
        {viewState.currentView === 'shop' && <ShopView addToCart={addToCart} setSelectedProduct={(p) => navigateTo('detail', { productId: p.id })} />}
        {viewState.currentView === 'detail' && (
          <ProductDetailView 
            product={PRODUCTS.find(p => p.id === viewState.params.productId)} 
            onBack={() => navigateTo('shop')}
            addToCart={addToCart}
          />
        )}
        {viewState.currentView === 'stories' && <StoriesView addToCart={addToCart} setSelectedProduct={(p) => navigateTo('detail', { productId: p.id })} />}
        {viewState.currentView === 'esg' && <EsgView />}
        {viewState.currentView === 'cart' && <CartView 
          cart={cart} 
          updateCartQty={updateCartQty} 
          removeFromCart={removeFromCart} 
          setActiveTab={(tab) => navigateTo(tab)} 
        />}
        {viewState.currentView === 'member' && <MemberView navigateTo={navigateTo} />}
        {viewState.currentView === 'support' && <SupportView onBack={() => navigateTo('member')} />}
      </div>

      {/* 底部導覽列 */}
      <div className="bg-white border-t border-gray-100 flex justify-around items-center h-[75px] pb-safe shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 rounded-t-3xl px-2">
        {[
          { id: 'home', icon: Home, label: '首頁' },
          { id: 'shop', icon: ShoppingBag, label: '市集' },
          { id: 'stories', icon: BookOpen, label: '農人誌' },
          { id: 'esg', icon: Building2, label: 'ESG' },
          { id: 'cart', icon: ShoppingCart, label: '購物車', badge: totalItems },
          { id: 'member', icon: User, label: '我的' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-colors ${activeTab === tab.id ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-500'}`}
          >
            <div className="relative mt-1">
              <tab.icon className={`w-[20px] h-[20px] transition-all duration-300 ${activeTab === tab.id ? 'scale-110 stroke-[2.5px]' : 'stroke-2'}`} />
              {tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-black px-1 py-0.5 rounded-full min-w-[15px] text-center border border-white shadow-sm">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[9px] ${activeTab === tab.id ? 'font-black' : 'font-bold'}`}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
