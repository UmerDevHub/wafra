"use client";

import React from "react";
import { Truck, Banknote, ShieldCheck, RotateCcw, CheckCircle } from "lucide-react";
import RevealOnScroll from "../ui/RevealOnScroll";

export default function TrustRow() {
  const trustItems = [
    {
      icon: Truck,
      title: "Fast UAE Delivery",
      subtitle: "1–3 Days to Dubai, AD & Emirates",
      delay: 0,
    },
    {
      icon: Banknote,
      title: "Cash on Delivery",
      subtitle: "Pay at your doorstep",
      delay: 80,
    },
    {
      icon: ShieldCheck,
      title: "Verified Authenticity",
      subtitle: "100% Quality Inspected",
      delay: 160,
    },
    {
      icon: RotateCcw,
      title: "Hassle-Free Returns",
      subtitle: "7-Day Easy Exchange Policy",
      delay: 240,
    },
  ];

  return (
    <section className="bg-white py-10 sm:py-14 border-y border-[#E5E1DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top: 4 Primary Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <RevealOnScroll key={index} delayMs={item.delay}>
                <div className="flex flex-col items-center space-y-2 p-3 bg-[#FAF6F1] border border-[#E5E1DC] transition-all duration-150 hover:bg-white">
                  <div className="p-2.5 bg-white border border-[#E5E1DC] text-[#C1663B]">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1F1B18] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#6E675F] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom: Payment & Delivery Assurance Badges */}
        <div className="pt-4 border-t border-[#EFEAE3] flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#6E675F]">
          <div className="flex items-center gap-1.5 font-semibold text-[#1F1B18]">
            <CheckCircle className="w-4 h-4 text-[#2F5D4F] stroke-[1.5]" />
            <span>Fulfillment Hub: Dubai & Sharjah</span>
          </div>

          <span className="hidden sm:inline text-[#6E675F]/30">•</span>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6E675F]">Payment Method:</span>
            <div className="flex items-center gap-1.5 font-bold text-[11px]">
              <span className="bg-[#FAF6F1] border border-[#E5E1DC] px-3 py-1 text-[#1F1B18] uppercase tracking-wider font-bold">
                100% Cash on Delivery (COD) Only
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
