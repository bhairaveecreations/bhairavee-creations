"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: any) {

  const { user, fetchProfile } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="p-10">Loading...</p>;

  if (user.role !== "admin") {
    router.push("/");
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "🏠" },
    { name: "Orders", href: "/admin/orders", icon: "📦" },
    { name: "Custom", href: "/admin/custom-orders", icon: "🛠" },
    { name: "Create", href: "/admin/products/create", icon: "➕" }
  ];

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-[#f8f6f3] to-[#f1eee9] overflow-x-hidden">

      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col justify-between bg-white/70 backdrop-blur-xl border-r border-gray-200 px-5 py-6">

        <div>
          <h2 className="text-lg font-semibold mb-8 text-gray-800">
            Bhairvee Admin
          </h2>

          <nav className="flex flex-col gap-2 text-sm">

            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2.5 rounded-xl transition-all
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
          © Bhairvee
        </p>

      </aside>

      {/* 📱 Main */}
      <div className="flex-1 w-full flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white/70 backdrop-blur-xl border-b sticky top-0 z-30">
          <h1 className="font-medium text-gray-800">
            Admin Panel
          </h1>
        </header>

        {/* 🔥 CONTENT FIX (MOST IMPORTANT) */}
        <main className="flex-1 w-full overflow-x-hidden">

          {/* CENTERED CONTAINER */}
          <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 pb-24">

            {/* PREVENT CHILD OVERFLOW */}
            <div className="w-full min-w-0">
              {children}
            </div>

          </div>

        </main>

        {/* 📱 Mobile Bottom Nav */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t z-50">

          <div className="flex justify-around py-2">

            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center text-xs"
                >
                  <span
                    className={`text-lg ${
                      isActive ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span
                    className={`${
                      isActive
                        ? "text-black font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {item.name}
                  </span>

                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-1" />
                  )}

                </Link>
              );
            })}

          </div>

        </div>

      </div>

    </div>

  );
}