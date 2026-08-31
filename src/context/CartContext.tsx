"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Product } from "@/lib/types";
import { bestSellersData, trendingProductsData, FREE_SHIPPING_THRESHOLD } from "@/lib/data";

// All products indexed by id for fast lookup
const ALL_PRODUCTS_MAP: Record<string, Product> = [...bestSellersData, ...trendingProductsData].reduce(
  (acc, p) => { acc[p.id] = p; return acc; },
  {} as Record<string, Product>
);

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial 2 items matching mockup's cart badge ("2")
const INITIAL_MOCK_ITEMS: CartItem[] = [
  {
    product: bestSellersData[2], // Touch Screen LED Makeup Mirror (AED 89)
    quantity: 1,
  },
  {
    product: bestSellersData[0], // Portable USB Neck Fan (AED 89)
    quantity: 1,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_MOCK_ITEMS);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem("wafra_cart_state");
    if (saved) {
      try {
        const parsed: CartItem[] = JSON.parse(saved);
        // Re-merge with fresh product data so stale image paths (e.g. .jpg → .webp) are never used
        const refreshed = parsed
          .map((item) => {
            const freshProduct = ALL_PRODUCTS_MAP[item.product.id];
            return freshProduct ? { product: freshProduct, quantity: item.quantity } : null;
          })
          .filter(Boolean) as CartItem[];
        setItems(refreshed.length > 0 ? refreshed : INITIAL_MOCK_ITEMS);
      } catch {
        setItems(INITIAL_MOCK_ITEMS);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever items change (after initial hydration)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wafra_cart_state", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  // Helper to extract numerical price from string like "AED 89" or product.priceNumber
  const getProductPrice = (product: Product): number => {
    if (product.priceNumber) return product.priceNumber;
    const num = parseInt(product.price.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 89 : num;
  };

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...prevItems, { product, quantity }];
    });

    // Auto-open drawer when adding an item
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + getProductPrice(item.product) * item.quantity;
    }, 0);
  }, [items]);

  const amountNeededForFreeShipping = useMemo(() => {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  }, [subtotal]);

  const freeShippingProgress = useMemo(() => {
    return Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  }, [subtotal]);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        amountNeededForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
