"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Users, ShieldCheck, ChevronRight, Menu, X, Camera, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const destinations = [
    { title: "El Nido", location: "Palawan, PH", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=1280", price: "$499+" },
    { title: "Boracay", location: "Aklan, PH", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1280", price: "$320+" },
    { title: "Siargao", location: "Surigao, PH", image: "https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=1280", price: "$280+" },
  ];

  return (
    <main className="min-h-screen bg-sand/30 selection:bg-sunset/30">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass m-4 rounded-3xl" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-slate tracking-tight">
            Travel <span className="text-ocean">Kin</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            {["Destinations", "Crew", "Experiences", "Safety"].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate/80 hover:text-ocean transition-colors">
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-5 py-2.5 text-sm font-medium text-slate hover:text-ocean transition-colors">Login</button>
            <button className="px-6 py-2.5 bg-ocean text-white text-sm font-medium rounded-full shadow-lg hover:shadow-ocean/20 hover:scale-105 active:scale-95 transition-all">
              Join the Crew
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-slate" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate text-white p-8 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
          <button className="absolute top-8 right-8" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          {["Destinations", "Crew", "Experiences", "Safety"].map((item) => (
            <Link key={item} href="#" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </Link>
          ))}
          <button className="w-full max-w-xs py-4 bg-ocean rounded-full font-medium">Join the Crew</button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2560" 
            alt="Tropical Beach" 
            className="w-full h-full object-cover scale-105 animate-subtle-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-sand/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-up">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
            Explore paradise together
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 drop-shadow-2xl leading-[1.1]">
            Wander <span className="italic text-sand">Together</span>, <br /> 
            Wander <span className="underline decoration-sunset/60">Safely</span>
          </h1>
          
          <div className="glass max-w-3xl mx-auto p-4 md:p-2 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-2 shadow-2xl">
            <div className="flex-1 w-full px-6 py-4 flex items-center gap-4 text-left border-b md:border-b-0 md:border-r border-slate/10">
              <MapPin className="w-5 h-5 text-ocean" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate/50 font-bold">Location</span>
                <input 
                  type="text" 
                  placeholder="Where to next?" 
                  className="bg-transparent border-none outline-none text-slate font-medium placeholder:text-slate/30"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full px-6 py-4 flex items-center gap-4 text-left border-b md:border-b-0 md:border-r border-slate/10">
              <Users className="w-5 h-5 text-sunset" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate/50 font-bold">Crew</span>
                <span className="text-slate font-medium">Find Travel Kin</span>
              </div>
            </div>

            <button className="bg-ocean text-white p-4 md:p-6 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl group">
              <Search className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-slate mb-6">Popular Places</h2>
            <p className="text-slate/60 text-lg">Curated destinations across Southeast Asia where your Travel Kin are already exploring.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-ocean font-semibold group">
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <div key={idx} className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <img src={dest.image} alt={dest.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sunset font-bold mb-2 block">{dest.location}</span>
                    <h3 className="text-3xl font-serif text-white">{dest.title}</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                    <span className="text-white font-medium">{dest.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Travel Kin */}
      <section className="py-24 px-6 bg-slate text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="animate-fade-up">
            <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">
              Safety is our <br />
              <span className="text-sunset italic">North Star</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: "Verified Companions", desc: "Every Travel Kin member undergoes identity verification for peace of mind." },
                { icon: Users, title: "Crew Matching", desc: "Algorithmically match with travelers who share your interest and vibe." },
                { icon: MapPin, title: "Local Expert Guides", desc: "Access a vetted network of local guides who know the hidden gems." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-sunset/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-sunset" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                    <p className="text-white/50">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-12 px-10 py-4 bg-white text-slate font-bold rounded-full hover:bg-sunset hover:text-white transition-all shadow-xl">
              Learn More About Safety
            </button>
          </div>
          <div className="relative h-[600px] rounded-[3rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=1280" alt="Travel Together" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-ocean/20 mix-blend-overlay" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <Link href="/" className="text-3xl font-serif font-bold text-slate mb-4 block">
              Travel <span className="text-ocean">Kin</span>
            </Link>
            <p className="text-slate/40 max-w-xs">Building the most trusted social layer for Southeast Asian exploration.</p>
          </div>
          <div className="flex gap-10">
            {["Destinations", "Crew", "Safety", "Blog"].map((item) => (
              <Link key={item} href="#" className="text-slate/60 hover:text-ocean font-medium">{item}</Link>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-sand rounded-full text-slate hover:bg-sunset hover:text-white transition-colors cursor-pointer"><Camera className="w-5 h-5" /></div>
            <div className="p-3 bg-sand rounded-full text-slate hover:bg-sunset hover:text-white transition-colors cursor-pointer"><Globe className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate/5 text-center text-slate/30 text-xs">
          © 2026 Travel Kin. All rights reserved. Built for wanderers.
        </div>
      </footer>
    </main>
  );
}
