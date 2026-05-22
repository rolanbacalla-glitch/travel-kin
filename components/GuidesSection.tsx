"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock, Star, Sparkles } from "lucide-react";

const GUIDES = [
  {
    id: "solo-siargao",
    title: "The Solo Traveler's Guide to Siargao",
    description: "Everything you need to know about navigating the surfing capital of the Philippines alone, but never feeling lonely.",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=800&auto=format&fit=crop",
    duration: "15 min read",
    rating: 4.9,
    category: "Solo Travel",
  },
  {
    id: "palawan-expedition",
    title: "Palawan: The Archipelago King",
    description: "An in-depth look at El Nido vs. Coron, and how to find the hidden lagoons that most tourists miss.",
    image: "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "12 min read",
    rating: 4.8,
    category: "Adventure",
  },
  {
    id: "safety-solo-female",
    title: "Solo Safety: A Deep Dive",
    description: "Practical tips, cultural nuances, and tech tools to stay safe and connected while exploring Southeast Asia.",
    image: "https://images.pexels.com/photos/4175000/pexels-photo-4175000.jpeg?auto=compress&cs=tinysrgb&w=800",
    duration: "10 min read",
    rating: 5.0,
    category: "Safety",
  },
];

export function GuidesSection() {
  return (
    <section id="guides" className="py-32 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ocean/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sunset/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean/10 text-ocean border border-ocean/20 text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <BookOpen className="w-3 h-3" />
              Knowledge Hub
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-serif font-bold text-slate leading-tight"
            >
              Master the art of <span className="text-ocean">solo exploration</span>.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/guides"
              className="group flex items-center gap-3 text-slate hover:text-ocean transition-all"
            >
              <span className="text-sm font-black uppercase tracking-widest">View all guides</span>
              <div className="w-10 h-10 rounded-full border-2 border-slate/10 flex items-center justify-center group-hover:border-ocean group-hover:bg-ocean group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {GUIDES.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/guides/${guide.id}`} className="block space-y-6">
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate/10 transition-transform duration-700 group-hover:scale-[1.02]">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-slate">
                    {guide.category}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate/40">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {guide.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-ocean">
                      <Star className="w-3 h-3 fill-current" />
                      {guide.rating}
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-slate group-hover:text-ocean transition-colors duration-300">
                    {guide.title}
                  </h3>

                  <p className="text-slate/60 text-sm leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
