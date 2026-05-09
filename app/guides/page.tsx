"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Globe,
  Star,
  ArrowRight,
  MapPin,
  Menu,
  X,
  Smartphone,
  Navigation,
  Coffee,
  Sun,
  Users,
  Backpack,
  Search,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, HelpCircle, Zap, Shield, Heart, Umbrella, Coffee as CoffeeIcon, Plane, Camera, CreditCard, Briefcase, Plus, Filter } from "lucide-react";

/* ─────────────────────────────────────────────────────────── */
/* Data                                                          */
/* ─────────────────────────────────────────────────────────── */

const GUIDE_HERO_IMAGES = [
  "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=1920", // El Nido
  "https://images.pexels.com/photos/3533659/pexels-photo-3533659.jpeg?auto=compress&cs=tinysrgb&w=1920", // Siargao
  "https://images.pexels.com/photos/13518466/pexels-photo-13518466.jpeg?auto=compress&cs=tinysrgb&w=1920", // Coron
  "https://images.pexels.com/photos/3214989/pexels-photo-3214989.jpeg?auto=compress&cs=tinysrgb&w=1920", // Manila/BGC
  "https://images.pexels.com/photos/17263722/pexels-photo-17263722.jpeg?auto=compress&cs=tinysrgb&w=1920", // Cebu/Moalboal
];

const philippinesDestinations = [
  {
    id: "siargao",
    title: "Siargao Island",
    tagline: "The Social Heartbeat",
    desc: "Not just for surfers. Siargao's 'General Luna' strip is a masterclass in solo-friendly hospitality. Motorbike through coconut groves by day and join communal 'family dinners' at hostels like Sunlit and Mad Monkey.",
    image: "https://images.pexels.com/photos/3533659/pexels-photo-3533659.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.1/10",
    rating: 4.9,
    region: "Mindanao",
    vibe: "Electric & Communal",
    soloPerks: ["Surf Buddy Matching", "Hostel Family Dinners", "Digital Nomad Cafes"],
    verified: true,
  },
  {
    id: "el-nido",
    title: "El Nido, Palawan",
    tagline: "The Archipelago King",
    desc: "A solo traveler's dream for meeting people through multi-day 'Social Boat Expeditions.' These off-the-grid trips naturally foster deep friendships while exploring remote lagoons.",
    image: "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=1200",
    safetyScore: "8.9/10",
    rating: 4.8,
    region: "Palawan",
    vibe: "Majestic & Explorative",
    soloPerks: ["Social Boat Expeditions", "Kayaking Partners", "Sunset Beach Mixers"],
    verified: true,
  },
  {
    id: "coron",
    title: "Coron, Palawan",
    tagline: "The Deep Sea Frontier",
    desc: "World-class WWII shipwreck diving and the cleanest lakes in Asia. Coron is ideal for solo travelers looking for adventure. Dive centers specialize in matching solo divers with buddies.",
    image: "https://images.pexels.com/photos/13518466/pexels-photo-13518466.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "8.7/10",
    rating: 4.7,
    region: "Palawan",
    vibe: "Raw & Adventurous",
    soloPerks: ["Dive Buddy Matching", "Hot Springs Socials", "Shipwreck Tours"],
    verified: true,
  },
  {
    id: "cebu",
    title: "Cebu & Moalboal",
    tagline: "The Adventure Nexus",
    desc: "From the sardine run in Moalboal to the electric blue waterfalls of Kawasan, Cebu is the ultimate playground. Solo travelers love the canyoneering groups which are perfect for making instant friends.",
    image: "https://images.pexels.com/photos/17263722/pexels-photo-17263722.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "8.8/10",
    rating: 4.8,
    region: "Visayas",
    vibe: "Vibrant & Thrilling",
    soloPerks: ["Canyoneering Groups", "Sardine Run Buddies", "Major Airport Hub"],
    verified: true,
  },
  {
    id: "siquijor",
    title: "Siquijor Island",
    tagline: "The Mystic Sanctuary",
    desc: "Small enough to explore on a single scooter loop. Known for its 'healers' and turquoise waterfalls like Cambugahay. The safest island for solo wanderers to join 'Moto-Convoys.'",
    image: "https://images.pexels.com/photos/14634010/pexels-photo-14634010.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.5/10",
    rating: 4.9,
    region: "Visayas",
    vibe: "Ethereal & Tranquil",
    soloPerks: ["Moto-Convoy Nights", "Safe Night Scootering", "Waterfall Friendships"],
    verified: true,
  },
  {
    id: "boracay",
    title: "Boracay Island",
    tagline: "The Ivory Playground",
    desc: "Renowned for its White Beach, Boracay is the ultimate place to unwind and socialize. After its rehabilitation, it's cleaner and more regulated, making it incredibly safe for solo travelers to enjoy sunset drinks and meet fellow wanderers at beachfront lounges.",
    image: "https://images.pexels.com/photos/33676228/pexels-photo-33676228.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.3/10",
    rating: 4.6,
    region: "Visayas",
    vibe: "Vibrant & Pristine",
    soloPerks: ["Sunset Mixers", "Yoga Communities", "Regulated Transport"],
    verified: true,
  },
  {
    id: "batanes",
    title: "Batanes Islands",
    tagline: "The Northern Soul",
    desc: "The safest province in the Philippines. Zero crime rate and a culture of 'Honesty' (see the Honesty Café). Its rolling hills and dramatic cliffs offer a European vibe in the heart of Asia. Perfect for solo reflection and safe cycling.",
    image: "https://images.pexels.com/photos/20788066/pexels-photo-20788066.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.9/10",
    rating: 5.0,
    region: "Northern Luzon",
    vibe: "Majestic & Tranquil",
    soloPerks: ["Honesty Cafe", "Safe Cycling", "Stone House Hostels"],
    verified: true,
  },
  {
    id: "camiguin",
    title: "Camiguin Island",
    tagline: "The Island Born of Fire",
    desc: "With seven volcanoes and a white sandbar that appears and disappears with the tide, Camiguin is a mystic gem. Solo travelers can easily join group treks to Hibok-Hibok or share a boat to White Island.",
    image: "https://images.pexels.com/photos/29152393/pexels-photo-29152393.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.4/10",
    rating: 4.7,
    region: "Mindanao",
    vibe: "Ethereal & Volcanic",
    soloPerks: ["Trek Buddy Finding", "Hot Spring Evenings", "Island Loop Scootering"],
    verified: true,
  },
];

