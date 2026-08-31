"use client";

import React from "react";
import { Lock, Banknote, ShieldCheck, RotateCcw, Truck } from "lucide-react";

interface ProductTrustBlockProps {
  stockCount?: number;
}

export default function ProductTrustBlock({ stockCount }: ProductTrustBlockProps) {
  const isLowStock = stockCount !== undefined && stockCount <= 10;

  return (
    <div className="space-y-3.5 pt-2 border-t border-[#EFEAE3]">
      {/* Honest Urgency Stock Line (Only shown if stock <= 10) */}
      {isLowStock && (
        <div className="bg-[#FDF0EB] border border-[#F5D5C6] p-3 text-xs font-bold text-[#C1663B] flex items-center gap-2.5">
          <span
            style={{ borderRadius: "9999px" }}
            className="w-2 h-2 bg-[#C1663B] animate-pulse shrink-0"
          />
          <span>
            Hurry! Only <strong className="font-extrabold text-[#A8552E]">{stockCount} items</strong> remaining in Dubai warehouse.
          </span>
        </div>
      )}

      {/* 2x2 Mini-Grid Trust Badges */}
      <div className="grid grid-cols-2 gap-2 text-xs text-[#1F1B18] font-bold">
        <div className="bg-[#FAF6F1] p-2.5 border border-[#E5E1DC] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#C1663B] shrink-0 stroke-[1.5]" />
          <span className="text-[11px] leading-tight font-bold">100% Secure Checkout</span>
        </div>

        <div className="bg-[#FAF6F1] p-2.5 border border-[#E5E1DC] flex items-center gap-2">
          <Banknote className="w-4 h-4 text-[#C1663B] shrink-0 stroke-[1.5]" />
          <span className="text-[11px] leading-tight font-bold">Cash on Delivery Only</span>
        </div>

        <div className="bg-[#FAF6F1] p-2.5 border border-[#E5E1DC] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C1663B] shrink-0 stroke-[1.5]" />
          <span className="text-[11px] leading-tight font-bold">1-Year Quality Warranty</span>
        </div>

        <div className="bg-[#FAF6F1] p-2.5 border border-[#E5E1DC] flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#C1663B] shrink-0 stroke-[1.5]" />
          <span className="text-[11px] leading-tight font-bold">Easy 7-Day Returns</span>
        </div>
      </div>

      {/* 1-Line Shipping Estimate */}
      <div className="bg-[#FAF6F1] p-3 border border-[#E5E1DC] flex items-center gap-2.5 text-xs text-[#6E675F]">
        <Truck className="w-4 h-4 text-[#C1663B] shrink-0 stroke-[1.5]" />
        <span>
          <strong className="text-[#1F1B18] font-bold">Fast UAE Shipping:</strong> Delivered within 1–3 business days across all 7 Emirates.
        </span>
      </div>
    </div>
  );
}
