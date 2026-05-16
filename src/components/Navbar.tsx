"use client";

import Link from 'next/link';
import Image from 'next/image';
import { categories } from '../data/categories';
import { useState } from 'react';

/**
 * Primary navigation bar component. Displays the logo, navigation links
 * and a dropdown of product categories. On smaller screens the menu
 * collapses into a hamburger icon.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Swaad Organic logo" width={40} height={40} />
              <span className="font-bold text-xl text-primary">Swaad Organic</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-highlight">Home</Link>
            <div className="relative group">
              <button className="hover:text-highlight focus:outline-none">
                Categories
              </button>
              <div className="absolute hidden group-hover:block bg-white border border-gray-200 mt-2 py-2 w-48 shadow-lg z-50">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-highlight"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/cart" className="hover:text-highlight">Cart</Link>
            <Link href="/admin" className="hover:text-highlight">Admin</Link>
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-highlight hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base hover:bg-gray-100">
              Home
            </Link>
            <div className="border-t border-gray-200">
              <span className="block px-3 py-2 text-gray-700">Categories</span>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="block px-6 py-2 text-sm hover:bg-gray-100"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link href="/cart" className="block px-3 py-2 rounded-md text-base hover:bg-gray-100">
              Cart
            </Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base hover:bg-gray-100">
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}