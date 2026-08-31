"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  Check,
  AlertCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD, promoCodesData, bestSellersData } from "@/lib/data";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function FullCartPage() {
  const { items, updateQuantity, removeItem, clearCart, subtotal, addItem } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartList = items || [];
  const rawSubtotal = subtotal || 0;
  const shippingFee = rawSubtotal >= FREE_SHIPPING_THRESHOLD || rawSubtotal === 0 ? 0 : 15;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, rawSubtotal + shippingFee - discountAmount);

  // Companion cross-sell items to balance the left column under cart items
  const suggestedProducts = useMemo(() => {
    const cartIds = cartList.map((item) => item.product.id);
    return bestSellersData.filter((p) => !cartIds.includes(p.id)).slice(0, 2);
  }, [cartList]);

  const handleAddSuggested = (product: any) => {
    addItem(product, 1);
    setAddedProductIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const codeClean = promoInput.trim().toUpperCase();
    if (!codeClean) return;

    const match = promoCodesData.find((p) => p.code === codeClean);
    if (!match) {
      setPromoError("Invalid promo code. Try WELCOME10 or WAFRA20");
      return;
    }

    let amt = 0;
    if (match.type === "percent") {
      amt = Math.round((rawSubtotal * match.value) / 100);
    } else {
      amt = match.value;
    }

    setAppliedDiscount({ code: match.code, amount: amt });
  };

  if (!isClient) {
    return (
      <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center p-4">
        <div className="animate-pulse text-xs text-[#6E675F]">Loading shopping cart...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#1F1B18] font-sans pb-24">
      {/* Breadcrumb + Page Title Header Block */}
      <div className="bg-white border-b border-[#E5E1DC] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <Breadcrumbs items={[{ label: "Shopping Cart" }]} />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1B18] font-bold tracking-tight">
                Your Shopping Cart
              </h1>
              <p className="text-xs sm:text-sm text-[#6E675F] mt-1">
                Review your selections before proceeding to 100% Cash on Delivery checkout.
              </p>
            </div>

            {cartList.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-[#6E675F] hover:text-[#C1663B] transition underline self-start sm:self-auto cursor-pointer"
              >
                Clear Entire Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {cartList.length === 0 ? (
          /* Empty Cart View */
          <div className="bg-white p-10 sm:p-16 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-center space-y-4 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-[#FAF6F1] border border-[#E5E1DC] flex items-center justify-center mx-auto text-[#C1663B]">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B18]">
              Your Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#6E675F]">
              Explore our curated self-care, home ambience, and comfort essentials.
            </p>
            <div className="pt-3">
              <Link
                href="/shop-all"
                className="inline-flex items-center justify-center gap-2 bg-[#C1663B] hover:bg-[#A8552E] text-white px-8 py-3.5 font-bold text-xs uppercase tracking-wider border border-[#C1663B] transition btn-tactile cursor-pointer"
              >
                <span>Explore Essentials</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart Items + Summary View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Status Banner, Cart Cards & Ritual Strip (~65% / col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Dynamic Status Banner */}
              {amountToFreeShipping > 0 ? (
                /* Progress Banner */
                <div className="bg-white p-5 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1F1B18]">
                    <span className="flex items-center gap-2 text-[#C1663B]">
                      <Truck className="w-4 h-4 stroke-[1.5]" />
                      <span>Add AED {amountToFreeShipping} more for FREE Delivery across UAE!</span>
                    </span>
                    <span className="text-[#6E675F] font-semibold">
                      {Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF6F1] h-2.5 border border-[#E5E1DC] overflow-hidden">
                    <div
                      className="bg-[#C1663B] h-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* Soft Green Success Banner */
                <div className="bg-[#E8F5EF] border border-[#BDE3CB] p-4 sm:p-5 flex items-center justify-between gap-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 border border-[#2F5D4F]/30 bg-[#2F5D4F]/10 text-[#2F5D4F] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1C452C]">
                        Free Doorstep Delivery Unlocked!
                      </h4>
                      <p className="text-[11px] text-[#2F5D4F] mt-0.5">
                        Your order qualifies for fast 1–3 day delivery across all 7 UAE Emirates at AED 0 shipping.
                      </p>
                    </div>
                  </div>

                  <span className="bg-[#2F5D4F] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 border border-[#2F5D4F] shrink-0 hidden sm:inline-block">
                    Free Shipping
                  </span>
                </div>
              )}

              {/* Separate Cart Item Cards (Clean Light Border #E5E1DC, Subtle Elevation) */}
              <div className="space-y-4">
                {cartList.map((item) => {
                  const numericPrice = item.product.priceNumber || parseFloat(item.product.price.replace(/[^0-9.]/g, "")) || 89;
                  const lineTotal = numericPrice * item.quantity;
                  return (
                    <div
                      key={item.product.id}
                      className="bg-white p-5 sm:p-6 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 transition hover:shadow-md"
                    >
                      {/* Framed Product Thumbnail & Name */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF6F1] border border-[#E5E1DC] shrink-0 p-1">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="96px"
                            className="object-cover object-center"
                          />
                        </div>

                        <div className="min-w-0 space-y-1">
                          <Link
                            href={`/products/${item.product.slug || item.product.id}`}
                            className="font-bold text-sm sm:text-base text-[#1F1B18] hover:text-[#C1663B] transition truncate block cursor-pointer"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-xs text-[#6E675F] block">
                            Unit Price: <strong className="text-[#C1663B] font-bold">{item.product.price}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Line Price */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EFEAE3]">
                        {/* Light Neutral Quantity Stepper Box */}
                        <div className="inline-flex items-center border border-[#E5E1DC] bg-[#FAF6F1] p-1">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity > 1
                                ? updateQuantity(item.product.id, item.quantity - 1)
                                : removeItem(item.product.id)
                            }
                            className="p-1.5 text-[#6E675F] hover:text-[#1F1B18] hover:bg-[#EFEAE3] transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[1.5]" />
                          </button>
                          <span className="px-3 font-bold text-xs sm:text-sm text-[#1F1B18] min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-[#6E675F] hover:text-[#1F1B18] hover:bg-[#EFEAE3] transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                          </button>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-extrabold text-sm sm:text-base text-[#1F1B18] block">
                            AED {lineTotal}
                          </span>
                        </div>

                        {/* Interactive Trash Icon */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-[#6E675F] hover:text-[#E05338] hover:bg-rose-50 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* "Complete Your Ritual" Recommendation Strip */}
              {suggestedProducts.length > 0 && (
                <div className="bg-white p-6 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#EFEAE3] pb-3">
                    <Sparkles className="w-4 h-4 stroke-[1.5] text-[#C1663B]" />
                    <h3 className="font-serif text-base font-bold text-[#1F1B18]">
                      Complete Your Ritual
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suggestedProducts.map((prod) => {
                      const isAdded = addedProductIds.includes(prod.id);
                      return (
                        <div
                          key={prod.id}
                          className="bg-[#FAF6F1] p-3.5 border border-[#E5E1DC] flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative w-12 h-12 bg-white shrink-0 border border-[#E5E1DC]">
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-[#1F1B18] truncate">
                                {prod.name}
                              </h4>
                              <span className="font-extrabold text-[#C1663B] text-xs">
                                {prod.price}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddSuggested(prod)}
                            className={`px-3 py-1.5 font-bold text-xs uppercase tracking-wider border border-[#E5E1DC] transition shrink-0 btn-tactile cursor-pointer ${
                              isAdded
                                ? "bg-[#2F5D4F] text-white border-[#2F5D4F]"
                                : "bg-[#C1663B] hover:bg-[#A8552E] text-white border-[#C1663B]"
                            }`}
                          >
                            {isAdded ? "Added! ✓" : "+ Add"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Order Summary Box (~35% / col-span-4) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#1F1B18] border-b border-[#EFEAE3] pb-4">
                  Order Summary
                </h3>

                {/* Promo Code Input Group */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18]">
                    Promo Code
                  </label>
                  <div className="flex border border-[#E5E1DC] focus-within:border-[#C1663B] transition-all">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. WELCOME10"
                      className="flex-1 h-11 px-3.5 bg-[#FAF6F1] text-xs font-bold uppercase outline-none text-[#1F1B18] focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="bg-[#C1663B] hover:bg-[#A8552E] text-white px-4 h-11 font-bold text-xs uppercase tracking-wider transition shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>{promoError}</span>
                    </p>
                  )}
                  {appliedDiscount && (
                    <p className="text-[11px] font-bold text-[#2F5D4F] flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 stroke-[2]" />
                      <span>Promo '{appliedDiscount.code}' applied!</span>
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-3 border-t border-[#EFEAE3] text-xs">
                  <div className="flex items-center justify-between text-[#6E675F]">
                    <span>Subtotal ({cartList.length} items)</span>
                    <span className="font-bold text-[#1F1B18]">AED {rawSubtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-[#6E675F]">
                    <span>Shipping Fee (UAE 1–3 Day Delivery)</span>
                    {shippingFee === 0 ? (
                      <span className="font-bold text-[#2F5D4F] bg-[#E8F5EF] border border-[#BDE3CB] px-2 py-0.5 text-[10px] tracking-wider uppercase">
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold text-[#1F1B18]">AED {shippingFee}</span>
                    )}
                  </div>

                  {appliedDiscount && (
                    <div className="flex items-center justify-between text-[#2F5D4F] font-bold">
                      <span>Discount ({appliedDiscount.code})</span>
                      <span>- AED {appliedDiscount.amount}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-[#EFEAE3] text-base font-extrabold text-[#1F1B18]">
                    <span>Grand Total</span>
                    <span className="text-2xl font-serif text-[#C1663B]">AED {grandTotal}</span>
                  </div>
                </div>

                {/* Direct Solid Terracotta CTA Link to Checkout */}
                <Link
                  href="/checkout"
                  className="w-full bg-[#C1663B] hover:bg-[#A8552E] text-white py-4 px-6 font-bold uppercase tracking-wider text-sm shadow-[0_4px_14px_rgba(193,102,59,0.25)] hover:shadow-[0_6px_20px_rgba(193,102,59,0.35)] transition-all flex items-center justify-center gap-2.5 group cursor-pointer btn-tactile"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="text-[11px] text-[#6E675F] text-center pt-1">
                  <p className="flex items-center justify-center gap-1.5 text-[#2F5D4F] font-semibold">
                    <ShieldCheck className="w-4 h-4 stroke-[1.5] text-[#2F5D4F]" />
                    100% Cash on Delivery · Pay at your door
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
