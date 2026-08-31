"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQItem } from "@/lib/types";

interface ProductFAQProps {
  faqs?: FAQItem[];
  productName: string;
}

export default function ProductFAQ({ faqs: initialFaqs, productName }: ProductFAQProps) {
  const defaultFaqs: FAQItem[] = [
    {
      question: `How fast is delivery for the ${productName}?`,
      answer: "We deliver across all 7 UAE Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, UAQ) within 1–3 business days with real-time door-to-door tracking.",
    },
    {
      question: "How does Cash on Delivery (COD) work?",
      answer: "Simply complete your order online without entering card details. Our courier delivers your parcel and collects cash directly at your doorstep.",
    },
    {
      question: "What is the warranty and return policy?",
      answer: `The ${productName} comes with a 1-Year Quality Warranty and a 7-day hassle-free exchange policy. If you have any issue, contact our support team via WhatsApp for instant assistance.`,
    },
    {
      question: "Are there any hidden fees or extra delivery charges?",
      answer: "No hidden fees! All prices are inclusive of 5% UAE VAT. Standard delivery is transparent and orders over AED 130 enjoy free delivery.",
    },
  ];

  const faqsList = initialFaqs && initialFaqs.length > 0 ? initialFaqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white p-6 sm:p-10 rounded-3xl border border-[#EFEAE3] shadow-xs space-y-6">
      <div className="flex items-center gap-2.5 border-b border-[#EFEAE3] pb-4">
        <HelpCircle className="w-6 h-6 text-terracotta" />
        <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="divide-y divide-[#EFEAE3] border border-[#EFEAE3] rounded-2xl bg-sand/30 overflow-hidden">
        {faqsList.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 hover:bg-sand/70 transition select-none"
                aria-expanded={isOpen}
              >
                <span className="font-sans font-bold text-xs sm:text-sm text-ink pr-2">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-terracotta transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-body leading-relaxed animate-fadeIn">
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
