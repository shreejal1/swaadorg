import { getSupabaseClient } from '@/lib/supabaseClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import { Suspense } from 'react';
import ProductDetailsClient from '@/components/ProductDetailsClient';

interface Props {
  params: { productId: string };
}

async function fetchProduct(productId: string): Promise<Product | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data as any;
}

export default async function ProductPage({ params }: Props) {
  const product = await fetchProduct(params.productId);
  if (!product) notFound();

  // We must render a client component to access the cart context.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsClient product={product} />
    </Suspense>
  );
}