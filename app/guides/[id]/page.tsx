"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Shield, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";
import { GUIDE_DESTINATIONS } from "../page";

export default function GuideDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guide = GUIDE_DESTINATIONS.find((g) => g.id === id);

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  if (!guide) {
    return (
      <div className="min-h-screen bg-sand flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif font-bold text-slate mb-4">Guide not found</h1>
        <Link href="/guides" className="text-sunset font-bold hover:underline">
          Return to Guides
        </Link>
      </div>
    );
  }

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

      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate">
        <div className="absolute inset-0 z-0">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20">
          <Link href="/guides" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            {guide.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-sunset font-medium"
          >
            {guide.tagline}
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 -mt-32 relative z-30 border border-slate-100">
          <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate font-bold">
              <Star className="w-5 h-5 text-sunset fill-sunset" />
              {guide.rating} Rating
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex items-center gap-2 text-slate font-bold">
              <Shield className="w-5 h-5 text-emerald-500" />
              Safety Score: {guide.safetyScore}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <div className="flex gap-2">
              {guide.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed text-xl mb-8">
              {guide.desc}
            </p>
            
            <h3 className="text-2xl font-serif font-bold text-slate mb-4 mt-12">Solo Survival Tips</h3>
            <ul className="space-y-4 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-sunset font-bold mt-1">1.</span>
                <span>Connect with local communities and verified solo travelers through our app to plan your days.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sunset font-bold mt-1">2.</span>
                <span>Keep your emergency contacts updated in your Kin profile. Our 24/7 team monitors local alerts.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sunset font-bold mt-1">3.</span>
                <span>Respect local customs and environments. Leave no trace, and support local businesses wherever possible.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-slate mb-4 mt-12">Getting Around</h3>
            <p className="text-slate-600 leading-relaxed">
              Tricycles and motorbikes are the main mode of transport. Always negotiate fares before hopping in, or use trusted local apps if available. If renting a scooter, ensure you have an international license and always wear a helmet—safety first.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
