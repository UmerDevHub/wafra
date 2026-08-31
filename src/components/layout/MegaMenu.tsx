"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Category, Product } from "@/lib/types";
import { bestSellersData, trendingProductsData } from "@/lib/data";

interface MegaMenuProps {
  category: Category;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function MegaMenu({
  category,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  if (!isOpen) return null;

  // Combine products catalog to resolve featured items
  const allProducts: Product[] = Array.from(
    new Map(
      [...bestSellersData, ...trendingProductsData].map((p) => [p.id, p])
    ).values()
  );

  // Get 3 featured products for this category
  const featuredProducts = (category.featuredProductIds || [])
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  // Fallback if needed to fill 3 items
  const displayProducts =
    featuredProducts.length >= 3
      ? featuredProducts.slice(0, 3)
      : allProducts.slice(0, 3);

  const isGifting = category.isGifting;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-full bg-white border-b border-[#EFEAE3] shadow-xl z-30 transition-all duration-200 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Category Info & Subcategory Links (4 cols) */}
          <div className="col-span-12 md:col-span-4 border-r border-[#EFEAE3] pr-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {isGifting && <Sparkles className="w-4 h-4 text-gold" />}
                <h3 className="font-serif text-2xl text-ink font-normal">
                  {category.name}
                </h3>
              </div>
              <p className="text-xs text-body/80 mb-6 leading-relaxed">
                {category.slug === "self-care-beauty" &&
                  "Elevate your daily ritual with salon-grade face care, makeup lighting, and hair styling tools."}
                {category.slug === "home-ambience" &&
                  "Turn your home into a calming sanctuary with aromatherapy diffusers and warm mood lighting."}
                {category.slug === "everyday-comfort" &&
                  "Beat UAE heat and daily friction with wearable cooling, travel mounts, and posture wellness."}
                {category.slug === "gifting" &&
                  "Culturally meaningful faith jewelry, alcohol-free attars, and luxury Eid & Ramadan gift sets."}
              </p>

              {/* Subcategories List */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-body/60 mb-2">
                  Browse Subcategories
                </h4>
                {category.subcategories?.map((sub) => {
                  const catSlug = category.slug === "self-care-beauty" ? "self-care" : category.slug;
                  return (
                    <Link
                      key={sub.slug}
                      href={`/collections/${catSlug}?sub=${sub.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between text-xs sm:text-sm font-medium text-ink hover:text-terracotta transition py-1"
                    >
                      <span>{sub.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-terracotta" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom "Shop All Category" Link */}
            <div className="pt-6 mt-6 border-t border-[#EFEAE3]">
              <Link
                href={`/collections/${category.slug === "self-care-beauty" ? "self-care" : category.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-terracotta hover:underline transition"
              >
                <span>Shop All {category.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Section: 3 Featured Product Thumbnails (8 cols) */}
          <div className="col-span-12 md:col-span-8 pl-0 md:pl-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-body/60">
                Featured Essentials
              </h4>
              <span className="text-xs text-body/60">Fast 1–3 Day UAE Delivery</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {displayProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug || product.id}`}
                  onClick={onClose}
                  className="bg-sand/50 rounded-xl p-3 border border-[#EFEAE3] hover:border-terracotta hover:bg-white hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-white mb-2.5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 20vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h5 className="font-sans font-bold text-xs text-ink group-hover:text-terracotta transition line-clamp-2 min-h-[32px]">
                      {product.name}
                    </h5>
                  </div>

                  <div className="flex items-baseline gap-1.5 mt-2 pt-2 border-t border-[#EFEAE3]">
                    <span className="text-xs font-bold text-terracotta">
                      {product.price}
                    </span>
                    {product.wasPrice && (
                      <span className="text-[11px] text-body/50 line-through">
                        {product.wasPrice}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
