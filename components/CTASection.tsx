"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-slate relative overflow-hidden text-center">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <Image
          src="https://images.pexels.com/photos/16141092/pexels-photo-16141092.jpeg?auto=compress&cs=tinysrgb&w=1280"
          alt="Adventure background"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate via-slate/90 to-ocean/40 z-10" />

      <div className="relative z-20 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 leading-[1.1] text-balance">
          The world is <span className="text-sunset">waiting</span>. Stop
          waiting for <span className="text-sand">them</span>.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/verify"
            className="w-full sm:w-auto px-10 py-5 bg-sunset text-white font-bold rounded-full shadow-2xl hover:bg-sunset-dark transition-all duration-300 hover:scale-105 active:scale-95 focus-ring flex items-center justify-center gap-3"
          >
            Join the Movement <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/guides"
            className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 focus-ring"
          >
            Browse Guides
          </Link>
        </div>
        <p className="mt-12 text-white/40 text-xs font-bold uppercase tracking-[0.4em]">
          NO TRIP DEPOSIT REQUIRED TO JOIN
        </p>
      </div>
    </section>
  );
}