const soloTips = [
  {
    icon: Zap,
    title: "The Buddy Matching Hack",
    desc: "Look for 'Solo-Connect' tags on boat tours and dive centers. They specialize in pairing solo wanderers so you never have to kayak or dive alone.",
    tag: "Social"
  },
  {
    icon: CreditCard,
    title: "The GCash Standard",
    desc: "GCash is the digital pulse of the Philippines. Use it for everything from island tricycles to beach bars to avoid carrying excessive cash.",
    tag: "Finance"
  },
  {
    icon: Shield,
    title: "Community Vetting",
    desc: "Every recommendation in this guide is 'Kin-Vetted.' We prioritize spots with active security, communal dining, and solo-friendly atmospheres.",
    tag: "Safety"
  },
  {
    icon: Plane,
    title: "The Grab Protocol",
    desc: "In cities like Manila or Cebu, never flag a random taxi. Use Grab for GPS tracking, vetted drivers, and transparent pricing—the gold standard for solo safety.",
    tag: "Transport"
  },
];

const PACKING_LIST = [
  { id: 1, item: "Waterproof Dry Bag (20L)", category: "Gear" },
  { id: 2, item: "International Power Adapter", category: "Tech" },
  { id: 3, item: "GCash App / Verified Account", category: "Finance" },
  { id: 4, item: "Portable Power Bank (20k mAh)", category: "Tech" },
  { id: 5, item: "Aqua Shoes for Reefs", category: "Gear" },
  { id: 6, item: "Offline Google Maps (Palawan)", category: "App" },
  { id: 7, item: "Kin-Verified ID Badge", category: "Safety" },
];

