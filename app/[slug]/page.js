import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getRelated, getCategory, getHeadings } from '@/lib/posts';
import BlockRenderer from '@/components/BlockRenderer';
import PostCard from '@/components/PostCard';
import JsonLd from '@/components/JsonLd';
import { cld, formatDate } from '@/lib/utils';
import site from '@/content/site.json';

export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) return {};
  const img = p.image?.url ? cld(p.image.url, 1200) : undefined;
  return {
    title: p.seoTitle || p.title,
    description: p.excerpt,
    alternates: { canonical: `/${p.slug}/` },
    openGraph: { type: 'article', title: p.title, description: p.excerpt, url: `/${p.slug}/`, publishedTime: p.date, modifiedTime: p.updated || p.date, images: img ? [img] : [] },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategory(post.category);
  const headings = getHeadings(post);
  const related = getRelated(post, 3);
  const url = `${site.url}/${post.slug}/`;
  const faqs = post.content.filter((b) => b.type === 'faq').flatMap((b) => b.items);

  const schema = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, description: post.excerpt, image: post.image?.url,
      datePublished: post.date, dateModified: post.updated || post.date,
      author: { '@type': 'Person', name: post.author || 'RideVerdict Team' },
      publisher: { '@type': 'Organization', name: site.name, url: site.url },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [['Home', site.url], [cat?.name, `${site.url}/category/${post.category}/`], [post.title, url]]
        .map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
    },
  ];
  if (faqs.length)
    schema.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });

  return (
    <>
      <JsonLd data={schema} />
      <article className="article">
        <p className="meta"><Link href="/">Home</Link> › <Link href={`/category/${post.category}/`}>{cat?.name}</Link></p>
        <h1>{post.title}</h1>
        <p className="meta">By {post.author} · {formatDate(post.date)}{post.updated && post.updated !== post.date && ` · Updated ${formatDate(post.updated)}`} · {post.readingTime} min read</p>
        {post.image?.url && <img className="hero-img" src={cld(post.image.url, 1200)} alt={post.image.alt || post.title} />}
        {headings.length > 2 && (
          <nav className="toc"><strong>In this article</strong>
            <ol>{headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
          </nav>
        )}
        <div className="prose"><BlockRenderer blocks={post.content} /></div>
      </article>
      {related.length > 0 && (
        <section className="section alt"><div className="container">
          <div className="section-head"><h2>Related Articles</h2></div>
          <div className="grid">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div></section>
      )}
    </>
  );
}