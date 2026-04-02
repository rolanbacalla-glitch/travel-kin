"use client";

import React from "react";
import { Star, Shield, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VibeStats {
  id: string;
  rating: number;
  reviews: number;
  tags: string[];
  lastDiscovery: string;
}

export function VibeConsensus({ stats }: { stats: VibeStats }) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-slate/5 rounded-2xl border border-slate/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
             <Star 
               key={s} 
               className={cn(
                 "w-3 h-3",
                 s <= Math.floor(stats.rating) ? "fill-sunset text-sunset" : "text-slate/20"
               )} 
             />
          ))}
          <span className="text-[10px] font-black text-slate ml-1 mt-0.5">{stats.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1 text-slate/40">
           <Users className="w-3 h-3" />
           <span className="text-[10px] font-bold uppercase tracking-widest">{stats.reviews} Refs</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {stats.tags.map((tag) => (
          <span 
            key={tag}
            className="px-2 py-1 bg-white text-[9px] font-black uppercase tracking-widest text-slate/50 rounded-md border border-slate/5"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="pt-2 border-t border-slate/5 flex items-center justify-between">
         <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-ocean rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-slate/40 uppercase tracking-widest">Seen {stats.lastDiscovery}</span>
         </div>
         <Shield className="w-3 h-3 text-ocean/40" />
      </div>
    </div>
  );
}
