"use client";

import React, { useState } from "react";
import { MapPin, Phone, User, Building, FileText, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

export interface ShippingFormData {
  fullName: string;
  phone: string;
  emirate: string;
  area: string;
  address: string;
  deliveryNotes: string;
}

export interface ShippingFormErrors {
  fullName?: string;
  phone?: string;
  emirate?: string;
  area?: string;
  address?: string;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ShippingFormData>>;
  errors: ShippingFormErrors;
  onBlurField: (field: keyof ShippingFormData) => void;
}

export default function ShippingForm({
  formData,
  setFormData,
  errors,
  onBlurField,
}: ShippingFormProps) {
  const [showDeliveryNotes, setShowDeliveryNotes] = useState(false);

  const uaeEmirates = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
  ];

  const handleChange = (field: keyof ShippingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-5">
      {/* Clean Section Header */}
      <div className="border-b border-[#EFEAE3] pb-4">
        <h3 className="font-serif text-lg font-bold text-[#1F1B18] tracking-tight">
          Delivery Address
        </h3>
        <p className="text-xs text-[#6E675F] mt-0.5">
          Our courier will deliver directly to your doorstep and collect cash payment.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="shipping-fullname" className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-1.5">
            Full Name <span className="text-[#C1663B]">*</span>
          </label>
          <input
            id="shipping-fullname"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => onBlurField("fullName")}
            placeholder="e.g. Tariq Al-Mansoor"
            className={`w-full h-11 px-4 text-xs font-medium bg-[#FAF6F1] border transition-all duration-150 outline-none ${
              errors.fullName
                ? "border-[#E05338] bg-rose-50/40"
                : "border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* UAE Phone Number */}
        <div>
          <label htmlFor="shipping-phone" className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-1.5">
            UAE Mobile Phone Number <span className="text-[#C1663B]">*</span>
          </label>
          <input
            id="shipping-phone"
            type="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => onBlurField("phone")}
            placeholder="+971 50 123 4567 or 050 123 4567"
            className={`w-full h-11 px-4 text-xs font-medium bg-[#FAF6F1] border transition-all duration-150 outline-none ${
              errors.phone
                ? "border-[#E05338] bg-rose-50/40"
                : "border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white"
            }`}
          />
          {errors.phone ? (
            <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
              <span>{errors.phone}</span>
            </p>
          ) : (
            <p className="text-[11px] text-[#6E675F] mt-1.5">
              Required for courier SMS & delivery confirmation call prior to arrival.
            </p>
          )}
        </div>

        {/* Emirate & Area Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Emirate Dropdown */}
          <div>
            <label htmlFor="shipping-emirate" className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-1.5">
              Emirate <span className="text-[#C1663B]">*</span>
            </label>
            <div className="relative">
              <select
                id="shipping-emirate"
                value={formData.emirate}
                onChange={(e) => handleChange("emirate", e.target.value)}
                onBlur={() => onBlurField("emirate")}
                className={`w-full h-11 px-4 pr-10 text-xs font-bold bg-[#FAF6F1] border transition-all duration-150 outline-none appearance-none cursor-pointer ${
                  errors.emirate
                    ? "border-[#E05338] bg-rose-50/40"
                    : "border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white"
                }`}
              >
                <option value="">Select Emirate...</option>
                {uaeEmirates.map((em) => (
                  <option key={em} value={em}>
                    {em}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 stroke-[1.5] text-[#6E675F] absolute right-3 top-3.5 pointer-events-none" />
            </div>
            {errors.emirate && (
              <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
                <span>{errors.emirate}</span>
              </p>
            )}
          </div>

          {/* Area / District */}
          <div>
            <label htmlFor="shipping-area" className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-1.5">
              Area / District <span className="text-[#C1663B]">*</span>
            </label>
            <input
              id="shipping-area"
              type="text"
              value={formData.area}
              onChange={(e) => handleChange("area", e.target.value)}
              onBlur={() => onBlurField("area")}
              placeholder="e.g. Dubai Marina, Al Barsha 1"
              className={`w-full h-11 px-4 text-xs font-medium bg-[#FAF6F1] border transition-all duration-150 outline-none ${
                errors.area
                  ? "border-[#E05338] bg-rose-50/40"
                  : "border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white"
              }`}
            />
            {errors.area && (
              <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
                <span>{errors.area}</span>
              </p>
            )}
          </div>
        </div>

        {/* Street Address / Villa or Apt # */}
        <div>
          <label htmlFor="shipping-address" className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-1.5">
            Street Address / Building / Villa & Apt # <span className="text-[#C1663B]">*</span>
          </label>
          <input
            id="shipping-address"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={() => onBlurField("address")}
            placeholder="e.g. Marina Gate 2, Apt 1402 or Villa 45, Street 12"
            className={`w-full h-11 px-4 text-xs font-medium bg-[#FAF6F1] border transition-all duration-150 outline-none ${
              errors.address
                ? "border-[#E05338] bg-rose-50/40"
                : "border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white"
            }`}
          />
          {errors.address && (
            <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
              <span>{errors.address}</span>
            </p>
          )}
        </div>

        {/* Collapsible Delivery Notes / Landmark */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowDeliveryNotes(!showDeliveryNotes)}
            className="text-xs font-bold text-[#C1663B] hover:underline inline-flex items-center gap-1.5 transition"
          >
            <FileText className="w-4 h-4 stroke-[1.5]" />
            <span>Add optional landmark or delivery instructions</span>
            {showDeliveryNotes ? <ChevronUp className="w-3.5 h-3.5 stroke-[1.5]" /> : <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />}
          </button>

          {showDeliveryNotes && (
            <div className="mt-3 animate-fadeIn">
              <textarea
                rows={3}
                value={formData.deliveryNotes}
                onChange={(e) => handleChange("deliveryNotes", e.target.value)}
                placeholder="e.g. Next to Choithrams Supermarket, leave with security guard if not home..."
                className="w-full p-3.5 text-xs font-medium bg-[#FAF6F1] border border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white outline-none transition-all duration-150"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
