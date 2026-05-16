import { categories } from '@/data/categories';
import { getSupabaseClient } from '@/lib/supabaseClient';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';
import { notFound } from 'next/navigation';

interface Props {
  params: { categoryId: string };
}

export default async function CategoryPage({ params }: Props) {
  const category = categories.find((c) => c.id === params.categoryId);
  if (!category) {
    notFound();
  }

  // Fetch products from Supabase for this category
  let products: Product[] = [];
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return (
        <div>
          <h1 className="text-3xl font-bold text-primary mb-6">{category.name}</h1>
          <p className="text-gray-600">Products are temporarily unavailable because the backend is not configured.</p>
        </div>
      );
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('categoryId', params.categoryId);
    if (error) {
      console.error(error);
    } else {
      products = (data as any) || [];
    }
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">{category.name}</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found in this category yet. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}