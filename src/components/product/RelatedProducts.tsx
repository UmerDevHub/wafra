"use client";

import React, { useMemo } from "react";
import { Product } from "@/lib/types";
import { allProductsData } from "@/lib/data";
import ProductCard from "../ui/ProductCard";
import { Sparkles } from "lucide-react";

interface RelatedProductsProps {
  currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  // Find products in same category or fallback to best sellers (excluding current)
  const relatedList = useMemo(() => {
    let sameCat = allProductsData.filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.categorySlug === currentProduct.categorySlug || p.categoryName === currentProduct.categoryName)
    );

    if (sameCat.length < 4) {
      const remaining = allProductsData.filter(
        (p) => p.id !== currentProduct.id && !sameCat.some((sc) => sc.id === p.id)
      );
      sameCat = [...sameCat, ...remaining];
    }

    return sameCat.slice(0, 4);
  }, [currentProduct]);

  if (relatedList.length === 0) return null;

  return (
    <section className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EFEAE3] shadow-xs space-y-6">
      <div className="flex items-center gap-2 border-b border-[#EFEAE3] pb-4">
        <Sparkles className="w-5 h-5 text-terracotta" />
        <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
          You Might Also Like
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        {relatedList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
