import Link from "next/link";
import { cld,cldSet, formatDate } from "@/lib/utils";
import { getCategory } from "@/lib/posts";

export default function PostCard({ post, size = "", mask = false }) {
  const cat = getCategory(post.category);
  const href = `/${post.slug}/`;
  return (
    <article className={`pcard ${size}`}>
      <Link
        href={href}
        className="pcard-media"
        aria-label={post.title}
        tabIndex={-1}
        data-cursor="View"
        {...(mask ? { "data-mask": "" } : {})}
      >
        {post.image?.url && (
          <img
            src={cld(post.image.url, 700)}
            srcSet={cldSet(
              post.image.url,
              size === "lg" ? [500, 800, 1200] : [400, 700],
            )}
            sizes={
              size === "lg"
                ? "(max-width:900px) 100vw, 60vw"
                : "(max-width:640px) 100vw, 400px"
            }
            alt={post.image.alt || post.title}
            loading="lazy"
            decoding="async"
            width="700"
            height="437"
          />
        )}
      </Link>
      <div className="pcard-body">
        <div className="pcard-meta">
          <span className="tag">{cat?.name}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3>
          <Link href={href} className="u-line">
            {post.title}
          </Link>
        </h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  );
}
