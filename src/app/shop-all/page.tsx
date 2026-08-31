"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { allProductsData } from "@/lib/data";
import CollectionGrid from "@/components/collection/CollectionGrid";
import FilterSidebar, { FilterState } from "@/components/collection/FilterSidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/schema";

function ShopAllContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial params from URL on load
  const initialSort = (searchParams.get("sort") as any) || "featured";
  const initialPriceRange = (searchParams.get("priceRange") as any) || "all";
  const initialInStock = searchParams.get("inStock") === "true";
  const initialCategories = searchParams.get("cat") ? searchParams.get("cat")!.split(",") : [];

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    priceRange: initialPriceRange,
    inStockOnly: initialInStock,
    selectedCategories: initialCategories,
  });

  // Sync state to URL params when user changes filters or sort
  useEffect(() => {
    const params = new URLSearchParams();

    if (sortBy !== "featured") params.set("sort", sortBy);
    if (filterState.priceRange !== "all") params.set("priceRange", filterState.priceRange);
    if (filterState.inStockOnly) params.set("inStock", "true");
    if (filterState.selectedCategories.length > 0) params.set("cat", filterState.selectedCategories.join(","));

    const queryString = params.toString();
    const newUrl = queryString ? `/shop-all?${queryString}` : "/shop-all";
    router.replace(newUrl, { scroll: false });
  }, [sortBy, filterState, router]);

  const handleResetFilters = () => {
    setFilterState({
      priceRange: "all",
      inStockOnly: false,
      selectedCategories: [],
    });
    setSortBy("featured");
    router.replace("/shop-all", { scroll: false });
  };

  // Filter and sort products client-side
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProductsData];

    // Filter by category
    if (filterState.selectedCategories.length > 0) {
      result = result.filter(
        (p) =>
          (p.category && filterState.selectedCategories.includes(p.category)) ||
          (p.categorySlug && filterState.selectedCategories.includes(p.categorySlug))
      );
    }

    // Filter by stock
    if (filterState.inStockOnly) {
      result = result.filter((p) => p.stockCount === undefined || p.stockCount > 0);
    }

    // Filter by price range
    if (filterState.priceRange === "under100") {
      result = result.filter((p) => (p.priceNumber || 89) < 100);
    } else if (filterState.priceRange === "100to200") {
      result = result.filter(
        (p) => (p.priceNumber || 89) >= 100 && (p.priceNumber || 89) <= 200
      );
    } else if (filterState.priceRange === "over200") {
      result = result.filter((p) => (p.priceNumber || 89) > 200);
    }

    // Sort products
    if (sortBy === "price-asc") {
      return result.sort((a, b) => (a.priceNumber || 89) - (b.priceNumber || 89));
    }
    if (sortBy === "price-desc") {
      return result.sort((a, b) => (b.priceNumber || 89) - (a.priceNumber || 89));
    }
    if (sortBy === "rating") {
      return result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filterState, sortBy]);

  // Breadcrumbs JSON-LD Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://wafra.ae" },
    { name: "Shop All", url: "https://wafra.ae/shop-all" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-[#FAF6F1] text-[#1F1B18] font-sans pb-24">
        {/* Top Header Banner */}
        <div className="bg-white border-b border-[#E5E1DC] py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <Breadcrumbs items={[{ label: "Shop All" }]} />

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1B18] font-bold tracking-tight">
                  Shop All Essentials
                </h1>
                <p className="text-xs sm:text-sm text-[#6E675F] mt-1 max-w-xl">
                  Discover our complete collection of self-care tools, ambient lighting, diffusers, and everyday comfort products designed for modern UAE living.
                </p>
              </div>

              <span className="text-xs font-bold text-[#C1663B] bg-[#FDF0EB] border border-[#F5D5C6] px-3 py-1.5 shrink-0 w-max uppercase tracking-wider">
                {allProductsData.length} Products Available
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">
          {/* Toolbar & Sort Control (Clean Non-Overlapping Mobile Layout) */}
          <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-3 text-xs font-bold text-[#1F1B18] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {/* Single Clean Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden bg-white border border-[#E5E1DC] text-[#1F1B18] px-3 py-1.5 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:border-[#C1663B] transition cursor-pointer btn-tactile shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5]" />
                <span>Filters</span>
              </button>

              <span className="text-[11px] sm:text-xs font-bold text-[#1F1B18] whitespace-nowrap truncate">
                Showing {filteredAndSortedProducts.length} item{filteredAndSortedProducts.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <label htmlFor="sort-dropdown" className="text-xs font-bold uppercase tracking-wider text-[#6E675F] hidden md:inline whitespace-nowrap">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#E5E1DC] text-[#1F1B18] text-[11px] sm:text-xs font-bold py-1.5 pl-2.5 pr-7 focus:outline-none focus:border-[#C1663B] cursor-pointer appearance-none uppercase tracking-wider max-w-[135px] sm:max-w-none truncate"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low-High</option>
                  <option value="price-desc">Price: High-Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ArrowUpDown className="w-3 h-3 text-[#6E675F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
              </div>
            </div>
          </div>

          {/* Desktop Sidebar + Full-Width Mobile Grid Layout */}
          <div className="flex items-start gap-8">
            <FilterSidebar
              filterState={filterState}
              onChange={setFilterState}
              onReset={handleResetFilters}
              totalResultsCount={filteredAndSortedProducts.length}
              isOpenMobile={isMobileFilterOpen}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />

            <div className="w-full lg:flex-1 min-w-0">
              <CollectionGrid
                products={filteredAndSortedProducts}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6F1] p-10 animate-pulse">Loading...</div>}>
      <ShopAllContent />
    </Suspense>
  );
}
