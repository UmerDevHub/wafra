"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";
import { LAUNCH_OFFER_END_DATE } from "@/lib/data";

/**
 * GENUINE LAUNCH COUNTDOWN BANNER (UAE Consumer Protection Compliant)
 * 
 * NOTE: Under UAE Consumer Protection regulations (Federal Law No. 15/2020),
 * countdown timers must reflect a genuine time-limited offer with a fixed date.
 * This timer calculates the remaining time to LAUNCH_OFFER_END_DATE and will
 * NEVER reset per visitor/browser session.
 */
export default function LaunchOfferBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = LAUNCH_OFFER_END_DATE.getTime() - new Date().getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || timeLeft.isExpired) {
    return null;
  }

  return (
    <div className="bg-[#FAF6F1] border-b border-[#E5E1DC] py-1.5 sm:py-2 px-3 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-xs sm:text-sm text-[#1F1B18]">
        {/* Mobile View: Concise, Single Clean Line */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] font-medium">
          <Sparkles className="w-3 h-3 text-[#C1663B] shrink-0" />
          <span className="font-bold text-[#1F1B18] whitespace-nowrap">Launch Ends:</span>
          <div className="flex items-center gap-0.5 font-bold text-[#C1663B] text-[10px]">
            <span className="bg-white px-1 py-0.5 border border-[#E5E1DC] leading-none">
              {timeLeft.days}d
            </span>
            <span className="text-[#6E675F]">:</span>
            <span className="bg-white px-1 py-0.5 border border-[#E5E1DC] leading-none">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span className="text-[#6E675F]">:</span>
            <span className="bg-white px-1 py-0.5 border border-[#E5E1DC] leading-none">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span className="text-[#6E675F]">:</span>
            <span className="bg-white px-1 py-0.5 border border-[#E5E1DC] leading-none">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Desktop View: Full Spacious Layout */}
        <div className="hidden sm:flex items-center justify-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C1663B]" />
            <span className="font-semibold">Launch Celebration Offers</span>
          </div>

          <span className="text-[#6E675F]/50">·</span>

          <div className="flex items-center gap-2 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#6E675F]" />
            <span className="text-[#6E675F]">Launch Special Ends In:</span>
            <div className="flex items-center gap-1 font-bold text-[#C1663B] text-xs">
              <span className="bg-white px-1.5 py-0.5 border border-[#E5E1DC]">
                {timeLeft.days}d
              </span>
              <span>:</span>
              <span className="bg-white px-1.5 py-0.5 border border-[#E5E1DC]">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="bg-white px-1.5 py-0.5 border border-[#E5E1DC]">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="bg-white px-1.5 py-0.5 border border-[#E5E1DC]">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
