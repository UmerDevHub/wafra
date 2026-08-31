"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { Sparkles, Tag, Percent } from "lucide-react";
import { bundlesData, allProductsData } from "@/lib/data";
import BundleCard from "@/components/ui/BundleCard";
import CollectionGrid from "@/components/collection/CollectionGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function BundlesAndOffersPage() {
  // Discounted products with genuine price drops
  const dealProducts = useMemo(() => {
    return allProductsData.filter(
      (p) => p.wasPrice && p.wasPrice !== p.price
    );
  }, []);

  return (
    <main className="min-h-screen bg-sand pb-20">
      {/* Top Banner Header */}
      <div className="bg-white border-b border-[#EFEAE3] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "Bundles & Special Offers" }]} />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta bg-terracotta/10 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 fill-terracotta/20" />
                <span>Save Up To 35% Off Combo Bundles</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
                Bundles & Special Offers
              </h1>
              <p className="text-xs sm:text-sm text-body mt-1 max-w-xl">
                Curated daily lifestyle sets and exclusive discount offers with fast Cash on Delivery across all 7 UAE Emirates.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink bg-sand px-3 py-2 rounded-xl border border-[#E8DACB]">
                🎁 {bundlesData.length} Bundles
              </span>
              <span className="text-xs font-bold text-terracotta bg-[#FDF0EB] px-3 py-2 rounded-xl border border-[#F5D5C8]">
                🔥 {dealProducts.length} Flash Deals
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Section 1: Curated Bundle Sets */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 border-b border-[#EFEAE3] pb-4">
            <Tag className="w-5 h-5 text-terracotta" />
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Curated Bundle Sets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {bundlesData.map((bundle, index) => (
              <BundleCard key={bundle.id} bundle={bundle} priority={index < 2} />
            ))}
          </div>
        </section>

        {/* Section 2: Current Individual Deals */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center gap-2.5 border-b border-[#EFEAE3] pb-4">
            <Percent className="w-5 h-5 text-terracotta" />
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Current Limited Deals
            </h2>
          </div>

          <CollectionGrid products={dealProducts} />
        </section>
      </div>
    </main>
  );
}
