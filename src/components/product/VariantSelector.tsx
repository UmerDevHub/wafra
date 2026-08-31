"use client";

import React from "react";

interface Variant {
  name: string;
  hex: string;
  image?: string;
  price?: string;
}

interface VariantSelectorProps {
  variants?: Variant[];
  selectedIndex: number;
  onSelectVariant: (index: number) => void;
}

export default function VariantSelector({
  variants,
  selectedIndex,
  onSelectVariant,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  const currentVariant = variants[selectedIndex] || variants[0];

  return (
    <div className="space-y-2.5 py-2">
      {/* Label and Selected Variant Name */}
      <div className="flex items-center justify-between text-xs font-semibold text-ink">
        <div className="flex items-center gap-1.5">
          <span className="text-body/70">Color / Option:</span>
          <span className="font-bold text-ink">{currentVariant.name}</span>
        </div>
        {currentVariant.price && (
          <span className="text-terracotta font-bold">{currentVariant.price}</span>
        )}
      </div>

      {/* Swatch Circle Buttons */}
      <div className="flex items-center gap-3">
        {variants.map((variant, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectVariant(idx)}
              title={variant.name}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 flex items-center justify-center relative ${
                isSelected
                  ? "ring-2 ring-terracotta ring-offset-2 scale-110 border-transparent shadow-xs"
                  : "border border-[#D0C5B8] hover:scale-105 opacity-85 hover:opacity-100"
              }`}
              style={{ backgroundColor: variant.hex }}
              aria-label={`Select variant ${variant.name}`}
            >
              {/* Inner subtle outline for white/light swatches */}
              {variant.hex.toUpperCase() === "#FFFFFF" && (
                <span className="absolute inset-0 rounded-full border border-black/10" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
