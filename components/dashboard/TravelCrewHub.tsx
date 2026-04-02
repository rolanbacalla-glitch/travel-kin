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
import { VibeConsensus } from "./VibeConsensus";

interface Kin {
  id: string;
  name: string;
  location: string;
  vibe: string;
  status: "online" | "away" | "offline";
  image: string;
}

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
                    <p className="text-slate/60 max-w-xs mx-auto italic font-medium">Kin uses spatial location to find solo explorers within a 5km radius of you.</p>
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
            <p className="text-slate/60 font-medium italic">Hand-picked matches based on your &ldquo;Remote Zen&rdquo; profile.</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {kins.map((kin, i) => (
          <motion.div 
            key={kin.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group relative"
          >
            <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden bg-slate/5 shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:shadow-3xl">
              <Image 
                src={kin.image} 
                alt={kin.name} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Vibe Badge */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  {kin.vibe} Match
                </div>
              </div>

              {/* Verified Ring */}
              {kin.status === 'online' && (
                <div className="absolute top-6 right-6 p-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
              )}

              {/* Detail Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 space-y-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                      <h3 className="text-3xl font-serif text-white font-bold tracking-tight">{kin.name}</h3>
                      <ShieldCheck className="w-5 h-5 text-ocean" />
                   </div>
                   <div className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sunset" />
                      {kin.location}
                   </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                   <VibeConsensus stats={{
                      id: kin.id,
                      rating: 4.8 + (Math.random() * 0.2),
                      reviews: 12 + Math.floor(Math.random() * 30),
                      tags: ['Zen', 'Verified', 'Remote'],
                      lastDiscovery: '2m ago'
                   }} />
                </div>

                <div className="flex gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-all delay-200 translate-y-4 group-hover:translate-y-0">
                  <button 
                    onClick={() => onChat(kin.id)}
                    className="flex-1 py-4 bg-white text-slate text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:bg-sunset hover:text-white transition-all active:scale-95"
                  >
                    Open Ring
                  </button>
                  <button className="p-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* "Join the Squad" Empty State */}
        <div className="group border-4 border-dashed border-slate/10 rounded-[50px] shadow-sm flex flex-col items-center justify-center gap-6 p-12 text-center hover:border-sunset/40 hover:bg-sunset/5 transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-[25px] bg-slate/5 flex items-center justify-center group-hover:bg-sunset group-hover:text-white transition-all text-slate/30">
                <Users className="w-8 h-8" />
            </div>
            <div className="space-y-2">
                <h4 className="text-xl font-serif font-bold text-slate">Looking for more?</h4>
                <p className="text-xs font-medium text-slate/40 leading-relaxed">Update your destination to see explorers arriving next week.</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-sunset">Refresh Discovery →</button>
        </div>
        </div>
      </motion.div>
      )}
    </div>
  );
}
