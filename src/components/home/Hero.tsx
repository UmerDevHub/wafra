"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { bestSellersData } from "@/lib/data";
import PillButton from "../ui/PillButton";

interface HeroProps {
  onShopNow?: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { addItem } = useCart();

  const slides = [
    {
      id: 0,
      badge: "NEW ARRIVAL",
      headline: "Your Glow Routine, Elevated.",
      subtitle: "Salon-quality lighting, right at your vanity.",
      image: "/images/hero-makeup-mirror.webp",
      buttonText: "Shop Now",
      productIndex: 2, // LED Makeup Mirror
      mobileObjectPos: "max-sm:object-[70%_center]",
    },
    {
      id: 1,
      badge: "UAE SUMMER ESSENTIAL",
      headline: "Beat The Heat Anywhere, Anytime.",
      subtitle: "Hands-free cooling tailored for the UAE climate.",
      image: "/images/hero-neck-fan.webp",
      buttonText: "Shop Cooling",
      productIndex: 0, // Neck Fan
      mobileObjectPos: "max-sm:object-[88%_center]",
    },
    {
      id: 2,
      badge: "CRYO SKINCARE THERAPY",
      headline: "Instant Depuff & Morning Glow.",
      subtitle: "Freeze away puffiness and awaken tired skin in 5 minutes.",
      image: "/images/hero-ice-roller.webp",
      buttonText: "Shop Glow Roller",
      productIndex: 1, // Face Glow Ice Roller
      mobileObjectPos: "max-sm:object-[70%_center] sm:object-[80%_center]",
    },
  ];

  // Auto-advance carousel every 2.5 SECONDS (2500ms) across all 3 slides cleanly
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -50) {
      setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    setTouchStartX(null);
  };

  const handleHeroCta = () => {
    if (onShopNow) {
      onShopNow();
    } else {
      const pIdx = slides[activeSlide].productIndex;
      const productToAdd = bestSellersData[pIdx] || bestSellersData[0];
      addItem(productToAdd, 1);
    }
  };

  return (
    <section
      id="hero-section"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[500px] sm:h-[580px] md:h-[650px] overflow-hidden select-none bg-[#1F1B18]"
    >
      {/* Smooth Sliding Image Track for All 3 Slides */}
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full min-w-full basis-full shrink-0 flex-none h-full overflow-hidden"
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover ${slide.mobileObjectPos} sm:object-center`}
            />
            {/* Dark Warm Gradient Overlay - Tuned for mobile typography readability & product visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F1B18]/95 via-[#1F1B18]/70 to-[#1F1B18]/15 sm:to-transparent" />
          </div>
        ))}
      </div>

      {/* Floating Slide Text Content */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-[280px] sm:max-w-xl text-white space-y-3 sm:space-y-4 pointer-events-auto">
          <span
            key={`badge-${activeSlide}`}
            className="inline-block text-[#C9A24B] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase animate-fadeIn"
          >
            {slides[activeSlide].badge}
          </span>

          <h1
            key={`title-${activeSlide}`}
            className="font-serif text-2xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-white tracking-tight animate-fadeIn"
          >
            {slides[activeSlide].headline}
          </h1>

          <p
            key={`sub-${activeSlide}`}
            className="text-white/85 text-xs sm:text-lg font-light max-w-md animate-fadeIn"
          >
            {slides[activeSlide].subtitle}
          </p>

          <div className="pt-1.5 sm:pt-2">
            <PillButton variant="primary" onClick={handleHeroCta}>
              {slides[activeSlide].buttonText}
            </PillButton>
          </div>

          <p className="text-[10px] sm:text-xs text-white/75 tracking-wide pt-0.5">
            Fast 1–3 Day UAE Delivery · Cash on Delivery Available
          </p>
        </div>
      </div>

      {/* Interactive Carousel Progress Bar Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 transition-all duration-300 cursor-pointer ${
              activeSlide === i
                ? "w-8 bg-[#C1663B]"
                : "w-2.5 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
