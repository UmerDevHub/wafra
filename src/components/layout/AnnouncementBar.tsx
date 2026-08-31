"use client";

import React from "react";

export default function AnnouncementBar() {
  const items = [
    "🚚 FREE EXPRESS DELIVERY ACROSS ALL 7 UAE EMIRATES",
    "💵 100% CASH ON DELIVERY (COD) ONLY",
    "⚡ FAST 1–3 DAY DOORSTEP DELIVERY",
    "✨ GENUINE QUALITY GUARANTEED",
    "🛍️ NO CREDIT CARD REQUIRED — PAY CASH ON DELIVERY",
  ];

  return (
    <div className="bg-terracotta text-white text-[11px] sm:text-xs py-2 overflow-hidden select-none relative z-30 font-semibold tracking-wider uppercase border-b border-white/10 shadow-xs">
      <div className="animate-marquee whitespace-nowrap flex">
        <div className="flex items-center space-x-8 shrink-0 pr-8">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-8 shrink-0 pr-8" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
