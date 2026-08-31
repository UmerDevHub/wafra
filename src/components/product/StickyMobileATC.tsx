"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface StickyMobileATCProps {
  product: Product;
  selectedVariantName?: string;
  activePrice?: string;
  scrollThreshold?: number;
}

export default function StickyMobileATC({
  product,
  selectedVariantName,
  activePrice,
  scrollThreshold = 450,
}: StickyMobileATCProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  if (!isVisible) return null;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      price: activePrice || product.price,
      selectedVariant: selectedVariantName,
    };

    addItem(itemToAdd, 1);
    setIsAdded(true);
    openCart();

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EFEAE3] p-3 pb-safe shadow-2xl transition-all duration-300 transform md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left: Thumbnail & Details */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-sand border border-[#EFEAE3] shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs text-ink truncate">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-terracotta">
                {activePrice || product.price}
              </span>
              {selectedVariantName && (
                <span className="text-[10px] text-body/60 truncate">
                  • {selectedVariantName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`py-2.5 px-4 rounded-full font-bold text-xs shadow-md transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
            isAdded
              ? "bg-emerald-700 text-white"
              : "bg-terracotta hover:bg-[#B35F3C] text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
