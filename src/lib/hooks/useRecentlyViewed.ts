"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "wafra_recently_viewed";
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setRecentlyViewedIds(JSON.parse(saved));
      }
    } catch {
      setRecentlyViewedIds([]);
    }
    setIsInitialized(true);
  }, []);

  // Add a product ID to recently viewed (most-recent-first, max 8 items)
  const addProductToRecentlyViewed = useCallback((productId: string) => {
    if (!productId) return;

    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Handle quota or private mode error gracefully
      }
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  return {
    recentlyViewedIds,
    addProductToRecentlyViewed,
    clearRecentlyViewed,
    isInitialized,
  };
}
