"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PackagePlus, Plus, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { bundlesData, bestSellersData } from "@/lib/data";
import { useCart } from "@/context/CartContext";

interface BundleUpsellWidgetProps {
  product: Product;
}

export default function BundleUpsellWidget({ product }: BundleUpsellWidgetProps) {
  const { addItem, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Find bundle that contains this product by name or id match
  const matchingBundle = bundlesData.find((b) =>
    b.itemsIncluded.some((item) =>
      item.toLowerCase().includes(product.name.toLowerCase().split(" ")[0]) ||
      product.name.toLowerCase().includes(item.toLowerCase().split(" ")[0]) ||
      b.id.includes(product.id.split("-")[0])
    )
  );

  if (!matchingBundle) return null;

  const handleAddBundle = () => {
    // Add primary product + fallback bundle items to cart
    addItem(product, 1);
    const item2 = bestSellersData.find((p) => p.id !== product.id) || bestSellersData[0];
    addItem(item2, 1);

    setIsAdded(true);
    openCart();

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="bg-[#FAF6F1] p-4 sm:p-5 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3.5 my-3">
      {/* Header Title & Savings Badge */}
      <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-2.5">
        <div className="flex items-center gap-2">
          <PackagePlus className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
          <h4 className="font-serif text-sm sm:text-base font-bold text-[#1F1B18]">
            Complete the Set
          </h4>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-[#C1663B] bg-[#FDF0EB] border border-[#F5D5C6] px-2.5 py-0.5 uppercase tracking-wider">
          {matchingBundle.saveAmount}
        </span>
      </div>

      {/* Bundle Thumbnail & Details */}
      <div className="flex items-center gap-3.5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white border border-[#E5E1DC] shrink-0 p-0.5">
          <Image
            src={matchingBundle.image}
            alt={matchingBundle.name}
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <h5 className="font-sans font-bold text-xs sm:text-sm text-[#1F1B18] truncate">
            {matchingBundle.name} Bundle
          </h5>
          <p className="text-[11px] text-[#6E675F] truncate">
            Includes: {matchingBundle.itemsIncluded.join(", ")}
          </p>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-xs sm:text-sm font-bold text-[#C1663B]">
              {matchingBundle.bundlePrice}
            </span>
            <span className="text-[11px] text-[#6E675F] line-through">
              {matchingBundle.originalPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Single-Click Add Bundle to Cart Button */}
      <button
        type="button"
        onClick={handleAddBundle}
        className={`w-full py-3 px-4 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 border btn-tactile cursor-pointer ${
          isAdded
            ? "bg-[#2F5D4F] text-white border-[#2F5D4F]"
            : "bg-[#C1663B] hover:bg-[#A8552E] text-white border-[#C1663B] shadow-[0_4px_14px_rgba(193,102,59,0.25)]"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-4 h-4 text-white stroke-[2]" />
            <span>Bundle Added to Cart!</span>
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 stroke-[1.5]" />
            <span>Add Bundle to Cart — {matchingBundle.bundlePrice}</span>
          </>
        )}
      </button>
    </div>
  );
}
