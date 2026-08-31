"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PillButton from "../ui/PillButton";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalCount,
    subtotal,
    freeShippingProgress,
    amountNeededForFreeShipping,
  } = useCart();

  // Escape key handler to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Lock body scroll when cart drawer is open
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Overlay */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#1F1B18]/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn cursor-pointer"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[420px] bg-white border-l border-[#E5E1DC] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out animate-slideInRight">
          {/* Top Header */}
          <div className="p-6 border-b border-[#EFEAE3] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C1663B]" />
              <h3 className="font-serif text-xl text-[#1F1B18] font-bold">
                Your Cart ({totalCount})
              </h3>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 hover:bg-[#FAF6F1] text-[#6E675F] hover:text-[#1F1B18] transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Middle Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Free Shipping Progress Meter */}
            <div className="bg-[#FAF6F1] p-4 border border-[#E5E1DC] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#1F1B18]">
                  <Truck className="w-4 h-4 text-[#C1663B]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-[#C1663B]">
                      Free UAE Delivery unlocked!
                    </span>
                  ) : (
                    <span>
                      Add{" "}
                      <span className="text-[#C1663B]">
                        AED {amountNeededForFreeShipping}
                      </span>{" "}
                      more for Free UAE Delivery
                    </span>
                  )}
                </span>
                <span className="text-[#C1663B] font-semibold">
                  {freeShippingProgress}%
                </span>
              </div>
              {/* Progress bar line */}
              <div className="w-full bg-[#E5E1DC] h-2 overflow-hidden">
                <div
                  className="bg-[#C1663B] h-full transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Line Items List */}
            {items.length === 0 ? (
              <div className="py-14 text-center space-y-4">
                <div className="w-16 h-16 bg-[#FAF6F1] border border-[#E5E1DC] flex items-center justify-center mx-auto text-[#6E675F]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#1F1B18] font-bold">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-[#6E675F] mt-1">
                    Discover everyday self-care and comfort essentials.
                  </p>
                </div>
                <div className="pt-2">
                  <PillButton
                    variant="primary"
                    onClick={() => {
                      closeCart();
                    }}
                  >
                    Start Shopping
                  </PillButton>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-[#EFEAE3]">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="py-4 flex gap-4 items-center justify-between group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 bg-[#FAF6F1] border border-[#E5E1DC] shrink-0 p-0.5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-sans font-bold text-xs sm:text-sm text-[#1F1B18] truncate mb-1">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-[#C1663B] mb-2">
                        {product.price}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center border border-[#E5E1DC] bg-[#FAF6F1] p-0.5 space-x-1">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="p-1 text-[#6E675F] hover:text-[#1F1B18] transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 stroke-[1.5]" />
                        </button>
                        <span className="text-xs font-bold text-[#1F1B18] w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="p-1 text-[#6E675F] hover:text-[#1F1B18] transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 stroke-[1.5]" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-1.5 text-[#6E675F] hover:text-[#E05338] transition cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Footer & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EFEAE3] bg-[#FAF6F1] space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-[#1F1B18]">
                <span>Subtotal</span>
                <span className="text-xl font-serif font-bold text-[#C1663B]">
                  AED {subtotal}
                </span>
              </div>
              <p className="text-[11px] text-[#6E675F] text-center">
                Free UAE Shipping · 100% Cash on Delivery (COD) Only
              </p>

              {/* Checkout Button */}
              <div className="space-y-2.5">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-[#C1663B] hover:bg-[#A8552E] text-white py-3.5 font-bold uppercase tracking-wider text-sm border border-[#C1663B] shadow-[0_4px_14px_rgba(193,102,59,0.25)] transition flex items-center justify-center gap-2 btn-tactile cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-xs font-semibold text-[#6E675F] hover:text-[#C1663B] transition py-1 cursor-pointer"
                >
                  View Full Cart Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
