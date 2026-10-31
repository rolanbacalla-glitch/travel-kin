"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  MapPin,
  Star,
  TrendingUp,
  Ghost,
  Radar,
  Navigation,
  ShieldCheck,
  Heart,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Kin } from "@/lib/data/kins";
import { VibeConsensus } from "@/components/dashboard/VibeConsensus";

const HUBS = [
  { id: "all", label: "All Island Hubs" },
  { id: "siargao", label: "Siargao Island" },
  { id: "el-nido", label: "El Nido, Palawan" },
  { id: "cebu", label: "Cebu & Moalboal" },
  { id: "coron", label: "Coron, Palawan" },
] as const;

export function TravelCrewHub({
  kins,
  onChat,
}: {
  kins: Kin[];
  onChat: (id: string) => void;
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [selectedHub, setSelectedHub] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hubParam = params.get("hub");
      if (hubParam) {
        const matched = HUBS.some((h) => h.id === hubParam);
        setSelectedHub(matched ? hubParam : "all");
        setHasScanned(true);
      }
    }
  }, []);

  const startScan = () => {
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 50);
  };

  const activeHubLabel =
    HUBS.find((h) => h.id === selectedHub)?.label || "Siargao & Palawan Loop";

  const filteredKins = kins.filter((k) => {
    const matchesHub = selectedHub === "all" || k.hubId === selectedHub;
    const matchesVerified = !verifiedOnly || k.verified;
    return matchesHub && matchesVerified;
  });

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
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
              <p className="text-slate/60 max-w-xs mx-auto font-medium">
                Kin uses spatial discovery to connect ID-verified solo travellers within a 5km island radius.
              </p>
            </div>
            <button
              onClick={startScan}
              className="px-12 py-6 bg-slate text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
            >
              <Navigation className="w-5 h-5 fill-white" />
              Radar Sync Siargao &amp; Palawan
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
              <h3 className="text-2xl font-serif font-black text-slate uppercase tracking-tighter">
                Scanning for Kinetic Vibes...
              </h3>
              <div className="flex items-center gap-1.5 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate/40">
                  Searching 5km Coastal Radius
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasScanned && !isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          {/* Dynamic Crew Stats */}
          <div className="flex flex-col md:flex-row gap-6">
            {[
              {
                label: "Active In Hub",
                val: `${filteredKins.length * 14 + 16}`,
                icon: Users,
                color: "text-ocean bg-ocean/5",
              },
              {
                label: "Verified Skippers",
                val: "6",
                icon: Star,
                color: "text-sunset bg-sunset/5",
              },
              {
                label: "Dominant Vibe",
                val: "Lagoon & Surf",
                icon: Ghost,
                color: "text-purple-600 bg-purple-50",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex-1 flex items-center gap-6 p-8 bg-white border border-slate/5 rounded-[40px] shadow-sm hover:shadow-xl hover:shadow-slate/5 transition-all"
              >
                <div className={`p-4 rounded-3xl ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate/30">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-serif font-black text-slate">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-ocean font-bold tracking-widest text-xs uppercase bg-ocean/5 rounded-full px-4 py-1.5 w-fit border border-ocean/10 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                Spatial Discovery
              </div>
              <h2 className="text-4xl font-serif text-slate font-bold">
                Wanderers in {activeHubLabel}
              </h2>
              <p className="text-slate/60 font-medium">
                Hand-picked solo companions matched to your pace, safety tier, and island loop.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setVerifiedOnly((v) => !v)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs border transition-all ${
                  verifiedOnly
                    ? "bg-ocean text-white border-ocean shadow-lg shadow-ocean/20"
                    : "bg-white text-slate border-slate/10 hover:bg-slate/5"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{verifiedOnly ? "ID-Verified Only" : "Filter Verified"}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedHub("all")}
                className="flex items-center gap-2 px-6 py-3.5 bg-slate text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Search className="w-4 h-4" />
                Reset Hub
              </button>
            </div>
          </div>

          {/* Island Hub Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {HUBS.map((hub) => (
              <button
                key={hub.id}
                type="button"
                onClick={() => setSelectedHub(hub.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                  selectedHub === hub.id
                    ? "bg-slate text-white border-slate shadow-md"
                    : "bg-white text-slate/50 border-slate/10 hover:text-slate"
                }`}
              >
                {hub.label}
              </button>
            ))}
          </div>

          {/* Grid of Kins + NomadHer VibeConsensus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredKins.map((kin) => (
              <div key={kin.id} className="flex flex-col gap-3">
                <motion.div
                  layoutId={`card-${kin.id}`}
                  className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate/5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Status dot — top right */}
                  <div className="absolute top-5 right-5">
                    <span
                      className={`block w-3 h-3 rounded-full ring-2 ring-white/60 ${
                        kin.status === "online"
                          ? "bg-green-400"
                          : kin.status === "away"
                          ? "bg-amber-400"
                          : "bg-slate/40"
                      }`}
                    />
                  </div>

                  {/* Vibe badge — top left */}
                  <div className="absolute top-5 left-5">
                    <span className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/25 truncate max-w-[175px] block">
                      {kin.vibe}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-serif font-bold text-white leading-none">
                          {kin.name}
                        </h3>
                        {kin.verified ? (
                          <span
                            title="Biometric ID Verified"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ocean/90 text-white text-[9px] font-black uppercase tracking-widest"
                          >
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">
                            Pending ID
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                        <MapPin className="w-3 h-3 text-sunset flex-shrink-0" />
                        {kin.location}
                      </div>
                      {kin.tripDates && (
                        <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-medium bg-white/10 px-2 py-0.5 rounded-md w-fit backdrop-blur-sm border border-white/10">
                          <Calendar className="w-3 h-3 text-ocean" />
                          <span>{kin.tripDates.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => onChat(kin.id)}
                        className="flex-1 py-3 bg-white text-slate text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-sunset hover:text-white transition-colors active:scale-95"
                      >
                        Open Ring
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLike(kin.id)}
                        aria-label={`Bookmark ${kin.name}`}
                        className={`p-3 backdrop-blur-xl rounded-xl border transition-all ${
                          likedIds[kin.id]
                            ? "bg-sunset text-white border-sunset"
                            : "bg-white/15 text-white border-white/20 hover:bg-white/25"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedIds[kin.id] ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* NomadHer Peer Reference & Vibe Consensus Card */}
                {kin.vibeStats && <VibeConsensus stats={kin.vibeStats} />}
              </div>
            ))}

            {/* "Join the Squad" Empty State */}
            <div
              onClick={() => {
                setSelectedHub("all");
                setVerifiedOnly(false);
              }}
              className="group aspect-[3/4] border-2 border-dashed border-slate/15 rounded-[2.5rem] flex flex-col items-center justify-center gap-5 p-8 text-center hover:border-sunset/40 hover:bg-sunset/5 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate/5 flex items-center justify-center group-hover:bg-sunset/10 transition-all text-slate/25 group-hover:text-sunset">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-serif font-bold text-slate">Looking for more?</h4>
                <p className="text-xs font-medium text-slate/40 leading-relaxed">
                  Switch island hubs to see verified solo travellers arriving in Siargao &amp; El Nido this week.
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-sunset group-hover:underline">
                Show All Hubs →
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
