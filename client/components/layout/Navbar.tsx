"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {

  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const { user } = useAuthStore();

  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  /* Navbar animation */
  useEffect(() => {

    gsap.from(navRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out"
    });

    gsap.set(menuRef.current, { y: "-100%" });

  }, []);

  /* Mobile menu animation */
  useEffect(() => {

    if (open) {

      gsap.to(menuRef.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      });

      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 6,
        duration: 0.3
      });

      gsap.to(line2Ref.current, {
        rotate: -45,
        y: -6,
        duration: 0.3
      });

      document.body.style.overflow = "hidden";

    } else {

      gsap.to(menuRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power3.inOut"
      });

      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3
      });

      gsap.to(line2Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.3
      });

      document.body.style.overflow = "auto";

    }

  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

        <div
          ref={navRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-[70px] flex items-center justify-between text-[#F5E6C8]"
        >

          {/* 🔥 LOGO */}
          <Link href="/" className="flex items-center">

            <Image
              src="/logo.png"
              alt="Bhairvee"
              width={140}
              height={40}
              priority
              className="object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            />

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-sm">

            {[
              { name: "Home", href: "/" },
              { name: "Shop", href: "/shop" },
              { name: "Custom Order", href: "/custom-order" },
              { name: "Profile", href: "/profile" }
            ].map((item) => (

              <Link key={item.href} href={item.href} className="relative group">

                <span className="group-hover:opacity-80 transition">
                  {item.name}
                </span>

                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />

              </Link>

            ))}

          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-5">

            {/* USER */}
            {user ? (
              <Link
                href="/profile"
                className="hidden md:flex items-center gap-2 hover:text-[#D4AF37]"
              >
                <User size={20} />
                <span className="text-sm">
                  {user.name?.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden md:block text-sm hover:text-[#D4AF37]"
              >
                Login
              </Link>
            )}

            {/* CART */}
            <Link href="/cart" className="relative">

              <ShoppingCart
                size={22}
                className="hover:text-[#D4AF37] transition"
              />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {totalItems}
                </span>
              )}

            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="relative w-8 h-6 flex flex-col justify-center items-center md:hidden"
            >

              <span
                ref={line1Ref}
                className="absolute w-8 h-[2px] bg-[#F5E6C8]"
              />

              <span
                ref={line2Ref}
                className="absolute w-8 h-[2px] bg-[#F5E6C8]"
              />

            </button>

          </div>

        </div>

      </header>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center gap-10 text-2xl font-serif z-40 bg-[#0c0c0c] text-[#F5E6C8]"
      >

        {/* LOGO */}
        <div className="absolute top-10">

          <Image
            src="/logo.png"
            alt="Bhairvee"
            width={120}
            height={40}
            className="object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
          />

        </div>

        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
        <Link href="/custom-order" onClick={() => setOpen(false)}>Custom Order</Link>

        {user ? (
          <Link href="/profile" onClick={() => setOpen(false)}>
            {user.name}
          </Link>
        ) : (
          <Link href="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        )}

        <Link href="/cart" onClick={() => setOpen(false)}>
          Cart ({totalItems})
        </Link>

      </div>
    </>
  );
}