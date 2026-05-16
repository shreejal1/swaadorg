"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-4">Looks like you haven’t added anything yet.</p>
        <Link href="/" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded shadow p-4 gap-4"
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={item.image || '/placeholder.png'}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm">
                NPR {item.price.toFixed(2)} / {item.unit}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <label htmlFor={`qty-${item.id}`} className="sr-only">
                  Quantity
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  className="w-20 border border-gray-300 rounded p-1 text-center"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 ml-2 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="font-semibold">
              NPR {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
        <div className="text-lg font-bold text-primary">
          Total: NPR {total.toFixed(2)}
        </div>
      </div>
      <div className="mt-6 text-right">
        <Link
          href="/checkout"
          className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition-colors"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}