"use client";

import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";

export default function ShopPage() {

  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]); // 🔥 cache
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ FETCH ONLY ONCE
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data);
      setAllProducts(res.data); // 🔥 store full data
      setLoading(false);

    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  // 🔥 SMART SEARCH (NO API CALLS)
  const handleSearch = (value: string) => {
    setQuery(value);

    // clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {

      if (!value) {
        setProducts(allProducts); // reset
        return;
      }

      const filtered = allProducts.filter((p: any) => {

        const search = value.toLowerCase();

        return (
          p.title?.toLowerCase().includes(search) ||
          p.category?.toLowerCase().includes(search) ||
          p.tags?.some((tag: string) =>
            tag.toLowerCase().includes(search)
          )
        );
      });

      setProducts(filtered);

    }, 400); // 🔥 debounce delay
  };

  return (

    <main className="bg-[#F8F6F2] min-h-screen">

      {/* HERO */}
      <section className="text-center py-16 px-5">

        <h1 className="text-4xl md:text-5xl font-serif text-[#2B1B14]">
          Our Sacred Creations
        </h1>

        <p className="mt-4 text-gray-600">
          Discover handcrafted pieces made with devotion ✨
        </p>

        {/* 🔍 SEARCH */}
        <div className="mt-6 max-w-md mx-auto">

          <input
            type="text"
            placeholder="Search by name, category, or tags..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl
              border border-[#e8dcc6]
              bg-white
              focus:outline-none
              focus:ring-2 focus:ring-[#C8A24A]
              transition
            "
          />

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-5 pb-20">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* LOADING */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white h-[250px] animate-pulse rounded-xl"
              />
            ))}

          {/* PRODUCTS */}
          {!loading && products.map((product: any) => (
            <div
              key={product._id}
              className="transition hover:-translate-y-2 duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}

        </div>

        {/* EMPTY STATE */}
        {!loading && products.length === 0 && (
          <div className="text-center mt-16 text-gray-500">
            No products found 😔
          </div>
        )}

      </section>

    </main>
  );
}