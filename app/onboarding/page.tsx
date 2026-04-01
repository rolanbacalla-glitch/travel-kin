"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  User, 
  MapPin, 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Check,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────── */
/* Steps Definitions                                           */
/* ─────────────────────────────────────────────────────────── */

const steps = [
  { 
    id: "identity", 
    title: "Basic Info", 
    icon: User, 
    desc: "Tell us about yourself" 
  },
  { 
    id: "style", 
    title: "Travel Style", 
    icon: MapPin, 
    desc: "Your pace & preferences" 
  },
  { 
    id: "vibes", 
    title: "Personal Vibe", 
    icon: Heart, 
    desc: "What drives your journey?" 
  },
  { 
    id: "safety", 
    title: "Safety Sync", 
    icon: ShieldCheck, 
    desc: "Verification & trust" 
  },
];

/* ─────────────────────────────────────────────────────────── */
/* Component                                                     */
/* ─────────────────────────────────────────────────────────── */

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  if (isDone) return <OnboardingSuccess />;

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      {/* ── Navigation ── */}
      <nav className="p-6 md:p-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-slate">
          Travel <span className="text-sunset italic">Kin</span>
        </Link>
        <div className="text-sm font-bold tracking-widest text-slate/40 uppercase">
          Step {currentStep + 1} of {steps.length}
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-2xl">
          {/* ── Progress Bar ── */}
          <div className="h-1.5 w-full bg-slate/10 rounded-full mb-12 overflow-hidden">
            <motion.div 
              className="h-full bg-sunset" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Header */}
              <div className="text-center md:text-left">
                <div className="inline-flex p-3 rounded-2xl bg-white shadow-sm border border-slate/5 mb-6">
                  {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-sunset" })}
                </div>
                <h1 className="text-3xl md:text-5xl font-serif text-slate mb-3">
                  {steps[currentStep].title}
                </h1>
                <p className="text-slate/50 text-lg">{steps[currentStep].desc}</p>
              </div>

              {/* Form Content Mockup */}
              <div className="space-y-6">
                {currentStep === 0 && <IdentityForm />}
                {currentStep === 1 && <StyleForm />}
                {currentStep === 2 && <VibeForm />}
                {currentStep === 3 && <SafetyForm />}
              </div>

              {/* Navigation Actions */}
              <div className="pt-10 flex items-center justify-between border-t border-slate/10">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex items-center gap-2 text-slate/40 font-bold tracking-widest uppercase text-xs hover:text-slate transition-colors",
                    currentStep === 0 && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-8 py-4 bg-slate text-white font-bold rounded-2xl shadow-xl hover:bg-slate-dark transition-all flex items-center gap-3 active:scale-95 group"
                >
                  {currentStep === steps.length - 1 ? "Complete Setup" : "Next Step"}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-forms ── */

function IdentityForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-1.5 font-sans">
        <label className="text-xs uppercase font-bold tracking-widest text-slate/50 ml-1">Legal Name</label>
        <input 
          placeholder="Ex: Mia Reyes" 
          className="w-full p-5 bg-white border border-slate/5 rounded-2xl shadow-sm focus:outline-sunset focus:shadow-sunset/10 transition-all font-medium text-slate placeholder:text-slate/30"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-slate/50 ml-1">Username</label>
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30 font-bold">@</span>
          <input 
            placeholder="wanderer_mia" 
            className="w-full p-5 pl-10 bg-white border border-slate/5 rounded-2xl shadow-sm focus:outline-sunset transition-all font-medium text-slate"
          />
        </div>
      </div>
      <div className="md:col-span-2 space-y-1.5">
        <label className="text-xs uppercase font-bold tracking-widest text-slate/50 ml-1">Short Bio</label>
        <textarea 
          placeholder="What should we know about you? (Keep it fun)" 
          rows={3}
          className="w-full p-5 bg-white border border-slate/5 rounded-2xl shadow-sm focus:outline-sunset transition-all font-medium text-slate resize-none"
        />
      </div>
    </div>
  );
}

function StyleForm() {
  const styles = [
    { label: "Slow Wanderbox", icon: "🐢" },
    { label: "Fast-Paced Action", icon: "⚡" },
    { label: "Budget Backpacker", icon: "🎒" },
    { label: "Luxury Nomar", icon: "🥂" },
    { label: "Eco Adventurer", icon: "🌿" },
    { label: "Remote Professional", icon: "💻" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {styles.map(s => (
        <button 
          key={s.label}
          className="p-6 bg-white border border-slate/5 rounded-2xl shadow-sm hover:border-sunset/30 hover:shadow-sunset/5 transition-all text-center group active:scale-95"
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{s.icon}</div>
          <span className="text-sm font-bold text-slate/60 group-hover:text-slate">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

function VibeForm() {
  const vibes = ["Introvert", "Extrovert", "Night Owl", "Early Bird", "Foodie", "History Buff", "Action Junkie", "Zen Seeker"];
  return (
    <div className="flex flex-wrap gap-3">
      {vibes.map(v => (
        <button 
          key={v}
          className="px-6 py-3 bg-white border border-slate/5 rounded-full shadow-sm hover:bg-sunset hover:text-white transition-all text-slate/70 font-semibold"
        >
          {v}
        </button>
      ))}
    </div>
  );
}

function SafetyForm() {
  return (
    <div className="space-y-6">
      <div className="p-8 bg-ocean/5 border border-ocean/10 rounded-[2rem] flex gap-5">
        <div className="p-4 h-fit bg-ocean text-white rounded-2xl shadow-lg ring-8 ring-ocean/10">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-ocean font-bold text-lg mb-2 leading-none">Trust Verification</h4>
          <p className="text-ocean/60 text-sm leading-relaxed max-w-sm mb-6">
            To ensure safety across the platform, basic ID verification is required before you can message other solo kins.
          </p>
          <button className="px-6 py-3 bg-ocean text-white font-bold rounded-xl shadow-lg hover:bg-ocean-dark transition-all active:scale-95">
            Verify Identity Now
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-900/60 text-sm">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
        <span>Don't worry, your ID details are encrypted and never shown to other users.</span>
      </div>
    </div>
  );
}

function OnboardingSuccess() {
  return (
    <div className="min-h-screen bg-sunset flex flex-col items-center justify-center text-center px-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8"
      >
        <Check className="w-12 h-12 text-sunset" />
      </motion.div>
      <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">You're All Set!</h2>
      <p className="text-white/70 text-lg md:text-xl max-w-md mx-auto mb-12">
        Welcome to your tribe. Your profile is being prepared—your Southeast Asia journey starts here.
      </p>
      <Link 
        href="/" 
        className="px-10 py-5 bg-slate text-white font-bold rounded-2xl shadow-2xl hover:bg-slate-dark transition-all active:scale-95"
      >
        Enter the Hub
      </Link>
    </div>
  );
}
