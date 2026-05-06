"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="py-32 px-6 bg-sand/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate mb-6">
            Stories from <span className="text-ocean italic">the road</span>.
          </h2>
          <p className="text-slate/50 font-medium uppercase tracking-[0.2em] text-xs">
            TRANSFORMING SOLO FEAR INTO COLLECTIVE FREEDOM
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="glass p-10 rounded-[3.5rem] relative group hover:bg-white transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-terra rounded-full flex items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Quote className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate">{t.name}</div>
                  <div className="text-[10px] text-ocean font-bold uppercase tracking-widest">
                    {t.origin}
                  </div>
                </div>
              </div>

              <p className="text-slate/70 leading-relaxed font-medium text-lg italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-8 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="w-1.5 h-1.5 rounded-full bg-sunset"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
