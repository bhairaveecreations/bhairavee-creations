"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="bg-gradient-to-b from-[#1a120b] to-[#2c1e16] text-white overflow-hidden"
    >
      {/* ================= HERO ================= */}
      <section className="min-h-[70vh] flex items-center justify-center text-center px-6 md:px-16 relative">
        
        {/* Glow */}
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/20 blur-[120px] top-[-100px] left-[30%]" />

        <div className="max-w-3xl">
          <div className="fade-up inline-block px-4 py-1 mb-6 text-sm rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            ✨ About Bhairavee Creations
          </div>

          <h1 className="fade-up text-4xl md:text-6xl font-bold leading-tight">
            Crafted with Devotion, <br />
            <span className="text-yellow-400">Designed to Inspire</span>
          </h1>

          <p className="fade-up mt-6 text-gray-300 text-lg leading-relaxed">
            Handcrafted resin creations that bring elegance, emotion, and
            meaning into every space.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          <p className="fade-up text-gray-300 text-lg leading-relaxed">
            Welcome to{" "}
            <span className="text-yellow-400 font-medium">
              Bhairavee Creattions
            </span>
            .
          </p>

          <p className="fade-up text-gray-300 leading-relaxed">
            We specialise in beautifully handcrafted customised resin products,
            made with creativity and precision. Every piece is thoughtfully
            designed to reflect uniqueness and artistic expression.
          </p>

          <p className="fade-up text-gray-300 leading-relaxed">
            From elegant home décor to personalised gifts, our creations are
            not just products — they are memories, emotions, and stories
            preserved in art.
          </p>

          <p className="fade-up text-gray-300 leading-relaxed">
            We also accept bulk orders and warmly welcome resellers to
            collaborate with us, building meaningful partnerships through
            creativity and trust.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          
          <div className="fade-up bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition">
            <h3 className="text-lg font-semibold text-yellow-400">
              🎨 Custom Creations
            </h3>
            <p className="mt-3 text-gray-400 text-sm">
              Each piece is uniquely crafted based on your personal style and
              vision.
            </p>
          </div>

          <div className="fade-up bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition">
            <h3 className="text-lg font-semibold text-yellow-400">
              💎 Premium Quality
            </h3>
            <p className="mt-3 text-gray-400 text-sm">
              We use high-quality resin materials ensuring durability and a
              flawless finish.
            </p>
          </div>

          <div className="fade-up bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-yellow-400/30 transition">
            <h3 className="text-lg font-semibold text-yellow-400">
              🤝 Bulk & Reseller Friendly
            </h3>
            <p className="mt-3 text-gray-400 text-sm">
              We support bulk orders and reseller collaborations with seamless
              service.
            </p>
          </div>

        </div>
      </section>


    </main>
  );
}