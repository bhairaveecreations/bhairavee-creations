"use client";

import { HandHeart, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useRef } from "react";

export default function BrandHighlights() {

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll(".highlight-card");
          cards?.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add("show");
            }, i * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();

  }, []);

  return (

    <section className="py-24 bg-[#2B1B14] text-white">

      <div ref={sectionRef} className="max-w-7xl mx-auto px-6">

        {/* Title */}

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-5xl font-serif tracking-wide">
            Elegant. Divine. Personalized.
          </h2>

        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Handmade */}

          <div className="highlight-card card-animate group flex flex-col items-center text-center gap-4 p-6 rounded-xl hover:-translate-y-2 hover:bg-white/5 transition">

            <HandHeart size={38} className="text-[#D4AF37]" />

            <h3 className="text-lg font-medium">
              Handmade
            </h3>

            <p className="text-gray-300 max-w-xs text-sm leading-relaxed">
              Each piece is handcrafted with care, making every creation unique.
            </p>

          </div>

          {/* Secure Payment */}

          <div className="highlight-card card-animate group flex flex-col items-center text-center gap-4 p-6 rounded-xl hover:-translate-y-2 hover:bg-white/5 transition">

            <ShieldCheck size={38} className="text-[#D4AF37]" />

            <h3 className="text-lg font-medium">
              Secure Payment
            </h3>

            <p className="text-gray-300 max-w-xs text-sm leading-relaxed">
              Safe and reliable payment options with UPI and trusted gateways.
            </p>

          </div>

          {/* Shipping */}

          <div className="highlight-card card-animate group flex flex-col items-center text-center gap-4 p-6 rounded-xl hover:-translate-y-2 hover:bg-white/5 transition">

            <Truck size={38} className="text-[#D4AF37]" />

            <h3 className="text-lg font-medium">
              Fast Shipping
            </h3>

            <p className="text-gray-300 max-w-xs text-sm leading-relaxed">
              Carefully packed and delivered across India with reliable shipping.
            </p>

          </div>

        </div>

      </div>

    </section>

  );

}