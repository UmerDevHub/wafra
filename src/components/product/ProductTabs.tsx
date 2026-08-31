"use client";

import React, { useState } from "react";
import { CheckCircle2, Info, Settings, HelpCircle } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "howItWorks">("description");

  const handleKeyDown = (e: React.KeyboardEvent, tab: "description" | "specs" | "howItWorks") => {
    if (e.key === "ArrowRight") {
      if (tab === "description") setActiveTab("specs");
      else if (tab === "specs") setActiveTab("howItWorks");
    } else if (e.key === "ArrowLeft") {
      if (tab === "howItWorks") setActiveTab("specs");
      else if (tab === "specs") setActiveTab("description");
    }
  };

  return (
    <div id="product-details-tabs" className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EFEAE3] shadow-xs space-y-8">
      {/* Tab Navigation Header */}
      <div
        role="tablist"
        className="flex items-center space-x-6 sm:space-x-10 border-b border-[#EFEAE3] overflow-x-auto scrollbar-none"
      >
        <button
          role="tab"
          aria-selected={activeTab === "description"}
          tabIndex={activeTab === "description" ? 0 : -1}
          onClick={() => setActiveTab("description")}
          onKeyDown={(e) => handleKeyDown(e, "description")}
          className={`pb-4 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 border-b-2 ${
            activeTab === "description"
              ? "border-terracotta text-terracotta"
              : "border-transparent text-body/70 hover:text-ink"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Description</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "specs"}
          tabIndex={activeTab === "specs" ? 0 : -1}
          onClick={() => setActiveTab("specs")}
          onKeyDown={(e) => handleKeyDown(e, "specs")}
          className={`pb-4 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 border-b-2 ${
            activeTab === "specs"
              ? "border-terracotta text-terracotta"
              : "border-transparent text-body/70 hover:text-ink"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Specifications</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "howItWorks"}
          tabIndex={activeTab === "howItWorks" ? 0 : -1}
          onClick={() => setActiveTab("howItWorks")}
          onKeyDown={(e) => handleKeyDown(e, "howItWorks")}
          className={`pb-4 text-sm sm:text-base font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 border-b-2 ${
            activeTab === "howItWorks"
              ? "border-terracotta text-terracotta"
              : "border-transparent text-body/70 hover:text-ink"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>How It Works</span>
        </button>
      </div>

      {/* Tab Panels with Fade Animation */}
      <div className="min-h-[220px]">
        {/* Tab 1: Description */}
        {activeTab === "description" && (
          <div role="tabpanel" className="animate-fadeIn space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
              Designed for Modern UAE Lifestyle
            </h3>
            <div className="text-sm text-body leading-relaxed space-y-4 font-normal whitespace-pre-line">
              {product.longDescription ||
                product.description ||
                "Engineered with premium materials and ergonomic precision to deliver reliable daily performance tailored for modern living."}
            </div>
          </div>
        )}

        {/* Tab 2: Specifications */}
        {activeTab === "specs" && (
          <div role="tabpanel" className="animate-fadeIn space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
              Technical Specifications
            </h3>
            {product.specs && product.specs.length > 0 ? (
              <div className="divide-y divide-[#EFEAE3] border-t border-b border-[#EFEAE3]">
                {product.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex justify-between items-center text-xs sm:text-sm"
                  >
                    <span className="text-body/70 font-medium">{spec.label}</span>
                    <span className="font-bold text-ink">{spec.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-body/60">Standard specs apply.</p>
            )}
          </div>
        )}

        {/* Tab 3: How It Works */}
        {activeTab === "howItWorks" && (
          <div role="tabpanel" className="animate-fadeIn space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
              Simple 3-Step Guide
            </h3>
            {product.howItWorks && product.howItWorks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.howItWorks.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="bg-sand p-6 rounded-2xl border border-[#EFEAE3] space-y-3 relative overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-full bg-terracotta text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs">
                      {stepItem.step}
                    </div>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-ink">
                      {stepItem.title}
                    </h4>
                    <p className="text-xs text-body leading-relaxed">
                      {stepItem.detail}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-sand p-6 rounded-2xl border border-[#EFEAE3] space-y-2">
                  <div className="w-9 h-9 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">1</div>
                  <h4 className="font-bold text-sm text-ink">Unpack & Charge</h4>
                  <p className="text-xs text-body">Ready right out of the box with included charger.</p>
                </div>
                <div className="bg-sand p-6 rounded-2xl border border-[#EFEAE3] space-y-2">
                  <div className="w-9 h-9 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">2</div>
                  <h4 className="font-bold text-sm text-ink">Turn On & Adjust</h4>
                  <p className="text-xs text-body">Select your favorite mode with one touch.</p>
                </div>
                <div className="bg-sand p-6 rounded-2xl border border-[#EFEAE3] space-y-2">
                  <div className="w-9 h-9 rounded-full bg-terracotta text-white font-bold text-sm flex items-center justify-center">3</div>
                  <h4 className="font-bold text-sm text-ink">Enjoy Instant Relief</h4>
                  <p className="text-xs text-body">Experience immediate comfort and daily glow.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
