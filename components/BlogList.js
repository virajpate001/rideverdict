import Link from 'next/link';
import PostCard from './PostCard';
import { getAllPosts } from '@/lib/posts';
import site from '@/content/site.json';

export const totalPages = () => Math.ceil(getAllPosts().length / site.postsPerPage);

export default function BlogList({ page }) {
  const per = site.postsPerPage;
  const pages = totalPages();
  const items = getAllPosts().slice((page - 1) * per, page * per);
  return (
    <div className="container section">
      <h1>All Blogs</h1>
      <div className="grid">{items.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      {pages > 1 && (
        <nav className="pagination">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link key={n} href={n === 1 ? '/blog/' : `/blog/page/${n}/`} className={n === page ? 'active' : ''}>{n}</Link>
          ))}
        </nav>
      )}
    </div>
  );
}