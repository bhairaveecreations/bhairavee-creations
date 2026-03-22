"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">

          <p>
            At <strong>Bhairavee Creattions</strong>, we value your privacy and are
            committed to protecting your personal information. This policy explains
            how we collect, use, and safeguard your data.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect details such as your name, phone number, email
              address, and shipping address when you place an order or contact us.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process orders, prepare customised
              products, arrange shipping, and communicate order updates. We do not
              sell or rent your personal data.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Payment Security
            </h2>
            <p>
              Payments are processed securely through trusted payment gateways.
              We do not store your card or payment details on our servers.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Cookies
            </h2>
            <p>
              We may use cookies to improve your browsing experience and analyze
              website usage. You can manage cookie settings in your browser.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Data Protection
            </h2>
            <p>
              We take reasonable measures to protect your information from
              unauthorized access, misuse, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              6. Third-Party Services
            </h2>
            <p>
              We may use third-party services such as payment gateways and delivery
              partners to complete your order. These services handle data as per
              their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              7. Your Rights
            </h2>
            <p>
              You may contact us to update or request deletion of your personal
              information, subject to order and legal requirements.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              8. Contact Us
            </h2>
            <p>
              For any questions:
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