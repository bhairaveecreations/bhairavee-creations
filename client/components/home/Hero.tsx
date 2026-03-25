"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";

export default function Hero() {

  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const tl = gsap.timeline();

    tl.from(imageRef.current, {
      scale: 1.08,
      duration: 2,
      ease: "power3.out",
    });

    tl.from(
      textRef.current,
      {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1.4"
    );

  }, []);

  return (

<section className="relative w-full min-h-screen overflow-hidden">

  {/* Background Image */}
  <div ref={imageRef} className="absolute inset-0">
    <Image
      src="/hero.png"
      alt="Handcrafted resin decor for sacred spaces"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 lg:px-10 min-h-[90vh] flex items-center">

    <header
      ref={textRef}
      className="text-white max-w-xl"
    >

      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
        Crafted to Glow.
        <br />
        Designed to Bless.
      </h1>

      <p className="mt-5 text-base sm:text-lg text-gray-200 max-w-md">
        Handcrafted resin keepsakes designed to elevate your sacred spaces.
      </p>

      <div className="mt-8">
        <Link
          href="/shop"
          className="inline-block bg-[#D4AF37] text-black px-8 py-3 rounded-md font-medium hover:opacity-90 transition"
        >
          Shop Sacred Decor →
        </Link>
      </div>

    </header>

  </div>

  {/* 💬 PREMIUM FLOATING WHATSAPP BUTTON WITH TOOLTIP */}
<div className="fixed bottom-6 right-6 z-50">

  <Link
    href="https://wa.me/917218311737?text=Hi%20I%20want%20to%20place%20a%20bulk%20order"
    target="_blank"
    className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl transition duration-300 group"
  >
    <MessageCircle size={24} className="group-hover:scale-110 transition" />

    {/* Always visible label */}
    <span className="text-sm font-medium whitespace-nowrap">
      Bulk Orders
    </span>
  </Link>

</div>
</section>

  );
}