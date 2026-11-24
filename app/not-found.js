import Link from 'next/link';
export const metadata = { title: 'Page not found' };
export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h1>404 – Page not found</h1>
      <p>The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/blog/" className="btn">Browse all blogs</Link>
    </div>
  );
}