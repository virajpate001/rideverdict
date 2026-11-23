import fs from 'node:fs';
import path from 'node:path';
import categories from '@/content/categories.json';
import { slugify } from './utils';

export { categories };
const dir = path.join(process.cwd(), 'content', 'posts');
let cache;

const readingTime = (blocks) =>
  Math.max(1, Math.round(JSON.stringify(blocks).replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200));

export function getAllPosts() {
  if (cache) return cache;
  cache = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
    .filter((p) => !p.draft)
    .map((p) => ({ ...p, readingTime: readingTime(p.content) }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return cache;
}

export const getPostBySlug = (slug) => getAllPosts().find((p) => p.slug === slug);
export const getPostsByCategory = (slug) => getAllPosts().filter((p) => p.category === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);

export function getRelated(post, n = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  return [...same, ...others.filter((p) => !same.includes(p))].slice(0, n);
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