"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";

export default function RelatedProducts({ productId }: any) {

  const [products, setProducts] = useState<any[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {

    if (!productId) return;

    const fetchRelated = async () => {
      try {
        const res = await api.get(`/products/${productId}/related`);
        setProducts(res.data);
      } catch (err) {
        console.log("Related error:", err);
      }
    };

    fetchRelated();

  }, [productId]);

  if (!products.length) return null;

  return (
    <section className=" bg-[#F8F6F2] py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl md:text-3xl font-serif text-[#2B1B14]">
          You May Also Like ✨
        </h2>

        <span className="text-sm text-[#C8A24A]">
          Handpicked for you
        </span>

      </div>

      {/* 🔥 HORIZONTAL SCROLL */}
      <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">

        {products.map((product: any) => (

          <div
            key={product._id}
            className="
              min-w-[220px] sm:min-w-[260px] md:min-w-[280px]
              group relative
              bg-white/70 backdrop-blur-xl
              rounded-2xl overflow-hidden
              border border-[#e8dcc6]
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]
              transition duration-500 hover:-translate-y-2
            "
          >

            {/* IMAGE */}
            <Link href={`/product/${product.slug}`}>

              <div className="relative w-full aspect-square overflow-hidden">

                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="
                    object-cover
                    transition duration-700
                    group-hover:scale-110
                  "
                />

                {/* OVERLAY */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-black/30 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100
                  transition
                " />

              </div>

            </Link>

            {/* CONTENT */}
            <div className="p-4">

              <h3 className="
                text-sm md:text-base font-medium
                text-[#2B1B14]
                line-clamp-2
                group-hover:text-[#C8A24A]
                transition
              ">
                {product.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                ₹{product.price}
              </p>

            </div>

            {/* 🔥 QUICK ADD BUTTON */}
            <button
              onClick={() =>
                addToCart({
                  productId: product._id,
                  title: product.title,
                  price: product.price,
                  image: product.images?.[0] || "",
                  quantity: 1
                })
              }
              className="
                absolute bottom-3 left-1/2 -translate-x-1/2
                px-4 py-2 rounded-full text-xs
                bg-[#C8A24A] text-white
                opacity-0 group-hover:opacity-100
                translate-y-4 group-hover:translate-y-0
                transition duration-300
                shadow-lg
              "
            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}