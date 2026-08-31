"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if already subscribed or shown in this session
    const isSubscribed = localStorage.getItem("wafra_newsletter_subscribed");
    const isShownThisSession = sessionStorage.getItem("wafra_exit_intent_shown");

    if (isSubscribed || isShownThisSession) {
      return;
    }

    let hasTriggered = false;

    const triggerPopup = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      sessionStorage.setItem("wafra_exit_intent_shown", "true");
      setIsOpen(true);
    };

    // 1. Desktop Exit Intent: Mouse leaves toward top of browser
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        triggerPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    // 2. Mobile: 30 seconds timer trigger
    const timer = setTimeout(() => {
      triggerPopup();
    }, 30000);

    // 3. Mobile: 60% scroll depth trigger
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        if (scrollPercent >= 60) {
          triggerPopup();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    localStorage.setItem("wafra_newsletter_subscribed", "true");
    setIsSubmitted(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 2800);
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Dimmed Overlay */}
      <div
        onClick={handleDismiss}
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity duration-200"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E1DC] shadow-2xl overflow-hidden animate-fadeIn z-10">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 p-2 bg-white text-[#5B534B] hover:text-[#1F1B18] border border-[#E5E1DC] transition cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Image on Desktop */}
          <div className="hidden md:block md:col-span-5 relative bg-[#FAF6F1] min-h-[380px]">
            <Image
              src="/images/hero-makeup-mirror.webp"
              alt="Wafra Lifestyle"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B18]/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A24B]">
                Member Privilege
              </span>
              <p className="font-serif text-lg leading-tight mt-1">
                Everyday Comfort & Self-Care
              </p>
            </div>
          </div>

          {/* Right Column: Form & Copy */}
          <div className="col-span-12 md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#8A9A7E]/20 text-[#8A9A7E] flex items-center justify-center mx-auto border border-[#8A9A7E]/40">
                  <CheckCircle2 className="w-7 h-7 text-[#8A9A7E] stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl text-[#1F1B18] font-bold">
                  Coupon Code: WELCOME10
                </h3>
                <p className="text-xs text-[#5B534B]">
                  Your 10% discount code has been applied. Enjoy complimentary fast delivery across the UAE!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF0EB] border border-[#F5D5C6] text-[#C1663B] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Exclusive UAE Welcome Offer</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1B18] font-normal leading-tight">
                    Wait — Take 10% Off Your First Order
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B534B] mt-2 leading-relaxed">
                    Join over 8,000+ UAE households. Enter your email for an instant 10% discount code + early access to Ramadan & Eid drops.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#FAF6F1] border border-[#E5E1DC] px-4 py-3 text-xs sm:text-sm text-[#1F1B18] placeholder:text-[#5B534B]/60 focus:outline-none focus:border-[#C1663B] transition"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#C1663B] hover:bg-[#A8552E] text-white py-3.5 font-bold uppercase tracking-wider text-xs sm:text-sm border border-[#C1663B] shadow-[0_4px_14px_rgba(193,102,59,0.25)] transition flex items-center justify-center gap-2 btn-tactile cursor-pointer"
                  >
                    <span>Claim My 10% Discount</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </form>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-body/70 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage" /> No spam. Unsubscribe anytime.
                  </span>
                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="text-[11px] text-body/60 hover:text-ink transition hover:underline"
                  >
                    No thanks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
