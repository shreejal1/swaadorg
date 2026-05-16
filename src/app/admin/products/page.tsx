"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { Product, Unit } from '@/types/product';
import { categories } from '@/data/categories';

export default function AdminProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: categories[0]?.id || '',
    unit: 'kg' as Unit,
    stock: 0,
    imageFile: null as File | null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin-auth') !== 'true') {
      router.replace('/admin/login');
      return;
    }
    async function fetchProducts() {
      setLoading(true);
      const supabase = getSupabaseClient();
      if (!supabase) {
        setError('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error(error);
        setError('Failed to load products');
      } else {
        setProducts(data as any);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) {
      alert('Supabase is not configured.');
      return;
    }

    // Upload image if provided
    let imageUrl: string | undefined;
    if (formData.imageFile) {
      const fileName = `${Date.now()}-${formData.imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, formData.imageFile);
      if (uploadError) {
        console.error(uploadError);
      } else {
        const { data: publicUrl } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);
        imageUrl = publicUrl?.publicUrl;
      }
    }
    const { name, description, price, categoryId, unit, stock } = formData;
    const { error: insertError, data: inserted } = await supabase
  .from('products')
  .insert([
    {
      name,
      description,
      price,
      categoryId,
      unit,
      stock,
      image: imageUrl,
    },
  ])
  .select();
    if (insertError) {
      console.error(insertError);
      alert('Failed to add product');
    } else {
      if (inserted && inserted.length > 0) {
        setProducts((prev) => [inserted[0] as any, ...prev]);
      }
      setFormData({
        name: '',
        description: '',
        price: 0,
        categoryId: categories[0]?.id || '',
        unit: 'kg',
        stock: 0,
        imageFile: null,
      });
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Products</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (NPR)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData,     price: e.target.value === '' ? 0 : Number(e.target.value),
 })}
              min={0}
              step="0.01"
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value === '' ? 0 : Number(e.target.value), })}
              min={0}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border border-gray-300 rounded p-2"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value as Unit })}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="pcs">pcs</option>
              <option value="l">l</option>
              <option value="ml">ml</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData({ ...formData, imageFile: file });
            }}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition-colors">
          Add Product
        </button>
      </form>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{product.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{product.categoryId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}