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
import { Radar, Sparkles, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import { useMessagesStore } from "@/lib/stores/useMessages";

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="group relative bg-white border border-slate/5 rounded-[50px] shadow-lg shadow-slate/5 hover:shadow-2xl hover:shadow-slate/10 transition-all duration-700 overflow-hidden cursor-pointer" onClick={() => onChat(kin.id)}>
                
                {/* Image Section */}
                <div className="relative aspect-[3/4]">
                    <Image 
                        src={kin.image} 
                        alt={kin.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <div className="px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate shadow-xl border border-white/20">
                            98% Vibe Match
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-8 pt-0 -mt-12 relative z-10">
                    <div className="w-16 h-16 rounded-[25px] bg-white shadow-2xl flex items-center justify-center mb-6 ring-8 ring-[#F9F8F6]">
                        <div className={`w-3 h-3 rounded-full ${kin.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-slate/20'}`} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif font-black text-slate">{kin.name}</h3>
                            <div className="inline-flex items-center gap-1.5 text-ocean">
                                <CheckCircle2 className="w-4 h-4 fill-ocean/10" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {kin.vibe.split(',').map((v, it) => (
                                <span key={it} className="px-4 py-1.5 bg-slate/5 rounded-full text-[10px] font-bold text-slate/50 uppercase tracking-widest">
                                    {v.trim()}
                                </span>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-slate/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate/40">
                                <MapPin className="w-4 h-4" />
                                <p className="text-xs font-bold">{kin.location}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sunset">
                                <Users className="w-4 h-4" />
                                <span className="text-xs font-black">2 Mutuals</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <button className="w-full flex items-center justify-center gap-3 py-5 bg-ocean text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-ocean/30 active:scale-95">
                            <MessageSquare className="w-4 h-4" />
                            Open Conversation
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
