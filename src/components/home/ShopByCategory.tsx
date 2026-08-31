import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categoriesData } from "@/lib/data";

export default function ShopByCategory() {
  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F1B18] text-center mb-8 sm:mb-10 font-bold tracking-tight">
        Shop by Category
      </h2>

      {/* 2 Columns on Mobile, 4 Columns on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {categoriesData.map((category) => (
          <Link
            key={category.id}
            href={`/collections/${category.slug === "self-care-beauty" ? "self-care" : category.slug}`}
            className="group relative h-[200px] sm:h-[300px] overflow-hidden border border-[#E5E1DC] shadow-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer btn-tactile"
          >
            {/* Background Image */}
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />

            {/* Bottom Dark Gradient Overlay */}
            <div
              className={`absolute inset-0 ${
                category.isGifting
                  ? "bg-gradient-to-t from-[#1F1B18]/90 via-[#1F1B18]/30 to-gold/10"
                  : "bg-gradient-to-t from-[#1F1B18]/85 via-[#1F1B18]/25 to-transparent"
              }`}
            />

            {/* Title & Accent */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <h3 className="text-white text-sm sm:text-lg font-bold font-sans tracking-tight leading-snug">
                {category.name}
              </h3>
              <span className="text-[11px] text-[#FAF6F1]/80 font-medium hidden sm:block mt-0.5">
                Explore Collection →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
