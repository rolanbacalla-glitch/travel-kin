"use client";

import React from "react";
import { stats } from "@/lib/data";

export function StatCards() {
  return (
    <section className="relative py-12 z-30 px-6 overflow-visible bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass-light p-8 rounded-[2.5rem] text-center border-white/40 shadow-xl group hover:bg-white/80 transition-all duration-300 flex flex-col justify-center"
          >
            <div className="text-4xl md:text-5xl font-serif font-bold text-slate mb-1 group-hover:scale-110 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest font-black text-ocean/60 mb-2">
              {stat.label}
            </div>
            {stat.description && (
              <p className="text-[11px] text-slate/60 leading-relaxed font-medium max-w-[200px] mx-auto mt-2">
                {stat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
