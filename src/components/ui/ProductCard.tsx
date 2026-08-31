"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";
import StarRating from "./StarRating";
import QuickViewModal from "../product/QuickViewModal";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  compact = false,
  onAddToCart,
}: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addProductToRecentlyViewed } = useRecentlyViewed();

  const isFavorite = isInWishlist(product.id);

  // Active image depends on selected variant if available
  const activeVariant = product.variants?.[selectedVariantIndex];
  const displayImage = activeVariant?.image || product.image;

  const handleOpenQuickView = () => {
    setIsQuickViewOpen(true);
    addProductToRecentlyViewed(product.id);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem(product, 1);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleSelectVariant = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedVariantIndex(index);
  };

  const isLowStock = product.stockCount !== undefined && product.stockCount <= 10;

  if (compact) {
    return (
      <>
        <div className="bg-white p-2.5 sm:p-3 border border-[#EDEAE5] shadow-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-150 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
          {product.trending && (
            <div className="absolute top-2 left-2 z-10 bg-[#1F1B18] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
              Trending
            </div>
          )}

          {/* Action Icons in Top Corners */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
            <button
              onClick={handleToggleFavorite}
              className={`p-1.5 bg-white/90 backdrop-blur-xs transition-all duration-150 cursor-pointer ${
                isFavorite
                  ? "text-[#C1663B] bg-white"
                  : "text-[#1F1B18] hover:text-[#C1663B]"
              }`}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-3.5 h-3.5 stroke-[1.5] ${
                  isFavorite ? "fill-[#C1663B] text-[#C1663B]" : ""
                }`}
              />
            </button>
          </div>

          <div>
            {/* Image Container */}
            <Link
              href={`/products/${product.slug || product.id}`}
              className="relative aspect-square overflow-hidden bg-[#FAF6F1] border border-[#E5E1DC] mb-2 cursor-pointer block"
            >
              <Image
                src={displayImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className={`object-cover object-center transition-all duration-300 group-hover:scale-[1.02] ${
                  product.imageHover ? "group-hover:opacity-0" : ""
                }`}
              />

              {product.imageHover && (
                <Image
                  src={product.imageHover}
                  alt={`${product.name} lifestyle`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-[1.02]"
                />
              )}
            </Link>

            <Link
              href={`/products/${product.slug || product.id}`}
              className="font-sans font-bold text-xs text-[#1F1B18] truncate mb-1 block hover:text-[#C1663B] transition"
            >
              {product.name}
            </Link>

            <div className="flex items-baseline gap-1.5 mb-1">
              <span className="text-[11px] text-[#6E675F] line-through">
                {product.wasPrice}
              </span>
              <span className="text-xs font-bold text-[#C1663B]">
                {product.price}
              </span>
            </div>

            <StarRating rating={product.rating} size="sm" />
          </div>
        </div>

        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-white p-3 sm:p-4 border border-[#EDEAE5] shadow-none hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between group relative overflow-hidden cursor-pointer w-full">
        <div>
          {/* Image Container with 1:1 Aspect Ratio */}
          <div className="relative aspect-square overflow-hidden bg-[#FAF6F1] mb-2.5 border border-[#E5E1DC] group/img w-full">
            {/* BEST SELLER Badge (Top-Left) */}
            <div className="absolute top-2 left-2 z-20 bg-[#1F1B18] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 flex items-center gap-1">
              <span>Best Seller</span>
            </div>

            {/* Floating Wishlist Heart Toggle (Top-Right) */}
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-2 right-2 z-20 p-2 bg-white/90 backdrop-blur-xs transition-all duration-150 cursor-pointer shadow-xs ${
                isFavorite
                  ? "bg-white text-[#C1663B]"
                  : "bg-white/90 text-[#1F1B18] hover:text-[#C1663B] hover:bg-white"
              }`}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-3.5 h-3.5 stroke-[1.5] ${
                  isFavorite ? "fill-[#C1663B] text-[#C1663B]" : ""
                }`}
              />
            </button>

            {/* Primary / Active Variant Image */}
            <Link href={`/products/${product.slug || product.id}`} className="block relative w-full h-full">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className={`object-cover object-center transition-all duration-300 group-hover/img:scale-[1.02] cursor-pointer ${
                  product.imageHover ? "group-hover/img:opacity-0" : ""
                }`}
              />

              {/* Secondary Crossfade Image */}
              {product.imageHover && (
                <Image
                  src={product.imageHover}
                  alt={`${product.name} in-use`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 group-hover/img:scale-[1.02] cursor-pointer"
                />
              )}
            </Link>

            {/* Floating Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenQuickView();
              }}
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-xs text-[#1F1B18] hover:bg-[#C1663B] hover:text-white text-[11px] font-bold px-3 py-1.5 border border-[#E5E1DC] opacity-0 group-hover/img:opacity-100 transition-all duration-150 flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <Eye className="w-3 h-3 stroke-[1.5]" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Title - Links to PDP */}
          <Link
            href={`/products/${product.slug || product.id}`}
            className="font-sans font-bold text-xs text-[#1F1B18] line-clamp-2 mb-1.5 min-h-[32px] block hover:text-[#C1663B] transition leading-tight"
          >
            {product.name}
          </Link>

          {/* Pricing Row */}
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="text-[11px] text-[#6E675F] line-through">
              {product.wasPrice}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#C1663B]">
              {product.price}
            </span>
            <span className="text-[9px] font-bold text-[#C1663B] bg-[#FDF0EB] border border-[#F5D5C6] px-1.5 py-0.5 uppercase tracking-wider">
              31% OFF
            </span>
          </div>

          {/* Color / Variant Swatch Squares */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-1 mb-1.5 min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleSelectVariant(e, idx)}
                    title={v.name}
                    className={`w-3.5 h-3.5 border transition-all duration-150 flex items-center justify-center cursor-pointer ${
                      selectedVariantIndex === idx
                        ? "border-2 border-[#1F1B18] scale-110"
                        : "border-[#E5E1DC] hover:scale-105"
                    }`}
                    style={{ backgroundColor: v.hex }}
                    aria-label={`Select variant ${v.name}`}
                  />
                ))}
              </div>
              <span className="text-[9px] text-[#6E675F] truncate max-w-[85px] block">
                {product.variants[selectedVariantIndex]?.name}
              </span>
            </div>
          )}

          {/* Single Combined Rating & Stock Line */}
          <div className="flex items-center justify-between text-[10px] font-medium text-[#6E675F] mb-2.5 gap-1">
            <div className="shrink-0">
              <StarRating rating={product.rating} size="sm" />
            </div>
            <span className={`text-[10px] whitespace-nowrap ${isLowStock ? "text-[#E05338] font-bold" : "text-[#2F5D4F] font-bold"}`}>
              {isLowStock ? `Only ${product.stockCount} left` : "In Stock"}
            </span>
          </div>
        </div>

        {/* Refined Proportioned ADD TO CART Button (~38px height) */}
        <button
          onClick={handleAdd}
          className="w-full bg-[#C1663B] hover:bg-[#A8552E] text-white h-9.5 px-3 font-bold text-[11px] uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-1.5 btn-tactile cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
