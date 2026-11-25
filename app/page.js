import Link from 'next/link';
import PostCard from '@/components/PostCard';
import Marquee from '@/components/Marquee';
import Arrow from '@/components/Arrow';
import { getAllPosts, getPostsByCategory, categories } from '@/lib/posts';
import { cld } from '@/lib/utils';
import site from '@/content/site.json';

export const metadata = { alternates: { canonical: '/' } };

const tools = [
  ['01', 'Bike EMI Calculator', 'Plan your monthly payment before you visit the showroom.', '/bike-emi-calculator/'],
  ['02', 'Fuel Cost Calculator', 'Know exactly what every kilometre costs you.', '/fuel-cost-calculator/'],
  ['03', 'Maintenance Calculator', 'Estimate yearly servicing, tyre and chain costs.', '/bike-maintenance-cost-calculator/'],
];

export default function Home() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  const side = rest.slice(0, 2);
  const more = rest.slice(2, 5);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" data-parallax>
          {site.heroImage && <img src={cld(site.heroImage, 1800)} alt="" />}
        </div>
        <div className="container">
          <p className="eyebrow" data-reveal>{site.tagline}</p>
          <h1 className="display hero-title" data-lines data-delay=".15">
            <span className="line"><span>Compare bikes.</span></span>
            <span className="line"><span>Read real reviews.</span></span>
            <span className="line"><span>Ride the <em className="hl">right one.</em></span></span>
          </h1>
          <div className="hero-foot">
            <p className="lead" data-reveal data-delay=".5">
              India’s bike comparison, review and buying-guide platform, with prices, mileage and specs to help you decide with confidence.
            </p>
            <div className="hero-cta" data-reveal data-delay=".65">
              <Link className="btn" href="/blog/">Explore all blogs <Arrow /></Link>
              <Link className="btn btn-ghost" href="/category/bike-comparisons/">Bike comparisons</Link>
            </div>
          </div>
          <dl className="stats" data-reveal data-delay=".8">
            <div><dt>{posts.length}</dt><dd>Articles</dd></div>
            <div><dt>{categories.length}</dt><dd>Categories</dd></div>
            <div><dt>{tools.length}</dt><dd>Free tools</dd></div>
          </dl>
        </div>
      </section>

      <Marquee items={['Bike Comparisons', 'Expert Reviews', 'Buying Guides', 'Upcoming Bikes', 'Bike News', 'Electric Bikes']} />

      {/* LATEST */}
      {lead && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow" data-reveal>Latest</p>
                <h2 className="h2" data-lines>
                  <span className="line"><span>Fresh <em className="hl">stories</em></span></span>
                  <span className="line"><span>from the road.</span></span>
                </h2>
              </div>
              <Link href="/blog/" className="btn btn-ghost" data-reveal>View all blogs <Arrow /></Link>
            </div>

            <div className="feature-grid">
              <div data-reveal><PostCard post={lead} size="lg" mask /></div>
              <div className="feature-side" data-stagger>
                {side.map((p) => <PostCard key={p.slug} post={p} size="sm" />)}
              </div>
            </div>
            {more.length > 0 && (
              <div className="grid-3" data-stagger>
                {more.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal>Explore</p>
              <h2 className="h2" data-lines>
                <span className="line"><span>Find your</span></span>
                <span className="line"><span><em className="hl">kind of ride.</em></span></span>
              </h2>
            </div>
          </div>
          <div className="cat-list" data-stagger>
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/category/${c.slug}/`} className="cat-row">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span><span className="name">{c.name}</span><span className="desc">{c.description}</span></span>
                <span className="count">{getPostsByCategory(c.slug).length} posts <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal>Free tools</p>
              <h2 className="h2" data-lines>
                <span className="line"><span>Numbers, <em className="hl">simplified.</em></span></span>
              </h2>
            </div>
          </div>
          <div className="tool-grid" data-stagger>
            {tools.map(([n, t, d, h]) => (
              <Link key={h} href={h} className="tool-card">
                <span className="num">{n}</span>
                <h3 className="h3">{t}</h3>
                <p>{d}</p>
                <span className="tag">Open tool →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section alt">
        <div className="container split">
          <div>
            <p className="eyebrow" data-reveal>About us</p>
            <h2 className="h2" data-lines>
              <span className="line"><span>Built for riders</span></span>
              <span className="line"><span>who want the <em className="hl">verdict,</em></span></span>
              <span className="line"><span>not the noise.</span></span>
            </h2>
          </div>
          <div>
            {site.aboutImage && (
              <div className="pcard-media" data-mask style={{ borderRadius: 20, marginBottom: 28 }}>
                <img src={cld(site.aboutImage, 900)} alt="Riders on the road" loading="lazy" />
              </div>
            )}
            <p data-reveal>RideVerdict helps motorcycle fans compare, review and find the best bikes available in India. Our mission is to deliver accurate information and expert insights that empower smarter buying decisions.</p>
            <Link className="btn btn-ghost" href="/about-us/" data-reveal>Read more <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-band">
        <div className="container">
          <p className="eyebrow" data-reveal>Still deciding?</p>
          <h2 className="display" data-lines>
            <span className="line"><span>Let’s find your</span></span>
            <span className="line"><span><em className="hl">next bike.</em></span></span>
          </h2>
          <div className="hero-cta" data-reveal data-delay=".3">
            <Link className="btn" href="/blog/">Browse all blogs <Arrow /></Link>
            <Link className="btn btn-ghost" href="/contact-us/">Ask us anything</Link>
          </div>
        </div>
      </section>
    </>
  );
}