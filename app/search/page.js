import SearchBox from '@/components/SearchBox';
import { getAllPosts } from '@/lib/posts';

export const metadata = { title: 'Search', robots: { index: false } };

export default function SearchPage() {
  const index = getAllPosts().map(({ title, slug, excerpt }) => ({ title, slug, excerpt }));
  return (
    <div className="container page-top pad-b">
      <h1>Search</h1>
      <SearchBox index={index} />
    </div>
  );
}