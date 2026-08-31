"use client";

import React from "react";
import Image from "next/image";
import { Bundle } from "@/lib/types";
import PillButton from "./PillButton";

interface BundleCardProps {
  bundle: Bundle;
  variant?: "default" | "gold";
  priority?: boolean;
  onShopBundle?: (bundle: Bundle) => void;
}

export default function BundleCard({
  bundle,
  variant = "default",
  priority = false,
  onShopBundle,
}: BundleCardProps) {
  const isGold = variant === "gold" || bundle.variant === "gold";

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between relative transition-all ${
        isGold
          ? "border-2 border-gold shadow-md ring-1 ring-gold/30"
          : "border border-[#EFEAE3]"
      }`}
    >
      <div>
        {/* Bundle Flat-lay Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-sand mb-4">
          <Image
            src={bundle.image}
            alt={bundle.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover object-center"
          />
        </div>

        {/* Bundle Name */}
        <h4 className="font-sans font-bold text-lg text-ink text-center mb-2">
          {bundle.name}
        </h4>

        {/* Save Badge */}
        <div className="flex justify-center mb-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              isGold
                ? "bg-gold text-white"
                : "bg-sage text-white"
            }`}
          >
            {bundle.saveAmount}
          </span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-center gap-2 mb-5">
          <span className="text-xs text-body/60 line-through">
            {bundle.originalPrice}
          </span>
          <span className="text-lg font-bold text-terracotta">
            {bundle.bundlePrice}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <PillButton
        variant={isGold ? "goldOutline" : "outline"}
        fullWidth
        onClick={() => onShopBundle?.(bundle)}
      >
        Shop Bundle
      </PillButton>
    </div>
  );
}
