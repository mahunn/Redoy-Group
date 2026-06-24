"use client";

import { useEffect, useState, useRef } from 'react';

interface FloatingElementProps {
  src: string;
  speed?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width?: string;
  className?: string;
}

export default function FloatingElement({ 
  src, 
  speed = 0.1, 
  top, 
  left, 
  right, 
  bottom, 
  width = '150px', 
  className = '' 
}: FloatingElementProps) {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateY = scrollY * speed;
  
  const style = {
    top,
    left,
    right,
    bottom,
    width,
    transform: `translate3d(0, ${translateY}px, 0)`,
    transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
  };

  return (
    <div ref={elementRef} className={`absolute pointer-events-auto will-change-transform ${className}`} style={style}>
      <img 
        src={src} 
        alt="Floating B2B product showcase" 
        className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105 hover:rotate-1" 
      />
    </div>
  );
}
