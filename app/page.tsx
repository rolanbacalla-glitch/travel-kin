"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Users,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Send,
  Compass,
  Star,
  ArrowRight,
  Mountain,
  Waves,
  TreePine,
  Heart,
  Globe,
  Camera,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────── */
/* Data                                                          */
/* ─────────────────────────────────────────────────────────── */

const destinations = [
  {
    id: "el-nido",
    title: "El Nido",
    subtitle: "Palawan, Philippines",
    tagline: "Limestone karsts & hidden lagoons",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=1280",
    price: "From $499",
    rating: 4.9,
    reviews: 1240,
    icon: Waves,
    tag: "ISLAND",
  },
  {
    id: "boracay",
    title: "Boracay",
    subtitle: "Aklan, Philippines",
    tagline: "White sands & world-class sunsets",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1280",
    price: "From $320",
    rating: 4.8,
    reviews: 980,
    icon: TreePine,
    tag: "BEACH",
  },
  {
    id: "siargao",
    title: "Siargao",
    subtitle: "Surigao del Norte, PH",
    tagline: "The surf capital of Asia",
    image:
      "https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=1280",
    price: "From $280",
    rating: 4.9,
    reviews: 765,
    icon: Mountain,
    tag: "SURF",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Companions",
    desc: "Every member is ID-verified and background-checked so you can trust who you wander with.",
    color: "bg-ocean/10 text-ocean",
  },
  {
    icon: Users,
    title: "Solo-First Matching",
    desc: "Our algorithm connects you with travellers who share your pace, interests, and vibe.",
    color: "bg-sunset/10 text-sunset",
  },
  {
    icon: Compass,
    title: "Local Expert Guides",
    desc: "Access a vetted network of local guides who know the hidden beaches and untouched trails.",
    color: "bg-terra/10 text-terra",
  },
  {
    icon: Globe,
    title: "24/7 Safety Support",
    desc: "Round-the-clock emergency support and real-time location sharing with trusted contacts.",
    color: "bg-ocean/10 text-ocean",
  },
];

