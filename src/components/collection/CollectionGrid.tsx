"use client";

import React from "react";
import ProductCard from "../ui/ProductCard";
import { Product } from "@/lib/types";
import { PackageX, RotateCcw } from "lucide-react";

interface CollectionGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export default function CollectionGrid({
  products,
  onResetFilters,
}: CollectionGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-white rounded-3xl border border-[#EFEAE3] shadow-xs space-y-4 my-6">
        <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto text-terracotta">
          <PackageX className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-ink font-bold">
            No products match your filters
          </h3>
          <p className="text-xs text-body mt-1 max-w-sm mx-auto">
            Try adjusting your search query or subcategory selection to discover our full range of essentials.
          </p>
        </div>
        {onResetFilters && (
          <div className="pt-2">
            <button
              onClick={onResetFilters}
              className="bg-terracotta hover:bg-[#B35F3C] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
