import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const ProductImage = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800";

  if (error || !src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={FALLBACK_IMAGE} alt="Fallback" className={`${className} object-cover opacity-50 grayscale`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-white opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && <div className="absolute inset-0 img-placeholder" />}
      <img 
        src={src} 
        alt={alt} 
        className={`${className} transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
};

export default ProductImage;
