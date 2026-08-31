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
    <div className="bg-sand border-b border-[#EFEAE3] py-2 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-ink">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>Launch Celebration Offers</span>
        </div>

        <span className="hidden sm:inline text-body/40">·</span>

        <div className="flex items-center gap-2 font-medium">
          <Clock className="w-3.5 h-3.5 text-body/70" />
          <span className="text-body">Launch Special Ends In:</span>
          <div className="flex items-center gap-1 font-bold text-terracotta">
            <span className="bg-white px-1.5 py-0.5 rounded border border-[#E8DACB] shadow-2xs">
              {timeLeft.days}d
            </span>
            <span>:</span>
            <span className="bg-white px-1.5 py-0.5 rounded border border-[#E8DACB] shadow-2xs">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span>:</span>
            <span className="bg-white px-1.5 py-0.5 rounded border border-[#E8DACB] shadow-2xs">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span>:</span>
            <span className="bg-white px-1.5 py-0.5 rounded border border-[#E8DACB] shadow-2xs">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
