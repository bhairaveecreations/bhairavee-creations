import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";
import Preloader from "@/components/ui/Preloader";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bhairaveecreattions.in"),

  title: {
    default:
      "Bhairavee Creattions | Handcrafted Resin Art & Spiritual Decor India",
    template: "%s | Bhairavee Creattions",
  },

  description:
    "Shop handcrafted resin art, spiritual decor, pooja items & custom gifts in India. Premium handmade resin products designed with love by Bhairavee Creattions.",

  keywords: [
    "resin art India",
    "custom resin gifts",
    "resin pooja items",
    "spiritual decor India",
    "handmade resin name plates",
    "epoxy resin art India",
    "custom handmade gifts India",
  ],

  applicationName: "Bhairavee Creattions",
  authors: [{ name: "Bhairavee Creattions" }],
  creator: "Bhairavee Creattions",
  publisher: "Bhairavee Creattions",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Premium Resin Art & Spiritual Decor | Bhairavee Creattions",
    description:
      "Explore luxury handcrafted resin decor, pooja items, and custom gifts made in India.",
    url: "/",
    siteName: "Bhairavee Creattions",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // 👉 MUST CREATE THIS
        width: 1200,
        height: 630,
        alt: "Bhairavee Creattions Resin Art",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bhairavee Creattions",
    description: "Handcrafted resin art & spiritual decor in India",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "shopping",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 🔥 STRUCTURED DATA (GOOGLE RICH SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Bhairavee Creattions",
              url: "https://www.bhairaveecreattions.in",
              logo: "https://www.bhairaveecreattions.in/logo.png",
              description:
                "Handcrafted resin art, spiritual decor, and custom gifts in India.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/vip_hamper_hub",
              ],
            }),
          }}
        />

        {/* Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className="bg-[#F9F7F4] text-[#2B1B14]">
        {/* 🔥 PRELOADER */}
        <Preloader />

        {/* MAIN STRUCTURE */}
        <div className="flex flex-col min-h-screen">
          {/* NAVBAR */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="flex-grow">{children}</main>

          {/* FOOTER */}
          <Footer />
        </div>
      </body>
    </html>
  );
}