"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/lib/data";

export function FeaturesSection() {
  return (
    <section id="safety" className="py-32 px-6 bg-slate text-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl z-10">
            <Image
              src="https://images.pexels.com/photos/1006360/pexels-photo-1006360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Safe solo travel"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Floating safety badge */}
          <div className="absolute -bottom-8 -right-8 glass p-8 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(30,45,53,0.3)] z-20 max-w-[240px] border-white/50 animate-float">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-ocean flex items-center justify-center text-white font-black text-xs shadow-lg shadow-ocean/30 z-10 relative">
                  24/7
                </div>
                <div className="absolute inset-0 w-12 h-12 rounded-full bg-ocean animate-ping opacity-20" />
              </div>
              <div className="text-[10px] font-black text-slate uppercase tracking-[0.2em] leading-tight">
                Emergency<br/>Support
              </div>
            </div>
            <p className="text-[11px] text-slate/70 leading-relaxed font-bold">
              Real-time monitoring and local rapid response in 12 SE Asian countries.
            </p>
          </div>
          {/* Abstract blobs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-ocean/20 blur-[100px] rounded-full z-0" />
          <div className="absolute top-40 -right-20 w-80 h-80 bg-sunset/10 blur-[120px] rounded-full z-0" />
        </div>

        <div>
          <span className="text-sunset font-bold text-xs tracking-widest uppercase mb-6 block">
            Why Travel Kin
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-12 leading-tight text-balance">
            Safety is our <span className="italic text-sand">North Star.</span>
          </h2>

          <div className="space-y-6">
            {features.map((f, i) => (
              <div
                key={i}
                // ID for crew specifically on the Solo-First Matching feature (index 1)
                id={f.title === "Solo-First Matching" ? "crew" : undefined}
                className={cn(
                  "group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-start gap-6 cursor-default",
                  f.title === "Solo-First Matching" && "scroll-mt-32"
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110",
                    f.color
                  )}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-sunset transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-white/10">
            <Link 
              href="/safety-commitment"
              className="group flex items-center gap-4 text-sand font-serif italic text-2xl hover:text-white transition-colors duration-200"
            >
              Read our full Safety Commitment <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
