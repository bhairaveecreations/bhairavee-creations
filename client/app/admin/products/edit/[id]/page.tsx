"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter, useParams } from "next/navigation";

// ✅ TYPES
type Variant = {
  name: string;
  price: string;
};

type FormType = {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: string;
  customizable: boolean;
  stock: number;
};

export default function EditProductPage() {

  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  const [form, setForm] = useState<FormType>({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    customizable: false,
    stock: 1
  });

  const [tags, setTags] = useState<string>("");
  const [variants, setVariants] = useState<Variant[]>([
    { name: "", price: "" }
  ]);

  const [images, setImages] = useState<FileList | null>(null);

  // 🔥 FETCH PRODUCT
  useEffect(() => {

    if (!id) return;

    const fetchProduct = async () => {
      try {

        const res = await api.get(`/products/id/${id}`);
        const p = res.data;

        setForm({
          title: p.title || "",
          description: p.description || "",
          category: p.category || "",
          subCategory: p.subCategory || "",
          price: p.price?.toString() || "",
          customizable: p.customizable || false,
          stock: p.stock || 1
        });

        setTags(p.tags?.join(",") || "");

        setVariants(
          p.variants?.length
            ? p.variants.map((v: any) => ({
                name: v.name,
                price: v.price.toString()
              }))
            : [{ name: "", price: "" }]
        );

      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();

  }, [id]);



  // 🔥 SUBMIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value as any);
    });

    data.append(
      "tags",
      JSON.stringify(tags.split(",").map((t) => t.trim()))
    );

    data.append("variants", JSON.stringify(variants));

    if (images) {
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }
    }

    try {

      await api.put(`/products/${id}`, data);

      alert("Product updated successfully");
      router.push("/admin/products");

    } catch (error: any) {
      alert(error.response?.data?.message || "Error updating product");
    }
  };


  return (

    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#2B1B14]">
          Edit Product
        </h1>
        <p className="text-[#7a6a58] text-sm mt-1">
          Update your handcrafted product
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
          value={form.title}
          placeholder="Product Title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <Textarea
          value={form.description}
          placeholder="Description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Input
            value={form.category}
            placeholder="Category"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <Input
            value={form.subCategory}
            placeholder="Sub Category"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, subCategory: e.target.value })
            }
          />

          <Input
            type="number"
            value={form.price}
            placeholder="Base Price"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <Input
            type="number"
            value={form.stock}
            placeholder="Stock"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({
                ...form,
                stock: parseInt(e.target.value) || 0
              })
            }
          />

        </div>

        {/* TAGS */}
        <Input
          value={tags}
          placeholder="Tags (comma separated)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTags(e.target.value)
          }
        />

        {/* VARIANTS */}
        <div className="space-y-3">

          <p className="text-sm text-[#7a6a58]">
            Product Variants
          </p>

          {variants.map((v, i) => (
            <div key={i} className="flex gap-2">

              <Input
                value={v.name}
                placeholder="Variant"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const updated = [...variants];
                  updated[i].name = e.target.value;
                  setVariants(updated);
                }}
              />

              <Input
                type="number"
                value={v.price}
                placeholder="Price"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.customizable}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, customizable: e.target.checked })
            }
          />
          Customizable
        </label>

        {/* IMAGE */}
        <input
          type="file"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImages(e.target.files)
          }
        />

        {/* SUBMIT */}
        <button className="w-full bg-[#C8A24A] text-white py-3 rounded-xl">
          Update Product ✨
        </button>

      </form>

    </div>
  );
}


// INPUT
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl border"
    />
  );
}

// TEXTAREA
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="w-full px-4 py-3 rounded-xl border"
    />
  );
}