import { Product, Bundle, Category, Testimonial, FAQItem, CategoryConfig } from "./types";

export const FREE_SHIPPING_THRESHOLD = 130; // AED 130 free shipping threshold across UAE

export const LAUNCH_OFFER_END_DATE = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

export interface PromoCode {
  code: string;
  type: "percent" | "fixed";
  value: number;
}

export const promoCodesData: PromoCode[] = [
  { code: "WELCOME10", type: "percent", value: 10 },
  { code: "WAFRA20", type: "percent", value: 20 },
  { code: "SAVE20", type: "fixed", value: 20 },
  { code: "FREESHIP", type: "fixed", value: 15 },
];

export const categoriesConfig: CategoryConfig[] = [
  {
    slug: "self-care",
    name: "Self-Care & Beauty",
    description: "Spa-grade vanity mirrors, cryo ice rollers, and personal glow essentials for daily wellness.",
    heroImage: "/images/category-selfcare.webp",
    subcategories: [
      { name: "Face Care & Rollers", slug: "face-care" },
      { name: "LED Makeup Mirrors", slug: "makeup-mirrors" },
      { name: "Hair Styling Tools", slug: "hair-tools" },
      { name: "Daily Glow Sets", slug: "glow-sets" },
    ],
  },
  {
    slug: "home-ambience",
    name: "Home Ambience",
    description: "Ultrasonic aromatherapy diffusers, sunset projection lamps, and calming interior scents.",
    heroImage: "/images/category-home-ambience.webp",
    subcategories: [
      { name: "Ultrasonic Diffusers", slug: "diffusers" },
      { name: "Mini Humidifiers", slug: "humidifiers" },
      { name: "Sunset & Ambient Lighting", slug: "ambient-lighting" },
      { name: "Aromatherapy Oils", slug: "essential-oils" },
    ],
  },
  {
    slug: "everyday-comfort",
    name: "Everyday Comfort",
    description: "Portable wearable neck fans, commute companions, and cooling relief for the UAE lifestyle.",
    heroImage: "/images/category-everyday-comfort.webp",
    subcategories: [
      { name: "Portable Neck Fans", slug: "cooling" },
      { name: "Commute & Car Essentials", slug: "on-the-go" },
      { name: "Posture & Desk Wellness", slug: "wellness" },
      { name: "Heat Relief Accessories", slug: "heat-relief" },
    ],
  },
  {
    slug: "gifting",
    name: "Gifting",
    description: "Blessed Ayatul Kursi jewelry, luxury gift boxes, and thoughtful keepsakes for Eid & Ramadan.",
    heroImage: "/images/category-gifting.webp",
    subcategories: [
      { name: "Ayatul Kursi & Faith Jewelry", slug: "faith-jewelry" },
      { name: "Attar & Perfume Oil Sets", slug: "attar-perfume" },
      { name: "Magnetic Hijab Accessories", slug: "modest-accessories" },
      { name: "Eid & Ramadan Gift Boxes", slug: "ramadan-eid" },
    ],
  },
];

