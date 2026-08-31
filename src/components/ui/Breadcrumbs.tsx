"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-body/70">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href="/" className="hover:text-terracotta transition">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li className="text-body/40">
                <ChevronRight className="w-3 h-3 inline" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="font-semibold text-ink truncate max-w-[200px] sm:max-w-none inline-block">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-terracotta transition">
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
