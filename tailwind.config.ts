import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#FAF6F0", // primary background
        beige: "#F0E4D8", // secondary section tint
        terracotta: "#C9714D", // primary accent (storewide)
        sage: "#8A9A7E", // secondary accent (Gifting section only)
        /* 
         * IMPORTANT DISCIPLINE CONSTRAINT:
         * 'gold' (#C9A24B) must ONLY appear inside the Gifting category tile
         * and the "Gifting Set" bundle card components — nowhere else on the page.
         */
        gold: "#C9A24B", // tertiary accent (Gifting section ONLY — do not use elsewhere)
        star: "#E0A94B", // star rating color (storewide)
        ink: "#2B2420", // headline text / dark backgrounds (footer, hero overlay)
        body: "#5B534B", // body text
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Fraunces", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Inter", "Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
