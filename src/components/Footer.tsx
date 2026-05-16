import Link from 'next/link';

const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+977-0000000000';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@swaadorganic.com';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl mb-2">Swaad Organic</h3>
            <p className="text-sm max-w-md">
              Bringing you fresh, organically sourced foods from across Nepal. We
              focus on quality, sustainability and supporting local farmers.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Contact Us</span>
            <a href={`tel:${contactPhone}`} className="hover:underline">
              {contactPhone}
            </a>
            <a href={`mailto:${contactEmail}`} className="hover:underline">
              {contactEmail}
            </a>
            <Link href="/admin" className="hover:underline">
              Admin Login
            </Link>
          </div>
        </div>
        <div className="mt-6 text-sm text-center border-t border-white/20 pt-4">
          © {new Date().getFullYear()} Swaad Organic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}