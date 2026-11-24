import site from '@/content/site.json';
import { getAllPosts, categories } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap() {
  const u = (p) => `${site.url}${p}`;
  const pages = ['/', '/blog/', '/about-us/', '/contact-us/', '/bike-emi-calculator/', '/fuel-cost-calculator/',
    '/bike-maintenance-cost-calculator/', '/privacy-policy/', '/terms-conditions/', '/disclaimer/'];
  return [
    ...pages.map((p) => ({ url: u(p) })),
    ...categories.map((c) => ({ url: u(`/category/${c.slug}/`) })),
    ...getAllPosts().map((p) => ({ url: u(`/${p.slug}/`), lastModified: p.updated || p.date })),
  ];
}