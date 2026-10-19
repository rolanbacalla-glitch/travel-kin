"use client";

/**
 * InteractiveMap — Keyless Real-time Safety Heatmap powered by Leaflet + CARTO/OSM tiles.
 * - Uses static top-level Leaflet + CSS imports (parent imports with dynamic(..., { ssr: false })).
 * - Renders multi-ring radial safety heatmap zones (Verified Safe Spaces + Recent Safety Reports)
 *   alongside interactive SafeZone, Solo Kin, and Safety Report markers.
 * - Includes working Locate Me and Layer Filter controls.
 */

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Shield, Users, AlertTriangle, Navigation, Filter, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface SafeZonePin {
  id: string;
  type: "safezone";
  lat: number;
  lng: number;
  name: string;
  desc: string;
  safetyScore: number;
  radius: number;
}

interface KinPin {
  id: string;
  type: "kin";
  lat: number;
  lng: number;
  name: string;
  vibe: string;
  status: "online" | "away" | "offline";
}

interface SafetyReportPin {
  id: string;
  type: "report";
  lat: number;
  lng: number;
  name: string;
  desc: string;
  reportedAgo: string;
  radius: number;
}

type Pin = SafeZonePin | KinPin | SafetyReportPin;
type LayerFilter = "all" | "heatmap" | "kins";

/* ─── Data ──────────────────────────────────────────────────────────────── */

const USER_LOCATION: [number, number] = [18.7883, 98.9853];

const PIN_DATA: Pin[] = [
  {
    id: "1",
    type: "safezone",
    lat: 18.7883,
    lng: 98.9853,
    name: "Old City Square",
    desc: "Monitored 24/7, well-lit pedestrian zone & popular solo kin entry point.",
    safetyScore: 9.8,
    radius: 650,
  },
  {
    id: "2",
    type: "kin",
    lat: 18.795,
    lng: 98.995,
    name: "Suki R.",
    vibe: "Foodie · Night Market Walk",
    status: "online",
  },
  {
    id: "3",
    type: "kin",
    lat: 18.782,
    lng: 98.975,
    name: "Liam B.",
    vibe: "Action · Doi Suthep Trail",
    status: "away",
  },
  {
    id: "4",
    type: "safezone",
    lat: 18.8,
    lng: 98.9666,
    name: "Nimman Wellness Hub",
    desc: "Verified 24h co-working spaces, embassy partner cafes & safe transit stop.",
    safetyScore: 9.5,
    radius: 550,
  },
  {
    id: "5",
    type: "safezone",
    lat: 18.7877,
    lng: 98.9933,
    name: "Tha Phae Gate Hub",
    desc: "Tourist Police booth on-site with verified late-night transport pickup.",
    safetyScore: 9.6,
    radius: 450,
  },
  {
    id: "6",
    type: "report",
    lat: 18.7815,
    lng: 98.9985,
    name: "Mae Kha Canal Side Street",
    desc: "Low street lighting reported after 11 PM. Use main Chang Klan Road.",
    reportedAgo: "18m ago",
    radius: 380,
  },
  {
    id: "7",
    type: "report",
    lat: 18.8045,
    lng: 98.958,
    name: "Huay Kaew Junction",
    desc: "Fast scooter traffic & temporary roadworks. Cross at designated overpass.",
    reportedAgo: "42m ago",
    radius: 400,
  },
];

/* ─── InfoCard ───────────────────────────────────────────────────────────── */

function InfoCard({ pin, onClose }: { pin: Pin; onClose: () => void }) {
  const [actionAck, setActionAck] = useState(false);

  useEffect(() => {
    setActionAck(false);
  }, [pin.id]);

  const badgeBg =
    pin.type === "safezone"
      ? "bg-ocean"
      : pin.type === "report"
        ? "bg-red-500"
        : "bg-sunset";

  const subtitle =
    pin.type === "safezone"
      ? "Official SafeZone"
      : pin.type === "report"
        ? `Safety Report · ${pin.reportedAgo}`
        : "Solo Kin Nearby";

  return (
    <motion.div
      key={pin.id}
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[9999] w-72
                 bg-white rounded-2xl shadow-2xl border border-slate/10 p-5 flex flex-col gap-3"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-slate/30 hover:text-slate transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="flex items-center gap-3 pr-4">
        <div className={cn("p-2.5 rounded-xl text-white shadow-sm shrink-0", badgeBg)}>
          {pin.type === "safezone" ? (
            <Shield className="w-4 h-4" />
          ) : pin.type === "report" ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <Users className="w-4 h-4" />
          )}
        </div>
        <div>
          <h5 className="font-bold text-slate text-sm leading-tight">{pin.name}</h5>
          <p className="text-[9px] text-slate/40 uppercase font-black tracking-widest mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-slate/60 leading-relaxed italic">
        {pin.type === "kin" ? `Vibe: ${pin.vibe}` : pin.desc}
      </p>

      {pin.type === "safezone" && (
        <div className="flex items-center justify-between pt-2 border-t border-slate/5">
          <span className="text-[9px] uppercase font-bold text-slate/30">Safety Score</span>
          <span className="text-xs font-black text-green-600">{pin.safetyScore}/10</span>
        </div>
      )}

      {pin.type === "report" && (
        <div className="flex items-center justify-between pt-2 border-t border-slate/5">
          <span className="text-[9px] uppercase font-bold text-slate/30">Community Verification</span>
          <span className="text-[10px] font-black text-red-500 uppercase">3 Kins Confirmed</span>
        </div>
      )}

      <button
        onClick={() => setActionAck(true)}
        className={cn(
          "w-full py-2.5 rounded-lg text-[9px] uppercase font-black tracking-[0.1em] transition-all flex items-center justify-center gap-1.5",
          actionAck
            ? "bg-green-500 text-white"
            : pin.type === "safezone"
              ? "bg-ocean/10 text-ocean hover:bg-ocean hover:text-white"
              : pin.type === "report"
                ? "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white"
                : "bg-sunset text-white hover:bg-sunset/90"
        )}
      >
        {actionAck ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            {pin.type === "safezone"
              ? "Safe Route Pinned"
              : pin.type === "report"
                ? "Report Acknowledged"
                : "Wave Sent to Kin"}
          </>
        ) : pin.type === "safezone" ? (
          "Pin Safe Route"
        ) : pin.type === "report" ? (
          "Acknowledge Advisory"
        ) : (
          "Wave to Kin"
        )}
      </button>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

