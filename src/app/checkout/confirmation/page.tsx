"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  MessageSquare,
  Truck,
  Banknote,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  Phone,
  Clock,
  Package,
  ShoppingBag,
} from "lucide-react";
import { bestSellersData } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

interface PageProps {
  searchParams?: Promise<{
    orderId?: string;
    total?: string;
    name?: string;
    phone?: string;
    area?: string;
    emirate?: string;
  }>;
}

export default function OrderConfirmationPage({
  searchParams: searchParamsPromise,
}: PageProps) {
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
    <main className="min-h-screen bg-[#F8F4EF] text-[#1F1B18] font-sans pb-24">

      {/* SUCCESS HERO */}
      <div className="bg-white border-b border-[#EDE8E2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center space-y-5">

          {/* Mint rounded-square — sharp Lucide CheckCircle2, 1.5px stroke */}
          <div className="inline-flex items-center justify-center w-[72px] h-[72px] bg-[#E6F5EE] border-2 border-[#B8DFC9] rounded-2xl mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9 text-[#2A7A52] stroke-[1.5]" />
          </div>

          {/* COD badge */}
          <div>
            <span className="inline-block bg-[#FEF0E8] border border-[#F5CDB5] text-[#C1663B] text-[10px] font-extrabold uppercase tracking-[0.18em] px-4 py-1.5 rounded-sm">
              ✓&nbsp; Cash on Delivery Order Placed
            </span>
          </div>

          {/* Thank You heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#1F1B18] font-bold tracking-tight leading-tight">
            Thank You, {customerName}!
          </h1>

          {/* Sub-copy */}
          <p className="text-sm text-[#6E675F] max-w-md mx-auto leading-relaxed">
            Your Cash on Delivery order has been logged. Our dispatch team is
            preparing your package for fast{" "}
            <span className="font-semibold text-[#1F1B18]">1–3 day delivery</span>{" "}
            across the UAE.
          </p>

          {/* Order reference pill */}
          <div className="inline-flex items-center gap-3 bg-[#F5F0EA] border border-[#DDD7CE] text-[#1F1B18] text-xs font-bold px-5 py-2.5 rounded-full">
            <Package className="w-3.5 h-3.5 text-[#C1663B] stroke-[1.5] shrink-0" />
            <span>Order Reference: #{orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-[#C1663B] hover:text-[#A8552E] transition cursor-pointer ml-0.5"
              title="Copy Order ID"
              aria-label="Copy order ID"
            >
              {copied ? (
                <span className="flex items-center gap-1 text-[#2A7A52] text-[10px] font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[2]" />
                  Copied
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-6">

        {/* Payment Reminder Banner */}
        <div className="bg-[#FFFCF0] border border-[#F5E6B2] border-l-[5px] border-l-[#E09900] rounded-xl p-5 sm:p-6 flex items-start gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="w-10 h-10 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <Banknote className="w-5 h-5 text-[#B45309] stroke-[1.5]" />
          </div>
          <div className="space-y-1 min-w-0">
            <h3 className="font-bold text-sm text-[#92400E]">
              Payment Reminder: AED {orderTotal} Cash on Delivery
            </h3>
            <p className="text-xs text-[#B45309] leading-relaxed">
              Please have{" "}
              <strong className="font-extrabold">AED {orderTotal}</strong> in
              cash ready for the courier when they deliver your parcel to{" "}
              <strong>{area}, {emirate}</strong>. No advance online payment is needed.
            </p>
          </div>
        </div>

        {/* Two Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Delivery Details */}
          <div className="bg-white rounded-xl border border-[#EDE8E2] shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#F0EBE4] pb-3.5">
              <div className="w-8 h-8 bg-[#FEF0E8] rounded-lg flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-[#C1663B] stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-sm text-[#1F1B18]">Delivery Details</h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#9E948C] stroke-[1.5] mt-0.5 shrink-0" />
                <span className="font-bold text-[#1F1B18]">{customerName}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#9E948C] stroke-[1.5] mt-0.5 shrink-0" />
                <span className="text-[#6E675F] leading-relaxed">
                  {area}, {emirate}<br />United Arab Emirates
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#9E948C] stroke-[1.5] shrink-0" />
                <span className="text-[#6E675F]">{phone}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1 border-t border-[#F0EBE4]">
                <Clock className="w-3.5 h-3.5 text-[#2A7A52] stroke-[1.5] shrink-0" />
                <span className="font-semibold text-[#2A7A52]">Estimated: 1–3 Business Days</span>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-xl border border-[#EDE8E2] shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#F0EBE4] pb-3.5">
              <div className="w-8 h-8 bg-[#EDF5F0] rounded-lg flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-[#2A7A52] stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-sm text-[#1F1B18]">What Happens Next?</h3>
            </div>
            <div className="text-xs space-y-0">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className="w-6 h-6 rounded-full bg-[#C1663B] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div className="w-px flex-1 bg-[#E5E1DC] my-1 min-h-[24px]" />
                </div>
                <div className="space-y-0.5 pb-3">
                  <p className="font-bold text-[#1F1B18]">WhatsApp Confirmation</p>
                  <p className="text-[#6E675F] leading-relaxed">
                    Our logistics team will WhatsApp{" "}
                    <span className="font-semibold text-[#1F1B18]">{phone}</span>{" "}
                    to verify your address before dispatch.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#C1663B] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-0.5">
                  <p className="font-bold text-[#1F1B18]">Doorstep Delivery</p>
                  <p className="text-[#6E675F] leading-relaxed">
                    Driver will call 30 min before arrival. Hand cash &amp; inspect
                    your parcel on delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discover More Essentials */}
        <div className="bg-white rounded-xl border border-[#EDE8E2] shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1B18]">
              Discover More Essentials
            </h2>
            <Link
              href="/shop-all"
              className="text-xs font-bold text-[#C1663B] hover:text-[#A8552E] transition flex items-center gap-1"
            >
              View Catalog
              <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellersData.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <div className="text-center pt-2 pb-4">
          <Link
            href="/shop-all"
            className="inline-flex items-center justify-center gap-2.5 bg-[#C1663B] hover:bg-[#A8552E] active:scale-[0.98] text-white px-10 py-4 font-bold text-xs uppercase tracking-[0.14em] rounded-sm shadow-[0_6px_20px_rgba(193,102,59,0.30)] transition-all duration-200 cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 stroke-[2]" />
          </Link>
        </div>
      </div>
    </main>
  );
}
