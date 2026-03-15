"use client";

import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import RelatedProducts from "./RelatedProducts";

export default function ProductView({ product }: any) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="p-10 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="relative w-full h-[500px]">
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-3xl font-bold">
          {product.title}
        </h1>

        <p className="mt-4 text-gray-600">
          {product.description}
        </p>

        <p className="text-2xl font-semibold mt-6">
          ₹{product.price}
        </p>

        <button
  onClick={() => {
    console.log("Adding to cart", product._id);
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "",
      quantity: 1,
    });
  }}
>
  Add to Cart
</button>
      </div>
      <RelatedProducts productId={product._id} />
    </div>
  );
}