const BUDDIES = [
  { id: 1, name: "Maria", bio: "Diver & Coffee lover. In El Nido for 2 weeks.", img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800", interest: "Diving" },
  { id: 2, name: "Liam", bio: "Digital nomad. Working from Siargao's best cafes.", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800", interest: "Work" },
  { id: 3, name: "Yuki", bio: "Photographer exploring Siquijor's mysticism.", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800", interest: "Photos" },
  { id: 4, name: "Carlos", bio: "Surfer from Spain. Searching for the best swells.", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800", interest: "Surfing" },
];

const VIBES = ["All", "Electric", "Majestic", "Raw", "Vibrant", "Ethereal", "Pristine", "Volcanic"];

export default function GuidesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [prevHeroIndex, setPrevHeroIndex] = useState(0);
  const [filterVibe, setFilterVibe] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchedBuddy, setMatchedBuddy] = useState<typeof BUDDIES[0] | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kin-packing-list");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse packing list", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("kin-packing-list", JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const heroTimer = setInterval(() => {
      setCurrentHeroIndex((prev) => {
        setPrevHeroIndex(prev);
        return (prev + 1) % GUIDE_HERO_IMAGES.length;
      });
    }, 8000); // 8s cycle as requested

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(heroTimer);
    };
  }, []);

  const toggleItem = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const startMatching = () => {
    setShowMatchModal(true);
    setIsMatching(true);
    setMatchedBuddy(null);
    
    // Simulate a search
    setTimeout(() => {
      const randomBuddy = BUDDIES[Math.floor(Math.random() * BUDDIES.length)];
      setMatchedBuddy(randomBuddy);
      setIsMatching(false);
    }, 3500);
  };

  const filteredDestinations = philippinesDestinations.filter(dest => {
    const matchesVibe = filterVibe === "All" || dest.vibe.includes(filterVibe);
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVibe && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-sand text-slate-900 selection:bg-sunset selection:text-white">
      {/* ══════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════ */}
      {/* ── Skip link ── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ══════════════════════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding] duration-300",
          isScrolled
            ? "mx-4 mt-4 rounded-2xl bg-slate-900/80 backdrop-blur-md shadow-xl px-5 py-3 border border-white/10"
            : "px-6 py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-serif font-bold text-white drop-shadow-md focus-ring rounded-sm"
            aria-label="Travel Kin — home"
          >
            Travel{" "}
            <span className="text-sunset italic">Kin</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["Destinations", "Crew", "Guides", "Safety"].map((item) => (
              <Link
                key={item}
                href={item === "Guides" ? "/guides" : `/#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-ring rounded-sm drop-shadow-sm"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/verify"
              className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-ring rounded-full cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/verify"
              className="px-6 py-2.5 bg-sunset text-white text-sm font-semibold rounded-full shadow-lg hover:bg-sunset-dark transition-all duration-200 focus-ring active:scale-95 cursor-pointer"
            >
              Start Exploring
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden text-white p-2 focus-ring rounded-lg"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          MOBILE MENU
      ══════════════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[100] bg-slate text-white flex flex-col overscroll-contain"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <span className="text-2xl font-serif font-bold">
              Travel <span className="text-sunset italic">Kin</span>
            </span>
            <button
              aria-label="Close navigation menu"
              className="p-2 focus-ring-white rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-7 h-7" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col items-start px-8 py-12 space-y-8 flex-1">
            {["Destinations", "Crew", "Guides", "Safety"].map((item) => (
              <Link
                key={item}
                href={item === "Guides" ? "/guides" : `/#${item.toLowerCase()}`}
                className="text-4xl font-serif text-white/80 hover:text-white transition-colors duration-200 focus-ring-white rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="px-8 pb-12 space-y-3 flex flex-col">
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/10 transition-colors duration-200 focus-ring-white text-center"
            >
              Sign In
            </Link>
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-sunset rounded-2xl text-white font-semibold hover:bg-sunset-dark transition-colors duration-200 focus-ring-white text-center"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════════ */}
      <header className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-slate">
        {/* Base layer to prevent blank background during transitions */}
        <div className="absolute inset-0 z-0">
          <Image
            src={GUIDE_HERO_IMAGES[prevHeroIndex]}
            alt=""
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/95 to-slate/20 z-10 transition-opacity duration-700" aria-hidden="true" />
        </div>

        <AnimatePresence>
          <motion.div
            key={GUIDE_HERO_IMAGES[currentHeroIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 4, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0 z-20"
          >
            <Image
              src={GUIDE_HERO_IMAGES[currentHeroIndex]}
              alt="Solo travel background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate/95 to-slate/20 z-10 transition-opacity duration-700" aria-hidden="true" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase bg-sunset text-white rounded-full shadow-lg"
          >
            Solo Traveler's Toolkit
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            Navigate <br />
            <span className="italic text-sunset drop-shadow-[0_2px_15px_rgba(255,107,74,0.6)]">Southeast Asia.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          >
            Curated guides, safety protocols, and local secrets for the modern wanderer.
            Your solo adventure starts here.
          </motion.p>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          TIPS GRID (Glassmorphism)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 z-30 px-6 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {soloTips.map((tip, idx) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 bg-white/80 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-sunset/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sunset group-hover:text-white transition-all duration-300">
                <tip.icon className="w-7 h-7 text-sunset group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate">{tip.title}</h3>
              <p className="text-slate-mid text-sm leading-relaxed">{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DESTINATIONS DEEP DIVE
      ══════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-7xl mx-auto mb-40">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate leading-none mb-6">
              The <span className="italic text-sunset">Philippines</span> Deep Dive.
            </h2>
            <p className="text-slate-mid text-lg">
              We've vetted every island and coastal town. These are the top regions in the Philippines
              where solo travelers thrive the most.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sunset transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80 pl-12 pr-6 py-4 bg-white border border-slate/20 rounded-full focus:outline-none focus:ring-2 focus:ring-sunset/20 focus:border-sunset transition-all shadow-sm"
                />
              </div>
              <div className="flex gap-2 p-1.5 bg-slate/5 rounded-full backdrop-blur-sm overflow-x-auto no-scrollbar">
                {VIBES.map((vibe) => (
                  <button 
                    key={vibe}
                    onClick={() => setFilterVibe(vibe)}
                    className={cn(
                      "px-5 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all",
                      filterVibe === vibe 
                        ? "bg-slate text-white shadow-lg" 
                        : "text-slate/60 hover:text-slate"
                    )}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${filterVibe}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.35, ease: "easeOut" }}
              >
                <Link 
                  href={`/destinations/${dest.id}`}
                  className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl focus-ring block"
                >
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Top Right: Rating Badge */}
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <Star className="w-3 h-3 text-sunset fill-sunset" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">
                        {dest.rating}
                      </span>
                    </div>
                  </div>

                  {/* Top Left: Verified Badge (if applicable) */}
                  {dest.verified && (
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-sunset/90 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                        <ShieldCheck className="w-3 h-3 text-white" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Verified</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Content */}
                  <div className="absolute bottom-8 left-8 right-8 text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-sunset" />
                      <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                        {dest.region}
                      </span>
                      <span className="w-1 h-1 bg-white/30 rounded-full" />
                      <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                        {dest.vibe}
                      </span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2 leading-none">
                      {dest.title}
                    </h3>
                    <p className="text-white/70 text-sm font-medium line-clamp-1 group-hover:text-white/90 transition-colors">
                      {dest.tagline}
                    </p>
                    
                    {/* Hover-only description */}
                    <p className="text-white/60 text-[11px] leading-relaxed mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 line-clamp-2">
                      {dest.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
            {filteredDestinations.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-20 text-center"
              >
                <div className="w-20 h-20 bg-mist rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-slate/30" />
                </div>
                <h3 className="text-2xl font-bold text-slate">No destinations found</h3>
                <p className="text-slate-mid">Try adjusting your filters or search query.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SAFETY PROTOCOLS (Premium Glass)
      ══════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-7xl mx-auto mb-40">
          <div className="bg-slate rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl ring-1 ring-white/10">
            {/* Removed noisy pattern for better text clarity */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate via-slate-mid to-slate opacity-100" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sunset font-black tracking-widest uppercase text-xs mb-6 block drop-shadow-sm">Secure your journey</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                  The <span className="italic text-sunset drop-shadow-[0_2px_12px_rgba(255,107,74,0.4)]">Safety</span> <br />
                  Standard.
                </h2>
                <p className="text-white text-lg mb-10 max-w-lg leading-relaxed font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  Solo travel in the Philippines is generally safe, but we believe in proactive security. 
                  These are the protocols every 'Kin' member follows.
                </p>
                
                <div className="space-y-4">
                  {[
                    { title: "The 'Active Check-in'", desc: "Automated GPS pings to a trusted 'Kin' buddy if you haven't checked in by 10 PM." },
                    { title: "The Grab-First Protocol", desc: "Vetted drivers, tracked routes, and fixed pricing—essential for city transit in Manila and Cebu." },
                    { title: "The GCash Reserve", desc: "Keep a digital backup of 2,000 PHP for emergencies where cards aren't accepted." }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all group/item backdrop-blur-xl shadow-xl">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 drop-shadow-md text-lg">
                        {item.title}
                        <ArrowRight className="w-4 h-4 text-sunset opacity-0 group-hover/item:opacity-100 transition-all" />
                      </h4>
                      <p className="text-white/90 text-sm font-bold leading-relaxed drop-shadow-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-sunset/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/1006360/pexels-photo-1006360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Travel safety"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    <span className="text-white font-black text-xs uppercase tracking-wider">Live Safety Alert</span>
                  </div>
                  <p className="text-white text-sm font-medium leading-relaxed">
                    Local reports indicate high sea swells in Palawan. All boat tours suspended for 24 hours. Stay inland.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          MEET THE KIN (Community)
      ══════════════════════════════════════════════════════════ */}
      <section className="px-6 max-w-7xl mx-auto mb-40 text-center">
        <h2 className="text-5xl md:text-7xl font-serif text-slate mb-16">
          Meet your <span className="italic text-sunset">Kin</span> in PH.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[
            { name: "Sarah", loc: "Siargao", img: "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Marcus", loc: "El Nido", img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Elena", loc: "Cebu", img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Kenji", loc: "Siquijor", img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Sofia", loc: "Coron", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Alex", loc: "BGC", img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800" }
          ].map((kin, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform cursor-pointer ring-4 ring-sunset/10">
                <Image src={kin.img} alt={kin.name} fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-sunset/20 opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h4 className="text-slate font-bold">{kin.name}</h4>
                <p className="text-slate-mid text-xs font-semibold uppercase tracking-widest">{kin.loc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 flex flex-col items-center gap-6">
          <button 
            onClick={startMatching}
            className="inline-flex items-center gap-3 px-10 py-5 bg-sunset text-white rounded-full font-black hover:bg-sunset-dark transition-all shadow-2xl shadow-sunset/30 group"
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Find a Travel Buddy Now
          </button>
            <Link href="/verify" className="inline-flex items-center gap-3 px-10 py-5 bg-slate text-white rounded-full font-black hover:bg-slate-mid transition-all shadow-2xl">
              Join the Verified Community <ArrowRight className="w-5 h-5 text-sunset" />
            </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SOLO CONNECT MODAL
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showMatchModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMatchModal(false)}
              className="absolute inset-0 bg-slate/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 text-center">
                {isMatching ? (
                  <div className="py-10">
                    <div className="relative w-32 h-32 mx-auto mb-8">
                      <div className="absolute inset-0 border-4 border-sunset/20 rounded-full" />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-4 border-sunset rounded-full border-t-transparent"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Search className="w-10 h-10 text-sunset" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif text-slate mb-2">Finding your Kin...</h3>
                    <p className="text-slate-mid text-sm">Scanning active solo travelers in your area.</p>
                  </div>
                ) : matchedBuddy ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="mb-6 inline-block px-4 py-1.5 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                      Match Found!
                    </div>
                    <div className="relative w-40 h-40 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform">
                      <Image src={matchedBuddy.img} alt={matchedBuddy.name} fill className="object-cover object-top" />
                    </div>
                    <h3 className="text-3xl font-serif text-slate mb-2">{matchedBuddy.name}</h3>
                    <p className="text-sunset font-bold text-xs uppercase tracking-widest mb-4">Interest: {matchedBuddy.interest}</p>
                    <p className="text-slate-mid text-sm leading-relaxed mb-8 px-4">
                      "{matchedBuddy.bio}"
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setShowMatchModal(false)}
                        className="flex-1 py-4 bg-slate text-white rounded-2xl font-bold hover:bg-slate-mid transition-all"
                      >
                        Send Message
                      </button>
                      <button 
                        onClick={startMatching}
                        className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </div>
              <button 
                onClick={() => setShowMatchModal(false)}
                className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════
          CHECKLIST SECTION (Modified to blend better)
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sunset font-black tracking-widest uppercase text-[10px] mb-6 block">The Essentials</span>
            <h2 className="text-5xl md:text-7xl font-serif text-slate leading-tight mb-8">
              Solo Packing <br />
              <span className="italic text-sunset">Manifesto.</span>
            </h2>
            <p className="text-slate-mid text-lg mb-10 max-w-lg">
              Don't overpack. These are the non-negotiables for a solo loop in the Philippines. 
              Interactive checklist—mark them as you go.
            </p>
            
            <div className="space-y-3">
              {PACKING_LIST.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                    checkedItems.includes(item.id) 
                      ? "bg-green-50 border-green-100 text-green-700" 
                      : "bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {checkedItems.includes(item.id) ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                    <span className={cn("font-bold text-sm", checkedItems.includes(item.id) && "line-through opacity-50")}>
                      {item.item}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-30">{item.category}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-slate rounded-3xl flex items-center justify-between shadow-2xl">
              <div>
                <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest mb-1">Progress</p>
                <p className="text-white text-2xl font-serif italic">
                  {checkedItems.length} <span className="text-white/70 font-sans not-italic text-sm">of {PACKING_LIST.length} packed</span>
                </p>
              </div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                  <circle 
                    cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                    strokeDasharray={175.92}
                    strokeDashoffset={175.92 - (175.92 * checkedItems.length) / PACKING_LIST.length}
                    className="text-sunset transition-all duration-1000" 
                  />
                </svg>
                <Zap className="absolute w-5 h-5 text-sunset" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-sunset/5 rounded-full blur-3xl animate-pulse" />
            <div className="relative bg-white border border-slate-200 rounded-[3rem] p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Umbrella className="w-20 h-20 text-slate-50 rotate-12" />
              </div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center rotate-6 shadow-2xl">
                  <Backpack className="w-8 h-8 text-white -rotate-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 text-2xl font-bold">Ready to Wander?</h4>
                  <p className="text-slate-400">Join the next 'Kin' loop.</p>
                </div>
              </div>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sunset/10 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-sunset" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Active Solo Travelers</p>
                    <p className="text-xs text-slate-500">2,400+ Kin members currently in PH</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Verified Security</p>
                    <p className="text-xs text-slate-500">100% vetted boat captains and guides</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/verify" className="group flex items-center justify-center gap-3 w-full py-5 bg-sunset text-white rounded-2xl font-black text-center hover:bg-sunset-dark transition-all duration-300 shadow-xl shadow-sunset/20">
                  Join the Community <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/" className="block w-full py-5 border border-slate-200 text-slate-600 rounded-2xl font-bold text-center hover:bg-slate-50 transition-all">
                  Return to Base
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="bg-sand py-20 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <span className="text-3xl font-serif font-bold text-slate-900">
            Travel <span className="text-sunset italic">Kin</span>
          </span>
          <div className="flex gap-10 text-slate-400 text-sm font-bold uppercase tracking-widest">
            <Link href="/" className="hover:text-sunset transition-colors">Home</Link>
            <Link href="/#destinations" className="hover:text-sunset transition-colors">Explore</Link>
            <Link href="/#safety" className="hover:text-sunset transition-colors">Safety</Link>
          </div>
          <p className="text-slate-400 text-xs font-medium">© 2026 Travel Kin. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[100] bg-slate-900 p-10 flex flex-col items-center justify-center text-center"
          >
            <button className="absolute top-10 right-10 text-white" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-10 h-10" />
            </button>
            <nav className="space-y-10">
              <Link href="/" className="block text-5xl font-serif text-white hover:text-sunset transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/guides" className="block text-5xl font-serif text-sunset transition-colors" onClick={() => setMobileMenuOpen(false)}>Guides</Link>
              <Link href="/#destinations" className="block text-5xl font-serif text-white hover:text-sunset transition-colors" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
              <Link href="/verify" className="block text-5xl font-serif text-white hover:text-sunset transition-colors" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
