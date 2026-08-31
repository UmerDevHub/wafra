"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface StickyMobileCartBarProps {
  product?: Product;
  targetId?: string; // Optional DOM id to observe (e.g. "product-main-image" or "hero-cta")
  scrollThreshold?: number; // Optional scroll distance threshold in pixels
}

export default function StickyMobileCartBar({
  product,
  targetId,
  scrollThreshold = 400,
}: StickyMobileCartBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    // If a target element ID is provided, use IntersectionObserver
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            // Show bar when the target has scrolled out of view (above the viewport)
            setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
          },
          { threshold: 0 }
        );

        observer.observe(targetElement);
        return () => observer.disconnect();
      }
    }

    // Fallback: window scroll listener
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetId, scrollThreshold]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/98 backdrop-blur-md border-t border-[#EFEAE3] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!isVisible}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Thumbnail & Info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-sand border border-[#EFEAE3] flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="font-sans font-bold text-xs text-ink truncate">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-terracotta">
                {product.price}
              </span>
              <span className="text-[10px] text-body/50 line-through">
                {product.wasPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-terracotta hover:bg-[#B35F3C] text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 flex-shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
