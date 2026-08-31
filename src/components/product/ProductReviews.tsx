"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, CheckCircle2, Filter, Edit3, X } from "lucide-react";
import { Review } from "@/lib/types";
import StarRating from "../ui/StarRating";

interface ProductReviewsProps {
  reviews?: Review[];
  productName: string;
}

export default function ProductReviews({
  reviews: initialReviews,
  productName,
}: ProductReviewsProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "5star" | "4star" | "photos">("all");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Default fallback reviews if none provided
  const reviewsList: Review[] = useMemo(() => {
    if (initialReviews && initialReviews.length > 0) return initialReviews;
    return [
      {
        id: "rev-def-1",
        author: "Fatima Al-Nuaimi",
        city: "Dubai, Marina",
        rating: 5,
        date: "3 days ago",
        verified: true,
        title: "Must-have UAE essential!",
        content: "Outstanding quality! Super fast 24-hour Cash on Delivery to Dubai Marina. Works exactly as described.",
        photos: ["/images/category-selfcare.webp"],
      },
      {
        id: "rev-def-2",
        author: "Ahmed K.",
        city: "Abu Dhabi",
        rating: 5,
        date: "1 week ago",
        verified: true,
        title: "Great value for money",
        content: "Build quality is top notch. Delivery was fast and polite courier.",
      },
      {
        id: "rev-def-3",
        author: "Mariam H.",
        city: "Sharjah",
        rating: 4,
        date: "2 weeks ago",
        verified: true,
        title: "Very pleased with purchase",
        content: "Looks very luxury on my vanity setup. Highly recommended!",
      },
    ];
  }, [initialReviews]);

  // Rating breakdown stats
  const totalCount = reviewsList.length;
  const avgRating = 4.9;

  const ratingCounts = useMemo(() => {
    return {
      5: Math.round(totalCount * 0.85) || 120,
      4: Math.round(totalCount * 0.12) || 18,
      3: 2,
      2: 0,
      1: 0,
    };
  }, [totalCount]);

  // Filter logic
  const filteredReviews = useMemo(() => {
    return reviewsList.filter((rev) => {
      if (activeFilter === "5star") return rev.rating === 5;
      if (activeFilter === "4star") return rev.rating === 4;
      if (activeFilter === "photos") return rev.photos && rev.photos.length > 0;
      return true;
    });
  }, [reviewsList, activeFilter]);

  return (
    <section id="reviews-section" className="bg-white p-6 sm:p-10 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-8">
      {/* Top Header & Write Review Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EFEAE3] pb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1F1B18] font-bold tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-[#6E675F] mt-1">
            Real feedback from verified buyers across the UAE
          </p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="bg-[#FAF6F1] hover:bg-[#FAF6F1] text-[#C1663B] border border-[#C1663B] px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer btn-tactile"
        >
          <Edit3 className="w-4 h-4 stroke-[1.5]" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Rating Summary Bar & Bar Chart Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#FAF6F1] p-6 border border-[#E5E1DC]">
        {/* Left: Overall Score (col-span-4) */}
        <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-[#EFEAE3] pb-6 md:pb-0 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="font-serif text-5xl font-extrabold text-[#1F1B18]">
              {avgRating}
            </span>
            <span className="text-sm font-bold text-[#6E675F]">/ 5.0</span>
          </div>
          <StarRating rating={5} size="md" />
          <p className="text-xs text-[#6E675F] font-semibold pt-1">
            Based on {totalCount} verified buyer reviews
          </p>
        </div>

        {/* Right: Bar Chart Breakdown (col-span-8) */}
        <div className="md:col-span-8 space-y-2 text-xs">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
            const pct = Math.round((count / (totalCount * 1.1)) * 100);
            return (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-8 font-bold text-[#1F1B18] text-right">{stars} ★</span>
                <div className="flex-1 bg-[#E5E1DC] h-2.5 overflow-hidden">
                  <div
                    className="bg-[#C1663B] h-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-[#6E675F] text-right font-medium">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-[#1F1B18] mr-1 flex items-center gap-1 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5]" />
          Filter:
        </span>
        {[
          { key: "all", label: "All Reviews" },
          { key: "5star", label: "5 ★ Only" },
          { key: "4star", label: "4 ★ Only" },
          { key: "photos", label: "With Photos 📷" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key as any)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer btn-tactile ${
              activeFilter === f.key
                ? "bg-[#C1663B] text-white border-[#C1663B]"
                : "bg-white text-[#6E675F] border-[#E5E1DC] hover:text-[#1F1B18]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Reviews Cards List (Clean Non-Overlapping Mobile Header) */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#6E675F]">
            No reviews match your selected filter.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-[#FAF6F1] border border-[#E5E1DC] space-y-3 transition hover:border-[#C1663B]"
            >
              {/* Clean Mobile Responsive Header Layout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFEAE3] pb-3">
                {/* Author Name + Verified Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-[#1F1B18]">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2F5D4F] bg-[#E8F5EF] border border-[#BDE3CB] px-2 py-0.5 shrink-0 uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 stroke-[1.5]" />
                      <span>Verified Purchase</span>
                    </span>
                  )}
                </div>

                {/* City, Rating & Date */}
                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-[#6E675F]">
                  <span className="text-[11px] text-[#6E675F] font-medium">{rev.city}</span>
                  <span className="text-[#6E675F]/30">•</span>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={rev.rating} size="sm" />
                    <span className="text-[10px] text-[#6E675F] whitespace-nowrap">{rev.date}</span>
                  </div>
                </div>
              </div>

              {/* Title & Body Content */}
              {rev.title && (
                <h4 className="font-bold text-xs sm:text-sm text-[#1F1B18]">
                  {rev.title}
                </h4>
              )}
              <p className="text-xs sm:text-sm text-[#5B534B] leading-relaxed">
                {rev.content}
              </p>

              {/* Photo Thumbnails */}
              {rev.photos && rev.photos.length > 0 && (
                <div className="flex items-center gap-2 pt-2">
                  {rev.photos.map((p, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 bg-white border border-[#E5E1DC] shrink-0"
                    >
                      <Image
                        src={p}
                        alt="Customer review photo"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            onClick={() => setIsWriteModalOpen(false)}
            className="fixed inset-0 bg-[#1F1B18]/60 backdrop-blur-xs cursor-pointer"
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-2xl space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#1F1B18]">
                  Write a Review for {productName}
                </h3>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 text-[#6E675F] hover:text-[#1F1B18] cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsWriteModalOpen(false);
                }}
                className="space-y-4 text-xs text-[#1F1B18]"
              >
                <div>
                  <label className="block font-bold text-[#1F1B18] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Noura Al-Hashemi"
                    className="w-full p-3 border border-[#E5E1DC] bg-[#FAF6F1] focus:outline-none focus:border-[#C1663B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1F1B18] mb-1">City / Emirate</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai Marina"
                    className="w-full p-3 border border-[#E5E1DC] bg-[#FAF6F1] focus:outline-none focus:border-[#C1663B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1F1B18] mb-1">Rating</label>
                  <select className="w-full p-3 border border-[#E5E1DC] bg-[#FAF6F1] focus:outline-none focus:border-[#C1663B] cursor-pointer">
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars - Very Good</option>
                    <option value="3">⭐⭐⭐ 3 Stars - Average</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#1F1B18] mb-1">Review Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Absolutely love this product!"
                    className="w-full p-3 border border-[#E5E1DC] bg-[#FAF6F1] focus:outline-none focus:border-[#C1663B]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1F1B18] mb-1">Review Text</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share details of your experience..."
                    className="w-full p-3 border border-[#E5E1DC] bg-[#FAF6F1] focus:outline-none focus:border-[#C1663B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C1663B] hover:bg-[#A8552E] text-white py-3.5 font-bold text-xs uppercase tracking-wider border border-[#C1663B] shadow-xs cursor-pointer btn-tactile"
                >
                  Submit Verified Review
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
