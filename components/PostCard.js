import Link from 'next/link';
import { cld, formatDate } from '@/lib/utils';
import { getCategory } from '@/lib/posts';

export default function PostCard({ post }) {
  const cat = getCategory(post.category);
  const href = `/${post.slug}/`;
  return (
    <article className="card">
      <Link href={href}>
        {post.image?.url && <img src={cld(post.image.url, 600)} alt={post.image.alt || post.title} loading="lazy" width="600" height="375" />}
      </Link>
      <div className="card-body">
        <span className="tag">{cat?.name}</span>
        <h3><Link href={href}>{post.title}</Link></h3>
        <p className="meta">{formatDate(post.date)} · {post.readingTime} min read</p>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}