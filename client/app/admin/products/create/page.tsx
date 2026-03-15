"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    customizable: false,
    stock: 1
  });

  const [images, setImages] = useState<FileList | null>(null);

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value as any);
    });

    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }
    }

    try {

      await api.post("/products", data);

      alert("Product created successfully");

      router.push("/admin/products");

    } catch (error:any) {

      alert(error.response?.data?.message || "Error");

    }

  };

  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-2xl font-bold mb-6">
        Create Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Product Title"
          className="w-full border p-3"
          onChange={(e)=>
            setForm({...form, title:e.target.value})
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-3"
          onChange={(e)=>
            setForm({...form, description:e.target.value})
          }
        />

        <input
          placeholder="Category"
          className="w-full border p-3"
          onChange={(e)=>
            setForm({...form, category:e.target.value})
          }
        />

        <input
          placeholder="Sub Category"
          className="w-full border p-3"
          onChange={(e)=>
            setForm({...form, subCategory:e.target.value})
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3"
          onChange={(e)=>
            setForm({...form, price:e.target.value})
          }
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full border p-3"
          onChange={(e)=>
            setForm({...form, stock:parseInt(e.target.value)})
          }
        />

        <label className="flex items-center gap-2">

          <input
            type="checkbox"
            onChange={(e)=>
              setForm({...form, customizable:e.target.checked})
            }
          />

          Customizable Product

        </label>

        <input
          type="file"
          multiple
          onChange={(e)=>setImages(e.target.files)}
        />

        <button className="bg-black text-white px-6 py-3">

          Create Product

        </button>

      </form>

    </div>
  );
}