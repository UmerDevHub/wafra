export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  photos?: string[];
}

export type CategorySlug = "self-care" | "home-ambience" | "everyday-comfort" | "gifting";

export interface SubcategoryConfig {
  name: string;
  slug: string;
}

export interface CategoryConfig {
  slug: CategorySlug;
  name: string;
  description: string;
  heroImage: string;
  subcategories: SubcategoryConfig[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  wasPrice?: string;
  priceNumber?: number;
  rating: number;
  image: string;
  imageHover?: string;
  images?: string[];
  videoUrl?: string;
  description?: string;
  longDescription?: string;
  benefits?: string[];
  problemSolution?: { problem: string; solution: string };
  specs?: { label: string; value: string }[];
  howItWorks?: { step: number; title: string; detail: string }[];
  reviews?: Review[];
  productFaqs?: FAQItem[];
  crossSellSlugs?: string[];
  category?: CategorySlug;
  subcategory?: string;
  categoryName?: string;
  categorySlug?: string;
  stockCount?: number;
  variants?: { name: string; hex: string; image?: string; price?: string }[];
  trending?: boolean;
}

export interface Bundle {
  id: string;
  name: string;
  itemsIncluded: string[];
  bundlePrice: string;
  originalPrice: string;
  saveAmount: string;
  image: string;
  variant?: "default" | "gold";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  isGifting?: boolean;
  subcategories?: { name: string; slug: string }[];
  featuredProductIds?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  quote: string;
  avatar: string;
  productName?: string;
  productThumbnail?: string;
  verified?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
