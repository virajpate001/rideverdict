import BlogList, { totalPages } from '@/components/BlogList';
export const dynamicParams = false;
export const generateStaticParams = () =>
  Array.from({ length: Math.max(totalPages() - 1, 0) }, (_, i) => ({ n: String(i + 2) }));
export default async function Page({ params }) {
  const { n } = await params;
  return <BlogList page={Number(n)} />;
}