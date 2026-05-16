"use client";

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import Image from 'next/image';

interface Props {
  product: Product;
}

export default function ProductDetailsClient({ product }: Props) {
  const { addItem } = useCart();
  const handleAdd = () => {
    addItem(product);
  };
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-1/2 h-80">
        <Image src={product.image || '/placeholder.png'} alt={product.name} fill className="object-cover rounded" />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-primary mb-4">
          NPR {product.price.toFixed(2)} / {product.unit}
        </p>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}