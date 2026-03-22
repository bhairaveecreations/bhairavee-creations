"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TermsPage() {
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
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            Welcome to <strong>Bhairavee Creattions</strong>. By accessing or using our
            website, you agree to comply with and be bound by the following Terms
            and Conditions.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. Use of Website
            </h2>
            <p>
              You agree to use this website only for lawful purposes and not
              engage in any activity that may harm the platform or its users.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. Product Information
            </h2>
            <p>
              All products are handcrafted and made to order. Slight variations
              in design, color, or finish may occur and are part of the uniqueness
              of handmade items.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Pricing & Payments
            </h2>
            <p>
              All prices are listed in INR (₹). Shipping charges are applicable
              and vary depending on the delivery location. Payments are processed
              securely via trusted payment gateways.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Order Processing & Delivery
            </h2>
            <p>
              Each product is custom-made and requires approximately 20 days for
              preparation. Once shipped, delivery typically takes 5–7 working
              days across India.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Orders & Cancellation
            </h2>
            <p>
              Orders once placed cannot be cancelled or modified, as production
              begins shortly after confirmation.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              6. Refunds & Returns
            </h2>
            <p>
              All products are customised and handmade. Therefore, we do not offer
              refunds, returns, or exchanges once the order is placed.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              7. Damaged Items
            </h2>
            <p>
              In case of damage during transit, customers must provide an
              unboxing video within 24 hours of delivery. The issue will be
              reviewed and resolved accordingly.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              8. Intellectual Property
            </h2>
            <p>
              All content on this website, including images, designs, and text,
              belongs to Bhairavee Creattions and must not be used without permission.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect or incidental damages arising
              from the use of our products or website.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              10. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time without prior
              notice.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              11. Contact Information
            </h2>
            <p>
              For any queries:
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