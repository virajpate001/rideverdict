import site from '@/content/site.json';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';
const x = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function GET() {
  const items = getAllPosts().slice(0, 20).map((p) => `
    <item><title>${x(p.title)}</title><link>${site.url}/${p.slug}/</link>
    <guid>${site.url}/${p.slug}/</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate>
    <description>${x(p.excerpt)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
    <title>${site.name}</title><link>${site.url}</link><description>${x(site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}