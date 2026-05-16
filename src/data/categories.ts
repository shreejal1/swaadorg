export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

/**
 * Hard‑coded sample categories. In a real application these
 * would be loaded from the database via Supabase.
 */
export const categories: Category[] = [
  {
    id: 'juice',
    name: 'Fresh Juices',
    description: 'Cold‑pressed organic fruit and vegetable juices.',
    image: '/images/categories/juice.jpg',
  },
  {
    id: 'nuts',
    name: 'Nuts & Seeds',
    description: 'A variety of wholesome nuts and seeds.',
    image: '/images/categories/nuts.jpg',
  },
  {
    id: 'grains',
    name: 'Grains & Pulses',
    description: 'Organic grains, lentils and pulses.',
    image: '/images/categories/grains.jpg',
  },
  {
    id: 'spices',
    name: 'Spices & Herbs',
    description: 'Fresh herbs and spices to enhance your meals.',
    image: '/images/categories/spices.jpg',
  },
];