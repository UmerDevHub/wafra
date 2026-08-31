import React from "react";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function ShopAllLoading() {
  return (
    <main className="min-h-screen bg-sand pb-20 animate-pulse">
      <div className="bg-white border-b border-[#EFEAE3] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="h-4 w-32 bg-sand rounded" />
          <div className="h-10 w-64 bg-sand rounded" />
          <div className="h-4 w-96 bg-sand rounded" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
