import { getAllPosts, getCategory, getPostsByCategory, categories } from '@/lib/posts';

export const dynamic = 'force-static';

const thumb = (url) =>
  url && url.includes('res.cloudinary.com') && url.includes('/upload/')
    ? url.replace('/upload/', '/upload/f_auto,q_auto,c_fill,w_144,h_144/')
    : url || '';

const tools = [
  { t: 'Bike EMI Calculator', u: '/bike-emi-calculator/', s: 'Plan your monthly bike loan payment' },
  { t: 'Fuel Cost Calculator', u: '/fuel-cost-calculator/', s: 'Know what every kilometre costs you' },
  { t: 'Maintenance Cost Calculator', u: '/bike-maintenance-cost-calculator/', s: 'Estimate yearly servicing, tyre and chain costs' },
];

export function GET() {
  const items = [
    ...getAllPosts().map((p) => ({
      k: 'post', t: p.title, u: `/${p.slug}/`, s: p.excerpt,
            c: p.categories.map((s) => getCategory(s)?.name).filter(Boolean).join(', '),
      i: thumb(p.image?.url), d: p.date, f: !!p.featured,
    })),
    ...categories.map((c) => ({
      k: 'category', t: c.name, u: `/category/${c.slug}/`,
      s: `${getPostsByCategory(c.slug).length} articles · ${c.description}`,
    })),
    ...tools.map((t) => ({ k: 'tool', ...t })),
  ];
  return Response.json({ items });
}