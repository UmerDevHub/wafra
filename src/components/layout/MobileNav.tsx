"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronUp, ShoppingBag, Heart, Sparkles, PhoneCall, Truck } from "lucide-react";
import { categoriesConfig } from "@/lib/data";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
}

export default function MobileNav({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
  onOpenCart,
}: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1F1B18]/60 backdrop-blur-xs z-40 transition-opacity duration-300 cursor-pointer"
      />

      {/* Slide-in Drawer from Left */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs sm:max-w-sm h-full bg-white border-r border-[#E5E1DC] shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideRight">
        {/* Header */}
        <div className="p-5 border-b border-[#EFEAE3] flex items-center justify-between bg-[#FAF6F1]">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-2xl text-[#1F1B18] font-bold tracking-tight"
          >
            wafra
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-[#1F1B18] hover:text-[#C1663B] transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-5 space-y-4 flex-1">
          {/* Shop All Link */}
          <Link
            href="/shop-all"
            onClick={onClose}
            className="block text-sm font-bold text-[#1F1B18] hover:text-[#C1663B] transition py-1.5 border-b border-[#EFEAE3] uppercase tracking-wider"
          >
            Shop All Essentials
          </Link>

          {/* Categories Accordion */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E675F] block">
              Categories
            </span>
            {categoriesConfig.map((cat) => {
              const isExpanded = expandedCategory === cat.slug;
              return (
                <div key={cat.slug} className="py-1 border-b border-[#EFEAE3]">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/collections/${cat.slug}`}
                      onClick={onClose}
                      className="text-sm font-semibold text-[#1F1B18] hover:text-[#C1663B] transition"
                    >
                      {cat.name}
                    </Link>
                    <button
                      onClick={() => toggleCategory(cat.slug)}
                      className="p-1 text-[#6E675F] hover:text-[#C1663B] transition cursor-pointer"
                      aria-label={`Expand ${cat.name}`}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 stroke-[1.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[1.5] text-[#C1663B]" />
                      )}
                    </button>
                  </div>

                  {/* Subcategories List */}
                  {isExpanded && (
                    <div className="pl-3 pt-2.5 pb-1 space-y-2 border-l-2 border-[#C1663B] mt-2 bg-[#FAF6F1] px-2">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/collections/${cat.slug}?sub=${sub.slug}`}
                          onClick={onClose}
                          className="block text-xs font-medium text-[#6E675F] hover:text-[#C1663B] transition py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bundles & Special Offers */}
          <Link
            href="/bundles-and-offers"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-bold text-[#C1663B] hover:underline transition py-2 border-b border-[#EFEAE3]"
          >
            <Sparkles className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
            <span>Bundles & Special Offers</span>
          </Link>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-5 border-t border-[#EFEAE3] bg-[#FAF6F1] space-y-3 text-xs font-semibold text-[#1F1B18]">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 p-2.5 bg-white border border-[#E5E1DC] hover:border-[#C1663B] transition shadow-2xs cursor-pointer"
            >
              <Heart className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>

            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="flex items-center justify-center gap-1.5 p-2.5 bg-[#C1663B] text-white font-bold transition shadow-2xs cursor-pointer btn-tactile"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span>Cart ({cartCount})</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-[#6E675F] text-[11px]">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5]" />
              100% Cash on Delivery
            </span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5]" />
              WhatsApp Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
