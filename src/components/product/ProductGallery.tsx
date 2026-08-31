"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Play } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  videoUrl?: string;
  activeVariantImage?: string;
}

export default function ProductGallery({
  images,
  productName,
  videoUrl,
  activeVariantImage,
}: ProductGalleryProps) {
  // Combine video + images list
  const galleryList = React.useMemo(() => {
    let list: { type: "image" | "video"; url: string }[] = [];

    if (videoUrl) {
      list.push({ type: "video", url: videoUrl });
    }

    if (activeVariantImage && !images.includes(activeVariantImage)) {
      list.push({ type: "image", url: activeVariantImage });
    }

    images.forEach((img) => {
      list.push({ type: "image", url: img });
    });

    while (list.length < 4) {
      list.push(list[0] || { type: "image", url: "/images/product-neck-fan.jpg" });
    }

    return list;
  }, [images, videoUrl, activeVariantImage]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update index if activeVariantImage changes
  useEffect(() => {
    if (activeVariantImage) {
      const idx = galleryList.findIndex((item) => item.url === activeVariantImage);
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    }
  }, [activeVariantImage, galleryList]);

  const handleSelectMedia = (index: number) => {
    if (index === activeIndex) return;
    setIsCrossfading(true);
    setActiveIndex(index);
    setTimeout(() => {
      setIsCrossfading(false);
    }, 200);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const activeMedia = galleryList[activeIndex] || galleryList[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails Strip */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[580px] scrollbar-none py-1 md:py-0 shrink-0">
        {galleryList.map((item, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => handleSelectMedia(idx)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-sand transition-all duration-200 shrink-0 border-2 ${
                isSelected
                  ? "border-terracotta ring-2 ring-terracotta/30 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-[#E8DACB]"
              }`}
              aria-label={`View ${productName} media ${idx + 1}`}
            >
              {item.type === "video" ? (
                <div className="relative w-full h-full bg-ink flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white/80" />
                  <span className="absolute bottom-1 right-1 bg-terracotta text-white text-[9px] font-extrabold px-1 rounded">
                    VIDEO
                  </span>
                </div>
              ) : (
                <Image
                  src={item.url}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover object-center"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 space-y-3">
        <div
          ref={mainImageRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          className="relative aspect-square w-full rounded-2xl overflow-hidden bg-sand border border-[#EFEAE3] cursor-zoom-in group select-none shadow-sm"
        >
          <div
            className={`relative w-full h-full transition-opacity duration-200 ${
              isCrossfading ? "opacity-30" : "opacity-100"
            }`}
          >
            {activeMedia.type === "video" ? (
              <div className="relative w-full h-full bg-black">
                <video
                  ref={videoRef}
                  src={activeMedia.url}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Mute / Unmute Toggle Icon */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 z-20 bg-ink/75 backdrop-blur-xs text-white p-2 rounded-full hover:bg-ink transition shadow-md"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <Image
                src={activeMedia.url}
                alt={productName}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className={`object-cover object-center transition-transform duration-150 ease-out ${
                  isHovered ? "scale-150" : "scale-100"
                }`}
                style={
                  isHovered
                    ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                    : undefined
                }
              />
            )}
          </div>

          {/* Hover-to-Zoom Micro Badge (Desktop) */}
          {activeMedia.type === "image" && (
            <div className="hidden md:flex absolute bottom-3 right-3 bg-ink/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Hover to zoom 🔍
            </div>
          )}
        </div>

        {/* Mobile Carousel Indicators */}
        <div className="flex md:hidden items-center justify-center space-x-2 pt-1">
          {galleryList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectMedia(idx)}
              className={`h-2 rounded-full transition-all duration-200 ${
                activeIndex === idx ? "w-6 bg-terracotta" : "w-2 bg-[#D0C5B8]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
