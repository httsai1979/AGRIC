import React from 'react';

const AgricLogo = ({ className = "w-32", ...props }) => (
  <img 
    src="https://www.agric.tw/cdn/shop/files/logo_3b1d3091-62fa-48b4-8255-b4bf79f18e69.png" 
    alt="阿古力社會企業 Agric Social Enterprise" 
    className={`${className} object-contain`}
    {...props}
  />
);

export default AgricLogo;
