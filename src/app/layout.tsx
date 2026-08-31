import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import LaunchOfferBanner from "@/components/home/LaunchOfferBanner";
import ExitIntentPopup from "@/components/marketing/ExitIntentPopup";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTopButton from "@/components/ui/BackToTopButton";
import { siteOrganizationSchema } from "@/lib/schema";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wafra — Everyday Comfort & Self-Care Essentials for Modern UAE Living",
  description:
    "Curated self-care, home comfort, and gifting essentials tailored for modern UAE living. Fast 1–3 day delivery to Dubai, Abu Dhabi, Sharjah & all Emirates with Cash on Delivery.",
  keywords: [
    "UAE self-care",
    "Dubai beauty tools",
    "Cash on Delivery UAE",
    "Portable neck fan UAE",
    "Ice roller Dubai",
    "Aroma diffuser UAE",
    "Ayatul Kursi necklace UAE",
    "Wafra store",
  ],
  openGraph: {
    title: "Wafra — Everyday Comfort & Self-Care Essentials for Modern UAE Living",
    description:
      "Curated self-care, home ambience, and cooling essentials for UAE living. Fast 1–3 day delivery across all 7 Emirates with Cash on Delivery.",
    url: "https://wafra.ae",
    siteName: "Wafra",
    images: [
      {
        url: "https://wafra.ae/images/hero-makeup-mirror.webp",
        width: 1200,
        height: 630,
        alt: "Wafra UAE Lifestyle Essentials",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafra UAE — Everyday Comfort & Self-Care",
    description:
      "Curated self-care and home comfort essentials for the UAE climate with Cash on Delivery.",
    images: ["https://wafra.ae/images/hero-makeup-mirror.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} antialiased`}
    >
      <head>
        {/* JSON-LD Organization Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteOrganizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-sand text-ink font-sans selection:bg-terracotta/20 selection:text-ink">
        {/* Top Scroll Percentage Progress Bar */}
        <ScrollProgress />

        <WishlistProvider>
          <CartProvider>
            <AnnouncementBar />
            <LaunchOfferBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <ExitIntentPopup />
            <BackToTopButton />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
