"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bestSellersData } from "@/lib/data";
import { Product } from "@/lib/types";
import ProductCard from "../ui/ProductCard";
import ProductCardSkeleton from "../ui/ProductCardSkeleton";

interface BestSellersProps {
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
}

export default function BestSellers({
  onAddToCart,
  isLoading: propIsLoading,
}: BestSellersProps) {
  const [isLoading, setIsLoading] = useState(
    propIsLoading !== undefined ? propIsLoading : true
  );

  useEffect(() => {
    if (propIsLoading === undefined) {
      // Simulate initial smooth load
      const timer = setTimeout(() => setIsLoading(false), 250);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(propIsLoading);
    }
  }, [propIsLoading]);

  return (
    <section id="best-sellers" className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1F1B18] font-bold tracking-tight">
          Best Sellers
        </h2>
        <Link
          href="/shop-all"
          className="text-[#C1663B] font-bold text-xs sm:text-sm flex items-center gap-1 hover:underline transition cursor-pointer"
        >
          <span>View All</span> <ArrowRight className="w-4 h-4 stroke-[1.5]" />
        </Link>
      </div>

      {/* 5 Product Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : bestSellersData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
      </div>
    </section>
  );
}