export const bestSellersData: Product[] = [
  {
    id: "neck-fan",
    slug: "portable-usb-neck-fan",
    name: "Portable USB Neck Fan",
    price: "AED 89",
    wasPrice: "AED 129",
    priceNumber: 89,
    rating: 5,
    image: "/images/product-neck-fan.webp",
    imageHover: "/images/hero-neck-fan.webp",
    images: [
      "/images/product-neck-fan.webp",
      "/images/hero-neck-fan.webp",
      "/images/category-everyday-comfort.webp",
      "/images/bundle-on-the-go.webp",
    ],
    videoUrl: "/videos/demo-neck-fan.mp4",
    crossSellSlugs: ["sunset-projection-lamp", "essential-oil-aroma-diffuser"],
    category: "everyday-comfort",
    subcategory: "cooling",
    categoryName: "Everyday Comfort",
    categorySlug: "everyday-comfort",
    stockCount: 7,
    variants: [
      { name: "Desert Sage", hex: "#2E473B", image: "/images/product-neck-fan.webp" },
      { name: "Arctic White", hex: "#FFFFFF", image: "/images/product-neck-fan.webp" },
      { name: "Midnight Ink", hex: "#2B2420", image: "/images/hero-neck-fan.webp" },
    ],
    description:
      "Hands-free bladeless neck fan engineered with 3 whisper-quiet speed settings. Delivers instant 360° airflow relief from the intense UAE summer heat.",
    longDescription:
      "Designed specifically for the demanding UAE summer climate, the Portable USB Neck Fan is your personal cooling sanctuary wherever you go. Whether walking through outdoor plazas in Dubai, commuting between meetings, or enjoying weekend family strolls, this hands-free wearable fan delivers continuous refreshing airflow directly around your neck and face.\n\nFeaturing advanced dual-turbine bladeless technology, it provides 360° air distribution through 78 targeted air outlets without ever catching or pulling your hair. The ultra-lightweight ergonomic neckband rests weightlessly on your shoulders, while the high-capacity 4000mAh rechargeable lithium battery ensures up to 8 hours of uninterrupted cooling relief on a single USB-C charge.",
    benefits: [
      "Stays cool for up to 8 hours continuously on a single USB charge",
      "Bladeless 360° surround air outlets protect hair from tangling",
      "Whisper-quiet dual turbine motor operates silently under 30dB",
      "Ergonomic weightless collar designed for outdoor UAE commutes",
    ],
    problemSolution: {
      problem: "Sweltering UAE heat and humidity make outdoor walks, errands, and commutes uncomfortable.",
      solution: "This hands-free neck fan wraps your collar in a 360° refreshing ice breeze, keeping you instantly cool without holding a device.",
    },
    specs: [
      { label: "Battery Capacity", value: "4000mAh Lithium-ion" },
      { label: "Operating Time", value: "3 – 8 Hours (Speed Dependent)" },
      { label: "Charging Port", value: "USB Type-C Fast Charge" },
      { label: "Weight", value: "260 grams" },
      { label: "Noise Level", value: "Whisper quiet (< 30dB)" },
    ],
    howItWorks: [
      { step: 1, title: "Charge Up", detail: "Connect via included USB-C cable for 2 hours for a full charge." },
      { step: 2, title: "Wear Comfortably", detail: "Place the flexible collar comfortably around your neck." },
      { step: 3, title: "Press & Cool", detail: "Click the single touch button to switch between 3 instant wind speeds." },
    ],
    reviews: [
      {
        id: "rev-fan-1",
        author: "Omar Al-Mansoor",
        city: "Dubai, Downtown",
        rating: 5,
        date: "2 days ago",
        verified: true,
        title: "Absolute lifesaver for Dubai outdoor weather!",
        content: "I wear this while walking from my car to my office and during weekend golf rounds. The 360 air breeze keeps my neck cool without blowing in my eyes. Battery easily lasts 2 days of intermittent use.",
        photos: ["/images/hero-neck-fan.webp"],
      },
      {
        id: "rev-fan-2",
        author: "Mariam K.",
        city: "Abu Dhabi, Yas Island",
        rating: 5,
        date: "1 week ago",
        verified: true,
        title: "Super quiet and hair friendly",
        content: "I was worried about long hair getting caught in the blades, but this is 100% bladeless so zero issues! Light on shoulders and delivered to Abu Dhabi in 24 hours.",
        photos: ["/images/product-neck-fan.webp"],
      },
      {
        id: "rev-fan-3",
        author: "Tariq S.",
        city: "Sharjah, Al Majaz",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        title: "Excellent COD delivery",
        content: "Paid Cash on Delivery. Courier arrived on time and product quality feels matte metallic and premium.",
      },
      {
        id: "rev-fan-4",
        author: "Hessa Al-Nuaimi",
        city: "Dubai Marina",
        rating: 4,
        date: "3 weeks ago",
        verified: true,
        title: "Keeps me cool on outdoor walks",
        content: "Speed 3 is very powerful. Battery takes about 2 hours to fully charge via USB-C. Highly recommended for UAE summer.",
      },
    ],
    productFaqs: [
      {
        question: "How long does the battery last on a full charge?",
        answer: "The built-in 4000mAh battery lasts up to 8 hours on low speed, 5 hours on medium speed, and 3 hours on maximum speed.",
      },
      {
        question: "Is this safe for long hair?",
        answer: "Yes, 100%! The fan uses an enclosed bladeless turbine design with micro-mesh intake vents, preventing any hair tangling.",
      },
      {
        question: "How do I pay with Cash on Delivery?",
        answer: "Simply place your order online without entering credit card details. You pay the exact amount in cash directly to the courier upon delivery.",
      },
      {
        question: "How can I contact customer support?",
        answer: "Our dedicated UAE customer support team is available via WhatsApp to assist with fast order tracking, delivery scheduling, and questions.",
      },
    ],
  },
  {
    id: "ice-roller",
    slug: "face-glow-ice-roller",
    name: "Face Glow Ice Roller",
    price: "AED 79",
    wasPrice: "AED 129",
    priceNumber: 79,
    rating: 5,
    image: "/images/product-ice-roller.webp",
    imageHover: "/images/hero-ice-roller.webp",
    images: [
      "/images/product-ice-roller.webp",
      "/images/hero-ice-roller.webp",
      "/images/category-selfcare.webp",
      "/images/bundle-glow-routine.webp",
    ],
    category: "self-care",
    subcategory: "face-care",
    categoryName: "Self-Care & Beauty",
    categorySlug: "self-care-beauty",
    stockCount: 5,
    variants: [
      { name: "Blush Pink", hex: "#E5A9A9", image: "/images/product-ice-roller.webp" },
      { name: "Rose Gold", hex: "#C9714D", image: "/images/product-ice-roller.webp" },
    ],
    description:
      "Spa-grade silicone facial ice contour roller pod that stays cold longer to depuff, tighten pores, and awaken tired skin. The ultimate 5-minute morning glow ritual.",
    longDescription:
      "Transform your morning skincare routine with the Face Glow Ice Roller Pod. Crafted from food-grade BPA-free silicone, this cryotherapy tool holds frozen ice water infused with your favorite natural botanical ingredients—such as cucumber water, rose water, or green tea leaves—to deliver immediate lymphatic drainage and skin tightening.\n\nRolling cryogenic cold over your cheekbones, jawline, and under-eye area constricts blood vessels, instantly draining fluid buildup, reducing puffiness, tightening pores, and boosting natural circulation for a radiant, dew-fresh morning complexion in just 5 minutes.",
    benefits: [
      "Erases morning face puffiness and under-eye bags in 5 minutes",
      "Tightens visible pores and contours cheekbones naturally",
      "Customizable cryo recipes — infuse with rose water, tea, or lemon",
      "Leak-proof food-grade silicone pod reusable infinitely",
    ],
    problemSolution: {
      problem: "Waking up with puffy eyes, dull skin, or facial fluid retention after sleep or flight travel.",
      solution: "Gliding this frozen cryo roller over your skin instantly drains lymphatic fluid and tightens pores for a glowing fresh face.",
    },
    specs: [
      { label: "Material", value: "BPA-Free Food-Grade Silicone" },
      { label: "Dimensions", value: "115mm x 62mm" },
      { label: "Freezing Time", value: "4 Hours in Freezer" },
      { label: "Weight", value: "140g empty" },
    ],
    howItWorks: [
      { step: 1, title: "Fill & Infuse", detail: "Fill 90% full with water and your favorite skincare botanical ingredients." },
      { step: 2, title: "Freeze Solid", detail: "Place upright in freezer for 4 hours until completely solid." },
      { step: 3, title: "Roll & Depuff", detail: "Rinse under warm water for 30s, open lid, and glide over clean face in upward strokes." },
    ],
  },
  {
    id: "led-mirror",
    slug: "touch-screen-led-makeup-mirror",
    name: "Touch Screen LED Makeup Mirror",
    price: "AED 109",
    priceNumber: 109,
    rating: 5,
    image: "/images/product-makeup-mirror.webp",
    imageHover: "/images/hero-makeup-mirror.webp",
    images: [
      "/images/product-makeup-mirror.webp",
      "/images/hero-makeup-mirror.webp",
      "/images/category-selfcare.webp",
      "/images/bundle-glow-routine.webp",
    ],
    category: "self-care",
    subcategory: "makeup-mirrors",
    categoryName: "Self-Care & Beauty",
    categorySlug: "self-care-beauty",
    stockCount: 5,
    variants: [
      { name: "Pearl White", hex: "#FFFFFF", image: "/images/product-makeup-mirror.webp" },
      { name: "Soft Blush", hex: "#E5B8AF", image: "/images/hero-makeup-mirror.webp" },
    ],
    description:
      "Studio-grade vanity mirror featuring 3 touch-switch light modes (daylight, warm, cool) and 10x detail panel. Guarantees flawless, true-color makeup application every time.",
    longDescription:
      "Achieve studio-perfect makeup blending anywhere with the Touch Screen LED Makeup Mirror. Engineered with 72 high-definition smart LED light beads surrounding the border, this sleek vanity mirror accurately replicates natural sunlight, warm ambient lighting, and cool evening lighting at a single tap.\n\nThe sensitive touch-screen button allows seamless dimming and color temperature switching, ensuring your foundation color match and eyeliner application remain flawless under every lighting condition. Its ultra-slim folding pedestal stand makes it effortless to pack for travel or display on your bedroom vanity.",
    benefits: [
      "Simulates true sunlight so foundation blending never looks patchy",
      "3 Touch-switch color modes (Daylight, Warm Glow, Evening Cool)",
      "Touch-dimmable brightness with smart memory setting",
      "Foldable ultra-slim design ideal for vanity desks and travel",
    ],
    problemSolution: {
      problem: "Poor indoor bedroom lighting leads to uneven foundation blending, harsh bronzer, and incorrect color matching.",
      solution: "Studio-grade 72 LED perimeter light ring casts true daylight illumination directly onto your face for 100% accurate makeup application.",
    },
    specs: [
      { label: "Lighting", value: "72 HD Smart LED Light Beads" },
      { label: "Battery", value: "1000mAh Rechargeable" },
      { label: "Rotation", value: "90° Free Angle Adjustment" },
      { label: "Dimensions", value: "238mm x 168mm x 25mm" },
    ],
    howItWorks: [
      { step: 1, title: "Unfold Stand", detail: "Adjust the flexible pedestal stand to your preferred viewing angle." },
      { step: 2, title: "Tap to Light", detail: "Tap the touch circle on the mirror glass to switch between 3 light temperatures." },
      { step: 3, title: "Hold to Dim", detail: "Press and hold the touch button to adjust brightness to your exact preference." },
    ],
  },
  {
    id: "aroma-diffuser",
    slug: "essential-oil-aroma-diffuser",
    name: "Essential Oil Aroma Diffuser",
    price: "AED 69",
    priceNumber: 69,
    rating: 5,
    image: "/images/product-aroma-diffuser.webp",
    imageHover: "/images/category-home-ambience.webp",
    images: [
      "/images/product-aroma-diffuser.webp",
      "/images/category-home-ambience.webp",
      "/images/bundle-calm-home.webp",
      "/images/product-sunset-lamp.webp",
    ],
    category: "home-ambience",
    subcategory: "diffusers",
    categoryName: "Home Ambience",
    categorySlug: "home-ambience",
    stockCount: 18,
    variants: [
      { name: "Natural Walnut", hex: "#8A5D3B", image: "/images/product-aroma-diffuser.webp" },
      { name: "Zen White", hex: "#FFFFFF", image: "/images/category-home-ambience.webp" },
    ],
    description:
      "Ultrasonic 300ml cool-mist diffuser with 7 ambient LED mood colors and whisper-quiet motor. Fills your bedroom or living space with natural calming fragrance.",
    longDescription:
      "Elevate your home environment into a soothing wellness sanctuary with the Essential Oil Aroma Diffuser. Utilizing high-frequency 2.4MHz ultrasonic wave technology, it breaks down water and 100% natural essential oils into micro-fine mist particles without heating, preserving the natural therapeutic aroma.\n\nFeaturing a generous 300ml water capacity, 4 timer settings, and 7 ambient LED light colors, it humidifies dry AC air while enveloping your bedroom or office space in relaxing scents like lavender, eucalyptus, or oud.",
    benefits: [
      "Humidifies dry indoor air while scenting rooms up to 300 sq ft",
      "7 Soft mood LED lighting colors double as a soothing nightlight",
      "Ultrasonic whisper-quiet operation under 25dB for peaceful sleep",
      "Auto shut-off activates instantly when water runs empty",
    ],
    problemSolution: {
      problem: "Dry air-conditioned UAE indoor rooms cause dry skin, nasal congestion, and stagnant odors.",
      solution: "Adds soothing cool humidity and therapeutic essential oil mist into the air for restful sleep and refreshing home scent.",
    },
    specs: [
      { label: "Capacity", value: "300ml Water Tank" },
      { label: "Timer Modes", value: "1H / 3H / 6H / Continuous" },
      { label: "Noise Level", value: "< 25dB Ultra Quiet" },
      { label: "Power Source", value: "AC 100-240V Adapter" },
    ],
    howItWorks: [
      { step: 1, title: "Add Water", detail: "Fill the 300ml tank with clean tap or distilled water." },
      { step: 2, title: "Add Oil", detail: "Drop 3–5 drops of your favorite essential oil into the water." },
      { step: 3, title: "Turn On", detail: "Press the MIST button to select timer and LIGHT button for ambient glow." },
    ],
  },
  {
    id: "bar-necklace",
    slug: "ayatul-kursi-bar-necklace",
    name: "Ayatul Kursi Bar Necklace",
    price: "AED 99",
    priceNumber: 99,
    rating: 5,
    image: "/images/product-bar-necklace.webp",
    imageHover: "/images/category-gifting.webp",
    images: [
      "/images/product-bar-necklace.webp",
      "/images/category-gifting.webp",
      "/images/bundle-gifting-set.webp",
      "/images/product-bar-necklace.webp",
    ],
    category: "gifting",
    subcategory: "faith-jewelry",
    categoryName: "Gifting",
    categorySlug: "gifting",
    stockCount: 4,
    variants: [
      { name: "18K Gold Plated", hex: "#C9A24B", image: "/images/product-bar-necklace.webp" },
      { name: "Sterling Silver", hex: "#D8D8D8", image: "/images/category-gifting.webp" },
      { name: "Rose Gold", hex: "#B76E79", image: "/images/product-bar-necklace.webp" },
    ],
    description:
      "Exquisite 18K gold-plated bar necklace engraved with the blessed Ayatul Kursi verse. Ships in luxury gift packaging, perfect for Ramadan and Eid gifting.",
    longDescription:
      "Keep divine protection and elegance close to your heart with the Ayatul Kursi Bar Necklace. Meticulously laser-engraved with the complete Arabic calligraphy of Ayatul Kursi (Verse of the Throne), this piece combines spiritual reverence with modern jewelry design.\n\nForged from medical-grade 316L stainless steel and finished in thick 18K gold vacuum plating, it is 100% tarnish-resistant, waterproof, and hypoallergenic for everyday wear. Delivered in a signature velvet luxury gift box.",
    benefits: [
      "100% Tarnish-resistant & waterproof — never turns skin green",
      "Laser engraved Arabic calligraphy of the blessed Ayatul Kursi verse",
      "Hypoallergenic 316L stainless steel base gentle on sensitive skin",
      "Comes in luxury velvet gift packaging ready for Ramadan & Eid gifting",
    ],
    problemSolution: {
      problem: "Finding meaningful Islamic jewelry that looks modern, elegant, and withstands daily wear without fading.",
      solution: "Combines 18K gold vacuum-plated durability with exquisite laser calligraphy of Ayatul Kursi for a timeless keepsake.",
    },
    specs: [
      { label: "Pendant Size", value: "40mm x 5mm" },
      { label: "Chain Length", value: "45cm + 5cm extension" },
      { label: "Material", value: "316L Stainless Steel, 18K Gold Plated" },
      { label: "Waterproof", value: "Yes (Tarnish Resistant)" },
    ],
    howItWorks: [
      { step: 1, title: "Adjust Length", detail: "Use the 5cm chain extender to match your neckline preference." },
      { step: 2, title: "Wear Daily", detail: "Wear confidently during showers or workouts — 100% waterproof." },
      { step: 3, title: "Gift Elegantly", detail: "Presents in signature luxury velvet box with certificate of authenticity." },
    ],
  },
];

