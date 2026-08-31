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
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EFEAE3] overflow-hidden animate-fadeIn z-10">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-body hover:text-ink hover:bg-white transition shadow-xs"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: Image on Desktop */}
          <div className="hidden md:block md:col-span-5 relative bg-sand min-h-[380px]">
            <Image
              src="/images/hero-makeup-mirror.webp"
              alt="Wafra Lifestyle"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
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
                <div className="w-12 h-12 rounded-full bg-sage/20 text-sage flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-sage" />
                </div>
                <h3 className="font-serif text-2xl text-ink font-bold">
                  Coupon Code: WELCOME10
                </h3>
                <p className="text-xs text-body">
                  Your 10% discount code has been applied. Enjoy complimentary fast delivery across the UAE!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exclusive UAE Welcome Offer</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-tight">
                    Wait — Take 10% Off Your First Order
                  </h3>
                  <p className="text-xs sm:text-sm text-body mt-2 leading-relaxed">
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
                    className="w-full bg-sand border border-[#EFEAE3] rounded-full px-4 py-3 text-xs sm:text-sm text-ink placeholder:text-body/60 focus:outline-none focus:border-terracotta transition"
                  />

                  <button
                    type="submit"
                    className="w-full bg-terracotta hover:bg-[#B35F3C] text-white py-3 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <span>Claim My 10% Discount</span>
                    <ArrowRight className="w-4 h-4" />
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
