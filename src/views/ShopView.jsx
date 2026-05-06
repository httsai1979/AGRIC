import React, { useState } from 'react';
import { ShoppingBag, Plus } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import ProductImage from '../components/ProductImage';

const ShopView = ({ addToCart, setSelectedProduct }) => {
  const [activeCategory, setActiveCategory] = useState('全部商品');
  const categories = ['全部商品', '熱銷商品', '耘鄉好米', '小農特產', '在地好物', '禮盒專區'];
  
  const filteredProducts = activeCategory === '全部商品' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category.includes(activeCategory));

  const formatPrice = (price) => price === null ? '請電洽' : `NT$${price}`;

  return (
    <div className="pb-24 animate-in fade-in duration-500">
      <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 pt-6 pb-3 px-4 shadow-sm">
        <h1 className="text-2xl font-black text-emerald-800 mb-4 flex items-center">
          <ShoppingBag className="w-7 h-7 mr-3 text-emerald-600" /> 線上逛市集
        </h1>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat, i) => (
            <button 
              key={i} 
              onClick={() => setActiveCategory(cat)} 
              className={`whitespace-nowrap px-6 py-3.5 rounded-2xl text-[13px] font-black transition-all duration-300 active:scale-95 ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 border border-gray-100/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 bg-gray-50">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow group cursor-pointer" onClick={() => setSelectedProduct(product)}>
            <div className="relative aspect-square overflow-hidden">
              <ProductImage 
                src={product.images?.[0] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <div className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
                  {product.category}
                </div>
                {product.level2_details?.certification?.includes("有機") && (
                  <div className="bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-md shadow-sm border border-white/20 uppercase tracking-tighter">
                    Organic
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-sm text-gray-800 font-bold line-clamp-2 h-10 leading-snug mb-3">{product.name}</h3>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{product.specs}</span>
                  <span className="text-amber-600 font-black">{formatPrice(product.price)}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }} 
                  className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-md hover:bg-emerald-700 active:scale-90 transition-all"
                >
                  <Plus className="w-5 h-5" />
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
