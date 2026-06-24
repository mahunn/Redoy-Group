import { useEffect, useState, useRef } from 'react';

export default function FloatingElement({ 
  src, 
  speed = 0.1, 
  top, 
  left, 
  right, 
  bottom, 
  width = '150px', 
  className = '' 
}) {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        // Only update if element is relatively near the viewport
        const rect = elementRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate the parallax offset
  const translateY = scrollY * speed;
  
  // Style object
  const style = {
    top,
    left,
    right,
    bottom,
    width,
    transform: `translate3d(0, ${translateY}px, 0)`,
    transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)' // smooth out the scroll parallax
  };

  return (
    <div ref={elementRef} className={`floating-element ${className}`} style={style}>
      <img src={src} alt="Floating B2B product showcase" />
    </div>
  );
}
