import type { ReactNode } from 'react';
import '../app/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'Swaad Organic – Fresh Organic Foods',
  description: 'Shop organic juices, nuts and more from the heart of Nepal.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-neutral">
        <CartProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}