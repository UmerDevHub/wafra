"use client";

import React, { useState, useEffect } from "react";
import { trendingProductsData } from "@/lib/data";
import ProductCard from "../ui/ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";

interface TrendingStripProps {
  isLoading?: boolean;
}

export default function TrendingStrip({
  isLoading: propIsLoading,
}: TrendingStripProps) {
  const [isLoading, setIsLoading] = useState(
    propIsLoading !== undefined ? propIsLoading : true
  );

  useEffect(() => {
    if (propIsLoading === undefined) {
      const timer = setTimeout(() => setIsLoading(false), 250);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(propIsLoading);
    }
  }, [propIsLoading]);

  return (
    <section className="bg-beige py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-lg">🔥</span>
          <h3 className="font-sans font-bold text-lg md:text-xl text-ink">
            Trending This Week
          </h3>
        </div>

        {/* 6 Dense Product Cards in 1 Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} compact />
              ))
            : trendingProductsData.map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
        </div>
      </div>
    </section>
  );
}
