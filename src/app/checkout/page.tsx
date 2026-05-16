"use client";

import { useCart } from '@/context/CartContext';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { useState } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [transactionCode, setTransactionCode] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage('');
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        throw new Error('Checkout is unavailable because Supabase environment variables are not configured.');
      }

      // Upload screenshot to Supabase storage if provided
      let screenshotUrl: string | undefined;
      if (screenshotFile) {
        const fileName = `${Date.now()}-${screenshotFile.name}`;
        const { data, error } = await supabase.storage
          .from('payment-screenshots')
          .upload(fileName, screenshotFile);
        if (error) throw error;
        const { data: publicUrl } = supabase.storage
          .from('payment-screenshots')
          .getPublicUrl(fileName);
        screenshotUrl = publicUrl?.publicUrl;
      }
      // Insert order into database
      const { error: insertError } = await supabase.from('orders').insert([
        {
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: address,
          status: 'pending_payment',
          items,
          total,
          transactionCode,
          paymentScreenshotUrl: screenshotUrl,
        },
      ]);
      if (insertError) throw insertError;
      // Clear cart and show success message
      clearCart();
      setMessage('Your order has been placed. We will verify your payment and contact you soon.');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setTransactionCode('');
      setScreenshotFile(null);
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return <div>Your cart is empty. Add some items before checking out.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
            Shipping Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Order Summary</h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>NPR {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>NPR {total.toFixed(2)}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Payment Instructions</h2>
          <p className="mb-4">
            Please scan the QR code below or use the provided bank details to transfer the total amount.
            After completing the payment, enter the transaction code or upload a screenshot of the
            transaction. We will verify your payment and process your order.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* QR Code placeholder – replace with real QR image */}
            <div className="border p-4 rounded-lg bg-white shadow">
              <Image
                src="/images/qr-placeholder.png"
                alt="Payment QR Code"
                width={180}
                height={180}
              />
            </div>
            <div className="flex-1 space-y-2 text-sm">
              <p>
                <strong>Bank Name:</strong> Your Bank
              </p>
              <p>
                <strong>Account Name:</strong> Swaad Organic
              </p>
              <p>
                <strong>Account Number:</strong> 1234567890
              </p>
              <p>
                <strong>Branch:</strong> Kathmandu
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="transactionCode">
                Transaction Code (optional)
              </label>
              <input
                id="transactionCode"
                type="text"
                value={transactionCode}
                onChange={(e) => setTransactionCode(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
                placeholder="e.g. AB123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="screenshot">
                Upload Payment Screenshot (optional)
              </label>
              <input
                id="screenshot"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setScreenshotFile(file || null);
                }}
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>
        </div>
        {message && (
          <div className="p-4 bg-gray-100 rounded text-sm text-center">
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition-colors disabled:opacity-50"
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}