"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqsData } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <h2 className="font-serif text-3xl md:text-4xl text-ink text-center mb-8">
        Frequently Asked Questions
      </h2>

      {/* Accordion List */}
      <div className="divide-y divide-[#EFEAE3] border-y border-[#EFEAE3]">
        {faqsData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-ink hover:text-terracotta transition"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className="text-terracotta ml-4 flex-shrink-0">
                  {isOpen ? (
                    <Minus className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <Plus className="w-4 h-4 transition-transform duration-200" />
                  )}
                </span>
              </button>
              {isOpen && (
                <div className="pt-3 pr-6 text-xs sm:text-sm text-body leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
