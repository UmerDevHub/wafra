"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Heart } from "lucide-react";
import { categoriesConfig } from "@/lib/data";
import { CategoryConfig } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchOverlay from "../search/SearchOverlay";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function Header({
  cartCount: propCartCount,
  onOpenCart,
}: HeaderProps) {
  const pathname = usePathname();
  const { totalCount, openCart: contextOpenCart } = useCart();
  const { totalWishlistCount } = useWishlist();
  const cartCount = propCartCount !== undefined ? propCartCount : totalCount;
  const handleOpenCart = onOpenCart || contextOpenCart;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryConfig | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (cat: CategoryConfig) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(cat);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCategory(null);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveCategory(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Helper check for active nav route (Prompt 10)
  const isShopAllActive = pathname === "/shop-all";
  const isBundlesActive = pathname === "/bundles-and-offers";

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out border-b ${
          isScrolled
            ? "shadow-[0_4px_20px_rgba(0,0,0,0.04)] border-[#E8DACB]"
            : "shadow-none border-[#E5E1DC]"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative transition-all duration-300 ease-in-out ${
            isScrolled ? "h-16" : "h-16 md:h-20"
          }`}
        >
          {/* Left-Aligned Group: Mobile Menu Trigger + Logo Wordmark */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#1F1B18] hover:text-[#C1663B] transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center -ml-1"
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setActiveCategory(null)}
              className={`font-serif text-[#1F1B18] tracking-tight font-bold hover:opacity-90 transition-all duration-300 ${
                isScrolled ? "text-2xl md:text-3xl" : "text-2xl md:text-4xl"
              }`}
            >
              wafra
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#5B534B]">
            {/* Simple Link: Home */}
            <Link
              href="/"
              onMouseEnter={handleMouseLeave}
              className={`transition hover:text-[#C1663B] ${
                pathname === "/" ? "text-[#C1663B] font-bold border-b-2 border-[#C1663B] pb-0.5" : "text-[#1F1B18] font-semibold"
              }`}
            >
              Home
            </Link>

            {/* Simple Link: Shop All */}
            <Link
              href="/shop-all"
              onMouseEnter={handleMouseLeave}
              className={`transition hover:text-[#C1663B] ${
                isShopAllActive ? "text-[#C1663B] font-bold border-b-2 border-[#C1663B] pb-0.5" : "text-[#5B534B]"
              }`}
            >
              Shop All
            </Link>

            {/* Mega Menu Category Links */}
            {categoriesConfig.map((cat) => {
              const isCategoryActive = pathname === `/collections/${cat.slug}`;
              const isHovered = activeCategory?.slug === cat.slug;
              return (
                <div
                  key={cat.slug}
                  onMouseEnter={() => handleMouseEnter(cat)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative transition-all duration-300 ${
                    isScrolled ? "py-4" : "py-6"
                  }`}
                >
                  <Link
                    href={`/collections/${cat.slug}`}
                    className={`flex items-center gap-1 transition ${
                      isCategoryActive || isHovered
                        ? "text-[#C1663B] font-bold border-b-2 border-[#C1663B] pb-0.5"
                        : "text-[#5B534B] hover:text-[#C1663B]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isHovered ? "rotate-180 text-[#C1663B]" : "opacity-60"
                      }`}
                    />
                  </Link>
                </div>
              );
            })}

            {/* Simple Link: Bundles & Offers */}
            <Link
              href="/bundles-and-offers"
              onMouseEnter={handleMouseLeave}
              className={`transition hover:text-[#C1663B] ${
                isBundlesActive ? "text-[#C1663B] font-bold border-b-2 border-[#C1663B] pb-0.5" : "text-[#5B534B]"
              }`}
            >
              Bundles & Offers
            </Link>
          </nav>

          {/* Header Action Icons (44x44px Touch Targets) */}
          <div className="flex items-center space-x-1 sm:space-x-3 text-[#1F1B18]">
            <button
              onClick={() => {
                setActiveCategory(null);
                setIsSearchOpen(true);
              }}
              aria-label="Search"
              className="p-2.5 sm:p-2 hover:text-[#C1663B] transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            <Link
              href="/wishlist"
              onClick={() => setActiveCategory(null)}
              aria-label="Wishlist"
              className="relative p-2.5 sm:p-2 hover:text-[#C1663B] transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {totalWishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C1663B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalWishlistCount}
                </span>
              )}
            </Link>

            <button
              aria-label="Account"
              className="p-2.5 sm:p-2 hover:text-[#C1663B] transition cursor-pointer min-w-[44px] min-h-[44px] hidden sm:flex items-center justify-center"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={() => {
                setActiveCategory(null);
                handleOpenCart();
              }}
              aria-label="Cart"
              className="relative p-2.5 sm:p-2 hover:text-[#C1663B] transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C1663B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        {activeCategory && (
          <MegaMenu
            category={{
              id: activeCategory.slug,
              name: activeCategory.name,
              slug: activeCategory.slug,
              image: activeCategory.heroImage,
              subcategories: activeCategory.subcategories,
              featuredProductIds: ["neck-fan", "ice-roller", "led-mirror"],
            }}
            isOpen={Boolean(activeCategory)}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </header>

      {/* Mobile Drawer Navigation (Prompt 12) */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={cartCount}
        wishlistCount={totalWishlistCount}
        onOpenCart={handleOpenCart}
      />

      {/* Predictive Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
