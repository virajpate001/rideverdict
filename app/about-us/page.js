import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Marquee from '@/components/Marquee';
import JsonLd from '@/components/JsonLd';
import Arrow from '@/components/Arrow';
import site from '@/content/site.json';

export const metadata = {
  title: 'About Us',
  description:
    'RideVerdict is India’s one-stop destination for motorcycle comparisons, expert reviews, buying guides and the latest bike news.',
  alternates: { canonical: '/about-us/' },
};

const offer = [
  ['01', 'Bike Comparisons', 'Compare them side by side on price, specs, mileage, features, performance, comfort and overall value.'],
  ['02', 'Bike Reviews', 'Detailed reviews that analyze design, engine performance, ride quality, technology, safety features, and ownership experience.'],
  ['03', 'Buying Guides', 'Expert recommendations for finding the best motorcycles based on budget, purpose, and riding preferences.'],
  ['04', 'Upcoming Bikes', 'Latest information on upcoming motorcycle launches, expected prices, specifications, and industry developments.'],
  ['05', 'Bike News', 'Coverage of new launches, price updates, industry trends, technology innovations, and important announcements from motorcycle manufacturers.'],
];

const trust = [
  ['Accurate Information', 'We carefully research motorcycle specifications, features, pricing, and industry updates from reliable sources.'],
  ['Unbiased Comparisons', 'Our comparisons focus on real-world factors that matter to buyers, helping readers understand the strengths and limitations of each motorcycle.'],
  ['User-Focused Content', 'Every article is created with the rider in mind, providing practical insights rather than unnecessary technical complexity.'],
  ['Regular Updates', 'Motorcycle prices, features, and market trends change frequently. We work to keep our content updated and relevant.'],
  ['Passion for Motorcycles', 'RideVerdict is built by motorcycle enthusiasts who understand the needs of riders and the excitement of choosing the perfect bike.'],
];

export default function About() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About RideVerdict',
    url: `${site.url}/about-us/`,
    mainEntity: { '@type': 'Organization', name: site.name, url: site.url, slogan: 'Compare. Review. Decide.' },
  };

  return (
    <>
      <JsonLd data={schema} />

      <PageHero eyebrow="About us" lines={['Compare.', 'Review.', <em key="d" className="hl">Decide.</em>]}>
        Welcome to RideVerdict, India’s one-stop destination for motorcycle comparisons, expert reviews, buying guides and latest bike news. Whether you’re looking for your first bike, moving up to a new model or just window shopping the motorcycle market, we are here to help you make informed decisions with confidence.
      </PageHero>

      <Marquee items={['Compare', 'Review', 'Decide']} speed={30} />

      {/* WHO WE ARE */}
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow" data-reveal>Who we are</p>
            <h2 className="h2" data-lines>
              <span className="line"><span>Riders helping</span></span>
              <span className="line"><span>riders <em className="hl">choose.</em></span></span>
            </h2>
          </div>
          <div>
            <p data-reveal>
              RideVerdict is an independent motorcycle information site for riders, enthusiasts and buyers looking for reliable and easy to understand information before investing in their next motorcycle. We love motorcycles and are dedicated to making your bike buying experience simple by providing in-depth comparisons, honest reviews and useful insights.
            </p>
            <p data-reveal style={{ marginBottom: 0 }}>
              We want to build a platform where any rider can easily find the information they need, to make an informed decision on the right motorcycle for their lifestyle, budget and riding needs.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal>What RideVerdict does</p>
              <h2 className="h2" data-lines>
                <span className="line"><span>Everything you need</span></span>
                <span className="line"><span>before you <em className="hl">buy.</em></span></span>
              </h2>
            </div>
          </div>
          <p className="lead" data-reveal style={{ marginBottom: 40 }}>
            We have a lot of motorbike content here at RideVerdict to help our readers make better decisions. We offer the following content:
          </p>
          <div className="tool-grid" data-stagger>
            {offer.map(([n, t, d]) => (
              <div key={n} className="tool-card">
                <span className="num">{n}</span>
                <h3 className="h3">{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="container">
          <p className="eyebrow" data-reveal>Our mission</p>
          <h2 className="display" data-lines style={{ maxWidth: 1000 }}>
            <span className="line"><span>To help riders</span></span>
            <span className="line"><span><em className="hl">compare, review,</em></span></span>
            <span className="line"><span>and decide with confidence.</span></span>
          </h2>
          <div className="split" style={{ marginTop: 'clamp(40px,6vw,72px)', alignItems: 'start' }}>
            <p data-reveal style={{ margin: 0 }}>
              We believe purchasing a motorcycle is an important decision that deserves accurate information and unbiased guidance. Our aim is to provide valuable content that empowers readers to choose the motorcycle that best fits their needs, whether for daily commuting, long-distance touring, performance riding, or weekend adventures.
            </p>
            <p data-reveal data-delay=".15" style={{ margin: 0 }}>
              By delivering clear, informative, and user-focused content, we strive to become one of India’s most trusted motorcycle resources.
            </p>
          </div>
        </div>
      </section>

      {/* WHY TRUST */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-reveal>Why trust RideVerdict?</p>
              <h2 className="h2" data-lines>
                <span className="line"><span>Five reasons riders</span></span>
                <span className="line"><span><em className="hl">stay with us.</em></span></span>
              </h2>
            </div>
          </div>
          <div className="trust-list" data-stagger>
            {trust.map(([t, d], i) => (
              <div key={t} className="trust-row">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN THE RIDE */}
      <section className="section cta-band">
        <div className="container">
          <p className="eyebrow" data-reveal>Join the ride</p>
          <h2 className="display" data-lines>
            <span className="line"><span>Let’s ride</span></span>
            <span className="line"><span><em className="hl">together.</em></span></span>
          </h2>
          <p className="lead" data-reveal data-delay=".25" style={{ margin: '28px auto 0' }}>
            Whether you’re comparing two motorcycles, researching your next purchase, or staying updated with the latest industry news, RideVerdict is here to guide you every step of the way. Thank you for visiting RideVerdict.
          </p>
          <div className="hero-cta" data-reveal data-delay=".4">
            <Link className="btn" href="/blog/">Browse all blogs <Arrow /></Link>
            <Link className="btn btn-ghost" href="/category/bike-comparisons/">Bike comparisons</Link>
          </div>
          <p className="tag" data-reveal style={{ marginTop: 48 }}>RideVerdict · Compare. Review. Decide.</p>
        </div>
      </section>
    </>
  );
}