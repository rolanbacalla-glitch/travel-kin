"use client";

/**
 * InteractiveMap — raw Leaflet (no react-leaflet to avoid ESM/SSR issues).
 * - Leaflet JS + CSS are loaded via dynamic import() inside useEffect.
 * - ResizeObserver calls invalidateSize() when the container becomes visible
 *   (e.g. when the parent tab switches from hidden to block).
 * - The parent uses `dynamic(..., { ssr: false })` so this file is client-only.
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Shield, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface SafeZonePin {
  id: string; type: "safezone"; lat: number; lng: number;
  name: string; desc: string; safetyScore: number;
}
interface KinPin {
  id: string; type: "kin"; lat: number; lng: number;
  name: string; vibe: string; status: "online" | "away" | "offline";
}
type Pin = SafeZonePin | KinPin;

/* ─── Data ──────────────────────────────────────────────────────────────── */

const PIN_DATA: Pin[] = [
  { id: "1", type: "safezone", lat: 18.7883, lng: 98.9853, name: "Old City Square",  desc: "Monitored 24/7, popular solo kin entry point.", safetyScore: 9.8 },
  { id: "2", type: "kin",      lat: 18.7950, lng: 98.9950, name: "Suki R.",           vibe: "Foodie",  status: "online"  },
  { id: "3", type: "kin",      lat: 18.7820, lng: 98.9750, name: "Liam B.",           vibe: "Action",  status: "away"    },
  { id: "4", type: "safezone", lat: 18.8000, lng: 98.9666, name: "Wellness Hub",      desc: "Verified yoga retreats & co-working spaces.", safetyScore: 9.5 },
];

/* ─── InfoCard ───────────────────────────────────────────────────────────── */

function InfoCard({ pin, onClose }: { pin: Pin; onClose: () => void }) {
  return (
    <motion.div
      key={pin.id}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,   scale: 1    }}
      exit={   { opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[9999] w-64
                 bg-white rounded-2xl shadow-2xl border border-slate/10 p-5 flex flex-col gap-3"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-slate/30 hover:text-slate transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6"  x2="6"  y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </svg>
      </button>

      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-xl text-white shadow-sm", pin.type === "safezone" ? "bg-ocean" : "bg-sunset")}>
          {pin.type === "safezone" ? <Shield className="w-4 h-4" /> : <Users className="w-4 h-4" />}
        </div>
        <div>
          <h5 className="font-bold text-slate text-sm leading-none">{pin.name}</h5>
          <p className="text-[9px] text-slate/40 uppercase font-black tracking-widest mt-1">
            {pin.type === "safezone" ? "Official SafeZone" : "Solo Kin Nearby"}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-slate/60 leading-relaxed italic">
        {pin.type === "safezone" ? pin.desc : `Vibe: ${(pin as KinPin).vibe}`}
      </p>

      {pin.type === "safezone" && (
        <div className="flex items-center justify-between pt-2 border-t border-slate/5">
          <span className="text-[9px] uppercase font-bold text-slate/30">Safety Score</span>
          <span className="text-xs font-black text-ocean">{(pin as SafeZonePin).safetyScore}/10</span>
        </div>
      )}

      <button className={cn(
        "w-full py-2.5 rounded-lg text-[9px] uppercase font-black tracking-[0.1em] transition-all",
        pin.type === "safezone"
          ? "bg-ocean/5 text-ocean hover:bg-ocean hover:text-white"
          : "bg-sunset text-white"
      )}>
        {pin.type === "safezone" ? "View Details" : "Chat with Kin"}
      </button>
    </motion.div>
  );
}

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20">
      <div className={cn("w-2 h-2 rounded-full", color)} />
      <span className="text-[10px] font-black uppercase text-slate/60 tracking-wider">{label}</span>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

export default function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);   // Leaflet Map instance
  const [ready,      setReady]      = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPin = PIN_DATA.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current || mapRef.current) return;

      // 1. Load Leaflet CSS from the installed package (synchronous, bundled)
      await import("leaflet/dist/leaflet.css" as any);

      // 2. Load Leaflet JS
      const L = (await import("leaflet")).default;

      if (cancelled || !containerRef.current || mapRef.current) return;

      // 3. Fix default marker icon asset paths in webpack/Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // 4. Create map
      const map = L.map(containerRef.current, {
        center:      [18.7883, 98.9853],
        zoom:        13,
        zoomControl: false,
      });

      // CARTO Light tiles — free, no API key
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      // 5. Add markers
      PIN_DATA.forEach((pin) => {
        const bg  = pin.type === "safezone" ? "#2563EB" : "#E04F2D";
        const svg = pin.type === "safezone"
          ? `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>`
          : `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>`;

        const icon = L.divIcon({
          html: `<div style="background:${bg};border:2.5px solid white;border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,0.22);cursor:pointer;">${svg}</div>`,
          className:  "",
          iconSize:   [38, 38],
          iconAnchor: [19, 38],
        });

        L.marker([pin.lat, pin.lng], { icon })
          .addTo(map)
          .on("click", (e: any) => {
            e?.originalEvent?.stopPropagation?.();
            setSelectedId((prev) => (prev === pin.id ? null : pin.id));
          });
      });

      // Click map background to deselect
      map.on("click", () => setSelectedId(null));

      mapRef.current = map;

      // 6. ResizeObserver — call invalidateSize when container becomes visible
      //    (handles the case where map is initialised while parent tab is hidden)
      const ro = new ResizeObserver(() => {
        if (containerRef.current && containerRef.current.offsetWidth > 0) {
          map.invalidateSize();
          if (!ready) setReady(true);
        }
      });
      ro.observe(containerRef.current);

      // Also call straight away in case container is already visible
      requestAnimationFrame(() => {
        map.invalidateSize();
        if (!cancelled) setReady(true);
      });
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate/5 bg-slate/5">

      {/* Leaflet renders into this div */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Skeleton while loading */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-slate/30 font-black uppercase tracking-widest italic text-sm animate-pulse">
            Initialising Maps Engine...
          </p>
        </div>
      )}

      {/* Floating: Active kins counter */}
      <div className="absolute top-6 left-6 z-[500]">
        <div className="p-4 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate shadow-sm overflow-hidden relative">
                <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Active Kin" fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="text-xs">
            <p className="font-black text-slate leading-none">12 Solo Kins</p>
            <p className="text-slate/40 mt-0.5">Active in this area</p>
          </div>
        </div>
      </div>

      {/* Floating: Legend */}
      <div className="absolute bottom-10 left-6 z-[500] flex flex-col gap-2 pointer-events-none">
        <LegendItem label="SafeZone" color="bg-ocean" />
        <LegendItem label="Solo Kin" color="bg-sunset" />
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 right-6 z-[500] pointer-events-none">
        <span className="text-[9px] font-bold text-slate/30 uppercase tracking-widest bg-white/70 backdrop-blur px-2 py-1 rounded-full">
          Leaflet · OpenStreetMap
        </span>
      </div>

      {/* InfoCard */}
      <AnimatePresence>
        {selectedPin && (
          <InfoCard pin={selectedPin} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
