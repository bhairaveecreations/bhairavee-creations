"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ReturnPolicyPage() {
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
        className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-md"
      >
        <h1 className="text-3xl md:text-4xl font-serif mb-6 text-[#2B1B14]">
          Refund & Return Policy
        </h1>

        <p className="text-gray-600 mb-8 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-700 text-sm leading-relaxed">

          <p>
            At <strong>Bhairavee Creattions</strong>, all our products are
            handcrafted and made to order with utmost care and precision.
            Due to the customised nature of our creations, we follow a strict
            no return and no refund policy.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. No Returns / No Exchanges
            </h2>
            <p>
              We do not accept returns or exchanges once the order has been
              placed and delivered. Each piece is uniquely handmade, and
              slight variations are natural and add to its charm.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. No Refunds
            </h2>
            <p>
              All orders are final. We do not offer refunds once the order
              is confirmed, as every product is specially crafted based on
              customer requirements.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Damaged Items (If Applicable)
            </h2>
            <p>
              In the rare case of damage during transit, customers must share
              a <strong>clear unboxing video within 24 hours of delivery</strong>.
              Our team will review the issue and provide a suitable resolution
              after verification.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Important Note
            </h2>
            <p>
              Since all products are handcrafted, minor variations in design,
              color, or finish are not considered defects but a part of the
              uniqueness of handmade art.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Contact Us
            </h2>
            <p>
              For any concerns or queries, feel free to reach out:
              <br />
<strong>Email:</strong> bhairaveecreations@gmail.com 
              <br />
              <strong>Phone:</strong> +91 7218311737
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}