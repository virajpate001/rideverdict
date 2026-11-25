import Link from 'next/link';
import { cld, formatDate } from '@/lib/utils';
import { getCategory } from '@/lib/posts';

export default function PostCard({ post, size = '', mask = false }) {
  const cat = getCategory(post.category);
  const href = `/${post.slug}/`;
  return (
    <article className={`pcard ${size}`}>
      <Link href={href} className="pcard-media" aria-label={post.title} tabIndex={-1} data-cursor="View" {...(mask ? { 'data-mask': '' } : {})}>
        {post.image?.url && (
          <img src={cld(post.image.url, size === 'lg' ? 1100 : 700)} alt={post.image.alt || post.title} loading="lazy" width="700" height="437" />
        )}
      </Link>
      <div className="pcard-body">
        <div className="pcard-meta"><span className="tag">{cat?.name}</span><span>{formatDate(post.date)}</span></div>
        <h3><Link href={href} className="u-line">{post.title}</Link></h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}