import { categories, getCategory, getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCategory(slug);
  return { title: c.name, description: c.description, alternates: { canonical: `/category/${slug}/` } };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const c = getCategory(slug);
  const posts = getPostsByCategory(slug);
  return (
    <div className="container section">
      <h1>{c.name}</h1>
      <p>{c.description}</p>
      {posts.length ? <div className="grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div> : <p>No posts yet. Check back soon!</p>}
    </div>
  );
}