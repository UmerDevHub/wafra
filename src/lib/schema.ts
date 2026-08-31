import { bestSellersData } from "./data";

export const siteOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wafra",
  url: "https://wafra.ae",
  logo: "https://wafra.ae/images/category-selfcare.jpg",
  description:
    "Curated self-care, home ambience, and everyday lifestyle comfort essentials for modern UAE living with fast Cash on Delivery.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AE",
    addressRegion: "Dubai",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://wafra.ae/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const homepageProductsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: bestSellersData.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.name,
      image: `https://wafra.ae${product.image}`,
      description: product.description,
      sku: product.id,
      brand: {
        "@type": "Brand",
        name: "Wafra",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "AED",
        price: product.priceNumber || 89,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        priceValidUntil: "2026-12-31",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: 124,
      },
    },
  })),
};

export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images
      ? product.images.map((img: string) => `https://wafra.ae${img}`)
      : [`https://wafra.ae${product.image}`],
    description: product.description || product.longDescription,
    sku: product.id,
    mpn: product.slug,
    brand: {
      "@type": "Brand",
      name: "Wafra",
    },
    offers: {
      "@type": "Offer",
      url: `https://wafra.ae/products/${product.slug || product.id}`,
      priceCurrency: "AED",
      price: product.priceNumber || 89,
      availability:
        product.stockCount && product.stockCount > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2026-12-31",
      seller: {
        "@type": "Organization",
        name: "Wafra UAE",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviews?.length || 152,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
