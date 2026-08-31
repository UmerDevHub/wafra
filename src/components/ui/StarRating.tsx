import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  size?: "sm" | "md";
}

export default function StarRating({
  rating = 5,
  maxStars = 5,
  size = "sm",
}: StarRatingProps) {
  const iconSize =
    size === "sm"
      ? "w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
      : size === "md"
      ? "w-4 h-4"
      : "w-3 h-3";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${
            i < rating
              ? "fill-[#E0A94B] text-[#E0A94B]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
