import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2B1B14] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif mb-4">
              Bhairavee Creattions
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">
              Handcrafted resin décor and sacred keepsakes designed
              to bring elegance and spirituality to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-lg">
              Quick Links
            </h4>

            <ul className="space-y-2 text-gray-300 text-sm">

              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/custom-order" className="hover:text-white transition">
                  Custom Order
                </Link>
              </li>

              <li>
                <Link href="/profile" className="hover:text-white transition">
                  My Account
                </Link>
              </li>

            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-medium mb-4 text-lg">
              Customer Support
            </h4>

            <ul className="space-y-2 text-gray-300 text-sm">

              <li>
                <Link href="/shipping-policy" className="hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link href="/return-policy" className="hover:text-white transition">
                  Return Policy
                </Link>
              </li>

              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
               <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-medium mb-4 text-lg">
              Connect With Us
            </h4>

            <p className="text-gray-300 text-sm mb-4">
              Follow us for latest creations and updates.
            </p>

            <div className="flex gap-4 text-sm">

              <a
                href="https://www.instagram.com/bhairaveecreattions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="https://wa.me/917218311737"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                WhatsApp
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Bhairavee Creattions. All rights reserved.
        </div>

      </div>
    </footer>
  );
}