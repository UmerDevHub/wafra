"use client";

import React from "react";
import { Banknote, MessageSquare, Truck, RotateCcw, ShieldCheck, Check } from "lucide-react";

interface PaymentMethodProps {
  whatsappOptIn: boolean;
  setWhatsappOptIn: (val: boolean) => void;
}

export default function PaymentMethod({
  whatsappOptIn,
  setWhatsappOptIn,
}: PaymentMethodProps) {
  return (
    <div className="bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-6">
      {/* Clean Section Header */}
      <div className="border-b border-[#EFEAE3] pb-4">
        <h3 className="font-serif text-lg font-bold text-[#1F1B18] tracking-tight">
          Payment Method
        </h3>
        <p className="text-xs text-[#6E675F] mt-0.5">
          100% Cash on Delivery — pay upon arrival
        </p>
      </div>

      {/* COD Payment Card */}
      <div className="bg-[#FAF6F1] p-5 border border-[#E5E1DC] flex items-start gap-4">
        <div className="w-10 h-10 border border-[#E5E1DC] bg-[#C1663B] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Banknote className="w-5 h-5 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-[#1F1B18]">Cash on Delivery (COD)</h4>
            <span className="bg-[#2F5D4F] text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[2]" />
              Guaranteed
            </span>
          </div>
          <p className="text-xs text-[#6E675F] leading-relaxed">
            Pay in cash directly to our courier when your order arrives at your door — no credit card needed.
          </p>
        </div>
      </div>

      {/* WhatsApp Order Confirmation Opt-In */}
      <div className="pt-1 border-t border-[#EFEAE3]">
        <label className="flex items-start gap-3.5 cursor-pointer select-none bg-[#FAF6F1] p-4 border border-[#E5E1DC] hover:bg-white transition">
          <input
            type="checkbox"
            checked={whatsappOptIn}
            onChange={(e) => setWhatsappOptIn(e.target.checked)}
            className="w-4 h-4 border border-[#E5E1DC] bg-white accent-[#C1663B] focus:ring-0 cursor-pointer mt-0.5"
          />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#1F1B18] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 stroke-[1.5] text-[#2F5D4F]" />
              <span>Confirm my order via WhatsApp before dispatch</span>
            </span>
            <p className="text-[11px] text-[#6E675F] leading-normal">
              Helps us avoid delivery mix-ups — takes 10 seconds (Recommended for fastest dispatch).
            </p>
          </div>
        </label>
      </div>

      {/* Point-of-Confirmation Trust Signals */}
      <div className="pt-2 border-t border-[#EFEAE3] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#6E675F] font-medium">
        <div className="flex items-center gap-2 bg-[#FAF6F1] p-3 border border-[#E5E1DC]">
          <Truck className="w-4 h-4 stroke-[1.5] text-[#C1663B] shrink-0" />
          <span>Delivered in 1–3 days in UAE</span>
        </div>
        <div className="flex items-center gap-2 bg-[#FAF6F1] p-3 border border-[#E5E1DC]">
          <Banknote className="w-4 h-4 stroke-[1.5] text-[#C1663B] shrink-0" />
          <span>Pay only when it arrives</span>
        </div>
        <div className="flex items-center gap-2 bg-[#FAF6F1] p-3 border border-[#E5E1DC]">
          <RotateCcw className="w-4 h-4 stroke-[1.5] text-[#C1663B] shrink-0" />
          <span>Easy 7-day returns</span>
        </div>
      </div>
    </div>
  );
}
