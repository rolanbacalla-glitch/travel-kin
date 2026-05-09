"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Filter, 
  ChevronDown,
  Globe,
  Waves,
  Mountain,
  TreePine,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";
import { destinations, HERO_IMAGES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const CATEGORIES = [
  { id: "all", label: "All Destinations", icon: Globe },
  { id: "islands", label: "Islands", icon: Waves },
  { id: "mountains", label: "Mountains", icon: Mountain },
  { id: "jungles", label: "Jungles", icon: TreePine },
  { id: "cities", label: "Urban", icon: MapPin },
];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || dest.tag.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isScrolled={isScrolled}
        navLinks={navLinks}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />
      
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-slate">
          {/* Background image slider */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <div className="relative w-full h-full overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={HERO_IMAGES[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HERO_IMAGES[currentImageIndex]}
                    alt="Destination"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover brightness-[0.7]"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-b from-slate/95 via-slate/70 to-background z-10" />
            </div>
            {/* Bottom wave fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunset/20 backdrop-blur-md text-sunset border border-sunset/30 text-xs font-black uppercase tracking-widest mb-8"
            >
              <Sparkles className="w-3 h-3" />
              Exploration Awaits
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold text-white leading-[0.9] mb-8 text-balance"
            >
              Find your <span className="text-sunset italic">paradise</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-2xl mx-auto text-pretty"
            >
              Discover 87+ curated destinations across the Philippines and beyond. Verified for solo safety and meaningful connections.
            </motion.p>
            


          </div>
          
          {/* Bottom wave fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-20" />
        </section>

        {/* Filters & Grid */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div className="flex items-center gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2",
                    activeCategory === cat.id 
                      ? "bg-slate border-slate text-white shadow-xl shadow-slate/20" 
                      : "bg-white border-slate/5 text-slate/40 hover:border-slate/20 hover:text-slate"
                  )}
                >
                  <cat.icon className={cn("w-4 h-4", activeCategory === cat.id ? "text-sunset" : "")} />
                  {cat.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate/40">Sort by:</span>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate/5 text-xs font-bold text-slate shadow-sm hover:border-slate/20 transition-all">
                Popularity
                <ChevronDown className="w-4 h-4 text-ocean" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDestinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative aspect-[4/5] w-full rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <Link 
                    href={`/destinations/${dest.id}`}
                    className="group block w-full h-full focus-ring"
                  >
                    <Image 
                      src={dest.image}
                      alt={dest.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    <div className="absolute top-8 left-8">
                      <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/30">
                        {dest.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 text-sunset">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs font-bold text-white">
                            {dest.rating}
                          </span>
                        </div>
                        <span className="text-[10px] text-white/50 uppercase tracking-tighter">
                          • {dest.reviews.toLocaleString()} reviews
                        </span>
                      </div>

                      <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-none">
                        {dest.title}
                      </h3>
                      <p className="text-white/70 text-sm font-medium line-clamp-1 mb-4">
                        {dest.tagline}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-lg font-serif font-bold text-white">
                          {dest.price}
                        </span>
                        <span className="text-[10px] font-bold text-sunset uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                          VIEW TRIP <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredDestinations.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center"
            >
              <div className="w-24 h-24 bg-slate/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-10 h-10 text-slate/20" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-slate mb-4">No paradises found.</h2>
              <p className="text-slate/40 font-medium text-lg">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-8 text-sunset font-black uppercase tracking-widest text-xs hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
