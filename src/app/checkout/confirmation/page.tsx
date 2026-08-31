"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { CheckCircle2, MessageSquare, Truck, Banknote, ArrowRight, Copy, Check } from "lucide-react";
import { bestSellersData } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

interface PageProps {
  searchParams?: Promise<{ orderId?: string; total?: string; name?: string; phone?: string; area?: string; emirate?: string }>;
}

export default function OrderConfirmationPage({ searchParams: searchParamsPromise }: PageProps) {
  const searchParams = searchParamsPromise ? use(searchParamsPromise) : {};
  const orderId = searchParams.orderId || "WAF-849201";
  const orderTotal = searchParams.total || "249";
  const customerName = searchParams.name || "Customer";
  const area = searchParams.area || "Dubai Marina";
  const emirate = searchParams.emirate || "Dubai";
  const phone = searchParams.phone || "+971 50 123 4567";

  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#1F1B18] font-sans pb-24">
      {/* Refined Success Hero Section */}
      <div className="bg-white border-b border-[#E5E1DC] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          {/* Muted Sage Circular Badge with 1.5px Stroke Checkmark */}
          <div className="w-16 h-16 rounded-full bg-[#E8F5EF] border border-[#BDE3CB] text-[#2F5D4F] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8 stroke-[1.5] text-[#2F5D4F]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#C1663B] bg-[#FDF0EB] border border-[#F5D5C6] px-3.5 py-1 inline-block">
            Cash on Delivery Order Placed
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1B18] font-bold tracking-tight">
            Thank You, {customerName}!
          </h1>

          <p className="text-xs sm:text-sm text-[#6E675F] max-w-lg mx-auto leading-relaxed">
            Your Cash on Delivery order has been logged. Our dispatch team is preparing your package for fast 1–3 day delivery across the UAE.
          </p>

          {/* Clean Order Reference Box */}
          <div className="inline-flex items-center gap-2.5 bg-[#FAF6F1] p-3 px-5 border border-[#E5E1DC] text-xs font-bold text-[#1F1B18]">
            <span>Order Reference: #{orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="p-1 text-[#C1663B] hover:text-[#1F1B18] transition cursor-pointer"
              title="Copy Order ID"
            >
              {copied ? (
                <span className="text-[#2F5D4F] flex items-center gap-1 font-bold text-[11px]">
                  <Check className="w-3.5 h-3.5 stroke-[2]" />
                  Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        {/* Soft Amber Payment Reminder Callout Banner */}
        <div className="bg-[#FFFBEB] border-l-4 border-l-[#D97706] border-y border-r border-[#FDE68A] p-5 sm:p-6 flex items-start gap-4 shadow-none">
          <div className="w-10 h-10 border border-[#FDE68A] bg-[#FEF3C7] text-[#B45309] flex items-center justify-center shrink-0 mt-0.5">
            <Banknote className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-[#92400E]">
              Payment Reminder: AED {orderTotal} Cash on Delivery
            </h3>
            <p className="text-xs text-[#B45309] leading-relaxed">
              Please have <strong>AED {orderTotal}</strong> in cash ready for the courier when they deliver your parcel to {area}, {emirate}. No advance online payment is needed.
            </p>
          </div>
        </div>

        {/* 2-Column Info Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Shipping Address Recap Card */}
          <div className="bg-white p-6 sm:p-7 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1F1B18] flex items-center gap-2 border-b border-[#EFEAE3] pb-3">
              <Truck className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
              <span>Delivery Details</span>
            </h3>
            <div className="text-xs text-[#6E675F] space-y-1 font-medium pt-1">
              <p className="font-bold text-[#1F1B18]">{customerName}</p>
              <p>{area}, {emirate}</p>
              <p>United Arab Emirates</p>
              <p className="text-[#6E675F] pt-1">Phone: {phone}</p>
              <p className="text-[#2F5D4F] font-bold pt-2 flex items-center gap-1.5">
                <Truck className="w-4 h-4 stroke-[1.5]" />
                Estimated Delivery: 1–3 Business Days
              </p>
            </div>
          </div>

          {/* WhatsApp Confirmation Reminder Card */}
          <div className="bg-white p-6 sm:p-7 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-3">
            <h3 className="font-serif text-base font-bold text-[#1F1B18] flex items-center gap-2 border-b border-[#EFEAE3] pb-3">
              <MessageSquare className="w-4 h-4 text-[#2F5D4F] stroke-[1.5]" />
              <span>What Happens Next?</span>
            </h3>
            <div className="text-xs text-[#6E675F] space-y-2 pt-1">
              <p className="font-bold text-[#1F1B18]">
                1. WhatsApp Confirmation Message
              </p>
              <p className="leading-relaxed">
                Our logistics team will send a quick WhatsApp text to {phone} to verify your address before dispatch.
              </p>
              <p className="font-bold text-[#1F1B18] pt-1">
                2. Doorstep Delivery
              </p>
              <p className="leading-relaxed">
                The driver will call 30 minutes prior to arrival. Hand cash to the driver and inspect your parcel.
              </p>
            </div>
          </div>
        </div>

        {/* "Discover More Essentials" Product Grid */}
        <div className="bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-4">
            <h3 className="font-serif text-xl font-bold text-[#1F1B18]">
              Discover More Essentials
            </h3>
            <Link href="/shop-all" className="text-xs font-bold text-[#C1663B] hover:underline cursor-pointer">
              View Catalog →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellersData.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Primary Rectangular Solid Terracotta Action Button */}
        <div className="text-center pt-4">
          <Link
            href="/shop-all"
            className="inline-flex items-center justify-center gap-2 bg-[#C1663B] hover:bg-[#A8552E] text-white px-8 py-3.5 font-bold text-xs uppercase tracking-wider border border-[#C1663B] shadow-[0_4px_14px_rgba(193,102,59,0.25)] transition btn-tactile cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 stroke-[1.5]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
