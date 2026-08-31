"use client";

import React, { useState, FormEvent } from "react";
import { Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="bg-terracotta text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Serif Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-tight">
          Everyday Comfort, Delivered to Your Door.
        </h2>

        {/* Subtext */}
        <p className="text-white/90 text-sm sm:text-base">
          Join our list and get 10% off your first order.
        </p>

        {/* Form or Success State */}
        {isSubmitted ? (
          <div className="bg-white/20 backdrop-blur-md text-white py-3.5 px-6 border border-white/40 inline-flex items-center gap-2 text-sm font-medium">
            <Check className="w-4 h-4 text-white stroke-[2]" />
            <span>Welcome to the Wafra family! 10% discount code sent.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-72 px-5 py-3.5 bg-white text-[#1F1B18] text-sm placeholder:text-[#5B534B]/60 border border-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1F1B18] hover:bg-black text-white px-7 py-3.5 font-bold uppercase tracking-wider text-xs sm:text-sm border border-[#1F1B18] transition shadow-md whitespace-nowrap btn-tactile cursor-pointer"
            >
              Get 10% Off
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
