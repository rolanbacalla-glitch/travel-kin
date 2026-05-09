"use client";

import React from "react";
import {
  Users,
  Search,
  Filter,
  MapPin,
  MessageSquare,
  Star,
  CheckCircle2,
  Zap,
  TrendingUp,
  Ghost
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, Sparkles, Navigation, ShieldCheck, Heart, Share2, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useMessagesStore } from "@/lib/stores/useMessages";


import { Kin } from "@/lib/data/kins";

export function TravelCrewHub({ kins, onChat }: { kins: Kin[]; onChat: (id: string) => void }) {
  const store = useMessagesStore();
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [scanPulse, setScanPulse] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    // Simulate real radar search
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setScanPulse(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 40);
  };

  return (
    <div className="space-y-16 relative">
      <AnimatePresence>
        {!hasScanned && !isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-32 bg-white/60 backdrop-blur-xl border border-slate/5 rounded-[60px] shadow-2xl space-y-10"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full border border-ocean/20 flex items-center justify-center text-ocean">
                <Radar className="w-12 h-12" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-4 border-ocean/10"
              />
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-serif text-slate font-bold">Discover Your Ring</h2>
              <p className="text-slate/60 max-w-xs mx-auto font-medium">Kin uses spatial location to find solo explorers within a 5km radius of you.</p>
            </div>
            <button
              onClick={startScan}
              className="px-12 py-6 bg-slate text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              <Navigation className="w-5 h-5 fill-white" />
              Radar Sync Chiang Mai
            </button>
          </motion.div>
        )}

        {isScanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-32 space-y-12"
          >
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Radar Circles */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  className="absolute inset-0 rounded-full border-2 border-ocean"
                />
              ))}
              <div className="relative z-10 w-24 h-24 bg-white shadow-2xl rounded-full flex items-center justify-center text-ocean border-8 border-slate/5">
                <Radar className="w-8 h-8" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-ocean/40 rounded-full"
              />
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-serif font-black text-slate uppercase tracking-tighter">Scanning for Kinetic Vibes...</h3>
              <div className="flex items-center gap-1.5 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate/40">Searching 5km Radius</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(hasScanned || isScanning === false) && hasScanned && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-16"
        >

          {/* Dynamic Crew Stats */}
          <div className="flex flex-col md:flex-row gap-6">
            {[
              { label: 'Active Near You', val: '128', icon: Users, color: 'text-ocean bg-ocean/5' },
              { label: 'Verified Guides', val: '3', icon: Star, color: 'text-sunset bg-sunset/5' },
              { label: 'Exp. Group Vibe', val: 'Zen', icon: Ghost, color: 'text-purple-600 bg-purple-50' }
            ].map((stat, i) => (
              <div key={i} className="flex-1 flex items-center gap-6 p-8 bg-white border border-slate/5 rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-slate/5 transition-all">
                <div className={`p-4 rounded-3xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">{stat.label}</p>
                  <p className="text-3xl font-serif font-black text-slate">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-ocean font-bold tracking-widest text-xs uppercase bg-ocean/5 rounded-full px-4 py-1.5 w-fit border border-ocean/10 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                Discovery
              </div>
              <h2 className="text-4xl font-serif text-slate font-bold">Wanderers in Chiang Mai</h2>
              <p className="text-slate/60 font-medium">Hand-picked matches based on your &ldquo;Remote Zen&rdquo; profile.</p>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-white text-slate border border-slate/5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-sm shadow-slate/5 hover:bg-slate/5 active:scale-95 transition-all">
                <Filter className="w-4 h-4" />
                Refine
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-slate text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate/20 hover:scale-105 active:scale-95 transition-all">
                <Search className="w-4 h-4" />
                Global Search
              </button>
            </div>
          </div>

          {/* Grid of Kins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {kins.map((kin, i) => (
              <motion.div 
                key={kin.id}
                layoutId={`card-${kin.id}`}
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate/5 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <Image
                    src={kin.image}
                    alt={kin.name}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />    
                {/* Gradient overlay — stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Status dot — top right */}
                <div className="absolute top-5 right-5">
                  <span className={`block w-3 h-3 rounded-full ring-2 ring-white/60 ${kin.status === "online" ? "bg-green-400" :
                    kin.status === "away" ? "bg-amber-400" : "bg-slate/40"
                    }`} />
                </div>

                {/* Vibe badge — top left, single line */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/25 truncate max-w-[160px] block">
                    {kin.vibe} Match
                  </span>
                </div>

                {/* Bottom content — always visible */}
                <div className="absolute inset-x-0 bottom-0 p-6 space-y-4">
                  {/* Name + verified */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-serif font-bold text-white leading-none">{kin.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-ocean flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 text-white/60 text-xs font-semibold">
                      <MapPin className="w-3 h-3 text-sunset flex-shrink-0" />
                      {kin.location}
                    </div>
                  </div>

                  {/* Action buttons — slide up on hover */}
                  <div className="flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <button
                      onClick={() => onChat(kin.id)}
                      className="flex-1 py-3 bg-white text-slate text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-sunset hover:text-white transition-colors active:scale-95"
                    >
                      Open Ring
                    </button>
                    <button className="p-3 bg-white/15 backdrop-blur-xl text-white rounded-xl border border-white/20 hover:bg-white/25 transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* "Join the Squad" Empty State */}
            <div className="group aspect-[3/4] border-2 border-dashed border-slate/15 rounded-[2.5rem] flex flex-col items-center justify-center gap-5 p-8 text-center hover:border-sunset/40 hover:bg-sunset/5 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-slate/5 flex items-center justify-center group-hover:bg-sunset/10 transition-all text-slate/25 group-hover:text-sunset">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-serif font-bold text-slate">Looking for more?</h4>
                <p className="text-xs font-medium text-slate/40 leading-relaxed">Update your destination to see explorers arriving next week.</p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-sunset hover:underline">
                Refresh Discovery →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

