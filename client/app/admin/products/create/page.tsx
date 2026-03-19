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

  // 🔥 NEW STATES
  const [tags, setTags] = useState("");
  const [variants, setVariants] = useState([
    { name: "", price: "" }
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value as any);
    });

    // 🔥 ADD TAGS + VARIANTS
    data.append("tags", JSON.stringify(tags.split(",").map(t => t.trim())));
    data.append("variants", JSON.stringify(variants));

    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }
    }

    try {
      await api.post("/products", data);
      alert("Product created successfully");
      router.push("/admin/products");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (

    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#2B1B14]">
          Create Product
        </h1>
        <p className="text-[#7a6a58] text-sm mt-1">
          Add a new handcrafted product to your collection
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          space-y-5
          p-6 rounded-2xl
          bg-white/40 backdrop-blur-xl
          border border-white/30
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        "
      >

        {/* TITLE */}
        <Input
          placeholder="Product Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <Textarea
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Input
            placeholder="Category"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <Input
            placeholder="Sub Category"
            onChange={(e) =>
              setForm({ ...form, subCategory: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Base Price (₹)"
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <Input
            type="number"
            placeholder="Stock"
            onChange={(e) =>
              setForm({
                ...form,
                stock: parseInt(e.target.value) || 0
              })
            }
          />

        </div>

        {/* 🔥 TAGS */}
        <Input
          placeholder="Tags (comma separated e.g. pooja,resin,decor)"
          onChange={(e) => setTags(e.target.value)}
        />

        {/* 🔥 VARIANTS */}
        <div className="space-y-3">

          <p className="text-sm text-[#7a6a58]">
            Product Variants
          </p>

          {variants.map((v, i) => (
            <div key={i} className="flex gap-2">

              <Input
                placeholder="Variant (e.g. Small)"
                value={v.name}
                onChange={(e) => {
                  const updated = [...variants];
                  updated[i].name = e.target.value;
                  setVariants(updated);
                }}
              />

              <Input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) => {
                  const updated = [...variants];
                  updated[i].price = e.target.value;
                  setVariants(updated);
                }}
              />

            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setVariants([...variants, { name: "", price: "" }])
            }
            className="text-sm text-[#C8A24A]"
          >
            + Add Variant
          </button>

        </div>

        {/* CUSTOMIZABLE */}
        <label className="
          flex items-center gap-3
          p-3 rounded-xl
          bg-white/30 backdrop-blur border border-white/30
        ">
          <input
            type="checkbox"
            className="accent-[#D4AF37]"
            onChange={(e) =>
              setForm({ ...form, customizable: e.target.checked })
            }
          />
          <span className="text-sm text-[#2B1B14]">
            Customizable Product
          </span>
        </label>

        {/* IMAGE UPLOAD */}
        <div className="
          p-4 rounded-xl
          border border-dashed border-[#d4af37]/40
          bg-white/30 backdrop-blur
        ">
          <p className="text-sm text-[#7a6a58] mb-2">
            Upload Product Images
          </p>

          <input
            type="file"
            multiple
            className="text-sm"
            onChange={(e) =>
              setImages(e.target.files)
            }
          />
        </div>

        {/* SUBMIT */}
        <button
          className="
            w-full py-3 rounded-xl
            bg-gradient-to-r from-[#d4af37] to-[#b8962e]
            text-white font-medium
            hover:opacity-90 active:scale-[0.98]
            transition
            shadow-[0_10px_30px_rgba(212,175,55,0.3)]
          "
        >
          Create Product ✨
        </button>

      </form>

    </div>
  );
}

/* INPUT */
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="
        w-full px-4 py-3 rounded-xl text-sm
        bg-white/40 backdrop-blur
        border border-white/30
        focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50
        placeholder:text-[#7a6a58]
      "
    />
  );
}

/* TEXTAREA */
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="
        w-full px-4 py-3 rounded-xl text-sm
        bg-white/40 backdrop-blur
        border border-white/30
        focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50
        placeholder:text-[#7a6a58]
      "
    />
  );
}