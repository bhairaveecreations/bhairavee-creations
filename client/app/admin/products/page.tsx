"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] px-4 md:px-10 py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">

        <h1 className="text-3xl md:text-4xl font-serif text-[#2B1B14]">
          ✨ Product Management
        </h1>

        <Link
          href="/admin/products/create"
          className="bg-[#2B1B14] text-white px-6 py-3 rounded-xl 
          shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
        >
          + Create Product
        </Link>

      </div>

      {/* Table Container */}
      <div className="bg-white/70 backdrop-blur-lg border border-[#e8dcc6] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden">

        <table className="w-full">

          {/* Head */}
          <thead>
            <tr className="bg-[#f3eee6] text-[#5c4432] text-sm uppercase tracking-wide">

              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>

            </tr>
          </thead>

          {/* Body */}
          <tbody>

            {products.map((product: any) => (

              <tr
                key={product._id}
                className="border-t border-[#eee4d3] hover:bg-[#faf7f2] transition"
              >

                {/* Product Info */}
                <td className="p-4 flex items-center gap-4">

                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-[#e8dcc6]">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-[#2B1B14]">
                      {product.title}
                    </p>
                    <p className="text-xs text-[#A88C4A]">
                      ID: {product._id.slice(0, 6)}...
                    </p>
                  </div>

                </td>

                {/* Price */}
                <td className="p-4 font-medium text-[#2B1B14]">
                  ₹{product.price}
                </td>

                {/* Stock */}
                <td className="p-4">
                  <span
                    className={`
                      px-3 py-1 text-xs rounded-full font-medium
                      ${product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"}
                    `}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </td>

                {/* Actions */}
               <td className="p-4">
  <div className="flex gap-2">

    <Link
      href={`/admin/products/edit/${product._id}`}
      className="px-4 py-1.5 text-sm font-medium rounded-full 
      bg-gradient-to-r from-[#E6F0FF] to-[#F0F6FF] 
      text-blue-700 border border-blue-100
      shadow-sm hover:shadow-md hover:scale-[1.03] 
      transition-all duration-200"
    >
      ✏️ Edit
    </Link>

    <button
      onClick={() => deleteProduct(product._id)}
      className="px-4 py-1.5 text-sm font-medium rounded-full 
      bg-gradient-to-r from-[#FFECEC] to-[#FFF5F5] 
      text-red-600 border border-red-100
      shadow-sm hover:shadow-md hover:scale-[1.03] 
      transition-all duration-200"
    >
      🗑 Delete
    </button>

  </div>
</td>
              </tr>

            ))}

          </tbody>

        </table>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            No products found ✨
          </div>
        )}

      </div>

    </div>
  );
}