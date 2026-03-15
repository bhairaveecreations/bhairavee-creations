"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";

export default function ProductCard({ product }: any) {

  const addToCart = useCartStore((state) => state.addToCart);

  const [showToast, setShowToast] = useState(false);
  const [quote, setQuote] = useState("");

  const quotes = [
    "Your sacred space deserves more beauty ✨",
    "A handcrafted treasure just joined your cart 🏺",
    "Your home is getting more divine already 🌿",
    "Great choice! Explore another sacred piece 💫",
  ];

  const handleAddToCart = () => {

    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "",
      quantity: 1,
    });

    const randomQuote =
      quotes[Math.floor(Math.random() * quotes.length)];

    setQuote(randomQuote);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);

  };

  return (

    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      {/* IMAGE */}

      <div className="p-2 md:p-4">

        <Link href={`/product/${product.slug}`}>

          <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-xl bg-[#F8F6F2] shadow-inner">

            <Image
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.title}
              fill
              sizes="(max-width:768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#C8A24A] text-white text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full shadow">
              Limited
            </span>

          </div>

        </Link>

      </div>


      {/* CONTENT */}

      <div className="px-3 md:px-6 text-center flex flex-col flex-grow">

        <Link href={`/product/${product.slug}`}>

          <h3 className="font-serif text-sm md:text-lg text-[#3B2A1F] hover:text-[#C8A24A] transition line-clamp-2 min-h-[40px] md:min-h-[48px]">
            {product.title}
          </h3>

        </Link>


        {/* Rating */}

        <div className="flex items-center justify-center gap-1 mt-1 md:mt-2 text-xs md:text-sm text-gray-600">

          <Star size={12} className="fill-[#C8A24A] text-[#C8A24A]" />

          <span>4.9</span>

          <span className="hidden md:inline text-gray-400">(128 reviews)</span>

        </div>


        {/* Price */}

        <p className="text-sm md:text-xl font-semibold mt-1 md:mt-3 text-[#2B1B14]">
          ₹{product.price}
        </p>


        {/* Desktop Feature */}

        <div className="hidden md:flex items-center justify-center gap-2 text-sm text-green-700 mt-2">

          <Sparkles size={14} />

          <span>Free Shipping Included</span>

        </div>


        {/* Desktop Benefit */}

        <p className="hidden md:block text-gray-500 text-sm mt-2">
          Elevate your sacred corner instantly
        </p>


        {/* BUTTONS */}

        <div className="mt-auto pt-4 flex flex-col gap-2 md:gap-3">

          <button
            onClick={handleAddToCart}
            className="w-full bg-[#C8A24A] text-white py-2 md:py-3 rounded-full text-xs md:text-sm font-medium hover:bg-[#b89238] hover:shadow-lg transition"
          >
            Bring This Home →
          </button>

          <Link
            href="/custom-order"
            className="hidden md:block border border-gray-300 py-2 rounded-full text-sm hover:bg-gray-50 transition"
          >
            Request Custom Design
          </Link>

        </div>


        {/* Urgency */}

        <p className="hidden md:block text-red-500 text-xs mt-3">
          Only a few pieces available
        </p>

      </div>


      {/* TOAST */}

      {showToast && (

        <div className="fixed bottom-6 right-6 bg-white shadow-xl border rounded-xl px-6 py-4 z-[999]">

          <p className="text-sm font-semibold text-gray-800">
            🛒 Added to Cart
          </p>

          <p className="text-xs text-gray-600 mt-1">
            {quote}
          </p>

        </div>

      )}

    </article>

  );

}