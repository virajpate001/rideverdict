import Link from 'next/link';
import site from '@/content/site.json';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src="/white-logo.webp" alt="RideVerdict" style={{ height: 36, width: 'auto', marginBottom: 12 }} />
            <p>RideVerdict.in is India’s trusted bike comparison and review platform with detailed comparisons, expert reviews, buying guides and the latest bike news.</p>
          </div>
          <div><h4>Quick Links</h4><ul>
            <li><Link href="/about-us/">About Us</Link></li>
            <li><Link href="/contact-us/">Contact Us</Link></li>
            <li><Link href="/privacy-policy/">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions/">Terms &amp; Conditions</Link></li>
            <li><Link href="/disclaimer/">Disclaimer</Link></li>
            <li><Link href="/sitemap.xml">Sitemap</Link></li></ul></div>
          <div><h4>Categories</h4><ul>
            <li><Link href="/category/bike-comparisons/">Bike Comparisons</Link></li>
            <li><Link href="/category/bike-reviews/">Bike Reviews</Link></li>
            <li><Link href="/category/best-bikes/">Best Bikes</Link></li>
            <li><Link href="/category/upcoming-bikes/">Upcoming Bikes</Link></li>
            <li><Link href="/category/bike-news/">Bike News</Link></li>
            <li><Link href="/category/electric-bikes/">Electric Bikes</Link></li></ul></div>
          <div><h4>Tools</h4><ul>
            <li><Link href="/bike-emi-calculator/">Bike EMI Calculator</Link></li>
            <li><Link href="/bike-maintenance-cost-calculator/">Maintenance Calculator</Link></li>
            <li><Link href="/fuel-cost-calculator/">Fuel Cost Calculator</Link></li></ul></div>
          <div><h4>Contact</h4><ul>
            <li>{site.location}</li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li></ul></div>
        </div>
        <p className="copy">© {new Date().getFullYear()} RideVerdict.in. All Rights Reserved.</p>
      </div>
    </footer>
  );
}