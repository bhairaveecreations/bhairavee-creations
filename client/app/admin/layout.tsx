"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function AdminLayout({ children }: any) {

  const { user, fetchProfile } = useAuthStore();
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const openSidebar = () => {

    gsap.to(sidebarRef.current, {
      x: 0,
      duration: 0.35,
      ease: "power3.out"
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.3
    });

  };

  const closeSidebar = () => {

    gsap.to(sidebarRef.current, {
      x: "-100%",
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

    <div className="min-h-screen flex bg-gray-50">

      {/* Overlay */}

      <div
        ref={overlayRef}
        onClick={closeSidebar}
        className="fixed inset-0 bg-black/40 opacity-0 pointer-events-none z-30 lg:hidden"
      />

      {/* Sidebar */}

      <aside
        ref={sidebarRef}
        className="
        fixed lg:static
        top-0 left-0
        h-full w-64
        bg-white
        border-r
        z-40
        -translate-x-full lg:translate-x-0
        "
      >

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold tracking-wide">
            Admin
          </h2>

        </div>

        <nav className="flex flex-col text-sm p-4">

          <Link
            href="/admin/dashboard"
            className="px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/orders"
            className="px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            Orders
          </Link>

          <Link
            href="/admin/custom-orders"
            className="px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            Custom Orders
          </Link>

          <Link
            href="/admin/products/create"
            className="px-4 py-3 rounded-lg hover:bg-gray-100"
          >
            Create Product
          </Link>

        </nav>

      </aside>


      {/* Main */}

      <div className="flex-1 flex flex-col">

        {/* Topbar */}

        <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white border-b">

          <button
            onClick={openSidebar}
            className="lg:hidden text-xl"
          >
            ☰
          </button>

          <h1 className="font-semibold">
            Admin Panel
          </h1>

        </header>

        <main className="p-4 lg:p-8">
          {children}
        </main>

      </div>

    </div>

  );

}