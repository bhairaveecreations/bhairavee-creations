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
            At <strong>Bhairavee Creattions</strong>, we respect your privacy and are committed
            to protecting your personal information. This Privacy Policy explains how we collect,
            use, and safeguard your data when you visit or make a purchase from our website.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, phone number, email address,
              shipping address, and payment details when you place an order or contact us.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process orders, deliver products, communicate updates,
              and improve our services. We do not sell or rent your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              3. Payment Security
            </h2>
            <p>
              All payments are processed securely through trusted payment gateways such as Razorpay.
              We do not store your card or payment details on our servers.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              4. Cookies & Tracking
            </h2>
            <p>
              We may use cookies to enhance your browsing experience and analyze website traffic.
              You can disable cookies in your browser settings if preferred.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              5. Data Protection
            </h2>
            <p>
              We implement appropriate security measures to protect your personal information
              from unauthorized access, misuse, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              6. Third-Party Services
            </h2>
            <p>
              We may use third-party tools (such as Razorpay, analytics services) that may collect
              limited data as per their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              7. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal information. You can
              contact us for any such requests.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[#2B1B14] mb-2">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
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