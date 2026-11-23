'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  ['Home', '/'], ['All Blog', '/blog/'],
  ['Bike Comparisons', '/category/bike-comparisons/'],
  ['Bike Reviews', '/category/bike-reviews/'],
  ['Best Bikes', '/category/best-bikes/'],
  ['Upcoming Bikes', '/category/upcoming-bikes/'],
  ['About Us', '/about-us/'], ['Contact Us', '/contact-us/'],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/"><img src="/white-logo.webp" alt="RideVerdict" style={{ height: 36, width: 'auto' }} /></Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <nav>
          <ul className={`nav ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
            {links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
            <li><Link href="/search/">Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}