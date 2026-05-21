"use client";

import React from "react";
import Link from "next/link";
import { Users, Map, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ActionLinksSection() {
  const actions = [
    {
      title: "Find Your Crew",
      desc: "Connect with verified solo travellers who match your vibe and itinerary.",
      href: "/dashboard",
      icon: Users,
      color: "bg-ocean",
      hoverColor: "hover:bg-ocean-dark",
      shadow: "shadow-ocean/20",
    },
    {
      title: "Explore Destinations",
      desc: "Discover 87+ vetted locations across Southeast Asia tailored for solo safety.",
      href: "/destinations",
      icon: Map,
      color: "bg-sunset",
      hoverColor: "hover:bg-sunset-dark",
      shadow: "shadow-sunset/20",
    },
  ];

  return (
    <section className="py-24 px-6 bg-mist/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {actions.map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={action.href}
                className={`group block p-12 rounded-[3rem] bg-white border border-mist hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}
              >
                <div className="flex flex-col h-full relative z-10">
                  <div className={`w-16 h-16 rounded-2xl ${action.color} text-white flex items-center justify-center mb-8 shadow-lg ${action.shadow} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <action.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate mb-4 group-hover:text-ocean transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-slate/60 text-lg leading-relaxed mb-8 max-w-sm">
                    {action.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-slate font-bold uppercase tracking-widest text-xs">
                    Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                
                {/* Abstract background element */}
                <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${action.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-500`} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
