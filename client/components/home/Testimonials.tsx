"use client";

import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    text: "Absolutely loved the resin pooja décor. The craftsmanship and detailing are stunning!",
  },
  {
    name: "Rohit Verma",
    text: "Ordered a custom tray with initials and it turned out perfect. Highly recommended.",
  },
  {
    name: "Priya Mehta",
    text: "Beautiful handmade products. The quality and packaging were amazing.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-5xl font-serif text-[#2B1B14]">
            Loved by Our Customers
          </h2>

          <p className="mt-4 text-gray-500">
            Over <span className="font-semibold text-[#2B1B14]">500+ happy buyers</span> across India
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((t, i) => (

            <div
              key={i}
              className="bg-[#F8F6F2] p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >

              {/* Rating */}

              <div className="flex gap-1 text-[#D4AF37] mb-4">

                <Star size={18} fill="#D4AF37" />
                <Star size={18} fill="#D4AF37" />
                <Star size={18} fill="#D4AF37" />
                <Star size={18} fill="#D4AF37" />
                <Star size={18} fill="#D4AF37" />

              </div>

              {/* Review */}

              <p className="text-gray-600 leading-relaxed mb-6">
                "{t.text}"
              </p>

              {/* Customer */}

              <div className="flex items-center justify-between">

                <p className="font-medium text-[#2B1B14]">
                  {t.name}
                </p>

                <div className="flex items-center gap-1 text-green-600 text-sm">

                  <BadgeCheck size={16} />

                  Verified Buyer

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}