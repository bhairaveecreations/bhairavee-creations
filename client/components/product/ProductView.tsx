"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import RelatedProducts from "./RelatedProducts";

export default function ProductView({ product }: any) {

  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );

  const price = selectedVariant?.price || product.price;

  return (
    <>
      <section className="bg-[#F8F6F2] min-h-screen pt-30 px-4 md:px-10 pb-10">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* IMAGE */}
          <div className="relative w-full aspect-square md:h-[520px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] bg-white">

            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.title}
              fill
              className="object-cover hover:scale-105 transition duration-500"
              priority
            />

          </div>

          {/* DETAILS */}
          <div className="flex flex-col">

            <h1 className="text-2xl md:text-4xl font-serif text-[#2B1B14]">
              {product.title}
            </h1>

            <p className="mt-4 text-gray-600">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="mt-6">
              <p className="text-2xl md:text-3xl font-semibold text-[#2B1B14]">
                ₹{price}
              </p>
              <p className="text-sm text-green-600 mt-1">
                ✨ Inclusive of all taxes
              </p>
            </div>

            {/* VARIANTS */}
            {product.variants?.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-[#7a6a58] mb-2">
                  Select Variant
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`
                        px-4 py-2 rounded-full text-sm border transition
                        ${selectedVariant?.name === v.name
                          ? "bg-[#C8A24A] text-white border-[#C8A24A]"
                          : "bg-white border-gray-300 hover:border-[#C8A24A]"
                        }
                      `}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ADD TO CART */}
            <div className="mt-8">
              <button
                onClick={() =>
                  addToCart({
                    productId: product._id,
                    title: product.title,
                    price,
                    image: product.images?.[0] || "",
                    variant: selectedVariant?.name,
                    quantity: 1
                  })
                }
                className="
                  w-full
                  bg-gradient-to-r from-[#C8A24A] to-[#b89238]
                  text-white py-3 rounded-full
                  hover:shadow-lg transition
                "
              >
                🛒 Add to Cart
              </button>
            </div>

            {/* TRUST */}
            <div className="mt-6 text-sm text-gray-500">
              <p>🔒 Secure payment guaranteed</p>
              <p>✨ Handcrafted with love</p>
            </div>

          </div>

        </div>

      </section>

      {/* 🔥 RELATED PRODUCTS */}
      <div className="bg-[#F8F6F2] pb-16">
        <div className="max-w-6xl mx-auto px-4 md:px-10">
          <RelatedProducts productId={product._id} />
        </div>
      </div>
    </>
  );
}