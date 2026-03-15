"use client";

import Link from "next/link";
import { Sparkles, Palette, Ruler, Gem } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CustomOrderCTA() {

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add("opacity-100","translate-y-0");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();

  }, []);

  return (

    <section className="py-32 bg-[#F8F6F2] relative overflow-hidden">

      {/* Golden Ambient Glow */}

      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-[#D4AF37]/10 blur-3xl rounded-full"></div>

      <div
        ref={sectionRef}
        className="max-w-6xl mx-auto px-6 text-center transition-all duration-1000 opacity-0 translate-y-10"
      >

        {/* Icon */}

        <div className="flex justify-center mb-6">

          <Sparkles size={42} className="text-[#D4AF37]" />

        </div>


        {/* Title */}

        <h2 className="text-4xl md:text-5xl font-serif text-[#2B1B14] leading-tight">
          Design Your Sacred Creation
        </h2>


        {/* Subtitle */}

        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Tell us your vision and we will craft a unique resin artwork
          made specially for your home, temple, or gifting moments.
        </p>


        {/* Feature Points */}

        <div className="mt-14 grid md:grid-cols-3 gap-8 text-left">

          <div className="flex gap-4 items-start">

            <Palette className="text-[#D4AF37]" size={26} />

            <div>

              <h4 className="font-semibold text-[#2B1B14]">
                Choose Your Colors
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Select color palettes, flowers, flakes,
                or sacred symbols.
              </p>

            </div>

          </div>


          <div className="flex gap-4 items-start">

            <Ruler className="text-[#D4AF37]" size={26} />

            <div>

              <h4 className="font-semibold text-[#2B1B14]">
                Custom Dimensions
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                From trays to coffee tables — sized
                exactly for your space.
              </p>

            </div>

          </div>


          <div className="flex gap-4 items-start">

            <Gem className="text-[#D4AF37]" size={26} />

            <div>

              <h4 className="font-semibold text-[#2B1B14]">
                Handcrafted for You
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Every piece is uniquely made with
                care and artistry.
              </p>

            </div>

          </div>

        </div>


        {/* CTA */}

        <div className="mt-16">

          <Link
            href="/custom-order"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-black px-10 py-4 rounded-full font-medium text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition duration-300"
          >

            Start Designing Your Piece →

          </Link>

        </div>

      </div>

    </section>

  );

}