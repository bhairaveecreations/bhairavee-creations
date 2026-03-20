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
            and Conditions. Please read them carefully before using our services.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. Use of Website
            </h2>
            <p>
              You agree to use this website only for lawful purposes. You must not
              misuse this website or engage in any activity that may harm the
              platform or other users.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. Product Information
            </h2>
            <p>
              We strive to display accurate product details, images, and pricing.
              However, slight variations may occur as our products are handmade.
              We reserve the right to modify or discontinue products at any time.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Pricing & Payments
            </h2>
            <p>
              All prices are listed in INR (₹) and are subject to change without
              notice. Payments are processed securely via trusted gateways such as
              Razorpay.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Order Acceptance
            </h2>
            <p>
              We reserve the right to accept or reject any order at our discretion.
              In case of cancellation, a full refund will be processed if payment
              has already been made.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Intellectual Property
            </h2>
            <p>
              All content on this website, including images, designs, and text,
              belongs to Bhairavee Creattions and must not be copied or used
              without permission.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect or incidental damages arising
              from the use of our website or products.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              7. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions at any time without prior
              notice. Continued use of the website means you accept the updated
              terms.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              8. Contact Information
            </h2>
            <p>
              For any queries regarding these terms, contact us:
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