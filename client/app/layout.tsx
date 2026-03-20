import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: {
    default: "Bhairavee Creattions | Handcrafted Resin Art & Spiritual Decor",
    template: "%s | Bhairavee Creattions",
  },

  description:
    "Bhairavee Creattions offers handcrafted resin art, spiritual decor, and custom-made keepsakes. Unique, elegant, and meaningful designs made with love in India.",

  keywords: [
    "resin art India",
    "handmade resin decor",
    "custom resin gifts India",
    "spiritual home decor India",
    "resin pooja items",
    "resin name plates",
    "handmade gifts India",
    "Bhairavee Creattions",
  ],

  authors: [{ name: "Bhairavee Creattions" }],
  creator: "Bhairavee Creattions",

  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "Bhairavee Creattions | Resin Art & Spiritual Decor",
    description:
      "Discover handcrafted resin decor and custom spiritual creations. Elegant handmade designs crafted with precision and love.",
    url: "https://yourdomain.com",
    siteName: "Bhairavee Creattions",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bhairavee Creattions",
    description:
      "Handcrafted resin art & custom spiritual decor.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F9F7F4] text-[#2B1B14]">

        {/* 🔥 PRELOADER */}
        <Preloader />

        {/* MAIN STRUCTURE */}
        <div className="flex flex-col min-h-screen">

          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="flex-grow">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

        </div>

      </body>
    </html>
  );
}