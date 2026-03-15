"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";

export default function SignatureCollection() {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {

    async function fetchProducts() {

      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );

        setProducts(res.data.slice(0, 3));

      } catch (error) {
        console.error(error);
      }

    }

    fetchProducts();

  }, []);

  if (products.length === 0) return null;

  return (

    <section
      aria-labelledby="signature-heading"
      className="relative py-24 bg-gradient-to-b from-[#F8F6F2] to-white overflow-hidden"
    >

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,162,74,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative">

        {/* Header */}

        <div className="flex items-end justify-between mb-14">

          <div>

            <h2
              id="signature-heading"
              className="text-3xl md:text-5xl font-serif text-[#2B1B14]"
            >
              Our Signature Collection
            </h2>

            <p className="mt-3 text-gray-600 max-w-xl text-sm md:text-base">
              Handcrafted resin keepsakes designed to elevate sacred spaces
              and celebrate meaningful moments.
            </p>

          </div>

          <Link
            href="/shop"
            className="hidden md:inline-flex items-center text-[#C8A24A] font-medium hover:gap-2 transition"
          >
            View Collection →
          </Link>

        </div>

        {/* Desktop Grid */}

        <div className="hidden md:grid grid-cols-3 gap-10 items-end">

          {products.map((product, index) => {

            const isMiddle = index === 1;

            return (

              <div
                key={product._id}
                className={`transition-all duration-500 transform
                ${isMiddle ? "scale-105" : "scale-100"}
                hover:-translate-y-4`}
              >
                <ProductCard product={product} />
              </div>

            );

          })}

        </div>

        {/* Mobile Slider */}

        <div className="md:hidden">

          <div className="flex justify-between items-center mb-4">

            <p className="text-sm text-gray-600">
              Signature Pieces
            </p>

            <Link
              href="/shop"
              className="text-sm font-medium text-[#C8A24A]"
            >
              View More →
            </Link>

          </div>

          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide">

            <div className="flex gap-6 w-max pr-6">

              {products.map((product) => (

                <div
                  key={product._id}
                  className="min-w-[260px] snap-start"
                >
                  <ProductCard product={product} />
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}