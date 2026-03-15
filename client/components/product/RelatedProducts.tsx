"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default function RelatedProducts({ productId }: any) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    api.get(`/products/${productId}/related`)
      .then(res => setProducts(res.data));

  }, [productId]);
  console.log(products);
  

  return (
    <div className="mt-16">

      <h2 className="text-xl font-semibold mb-6">
        People Also Bought
      </h2>

      <div className="grid grid-cols-4 gap-6">

        {products.map((product:any) => (

          <Link
            key={product._id}
            href={`/product/${product.slug}`}
          >

            <div className="border p-4 rounded-lg">

              <div className="relative w-full h-48">

                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover rounded"
                />

              </div>

              <h3 className="mt-3 font-medium">
                {product.title}
              </h3>

              <p className="text-gray-600">
                ₹{product.price}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}