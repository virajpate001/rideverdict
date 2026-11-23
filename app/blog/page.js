import BlogList from '@/components/BlogList';
export const metadata = { title: 'All Blogs', description: 'Bike comparisons, reviews, buying guides and news for Indian riders.', alternates: { canonical: '/blog/' } };
export default function Blog() { return <BlogList page={1} />; }