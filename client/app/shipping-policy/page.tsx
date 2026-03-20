"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ShippingPolicyPage() {
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
          Shipping Policy
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            At <strong>Bhairavee Creattions</strong>, we are committed to delivering
            your handcrafted products safely and on time.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. Shipping Charges
            </h2>
            <p>
              We offer <strong>free shipping</strong> on all orders across India.
              There are no additional delivery charges.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. Order Processing Time
            </h2>
            <p>
              Orders are processed within 2–4 business days. Since our products
              are handcrafted, custom orders may take additional time depending
              on the design and requirements.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Delivery Time
            </h2>
            <p>
              Once shipped, orders are typically delivered within 5–7 business
              days depending on your location.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Shipping Locations
            </h2>
            <p>
              We currently ship across India. For special delivery requests,
              please contact us directly.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Order Tracking
            </h2>
            <p>
              Once your order is shipped, tracking details will be shared via
              WhatsApp or email.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              6. Delays
            </h2>
            <p>
              While we strive for timely delivery, delays may occur due to
              unforeseen circumstances such as weather, logistics issues, or
              high demand periods.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              7. Contact Us
            </h2>
            <p>
              For any shipping-related queries, contact us:
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