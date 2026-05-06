import React, { useState } from 'react';
import { X, CheckCircle, MapPin, Package, ShieldCheck, ShoppingCart, Minus, Plus, Box, Maximize, Sprout, Leaf, Activity, ClipboardList, FileCheck, ExternalLink, ZoomIn } from 'lucide-react';

const ProductDetailModal = ({ product, isOpen, onClose, addToCart }) => {
  const [qty, setQty] = React.useState(1);
  const [activeTab, setActiveTab] = useState('intro');
  const [showReportZoom, setShowReportZoom] = useState(false);

  if (!isOpen || !product) return null;

  const tabs = [
    { id: 'intro', label: '商品介紹', icon: Sprout },
    { id: 'specs', label: '規格標示', icon: Box },
    { id: 'report', label: '檢驗報告', icon: ShieldCheck },
  ];

  const nutritionData = product.level2_details?.nutrition || "";
  const hasZeroFat = nutritionData.includes("脂肪\n\n 0公克") || nutritionData.includes("脂肪\n\n 0.0公克");
  const hasHighFiber = nutritionData.includes("膳食纖維") || product.name.includes("糙米") || product.name.includes("黑米");
  const isLowCal = nutritionData.match(/熱量\n\n (\d+)/)?.[1] < 100;

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500 max-h-[90vh] flex flex-col">
          {/* Header Image */}
          <div className="relative h-64 shrink-0">
            <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/40 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Visual Trust Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
              {product.hasReport && (
                <div className="bg-emerald-600/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> 檢驗合格
                </div>
              )}
              {product.level2_details?.certification?.includes("有機") && (
                <div className="bg-amber-500/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20 flex items-center">
                  <Leaf className="w-3.5 h-3.5 mr-1.5" /> 有機認證
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-8 right-8">
              <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-2 block">{product.category}</span>
              <h2 className="text-2xl font-black text-white leading-tight">{product.name}</h2>
            </div>
          </div>

          {/* Segmented Tabs */}
          <div className="px-6 pt-4 bg-white shrink-0">
            <div className="bg-gray-100 p-1 rounded-2xl flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[11px] font-black transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-8 overflow-y-auto flex-1 hide-scrollbar">
            {activeTab === 'intro' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">價格</p>
                    <p className="text-3xl font-black text-amber-600">NT$ {product.price}</p>
                  </div>
                  <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black text-emerald-800">{product.origin || '雲林縣'}</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100">
                  <h4 className="text-xs font-black text-gray-900 mb-3 flex items-center gap-2 uppercase tracking-widest">
                    <ClipboardList className="w-4 h-4 text-emerald-600" /> 商品描述
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium whitespace-pre-wrap">
                    {product.level2_details?.intro || product.description}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Visualized Nutrition Badges */}
                <div className="flex flex-wrap gap-2">
                  {hasZeroFat && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center">
                      <Activity className="w-3.5 h-3.5 mr-1.5" /> 零脂肪
                    </span>
                  )}
                  {hasHighFiber && (
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center">
                      <Sprout className="w-3.5 h-3.5 mr-1.5" /> 高膳食纖維
                    </span>
                  )}
                  {isLowCal && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-lg border border-blue-200 flex items-center">
                      <Activity className="w-3.5 h-3.5 mr-1.5" /> 低卡路里
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Maximize className="w-5 h-5 text-emerald-600" />
                      <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">規格詳情</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-medium bg-white p-4 rounded-xl border border-gray-100">
                      {product.level2_details?.specs || product.specs}
                    </p>
                  </div>

                  {product.level2_details?.nutrition && (
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">營養標示</h4>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap font-medium bg-white p-4 rounded-xl border border-gray-100">
                        {product.level2_details.nutrition}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'report' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 text-center">
                  <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h4 className="text-lg font-black text-emerald-900 mb-2">檢驗報告預覽</h4>
                  <p className="text-xs text-emerald-700/60 font-bold mb-6">我們堅持每一批產品皆通過第三方公正單位檢驗</p>
                  
                  <button 
                    onClick={() => setShowReportZoom(true)}
                    className="relative w-full aspect-[3/4] bg-white rounded-2xl overflow-hidden border-2 border-emerald-100 shadow-inner group"
                  >
                    <img 
                      src={product.reportImage || "https://cdn1.cybassets.com/s/files/14475/ckeditor/pictures/content_153739_1.jpg"} 
                      alt="Inspection Report" 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-emerald-800">點擊放大查看全文</span>
                    </div>
                  </button>

                  <a 
                    href="https://www.agric.tw/blogs/%E6%AA%A2%E9%A9%93%E5%A0%B1%E5%91%8A" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-emerald-600 text-xs font-black hover:underline"
                  >
                    前往官網查看原始文件 <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
              <div className="flex items-center text-[11px] text-gray-500 font-bold bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
                <CheckCircle className="w-4 h-4 text-amber-500 mr-3 shrink-0" />
                保存方式：{product.storage || product.level2_details?.storage || '常溫保存'}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-white border-t border-gray-100 flex items-center gap-4 shrink-0 pb-10 sm:pb-6">
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

      {/* Report Zoom Modal */}
      {showReportZoom && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
          <button 
            onClick={() => setShowReportZoom(false)}
            className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[85vh]">
            <img 
              src={product.reportImage || "https://cdn1.cybassets.com/s/files/14475/ckeditor/pictures/content_153739_1.jpg"} 
              alt="Report Full" 
              className="w-full h-auto"
            />
          </div>
          <p className="mt-6 text-white/50 text-xs font-black uppercase tracking-[0.2em]">Full Inspection Report View</p>
        </div>
      )}
    </>
  );
};

export default ProductDetailModal;

export default ProductDetailModal;
