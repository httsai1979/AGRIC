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
    <div className="w-full h-[100dvh] bg-stone-100 md:flex md:items-center md:justify-center p-0 md:p-4">
      <div className="w-full max-w-md h-[100dvh] md:h-[850px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative flex flex-col overflow-hidden md:rounded-[2rem] border border-stone-100">
        
        {/* Toast Notification (iOS Style) */}
        {toastMessage && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-gray-900/90 backdrop-blur-md text-white text-[11px] font-black px-6 py-4 rounded-[2rem] shadow-2xl whitespace-nowrap animate-slide-in-top flex items-center border border-white/10">
            <div className="bg-emerald-500 p-1 rounded-full mr-3">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            {toastMessage}
          </div>
        )}

        {/* Floating Actions Hub (Apple Inspired) */}
        <div className="fixed bottom-28 right-6 z-[60] flex flex-col items-end gap-3">
          {supportOpen && (
            <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-4 duration-500">
              <a 
                href="https://line.me/R/ti/p/@agric" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#06C755] text-white pr-6 pl-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-black">LINE 客服</span>
              </a>
              <button 
                onClick={() => { navigateTo('support'); setSupportOpen(false); }}
                className="flex items-center gap-3 bg-amber-500 text-white pr-6 pl-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all border-2 border-white/20"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="text-xs font-black">常見問題</span>
              </button>
            </div>
          )}
          <button 
            onClick={() => setSupportOpen(!supportOpen)}
            className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-4 border-white transition-all duration-500 ${supportOpen ? 'bg-gray-800 rotate-90' : 'bg-[#14532d] active:scale-90 hover:rotate-6 shadow-emerald-900/20'}`}
          >
            {supportOpen ? <X className="w-6 h-6 text-white" /> : <Headset className="w-6 h-6 text-white" />}
          </button>

          {/* Proactive Help (Phase 4 Restored) */}
          {!supportOpen && (viewState.currentView === 'shop' || viewState.currentView === 'detail') && (
            <a 
              href="https://line.me/R/ti/p/@agric" 
              target="_blank" 
              rel="noreferrer"
              className="bg-[#06C755] text-white pr-6 pl-4 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-500 hover:scale-105 active:scale-95 group border-2 border-white/20"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-[15deg] transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black leading-none opacity-80 uppercase tracking-tighter">Support</span>
                <span className="text-[11px] font-black">諮詢小農夥伴</span>
              </div>
            </a>
          )}
        </div>

        {/* Main Viewport */}
        <div className="flex-1 overflow-y-auto hide-scrollbar bg-white">
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

        {/* Tab Navigation (iOS Frosted Glass Style) */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 flex justify-around items-center h-[85px] pb-safe shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-[70] px-2 relative">
          {[
            { id: 'home', Icon: Home, label: '首頁' },
            { id: 'shop', Icon: ShoppingBag, label: '市集' },
            { id: 'cart', Icon: ShoppingCart, label: '購物車', badge: totalItems },
            { id: 'discover', Icon: Compass, label: '探索' },
          ].map(({ id, Icon, label, badge }) => (
            <button
              key={id}
              onClick={() => navigateTo(id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 relative transition-all duration-300 active:scale-90 ${activeTab === id ? 'text-[#14532d]' : 'text-gray-400'}`}
            >
              <div className="relative">
                <Icon 
                  className={`w-[24px] h-[24px] stroke-[2.2px] transition-all duration-300 ${activeTab === id ? 'scale-110' : ''}`} 
                />
                {badge > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white shadow-xl animate-pop"
                  >
                    {badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight ${activeTab === id ? 'font-black' : 'font-bold'}`}>{label}</span>
              {activeTab === id && <div className="absolute bottom-2 w-1.5 h-1.5 bg-[#14532d] rounded-full shadow-[0_0_8px_rgba(20,83,45,0.4)]"></div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
