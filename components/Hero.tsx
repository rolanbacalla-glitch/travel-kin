"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Users, Search, ChevronRight, MapPin } from "lucide-react";
import { HERO_IMAGES } from "@/lib/data";

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate"
    >
      {/* 1. Persistent Static Background (Loads first, avoids flash) */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          opacity: currentImageIndex === 0 ? 1 : 0.4
        }}
      >
        <Image
          src={HERO_IMAGES[0]}
          alt="Main Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 2. Animated Slider (Takes over after mount) */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            {currentImageIndex !== 0 && (
              <motion.div
                key={HERO_IMAGES[currentImageIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_IMAGES[currentImageIndex]}
                  alt="Destination"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 3. Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* 4. Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset/20 border border-sunset/30 text-sunset text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sunset"></span>
              </span>
              47,000+ Verified Solo Travellers
            </span>

            <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 leading-[1.15] tracking-tighter">
              Solo travel, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset via-terra to-sunset bg-[length:200%_auto] animate-gradient">
                better together.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Ditch the stress of planning alone. Connect with verified companions,
              find expert local guides, and explore Southeast Asia&apos;s hidden gems.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
              <Link href="/dashboard" className="group relative px-10 py-5 bg-sunset text-white font-bold rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Find Your Crew <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-terra to-sunset opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link href="/destinations" className="flex items-center gap-4 px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all duration-300">
                <Search className="w-5 h-5 text-sunset" />
                <span>Explore Destinations</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
}
