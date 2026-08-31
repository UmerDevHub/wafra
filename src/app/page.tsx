import React from "react";
import Hero from "@/components/home/Hero";
import ShopByCategory from "@/components/home/ShopByCategory";
import BestSellers from "@/components/home/BestSellers";
import TrendingStrip from "@/components/home/TrendingStrip";
import BundleOffers from "@/components/home/BundleOffers";
import TrustRow from "@/components/home/TrustRow";
import Reviews from "@/components/home/Reviews";
import FAQ from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { homepageProductsSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      {/* Product List JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageProductsSchema),
        }}
      />

      {/* Section 1: Hero Banner (Always visible at top) */}
      <Hero />

      {/* Section 2: Shop by Category */}
      <RevealOnScroll>
        <ShopByCategory />
      </RevealOnScroll>

      {/* Section 3: Best Sellers */}
      <RevealOnScroll>
        <BestSellers />
      </RevealOnScroll>

      {/* Section 4: Trending Strip */}
      <RevealOnScroll>
        <TrendingStrip />
      </RevealOnScroll>

      {/* Section 5: Save More With Bundles */}
      <RevealOnScroll>
        <BundleOffers />
      </RevealOnScroll>

      {/* Section 6: Trust & Benefits Row */}
      <RevealOnScroll>
        <TrustRow />
      </RevealOnScroll>

      {/* Section 7: Customer Reviews */}
      <RevealOnScroll>
        <Reviews />
      </RevealOnScroll>

      {/* Section 7.5: Recently Viewed Products */}
      <RevealOnScroll>
        <RecentlyViewed />
      </RevealOnScroll>

      {/* Section 8: Frequently Asked Questions */}
      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>

      {/* Section 9: Final CTA / Newsletter */}
      <RevealOnScroll>
        <Newsletter />
      </RevealOnScroll>
    </>
  );
}
