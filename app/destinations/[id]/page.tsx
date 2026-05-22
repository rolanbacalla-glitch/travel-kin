"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  ArrowLeft,
  Star,
  MapPin,
  ShieldCheck,
  Users,
  Clock,
  Calendar,
  Waves,
  Mountain,
  TreePine,
  ArrowRight,
  Share2,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";
import { destinations } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!destination) {
    notFound();
  }

  const titleParts = destination.title.split(" ");
  const firstPart = titleParts.slice(0, -1).join(" ");
  const lastPart = titleParts[titleParts.length - 1];

  const sections = [
    { icon: ShieldCheck, title: "Solo-Safe", desc: "ID-verified community and 24/7 emergency support on the island." },
    { icon: Users, title: "Kin Matching", desc: "Find 3-5 verified companions sharing this exact route." },
    { icon: Clock, title: "Flexible Pace", desc: "Curated itineraries that prioritize freedom over strict schedules." },
  ];

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
        {/* Full Screen Hero */}
        <section className="relative min-h-screen w-full overflow-hidden bg-slate flex items-center justify-center">
          <Image
            src={destination.image}
            alt={destination.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />

          <div className="absolute z-20 top-32 left-6 right-6 md:left-24 md:right-24 flex justify-between items-start">
            <Link
              href="/destinations"
              className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white hover:text-slate transition-all"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Explore</span>
            </Link>

            <div className="flex gap-4">
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white hover:text-slate transition-all group">
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white hover:text-sunset transition-all group">
                <Heart className="w-5 h-5 group-hover:fill-sunset transition-all" />
              </button>
            </div>
          </div>

          <div className="absolute z-20 bottom-24 left-6 right-6 md:left-24 md:right-24 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunset/20 border border-sunset/30 text-sunset text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sunset"></span>
                </span>
                {destination.tag} · {destination.subtitle}
              </span>
              <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 leading-[1.15] tracking-tighter">
                {firstPart ? (
                  <>
                    {firstPart}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset via-terra to-sunset bg-[length:200%_auto] animate-gradient">
                      {lastPart}
                    </span>
                  </>
                ) : (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset via-terra to-sunset bg-[length:200%_auto] animate-gradient">
                    {destination.title}
                  </span>
                )}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mb-12 leading-relaxed font-medium">
                {destination.tagline}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-24">
            {/* Overview */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-ocean">Overview</h2>
                <h3 className="text-5xl font-serif font-bold text-slate leading-tight">
                  Escape the ordinary and <span className="text-terra">immerse yourself</span> in local wonder.
                </h3>
              </div>
              <p className="text-xl text-slate/60 leading-relaxed font-medium">
                Experience {destination.title} like a local, not a tourist. Our curated exploration of this {destination.tag.toLowerCase()} is designed for solo travellers seeking both autonomy and connection. We handle the complex logistics—verified guides, safe transport, and vetted stays—so you can focus on the moment.
              </p>

              <div className="grid md:grid-cols-3 gap-8 pt-12">
                {sections.map((s, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-slate/5 border border-slate/5 hover:bg-white hover:shadow-2xl hover:shadow-slate/5 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-ocean shadow-sm mb-6 group-hover:scale-110 transition-transform">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate mb-2">{s.title}</h4>
                    <p className="text-sm text-slate/50 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-sunset">The Vibe</h2>
                  <h3 className="text-4xl font-serif font-bold text-slate">Visual Narrative</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate hover:text-ocean transition-colors">
                  View All Photos
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
                  <Image src="https://images.pexels.com/photos/16141092/pexels-photo-16141092.jpeg?auto=compress&cs=tinysrgb&w=800" fill className="object-cover hover:scale-105 transition-transform duration-700" alt="Vibe 1" />
                </div>
                <div className="space-y-6 flex flex-col">
                  <div className="relative flex-grow rounded-[3rem] overflow-hidden">
                    <Image src="https://images.pexels.com/photos/573850/pexels-photo-573850.jpeg?auto=compress&cs=tinysrgb&w=800" fill className="object-cover hover:scale-105 transition-transform duration-700" alt="Vibe 2" />
                  </div>
                  <div className="relative aspect-[3/2] rounded-[3rem] overflow-hidden">
                    <Image src="https://images.pexels.com/photos/4982560/pexels-photo-4982560.jpeg?auto=compress&cs=tinysrgb&w=800" fill className="object-cover hover:scale-105 transition-transform duration-700" alt="Vibe 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[3.5rem] p-10 border border-slate/5 shadow-2xl shadow-slate/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8">
                  <div className="px-4 py-1.5 bg-ocean/10 text-ocean rounded-full text-[10px] font-black uppercase tracking-widest">
                    Best Value
                  </div>
                </div>

                <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate/30 block mb-2">Private Room or Shared Villa</span>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-5xl font-serif font-bold text-slate">{destination.price}</h4>
                    <span className="text-slate/40 font-bold uppercase text-[10px] tracking-widest">/ Per Trip</span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 text-slate/60">
                    <Calendar className="w-5 h-5 text-sunset" />
                    <span className="text-sm font-medium">8 Days / 7 Nights Expedition</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate/60">
                    <MapPin className="w-5 h-5 text-ocean" />
                    <span className="text-sm font-medium">Includes internal flights & boat transfers</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate/60">
                    <Users className="w-5 h-5 text-terra" />
                    <span className="text-sm font-medium">Max 8 explorers per crew</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full py-6 bg-slate text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Apply to Join Crew
                  </button>
                  <p className="text-[10px] text-center text-slate/30 font-bold uppercase tracking-widest leading-loose">
                    Vetting required for all members. <br /> Safety is our priority.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-[3rem] bg-ocean/5 border border-ocean/10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate/10 overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?u=${i + 10}`} width={40} height={40} alt="Explorer" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ocean mb-1">Crew Status</p>
                  <p className="text-xs font-bold text-slate">4 Explorers already confirmed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Destinations */}
        <section className="bg-slate py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-sunset mb-20">Similar Paradises</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {destinations.filter(d => d.id !== destination.id).slice(0, 3).map((dest) => (
                <Link key={dest.id} href={`/destinations/${dest.id}`} className="group">
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6">
                    <Image src={dest.image} fill className="object-cover group-hover:scale-110 transition-transform duration-700" alt={dest.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate to-transparent opacity-60" />
                    <div className="absolute bottom-8 left-8">
                      <h4 className="text-2xl font-serif font-bold text-white mb-2">{dest.title}</h4>
                      <p className="text-white/60 text-xs font-black uppercase tracking-widest">{dest.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
