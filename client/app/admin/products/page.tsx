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
    console.log(products);
    
  };

  return (
    <div className="p-10">

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <Link
          href="/admin/products/create"
          className="bg-black text-white px-4 py-2"
        >
          Create Product
        </Link>

      </div>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">

            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>

          </tr>
        </thead>

        <tbody>

          {products.map((product:any) => (

            <tr key={product._id} className="border-t">

              <td className="p-3">

                <div className="relative w-16 h-16">

                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover rounded"
                  />

                </div>

              </td>

              <td className="p-3">
                {product.title}
              </td>

              <td className="p-3">
                ₹{product.price}
              </td>

              <td className="p-3">
                {product.stock}
              </td>

              <td className="p-3 flex gap-3">

                <Link
                  href={`/admin/products/edit/${product._id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-600"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}