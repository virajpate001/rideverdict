'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
let lenis = null;

// Mark an element as "done" and hand control back to CSS (so hover transforms work)
const settle = (el) => {
  el.classList.add('is-in');
  gsap.set(el, { clearProps: 'opacity,visibility,transform,clipPath' });
};
const delay = (el) => parseFloat(el.dataset.delay || 0);

export default function MotionProvider() {
  const pathname = usePathname();
  const first = useRef(true);

  // 1) Smooth scrolling (once)
  useEffect(() => {
    clearTimeout(window.__rvFail); // scripts loaded → cancel the failsafe
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lenis = new Lenis({ lerp: 0.1, anchors: { offset: -100 } });
     window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      delete window.__lenis;        
    };
  }, []);

  // 2) Page animations (re-run on every route change)
  useEffect(() => {
    if (!first.current) lenis?.scrollTo(0, { immediate: true });
    first.current = false;

    const mm = gsap.matchMedia();
    mm.add(
      { ok: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 768px)' },
      (ctx) => {
        const { ok, wide } = ctx.conditions;
        if (!ok) return;

        // Headline lines slide up from a mask
        gsap.utils.toArray('[data-lines]').forEach((el) => {
          const spans = el.querySelectorAll('.line > span');
          gsap.fromTo(spans, { yPercent: 110 }, {
            yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: delay(el),
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            onComplete: () => spans.forEach((s) => { s.classList.add('is-in'); gsap.set(s, { clearProps: 'transform' }); }),
          });
        });

        // Fade-up
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 40 }, {
            autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: delay(el),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onComplete: () => settle(el),
          });
        });

        // Staggered children (batched, so rows reveal as they scroll in)
        gsap.utils.toArray('[data-stagger]').forEach((group) => {
          ScrollTrigger.batch([...group.children], {
            start: 'top 92%', once: true,
            onEnter: (batch) => gsap.fromTo(batch, { autoAlpha: 0, y: 50 }, {
              autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
              onComplete: () => batch.forEach(settle),
            }),
          });
        });

        // Image mask / clip-path reveal with inner zoom-out
        gsap.utils.toArray('[data-mask]').forEach((el) => {
          const img = el.querySelector('img');
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onComplete: () => { settle(el); if (img) gsap.set(img, { clearProps: 'transform' }); },
          });
          tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' });
          if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: 'power3.out' }, 0);
        });

        // Parallax (desktop/tablet only, for mobile performance)
        if (wide) {
          gsap.utils.toArray('[data-parallax]').forEach((el) => {
            const img = el.querySelector('img');
            if (!img) return;
            gsap.fromTo(img, { yPercent: -8 }, {
              yPercent: 8, ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            });
          });
        }
      }
    );

    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => { clearTimeout(t); mm.revert(); };
  }, [pathname]);

  return null;
}