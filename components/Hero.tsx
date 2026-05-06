"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_IMAGES } from "@/lib/data";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="main-content"
      aria-label="Hero — Solo travel, better together"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={HERO_IMAGES[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 4, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={HERO_IMAGES[currentImageIndex]}
                alt="Southeast Asia Background"
                fill
                priority
                sizes="100vw"
                className="object-cover pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate/95 to-slate/20 z-10 transition-opacity duration-700" aria-hidden="true" />
        </div>
        {/* Bottom wave fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        {/* Pill badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase bg-sunset/20 backdrop-blur-md rounded-full text-sunset border border-sunset/30">
          <span className="w-1.5 h-1.5 bg-sunset rounded-full animate-pulse" aria-hidden="true" />
          47,000+ solo travellers already wandering
        </span>

        {/* Headline */}
        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-bold text-white leading-[0.9] mb-8 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] text-balance">
          Solo.{" "}
          <span className="italic text-sunset">Bold.</span>{" "}
          <br />
          <span className="text-sand/90">Free.</span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-12 leading-relaxed text-pretty">
          Southeast Asia&rsquo;s first safety-first platform built exclusively
          for solo travellers. Find your crew, your guide, your adventure.
        </p>

        {/* Search bar */}
        <div
          className="glass max-w-2xl mx-auto rounded-[2rem] p-2 shadow-2xl"
          role="search"
          aria-label="Find your next destination"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            {/* Destination input */}
            <div className="flex-1 flex items-center gap-3 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-slate/10">
              <MapPin className="w-4 h-4 text-ocean flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col min-w-0 w-full text-left">
                <label
                  htmlFor="destination-input"
                  className="text-[10px] uppercase tracking-wider text-slate/50 font-bold mb-0.5"
                >
                  Where to next
                </label>
                <input
                  id="destination-input"
                  type="text"
                  name="destination"
                  placeholder="El Nido, Siargao…"
                  autoComplete="off"
                  className="bg-transparent border-none outline-none text-slate font-medium placeholder:text-slate/30 text-sm w-full focus-ring rounded-sm"
                  aria-label="Enter your destination"
                />
              </div>
            </div>

            {/* Traveller type */}
            <div className="flex-1 flex items-center gap-3 px-5 py-3.5 text-left">
              <Users className="w-4 h-4 text-sunset flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate/50 font-bold mb-0.5">
                  Trip style
                </span>
                <span className="text-slate font-medium text-sm">Solo Explorer</span>
              </div>
            </div>

            {/* CTA button */}
            <Link
              href="/dashboard"
              aria-label="Search destinations"
              className="sm:ml-auto bg-ocean hover:bg-ocean-dark text-white font-semibold px-7 py-3.5 rounded-[1.5rem] transition-colors duration-200 focus-ring flex items-center gap-2 justify-center active:scale-95 whitespace-nowrap"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>Find My Trip</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
