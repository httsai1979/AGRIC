import React, { useEffect, useState } from 'react';
import { ArrowLeft, Leaf, ShieldCheck, RefreshCw, HandHeart, Users, FileText, ArrowRight } from 'lucide-react';

const AboutUsView = ({ onBack, navigateTo }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/brand.json')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load brand data, falling back:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="h-screen flex items-center justify-center text-emerald-600 bg-stone-50"><Leaf className="w-8 h-8 animate-pulse" /></div>;
  }

  return (
    <div className="bg-stone-50 min-h-screen relative overflow-x-hidden animate-in fade-in duration-500">
      {/* Header Back Button */}
      <div className="absolute top-8 left-6 z-50">
        <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors border border-white/30 shadow-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Section 1: The Root (Parallax) */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${data.foundation.image})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-stone-50" />
        
        <div className="relative z-10 text-center px-6 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-emerald-400 text-sm font-black tracking-[0.3em] uppercase">Brand Legacy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            源於一份守護土地的<br/><span className="text-emerald-400">承諾</span>
          </h1>
          <p className="text-stone-200 font-medium leading-relaxed max-w-sm mx-auto text-sm drop-shadow-md">
            {data.foundation.heritage}
          </p>
        </div>
      </div>

      {/* Content Section: Problem & Solution */}
      <div className="px-6 py-20 relative z-20 bg-stone-50 -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto space-y-16">
          <div className="text-center animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-black text-gray-900 mb-4">{data.theProblem.title}</h2>
            <p className="text-gray-500 leading-relaxed font-medium">{data.theProblem.description}</p>
          </div>
          
          <div className="relative flex justify-center py-4">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-500 to-transparent"></div>
            <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500 bg-stone-50" />
          </div>

          <div className="text-center animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <h2 className="text-2xl font-black text-emerald-800 mb-4">{data.theSolution.title}</h2>
            <p className="text-gray-500 leading-relaxed font-medium">{data.theSolution.description}</p>
          </div>
        </div>
      </div>

      {/* Section 2: Impact Loop */}
      <div className="bg-emerald-900 py-24 px-6 text-white relative overflow-hidden rounded-[3rem] mx-2 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
        
        <div className="max-w-md mx-auto relative z-10">
          <h2 className="text-3xl font-black text-center mb-12 flex items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 text-emerald-400" />
            {data.impactLoop.title}
          </h2>
          
          <div className="space-y-6">
            {data.impactLoop.steps.map((step) => (
              <div key={step.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl flex items-start gap-5 hover:bg-white/20 transition-colors">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center font-black shrink-0 text-white shadow-lg text-lg">
                  {step.id}
                </div>
                <div>
                  <h3 className="text-lg font-black text-emerald-50 mb-1.5 tracking-wide">{step.title}</h3>
                  <p className="text-emerald-100/70 text-sm font-medium leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Farmer Voices */}
      <div className="py-24 px-6 bg-stone-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-amber-500" />
            農人真實迴響
          </h2>
          
          <div className="space-y-8">
            {data.farmerVoices.map((farmer, index) => (
              <div key={index} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-100 relative group">
                <div className="h-56 overflow-hidden relative">
                  <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-5 left-6">
                    <p className="text-white font-black text-2xl tracking-wide">{farmer.name}</p>
                    <p className="text-emerald-300 font-bold text-sm tracking-wider">{farmer.role}</p>
                  </div>
                </div>
                <div className="p-8 relative">
                  <div className="absolute -top-7 right-6 w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg border-[4px] border-white">
                    <HandHeart className="w-6 h-6" />
                  </div>
                  <p className="text-gray-600 font-bold italic text-base leading-relaxed">
                    "{farmer.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* B2B Strategic Integration: ESG Bridge */}
      <div className="py-24 px-6 bg-stone-50 text-center pb-32">
        <div className="max-w-md mx-auto bg-teal-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-600 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-900 rounded-full -ml-10 -mb-10 blur-xl opacity-50"></div>
          
          <div className="relative z-10">
            <Leaf className="w-12 h-12 text-teal-300 mx-auto mb-6 drop-shadow-md" />
            <h3 className="text-2xl font-black text-white mb-4 tracking-wide">企業永續的綠色橋樑</h3>
            <p className="text-teal-100/90 text-sm font-bold mb-10 leading-relaxed max-w-[250px] mx-auto">
              將阿古力的社會影響力，轉化為貴企業的 ESG 具體實踐。我們提供完整的企業綠色採購與永續合作方案。
            </p>
            
            <button 
              onClick={() => navigateTo('esg')}
              className="w-full bg-teal-400 text-teal-950 font-black py-4 rounded-2xl shadow-xl hover:bg-teal-300 active:scale-95 transition-all flex items-center justify-center gap-2 border border-teal-300"
            >
              <FileText className="w-5 h-5" />
              索取 2026 永續合作提案
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsView;
