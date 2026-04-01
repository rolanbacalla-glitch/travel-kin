"use client";

import React from "react";
import { 
  Shield, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Plus, 
  Clock, 
  AlertTriangle,
  Zap,
  UserCheck
} from "lucide-react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useMessagesStore } from "@/lib/stores/useMessages";
import { useState, useRef, useEffect } from "react";

const InteractiveMap = dynamic(() => import("@/components/map/InteractiveMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-slate/5 animate-pulse rounded-[2rem] flex items-center justify-center text-slate/20 font-black uppercase tracking-widest italic tracking-widest">Initialising Secure Map...</div>
});

export function SafetyDashboard() {
  const store = useMessagesStore();
  const [sosProgress, setSosProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isSOSActive = Object.values(store.sessions).some(s => s.isSOSActive);

  useEffect(() => {
    if (isHolding) {
      const interval = setInterval(() => {
        setSosProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            store.triggerSOS(true);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    } else {
      setSosProgress(0);
    }
  }, [isHolding, store]);

  const handleDeactivate = () => {
    store.triggerSOS(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <AnimatePresence>
        {isSOSActive && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-6"
          >
            <div className="bg-red-600 text-white p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-6 border-4 border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest">SOS ACTIVE</h4>
                  <p className="text-[10px] font-bold opacity-60">Authorities & Circle Notified</p>
                </div>
              </div>
              <button 
                onClick={handleDeactivate}
                className="px-6 py-2 bg-white text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
              >
                Cancel SOS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <div className="flex items-center gap-3 text-red-500 font-bold tracking-widest text-xs uppercase bg-red-50 rounded-full px-4 py-1.5 w-fit border border-red-100 shadow-sm">
                <Shield className="w-3.5 h-3.5" />
                Safety Center
            </div>
          <h2 className="text-4xl font-serif text-slate font-bold">Your Safety Ring</h2>
          <p className="text-slate/60 font-medium italic">Active protection across Southeast Asia.</p>
        </div>
        
        <div className="flex items-center gap-4">
             <div className="p-4 bg-white border border-slate/5 rounded-3xl shadow-sm flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-slate uppercase tracking-widest">GPS Live</span>
             </div>
             <div className="p-4 bg-white border border-slate/5 rounded-3xl shadow-sm flex items-center gap-3">
                <Zap className="w-4 h-4 text-sunset" />
                <span className="text-xs font-bold text-slate uppercase tracking-widest">88% Battery</span>
             </div>
        </div>
      </div>

      {/* Primary Emergency Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* The SOS Button - High Emotional Impact */}
        <div className="lg:col-span-2 relative p-12 bg-slate text-white rounded-[50px] shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate via-slate to-red-950 opacity-50" />
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-500/10 blur-[100px] group-hover:bg-red-500/20 transition-all duration-700" />
            
            <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                    <h3 className="text-4xl font-serif font-bold leading-tight">Instant SOS Broadcast</h3>
                    <p className="text-white/50 font-medium max-w-sm leading-relaxed">Alert your emergency ring, local authorities, and nearby verified Kins in one silent tap.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative w-full sm:w-auto">
                        <button 
                            onMouseDown={() => !isSOSActive && setIsHolding(true)}
                            onMouseUp={() => setIsHolding(false)}
                            onMouseLeave={() => setIsHolding(false)}
                            onTouchStart={() => !isSOSActive && setIsHolding(true)}
                            onTouchEnd={() => setIsHolding(false)}
                            className={cn(
                                "w-full sm:w-auto px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 text-sm relative z-10 overflow-hidden",
                                isSOSActive 
                                    ? "bg-white text-red-600 cursor-default" 
                                    : "bg-red-600 text-white hover:bg-red-500 shadow-red-600/40"
                            )}
                        >
                            <span className="relative z-10">{isSOSActive ? "Broadcast Active" : "Hold to Alert"}</span>
                            
                            {/* Progress Bar Overlay */}
                            {!isSOSActive && (
                                <motion.div 
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${sosProgress}%` }}
                                />
                            )}
                        </button>
                    </div>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest text-center sm:text-left">
                        {isSOSActive ? "Broadcasting to local Ring..." : "Long-press to avoid accidental trigger"}
                    </p>
                </div>
            </div>
        </div>

        {/* Safety Pulse */}
        <div className="p-10 bg-white border border-slate/5 rounded-[50px] shadow-xl shadow-slate/5 flex flex-col justify-between border-t-4 border-t-green-500">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="p-4 bg-green-50 rounded-2xl">
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate/30">Daily Check-in</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate">Safety Pulse</h3>
                <p className="text-slate/60 text-sm leading-relaxed font-medium">Auto-ping your trusted circle every 12 hours. Keeps your family calm without the &quot;where are you?&quot; texts.</p>
            </div>
            
            <button className="mt-8 py-5 bg-[#F9F8F6] text-slate border border-slate/5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate hover:text-white transition-all shadow-sm active:scale-95">
                Send a Pulse Now
            </button>
        </div>
      </div>

      {/* Live Map & Zone Info */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Map Section */}
        <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between px-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate/40">Real-time Safety Heatmap</h3>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[10px] font-bold text-slate/60 uppercase">Chiang Mai (Secure)</span>
                </div>
            </div>
            <div className="rounded-[40px] overflow-hidden border border-slate/5 shadow-2xl relative">
                <InteractiveMap />
                {/* Map Overlay Controls */}
                <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                    <button title="Locate Me" className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate hover:bg-white active:scale-90 transition-all border border-slate/5">
                        <Navigation className="w-5 h-5" />
                    </button>
                    <button title="Map Settings" className="p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-slate hover:bg-white active:scale-90 transition-all border border-slate/5">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        {/* Safety Context Column */}
        <div className="space-y-8">
            {/* Trusted Circle */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate/40">Trusted Circle</h3>
                    <Plus className="w-4 h-4 text-ocean cursor-pointer" />
                </div>
                <div className="space-y-4">
                    <CircleMember name="David (Dad)" role="Emergency" verified />
                    <CircleMember name="Sarah Miller" role="Adventure" verified />
                    <CircleMember name="Front Desk" role="Local" />
                </div>
            </div>

            {/* Verification Status Card */}
            <div className="p-8 bg-ocean text-white rounded-[40px] shadow-xl shadow-ocean/10 space-y-4 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-10">
                    <UserCheck className="w-32 h-32" />
                </div>
                <h4 className="text-lg font-bold">Kin Protocol</h4>
                <p className="text-white/60 text-xs leading-relaxed font-medium italic">&ldquo;We verify IDs so you can find connections, not complications.&rdquo;</p>
                <div className="pt-2">
                   <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/5">
                       <Shield className="w-3 h-3" />
                       ID Verified Profile
                   </div>
                </div>
            </div>

            {/* Travel Insurance quick access */}
            <div className="p-6 border-2 border-dashed border-slate/10 rounded-[35px] flex flex-col items-center justify-center gap-3 text-center group cursor-pointer hover:border-ocean/20 transition-all">
                <AlertTriangle className="w-6 h-6 text-slate/20 group-hover:text-ocean/40 transition-colors" />
                <p className="text-[10px] font-bold text-slate/30 uppercase tracking-widest">Travel Insurance Policy</p>
                <span className="text-xs font-black text-slate/50">#TK-99281-ASIA</span>
            </div>
        </div>
      </div>
    </div>
  );
}

/* ── HELPER: Circle Member ── */
function CircleMember({ name, role, verified }: { name: string; role: string; verified?: boolean }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate/5 flex items-center justify-center text-xs font-black text-slate shadow-sm group-hover:border-ocean transition-all">
                    {name[0]}
                </div>
                <div>
                    <p className="text-xs font-bold text-slate">{name}</p>
                    <p className="text-[9px] font-black text-slate/30 uppercase tracking-tighter">{role}</p>
                </div>
            </div>
            {verified && <CheckCircle2 className="w-3.5 h-3.5 text-ocean/40" />}
        </div>
    );
}

function Navigation({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;
}

function Filter({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
