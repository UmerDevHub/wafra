import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Cash on Delivery Checkout | Wafra UAE",
  description: "Complete your Cash on Delivery order with fast 1–3 day delivery across all 7 UAE Emirates.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
