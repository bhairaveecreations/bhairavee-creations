"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-[#F9F7F4] min-h-screen py-16 px-6">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-md text-center"
      >
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-serif mb-4 text-[#2B1B14]">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-8 text-sm">
          Have questions or want a custom resin creation? Reach out to us directly.
        </p>

        {/* WhatsApp Priority CTA */}
        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-500 text-white py-4 rounded-xl text-base font-medium hover:bg-green-600 transition mb-6"
        >
          Chat with us on WhatsApp
        </a>

        {/* Contact Info */}
        <div className="space-y-4 text-gray-700 text-sm">

          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+91XXXXXXXXXX" className="hover:underline">
              +91 XXXXX XXXXX
            </a>
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:your@email.com"
              className="hover:underline"
            >
              your@email.com
            </a>
          </p>

          <p>
            <strong>Address:</strong> Your City, India
          </p>

        </div>

      </div>
    </div>
  );
}