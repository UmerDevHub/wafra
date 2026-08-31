import React from "react";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function BundlesLoading() {
  return (
    <main className="min-h-screen bg-sand pb-20 animate-pulse">
      <div className="bg-white border-b border-[#EFEAE3] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-4 w-48 bg-sand rounded" />
          <div className="h-10 w-80 bg-sand rounded" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
