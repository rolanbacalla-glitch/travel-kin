"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Heart,
  Clock,
  Phone,
  MapPin,
  CheckCircle,
  Users,
  Eye,
  Lock,
  Zap,
  Globe,
  Bell
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MobileMenu } from "@/components/MobileMenu";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function SafetyCommitmentPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Verified Community",
      desc: "Every single member undergoes a multi-step verification process, including government ID checks and social validation, ensuring you only travel with real, trusted people.",
      color: "bg-blue-500",
      image: "/images/safety/community.png"
    },
    {
      icon: Clock,
      title: "24/7 Rapid Response",
      desc: "Our global emergency team is on standby every second. From medical assistance to travel disruptions, we provide immediate support in local languages.",
      color: "bg-sunset",
      image: "/images/safety/response.png"
    },
    {
      icon: MapPin,
      title: "Safe-Zones & Guides",
      desc: "We curate 'Travel Kin Safe Zones' and partner with licensed local guides who are vetted for their expertise, local knowledge, and commitment to solo traveler safety.",
      color: "bg-green-500",
      image: "/images/safety/guides.png"
    }
  ];

  const protocols = [
    {
      title: "ID Verification",
      detail: "Secure biometric verification integrated with government databases.",
      icon: Lock
    },
    {
      title: "Real-time Tracking",
      detail: "Optional live location sharing with our response center while on solo treks.",
      icon: Zap
    },
    {
      title: "Emergency SOS",
      detail: "One-tap emergency button that alerts local authorities and our team.",
      icon: Bell
    },
    {
      title: "Community Ratings",
      detail: "Transparent, forced-feedback loop for all companions and guides.",
      icon: Users
    }
  ];

  return (
    <main className="relative min-h-screen bg-sand font-sans selection:bg-sunset selection:text-white overflow-x-hidden">
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden bg-slate">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sunset/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-ocean/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

        <div className="absolute inset-0 z-0">
          <Image
            src="/images/safety-hero.png"
            alt="Safety and Peace of Mind"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate/80 via-slate/40 to-slate/90 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Content Area - Centered with plenty of breathing room */}
        <div className="container mx-auto px-6 relative z-10 pt-32 pb-32 flex-grow flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-widest text-[10px]">Global Safety Network Active</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-[1] tracking-tighter">
              Your Safety is Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset via-terra to-sunset bg-[length:200%_auto] animate-gradient">Sacred</span> Commitment.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12">
              We&apos;ve built the world&apos;s most sophisticated safety infrastructure for solo travelers.
              Because freedom only truly exists when you&apos;re protected.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <button className="px-10 py-5 bg-sunset text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl">
                Explore Our Infrastructure
              </button>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                Download Safety Whitepaper
              </button>
            </div>
          </motion.div>


        </div>

        {/* Stats Strip */}
        <div className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10">
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {[
                { label: "Emergency Response", value: "< 5 Mins" },
                { label: "Identity Verified", value: "100%" },
                { label: "Local Safety Zones", value: "1,200+" },
                { label: "Global Coverage", value: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-sunset text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars - Interactive Section */}
      <section className="py-24 bg-sand">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate mb-6">Our Three Pillars</h2>
            <p className="text-slate-mid text-lg max-w-2xl mx-auto">
              We built Travel Kin on a foundation of trust. Here is how we ensure
              your journey is as safe as it is spectacular.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  onClick={() => setActiveTab(idx)}
                  className={`p-8 rounded-3xl cursor-pointer transition-all duration-300 ${activeTab === idx
                      ? "bg-white shadow-2xl scale-[1.02] border-l-8 border-sunset"
                      : "bg-transparent opacity-60 hover:opacity-100"
                    }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl ${pillar.color} text-white shrink-0`}>
                      <pillar.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate mb-2">{pillar.title}</h3>
                      <p className="text-slate-mid leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={pillars[activeTab].image}
                    alt={pillars[activeTab].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-sm font-bold uppercase tracking-widest text-sunset mb-2">Our Standard</p>
                    <h4 className="text-4xl font-serif font-bold">{pillars[activeTab].title}</h4>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Protocols Grid */}
      <section className="py-24 bg-slate text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-sunset/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Redundant Systems for Absolute Peace</h2>
            <p className="text-white/60 text-lg">Our protocols are built on multiple layers of redundancy, ensuring that help is always available, even in the most remote locations.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {protocols.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-sunset/50 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-sunset/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <p.icon className="w-8 h-8 text-sunset" />
                </div>
                <h4 className="text-2xl font-bold mb-4">{p.title}</h4>
                <p className="text-white/50 leading-relaxed text-sm">{p.detail}</p>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <span className="text-xs font-bold text-sunset uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Active Protocol</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Infrastructure */}
      <section className="py-24 bg-sand overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-2 bg-ocean/10 text-ocean rounded-full text-xs font-bold uppercase tracking-widest mb-6">Backend & Data</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate mb-8">Bank-Grade Security for Your Identity.</h2>
              <p className="text-xl text-slate/70 leading-relaxed mb-10">
                We take your privacy as seriously as your physical safety. Your data is encrypted using
                AES-256 standards and hosted on dedicated, isolated servers in secure jurisdictions.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Zero-Knowledge Proofs", desc: "We verify your identity without storing your sensitive documents." },
                  { title: "Biometric Auth", desc: "FaceID and fingerprint integration for all app-based SOS features." },
                  { title: "GDPR+ Compliance", desc: "We exceed global privacy standards to ensure your travel history is yours alone." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="mt-1 p-2 bg-white rounded-xl shadow-md">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate text-lg mb-1">{item.title}</h5>
                      <p className="text-slate/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-sunset/10 blur-[80px] rounded-full" />
              <div className="relative p-4 bg-white rounded-[3rem] shadow-2xl border border-slate/5 overflow-hidden">
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                    <Image src="/images/bali.png" alt="Secure Bali" fill className="object-cover grayscale-[0.5] opacity-80" />
                    <div className="absolute inset-0 bg-slate/40 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white/50" />
                    </div>
                  </div>
                  <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mt-8">
                    <Image src="/images/siargao.png" alt="Secure Siargao" fill className="object-cover grayscale-[0.5] opacity-80" />
                    <div className="absolute inset-0 bg-slate/40 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white/50" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-6 bg-slate text-white rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Network Integrity</p>
                      <p className="text-sm font-mono font-bold tracking-tighter">AES-256-GCM SECURE</p>
                    </div>
                  </div>
                  <Zap className="w-6 h-6 text-sunset animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-sunset">
        <div className="container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="w-20 h-20 mx-auto mb-8 text-white drop-shadow-xl" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to travel with confidence?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
              Join 50,000+ solo travelers who have discovered the peace of mind
              that comes with the Travel Kin community.
            </p>
            <Link
              href="/verify"
              className="inline-flex items-center px-10 py-5 bg-slate text-white text-lg font-bold rounded-2xl hover:bg-slate-mid transition-all shadow-2xl active:scale-95"
            >
              Get Verified Today
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
