"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: any) {

  const { user, fetchProfile } = useAuthStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="p-10">Loading...</p>;

  if (user.role !== "admin") {
    router.push("/");
    return null;
  }

  return (

    <div className="min-h-screen flex bg-gray-50">

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-40 top-0 left-0 h-full w-64 bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold tracking-wide">
            Admin Panel
          </h2>

        </div>

        <nav className="flex flex-col gap-2 p-4 text-sm">

          <Link
            href="/admin/dashboard"
            className="px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Orders
          </Link>

          <Link
            href="/admin/custom-orders"
            className="px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Custom Orders
          </Link>

          <Link
            href="/admin/products/create"
            className="px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Create Product
          </Link>

        </nav>

      </aside>


      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}

        <header className="flex items-center justify-between bg-white border-b px-4 py-3 lg:px-8">

          {/* Hamburger */}

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>

          <h1 className="font-semibold text-gray-700">
            Admin
          </h1>

        </header>


        {/* Content */}

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>

      </div>

    </div>

  );

}