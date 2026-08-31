"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShoppingBag, ChevronDown, ChevronUp, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import ContactStep from "@/components/checkout/ContactStep";
import ShippingForm, { ShippingFormData, ShippingFormErrors } from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import PlaceOrderButton from "@/components/checkout/PlaceOrderButton";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/data";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Form State
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: "",
    phone: "",
    emirate: "Dubai",
    area: "",
    address: "",
    deliveryNotes: "",
  });

  const [errors, setErrors] = useState<ShippingFormErrors>({});
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Validate Email
  const validateEmail = (val: string) => {
    if (!val.trim()) return "Email address is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return "Please enter a valid email address";
    return "";
  };

  // Validate Field
  const validateField = (field: keyof ShippingFormData, value: string): string => {
    if (field === "fullName" && !value.trim()) return "Full name is required";
    if (field === "phone") {
      if (!value.trim()) return "Mobile phone number is required";
      const digitsOnly = value.replace(/[^0-9]/g, "");
      if (digitsOnly.length < 9) return "Please enter a valid 9 or 10 digit UAE mobile number (e.g. 0501234567)";
    }
    if (field === "emirate" && !value) return "Please select an Emirate";
    if (field === "area" && !value.trim()) return "Area / District is required";
    if (field === "address" && !value.trim()) return "Street address / building details required";
    return "";
  };

  const handleBlurEmail = () => {
    setEmailError(validateEmail(email));
  };

  const handleBlurField = (field: keyof ShippingFormData) => {
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const cartList = items || [];
  const rawSubtotal = subtotal || 0;
  const shippingFee = rawSubtotal >= FREE_SHIPPING_THRESHOLD || rawSubtotal === 0 ? 0 : 15;
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, rawSubtotal + shippingFee - discountAmount);

  // Scroll back to shipping address on Edit click
  const handleEditAddress = () => {
    const el = document.getElementById("shipping-fullname");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  // Submit Handler
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const eErr = validateEmail(email);
    const newErrors: ShippingFormErrors = {
      fullName: validateField("fullName", formData.fullName),
      phone: validateField("phone", formData.phone),
      emirate: validateField("emirate", formData.emirate),
      area: validateField("area", formData.area),
      address: validateField("address", formData.address),
    };

    setEmailError(eErr);
    setErrors(newErrors);

    const hasError = eErr || Object.values(newErrors).some(Boolean);

    if (hasError) {
      setIsSubmitting(false);
      const firstInvalidId = eErr
        ? "contact-email"
        : newErrors.fullName
        ? "shipping-fullname"
        : newErrors.phone
        ? "shipping-phone"
        : newErrors.area
        ? "shipping-area"
        : "shipping-address";

      const el = document.getElementById(firstInvalidId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return;
    }

    const randomOrderId = `WAF-${Math.floor(100000 + Math.random() * 900000)}`;

    // Immediately flag order as placed — renders a processing screen right away
    // so neither the checkout form nor the empty-cart screen ever flashes.
    setIsOrderPlaced(true);

    setTimeout(() => {
      clearCart();
      router.push(
        `/checkout/confirmation?orderId=${randomOrderId}&total=${grandTotal}&name=${encodeURIComponent(
          formData.fullName
        )}&phone=${encodeURIComponent(formData.phone)}&area=${encodeURIComponent(
          formData.area
        )}&emirate=${encodeURIComponent(formData.emirate)}`
      );
    }, 900);
  };

  if (!isClient) {
    return (
      <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center p-4">
        <div className="animate-pulse text-xs text-[#6E675F]">Loading checkout...</div>
      </main>
    );
  }

  // Order just placed — show processing screen immediately, no cart/form flash
  if (isOrderPlaced) {
    return (
      <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center p-4">
        <div className="text-center space-y-5 animate-fadeIn">
          {/* Spinning ring */}
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#E5E1DC] border-t-[#C1663B] animate-spin" />
          <div className="space-y-1">
            <p className="font-serif text-xl font-bold text-[#1F1B18]">Confirming your order…</p>
            <p className="text-xs text-[#6E675F]">Please wait while we prepare your confirmation.</p>
          </div>
        </div>
      </main>
    );
  }

  // Empty cart view
  if (cartList.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF6F1] flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-12 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-center space-y-4 max-w-md w-full animate-fadeIn">
          <div className="w-16 h-16 bg-[#FAF6F1] border border-[#E5E1DC] flex items-center justify-center mx-auto text-[#C1663B]">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1F1B18]">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6E675F]">
            You don't have any items in your shopping bag to checkout.
          </p>
          <div className="pt-2">
            <Link
              href="/shop-all"
              className="inline-flex items-center justify-center gap-2 bg-[#C1663B] hover:bg-[#A8552E] text-white px-6 py-3 font-bold text-xs uppercase tracking-wider border border-[#C1663B] transition w-full btn-tactile"
            >
              <span>Explore Essentials</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6F1] text-[#1F1B18] font-sans pb-24">
      {/* Step Progress Bar — padding matches header for alignment with logo */}
      <div className="bg-white border-b border-[#E5E1DC] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2 sm:gap-4 text-[#1F1B18]">
            <span className="text-[#C1663B]">1. Information</span>
            <span className="text-[#6E675F]">→</span>
            <span className="text-[#C1663B]">2. Shipping</span>
            <span className="text-[#6E675F]">→</span>
            <span className="text-[#C1663B]">3. Payment</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#2F5D4F] font-bold">
            <Lock className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Encrypted COD Checkout</span>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Order Summary Banner */}
      <div className="lg:hidden bg-white border-b border-[#E5E1DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <button
          type="button"
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1F1B18]"
        >
          <span className="flex items-center gap-2 text-[#C1663B]">
            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
            <span>
              Order Summary ({cartList.length} items) · AED {grandTotal}
            </span>
          </span>
          {mobileSummaryOpen ? <ChevronUp className="w-4 h-4 stroke-[1.5]" /> : <ChevronDown className="w-4 h-4 stroke-[1.5]" />}
        </button>

        {mobileSummaryOpen && (
          <div className="mt-4 animate-fadeIn">
            <OrderSummary
              appliedDiscount={appliedDiscount}
              onApplyDiscount={setAppliedDiscount}
            />
          </div>
        )}
        </div>
      </div>

      {/* Main 2-Column Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <form onSubmit={handleSubmitOrder} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Steps (~60% / col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Info */}
            <ContactStep
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              onBlurEmail={handleBlurEmail}
              newsletter={newsletter}
              setNewsletter={setNewsletter}
            />

            {/* Step 2: UAE Shipping Address */}
            <ShippingForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              onBlurField={handleBlurField}
            />

            {/* Step 3: Payment Method (COD Only) & WhatsApp Opt-In */}
            <PaymentMethod
              whatsappOptIn={whatsappOptIn}
              setWhatsappOptIn={setWhatsappOptIn}
            />

            {/* Step 4: Order Review Micro-Step & Place Order Button */}
            <PlaceOrderButton
              grandTotal={grandTotal}
              formData={formData}
              isSubmitting={isSubmitting}
              onEditAddress={handleEditAddress}
            />
          </div>

          {/* Right Column: Sticky Order Summary (~40% / col-span-5) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24 self-start">
            <OrderSummary
              appliedDiscount={appliedDiscount}
              onApplyDiscount={setAppliedDiscount}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
