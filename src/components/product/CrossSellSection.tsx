"use client";

import React, { useMemo } from "react";
import { Product } from "@/lib/types";
import { allProductsData, getProductBySlug } from "@/lib/data";
import ProductCard from "../ui/ProductCard";
import { Flame } from "lucide-react";

interface CrossSellSectionProps {
  currentProduct: Product;
}

export default function CrossSellSection({ currentProduct }: CrossSellSectionProps) {
  const crossSellList = useMemo(() => {
    if (currentProduct.crossSellSlugs && currentProduct.crossSellSlugs.length > 0) {
      const items = currentProduct.crossSellSlugs
        .map((s) => getProductBySlug(s))
        .filter(Boolean) as Product[];
      if (items.length > 0) return items.slice(0, 4);
    }

    // Fallback cross-category items (different category than currentProduct)
    return allProductsData
      .filter(
        (p) =>
          p.id !== currentProduct.id &&
          p.categorySlug !== currentProduct.categorySlug
      )
      .slice(0, 4);
  }, [currentProduct]);

  if (crossSellList.length === 0) return null;

  return (
    <section className="bg-beige/60 p-6 sm:p-10 rounded-3xl border border-[#E8DACB] shadow-2xs space-y-6">
      <div className="flex items-center gap-2 border-b border-[#E8DACB] pb-4">
        <Flame className="w-5 h-5 text-terracotta" />
        <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
          Goes Well With
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {crossSellList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
