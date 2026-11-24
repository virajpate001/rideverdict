import site from '@/content/site.json';
export const dynamic = 'force-static';
export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` };
}