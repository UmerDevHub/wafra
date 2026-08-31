"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Heart,
  Share2,
  Check,
  Zap,
} from "lucide-react";
import { getProductBySlug, LAUNCH_OFFER_END_DATE } from "@/lib/data";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";
import { generateProductSchema } from "@/lib/schema";
import ProductGallery from "@/components/product/ProductGallery";
import VariantSelector from "@/components/product/VariantSelector";
import AddToCartBox from "@/components/product/AddToCartBox";
import BundleUpsellWidget from "@/components/product/BundleUpsellWidget";
import ProductTrustBlock from "@/components/product/ProductTrustBlock";
import ProductTabs from "@/components/product/ProductTabs";
import ProductReviews from "@/components/product/ProductReviews";
import ProductFAQ from "@/components/product/ProductFAQ";
import RelatedProducts from "@/components/product/RelatedProducts";
import CrossSellSection from "@/components/product/CrossSellSection";
import RecentlyViewed from "@/components/home/RecentlyViewed";
import StickyMobileATC from "@/components/product/StickyMobileATC";
import LiveViewersIndicator from "@/components/product/LiveViewersIndicator";
import StarRating from "@/components/ui/StarRating";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addProductToRecentlyViewed } = useRecentlyViewed();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    if (product) {
      addProductToRecentlyViewed(product.id);
    }
  }, [product, addProductToRecentlyViewed]);

  const isFavorite = isInWishlist(product.id);
  const activeVariant = product.variants?.[selectedVariantIndex];
  const activeVariantImage = activeVariant?.image;
  const activePrice = activeVariant?.price || product.price;

  const formattedEndDate = LAUNCH_OFFER_END_DATE.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description || `Check out ${product.name} on Wafra UAE!`,
      url: typeof window !== "undefined" ? window.location.href : "https://wafra.ae",
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyLinkToClipboard();
      }
    } else {
      copyLinkToClipboard();
    }
  };

  const copyLinkToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2200);
    }
  };

  const productSchema = generateProductSchema(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <main className="min-h-screen bg-[#FAF6F1] text-[#1F1B18] font-sans pb-24 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-xs text-[#6E675F]">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#C1663B] transition">
                  Home
                </Link>
              </li>
              <li className="text-[#6E675F]/40">/</li>
              {product.categorySlug && (
                <>
                  <li>
                    <Link
                      href={`/collections/${product.categorySlug}`}
                      className="hover:text-[#C1663B] transition"
                    >
                      {product.categoryName || "Products"}
                    </Link>
                  </li>
                  <li className="text-[#6E675F]/40">/</li>
                </>
              )}
              <li className="font-bold text-[#1F1B18] truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* 2-Column Desktop Grid / Stacked Mobile Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Image & Video Gallery (~55% width / col-span-7) */}
            <div className="lg:col-span-7 w-full space-y-6">
              <ProductGallery
                images={product.images || [product.image]}
                productName={product.name}
                videoUrl={product.videoUrl}
                activeVariantImage={activeVariantImage}
              />
            </div>

            {/* Right Column: High-Converting Buy Box (~45% width / col-span-5) */}
            <div className="lg:col-span-5 w-full lg:sticky lg:top-24 self-start bg-white p-5 sm:p-7 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-4">
              {/* Header Row with Category Tag, Wishlist, & Share Actions */}
              <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1663B] bg-[#FDF0EB] border border-[#F5D5C6] px-3 py-1">
                  {product.categoryName || "UAE Essential"}
                </span>

                <div className="flex items-center gap-2 relative">
                  <button
                    onClick={handleShare}
                    className="p-2 border bg-[#FAF6F1] border-[#E5E1DC] text-[#6E675F] hover:text-[#C1663B] transition cursor-pointer"
                    aria-label="Share product link"
                    title="Share product link"
                  >
                    <Share2 className="w-4 h-4 stroke-[1.5]" />
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2 border transition cursor-pointer ${
                      isFavorite
                        ? "bg-[#FAF6F1] border-[#C1663B] text-[#C1663B]"
                        : "bg-[#FAF6F1] border-[#E5E1DC] text-[#6E675F] hover:text-[#C1663B]"
                    }`}
                    aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.5] ${
                        isFavorite ? "fill-[#C1663B] text-[#C1663B]" : ""
                      }`}
                    />
                  </button>

                  {shareToast && (
                    <div className="absolute right-0 top-11 bg-[#1F1B18] text-white text-[11px] font-bold px-3 py-1.5 shadow-lg whitespace-nowrap animate-fadeIn z-30 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2]" />
                      <span>Link copied to clipboard!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Title & Rating */}
              <div className="space-y-1.5">
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1B18] leading-tight tracking-tight">
                  {product.name}
                </h1>

                <a
                  href="#reviews-section"
                  className="inline-flex items-center gap-2 text-xs text-[#6E675F] hover:text-[#C1663B] transition cursor-pointer"
                >
                  <StarRating rating={product.rating} size="sm" />
                  <span className="font-bold text-[#1F1B18] underline decoration-[#C1663B]/40">
                    4.9 (Verified UAE Buyer Reviews)
                  </span>
                </a>

                {/* Glowing Live Viewers Indicator */}
                <div className="pt-0.5">
                  <LiveViewersIndicator productId={product.id} />
                </div>
              </div>

              {/* Price Row & Launch Discount */}
              <div className="space-y-1.5 bg-[#FAF6F1] p-3.5 border border-[#E5E1DC]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#C1663B]">
                    {activePrice}
                  </span>

                  <span className="text-sm text-[#6E675F] line-through font-medium">
                    {product.wasPrice}
                  </span>

                  <span className="text-xs font-bold text-[#C1663B] bg-[#FDF0EB] border border-[#F5D5C6] px-2.5 py-0.5 uppercase tracking-wider">
                    31% OFF
                  </span>
                </div>

                <div className="text-[11px] font-bold text-[#C1663B] flex items-center gap-1.5 pt-0.5">
                  <Zap className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5]" />
                  <span>Launch offer guaranteed through {formattedEndDate}</span>
                </div>
              </div>

              {/* Variant Selector (Colors / Options) */}
              {product.variants && product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants}
                  selectedIndex={selectedVariantIndex}
                  onSelectVariant={setSelectedVariantIndex}
                />
              )}

              {/* IMMEDIATE ADD TO CART BOX (Zero-Scroll Mobile Access) */}
              <AddToCartBox
                product={product}
                selectedVariantIndex={selectedVariantIndex}
                activePrice={activePrice}
              />

              {/* Honest Low Stock Urgency & Trust Badges */}
              <ProductTrustBlock stockCount={product.stockCount} />

              {/* "Complete the Set" Bundle Upsell Widget */}
              <BundleUpsellWidget product={product} />

              {/* 4-Bullet Key Benefits List */}
              {product.benefits && product.benefits.length > 0 && (
                <div className="space-y-2 py-2 border-t border-b border-[#EFEAE3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F1B18]">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#6E675F] font-medium">
                    {product.benefits.slice(0, 4).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C1663B] shrink-0 mt-0.5 stroke-[1.5]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Description, Specs & How-It-Works Tabs Section */}
          <section className="pt-6">
            <ProductTabs product={product} />
          </section>

          {/* Reviews Section */}
          <section className="pt-4">
            <ProductReviews
              reviews={product.reviews}
              productName={product.name}
            />
          </section>

          {/* Product-Specific FAQ Accordion */}
          <section className="pt-4">
            <ProductFAQ
              faqs={product.productFaqs}
              productName={product.name}
            />
          </section>

          {/* Related Products Carousel */}
          <section className="pt-4">
            <RelatedProducts currentProduct={product} />
          </section>

          {/* Cross-Sell Section */}
          <section className="pt-4">
            <CrossSellSection currentProduct={product} />
          </section>

          {/* Recently Viewed Section */}
          <section className="pt-4">
            <RecentlyViewed />
          </section>
        </div>

        {/* Sticky Mobile Add-to-Cart Bar */}
        <StickyMobileATC
          product={product}
          selectedVariantName={activeVariant?.name}
          activePrice={activePrice}
          scrollThreshold={450}
        />
      </main>
    </>
  );
}
