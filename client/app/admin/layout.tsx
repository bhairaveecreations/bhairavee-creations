"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function AdminLayout({ children }: any) {

  const { user, fetchProfile } = useAuthStore();
  const router = useRouter();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const openDrawer = () => {
    gsap.to(drawerRef.current, {
      y: 0,
      duration: 0.35,
      ease: "power3.out"
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3
    });
  };

  const closeDrawer = () => {
    gsap.to(drawerRef.current, {
      y: "100%",
      duration: 0.35,
      ease: "power3.in"
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3
    });
  };

  if (!user) return <p className="p-10">Loading...</p>;

  if (user.role !== "admin") {
    router.push("/");
    return null;
  }

  return (

    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/40 opacity-0 pointer-events-none z-40"
      />

      {/* 🔥 Mobile Bottom Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl p-5 z-50 translate-y-full"
      >

        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

        <nav className="flex flex-col gap-3 text-sm">

          <Link href="/admin/dashboard" onClick={closeDrawer} className="p-3 rounded-lg hover:bg-gray-100">
            Dashboard
          </Link>

          <Link href="/admin/orders" onClick={closeDrawer} className="p-3 rounded-lg hover:bg-gray-100">
            Orders
          </Link>

          <Link href="/admin/custom-orders" onClick={closeDrawer} className="p-3 rounded-lg hover:bg-gray-100">
            Custom Orders
          </Link>

          <Link href="/admin/products/create" onClick={closeDrawer} className="p-3 rounded-lg hover:bg-gray-100">
            Create Product
          </Link>

        </nav>

      </div>

      {/* 🔥 Desktop Sidebar */}
<aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white border-r px-4 py-6 flex-col">

  {/* Title */}
  <h2 className="text-lg font-semibold px-3 mb-6 text-gray-800">
    Admin
  </h2>

  {/* Nav */}
  <nav className="flex flex-col gap-1 text-sm">

    {[
      { name: "Dashboard", href: "/admin/dashboard" },
      { name: "Orders", href: "/admin/orders" },
      { name: "Custom Orders", href: "/admin/custom-orders" },
      { name: "Create Product", href: "/admin/products/create" }
    ].map((item) => {

      const isActive = typeof window !== "undefined" &&
        window.location.pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`px-3 py-2 rounded-lg transition flex items-center justify-between
            ${
              isActive
                ? "bg-black text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          {item.name}
        </Link>
      );
    })}

  </nav>

</aside>

      {/* Main */}
      <div className="lg:ml-64 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="flex items-center justify-between px-4 py-4 bg-white border-b sticky top-0 z-30">

          <button
            onClick={openDrawer}
            className="lg:hidden text-xl"
          >
            ☰
          </button>

          <h1 className="font-semibold">Admin Panel</h1>

        </header>

        {/* Content */}
        <main className="flex-1 px-3 sm:px-4 lg:px-8 py-4">
          {children}
        </main>

      </div>

    </div>

  );
}