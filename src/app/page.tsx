import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white rounded-lg p-10 flex flex-col items-center text-center relative overflow-hidden">
        <div className="max-w-2xl z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Pure Organic Goodness</h1>
          <p className="mb-6 text-lg">
            Sip on nutrient‑packed juices, snack on wholesome nuts and explore a world of organic
            ingredients sourced directly from local farmers across Nepal.
          </p>
          <Link
            href="/categories/juice"
            className="inline-block bg-accent text-primary font-semibold px-6 py-3 rounded-full shadow hover:bg-highlight hover:text-white transition-colors"
          >
            Start Shopping
          </Link>
        </div>
        {/* Abstract decorative shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-highlight rounded-full mix-blend-overlay animate-pulse" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent rounded-full mix-blend-overlay animate-pulse delay-1000" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-primary">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group block bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 h-12 overflow-hidden">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}