import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08,
        });
      }
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'w-12 h-12 border-cyan-400 bg-cyan-400/10 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-110'
            : 'w-8 h-8 border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 pointer-events-none ${
          isHovered ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_12px_rgba(6,182,212,1)]' : 'w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
        }`}
      />
    </div>
  );
}
