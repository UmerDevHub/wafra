"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { bestSellersData, trendingProductsData } from "@/lib/data";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import PillButton from "@/components/ui/PillButton";

export default function WishlistPage() {
  const { wishlistIds, clearWishlist } = useWishlist();

  // Combine and deduplicate all products
  const allProducts: Product[] = useMemo(() => {
    return Array.from(
      new Map(
        [...bestSellersData, ...trendingProductsData].map((p) => [p.id, p])
      ).values()
    );
  }, []);

  const savedProducts: Product[] = useMemo(() => {
    return wishlistIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [wishlistIds, allProducts]);

  return (
    <div className="min-h-[70vh] py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-body hover:text-terracotta transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {savedProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-medium text-body/70 hover:text-[#E05338] transition hover:underline"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {/* Page Title Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-terracotta fill-terracotta" />
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
            Saved Essentials
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          Your Wishlist ({savedProducts.length})
        </h1>
        <p className="text-sm text-body mt-1">
          Items you've saved for later. Available with fast UAE delivery and Cash on Delivery.
        </p>
      </div>

      {/* Content */}
      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 sm:p-16 border border-[#EFEAE3] text-center max-w-lg mx-auto shadow-xs space-y-5">
          <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto text-terracotta">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-ink font-normal">
              Your wishlist is empty
            </h3>
            <p className="text-xs sm:text-sm text-body mt-2 leading-relaxed">
              Explore our curated self-care, cooling, and gifting essentials and save your favorites here.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/#best-sellers">
              <PillButton variant="primary">Explore Best Sellers</PillButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