const testimonials = [
  {
    name: "Mia Reyes",
    origin: "Manila → Siargao",
    quote:
      "I was terrified to travel alone. Travel Kin matched me with 3 people who became my closest friends. That wave I caught? Life-changing.",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    name: "Jake Thornton",
    origin: "London → El Nido",
    quote:
      "The local guide recommendation was gold. Hidden lagoons, zero tourists. This is how solo travel should feel — free, safe, and epic.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
  {
    name: "Sofia Ruiz",
    origin: "Barcelona → Boracay",
    quote:
      "The safety features gave my parents peace of mind and gave me freedom. Best of both worlds for a 23-year-old exploring solo.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
  },
];

const stats = [
  { value: "47K+", label: "Solo Travellers" },
  { value: "87", label: "Destinations" },
  { value: "4.9★", label: "Safety Rating" },
  { value: "180+", label: "Local Guides" },
];

const tickerItems = [
  "El Nido · Palawan",
  "Siargao · Surf Capital",
  "Boracay · White Beach",
  "Cebu · Canyoneering",
  "Coron · Wreck Diving",
  "Camiguin · Island Life",
  "Bohol · Tarsiers & Rice",
  "Batanes · Edge of the World",
];

/* ─────────────────────────────────────────────────────────── */
/* Component                                                     */
/* ─────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Auto-rotate testimonials */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = ["Destinations", "Crew", "Guides", "Safety"];

  return (
    <main className="min-h-screen bg-sand overflow-x-hidden">
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
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-ring rounded-sm"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-ring rounded-full">
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-sunset text-white text-sm font-semibold rounded-full shadow-lg hover:bg-sunset-dark transition-colors duration-200 focus-ring active:scale-95">
              Start Exploring
            </button>
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
          className="fixed inset-0 z-50 bg-slate text-white flex flex-col overscroll-contain"
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
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-4xl font-serif text-white/80 hover:text-white transition-colors duration-200 focus-ring-white rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="px-8 pb-12 space-y-3">
            <button className="w-full py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/10 transition-colors duration-200 focus-ring-white">
              Sign In
            </button>
            <button className="w-full py-4 bg-sunset rounded-2xl text-white font-semibold hover:bg-sunset-dark transition-colors duration-200 focus-ring-white">
              Start Exploring
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        id="main-content"
        ref={heroRef}
        aria-label="Hero — Solo travel, better together"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=2560"
            alt=""
            width={2560}
            height={1440}
            fetchPriority="high"
            className="w-full h-full object-cover animate-subtle-zoom"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate/60 via-slate/30 to-slate/80" />
          {/* Bottom wave fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-sand to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-up pt-24">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase bg-sunset/20 backdrop-blur-md rounded-full text-sunset border border-sunset/30">
            <span className="w-1.5 h-1.5 bg-sunset rounded-full animate-pulse" aria-hidden="true" />
            47,000+ solo travellers already wandering
          </span>

          {/* Headline */}
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif text-white leading-[0.9] mb-8 drop-shadow-2xl text-balance">
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
                <div className="flex flex-col min-w-0 w-full">
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
              <div className="flex-1 flex items-center gap-3 px-5 py-3.5">
                <Users className="w-4 h-4 text-sunset flex-shrink-0" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate/50 font-bold mb-0.5">
                    Trip style
                  </span>
                  <span className="text-slate font-medium text-sm">Solo Explorer</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                aria-label="Search destinations"
                className="sm:ml-auto bg-ocean hover:bg-ocean-dark text-white font-semibold px-7 py-3.5 rounded-[1.5rem] transition-colors duration-200 focus-ring flex items-center gap-2 justify-center active:scale-95 whitespace-nowrap"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>Find My Trip</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float"
          aria-hidden="true"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS TICKER
      ══════════════════════════════════════════════════════════ */}
      <section aria-label="Quick stats" className="bg-slate py-5 overflow-hidden">
        <div className="animate-ticker ticker-track" aria-hidden="true">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-8 text-white/50 text-sm font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-sunset flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
        {/* Screen-reader-accessible stats */}
        <div className="sr-only">
          {tickerItems.join(", ")}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STAT CARDS
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="Platform statistics"
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl md:text-5xl font-serif font-bold text-slate mb-2">{s.value}</p>
              <p className="text-sm text-slate/50 font-medium tracking-wide uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURED DESTINATIONS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="destinations"
        aria-labelledby="destinations-heading"
        className="py-28 px-6 bg-sand"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-sunset mb-3 block">
                Top Picks for Solo Travellers
              </span>
              <h2
                id="destinations-heading"
                className="text-4xl md:text-6xl font-serif text-slate text-balance"
              >
                Where Will You <br />
                <span className="italic text-ocean">Roam Next?</span>
              </h2>
            </div>
            <Link
              href="#all-destinations"
              className="inline-flex items-center gap-2 text-ocean font-semibold group focus-ring rounded-sm self-start md:self-auto"
            >
              All Destinations
              <ChevronRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Destination cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => {
              const Icon = dest.icon;
              return (
                <article
                  key={dest.id}
                  className={cn(
                    "group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl",
                    "hover:clip-[ellipse(90%_85%_at_50%_50%)] transition-[clip-path] duration-700",
                    "h-[520px] md:row-span-1"  // ← All cards now 520px, left one spans 1 row on desktop
                  )}
                  aria-label={`${dest.title} — ${dest.subtitle}`}
                >
                  <img
                    src={dest.image}
                    alt={`${dest.title} — ${dest.tagline}`}
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 card-overlay" aria-hidden="true" />

                  {/* Tag chip */}
                  <div className="absolute top-5 left-5">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/20">
                      <Icon className="w-3 h-3" aria-hidden="true" />
                      {dest.tag}
                    </span>
                  </div>

                  {/* Price chip */}
                  <div className="absolute top-5 right-5">
                    <span className="px-3 py-1 bg-sunset text-white text-xs font-bold rounded-full">
                      {dest.price}
                    </span>
                  </div>

                  {/* Card footer */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-sunset text-xs font-bold tracking-wider uppercase mb-1">
                      {dest.subtitle}
                    </p>
                    <h3 className="text-3xl font-serif text-white mb-1">{dest.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{dest.tagline}</p>

                    <div className="flex items-center justify-between">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex" aria-label={`Rating: ${dest.rating} out of 5`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-3.5 h-3.5",
                                i < Math.floor(dest.rating) ? "text-sunset fill-sunset" : "text-white/30"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <span className="text-white/60 text-xs">({dest.reviews.toLocaleString()})</span>
                      </div>
                      {/* CTA */}
                      <button
                        aria-label={`Explore ${dest.title}`}
                        className="flex items-center gap-1.5 text-white text-sm font-semibold group/btn focus-ring-white rounded-full"
                      >
                        Explore
                        <ArrowRight
                          className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY TRAVEL KIN (Features)
      ══════════════════════════════════════════════════════════ */}
      <section
        id="safety"
        aria-labelledby="features-heading"
        className="py-28 px-6 bg-slate relative overflow-hidden"
      >
        {/* Decorative blob */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 bg-ocean/10 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-sunset/10 rounded-full blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          {/* Left — image stack */}
          <div className="relative h-[580px] hidden lg:block">
            <div className="absolute inset-0 rounded-3xl overflow-hidden rotate-2 shadow-2xl hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=1280"
                alt="Solo traveller watching the sunset in Siargao"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ocean/20 mix-blend-overlay" aria-hidden="true" />
            </div>

            {/* Floating card */}
            <div
              className="absolute -bottom-6 -right-6 glass-dark rounded-2xl p-5 max-w-[240px] shadow-2xl animate-float"
              aria-hidden="true"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sunset/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-sunset" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">100% Verified</p>
                  <p className="text-white/40 text-xs">Identity &amp; Safety</p>
                </div>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-ocean to-sunset border-2 border-slate"
                  />
                ))}
                <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-slate flex items-center justify-center">
                  <span className="text-white/70 text-[9px] font-bold">+99</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — text + features */}
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-sunset mb-4 block">
              Built for Solo Travellers
            </span>
            <h2
              id="features-heading"
              className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight text-balance"
            >
              Safety is our{" "}
              <span className="italic text-sunset">North Star</span>
            </h2>
            <p className="text-white/50 text-lg mb-12 leading-relaxed text-pretty">
              Whether you&rsquo;re a first-time solo adventurer or a seasoned wanderer,
              every feature we build starts with one question: does it keep you safe{" "}
              <em>and</em> free?
            </p>

            <div className="space-y-6" id="crew">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex gap-5 items-start group">
                    <div
                      className={cn(
                        "p-3.5 rounded-2xl border border-white/5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                        f.color
                      )}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{f.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="mt-12 px-8 py-4 bg-white text-slate font-bold rounded-full hover:bg-sand transition-colors duration-200 shadow-xl focus-ring flex items-center gap-2 group">
              Learn About Safety
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="testimonials-heading"
        className="py-28 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-sunset mb-4 block">
            Real Stories
          </span>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-serif text-slate mb-16 text-balance"
          >
            From Our Solo Travellers
          </h2>

          {/* Testimonial cards */}
          <div className="relative min-h-[280px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                role="article"
                aria-label={`Testimonial by ${t.name}`}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-700",
                  i === activeTestimonial
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                )}
              >
                <blockquote className="bg-sand rounded-3xl p-10 text-left shadow-sm">
                  <div className="flex mb-6" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 text-sunset fill-sunset" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-slate/80 text-xl leading-relaxed font-serif italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="text-left">
                      <cite className="text-slate font-bold not-italic">{t.name}</cite>
                      <p className="text-slate/50 text-sm flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {t.origin}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Testimonial nav dots */}
          <div
            className="flex justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Select testimonial"
          >
            {testimonials.map((t, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeTestimonial}
                aria-label={`View testimonial by ${t.name}`}
                onClick={() => setActiveTestimonial(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-[width,background-color] duration-300 focus-ring",
                  i === activeTestimonial ? "bg-ocean w-8" : "bg-slate/20 hover:bg-slate/40"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="cta-heading"
        className="relative py-28 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=80&w=2560"
            alt=""
            width={2560}
            height={1440}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate/80" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2
            id="cta-heading"
            className="text-4xl md:text-6xl font-serif text-white mb-6 text-balance"
          >
            Your Next Adventure{" "}
            <span className="italic text-sunset">Starts Alone</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed text-pretty">
            Join 47,000+ solo travellers who have found their crew, their guide,
            and their most memorable journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-sunset hover:bg-sunset-dark text-white font-bold rounded-full transition-colors duration-200 shadow-xl focus-ring active:scale-95 flex items-center gap-2 justify-center group">
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </button>
            <button className="px-10 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-200 focus-ring-white">
              See Destinations
            </button>
          </div>
          <p className="text-white/30 text-sm mt-6">No credit card required &middot; Free forever for solo explorers</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer
        aria-labelledby="footer-heading"
        className="bg-slate text-white py-20 px-6"
      >
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-3xl font-serif font-bold block mb-4 focus-ring-white rounded-sm"
                aria-label="Travel Kin — home"
              >
                Travel <span className="text-sunset italic">Kin</span>
              </Link>
              <p className="text-white/40 max-w-xs leading-relaxed mb-6">
                The world&rsquo;s most trusted platform for solo travellers exploring
                Southeast Asia — and beyond.
              </p>
              {/* Social icons */}
              <ul className="flex gap-3" aria-label="Social media links">
                <li>
                  <button
                    aria-label="Follow us on Instagram"
                    className="p-2.5 bg-white/5 rounded-full text-white/50 hover:bg-sunset hover:text-white transition-colors duration-200 focus-ring-white"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                  </button>
                </li>
                <li>
                  <button
                    aria-label="Follow us on Twitter / X"
                    className="p-2.5 bg-white/5 rounded-full text-white/50 hover:bg-sunset hover:text-white transition-colors duration-200 focus-ring-white"
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                  </button>
                </li>
                <li>
                  <button
                    aria-label="View our photo gallery"
                    className="p-2.5 bg-white/5 rounded-full text-white/50 hover:bg-sunset hover:text-white transition-colors duration-200 focus-ring-white"
                  >
                    <Camera className="w-4 h-4" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Links col 1 */}
            <nav aria-label="Explore links">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">Explore</h3>
              <ul className="space-y-3">
                {["Destinations", "Local Guides", "Travel Crew", "Solo Routes"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-white/60 hover:text-white transition-colors duration-200 text-sm focus-ring-white rounded-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Links col 2 */}
            <nav aria-label="Company links">
              <h3 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-5">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Safety Center", "Blog", "Careers"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-white/60 hover:text-white transition-colors duration-200 text-sm focus-ring-white rounded-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
            <p>© 2026 Travel Kin. Built for wanderers.</p>
            <div className="flex gap-6">
              <Link href="#privacy" className="hover:text-white/60 transition-colors duration-200 focus-ring-white rounded-sm">Privacy Policy</Link>
              <Link href="#terms" className="hover:text-white/60 transition-colors duration-200 focus-ring-white rounded-sm">Terms of Use</Link>
              <Link href="#cookies" className="hover:text-white/60 transition-colors duration-200 focus-ring-white rounded-sm">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
