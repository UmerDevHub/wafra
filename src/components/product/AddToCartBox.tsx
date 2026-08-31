"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, ShoppingBag, Check, Zap } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface AddToCartBoxProps {
  product: Product;
  selectedVariantIndex?: number;
  activePrice?: string;
}

export default function AddToCartBox({
  product,
  selectedVariantIndex = 0,
  activePrice,
}: AddToCartBoxProps) {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const maxStock = product.stockCount && product.stockCount > 0 ? product.stockCount : 99;

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => Math.min(maxStock, prev + 1));
  };

  const handleAddToCart = () => {
    const activeVariant = product.variants?.[selectedVariantIndex];
    const itemToAdd = {
      ...product,
      price: activeVariant?.price || activePrice || product.price,
      selectedVariant: activeVariant?.name,
    };

    addItem(itemToAdd, quantity);
    setIsAdded(true);
    openCart();

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const handleBuyNow = () => {
    const activeVariant = product.variants?.[selectedVariantIndex];
    const itemToAdd = {
      ...product,
      price: activeVariant?.price || activePrice || product.price,
      selectedVariant: activeVariant?.name,
    };

    addItem(itemToAdd, quantity);
    router.push("/checkout");
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Stepper + Add to Cart Row */}
      <div className="flex items-center gap-3">
        {/* Rectangular Light Neutral Quantity Stepper */}
        <div className="inline-flex items-center border border-[#E5E1DC] bg-[#FAF6F1] px-3 py-2 space-x-2.5 shrink-0">
          <button
            type="button"
            onClick={handleQuantityDecrease}
            disabled={quantity <= 1}
            className="text-[#6E675F] hover:text-[#1F1B18] disabled:opacity-40 transition cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 stroke-[1.5]" />
          </button>
          <span className="text-xs sm:text-sm font-bold text-[#1F1B18] w-5 text-center select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleQuantityIncrease}
            disabled={quantity >= maxStock}
            className="text-[#6E675F] hover:text-[#1F1B18] disabled:opacity-40 transition cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Primary Solid Terracotta Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 px-6 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_14px_rgba(193,102,59,0.25)] transition-all duration-200 flex items-center justify-center gap-2 border cursor-pointer btn-tactile ${
            isAdded
              ? "bg-[#2F5D4F] text-white border-[#2F5D4F]"
              : "bg-[#C1663B] hover:bg-[#A8552E] text-white border-[#C1663B]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white stroke-[2]" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Secondary Outlined Fast Cash on Delivery Checkout Button */}
      <button
        type="button"
        onClick={handleBuyNow}
        className="w-full bg-white hover:bg-[#FAF6F1] text-[#C1663B] border border-[#C1663B] py-3 px-6 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer btn-tactile"
      >
        <Zap className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
        <span>Buy Now — Cash on Delivery</span>
      </button>
    </div>
  );
}
