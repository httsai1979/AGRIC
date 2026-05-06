import React, { useState } from 'react';
import { Home, ShoppingBag, Compass, ShoppingCart, Leaf, User, MessageCircle, Phone, HelpCircle, X, Headset } from 'lucide-react';
import HomeView from './views/HomeView';
import ShopView from './views/ShopView';
import StoriesView from './views/StoriesView';
import EsgView from './views/EsgView';
import CartView from './views/CartView';
import MemberView from './views/MemberView';
import SupportView from './views/SupportView';
import DiscoverView from './views/DiscoverView';
import ProductDetailView from './views/ProductDetailView';
import { PRODUCTS } from './data/mockData';

export default function App() {
  const [viewState, setViewState] = useState({ currentView: 'home', params: null });
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [supportOpen, setSupportOpen] = useState(false);

  const activeTabMap = {
    'home': 'home',
    'shop': 'shop',
    'detail': 'shop',
    'cart': 'cart',
    'discover': 'discover',
    'stories': 'discover',
    'esg': 'discover',
    'support': 'discover',
    'member': 'discover'
  };
  const activeTab = activeTabMap[viewState.currentView] || 'home';

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
            <Leaf className="w-3.5 h-3.5 text-white" />
          </div>
          {toastMessage}
        </div>
      )}

      {/* Floating Support Hub */}
      <div className="fixed bottom-24 right-6 z-[60] flex flex-col items-end gap-3">
        {supportOpen && (
          <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-4 duration-300">
            <a 
              href="https://line.me/R/ti/p/@agric" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#06C755] text-white pr-6 pl-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs font-black">LINE 客服</span>
            </a>
            <a 
              href="tel:056337510" 
              className="flex items-center gap-3 bg-emerald-600 text-white pr-6 pl-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              <Phone className="w-5 h-5" />
              <span className="text-xs font-black">撥打專線</span>
            </a>
            <button 
              onClick={() => { navigateTo('support'); setSupportOpen(false); }}
              className="flex items-center gap-3 bg-amber-500 text-white pr-6 pl-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-black">常見問題</span>
            </button>
          </div>
        )}
        <button 
          onClick={() => setSupportOpen(!supportOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transition-all duration-300 ${supportOpen ? 'bg-gray-800 rotate-90' : 'bg-emerald-600 active:scale-90 hover:rotate-6'}`}
        >
          {supportOpen ? <X className="w-6 h-6 text-white" /> : <Headset className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* 內容區塊 */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {viewState.currentView === 'home' && <HomeView navigateTo={navigateTo} addToCart={addToCart} setSelectedProduct={(p) => navigateTo('detail', { productId: p.id })} />}
        {viewState.currentView === 'shop' && <ShopView initialCategory={viewState.params?.initialCategory} addToCart={addToCart} setSelectedProduct={(p) => navigateTo('detail', { productId: p.id })} />}
        {viewState.currentView === 'detail' && (
          <ProductDetailView 
            product={PRODUCTS.find(p => p.id === viewState.params.productId)} 
            onBack={() => navigateTo('shop')}
            addToCart={addToCart}
          />
        )}
        {viewState.currentView === 'stories' && (
          <StoriesView 
            onBack={() => navigateTo('discover')} 
            addToCart={addToCart} 
            setSelectedProduct={(p) => navigateTo('detail', { productId: p.id })} 
          />
        )}
        {viewState.currentView === 'esg' && <EsgView onBack={() => navigateTo('discover')} />}
        {viewState.currentView === 'discover' && <DiscoverView navigateTo={navigateTo} />}
        {viewState.currentView === 'cart' && <CartView 
          cart={cart} 
          updateCartQty={updateCartQty} 
          removeFromCart={removeFromCart} 
          setActiveTab={(tab) => navigateTo(tab)} 
        />}
        {viewState.currentView === 'member' && <MemberView navigateTo={navigateTo} onBack={() => navigateTo('discover')} />}
        {viewState.currentView === 'support' && <SupportView onBack={() => navigateTo('discover')} />}
      </div>

      {/* 底部導覽列 */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100/50 flex justify-around items-center h-[65px] pb-safe shrink-0 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-[70] rounded-t-[2.5rem] px-2">
        {[
          { id: 'home', icon: Home, label: '首頁' },
          { id: 'shop', icon: ShoppingBag, label: '市集' },
          { id: 'cart', icon: ShoppingCart, label: '購物車', badge: totalItems },
          { id: 'discover', icon: Compass, label: '探索阿古力' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-all duration-300 ${activeTab === tab.id ? 'text-emerald-600 scale-105' : 'text-gray-400 hover:text-emerald-500'}`}
          >
            <div className="relative mt-1">
              <tab.icon 
                className={`w-[20px] h-[20px] transition-all duration-300 ${activeTab === tab.id ? 'scale-110 stroke-[2.5px]' : 'stroke-2'}`} 
                fill={activeTab === tab.id ? 'currentColor' : 'none'}
              />
              {tab.badge > 0 && (
                <span 
                  key={tab.badge}
                  className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full min-w-[15px] text-center border-2 border-white shadow-sm animate-pop"
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[9px] ${activeTab === tab.id ? 'font-black' : 'font-bold'}`}>{tab.label}</span>
            {activeTab === tab.id && <div className="absolute -bottom-1 w-1 h-1 bg-emerald-500 rounded-full"></div>}
          </button>
        ))}
      </div>
    </div>
  );
}
