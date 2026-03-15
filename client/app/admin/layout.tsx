"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: any) {

  const { user, fetchProfile } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="p-10">Loading...</p>;

  if (user.role !== "admin") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 border-r p-6 space-y-6">

        <h2 className="text-xl font-bold">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link href="/admin/dashboard">
            Dashboard
          </Link>

          <Link href="/admin/orders">
            Orders
          </Link>

          <Link href="/admin/custom-orders">
            Custom Orders
          </Link>
          <Link href="/admin/products/create">
Create Product
</Link>
          

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}