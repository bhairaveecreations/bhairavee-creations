"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";

export default function ShopPage() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get("/products").then((res) => {

      setProducts(res.data);
      setLoading(false);

    });

  }, []);

  return (

    <main className="bg-[#F8F6F2] min-h-screen overflow-x-hidden">

      {/* HERO */}

      <section className="text-center py-20 px-5">

        <h1 className="text-4xl md:text-5xl font-serif text-[#2B1B14]">
          Our Sacred Creations
        </h1>

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover handcrafted resin décor designed to elevate your sacred
          spaces and bring divine elegance into your home.
        </p>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-5 md:px-6 pb-28">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">

          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-[260px] animate-pulse"
              />
            ))}

          {!loading &&
            products.map((product: any) => (

              <div
                key={product._id}
                className="transition duration-300 hover:-translate-y-2"
              >
                <ProductCard product={product} />
              </div>

            ))}

        </div>

      </section>

    </main>

  );

}