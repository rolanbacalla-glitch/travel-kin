"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  Heart, 
  Camera, 
  Check, 
  Save, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfile";
import { logFirebaseEvent } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Preset avatars user can choose from
const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=100&w=1600", // Mia (default)
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=100&w=1600",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=100&w=1600",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=100&w=1600",
];

const STYLES_LIST = [
  { id: "slow", label: "Slow Wanderbox", icon: "🐢" },
  { id: "fast", label: "Fast-Paced Action", icon: "⚡" },
  { id: "budget", label: "Budget Backpacker", icon: "🎒" },
  { id: "luxury", label: "Luxury Nomad", icon: "🥂" },
  { id: "eco", label: "Eco Adventurer", icon: "🌿" },
  { id: "remote", label: "Remote Pro", icon: "💻" },
];

const VIBES_LIST = [
  "Introvert",
  "Extrovert",
  "Night Owl",
  "Early Bird",
  "Foodie",
  "History Buff",
  "Action Junkie",
  "Zen Seeker",
  "Photographer",
  "Culture Vulture"
];

const DESTINATIONS_LIST = [
  { name: "Thailand", icon: "🐘" },
  { name: "Vietnam", icon: "🍜" },
  { name: "Indonesia", icon: "🏝️" },
  { name: "Philippines", icon: "☀" }
];

