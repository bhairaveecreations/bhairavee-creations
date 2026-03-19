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

            <p className="text-gray-300">
              Handcrafted resin décor and sacred keepsakes designed
              to bring elegance and spirituality to your home.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h4 className="font-medium mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-gray-300">

              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/shop">Shop</Link>
              </li>

              <li>
                <Link href="/custom-order">Custom Order</Link>
              </li>

              <li>
                <Link href="/profile">My Account</Link>
              </li>

            </ul>

          </div>

          {/* Customer Support */}

          <div>

            <h4 className="font-medium mb-4">
              Customer Support
            </h4>

            <ul className="space-y-2 text-gray-300">

              <li>
                <Link href="#">Shipping Policy</Link>
              </li>

              <li>
                <Link href="#">Return Policy</Link>
              </li>

              <li>
                <Link href="#">Privacy Policy</Link>
              </li>

              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>

            </ul>

          </div>

          {/* Social */}

          <div>

            <h4 className="font-medium mb-4">
              Connect With Us
            </h4>

            <p className="text-gray-300 mb-4">
              Follow us for latest creations and updates.
            </p>

            <div className="flex gap-4">

              <Link href="https://instagram.com">
                Instagram
              </Link>

              <Link href="https://whatsapp.com">
                WhatsApp
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom Bar */}

        <div className="border-t border-gray-600 pt-6 text-center text-gray-400">

          © {new Date().getFullYear()}Bhairavee Creattions. All rights reserved.

        </div>

      </div>

    </footer>
  );
}