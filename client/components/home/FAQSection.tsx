"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 5–7 working days across India depending on your location.",
  },
  {
    question: "Can I request custom resin designs?",
    answer:
      "Yes! We specialize in custom resin creations. You can submit your request through our custom order form.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept UPI payments and other secure payment methods available during checkout.",
  },
  {
    question: "Are all products handmade?",
    answer:
      "Yes. Every product is carefully handcrafted, making each piece unique.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl font-serif text-center text-[#2B1B14] mb-14">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 cursor-pointer"
              onClick={() => toggle(index)}
            >

              <div className="flex justify-between items-center">

                <h3 className="font-medium text-lg">
                  {faq.question}
                </h3>

                <span className="text-xl">
                  {active === index ? "-" : "+"}
                </span>

              </div>

              {active === index && (
                <p className="mt-4 text-gray-600">
                  {faq.answer}
                </p>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}