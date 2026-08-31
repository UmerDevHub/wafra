"use client";

import React from "react";
import { bundlesData } from "@/lib/data";
import { Bundle, Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import BundleCard from "../ui/BundleCard";

interface BundleOffersProps {
  onShopBundle?: (bundle: Bundle) => void;
}

export default function BundleOffers({ onShopBundle }: BundleOffersProps) {
  const { addItem } = useCart();

  const handleBundleClick = (bundle: Bundle) => {
    if (onShopBundle) {
      onShopBundle(bundle);
    } else {
      // Treat bundle as a product entry in cart
      const bundleProduct: Product = {
        id: bundle.id,
        slug: bundle.id,
        name: `${bundle.name} Bundle`,
        price: bundle.bundlePrice,
        wasPrice: bundle.originalPrice,
        priceNumber: parseInt(bundle.bundlePrice.replace(/[^0-9]/g, ""), 10) || 249,
        rating: 5,
        image: bundle.image,
        description: `Complete ${bundle.name} set including: ${bundle.itemsIncluded.join(", ")}.`,
      };
      addItem(bundleProduct, 1);
    }
  };
  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-10">
        Save More With Bundles
      </h2>

      {/* 4 Bundle Cards in a Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bundlesData.map((bundle) => (
          <BundleCard
            key={bundle.id}
            bundle={bundle}
            variant={bundle.variant}
            onShopBundle={handleBundleClick}
          />
        ))}
      </div>
    </section>
  );
}
