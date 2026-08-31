"use client";

import React from "react";
import { ShieldCheck, Edit2, Loader2, MapPin } from "lucide-react";
import { ShippingFormData } from "./ShippingForm";

interface PlaceOrderButtonProps {
  grandTotal: number;
  formData: ShippingFormData;
  isSubmitting: boolean;
  onEditAddress: () => void;
}

export default function PlaceOrderButton({
  grandTotal,
  formData,
  isSubmitting,
  onEditAddress,
}: PlaceOrderButtonProps) {
  const isAddressFilled = formData.fullName && formData.area && formData.emirate;

  return (
    <div className="space-y-4">
      {/* Order Review Delivery Recap Box */}
      <div className="bg-[#FAF6F1] p-4 border border-[#E5E1DC] text-xs space-y-2">
        <div className="flex items-center justify-between font-bold text-[#1F1B18]">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 stroke-[1.5] text-[#C1663B]" />
            <span>Delivery Destination:</span>
          </span>
          {isAddressFilled && (
            <button
              type="button"
              onClick={onEditAddress}
              className="text-[#C1663B] hover:underline flex items-center gap-1 text-[11px] font-semibold transition"
            >
              <Edit2 className="w-3 h-3 stroke-[1.5]" />
              <span>Edit Address</span>
            </button>
          )}
        </div>

        <p className="text-[#6E675F] font-medium truncate">
          <strong className="text-[#1F1B18]">Deliver to:</strong>{" "}
          {isAddressFilled
            ? `${formData.fullName}, ${formData.area}, ${formData.emirate}`
            : "Complete delivery step above"}
        </p>
        <p className="text-[#6E675F] font-medium">
          <strong className="text-[#1F1B18]">Payment:</strong> Cash on Delivery (Pay cash upon parcel arrival)
        </p>
      </div>

      {/* Primary Solid Terracotta Place Order Button */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 sm:p-0 border-t border-[#E5E1DC] sm:border-0 pb-safe sm:pb-0">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 font-bold uppercase tracking-wider text-sm sm:text-base border border-[#C1663B] transition-all duration-150 flex items-center justify-center gap-2.5 btn-tactile cursor-pointer ${
            isSubmitting
              ? "bg-[#C1663B]/70 text-white cursor-not-allowed opacity-60"
              : "bg-[#C1663B] hover:bg-[#A8552E] text-white shadow-[0_4px_14px_rgba(193,102,59,0.25)] hover:shadow-[0_6px_20px_rgba(193,102,59,0.35)]"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
              <span>Place Order · AED {grandTotal} (Pay on Delivery)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