export const trendingProductsData: Product[] = [
  {
    id: "trend-sunset",
    slug: "sunset-projection-lamp",
    name: "Sunset Projection Lamp",
    price: "AED 85",
    priceNumber: 85,
    rating: 5,
    image: "/images/product-sunset-lamp.webp",
    imageHover: "/images/category-home-ambience.webp",
    images: [
      "/images/product-sunset-lamp.webp",
      "/images/category-home-ambience.webp",
      "/images/bundle-calm-home.webp",
      "/images/product-aroma-diffuser.webp",
    ],
    category: "home-ambience",
    subcategory: "ambient-lighting",
    categoryName: "Home Ambience",
    categorySlug: "home-ambience",
    stockCount: 9,
    description:
      "Golden-hour ambient projector lamp with 180° rotation and wooden base to create a warm cinematic vibe at home.",
    benefits: [
      "Casts warm golden hour glow perfect for photos and relax time",
      "180 Degree rotational head allows wall and ceiling projection",
      "Premium crystal lens delivers bright HD color clarity",
      "Energy efficient USB plug-and-play setup",
    ],
    specs: [
      { label: "Height", value: "27cm" },
      { label: "Material", value: "Aluminium & Solid Wood Base" },
      { label: "Power", value: "5W USB Cable with On/Off Switch" },
    ],
    trending: true,
  },
];

