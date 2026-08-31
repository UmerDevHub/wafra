"use client";

import React, { useState } from "react";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";

export interface FilterState {
  priceRange: "all" | "under100" | "100to200" | "over200";
  inStockOnly: boolean;
  selectedCategories: string[];
}

interface FilterSidebarProps {
  filterState: FilterState;
  onChange: (newState: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function FilterSidebar({
  filterState,
  onChange,
  onReset,
  totalResultsCount,
  isOpenMobile = false,
  onCloseMobile,
}: FilterSidebarProps) {
  // Active filter count logic
  const activeCount =
    (filterState.priceRange !== "all" ? 1 : 0) +
    (filterState.inStockOnly ? 1 : 0) +
    filterState.selectedCategories.length;

  const handlePriceChange = (value: FilterState["priceRange"]) => {
    onChange({ ...filterState, priceRange: value });
  };

  const handleToggleStock = () => {
    onChange({ ...filterState, inStockOnly: !filterState.inStockOnly });
  };

  const handleCategoryToggle = (categorySlug: string) => {
    const exists = filterState.selectedCategories.includes(categorySlug);
    const updated = exists
      ? filterState.selectedCategories.filter((c) => c !== categorySlug)
      : [...filterState.selectedCategories, categorySlug];
    onChange({ ...filterState, selectedCategories: updated });
  };

  const categoriesOptions = [
    { name: "Self-Care & Beauty", slug: "self-care" },
    { name: "Home Ambience", slug: "home-ambience" },
    { name: "Everyday Comfort", slug: "everyday-comfort" },
    { name: "Gifting", slug: "gifting" },
  ];

  const filterContent = (
    <div className="space-y-6 text-xs text-[#1F1B18]">
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-3">
        <h3 className="font-sans font-bold text-sm text-[#1F1B18] flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
          Filter Products
        </h3>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-[#C1663B] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 stroke-[1.5]" />
            Reset All
          </button>
        )}
      </div>

      {/* 1. Price Range Filters */}
      <div className="space-y-2.5">
        <h4 className="font-bold uppercase tracking-wider text-[#6E675F] text-[11px]">
          Price Range
        </h4>
        <div className="flex flex-col space-y-1.5">
          {[
            { id: "all", label: "All Prices" },
            { id: "under100", label: "Under AED 100" },
            { id: "100to200", label: "AED 100 – AED 200" },
            { id: "over200", label: "AED 200+" },
          ].map((option) => (
            <label
              key={option.id}
              className={`flex items-center justify-between p-2 border transition cursor-pointer select-none ${
                filterState.priceRange === option.id
                  ? "bg-[#FAF6F1] border-[#C1663B] text-[#C1663B] font-bold"
                  : "bg-white border-[#E5E1DC] text-[#1F1B18] hover:border-[#C1663B]"
              }`}
            >
              <span>{option.label}</span>
              <input
                type="radio"
                name="priceRange"
                checked={filterState.priceRange === option.id}
                onChange={() => handlePriceChange(option.id as any)}
                className="sr-only"
              />
              {filterState.priceRange === option.id && (
                <Check className="w-3.5 h-3.5 text-[#C1663B] stroke-[2]" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 2. Availability Filter (In Stock Only) */}
      <div className="space-y-2.5 pt-2 border-t border-[#EFEAE3]">
        <h4 className="font-bold uppercase tracking-wider text-[#6E675F] text-[11px]">
          Availability
        </h4>
        <button
          type="button"
          onClick={handleToggleStock}
          className="flex items-center justify-between w-full p-2.5 border border-[#E5E1DC] bg-white hover:border-[#C1663B] transition select-none cursor-pointer"
        >
          <span className="font-bold text-[#1F1B18]">In Stock Only</span>
          <div
            className={`w-8 h-4 p-0.5 transition-colors ${
              filterState.inStockOnly ? "bg-[#C1663B]" : "bg-[#D0C5B8]"
            }`}
          >
            <div
              className={`w-3 h-3 bg-white transition-transform ${
                filterState.inStockOnly ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* 3. Category Filter Checkboxes */}
      <div className="space-y-2.5 pt-2 border-t border-[#EFEAE3]">
        <h4 className="font-bold uppercase tracking-wider text-[#6E675F] text-[11px]">
          Category
        </h4>
        <div className="space-y-2">
          {categoriesOptions.map((cat) => {
            const isChecked = filterState.selectedCategories.includes(cat.slug);
            return (
              <label
                key={cat.slug}
                className="flex items-center gap-2.5 cursor-pointer text-[#1F1B18] hover:text-[#C1663B] transition select-none"
              >
                <div
                  className={`w-4 h-4 border flex items-center justify-center transition ${
                    isChecked
                      ? "bg-[#C1663B] border-[#C1663B] text-white"
                      : "border-[#E5E1DC] bg-white"
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[2]" />}
                </div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(cat.slug)}
                  className="sr-only"
                />
                <span className={`font-medium ${isChecked ? "font-bold text-[#C1663B]" : ""}`}>
                  {cat.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Left-Side Panel (Hidden on Mobile) */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white p-5 border border-[#E5E1DC] shadow-none self-start">
        {filterContent}
      </aside>

      {/* Mobile Filter Drawer Modal */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-[#1F1B18]/60 backdrop-blur-xs cursor-pointer"
          />
          <div className="relative min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-md bg-white border border-[#E5E1DC] shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-slideUp">
              <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-3">
                <h3 className="font-serif text-lg font-bold text-[#1F1B18]">
                  Filter ({totalResultsCount} Items)
                </h3>
                <button
                  onClick={onCloseMobile}
                  className="p-1 text-[#6E675F] hover:text-[#1F1B18] cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {filterContent}

              <div className="pt-4 border-t border-[#EFEAE3]">
                <button
                  onClick={onCloseMobile}
                  className="w-full bg-[#C1663B] hover:bg-[#A8552E] text-white py-3 font-bold text-xs uppercase tracking-wider border border-[#C1663B] shadow-xs cursor-pointer btn-tactile"
                >
                  Apply Filters ({totalResultsCount} Items)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
