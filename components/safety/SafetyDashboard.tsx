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
  UserCheck,
  Settings,
  X,
  FileText,
  Lock,
  Download,
  Phone
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
  const [showSettings, setShowSettings] = useState(false);
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
    <>
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-slate/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl border-l border-slate/10 overflow-y-auto"
            >
              <div className="p-8 space-y-10 pb-20">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-slate">Safety Settings</h2>
                    <p className="text-sm font-medium text-slate/50">Manage your protection and privacy</p>
                  </div>
                  <button onClick={() => setShowSettings(false)} className="p-3 bg-slate/5 rounded-full hover:bg-slate/10 transition-colors">
                    <X className="w-5 h-5 text-slate" />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Contacts */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-ocean">
                      <Users className="w-4 h-4" />
                      <h3>Trusted Contacts</h3>
                    </div>
                    <div className="p-5 border border-slate/10 rounded-3xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate">Auto-SOS Alerts</p>
                          <p className="text-xs font-medium text-slate/50">Notify contacts when SOS is triggered</p>
                        </div>
                        <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate/10">
                        <button className="text-xs font-bold text-ocean hover:text-ocean/80 transition-colors">Manage 3 Contacts &rarr;</button>
                      </div>
                    </div>
                  </section>

                  {/* Automation */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-sunset">
                      <Clock className="w-4 h-4" />
                      <h3>Check-in Automation</h3>
                    </div>
                    <div className="p-5 border border-slate/10 rounded-3xl space-y-4">
                      <div>
                        <p className="text-sm font-bold text-slate">Pulse Frequency</p>
                        <p className="text-xs font-medium text-slate/50">How often we ping your trusted circle</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['12h', '24h', '48h'].map(t => (
                          <button key={t} className={`py-2 rounded-xl text-xs font-bold transition-colors ${t === '12h' ? 'bg-slate text-white shadow-md' : 'bg-slate/5 text-slate hover:bg-slate/10'}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Privacy & Permissions */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate">
                      <Lock className="w-4 h-4" />
                      <h3>Privacy & Permissions</h3>
                    </div>
                    <div className="space-y-2">
                      <PermissionRow title="Location Access" desc="While using the app" active />
                      <PermissionRow title="Push Notifications" desc="Critical alerts only" active />
                      <PermissionRow title="Microphone" desc="For voice-activated SOS" active={false} />
                    </div>
                  </section>

                  {/* Offline Data */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-green-600">
                      <Download className="w-4 h-4" />
                      <h3>Offline Resources</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-slate/5 rounded-2xl cursor-pointer hover:bg-slate/10 transition-colors group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-xl shadow-sm">
                            <FileText className="w-5 h-5 text-slate group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate">Medical ID</p>
                            <p className="text-[10px] font-medium text-slate/50">Saved locally</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-ocean uppercase tracking-widest">Edit</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
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
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-slate font-bold tracking-widest text-xs uppercase bg-slate/5 rounded-full px-4 py-1.5 w-fit border border-slate/10 shadow-sm">
              <Shield className="w-3.5 h-3.5" />
              Safety Center
            </div>
            <h2 className="text-4xl font-serif text-slate font-bold">Your Safety Ring</h2>
            <p className="text-slate/60 font-medium">Active protection across Southeast Asia.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-white border border-slate/5 rounded-3xl shadow-sm hidden sm:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-slate uppercase tracking-widest">GPS Live</span>
            </div>
            <div className="p-4 bg-white border border-slate/5 rounded-3xl shadow-sm hidden sm:flex items-center gap-3">
              <Zap className="w-4 h-4 text-sunset" />
              <span className="text-xs font-bold text-slate uppercase tracking-widest">88% Battery</span>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-4 bg-white border border-slate/5 rounded-3xl shadow-sm flex items-center justify-center hover:bg-slate/5 transition-colors cursor-pointer group"
            >
              <Settings className="w-5 h-5 text-slate group-hover:rotate-45 transition-transform duration-300" />
            </button>
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
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                    {isSOSActive ? "Broadcasting to local Ring..." : "Long-press to avoid accidental trigger"}
                  </p>
                  {!isSOSActive && (
                    <button className="text-[10px] text-white/50 hover:text-white/80 transition-colors w-fit mx-auto sm:mx-0 flex items-center gap-1 group">
                      <AlertTriangle className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                      Try Practice Mode
                    </button>
                  )}
                </div>>
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
                <button className="group flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-green-600 bg-green-50/50 hover:bg-green-50 border border-green-200 hover:border-green-300 px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm">
                  <Clock className="w-3 h-3 text-green-500 group-hover:rotate-12 transition-transform" />
                  Next pulse: 11h 45m
                </button>
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate">Safety Pulse</h3>
              <p className="text-slate/60 text-sm leading-relaxed font-medium">Auto-ping your trusted circle every 12 hours. Keeps your family calm without the &quot;where are you?&quot; texts.</p>
            </div>
            <button className="mt-8 py-5 bg-[#F9F8F6] text-slate border border-slate/5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-500 hover:text-white hover:border-green-500 transition-all shadow-sm hover:shadow-md hover:shadow-green-500/20 active:scale-95">
              Check-in as Safe
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
            <div className="rounded-[40px] overflow-hidden border border-slate/5 shadow-2xl relative z-0">
              <InteractiveMap />
              {/* Map Overlay Controls */}
              <div className="absolute top-6 left-6 max-w-[200px] hidden sm:block">
                <div className="p-4 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate/5 space-y-3">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-slate/40">Zone Legend</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-[10px] font-bold text-slate/70 leading-tight">Verified Safe Spaces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                      <span className="text-[10px] font-bold text-slate/70 leading-tight">Recent Safety Reports</span>
                    </div>
                  </div>
                </div>
              </div>
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

            {/* Local Emergency Numbers */}
            <div className="p-6 bg-white border border-slate/5 rounded-[40px] shadow-xl shadow-slate/5 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="p-2.5 bg-red-50 rounded-2xl">
                  <Phone className="w-4 h-4 text-red-500" />
                </div>
                <h4 className="text-sm font-bold text-slate">Local Emergency</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-[#F9F8F6] rounded-3xl flex flex-col items-center justify-center text-center gap-1 hover:bg-slate/5 transition-colors cursor-pointer">
                  <span className="text-[9px] font-black text-slate/40 uppercase tracking-widest">Police</span>
                  <span className="text-xl font-serif font-bold text-slate">191</span>
                </div>
                <div className="p-4 bg-[#F9F8F6] rounded-3xl flex flex-col items-center justify-center text-center gap-1 hover:bg-slate/5 transition-colors cursor-pointer">
                  <span className="text-[9px] font-black text-slate/40 uppercase tracking-widest">Ambulance</span>
                  <span className="text-xl font-serif font-bold text-slate">1669</span>
                </div>
              </div>
            </div>

            {/* Verification Status Badge */}
            <div className="p-5 border-2 border-slate/5 rounded-3xl flex items-center justify-between group cursor-pointer hover:border-ocean/20 bg-white transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-ocean/5 rounded-xl group-hover:bg-ocean/10 transition-colors">
                  <Shield className="w-5 h-5 text-ocean" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate">ID Verified Profile</p>
                  <p className="text-[10px] font-medium text-slate/50">Kin Protocol active</p>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-ocean" />
            </div>

            {/* Travel Insurance quick access */}
            <div className="p-6 border-2 border-dashed border-slate/30 rounded-[35px] flex flex-col items-center justify-center gap-3 text-center group cursor-pointer hover:border-ocean/20 transition-all">
              <AlertTriangle className="w-6 h-6 text-slate/70 group-hover:text-ocean/40 transition-colors" />
              <p className="text-[10px] font-bold text-slate/70 uppercase tracking-widest">Travel Insurance Policy</p>
              <span className="text-xs font-black text-slate/50">#TK-99281-ASIA</span>
            </div>
          </div>
        </div>
      </div>
    </>
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

function PermissionRow({ title, desc, active }: { title: string; desc: string; active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate/10 rounded-2xl cursor-pointer hover:bg-slate/5 transition-colors">
      <div>
        <p className="text-sm font-bold text-slate">{title}</p>
        <p className="text-xs font-medium text-slate/50">{desc}</p>
      </div>
      <div className={cn("w-10 h-6 rounded-full relative transition-colors", active ? "bg-green-500" : "bg-slate/20")}>
        <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm", active ? "right-1" : "left-1")} />
      </div>
    </div>
  );
}

function Navigation({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>;
}

function Filter({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>;
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
