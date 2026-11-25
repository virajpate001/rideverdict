import Link from 'next/link';
import PostCard from './PostCard';
import PageHero from './PageHero';
import { getAllPosts } from '@/lib/posts';
import site from '@/content/site.json';

export const totalPages = () => Math.ceil(getAllPosts().length / site.postsPerPage);

export default function BlogList({ page }) {
  const per = site.postsPerPage;
  const pages = totalPages();
  const items = getAllPosts().slice((page - 1) * per, page * per);
  return (
    <>
      <PageHero eyebrow="The journal" lines={['All', <em key="s" className="hl">stories.</em>]}>
        Bike comparisons, expert reviews, buying guides and the latest news for Indian riders.
      </PageHero>
      <div className="container pad-b">
        <div className="grid-3" data-stagger>{items.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        {pages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Link key={n} href={n === 1 ? '/blog/' : `/blog/page/${n}/`} className={n === page ? 'active' : ''}>{n}</Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}