export const allProductsData: Product[] = [
  ...bestSellersData,
  ...trendingProductsData,
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProductsData.find((p) => p.slug === slug || p.id === slug);
}

export const categoriesData: Category[] = [
  {
    id: "self-care",
    name: "Self-Care & Beauty",
    slug: "self-care-beauty",
    image: "/images/category-selfcare.webp",
    subcategories: [
      { name: "Face Care & Rollers", slug: "face-care" },
      { name: "LED Makeup Mirrors", slug: "makeup-mirrors" },
      { name: "Hair Styling Tools", slug: "hair-tools" },
      { name: "Daily Glow Sets", slug: "glow-sets" },
    ],
    featuredProductIds: ["ice-roller", "led-mirror", "trend-mirror"],
  },
  {
    id: "home-ambience",
    name: "Home Ambience",
    slug: "home-ambience",
    image: "/images/category-home-ambience.webp",
    subcategories: [
      { name: "Ultrasonic Diffusers", slug: "diffusers" },
      { name: "Mini Humidifiers", slug: "humidifiers" },
      { name: "Sunset & Ambient Lighting", slug: "ambient-lighting" },
      { name: "Aromatherapy Oils", slug: "essential-oils" },
    ],
    featuredProductIds: ["aroma-diffuser", "trend-sunset", "trend-diffuser"],
  },
  {
    id: "everyday-comfort",
    name: "Everyday Comfort",
    slug: "everyday-comfort",
    image: "/images/category-everyday-comfort.webp",
    subcategories: [
      { name: "Portable Neck Fans", slug: "cooling" },
      { name: "Commute & Car Essentials", slug: "on-the-go" },
      { name: "Posture & Desk Wellness", slug: "wellness" },
      { name: "Heat Relief Accessories", slug: "heat-relief" },
    ],
    featuredProductIds: ["neck-fan", "trend-fan", "on-the-go"],
  },
  {
    id: "gifting",
    name: "Gifting",
    slug: "gifting",
    image: "/images/category-gifting.webp",
    isGifting: true,
    subcategories: [
      { name: "Ayatul Kursi & Faith Jewelry", slug: "faith-jewelry" },
      { name: "Attar & Perfume Oil Sets", slug: "attar-perfume" },
      { name: "Magnetic Hijab Accessories", slug: "modest-accessories" },
      { name: "Eid & Ramadan Gift Boxes", slug: "ramadan-eid" },
    ],
    featuredProductIds: ["bar-necklace", "trend-necklace", "gifting-set"],
  },
];

