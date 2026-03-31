"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { FaAmazon, FaInstagram } from "react-icons/fa";

export default function InstagramSection() {

  const post = {
    image: "/Insta.png",
    link: "https://www.instagram.com/p/YOUR_POST_LINK/",
  };

  return (

    <section className="py-24 bg-[#F8F6F2]">

      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-serif text-[#2B1B14]">
            Follow Our Journey on Instagram
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            See our latest resin creations and behind-the-scenes crafting moments.
          </p>

        </div>


        {/* Featured Instagram Post */}

        <Link
          href={post.link}
          target="_blank"
          className="group relative block aspect-square max-w-xl mx-auto overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition"
        >

          {/* Image */}

          <Image
            src={post.image}
            alt="Bhairvee Creations Instagram Post"
            fill
            sizes="(max-width:768px) 100vw, 600px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

            <div className="text-white text-center flex flex-col items-center gap-3">

              <FaInstagram size={24} />
              <p className="text-sm font-medium tracking-wide">
                View on Instagram
              </p>

            </div>

          </div>

        </Link>


        {/* Follow Button */}

<div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-12 px-4">

  <Link
    href="https://www.instagram.com/bhairaveecreattions/"
    target="_blank"
    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border border-[#2B1B14] px-5 py-3 rounded-full text-sm md:text-base hover:bg-[#2B1B14] hover:text-white transition"
  >
    <Instagram size={18} />
    Follow @bhairaveecreattions
  </Link>

  <Link
    href="https://www.amazon.in/l/27943762031?me=A383GKJQSMEM1Z&tag=ShopReferral_1a5162dc-bdbb-4647-b9b9-498020c4e053&ref=sf_seller_app_share_new_ls_srb"
    target="_blank"
    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border border-[#2B1B14] px-5 py-3 rounded-full text-sm md:text-base hover:bg-[#2B1B14] hover:text-white transition"
  >
    <FaAmazon size={18} />
    Visit On Amazon
  </Link>

</div>

      </div>

    </section>

  );

}