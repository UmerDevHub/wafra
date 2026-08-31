import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Shop */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">Shop</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/category/self-care-beauty" className="hover:text-white transition">
                  Self-Care & Beauty
                </Link>
              </li>
              <li>
                <Link href="/category/home-ambience" className="hover:text-white transition">
                  Home Ambience
                </Link>
              </li>
              <li>
                <Link href="/category/everyday-comfort" className="hover:text-white transition">
                  Everyday Comfort
                </Link>
              </li>
              <li>
                <Link href="/category/gifting" className="hover:text-white transition">
                  Gifting
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="hover:text-white transition">
                  Bundles & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">Help</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/track" className="hover:text-white transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">About</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">Connect</h4>
            <div className="flex items-center space-x-3 text-white/80 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="TikTok"
              >
                <span className="text-xs font-bold">TikTok</span>
              </a>
              <a
                href="https://wa.me/971500000000"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-terracotta text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <span>💵</span>
              <span>100% Cash on Delivery (COD) Only</span>
            </span>
          </div>

          <p className="text-xs text-white/50">
            © 2026 wafra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
