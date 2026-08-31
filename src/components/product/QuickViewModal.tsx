"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import StarRating from "../ui/StarRating";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorite = product ? isInWishlist(product.id) : false;

  // Reset quantity when modal opens with a new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Modal Alignment Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EFEAE3] overflow-hidden animate-fadeIn transition-all duration-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-sand hover:bg-beige text-body hover:text-ink transition shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative aspect-square md:aspect-auto bg-sand p-6 flex items-center justify-center min-h-[300px]">
              <div className="relative w-full h-full max-h-[340px] aspect-square rounded-2xl overflow-hidden shadow-xs">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: Product Details & Purchase Form */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full inline-block mb-2">
                  Quick View
                </span>
                <h3 className="font-serif text-2xl text-ink font-normal leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-xs text-body/70 font-medium">
                    (Verified UAE Buyer Reviews)
                  </span>
                </div>

                {/* Price & Real Stock Indicator */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xl font-bold text-terracotta">
                      {product.price}
                    </span>
                    <span className="text-sm text-body/60 line-through">
                      {product.wasPrice}
                    </span>
                  </div>
                  {product.stockCount !== undefined && product.stockCount <= 10 && (
                    <p className="text-xs font-semibold text-[#E05338] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#E05338] animate-pulse" />
                      <span>Only {product.stockCount} left in Dubai fulfillment center</span>
                    </p>
                  )}
                </div>

                {/* 2-Sentence Description */}
                <p className="text-xs sm:text-sm text-body leading-relaxed mt-3 border-t border-[#EFEAE3] pt-3">
                  {product.description ||
                    "Curated lifestyle and self-care essential designed for modern UAE living with premium build quality."}
                </p>

                {/* Micro Trust Points */}
                <div className="flex items-center gap-4 text-[11px] text-body/80 mt-3 pt-3 border-t border-[#EFEAE3]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-terracotta" /> Fast 1–3 Days
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-terracotta" /> COD Available
                  </span>
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ink">Qty:</span>
                  <div className="inline-flex items-center border border-[#EFEAE3] rounded-full bg-sand px-3 py-1 space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-body hover:text-ink transition"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-ink w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-body hover:text-ink transition"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart & Wishlist Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-terracotta hover:bg-[#B35F3C] text-white py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — {product.price}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-full border transition-all ${
                      isFavorite
                        ? "bg-sand border-terracotta text-terracotta"
                        : "bg-sand border-[#EFEAE3] text-body/70 hover:text-terracotta hover:border-terracotta"
                    }`}
                    aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isFavorite ? "fill-terracotta text-terracotta" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Full Details Link */}
                <Link
                  href={`/products/${product.slug || product.id}`}
                  onClick={onClose}
                  className="block text-center text-xs font-bold text-terracotta hover:underline pt-1"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
