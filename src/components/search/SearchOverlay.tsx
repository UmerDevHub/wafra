"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, TrendingUp, History, ArrowRight, Sparkles } from "lucide-react";
import { bestSellersData, trendingProductsData, categoriesData } from "@/lib/data";
import { Product, Category } from "@/lib/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Trending search suggestions
  const trendingSearches = [
    "Neck Fan",
    "Ice Roller",
    "Gifting Set",
    "Aroma Diffuser",
    "LED Makeup Mirror",
    "Sunset Lamp",
  ];

  // Combine and deduplicate all products for search catalog
  const allProducts: Product[] = Array.from(
    new Map(
      [...bestSellersData, ...trendingProductsData].map((p) => [p.id, p])
    ).values()
  );

  // Load recent searches from localStorage on mount / open
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("wafra_recent_searches");
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch {
          setRecentSearches([]);
        }
      }
      // Focus search input after animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
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

  // Prevent background body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Save query to recent searches
  const saveRecentSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    const updated = [
      trimmed,
      ...recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase()),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("wafra_recent_searches", JSON.stringify(updated));
  };

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("wafra_recent_searches");
  };

  if (!isOpen) return null;

  // Filter products and categories client-side (max 5 each)
  const filteredProducts = query.trim()
    ? allProducts
        .filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const filteredCategories: Category[] = query.trim()
    ? categoriesData
        .filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const hasResults = filteredProducts.length > 0 || filteredCategories.length > 0;
  const isSearching = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Container */}
      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-10">
        <div className="relative w-full max-w-3xl bg-sand rounded-2xl shadow-2xl border border-[#EFEAE3] overflow-hidden animate-fadeIn transition-all duration-200 mt-6 sm:mt-12">
          {/* Top Search Input Bar */}
          <div className="relative bg-white border-b border-[#EFEAE3] px-5 py-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-terracotta flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  saveRecentSearch(query);
                }
              }}
              placeholder="Search products, self-care, diffusers, gifts..."
              className="w-full bg-transparent text-ink text-base sm:text-lg placeholder:text-body/50 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-body hover:text-ink hover:bg-sand transition"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="ml-2 px-3 py-1.5 rounded-full bg-sand hover:bg-beige text-xs font-semibold text-body hover:text-ink transition flex items-center gap-1.5"
            >
              <span>ESC</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* EMPTY STATE: Trending + Recent Searches */}
            {!isSearching && (
              <div className="space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-body flex items-center gap-1.5">
                        <History className="w-3.5 h-3.5 text-terracotta" />
                        Recent Searches
                      </h4>
                      <button
                        onClick={handleClearRecent}
                        className="text-xs text-terracotta hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectSearch(term)}
                          className="bg-white hover:bg-beige text-ink text-xs font-medium px-3.5 py-1.5 rounded-full border border-[#EFEAE3] hover:border-terracotta transition shadow-2xs"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Searches */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-body flex items-center gap-1.5 mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-terracotta" />
                    Trending Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectSearch(term)}
                        className="bg-white hover:bg-terracotta hover:text-white text-ink text-xs font-medium px-4 py-2 rounded-full border border-[#EFEAE3] hover:border-terracotta transition shadow-2xs flex items-center gap-1.5 group"
                      >
                        <span>{term}</span>
                        <ArrowRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Category Navigation */}
                <div className="pt-2 border-t border-[#EFEAE3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-body mb-3">
                    Browse Popular Collections
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {categoriesData.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="bg-white rounded-xl p-3 border border-[#EFEAE3] hover:border-terracotta hover:shadow-sm transition flex items-center gap-2.5 group"
                      >
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-sand">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold text-ink group-hover:text-terracotta truncate transition">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SEARCHING WITH RESULTS */}
            {isSearching && hasResults && (
              <div className="space-y-6">
                {/* Products Result Group */}
                {filteredProducts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-body mb-3 flex items-center justify-between">
                      <span>Products ({filteredProducts.length})</span>
                      <span className="text-[11px] font-normal lowercase text-body/70">
                        press enter for all
                      </span>
                    </h4>
                    <div className="divide-y divide-[#EFEAE3] bg-white rounded-xl border border-[#EFEAE3] overflow-hidden">
                      {filteredProducts.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/products/${prod.slug || prod.id}`}
                          onClick={() => {
                            saveRecentSearch(prod.name);
                            onClose();
                          }}
                          className="p-3.5 flex items-center justify-between hover:bg-sand/60 transition group"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-sand border border-[#EFEAE3] flex-shrink-0">
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-ink group-hover:text-terracotta transition">
                                {prod.name}
                              </h5>
                              <div className="flex items-baseline gap-2 mt-0.5">
                                <span className="text-xs font-bold text-terracotta">
                                  {prod.price}
                                </span>
                                <span className="text-[11px] text-body/60 line-through">
                                  {prod.wasPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-terracotta group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            View <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Result Group */}
                {filteredCategories.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-body mb-3">
                      Categories ({filteredCategories.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          onClick={() => {
                            saveRecentSearch(cat.name);
                            onClose();
                          }}
                          className="bg-white p-3 rounded-xl border border-[#EFEAE3] hover:border-terracotta hover:shadow-xs transition flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-ink group-hover:text-terracotta transition">
                              {cat.name}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-body/50 group-hover:text-terracotta group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEARCHING WITH NO RESULTS */}
            {isSearching && !hasResults && (
              <div className="text-center py-10 space-y-3">
                <div className="inline-flex p-3 bg-beige rounded-full text-terracotta">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-ink font-bold">
                  No results found for "{query}"
                </h4>
                <p className="text-xs sm:text-sm text-body max-w-sm mx-auto">
                  Try checking your spelling or explore popular categories like{" "}
                  <button
                    onClick={() => handleSelectSearch("Neck Fan")}
                    className="text-terracotta underline font-semibold"
                  >
                    Neck Fan
                  </button>{" "}
                  or{" "}
                  <button
                    onClick={() => handleSelectSearch("Ice Roller")}
                    className="text-terracotta underline font-semibold"
                  >
                    Ice Roller
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
