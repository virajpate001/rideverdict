import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getAllPosts, categories } from '@/lib/posts';
import { cld } from '@/lib/utils';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const latest = getAllPosts().slice(0, 6);
  return (
    <>
      <section className="hero"><div className="container">
        <span className="eyebrow">Compare. Review. Decide.</span>
        <h1>Compare Bikes, Read Expert Reviews &amp; Find the Best Motorcycle in India</h1>
        <p>Compare bike prices, mileage, specifications, features, and expert reviews to make the right buying decision.</p>
        <Link href="/blog/" className="btn">View All Blogs</Link>
      </div></section>

      <section className="section"><div className="container">
        <div className="section-head"><h2>Explore Bike Comparisons, Reviews &amp; Buying Guides</h2><Link href="/blog/">View All Blogs →</Link></div>
        <div className="grid cat-grid">
          {categories.slice(0, 5).map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}/`} className="cat-tile">
              {c.image && <img src={cld(c.image, 500)} alt={c.name} loading="lazy" />}
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </div></section>

      <section className="section alt"><div className="container">
        <div className="section-head"><h2>Latest Blogs</h2><Link href="/blog/">View All Blogs →</Link></div>
        <div className="grid">{latest.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </div></section>

      <section className="section"><div className="container">
        <div className="section-head"><h2>Free Bike Tools</h2></div>
        <div className="grid">
          <Link className="card card-body" href="/bike-emi-calculator/"><h3>Bike EMI Calculator</h3><p>Plan your monthly payment.</p></Link>
          <Link className="card card-body" href="/fuel-cost-calculator/"><h3>Fuel Cost Calculator</h3><p>Know your cost per km.</p></Link>
          <Link className="card card-body" href="/bike-maintenance-cost-calculator/"><h3>Maintenance Calculator</h3><p>Estimate yearly running costs.</p></Link>
        </div>
      </div></section>

      <section className="section alt"><div className="container" style={{ maxWidth: 800 }}>
        <span className="eyebrow">Compare. Review. Decide.</span>
        <h2>About us</h2>
        <p>RideVerdict helps motorcycle fans to compare, review and find the best bikes available in India. Our mission is to deliver accurate information and expert insights to empower smarter buying decisions.</p>
        <Link href="/about-us/" className="btn">Read More</Link>
      </div></section>
    </>
  );
}