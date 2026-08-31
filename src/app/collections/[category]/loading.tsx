import React from "react";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-sand pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <div className="h-4 w-40 bg-white/70 rounded" />
        <div className="w-full h-[280px] bg-white rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
