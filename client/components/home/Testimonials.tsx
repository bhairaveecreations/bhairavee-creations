"use client";

import { BadgeCheck } from "lucide-react";

type Testimonial = {
  name: string;
  city: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Monika Pote",
    city: "Hadapsar",
    text: "I had a wonderful experience with Bhairavee Creations. The detailing, finishing, and overall quality truly reflect the passion behind the work."
  },
  {
    name: "DinkuRani Devi",
    city: "Assam",
    text: "Absolutely loved the entire experience! The attention to detail and the way everything was handled shows true dedication."
  },
  {
    name: "Acharya Madhuri",
    city: "Odisha",
    text: "The quality and presentation exceeded my expectations. Highly satisfied!"
  },
  {
    name: "Varada Kulkarni",
    city: "Maharashtra",
    text: "Everything from ordering to delivery was smooth and professional. Would definitely recommend!"
  },
  {
    name: "Ragini Javeri",
    city: "Mumbai",
    text: "Such a beautiful experience overall! The quality and packaging made it feel very premium."
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif text-[#2B1B14]">
            Loved by Our Customers
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-500">
            Over{" "}
            <span className="font-semibold text-[#2B1B14]">
              500+ happy buyers
            </span>{" "}
            across India
          </p>
        </div>

        {/* MOBILE SCROLL */}
        <div className="flex md:hidden gap-4 overflow-x-auto no-scrollbar px-1 snap-x snap-mandatory">

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="
                min-w-[85%]
                snap-center
                bg-white/70 backdrop-blur-md
                border border-[#e8dcc6]
                p-6 rounded-2xl
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                flex flex-col justify-between
              "
            >
              <p className="text-gray-700 text-sm leading-relaxed italic mb-6">
                “{t.text}”
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="font-semibold text-[#2B1B14] text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#A88C4A] tracking-wide">
                    {t.city}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <BadgeCheck size={16} />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {testimonials.map((t, i) => (
            <div
              key={i}
              className="
                bg-white/70 backdrop-blur-md
                border border-[#e8dcc6]
                p-6 rounded-2xl
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]
                transition duration-300 hover:-translate-y-1
                flex flex-col justify-between
                min-h-[220px]
              "
            >
              <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed italic mb-6">
                “{t.text}”
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <p className="font-semibold text-[#2B1B14] text-sm md:text-base">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#A88C4A] tracking-wide">
                    {t.city}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-green-600 text-xs md:text-sm">
                  <BadgeCheck size={16} />
                  Verified
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}