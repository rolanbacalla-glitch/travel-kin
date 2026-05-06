"use client";

import React from "react";
import { tickerItems } from "@/lib/data";

export function StatsTicker() {
  return (
    <div className="absolute bottom-12 w-full z-20 pointer-events-none select-none">
      <div className="flex gap-12 animate-scroll-left whitespace-nowrap py-4">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="text-xs uppercase tracking-[0.4em] font-medium text-white/30 italic"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
