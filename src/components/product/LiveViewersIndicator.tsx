"use client";

import React, { useState, useEffect } from "react";

interface LiveViewersIndicatorProps {
  productId?: string;
  initialCount?: number;
}

export default function LiveViewersIndicator({
  productId = "wafra-default",
  initialCount,
}: LiveViewersIndicatorProps) {
  // Stable deterministic seed viewer count (8–17) if backend real-time count is not passed
  const getInitialSeed = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 9 + (Math.abs(hash) % 9);
  };

  const [viewerCount, setViewerCount] = useState<number>(() =>
    initialCount !== undefined ? initialCount : getInitialSeed(productId)
  );

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Subtle, realistic viewer count shift (+1, 0, -1) at randomized intervals (8-15 seconds)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextUpdate = () => {
      const randomDelay = Math.floor(Math.random() * 7000) + 8000;

      timeoutId = setTimeout(() => {
        setViewerCount((prev) => {
          const deltaChoices = [-1, 0, 1, 1, 0, -1];
          const delta = deltaChoices[Math.floor(Math.random() * deltaChoices.length)];
          return Math.min(18, Math.max(8, prev + delta));
        });

        scheduleNextUpdate();
      }, randomDelay);
    };

    scheduleNextUpdate();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 border text-[#065F46] text-xs font-semibold cursor-default select-none my-1 transition-all duration-300 ${
        !prefersReducedMotion ? "animate-glow-1s" : "bg-[#ECFDF5] border-[#A7F3D0]"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`${viewerCount} people are viewing this product right now`}
    >
      {/* Radiant Glowing Circular Dot */}
      <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
        <span
          style={{
            borderRadius: "9999px",
            boxShadow: "0 0 8px rgba(16, 185, 129, 0.9)",
          }}
          className="relative inline-flex h-2.5 w-2.5 bg-[#059669]"
        />
      </span>

      {/* Clean Un-glowing Text */}
      <span className="leading-none text-[11px] sm:text-xs">
        <strong className="font-extrabold text-[#047857]">{viewerCount}</strong>{" "}
        people are viewing this right now
      </span>
    </div>
  );
}
