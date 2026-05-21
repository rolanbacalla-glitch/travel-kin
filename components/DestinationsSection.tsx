"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/lib/data";

export function DestinationsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Wait for rendering to settle then check initial scroll state
      const timer = setTimeout(checkScroll, 100);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Scroll by card width (400px on desktop, 320px on mobile) + gap (32px)
      const cardWidth = window.innerWidth < 768 ? 352 : 432; // 320+32 or 400+32
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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

        {/* Scroll container wrapper */}
        <div className="relative group/carousel">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-2xl focus-ring cursor-pointer hover:bg-slate-900/95"
              aria-label="Previous Destinations"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-2xl focus-ring cursor-pointer hover:bg-slate-900/95"
              aria-label="Next Destinations"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar scroll-smooth -mx-6 px-6"
          >
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

                    <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-tight">
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
      </div>
    </section>
  );
}
