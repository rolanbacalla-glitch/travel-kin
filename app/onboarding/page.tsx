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
import Image from "next/image";
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

  // State for all onboarding data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    styles: [] as string[],
    vibes: [] as string[],
    destinations: [] as string[],
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleItem = (field: "styles" | "vibes" | "destinations", item: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      const next = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [field]: next };
    });
  };

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
    <div className="min-h-screen bg-[#080B12] text-white flex flex-col relative overflow-hidden">
      {/* ── Background Decoration ── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=1920"
          alt="Southeast Asia Background"
          fill
          priority
          className="object-cover opacity-20 scale-110 pointer-events-none animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/80 via-[#080B12]/40 to-[#080B12]" />
      </div>

      {/* ── Navigation ── */}
      <nav className="relative z-10 p-6 md:p-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold text-white">
          Travel <span className="text-sunset italic">Kin</span>
        </Link>
        <div className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold tracking-widest text-[#FF8C42] uppercase shadow-lg">
          Step {currentStep + 1} of {steps.length}
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          {/* ── Progress Bar ── */}
          <div className="h-1 w-full bg-white/5 rounded-full mb-12 overflow-hidden">
            <motion.div
              className="h-full bg-sunset shadow-[0_0_12px_rgba(255,140,66,0.5)]"
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
                <div className="inline-flex p-3.5 rounded-2xl bg-sunset shadow-xl shadow-sunset/20 mb-6 ring-4 ring-sunset/10 transition-transform hover:scale-105 active:scale-95 cursor-default">
                  {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 text-white" })}
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-3">
                  {steps[currentStep].title}
                </h1>
                <p className="text-white/60 text-lg md:text-xl font-medium">{steps[currentStep].desc}</p>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {currentStep === 0 && <IdentityForm data={formData} update={updateField} />}
                {currentStep === 1 && <StyleForm selected={formData.styles} toggle={(v) => toggleItem("styles", v)} />}
                {currentStep === 2 && (
                  <VibeForm
                    selectedVibes={formData.vibes}
                    toggleVibe={(v) => toggleItem("vibes", v)}
                    selectedDest={formData.destinations}
                    toggleDest={(v) => toggleItem("destinations", v)}
                  />
                )}
                {currentStep === 3 && <SafetyForm />}
              </div>

              {/* Navigation Actions */}
              <div className="pt-10 flex items-center justify-between border-t border-white/10">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex items-center gap-2 text-white/30 font-bold tracking-widest uppercase text-xs hover:text-white transition-colors duration-200",
                    currentStep === 0 && "opacity-0 pointer-events-none"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-10 py-5 bg-sunset text-white font-bold rounded-2xl shadow-2xl shadow-sunset/10 hover:bg-sunset-dark transition-all duration-300 flex items-center gap-3 active:scale-95 group"
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

function IdentityForm({
  data,
  update
}: {
  data: any,
  update: (field: string, val: any) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2 font-sans">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-1">Legal Name</label>
        <input
          value={data.name || ""}
          onChange={(e) => update("name", e.target.value)}
          placeholder="Ex: Mia Reyes"
          className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-sunset/30 focus:bg-white/[0.08] transition-all font-medium text-white placeholder:text-white/20"
        />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-1">Username</label>
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
          <input
            value={data.username || ""}
            onChange={(e) => update("username", e.target.value)}
            placeholder="wanderer_mia"
            className="w-full p-5 pl-10 bg-white/5 border border-white/10 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-sunset/30 focus:bg-white/[0.08] transition-all font-medium text-white placeholder:text-white/20"
          />
        </div>
      </div>
      <div className="md:col-span-2 space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-1">Short Bio</label>
        <textarea
          value={data.bio || ""}
          onChange={(e) => update("bio", e.target.value)}
          placeholder="What should we know about you? (Keep it fun)"
          rows={3}
          className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-sunset/30 focus:bg-white/[0.08] transition-all font-medium text-white placeholder:text-white/20 resize-none"
        />
      </div>
    </div>
  );
}

function StyleForm({
  selected,
  toggle
}: {
  selected: string[],
  toggle: (val: string) => void
}) {
  const styles = [
    { id: "slow", label: "Slow Wanderbox", icon: "🐢" },
    { id: "fast", label: "Fast-Paced Action", icon: "⚡" },
    { id: "budget", label: "Budget Backpacker", icon: "🎒" },
    { id: "luxury", label: "Luxury Nomad", icon: "🥂" },
    { id: "eco", label: "Eco Adventurer", icon: "🌿" },
    { id: "remote", label: "Remote Pro", icon: "💻" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {styles.map(s => (
        <button
          key={s.id}
          onClick={() => toggle(s.id)}
          className={cn(
            "p-6 bg-white/5 border rounded-2xl shadow-xl transition-all text-center group active:scale-95",
            selected.includes(s.id)
              ? "border-sunset bg-sunset/5 ring-1 ring-sunset/30 scale-[1.02]"
              : "border-white/10 hover:border-sunset/50 hover:bg-white/[0.08]"
          )}
        >
          <div className={cn(
            "text-4xl mb-4 transition-transform duration-300 drop-shadow-lg",
            selected.includes(s.id) ? "scale-110" : "group-hover:scale-110"
          )}>{s.icon}</div>
          <span className={cn(
            "text-xs font-bold tracking-widest uppercase transition-colors",
            selected.includes(s.id) ? "text-sunset" : "text-white/40 group-hover:text-white/80"
          )}>{s.label}</span>
          {selected.includes(s.id) && (
            <motion.div layoutId="check" className="mt-3 flex justify-center">
              <Check className="w-5 h-5 text-sunset" />
            </motion.div>
          )}
        </button>
      ))}
    </div>
  );
}

function VibeForm({
  selectedVibes,
  toggleVibe,
  selectedDest,
  toggleDest
}: {
  selectedVibes: string[],
  toggleVibe: (val: string) => void,
  selectedDest: string[],
  toggleDest: (val: string) => void
}) {
  const vibes = ["Introvert", "Extrovert", "Night Owl", "Early Bird", "Foodie", "History Buff", "Action Junkie", "Zen Seeker", "Photographer", "Culture Vulture"];
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-3">
        {vibes.map(v => (
          <button
            key={v}
            onClick={() => toggleVibe(v)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all border",
              selectedVibes.includes(v)
                ? "bg-sunset text-white border-sunset shadow-lg shadow-sunset/20 scale-105"
                : "bg-white/5 text-white/60 border-white/10 hover:border-sunset/50 hover:text-white"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-1">Main Destinations</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Thailand", icon: "🐘" },
            { name: "Vietnam", icon: "🍜" },
            { name: "Indonesia", icon: "🏝️" },
            { name: "Philippines", icon: "☀" }
          ].map(dest => (
            <button
              key={dest.name}
              onClick={() => toggleDest(dest.name)}
              className={cn(
                "p-5 border rounded-2xl flex items-center gap-4 transition-all font-bold group relative overflow-hidden",
                selectedDest.includes(dest.name)
                  ? "bg-sunset/10 border-sunset text-white shadow-[0_0_20px_rgba(255,140,66,0.1)] scale-[1.02]"
                  : "bg-white/5 border-white/10 text-white/70 hover:border-sunset/50 hover:bg-white/10"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300",
                selectedDest.includes(dest.name)
                  ? "bg-sunset text-white shadow-lg"
                  : "bg-sunset/10 shadow-inner group-hover:scale-110"
              )}>
                {dest.icon}
              </div>
              <span className={cn(
                "transition-colors",
                selectedDest.includes(dest.name) ? "text-white" : "group-hover:text-white"
              )}>{dest.name}</span>

              {selectedDest.includes(dest.name) && (
                <motion.div
                  layoutId="dest-check"
                  className="absolute right-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Check className="w-5 h-5 text-sunset" />
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetyForm() {
  return (
    <div className="space-y-8">
      <div className="p-10 bg-ocean/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 relative overflow-hidden group">
        <div className="absolute -top-12 -right-12 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <ShieldCheck className="w-48 h-48 text-ocean rotate-12" />
        </div>

        <div className="p-5 h-fit w-fit bg-ocean text-white rounded-2xl shadow-2xl shadow-ocean/30 ring-8 ring-ocean/10 relative z-10 animate-float">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="relative z-10 flex-1">
          <h4 className="text-2xl font-serif text-white mb-3 tracking-tight">Trust Verification</h4>
          <p className="text-white/50 text-base leading-relaxed max-w-md mb-10">
            Join 12,000+ verified solo travellers. We use secure identity checks to ensure everyone in our community is who they say they are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/verify"
              className="px-10 py-5 bg-ocean text-white font-bold rounded-2xl shadow-2xl shadow-ocean/30 hover:bg-ocean-dark transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 group/btn"
            >
              Verify with Passport
              <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="px-10 py-5 bg-white/5 backdrop-blur-md text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center flex items-center justify-center shadow-lg shadow-black/20"
            >
              Skip for Now
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 p-6 bg-[#FF8C42]/5 border border-[#FF8C42]/20 rounded-[2rem] text-sunset text-sm font-medium">
        <AlertTriangle className="w-6 h-6 text-sunset flex-shrink-0 mt-0.5" />
        <p>Your privacy is our priority. ID verification data is processed by a certified third party and is never shared with other users or stored on our public servers.</p>
      </div>
    </div>
  );
}

function OnboardingSuccess() {
  return (
    <div className="min-h-screen bg-[#080B12] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* ── Background Decoration ── */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1544526226-d4568090ffb8?auto=format&fit=crop&q=80&w=1920"
          alt="Southeast Asia Background"
          fill
          priority
          className="object-cover opacity-10 scale-110 pointer-events-none"
        />
        <div className="absolute inset-0 bg-[#080B12]/60 backdrop-blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="w-24 h-24 bg-sunset rounded-full flex items-center justify-center shadow-2xl shadow-sunset/40 mx-auto mb-10 ring-8 ring-sunset/10"
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight">
          You&apos;re All <span className="text-sunset italic">Set!</span>
        </h2>
        <p className="text-white/60 text-xl md:text-2xl max-w-lg mx-auto mb-12 font-medium">
          Welcome to the tribe. Your Southeast Asia journey starts now.
        </p>
        <Link
          href="/dashboard"
          className="px-12 py-6 bg-sunset text-white font-bold rounded-2xl shadow-2xl shadow-sunset/20 hover:bg-sunset-dark transition-all active:scale-95 text-lg"
        >
          Enter the Hub
        </Link>
      </div>
    </div>
  );
}
