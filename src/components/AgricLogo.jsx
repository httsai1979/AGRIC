import React from 'react';
import logoImage from '../assets/Argiclogo.png';

const AgricLogo = ({ className = "w-32", ...props }) => (
  <img 
    src={logoImage} 
    alt="阿古力社會企業 Agric Social Enterprise" 
    className={`${className} object-contain`}
    {...props}
  />
);

export default AgricLogo;