export const bundlesData: Bundle[] = [
  {
    id: "glow-routine",
    name: "Glow Routine",
    itemsIncluded: ["Face Glow Ice Roller", "Touch Screen LED Mirror", "Hair Comb"],
    bundlePrice: "AED 249",
    originalPrice: "AED 357",
    saveAmount: "Save AED 40",
    image: "/images/bundle-glow-routine.webp",
    variant: "default",
  },
  {
    id: "calm-home",
    name: "Calm Home",
    itemsIncluded: ["Aroma Diffuser", "Sunset Lamp", "Mini Humidifier"],
    bundlePrice: "AED 249",
    originalPrice: "AED 357",
    saveAmount: "Save AED 40",
    image: "/images/bundle-calm-home.webp",
    variant: "default",
  },
  {
    id: "gifting-set",
    name: "Gifting Set",
    itemsIncluded: ["Ayatul Kursi Necklace", "Perfume Oil Set", "Hijab Pins"],
    bundlePrice: "AED 249",
    originalPrice: "AED 357",
    saveAmount: "Save AED 40",
    image: "/images/bundle-gifting-set.webp",
    variant: "gold",
  },
  {
    id: "on-the-go",
    name: "On The Go",
    itemsIncluded: ["Neck Fan", "Car Phone Mount"],
    bundlePrice: "AED 249",
    originalPrice: "AED 357",
    saveAmount: "Save AED 40",
    image: "/images/bundle-on-the-go.webp",
    variant: "default",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    name: "Fatima Al-Nuaimi",
    city: "Dubai Marina",
    rating: 5,
    quote: "The Ice Roller is a total game changer! My morning puffiness disappears in 5 minutes. Best self-care tool I've bought in Dubai.",
    avatar: "/images/avatar-fatima.webp",
    productName: "Face Glow Ice Roller",
    productThumbnail: "/images/product-ice-roller.webp",
    verified: true,
  },
  {
    id: "test-2",
    name: "Ahmed K.",
    city: "Sharjah, Al Majaz",
    rating: 5,
    quote: "The aroma diffuser sets the perfect calming mood in our living room. Whisper quiet, elegant wood tone, and delivery arrived in 24 hours.",
    avatar: "/images/avatar-ahmed.webp",
    productName: "Essential Oil Aroma Diffuser",
    productThumbnail: "/images/product-aroma-diffuser.webp",
    verified: true,
  },
  {
    id: "test-3",
    name: "Mariam Al-Hashemi",
    city: "Abu Dhabi, Saadiyat",
    rating: 5,
    quote: "I gifted the Ayatul Kursi necklace to my sister for Eid and she cried happy tears. The gold plating is heavy and luxury packaging is gorgeous.",
    avatar: "/images/avatar-mariam.webp",
    productName: "Ayatul Kursi Bar Necklace",
    productThumbnail: "/images/product-bar-necklace.webp",
    verified: true,
  },
  {
    id: "test-4",
    name: "Zainab Rashid",
    city: "Dubai, Downtown",
    rating: 5,
    quote: "The Touch Screen LED Mirror gives studio-grade lighting. The 3 light modes make blending foundation completely foolproof.",
    avatar: "/images/avatar-fatima.webp",
    productName: "Touch Screen LED Makeup Mirror",
    productThumbnail: "/images/product-makeup-mirror.webp",
    verified: true,
  },
  {
    id: "test-5",
    name: "Omar Al-Mansoor",
    city: "Ras Al Khaimah",
    rating: 5,
    quote: "Bladeless neck fan is an absolute lifesaver during outdoor weekend strolls and golf rounds. Battery lasts through the whole afternoon.",
    avatar: "/images/avatar-ahmed.webp",
    productName: "Portable USB Neck Fan",
    productThumbnail: "/images/product-neck-fan.webp",
    verified: true,
  },
  {
    id: "test-6",
    name: "Noura Al-Ali",
    city: "Ajman",
    rating: 5,
    quote: "Loved the Glow Routine bundle. Buying the set saved me so much compared to individual items. Cash on Delivery was seamless!",
    avatar: "/images/avatar-mariam.webp",
    productName: "Glow Routine Bundle",
    productThumbnail: "/images/bundle-glow-routine.webp",
    verified: true,
  },
  {
    id: "test-7",
    name: "Khalid Sultan",
    city: "Dubai, Jumeirah",
    rating: 5,
    quote: "Sunset Projection Lamp completely transformed my home study. Gives that dreamy golden-hour lighting every evening.",
    avatar: "/images/avatar-ahmed.webp",
    productName: "Sunset Projection Lamp",
    productThumbnail: "/images/product-sunset-lamp.webp",
    verified: true,
  },
  {
    id: "test-8",
    name: "Reem B.",
    city: "Abu Dhabi, Al Reem",
    rating: 5,
    quote: "Fastest COD service in the UAE. Ordered Monday night, courier delivered Wednesday afternoon with polite communication.",
    avatar: "/images/avatar-fatima.webp",
    productName: "Face Glow Ice Roller",
    productThumbnail: "/images/product-ice-roller.webp",
    verified: true,
  },
];

export const faqsData: FAQItem[] = [
  {
    question: "Which areas in the UAE do you deliver to?",
    answer:
      "We deliver across all 7 Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain within 1–3 business days with door-to-door tracking.",
  },
  {
    question: "How does Cash on Delivery work?",
    answer:
      "Simply place your order online without pre-paying. We will send a quick WhatsApp confirmation before dispatch, and you pay cash directly to the courier upon delivery.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 7-day hassle-free return policy. If you are not satisfied with your item, contact our support team via WhatsApp and we will arrange an easy collection.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you will receive a tracking link via WhatsApp and email so you can follow your package in real-time.",
  },
];
