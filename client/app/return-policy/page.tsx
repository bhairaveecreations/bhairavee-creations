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

        <p className="text-gray-600 mb-6 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            At <strong>Bhairavee Creattions</strong>, all our products are
            handcrafted with care and made to order. Due to the nature of our
            products, we maintain a strict no return and no refund policy.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. No Returns
            </h2>
            <p>
              We do not accept returns once the product has been delivered.
              Each item is uniquely handmade, and slight variations are part
              of its natural charm.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. No Refunds
            </h2>
            <p>
              All sales are final. We do not offer refunds after the order is
              placed and processed.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Damaged or Incorrect Product
            </h2>
            <p>
              In case you receive a damaged or incorrect product, please contact
              us within 24 hours of delivery with proper unboxing video proof.
              After verification, we may offer a replacement at our discretion.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Order Cancellation
            </h2>
            <p>
              Orders can only be cancelled within 12 hours of placing the order.
              Once production has started, cancellations will not be accepted.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Contact Us
            </h2>
            <p>
              For any concerns, please contact us:
              <br />
              <strong>Email:</strong> your@email.com
              <br />
              <strong>Phone:</strong> +91 XXXXX XXXXX
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}