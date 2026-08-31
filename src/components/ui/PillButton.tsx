"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "dark" | "goldOutline";
  fullWidth?: boolean;
}

export default function PillButton({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: PillButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-bold uppercase tracking-wider text-xs sm:text-sm py-3 px-6 border border-[#1F1B18] transition-all duration-150 btn-tactile";

  const variantClasses = {
    primary:
      "bg-[#C1663B] text-white hover:bg-[#A8552E]",
    outline:
      "bg-white text-[#C1663B] border-[#C1663B] hover:bg-[#C1663B] hover:text-white",
    goldOutline:
      "bg-white text-[#C9A24B] border-[#C9A24B] hover:bg-[#C9A24B] hover:text-white",
    dark: "bg-[#1F1B18] text-white hover:bg-black",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
