"use client";

import React, { useState, useMemo, useRef } from "react";
import { testimonialsData } from "@/lib/data";
import ReviewCard from "../ui/ReviewCard";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Reviews() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique products for filtering dropdown/chips
  const productsList = useMemo(() => {
    const names = testimonialsData
      .map((t) => t.productName)
      .filter(Boolean) as string[];
    return Array.from(new Set(names));
  }, []);

  // Filtered testimonials
  const filteredReviews = useMemo(() => {
    if (selectedFilter === "all") return testimonialsData;
    if (selectedFilter === "5star") return testimonialsData.filter((t) => t.rating === 5);
    return testimonialsData.filter((t) => t.productName === selectedFilter);
  }, [selectedFilter]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6F1] border border-[#E5E1DC] text-[#1F1B18] text-xs font-bold uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 fill-[#E0A94B] text-[#E0A94B]" />
          <span>4.9 / 5.0 Rating Across 1,200+ UAE Customers</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F1B18] font-bold tracking-tight">
          Loved by Customers Across the UAE
        </h2>
      </div>

      {/* Filter Row & Carousel Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border transition cursor-pointer btn-tactile ${
              selectedFilter === "all"
                ? "bg-[#C1663B] text-white border-[#C1663B]"
                : "bg-white text-[#5B534B] hover:text-[#1F1B18] border-[#E5E1DC]"
            }`}
          >
            All Reviews ({testimonialsData.length})
          </button>

          <button
            onClick={() => setSelectedFilter("5star")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border transition flex items-center gap-1 cursor-pointer btn-tactile ${
              selectedFilter === "5star"
                ? "bg-[#C1663B] text-white border-[#C1663B]"
                : "bg-white text-[#5B534B] hover:text-[#1F1B18] border-[#E5E1DC]"
            }`}
          >
            <Star className="w-3 h-3 fill-[#E0A94B] text-[#E0A94B]" />
            <span>5 Stars Only</span>
          </button>

          {/* Product Filter Dropdown */}
          <div className="relative">
            <select
              value={productsList.includes(selectedFilter) ? selectedFilter : ""}
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedFilter(e.target.value);
                } else {
                  setSelectedFilter("all");
                }
              }}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-white text-[#5B534B] border border-[#E5E1DC] focus:border-[#C1663B] focus:outline-none cursor-pointer pr-7"
            >
              <option value="">By Product...</option>
              {productsList.map((pName) => (
                <option key={pName} value={pName}>
                  {pName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-white border border-[#E5E1DC] hover:border-[#1F1B18] text-[#1F1B18] transition cursor-pointer btn-tactile"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-white border border-[#E5E1DC] hover:border-[#1F1B18] text-[#1F1B18] transition cursor-pointer btn-tactile"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filteredReviews.map((testimonial) => (
          <div
            key={testimonial.id}
            className="snap-start shrink-0 w-[88%] sm:w-[350px] md:w-[380px]"
          >
            <ReviewCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
}
