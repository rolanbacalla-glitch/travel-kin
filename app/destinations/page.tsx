"use client";

import React, { useState, useRef, useEffect } from "react";
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
import { destinations as fallbackDestinations, DESTINATION_HERO_IMAGES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  const [sortBy, setSortBy] = useState("popularity");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const [dbDestinations, setDbDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        if (!db || !db.collection) throw new Error("DB not ready");
        const querySnapshot = await getDocs(collection(db, "destinations"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setDbDestinations(data);
      } catch (error) {
        console.warn("Failed to fetch destinations from Firebase. Falling back to static data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const activeDestinations = dbDestinations.length > 0 ? dbDestinations : fallbackDestinations;

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  const SORT_OPTIONS = [
    { id: "popularity", label: "Popularity" },
    { id: "top-rated", label: "Top Rated" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "name-az", label: "A – Z" },
  ];

  const REGIONS = Array.from(new Set(activeDestinations.map(d => d.region))).sort();
  const VIBES = ["Electric", "Tranquil", "Adventurous", "Urban", "Mystic", "Historic"];

  const [activeRegion, setActiveRegion] = useState("all");
  const [activeVibe, setActiveVibe] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const activeSortLabel = SORT_OPTIONS.find(o => o.id === sortBy)?.label ?? "Popularity";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % DESTINATION_HERO_IMAGES.length);
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

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ""), 10);

  const filteredDestinations = activeDestinations
    .filter((dest) => {
      const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || (dest.tag && dest.tag.toLowerCase() === activeCategory.toLowerCase());
      const matchesRegion = activeRegion === "all" || dest.region === activeRegion;
      const matchesVibe = activeVibe === "all" || dest.vibe.toLowerCase().includes(activeVibe.toLowerCase());
      return matchesSearch && matchesCategory && matchesRegion && matchesVibe;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "top-rated": return b.rating - a.rating;
        case "price-asc": return parsePrice(a.price) - parsePrice(b.price);
        case "price-desc": return parsePrice(b.price) - parsePrice(a.price);
        case "name-az": return a.title.localeCompare(b.title);
        default: return b.reviews - a.reviews; // popularity
      }
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
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate">
          {/* Background image slider */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <div className="relative w-full h-full overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={DESTINATION_HERO_IMAGES[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={DESTINATION_HERO_IMAGES[currentImageIndex]}
                    alt="Destination"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
              <div className="absolute inset-0 bg-black/20 z-10" />
            </div>
            {/* Bottom wave fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset/20 border border-sunset/30 text-sunset text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sunset"></span>
              </span>
              Exploration Awaits
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 leading-[1.15] tracking-tighter"
            >
              Find your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset via-terra to-sunset bg-[length:200%_auto] animate-gradient">
                paradise.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Discover 87+ curated destinations across the Philippines and beyond. Verified for solo safety and meaningful connections.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-white/40 group-focus-within:text-sunset transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by island, mountain, or vibe..."
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-6 pl-16 pr-8 text-white placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-sunset/20 focus:border-sunset/40 transition-all text-lg font-medium"
                />
              </div>
            </motion.div>
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
              {/* Filter Dropdown */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full bg-white border text-xs font-bold transition-all",
                    activeRegion !== "all" || activeVibe !== "all"
                      ? "border-ocean text-ocean ring-4 ring-ocean/5"
                      : "border-slate/5 text-slate/60 hover:border-slate/20"
                  )}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {(activeRegion !== "all" || activeVibe !== "all") && (
                    <span className="w-2 h-2 rounded-full bg-sunset animate-pulse" />
                  )}
                </button>

                <AnimatePresence>
                  {filterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate/10 p-6 z-50"
                    >
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate/40">Region</span>
                            {activeRegion !== "all" && (
                              <button onClick={() => setActiveRegion("all")} className="text-[10px] text-sunset font-bold uppercase hover:underline">Clear</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {REGIONS.map(region => (
                              <button
                                key={region}
                                onClick={() => setActiveRegion(region)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                                  activeRegion === region
                                    ? "bg-slate text-white"
                                    : "bg-slate/5 text-slate/60 hover:bg-slate/10"
                                )}
                              >
                                {region}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate/40">Vibe</span>
                            {activeVibe !== "all" && (
                              <button onClick={() => setActiveVibe("all")} className="text-[10px] text-sunset font-bold uppercase hover:underline">Clear</button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {VIBES.map(vibe => (
                              <button
                                key={vibe}
                                onClick={() => setActiveVibe(vibe)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                                  activeVibe === vibe
                                    ? "bg-ocean text-white"
                                    : "bg-ocean/5 text-ocean/60 hover:bg-ocean/10"
                                )}
                              >
                                {vibe}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort Dropdown */}
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate/5 text-xs font-bold text-slate shadow-sm hover:border-slate/20 transition-all"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate/40 mr-1">Sort:</span>
                  {activeSortLabel}
                  <ChevronDown className={`w-4 h-4 text-ocean transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate/10 overflow-hidden z-50"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
                          className={`w-full text-left px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${sortBy === opt.id
                              ? "bg-slate text-white"
                              : "text-slate/60 hover:bg-slate/5 hover:text-slate"
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredDestinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                    opacity: { duration: 0.2 }
                  }}
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
          </motion.div>

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
