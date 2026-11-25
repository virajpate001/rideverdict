'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    document.documentElement.classList.add('has-cursor');
    const x = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const y = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => { x(e.clientX); y(e.clientY); };
    const over = (e) => {
      const t = e.target.closest?.('a,button,[data-cursor],input,textarea,summary');
      ring.current.dataset.state = !t ? '' : t.dataset.cursor ? 'view' : 'link';
    };
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div className="cursor" ref={ring} aria-hidden="true" />;
}