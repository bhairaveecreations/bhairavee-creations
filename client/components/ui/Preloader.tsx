"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".brand",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        ".line",
        { width: "0%" },
        { width: "100%", duration: 1.2, ease: "power2.inOut" },
        "-=0.8"
      )
      .to(".loader", {
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        onComplete: () => setLoading(false),
      });

  }, []);

  if (!loading) return null;

  return (
    <div className="loader fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F7F4]">

      <div className="text-center">

        {/* Brand */}
        <h1 className="brand text-3xl md:text-4xl font-serif text-[#2B1B14] tracking-wide">
          Bhairavee Creattions
        </h1>

        {/* Golden Line */}
        <div className="overflow-hidden mt-4">
          <div className="line h-[2px] bg-gradient-to-r from-transparent via-[#C8A24A] to-transparent mx-auto w-0" />
        </div>

        {/* Tagline */}
        <p className="mt-3 text-sm text-gray-500 italic">
          Crafted with devotion
        </p>

      </div>

    </div>
  );
}