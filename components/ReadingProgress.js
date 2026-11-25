'use client';
import { useEffect, useRef } from 'react';

export default function ReadingProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.current.style.transform = `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(raf); };
  }, []);
  return <div className="progress" ref={bar} aria-hidden="true" />;
}