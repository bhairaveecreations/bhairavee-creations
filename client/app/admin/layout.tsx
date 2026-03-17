"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: any) {

  const { user, fetchProfile } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname(); // ✅ FIXED ACTIVE STATE

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="p-10">Loading...</p>;

  if (user.role !== "admin") {
    router.push("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Custom Orders", href: "/admin/custom-orders" },
    { name: "Create Product", href: "/admin/products/create" }
  ];

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-[#f8f6f3] to-[#f1eee9] overflow-x-hidden">

      {/* 🌟 Sidebar (Desktop) */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-white/70 backdrop-blur-xl border-r border-gray-200 px-5 py-6">

        <div>
          <h2 className="text-lg font-semibold mb-8 tracking-wide text-gray-800">
            Bhairvee Admin
          </h2>

          <nav className="flex flex-col gap-2 text-sm">

            {navItems.map((item) => {

              const isActive = pathname === item.href; // ✅ INSTANT ACTIVE

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-xl transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-gray-600 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

          </nav>
        </div>

        <p className="text-xs text-gray-400">
          © Bhairvee Creations
        </p>

      </aside>

      {/* 🌟 Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white/70 backdrop-blur-xl border-b sticky top-0 z-30">

          <h1 className="font-medium tracking-wide text-gray-800">
            Admin Panel
          </h1>

        </header>

        {/* Content */}
        <main className="flex-1 px-3 sm:px-6 lg:px-10 py-6">
          {children}
        </main>

      </div>

    </div>

  );
}