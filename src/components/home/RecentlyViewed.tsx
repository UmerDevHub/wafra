"use client";

import React, { useMemo } from "react";
import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";
import { bestSellersData, trendingProductsData } from "@/lib/data";
import { Product } from "@/lib/types";
import ProductCard from "../ui/ProductCard";
import { Clock } from "lucide-react";

export default function RecentlyViewed() {
  const { recentlyViewedIds, isInitialized, clearRecentlyViewed } = useRecentlyViewed();

  // Combine and deduplicate all products catalog
  const allProducts: Product[] = useMemo(() => {
    return Array.from(
      new Map(
        [...bestSellersData, ...trendingProductsData].map((p) => [p.id, p])
      ).values()
    );
  }, []);

  // Map IDs to actual product objects in order of view
  const recentProducts: Product[] = useMemo(() => {
    return recentlyViewedIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [recentlyViewedIds, allProducts]);

  // If not yet initialized or no items viewed yet, render nothing
  if (!isInitialized || recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#EFEAE3]">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-terracotta" />
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
            Recently Viewed
          </h2>
        </div>
        <button
          onClick={clearRecentlyViewed}
          className="text-xs text-body hover:text-terracotta transition hover:underline"
        >
          Clear History
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {recentProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
