'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SearchButton from './SearchButton';

const links = [
  ['Home', '/'], ['All Blog', '/blog/'],
  ['Bike Comparisons', '/category/bike-comparisons/'],
  ['Bike Reviews', '/category/bike-reviews/'],
  ['Best Bikes', '/category/best-bikes/'],
  ['Upcoming Bikes', '/category/upcoming-bikes/'],
  ['About Us', '/about-us/'], ['Contact Us', '/contact-us/'],
];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (h) => (h === '/' ? path === '/' : path.startsWith(h));

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.documentElement.classList.toggle('menu-open', open); }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Link href="/" aria-label="RideVerdict home">
            <img src="/white-logo.webp" alt="RideVerdict" style={{ height: 34, width: 'auto' }} />
          </Link>

          <div className="header-right">
            <nav aria-label="Main">
              <ul className="nav">
                {links.map(([l, h]) => (
                  <li key={h}><Link href={h} className={isActive(h) ? 'active' : ''}>{l}</Link></li>
                ))}
              </ul>
            </nav>
            <SearchButton />
            <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
              <i /><i />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {links.map(([l, h], i) => (
                <motion.li key={h} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}>
                  <Link href={h} className={isActive(h) ? 'active' : ''}>{l}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}