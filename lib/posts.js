import fs from 'node:fs';
import path from 'node:path';
import categories from '@/content/categories.json';
import { slugify } from './utils';

export { categories };
const dir = path.join(process.cwd(), 'content', 'posts');
let cache;

const readingTime = (blocks) =>
  Math.max(1, Math.round(JSON.stringify(blocks).replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200));

const known = new Set(categories.map((c) => c.slug));

// Accepts "category": "x"  OR  "categories": ["x","y"]. First = primary.
function normalize(p, file) {
  const cats = [...new Set([].concat(p.categories ?? p.category ?? []))];
  const bad = cats.filter((c) => !known.has(c));
  if (!cats.length || bad.length)
    throw new Error(`${file}: ${cats.length ? `unknown category "${bad.join('", "')}"` : 'no category set'}. Add it to content/categories.json or fix the typo.`);
  return { ...p, categories: cats, category: cats[0] };
}

export function getAllPosts() {
  if (cache) return cache;
  cache = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => normalize(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')), f))
    .filter((p) => !p.draft)
    .map((p) => ({ ...p, readingTime: readingTime(p.content) }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return cache;
}

export const getPostBySlug = (slug) => getAllPosts().find((p) => p.slug === slug);
export const getPostsByCategory = (slug) => getAllPosts().filter((p) => p.categories.includes(slug));
export const getCategory = (slug) => categories.find((c) => c.slug === slug);

export function getRelated(post, n = 3) {
  const score = (p) =>
    p.categories.filter((c) => post.categories.includes(c)).length * 2 +
    (p.tags || []).filter((t) => (post.tags || []).includes(t)).length;
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => [score(p), p])
    .sort((a, b) => b[0] - a[0])
    .map((x) => x[1])
    .slice(0, n);
}

export function getHeadings(post) {
  const out = [];
  for (const b of post.content) {
    if (b.type === 'h2') out.push({ text: b.text, id: slugify(b.text) });
    if (b.type === 'html')
      for (const m of b.html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
        const t = m[1].replace(/<[^>]+>/g, '').trim();
        out.push({ text: t, id: slugify(t) });
      }
  }
  return out;
}