export function ProfileSettings() {
  const profile = useProfileStore();

  // Local Form States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [vibes, setVibes] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);

  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with store on mount
  useEffect(() => {
    setName(profile.name);
    setUsername(profile.username);
    setBio(profile.bio);
    setAvatar(profile.avatar);
    setStyles(profile.styles);
    setVibes(profile.vibes);
    setDestinations(profile.destinations);
  }, [profile]);

  const toggleStyle = (styleId: string) => {
    setStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId) 
        : [...prev, styleId]
    );
  };

  const toggleVibe = (vibeName: string) => {
    setVibes(prev => 
      prev.includes(vibeName) 
        ? prev.filter(v => v !== vibeName) 
        : [...prev, vibeName]
    );
  };

  const toggleDestination = (destName: string) => {
    setDestinations(prev => 
      prev.includes(destName) 
        ? prev.filter(d => d !== destName) 
        : [...prev, destName]
    );
  };

  const handleSave = () => {
    profile.updateProfile({
      name,
      username,
      bio,
      avatar,
      styles,
      vibes,
      destinations
    });

    logFirebaseEvent("profile_update_success", {
      styles_count: styles.length,
      vibes_count: vibes.length,
      destinations_count: destinations.length
    });

    // Show toast
    setToastMessage("Profile saved successfully!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleReset = () => {
    profile.resetProfile();
    logFirebaseEvent("profile_reset");
    
    setToastMessage("Profile reset to defaults.");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-24 relative">
      
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-slate text-white rounded-2xl shadow-2xl font-bold tracking-wide flex items-center gap-3 border border-white/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sunset font-bold tracking-widest text-xs uppercase bg-sunset/5 rounded-full px-4 py-1.5 w-fit border border-sunset/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Your Persona
          </div>
          <h2 className="text-4xl font-serif text-slate font-bold">Profile Settings</h2>
          <p className="text-slate/60 font-medium">Update your bio and preferences to find matched travellers near you.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3.5 bg-white text-slate/60 hover:text-slate border border-slate/5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-sm transition-all hover:bg-slate/5 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-8 py-3.5 bg-sunset text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-sunset/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Avatar & Bio */}
        <div className="md:col-span-1 space-y-8">
          
          {/* Avatar Section */}
          <div className="bg-white border border-slate/5 rounded-[40px] p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-sunset/10 group-hover:border-sunset/30 transition-all shadow-inner">
              <Image 
                src={avatar || AVATAR_PRESETS[0]} 
                alt="Avatar" 
                fill 
                className="object-cover"
              />
              <button 
                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-5 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-xl font-bold text-slate">{name || "Mia Reyes"}</h3>
                <ShieldCheck className="w-4.5 h-4.5 text-ocean" />
              </div>
              <p className="text-xs font-semibold text-slate/40 mt-1">@{username || "wanderer_mia"}</p>
            </div>

            {/* Avatar Preset Selector */}
            <AnimatePresence>
              {showAvatarSelector && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center z-10"
                >
                  <p className="text-xs font-black uppercase tracking-widest text-slate/40 mb-4">Select Avatar</p>
                  <div className="flex gap-3 justify-center mb-6">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setAvatar(p);
                          setShowAvatarSelector(false);
                        }}
                        className={cn(
                          "relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all active:scale-90",
                          avatar === p ? "border-sunset scale-110 shadow-md" : "border-slate/10 hover:border-slate/30"
                        )}
                      >
                        <Image src={p} alt="Preset Option" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowAvatarSelector(false)}
                    className="px-4 py-2 bg-slate/5 text-slate text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate/10 transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Verification Card */}
          <div className="bg-gradient-to-br from-ocean/5 to-ocean/10 border border-ocean/10 rounded-[40px] p-8 shadow-sm text-center relative overflow-hidden group">
            <div className="p-3 w-fit bg-ocean text-white rounded-2xl mx-auto shadow-md mb-4 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate font-serif">Passport Verified</h4>
            <p className="text-slate/60 text-xs font-semibold mt-1">Identity checked on May 20, 2026</p>
            <div className="mt-4 px-3 py-1 bg-white/60 border border-ocean/10 rounded-full text-[9px] font-black uppercase tracking-wider text-ocean w-fit mx-auto">
              Level 3 Security Active
            </div>
          </div>
        </div>

        {/* Right Side: Settings Fields */}
        <div className="md:col-span-2 space-y-8">
          
          {/* Section: Basic Info */}
          <div className="bg-white border border-slate/5 rounded-[40px] p-8 md:p-10 shadow-sm space-y-6">
            <h3 className="text-lg font-serif font-bold text-slate border-b border-slate/5 pb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate/40 ml-1">Legal Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 pl-5 bg-[#F9F8F6] border border-slate/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sunset/20 transition-all font-medium text-slate text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate/40 ml-1">Username</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate/30 font-bold text-sm">@</span>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 pl-10 bg-[#F9F8F6] border border-slate/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sunset/20 transition-all font-medium text-slate text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate/40 ml-1">Short Bio</label>
              <textarea 
                rows={3}
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-4 pl-5 bg-[#F9F8F6] border border-slate/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sunset/20 transition-all font-medium text-slate text-sm resize-none"
              />
            </div>
          </div>

          {/* Section: Travel Style */}
          <div className="bg-white border border-slate/5 rounded-[40px] p-8 md:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate/5 pb-4 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-slate">Travel Style</h3>
              <span className="text-[9px] font-black uppercase tracking-wider text-slate/30 bg-[#F9F8F6] px-3 py-1 rounded-lg">Select Multiple</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STYLES_LIST.map((style) => {
                const isActive = styles.includes(style.id);
                return (
                  <button
                    key={style.id}
                    onClick={() => toggleStyle(style.id)}
                    className={cn(
                      "p-5 border rounded-2xl text-center transition-all group active:scale-95 relative",
                      isActive
                        ? "border-sunset bg-sunset/5 text-sunset scale-[1.02] shadow-sm font-bold"
                        : "border-slate/5 hover:border-sunset/30 text-slate/60 hover:text-slate hover:bg-slate/5"
                    )}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-105 transition-transform">{style.icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest block leading-tight">{style.label}</span>
                    {isActive && (
                      <span className="absolute top-2 right-2 bg-sunset text-white p-0.5 rounded-full">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Vibes */}
          <div className="bg-white border border-slate/5 rounded-[40px] p-8 md:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate/5 pb-4 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-slate">Personal Vibes</h3>
              <span className="text-[9px] font-black uppercase tracking-wider text-slate/30 bg-[#F9F8F6] px-3 py-1 rounded-lg">Select Multiple</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {VIBES_LIST.map((vibe) => {
                const isActive = vibes.includes(vibe);
                return (
                  <button
                    key={vibe}
                    onClick={() => toggleVibe(vibe)}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all border",
                      isActive
                        ? "bg-sunset text-white border-sunset shadow-md shadow-sunset/10 scale-105"
                        : "bg-[#F9F8F6] text-slate/60 border-slate/5 hover:border-sunset/30 hover:text-slate"
                    )}
                  >
                    {vibe}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Main Destinations */}
          <div className="bg-white border border-slate/5 rounded-[40px] p-8 md:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate/5 pb-4 flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-slate">Main Destinations</h3>
              <span className="text-[9px] font-black uppercase tracking-wider text-slate/30 bg-[#F9F8F6] px-3 py-1 rounded-lg">Select Multiple</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {DESTINATIONS_LIST.map((dest) => {
                const isActive = destinations.includes(dest.name);
                return (
                  <button
                    key={dest.name}
                    onClick={() => toggleDestination(dest.name)}
                    className={cn(
                      "p-4 border rounded-2xl flex items-center gap-4 transition-all font-bold group relative active:scale-95",
                      isActive
                        ? "bg-sunset/5 border-sunset text-slate scale-[1.02] shadow-sm"
                        : "border-slate/5 text-slate/60 hover:text-slate hover:bg-slate/5"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-105",
                      isActive ? "bg-sunset text-white" : "bg-[#F9F8F6] border border-slate/5"
                    )}>
                      {dest.icon}
                    </div>
                    <span className="text-sm font-semibold">{dest.name}</span>
                    {isActive && (
                      <span className="absolute right-4 bg-sunset text-white p-0.5 rounded-full">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
