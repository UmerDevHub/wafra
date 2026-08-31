import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Testimonial } from "@/lib/types";
import StarRating from "./StarRating";

interface ReviewCardProps {
  testimonial: Testimonial;
}

export default function ReviewCard({ testimonial }: ReviewCardProps) {
  return (
    <div className="bg-white p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 border border-[#E5E1DC] flex flex-col justify-between h-full min-w-[270px] sm:min-w-[340px]">
      <div>
        {/* Top Header: Customer Info + Verified Badge */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 border border-[#E5E1DC] bg-[#FAF6F1] shrink-0">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1F1B18]">
                {testimonial.name}
              </h4>
              <span className="text-[11px] text-[#6E675F] block">
                {testimonial.city}
              </span>
            </div>
          </div>

          {/* Verified Badge */}
          {testimonial.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2F5D4F] bg-[#E8F5EF] border border-[#BDE3CB] px-2 py-0.5 uppercase tracking-wider shrink-0">
              <CheckCircle2 className="w-3 h-3 stroke-[1.5]" />
              <span>Verified Buyer</span>
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="mb-2.5">
          <StarRating rating={testimonial.rating} size="sm" />
        </div>

        {/* Review Quote */}
        <p className="text-[#1F1B18] text-xs sm:text-sm italic leading-relaxed mb-4 font-normal">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Bottom Product Association Chip */}
      {testimonial.productName && (
        <div className="pt-3 border-t border-[#EFEAE3] flex items-center gap-2">
          {testimonial.productThumbnail && (
            <div className="relative w-7 h-7 bg-[#FAF6F1] border border-[#E5E1DC] shrink-0">
              <Image
                src={testimonial.productThumbnail}
                alt={testimonial.productName}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
          )}
          <span className="text-[11px] font-medium text-[#6E675F] truncate">
            Purchased: <strong className="text-[#1F1B18] font-bold">{testimonial.productName}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
