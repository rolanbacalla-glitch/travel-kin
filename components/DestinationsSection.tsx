"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";

export function DestinationsSection() {
  return (
    <section id="destinations" className="py-32 px-6 bg-background overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-ocean font-bold text-xs tracking-widest uppercase mb-4 block">
              Curated Destinations
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate leading-tight text-balance">
              Where to <span className="text-terra italic">lose yourself</span>{" "}
              & find your kin.
            </h2>
          </div>
          <Link
            href="/destinations"
            className="group flex items-center gap-3 text-slate font-bold tracking-tight hover:text-ocean transition-colors duration-200"
          >
            <span>Explore All 87 Islands</span>
            <div className="w-10 h-10 rounded-full border border-slate/10 flex items-center justify-center group-hover:bg-ocean group-hover:border-ocean group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Scroll container */}
        <div className="relative -mx-6 px-6 overflow-x-auto no-scrollbar scroll-smooth">
          <div className="flex gap-8 pb-12 w-max">
            {destinations.map((place) => (
              <Link
                key={place.id}
                href={`/destinations/${place.id}`}
                className="group relative w-[320px] md:w-[400px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl focus-ring"
              >
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  sizes="(max-width: 768px) 320px, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="absolute top-8 left-8">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/30">
                    {place.tag}
                  </span>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-sunset">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-bold text-white">
                        {place.rating}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/50 uppercase tracking-tighter">
                      • {place.reviews.toLocaleString()} reviews
                    </span>
                  </div>

                  <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-none">
                    {place.title}
                  </h3>
                  <p className="text-white/70 text-sm font-medium line-clamp-1 mb-4">
                    {place.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-serif font-bold text-white">
                      {place.price}
                    </span>
                    <span className="text-[10px] font-bold text-sunset uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      VIEW TRIP <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
