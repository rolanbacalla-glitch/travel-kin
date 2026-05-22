"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Shield,
  Heart,
  Star,
  ChevronRight,
  Search,
  Calendar,
  Backpack,
  Wifi,
  Phone,
  Droplets
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";

// Mock Data for Guides
const DESTINATIONS = [
  {
    id: "siargao",
    title: "Siargao Island",
    tagline: "The Surfing Capital",
    desc: "More than just waves, Siargao offers a laid-back island vibe perfect for solo travelers. From the famous Cloud 9 boardwalk to hidden lagoons and coconut forests, it's a place where you'll find your tribe instantly.",
    image: "https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.5/10",
    rating: 4.9,
    tags: ["Surfing", "Island Life", "Social"],
    color: "bg-blue-500"
  },
  {
    id: "el-nido",
    title: "El Nido, Palawan",
    tagline: "The Last Frontier",
    desc: "Dramatic limestone cliffs, turquoise lagoons, and secret beaches. El Nido is the crown jewel of Palawan. Perfect for solo boat tours where you can bond with fellow travelers over grilled seafood and breathtaking sunsets.",
    image: "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.2/10",
    rating: 4.8,
    tags: ["Nature", "Adventure", "Photography"],
    color: "bg-emerald-500"
  },
  {
    id: "boracay",
    title: "Boracay Island",
    tagline: "The Ivory Playground",
    desc: "Renowned for its White Beach, Boracay is the ultimate place to unwind and socialize. After its restoration, it's cleaner and more regulated, making it incredibly safe for solo travelers to enjoy sunset drinks and meet fellow wanderers at beachfront lounges.",
    image: "https://images.pexels.com/photos/33676228/pexels-photo-33676228.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.3/10",
    rating: 4.6,
    tags: ["Relaxation", "Nightlife", "Beach"],
    color: "bg-orange-400"
  },
  {
    id: "cebu",
    title: "Cebu & Moalboal",
    tagline: "The Adventure Hub",
    desc: "Swim with millions of sardines, trek to Kawasan Falls, or dive with thresher sharks in Malapascua. Cebu is for the solo traveler who can't sit still and wants a mix of city convenience and raw nature.",
    image: "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "8.9/10",
    rating: 4.7,
    tags: ["Diving", "Canyoning", "Wildlife"],
    color: "bg-indigo-500"
  }
];

const PACKING_ESSENTIALS = [
  { icon: Backpack, title: "Dry Bag", desc: "A 20L dry bag is non-negotiable for boat tours." },
  { icon: Wifi, title: "eSim", desc: "Get an Airalo or local GOMO sim for consistent data." },
  { icon: Phone, title: "Grab App", desc: "Essential for fair-priced transport in cities." },
  { icon: Droplets, title: "Reef Safe Sunscreen", desc: "Protect the oceans while you tan." }
];

