"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Truck, Tag, Check, AlertCircle, Plus, Minus, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD, promoCodesData, bestSellersData } from "@/lib/data";

interface OrderSummaryProps {
  appliedDiscount: { code: string; amount: number } | null;
  onApplyDiscount: (discount: { code: string; amount: number } | null) => void;
}

export default function OrderSummary({
  appliedDiscount,
  onApplyDiscount,
}: OrderSummaryProps) {
  const { items, subtotal, updateQuantity, removeItem, addItem } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [upsellAdded, setUpsellAdded] = useState(false);

  const cartList = items || [];
  const rawSubtotal = subtotal || 0;
  const shippingFee = rawSubtotal >= FREE_SHIPPING_THRESHOLD || rawSubtotal === 0 ? 0 : 15;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, rawSubtotal + shippingFee - discountAmount);

  // Single companion upsell product
  const companionUpsellProduct = bestSellersData.find(
    (p) => !cartList.some((item) => item.product.id === p.id)
  ) || bestSellersData[0];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const codeClean = promoInput.trim().toUpperCase();
    if (!codeClean) return;

    const match = promoCodesData.find((p) => p.code === codeClean);
    if (!match) {
      setPromoError("Invalid code. Try WELCOME10 or WAFRA20");
      return;
    }

    let amt = 0;
    if (match.type === "percent") {
      amt = Math.round((rawSubtotal * match.value) / 100);
    } else {
      amt = match.value;
    }

    onApplyDiscount({ code: match.code, amount: amt });
  };

  const handleAddUpsell = (product: any) => {
    addItem(product, 1);
    setUpsellAdded(true);
    setTimeout(() => setUpsellAdded(false), 2000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-6">
      {/* Refined Header & Divider */}
      <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-4">
        <h2 className="font-serif text-xl font-bold text-[#1F1B18] flex items-center gap-2.5">
          <ShoppingBag className="w-5 h-5 stroke-[1.5] text-[#C1663B]" />
          <span>Order Summary ({cartList.length})</span>
        </h2>
      </div>

      {/* Free Shipping Progress Indicator */}
      {rawSubtotal > 0 && amountToFreeShipping > 0 && (
        <div className="bg-[#FAF6F1] p-3.5 border border-[#EFEAE3] space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-[#1F1B18]">
            <span className="flex items-center gap-1.5 text-[#C1663B]">
              <Truck className="w-4 h-4 stroke-[1.5]" />
              <span>Add AED {amountToFreeShipping} more for FREE Shipping!</span>
            </span>
          </div>
          <div className="w-full bg-[#EFEAE3] h-2 overflow-hidden">
            <div
              className="bg-[#C1663B] h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Line Items List */}
      <div className="divide-y divide-[#EFEAE3] max-h-[320px] overflow-y-auto pr-1 space-y-3">
        {cartList.map((item) => {
          const numericPrice = item.product.priceNumber || parseFloat(item.product.price.replace(/[^0-9.]/g, "")) || 89;
          const lineTotal = numericPrice * item.quantity;
          return (
            <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="relative w-14 h-14 bg-[#FAF6F1] border border-[#E5E1DC] shrink-0 p-0.5">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#C1663B] text-white text-[10px] font-extrabold px-1.5 py-0.5 border border-white">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1F1B18] truncate">
                    {item.product.name}
                  </h4>
                  <span className="text-[11px] text-[#6E675F] block mt-0.5">
                    {item.product.price} each
                  </span>

                  {/* Refined Light Gray Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="inline-flex items-center border border-[#E5E1DC] bg-[#FAF6F1] p-0.5">
                      <button
                        type="button"
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.product.id, item.quantity - 1)
                            : removeItem(item.product.id)
                        }
                        className="p-1 text-[#6E675F] hover:text-[#1F1B18] transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[1.5]" />
                      </button>
                      <span className="px-2.5 font-bold text-xs text-[#1F1B18]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#6E675F] hover:text-[#1F1B18] transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <span className="font-bold text-xs sm:text-sm text-[#1F1B18]">
                  AED {lineTotal}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upsell Card ("Frequently Added Pair"): Soft Warm Tint (#FBF4EE), Light Border (#F0E4D8) */}
      {companionUpsellProduct && (
        <div className="bg-[#FBF4EE] p-4 border border-[#F0E4D8] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-12 h-12 bg-white shrink-0 border border-[#E5E1DC]">
              <Image
                src={companionUpsellProduct.image}
                alt={companionUpsellProduct.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#C1663B] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 stroke-[1.5]" />
                Frequently Added Pair
              </span>
              <h5 className="font-bold text-[#1F1B18] truncate text-xs mt-0.5">
                {companionUpsellProduct.name}
              </h5>
              <span className="font-extrabold text-[#C1663B] text-[11px] block">
                {companionUpsellProduct.price}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleAddUpsell(companionUpsellProduct)}
            className={`px-3.5 py-1.5 font-bold text-xs uppercase tracking-wider transition shrink-0 btn-tactile ${
              upsellAdded
                ? "bg-[#2F5D4F] text-white"
                : "bg-[#C1663B] hover:bg-[#A8552E] text-white"
            }`}
          >
            {upsellAdded ? "Added! ✓" : "+ Add"}
          </button>
        </div>
      )}

      {/* Collapsible Promo Code Field */}
      <div className="pt-3 border-t border-[#EFEAE3]">
        {!appliedDiscount ? (
          <div>
            <button
              type="button"
              onClick={() => setIsPromoOpen(!isPromoOpen)}
              className="text-xs font-bold text-[#C1663B] hover:underline flex items-center gap-1.5 transition"
            >
              <Tag className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Have a promo code?</span>
              {isPromoOpen ? <ChevronUp className="w-3 h-3 stroke-[1.5]" /> : <ChevronDown className="w-3 h-3 stroke-[1.5]" />}
            </button>

            {isPromoOpen && (
              <form onSubmit={handleApplyPromo} className="mt-3 space-y-2 animate-fadeIn">
                <div className="flex border border-[#E5E1DC] overflow-hidden">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code e.g. WELCOME10"
                    className="flex-1 h-10 px-3 bg-[#FAF6F1] text-xs font-bold uppercase outline-none text-[#1F1B18] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#C1663B] hover:bg-[#A8552E] text-white px-4 h-10 font-bold text-xs uppercase tracking-wider transition shrink-0"
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
              </form>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs bg-[#E8F5EF] p-3 border border-[#BDE3CB]">
            <span className="font-bold text-[#2F5D4F] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[2]" />
              Code '{appliedDiscount.code}' Applied
            </span>
            <button
              type="button"
              onClick={() => onApplyDiscount(null)}
              className="text-[11px] text-[#E05338] font-bold hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 pt-3 border-t border-[#EFEAE3] text-xs">
        <div className="flex items-center justify-between text-[#6E675F]">
          <span>Subtotal</span>
          <span className="font-bold text-[#1F1B18]">AED {rawSubtotal}</span>
        </div>

        <div className="flex items-center justify-between text-[#6E675F]">
          <span>Shipping (UAE 1–3 Day Delivery)</span>
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
    </div>
  );
}
