"use client";

import React from "react";
import { Mail, AlertCircle, UserCheck } from "lucide-react";

interface ContactStepProps {
  email: string;
  setEmail: (val: string) => void;
  emailError?: string;
  onBlurEmail?: () => void;
  newsletter: boolean;
  setNewsletter: (val: boolean) => void;
}

export default function ContactStep({
  email,
  setEmail,
  emailError,
  onBlurEmail,
  newsletter,
  setNewsletter,
}: ContactStepProps) {
  return (
    <div className="bg-white p-6 sm:p-8 border border-[#E5E1DC] shadow-[0_1px_4px_rgba(0,0,0,0.04)] space-y-5">
      {/* Clean Section Header */}
      <div className="flex items-center justify-between border-b border-[#EFEAE3] pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F1B18] tracking-tight">
            Contact Information
          </h3>
          <p className="text-xs text-[#6E675F] mt-0.5">
            Guest checkout — no account required
          </p>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="text-xs font-semibold text-[#C1663B] hover:underline flex items-center gap-1 transition"
        >
          <UserCheck className="w-4 h-4 stroke-[1.5]" />
          <span>Already have an account? Log in</span>
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#1F1B18] mb-1.5">
            Email Address <span className="text-[#C1663B]">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onBlurEmail}
            placeholder="e.g. omar.mansoor@gmail.com"
            className={`w-full h-11 px-4 text-xs font-medium bg-[#FAF6F1] border transition-all duration-150 outline-none ${
              emailError
                ? "border-[#E05338] bg-rose-50/40"
                : "border-[#E5E1DC] focus:border-[#C1663B] focus:bg-white"
            }`}
          />
          {emailError ? (
            <p className="text-[11px] font-semibold text-[#E05338] flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 stroke-[1.5] shrink-0" />
              <span>{emailError}</span>
            </p>
          ) : (
            <p className="text-[11px] text-[#6E675F] mt-1.5">
              Your Cash on Delivery tracking updates will be sent to this email address.
            </p>
          )}
        </div>

        {/* Custom Styled Newsletter Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer text-xs text-[#1F1B18] select-none pt-1">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="w-4 h-4 border border-[#1F1B18] bg-white accent-[#C1663B] focus:ring-0 cursor-pointer"
          />
          <span className="text-[#6E675F] font-medium leading-normal">
            Email me with news, exclusive UAE launch offers & order updates
          </span>
        </label>
      </div>
    </div>
  );
}
