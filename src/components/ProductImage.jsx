import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const ProductImage = ({ src, alt, className = "" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !src) {
    return (
      <div className={`img-placeholder ${className}`}>
        <ImageIcon className="w-8 h-8 opacity-20" />
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
