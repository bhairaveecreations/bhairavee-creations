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

    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#f1eee9] overflow-x-hidden">

      <main className="w-full">

        {/* 🔥 GLOBAL SPACING */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-25 pb-10 space-y-6">

        

          {/* 💎 DESKTOP TOP NAV (ONLY DESKTOP) */}
          <div className="hidden lg:flex justify-center ">

            <div className="
              flex items-center gap-2
              px-3 py-2 rounded-2xl
              bg-white/40 backdrop-blur-xl
              border border-white/30
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            ">

              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-4 py-2 rounded-xl text-sm transition flex items-center gap-2
                      ${
                        isActive
                          ? "bg-[#2B1B14] text-white shadow-md"
                          : "text-[#6b5c4c] hover:bg-white/60"
                      }
                    `}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}

            </div>

          </div>

          {/* 📦 PAGE CONTENT */}
          <div className="w-full min-w-0">
            {children}
          </div>

        </div>

      </main>

      {/* 📱 MOBILE BOTTOM NAV (ONLY MOBILE) */}
      <div className="
        lg:hidden fixed bottom-0 left-0 w-full z-50
        bg-white/70 backdrop-blur-xl
        border-t border-white/30
        shadow-[0_-5px_20px_rgba(0,0,0,0.05)]
      ">

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
                    isActive ? "text-[#2B1B14]" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>

                <span
                  className={`${
                    isActive
                      ? "text-[#2B1B14] font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {item.name}
                </span>

                {isActive && (
                  <div className="w-1.5 h-1.5 bg-[#2B1B14] rounded-full mt-1" />
                )}

              </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
}