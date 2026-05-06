import React, { useState } from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

const ShopView = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('全部商品');
  const categories = ['全部商品', '熱銷商品', '耘鄉好米', '小農特產', '在地好物', '禮盒專區'];
  
  const filteredProducts = activeCategory === '全部商品' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="pb-24 animate-in fade-in duration-300">
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-30 pt-6 pb-3 px-4 shadow-sm">
        <h1 className="text-2xl font-black text-emerald-800 mb-4 flex items-center">
          <ShoppingBag className="w-6 h-6 mr-2" /> 線上逛市集
        </h1>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat)} 
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 bg-gray-50">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm">
                {product.category}
              </div>
            </div>
            <div className="p-3.5 flex flex-col flex-grow">
              <h3 className="text-sm text-gray-800 font-bold line-clamp-2 h-10 leading-snug">{product.name}</h3>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-amber-600 font-black text-lg"><span className="text-xs">NT$</span>{product.price}</span>
                <button 
                  onClick={() => addToCart(product)} 
                  className="bg-emerald-50 text-emerald-700 p-2 rounded-xl hover:bg-emerald-100 active:scale-90 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopView;