export default function GuidesPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDestinations = DESTINATIONS.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-sand overflow-x-hidden selection:bg-sunset selection:text-white">
      <Navbar
        isScrolled={isScrolled}
        navLinks={navLinks}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION - CINEMATIC & BOLD
          ══════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate">
        {/* Background Video/Image placeholder */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Siargao Coastline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset/20 border border-sunset/30 text-sunset text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sunset"></span>
              </span>
              Solo Expedition 2026
            </span>

            <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 leading-[1.15] tracking-tighter">
              The Solo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset via-terra to-sunset bg-[length:200%_auto] animate-gradient">
                Survival Kit.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              The ultimate blueprint for navigating the Philippines solo.
              No fluff, just the essentials for your next loop.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-10 py-5 bg-sunset text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Download Full PDF <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">
                View Checklist
              </button>
            </div>
          </motion.div>
        </div>


      </section>

      {/* ══════════════════════════════════════════════════════════
          SEARCH & FILTER - INTERACTIVE
          ══════════════════════════════════════════════════════════ */}
      <br></br><br></br>< section className="py-20 px-6 relative z-30 -mt-20" >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center border border-slate-100">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search islands, activities, or vibes..."
                className="w-full pl-16 pr-6 py-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-sunset transition-all text-slate-700 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {["all", "beach", "adventure", "social"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-5 rounded-2xl font-bold capitalize transition-all whitespace-nowrap ${activeTab === tab
                    ? "bg-slate text-white shadow-lg shadow-slate/20"
                    : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* ══════════════════════════════════════════════════════════
          DESTINATION CARDS - BENTO GRID STYLE
          ══════════════════════════════════════════════════════════ */}
      < section className="py-20 px-6 max-w-7xl mx-auto" >
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-sunset font-black tracking-widest uppercase text-[10px] mb-4 block">The 2026 Selection</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate mb-6">Explore the <span className="text-sunset">Kin-Map</span>.</h2>
            <p className="text-slate-mid text-lg md:text-xl font-medium">
              We&rsquo;ve vetted these islands specifically for solo safety, social atmosphere, and the &ldquo;vibe&rdquo; factor.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-3xl font-serif font-bold text-slate">47k+</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Active Solo Kins</p>
            </div>
            <div className="w-[1px] h-12 bg-slate-200" />
            <div className="text-right">
              <p className="text-3xl font-serif font-bold text-slate">98%</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Safety Rating</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {filteredDestinations.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Floating Tags */}
                <div className="absolute top-8 left-8 flex gap-2">
                  {dest.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-black leading-none">{dest.safetyScore.split('/')[0]}</span>
                  <span className="text-[8px] uppercase font-bold opacity-60 tracking-tighter">Safe</span>
                </div>

                <div className="absolute bottom-10 left-10 right-10">
                  <p className="text-sunset font-black uppercase tracking-[0.3em] text-[10px] mb-2">{dest.tagline}</p>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{dest.title}</h3>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-sunset text-sunset" />
                      <span className="text-sm font-bold">{dest.rating}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/40" />
                    <span className="text-sm font-medium">Verified by 2k+ kins</span>
                  </div>
                </div>
              </div>

              <div className="px-4">
                <p className="text-slate-mid text-lg leading-relaxed mb-6">
                  {dest.desc}
                </p>
                <Link
                  href={`/guides/${dest.id}`}
                  className="inline-flex items-center gap-3 text-slate font-black uppercase tracking-widest text-xs group/link"
                >
                  Read Full Survival Guide
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center group-hover/link:bg-sunset group-hover/link:text-white transition-all shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section >

      {/* ══════════════════════════════════════════════════════════
          QUICK TIPS SECTION - GLASSY TILES
          ══════════════════════════════════════════════════════════ */}
      < section className="py-32 px-6 bg-slate overflow-hidden relative" >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sunset/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-sunset font-black tracking-widest uppercase text-[10px] mb-6 block">The Essentials</span>
            <h2 className="text-5xl md:text-8xl font-serif text-white leading-tight">
              Pack Like a <span className="text-sunset">Pro.</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
              Don&apos;t overpack. These are the non-negotiables for a solo loop in the Philippines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKING_ESSENTIALS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-sunset/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-sunset" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h4>
                <p className="text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* ══════════════════════════════════════════════════════════
          NEWSLETTER / CTA
          ══════════════════════════════════════════════════════════ */}
      < section className="py-40 px-6" >
        <div className="max-w-5xl mx-auto relative rounded-[3.5rem] overflow-hidden bg-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sunset/5 to-transparent" />
          <div className="relative z-10 p-12 md:p-24 text-center">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate mb-8 leading-tight">
              Get the <span className="text-sunset">Weekly Loop</span>.
            </h2>
            <p className="text-slate-mid text-xl mb-12 max-w-xl mx-auto font-medium">
              Join 47,000 solo travelers receiving secret spots, safety updates, and flight deals every Sunday.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="kin@travel.com"
                className="flex-1 px-8 py-5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-sunset transition-all text-slate font-bold"
              />
              <button className="px-10 py-5 bg-slate text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate/20">
                Join
              </button>
            </form>
            <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Zero Spam. Just high-grade intel.
            </p>
          </div>
        </div>
      </section >

      <Footer />
    </main >
  );
}
