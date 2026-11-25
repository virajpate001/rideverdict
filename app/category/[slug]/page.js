import { categories, getCategory, getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import PageHero from '@/components/PageHero';

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const c = getCategory(slug);
  const posts = getPostsByCategory(slug);
  return (
    <>
      <PageHero eyebrow="Category" lines={[c.name]}>{c.description}</PageHero>
      <div className="container pad-b">
        {posts.length
          ? <div className="grid-3" data-stagger>{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          : <p>No posts yet. Check back soon!</p>}
      </div>
    </>
  );
}