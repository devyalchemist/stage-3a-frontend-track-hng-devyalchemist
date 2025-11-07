import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export default async function EarphoneDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  if (!slug) {
    notFound();
  }
  return <ProductDetailClient slug={slug} />;
}