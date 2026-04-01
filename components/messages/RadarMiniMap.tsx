"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface RadarMiniMapProps {
  kinLat: number;
  kinLng: number;
  trustStatus: "BLURRED" | "PRECISE" | "SOS_OVERRIDE";
  isSOSActive?: boolean;
}

export default function RadarMiniMap({ kinLat, kinLng, trustStatus, isSOSActive }: RadarMiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<L.Map | null>(null);
  const circleRef    = useRef<L.Circle | null>(null);
  const markerRef    = useRef<L.Marker | null>(null);
  const [ready,      setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize Map
    const map = L.map(containerRef.current, {
      center:      [kinLat, kinLng],
      zoom:        14,
      zoomControl: false,
      attributionControl: false,
    });

    // CARTO Light tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    // Handle Resize (especially useful for the 35/65 split layout)
    const ro = new ResizeObserver(() => {
        if (containerRef.current && containerRef.current.offsetWidth > 0) {
            map.invalidateSize();
            if (!ready) setReady(true);
        }
    });
    ro.observe(containerRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [kinLat, kinLng, ready]);

  // Sync Trust Status & Location
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    
    // Cleanup previous overlays
    if (circleRef.current) circleRef.current.remove();
    if (markerRef.current) markerRef.current.remove();

    const isBlurred = trustStatus === "BLURRED" && !isSOSActive;
    const color = isSOSActive ? "#EF4444" : (isBlurred ? "#64748B" : "#F97316"); // Red for SOS, Slate for Blur, Sunset for Trust

    if (isBlurred) {
      // Draw Blurred Radius Circle
      circleRef.current = L.circle([kinLat, kinLng], {
        radius:      500, // 500m blurred radius
        color:       color,
        fillColor:   color,
        fillOpacity: 0.15,
        weight:      2,
        dashArray:   "5, 10",
      }).addTo(map);
      
      map.setView([kinLat, kinLng], 14);
    } else {
      // Draw Precise Pin
      const icon = L.divIcon({
        html: `<div style="background:${color};border:3px solid white;border-radius:10px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,0.3);position:relative;">
                <div class="absolute inset-0 bg-${isSOSActive ? 'red' : 'orange'}-500 blur-xl opacity-40 animate-pulse"></div>
                <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/><circle cx='12' cy='10' r='3'/></svg>
              </div>`,
        className:  "",
        iconSize:   [32, 32],
        iconAnchor: [16, 32],
      });

      markerRef.current = L.marker([kinLat, kinLng], { icon }).addTo(map);
      map.setView([kinLat, kinLng], 15);
    }

  }, [kinLat, kinLng, trustStatus, isSOSActive]);

  return (
    <div className="w-full h-full relative group">
      <div ref={containerRef} className="w-full h-full grayscale-[0.3] contrast-[1.1]" />
      
      {/* Decorative Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 border-double rounded-b-[40px] z-[500]" />
      
      {/* HUD Label */}
      <div className="absolute bottom-6 left-6 z-[500]">
        <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-white/20 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${trustStatus === 'BLURRED' ? 'bg-slate/30' : 'bg-green-500 animate-pulse'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate/50">
                {trustStatus === 'BLURRED' ? 'Blurred Proximity' : 'Precise Check-in'}
            </span>
        </div>
      </div>
    </div>
  );
}
