"use client";

import React, { use, useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { categoriesConfig, allProductsData } from "@/lib/data";
import CollectionGrid from "@/components/collection/CollectionGrid";
import FilterSidebar, { FilterState } from "@/components/collection/FilterSidebar";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams?: Promise<{ sub?: string; sort?: string; priceRange?: string; inStock?: string }>;
}

function CategoryCollectionContent({
  params,
  searchParams: searchParamsPromise,
}: PageProps) {
  const resolvedParams = use(params);
  const rawSearchParams = searchParamsPromise ? use(searchParamsPromise) : {};
  const activeSubSlug = rawSearchParams.sub;

  const categoryConfig = categoriesConfig.find(
    (c) => c.slug === resolvedParams.category
  );

  if (!categoryConfig) {
    notFound();
  }

  const router = useRouter();
  const searchParamsObj = useSearchParams();

  // Read initial params from URL
  const initialSort = (searchParamsObj.get("sort") as any) || "featured";
  const initialPriceRange = (searchParamsObj.get("priceRange") as any) || "all";
  const initialInStock = searchParamsObj.get("inStock") === "true";

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">(initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    priceRange: initialPriceRange,
    inStockOnly: initialInStock,
    selectedCategories: [],
  });

  // Sync state to URL params when filters or sort change
  useEffect(() => {
    const p = new URLSearchParams();

    if (activeSubSlug) p.set("sub", activeSubSlug);
    if (sortBy !== "featured") p.set("sort", sortBy);
    if (filterState.priceRange !== "all") p.set("priceRange", filterState.priceRange);
    if (filterState.inStockOnly) p.set("inStock", "true");

    const queryString = p.toString();
    const newUrl = queryString
      ? `/collections/${categoryConfig.slug}?${queryString}`
      : `/collections/${categoryConfig.slug}`;

    router.replace(newUrl, { scroll: false });
  }, [activeSubSlug, sortBy, filterState, categoryConfig.slug, router]);

  const handleResetFilters = () => {
    setFilterState({
      priceRange: "all",
      inStockOnly: false,
      selectedCategories: [],
    });
    setSortBy("featured");
    router.replace(`/collections/${categoryConfig.slug}`, { scroll: false });
  };

  // Active subcategory object if sub query param present
  const activeSubcategory = useMemo(() => {
    if (!activeSubSlug) return null;
    return categoryConfig.subcategories.find((s) => s.slug === activeSubSlug);
  }, [activeSubSlug, categoryConfig]);

  // Filter products for this category, subcategory, and filter sidebar
  const filteredAndSortedProducts = useMemo(() => {
    let result = allProductsData.filter((p) => {
      const matchCategory =
        p.category === categoryConfig.slug ||
        p.categorySlug === categoryConfig.slug;

      if (!matchCategory) return false;

      if (activeSubSlug) {
        return p.subcategory === activeSubSlug;
      }
      return true;
    });

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
  }, [categoryConfig.slug, activeSubSlug, filterState, sortBy]);

  const handleClearSubFilter = () => {
    router.replace(`/collections/${categoryConfig.slug}`, { scroll: false });
  };

  // Breadcrumbs JSON-LD Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://wafra.ae" },
    { name: "Collections", url: "https://wafra.ae/shop-all" },
    {
      name: activeSubcategory
        ? `${categoryConfig.name} - ${activeSubcategory.name}`
        : categoryConfig.name,
      url: `https://wafra.ae/collections/${categoryConfig.slug}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-[#FAF6F1] text-[#1F1B18] font-sans pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: "Collections", href: "/shop-all" },
              {
                label: activeSubcategory
                  ? `${categoryConfig.name} → ${activeSubcategory.name}`
                  : categoryConfig.name,
              },
            ]}
          />

          {/* Clean Category Hero Banner */}
          <div className="relative w-full h-[220px] sm:h-[260px] border border-[#E5E1DC] overflow-hidden select-none bg-[#1F1B18]">
            <Image
              src={categoryConfig.heroImage}
              alt={categoryConfig.name}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center opacity-75"
            />
            {/* Dark Warm Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F1B18]/90 via-[#1F1B18]/60 to-transparent" />

            {/* Banner Text Content */}
            <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 max-w-xl text-white space-y-2">
              <span className="text-[#C9A24B] text-xs font-bold tracking-[0.2em] uppercase">
                {activeSubcategory
                  ? `${categoryConfig.name} Collection`
                  : "Curated UAE Collection"}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                {activeSubcategory ? activeSubcategory.name : categoryConfig.name}
              </h1>

              <p className="text-white/85 text-xs sm:text-sm font-light max-w-md line-clamp-2">
                {categoryConfig.description}
              </p>
            </div>
          </div>

          {/* Subcategory Pills Row & Filter Bar */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Link
                href={`/collections/${categoryConfig.slug}`}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer btn-tactile ${
                  !activeSubSlug
                    ? "bg-[#C1663B] text-white border-[#C1663B]"
                    : "bg-white text-[#1F1B18] border-[#E5E1DC] hover:border-[#C1663B]"
                }`}
              >
                All {categoryConfig.name}
              </Link>

              {categoryConfig.subcategories.map((sub) => {
                const isSelected = activeSubSlug === sub.slug;
                return (
                  <Link
                    key={sub.slug}
                    href={`/collections/${categoryConfig.slug}?sub=${sub.slug}`}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border cursor-pointer btn-tactile ${
                      isSelected
                        ? "bg-[#C1663B] text-white border-[#C1663B]"
                        : "bg-white text-[#1F1B18] border-[#E5E1DC] hover:border-[#C1663B]"
                    }`}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </div>

            {/* Active Filter Chip Bar */}
            {activeSubcategory && (
              <div className="flex items-center justify-between bg-white p-3.5 border border-[#E5E1DC] text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#6E675F] font-medium">Active Subcategory Filter:</span>
                  <button
                    onClick={handleClearSubFilter}
                    className="bg-[#FAF6F1] hover:bg-[#FAF6F1] text-[#C1663B] font-bold px-3 py-1 flex items-center gap-1.5 border border-[#E5E1DC] transition cursor-pointer"
                  >
                    <span>{activeSubcategory.name}</span>
                    <X className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>

                <button
                  onClick={handleClearSubFilter}
                  className="text-[#6E675F] hover:text-[#C1663B] underline font-bold cursor-pointer"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Toolbar & Sort Control (Clean Non-Overlapping Layout) */}
            <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-3 text-xs font-bold text-[#1F1B18] gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {/* Single Clean Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden bg-white border border-[#E5E1DC] text-[#1F1B18] px-3 py-1.5 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:border-[#C1663B] transition cursor-pointer btn-tactile shrink-0"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5]" />
                  <span>Filters</span>
                </button>

                <span className="text-[11px] sm:text-xs font-bold text-[#1F1B18] whitespace-nowrap truncate">
                  Showing {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                <label htmlFor="cat-sort-dropdown" className="text-xs font-bold uppercase tracking-wider text-[#6E675F] hidden md:inline whitespace-nowrap">
                  Sort:
                </label>
                <div className="relative">
                  <select
                    id="cat-sort-dropdown"
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
          </div>

          {/* Desktop Sidebar + Full-Width Mobile Collection Grid Layout */}
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
                onResetFilters={activeSubSlug || filterState.priceRange !== "all" || filterState.inStockOnly ? handleResetFilters : undefined}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CategoryCollectionPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF6F1] p-10 animate-pulse">Loading...</div>}>
      <CategoryCollectionContent {...props} />
    </Suspense>
  );
}