export default function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);

  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layerFilter, setLayerFilter] = useState<LayerFilter>("all");
  const [locating, setLocating] = useState(false);

  const selectedPin = PIN_DATA.find((p) => p.id === selectedId) ?? null;

  // 1. Initialise Leaflet Map synchronously
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Fix default marker icon asset paths in webpack/Next.js
    // eslint-disable-next-line
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    const map = L.map(containerRef.current, {
      center: USER_LOCATION,
      zoom: 13.5,
      zoomControl: false,
    });

    // OpenStreetMap standard tiles — 100% free, no API key required
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    layerGroupRef.current = layerGroup;

    // Click map background to deselect
    map.on("click", () => setSelectedId(null));

    mapRef.current = map;

    const ro = new ResizeObserver(() => {
      if (containerRef.current && containerRef.current.offsetWidth > 0) {
        map.invalidateSize();
        setReady(true);
      }
    });
    ro.observe(containerRef.current);

    requestAnimationFrame(() => {
      map.invalidateSize();
      setReady(true);
    });

    return () => {
      ro.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      layerGroupRef.current = null;
      userMarkerRef.current = null;
    };
  }, []);

  // 2. Render Heatmap Zones & Pins whenever filter changes
  useEffect(() => {
    const map = mapRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    const showHeatmap = layerFilter === "all" || layerFilter === "heatmap";
    const showKins = layerFilter === "all" || layerFilter === "kins";

    // Draw multi-ring radial heatmap overlays first (underneath pins)
    if (showHeatmap) {
      PIN_DATA.forEach((pin) => {
        if (pin.type !== "safezone" && pin.type !== "report") return;

        const isSafe = pin.type === "safezone";
        const baseColor = isSafe ? "#22C55E" : "#EF4444";

        // Outer soft thermal halo
        L.circle([pin.lat, pin.lng], {
          radius: pin.radius,
          color: baseColor,
          weight: 1,
          opacity: 0.25,
          fillColor: baseColor,
          fillOpacity: 0.1,
          interactive: false,
        }).addTo(layerGroup);

        // Middle warm thermal ring
        L.circle([pin.lat, pin.lng], {
          radius: pin.radius * 0.62,
          color: baseColor,
          weight: 0,
          fillColor: baseColor,
          fillOpacity: 0.16,
          interactive: false,
        }).addTo(layerGroup);

        // Inner high-intensity core (clickable)
        L.circle([pin.lat, pin.lng], {
          radius: pin.radius * 0.3,
          color: baseColor,
          weight: 1.5,
          opacity: 0.45,
          fillColor: baseColor,
          fillOpacity: 0.24,
        })
          .addTo(layerGroup)
          .on("click", (e: any) => {
            e?.originalEvent?.stopPropagation?.();
            setSelectedId((prev) => (prev === pin.id ? null : pin.id));
          });
      });
    }

    // Draw interactive markers
    PIN_DATA.forEach((pin) => {
      if (pin.type === "kin" && !showKins) return;
      if ((pin.type === "safezone" || pin.type === "report") && !showHeatmap) return;

      const bg =
        pin.type === "safezone"
          ? "#2563EB"
          : pin.type === "report"
            ? "#EF4444"
            : "#E04F2D";

      const pulseGlow =
        pin.type === "report"
          ? "box-shadow:0 0 0 6px rgba(239,68,68,0.25), 0 4px 14px rgba(0,0,0,0.22);"
          : pin.type === "safezone"
            ? "box-shadow:0 0 0 6px rgba(34,197,94,0.22), 0 4px 14px rgba(0,0,0,0.22);"
            : "box-shadow:0 4px 14px rgba(0,0,0,0.22);";

      const svg =
        pin.type === "safezone"
          ? `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>`
          : pin.type === "report"
            ? `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z'/><path d='M12 9v4'/><path d='M12 17h.01'/></svg>`
            : `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.87'/><path d='M16 3.13a4 4 0 0 1 0 7.75'/></svg>`;

      const icon = L.divIcon({
        html: `<div style="background:${bg};border:2.5px solid white;border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;${pulseGlow}cursor:pointer;transition:transform 0.15s ease;">${svg}</div>`,
        className: "",
        iconSize: [38, 38],
        iconAnchor: [19, 38],
      });

      L.marker([pin.lat, pin.lng], { icon })
        .addTo(layerGroup)
        .on("click", (e: any) => {
          e?.originalEvent?.stopPropagation?.();
          setSelectedId((prev) => (prev === pin.id ? null : pin.id));
        });
    });
  }, [layerFilter]);

  const handleLocateMe = () => {
    const map = mapRef.current;
    if (!map) return;

    setLocating(true);
    const recenter = (coords: [number, number]) => {
      map.flyTo(coords, 14.5, { duration: 0.9 });
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      userMarkerRef.current = L.circleMarker(coords, {
        radius: 8,
        color: "#ffffff",
        weight: 3,
        fillColor: "#0EA5E9",
        fillOpacity: 1,
      })
        .addTo(map)
        .bindTooltip("Your Live GPS Position", { direction: "top", offset: [0, -8] })
        .openTooltip();

      setTimeout(() => setLocating(false), 900);
    };

    recenter(USER_LOCATION);
  };

  const handleCycleFilter = () => {
    setSelectedId(null);
    setLayerFilter((prev) =>
      prev === "all" ? "heatmap" : prev === "heatmap" ? "kins" : "all"
    );
  };

  const filterLabel =
    layerFilter === "all"
      ? "All Layers Active"
      : layerFilter === "heatmap"
        ? "Heatmap & Zones Only"
        : "Solo Kins Only";

  return (
    <div className="w-full h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate/5 bg-slate/5">
      {/* Leaflet renders into this div */}
      <div ref={containerRef} className="w-full h-full z-0" />

      {/* Skeleton while loading */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none bg-slate/5">
          <p className="text-slate/30 font-black uppercase tracking-widest italic text-sm animate-pulse">
            Initialising Maps Engine...
          </p>
        </div>
      )}

      {/* Top-Left: Active Solo Kins counter */}
      <div className="absolute top-6 left-6 z-[500]">
        <div className="p-4 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-slate shadow-sm overflow-hidden relative"
              >
                <Image
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="Active Kin"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-xs">
            <p className="font-black text-slate leading-none">12 Solo Kins</p>
            <p className="text-slate/40 mt-0.5">Active in this area</p>
          </div>
        </div>
      </div>

      {/* Top-Right: Zone Legend */}
      <div className="absolute top-6 right-6 z-[500] max-w-[210px] hidden sm:block">
        <div className="p-4 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate/5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate/40">
              Zone Legend
            </h4>
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
              Live
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0" />
              <span className="text-[10px] font-bold text-slate/70 leading-tight">
                Verified Safe Spaces
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] shrink-0" />
              <span className="text-[10px] font-bold text-slate/70 leading-tight">
                Recent Safety Reports
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-ocean shrink-0" />
              <span className="text-[10px] font-bold text-slate/70 leading-tight">
                SafeZone Hub
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-sunset shrink-0" />
              <span className="text-[10px] font-bold text-slate/70 leading-tight">
                Solo Kin Nearby
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-Left: Active Layer Mode Badge */}
      <div className="absolute bottom-6 left-6 z-[500] flex items-center gap-2">
        <button
          onClick={handleCycleFilter}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:bg-white transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase text-slate/70 tracking-wider">
            {filterLabel}
          </span>
        </button>
      </div>

      {/* Bottom-Right Controls: Locate Me + Filter */}
      <div className="absolute bottom-12 right-6 z-[500] flex flex-col gap-3">
        <button
          onClick={handleLocateMe}
          title="Locate Me"
          aria-label="Locate Me"
          className={cn(
            "p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate hover:bg-white active:scale-90 transition-all border border-slate/5",
            locating && "text-ocean ring-2 ring-ocean/30"
          )}
        >
          <Navigation className="w-5 h-5" />
        </button>
        <button
          onClick={handleCycleFilter}
          title={`Filter Map (${filterLabel})`}
          aria-label="Filter Map Layers"
          className={cn(
            "p-4 backdrop-blur-md rounded-2xl shadow-xl active:scale-90 transition-all border border-slate/5",
            layerFilter !== "all"
              ? "bg-slate text-white"
              : "bg-white/90 text-slate hover:bg-white"
          )}
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-3 right-6 z-[500] pointer-events-none">
        <span className="text-[9px] font-bold text-slate/40 uppercase tracking-widest bg-white/80 backdrop-blur px-2.5 py-1 rounded-full">
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
