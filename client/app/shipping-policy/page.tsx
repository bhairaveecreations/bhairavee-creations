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
          Shipping & Refund Policy
        </h1>

        <p className="text-gray-600 mb-8 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-gray-700 text-sm leading-relaxed">

          {/* SHIPPING POLICY */}
          <div>
            <h2 className="text-xl font-semibold text-[#2B1B14] mb-4">
              Shipping Policy
            </h2>

            <p className="mb-4">
              At <strong>Bhairavee Creattions</strong>, every product is
              handcrafted with care, precision, and attention to detail.
            </p>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold">1. Preparation Time</h3>
                <p>
                  Each product is custom-made and requires approximately{" "}
                  <strong>20 days</strong> for preparation. The timeline may vary
                  depending on the size and complexity of the design.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">2. Shipping Time</h3>
                <p>
                  Once your order is ready, it will be shipped across India and
                  typically delivered within{" "}
                  <strong>5–7 working days</strong>.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">3. Delivery Coverage</h3>
                <p>
                  We offer <strong>pan-India delivery</strong> to all serviceable
                  locations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">4. Shipping Charges</h3>
<p>
  Shipping charges are applicable and may vary depending on your delivery
  location. The final shipping cost will be calculated and displayed at
  checkout.
</p>
              </div>

              <div>
                <h3 className="font-semibold">5. Order Tracking</h3>
                <p>
                  Once your order is shipped, tracking details will be shared via
                  WhatsApp or email.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">6. Note</h3>
                <p>
                  Since all items are handcrafted, slight variations are natural
                  and add to the uniqueness of each piece.
                </p>
              </div>

            </div>
          </div>

          {/* REFUND POLICY */}
          <div>
            <h2 className="text-xl font-semibold text-[#2B1B14] mb-4">
              Refund & Return Policy
            </h2>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold">1. No Refunds / No Returns</h3>
                <p>
                  All products are <strong>customised and handmade</strong>.
                  Therefore, we do <strong>not offer refunds, returns, or exchanges</strong>{" "}
                  once the order is placed.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">2. Quality Assurance</h3>
                <p>
                  Every product undergoes strict quality checks to ensure it is
                  well-crafted and securely packaged before dispatch.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">3. Damaged Items</h3>
                <p>
                  In case your product is damaged during transit, you must share
                  an <strong>unboxing video within 24 hours of delivery</strong>.
                  Our team will review the issue and provide a suitable
                  resolution.
                </p>
              </div>

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-xl font-semibold text-[#2B1B14] mb-2">
              Contact Us
            </h2>
            <p>
              For any queries related to shipping or orders:
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