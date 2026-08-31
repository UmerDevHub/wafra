"use client";

import React from "react";

interface ProductCardSkeletonProps {
  compact?: boolean;
}

export default function ProductCardSkeleton({
  compact = false,
}: ProductCardSkeletonProps) {
  if (compact) {
    return (
      <div className="bg-white rounded-xl p-3 border border-[#E8DACB] shadow-xs flex flex-col justify-between animate-pulse">
        <div>
          {/* Image skeleton */}
          <div className="relative aspect-square rounded-lg bg-[#EFEAE3] mb-2.5" />
          {/* Title line */}
          <div className="h-3.5 bg-[#EFEAE3] rounded w-3/4 mb-2" />
          {/* Price line */}
          <div className="h-3 bg-[#EFEAE3] rounded w-1/2 mb-2" />
          {/* Star rating skeleton */}
          <div className="h-2.5 bg-[#EFEAE3] rounded w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#EFEAE3] shadow-xs flex flex-col justify-between animate-pulse">
      <div>
        {/* Image skeleton */}
        <div className="relative aspect-square rounded-xl bg-[#EFEAE3] mb-3.5" />
        {/* Title lines (2 lines) */}
        <div className="space-y-1.5 mb-2">
          <div className="h-3.5 bg-[#EFEAE3] rounded w-5/6" />
          <div className="h-3.5 bg-[#EFEAE3] rounded w-2/3" />
        </div>
        {/* Price line */}
        <div className="h-4 bg-[#EFEAE3] rounded w-2/5 mb-2" />
        {/* Stock line placeholder */}
        <div className="h-3 bg-[#EFEAE3] rounded w-1/2 mb-4" />
      </div>

      {/* Button placeholder */}
      <div className="h-9 bg-[#EFEAE3] rounded-full w-full" />
    </div>
  );
}
