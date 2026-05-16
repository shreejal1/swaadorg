import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types/product';

interface Props {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link href={`/products/${product.id}`} className="block relative h-48 w-full">
        <Image
          src={product.image || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-1 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 flex-1 truncate">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-primary">
            NPR {product.price.toFixed(2)} / {product.unit}
          </span>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-primary text-white px-3 py-1 rounded hover:bg-secondary transition-colors text-sm"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}