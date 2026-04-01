"use client";

import React, { useState } from "react";
import { 
  Users, 
  Shield, 
  MapPin, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Navigation,
  Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────── */
/* Data Mockups                                                 */
/* ─────────────────────────────────────────────────────────── */

const kins = [
  { id: 1, name: "Suki", location: "Chiang Mai", vibe: "Introvert, Foodie", status: "online", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 2, name: "Liam", location: "Bangkok", vibe: "Night Owl, Action", status: "away", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 3, name: "Nara", location: "Phuket", vibe: "Early Bird, Zen", status: "online", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop" },
  { id: 4, name: "Kevin", location: "Bali", vibe: "Remote Pro, Surf", status: "offline", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop" },
];

/* ─────────────────────────────────────────────────────────── */
/* Components                                                    */
/* ─────────────────────────────────────────────────────────── */

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("@/components/map/InteractiveMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-slate/5 animate-pulse rounded-[2.5rem] flex items-center justify-center text-slate/20 font-black uppercase tracking-widest italic">Initialising Maps Engine...</div>
});

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"hub" | "safety" | "messages">("hub");

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col md:flex-row">
      
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate/5 flex-col p-8 space-y-12 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <Link href="/" className="text-2xl font-serif font-bold text-slate">
          Travel <span className="text-sunset italic">Kin</span>
        </Link>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            active={activeTab === "hub"} 
            onClick={() => setActiveTab("hub")} 
            icon={Users} 
            label="The Hub" 
          />
          <SidebarItem 
            active={activeTab === "safety"} 
            onClick={() => setActiveTab("safety")} 
            icon={Shield} 
            label="Safety Centre" 
          />
          <SidebarItem 
            active={activeTab === "messages"} 
            onClick={() => setActiveTab("messages")} 
            icon={MessageSquare} 
            label="Messages" 
            badge="3"
          />
        </nav>

        <div className="pt-8 border-t border-slate/5 space-y-4">
           <SidebarItem icon={Settings} label="Settings" />
           <SidebarItem icon={LogOut} label="Log Out" className="text-red-400 hover:bg-red-50 hover:text-red-500" />
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 backdrop-blur-xl border-b border-slate/5 sticky top-0 z-20">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif text-slate font-bold">Welcome back, Mia</h1>
            <p className="text-slate/60 text-sm font-medium">You have 12 matches in Chiang Mai today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/50" />
               <input 
                 placeholder="Search travellers..." 
                 className="p-4 pl-12 bg-white border border-slate/5 rounded-2xl shadow-sm text-sm focus:outline-sunset focus:ring-4 focus:ring-sunset/5 transition-all"
               />
            </div>
            <button 
              aria-label="Notifications"
              className="p-4 bg-white border border-slate/5 rounded-2xl shadow-sm hover:bg-slate/5 transition-all"
            >
              <Bell className="w-5 h-5 text-slate/40" />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-6 md:p-12 h-content">
          {activeTab === "hub" && <TravelCrewHub />}
          
          <div className={cn(activeTab === "safety" ? "block" : "hidden")}>
            <SafetyDashboard />
          </div>

          {activeTab === "messages" && <MessagesPlaceholder />}
        </div>
      </main>

      {/* ── Mobile Navigation ── */}
      <nav className="md:hidden sticky bottom-0 left-0 right-0 h-20 bg-white border-t border-slate/5 flex items-center justify-around px-2 z-30">
        <MobileNavItem active={activeTab === "hub"} onClick={() => setActiveTab("hub")} icon={Users} label="Hub" />
        <MobileNavItem active={activeTab === "safety"} onClick={() => setActiveTab("safety")} icon={Shield} label="Safety" />
        <MobileNavItem active={activeTab === "messages"} onClick={() => setActiveTab("messages")} icon={MessageSquare} label="Chat" />
        <MobileNavItem icon={Settings} label="Settings" />
      </nav>
    </div>
  );
}

/* ── UI Components ── */

function TravelCrewHub() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate md:text-2xl uppercase tracking-tight">Solo Kins Nearby</h2>
        <button className="flex items-center gap-2 text-sunset text-sm font-bold uppercase tracking-widest hover:underline decoration-2">
          <Filter className="w-4 h-4" />
          Refine
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kins.map(kin => (
          <KinCard key={kin.id} kin={kin} />
        ))}
      </div>
    </div>
  );
}

function SafetyDashboard() {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="p-10 bg-ocean rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
          <Shield className="w-64 h-64 rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/10 uppercase tracking-widest text-white/80">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
              Safety Protocols Active
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">24/7 SOS Sharing</h2>
            <p className="text-white/60 max-w-sm">Automatically share your location with emergency contacts and get local safety alerts in real-time.</p>
          </div>
          <button className="px-10 py-5 bg-white text-ocean font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
             Emergency Broadcast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate text-lg uppercase tracking-tight">Live Security Map</h3>
              <div className="flex gap-2">
                  <div className="px-3 py-1.5 bg-green-50 text-green-600 text-[10px] font-black rounded-full border border-green-100 uppercase tracking-widest shadow-sm">GPS Tracking Active</div>
              </div>
           </div>
           <InteractiveMap />
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate/10 shadow-xl shadow-slate/10 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-slate text-lg uppercase tracking-tight">Active SafeZone</h3>
             <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase">Secure</span>
          </div>
          <div className="p-4 bg-mist rounded-2xl flex items-center gap-4">
             <div className="p-3 bg-ocean text-white rounded-xl shadow-md"><MapPin className="w-5 h-5" /></div>
             <div>
                <p className="text-sm font-bold text-slate">Old Town, Chiang Mai</p>
                <p className="text-xs text-slate/60">Verified Safe by 45 Kins</p>
             </div>
          </div>
          <div className="hidden md:flex items-center gap-4 p-5 bg-white border border-slate/10 rounded-3xl shadow-sm">
            <div className="p-4 bg-sunset/20 rounded-2xl">
               <Users className="w-6 h-6 text-sunset" />
            </div>
            <div>
              <p className="text-slate/70 text-[10px] font-black uppercase tracking-wider">Tribe Activity</p>
              <p className="text-slate font-bold">High in Chiang Mai</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate/10 shadow-xl shadow-slate/10 space-y-6">
          <h3 className="font-bold text-slate text-lg uppercase tracking-tight">Emergency Contacts</h3>
          <div className="space-y-3">
             <ContactItem name="Sarah Reyes" role="Partner" active />
             <ContactItem name="Elena Kin" role="Emergency Desk" />
          </div>
          <button className="w-full py-4 text-slate font-bold text-sm bg-slate/10 rounded-xl hover:bg-slate/20 transition-all uppercase tracking-widest">+ Add Contact</button>
        </div>
      </div>
    </div>
  );
}

function MessagesPlaceholder() {
  return (
    <div className="bg-white h-[600px] rounded-[2.5rem] border border-slate/10 flex flex-col items-center justify-center p-12 text-center space-y-6 shadow-2xl">
      <div className="w-24 h-24 bg-mist rounded-full flex items-center justify-center text-slate/40">
        <MessageSquare className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-serif font-bold text-slate">Select a Conversation</h3>
        <p className="text-slate/60 max-w-xs mx-auto">Click on a solo kin to start planning your next journey together.</p>
      </div>
    </div>
  );
}

/* ── HELPER COMPONENTS ── */

function SidebarItem({ icon: Icon, label, active, onClick, className, badge }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full px-4 py-4 rounded-2xl flex items-center justify-between gap-4 font-bold transition-all group",
        active ? "bg-slate text-white shadow-xl shadow-slate/20" : "text-slate/60 hover:bg-slate/10 hover:text-slate",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Icon className={cn("w-5 h-5", active ? "text-sunset" : "group-hover:text-sunset transition-colors")} />
        <span className="text-sm tracking-tight">{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 bg-sunset text-white text-[10px] rounded-lg font-black">{badge}</span>
      )}
    </button>
  );
}

function MobileNavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all",
        active ? "text-sunset" : "text-slate/50"
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function KinCard({ kin }: { kin: any }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate/10 border border-slate/10 flex flex-col items-center text-center space-y-4 group relative overflow-hidden"
    >
      <div className="absolute top-4 right-4 z-10">
        <button 
          aria-label={`Add ${kin.name} to favorites`}
          className="p-2 text-slate/40 hover:text-sunset transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      
      <div className="relative">
        <div className={cn(
          "w-24 h-24 rounded-full p-1 border-2 border-white shadow-xl relative z-10 overflow-hidden",
          kin.status === "online" ? "border-green-400" : "border-slate/20"
        )}>
          <Image 
            src={kin.image} 
            alt={kin.name} 
            fill 
            className="object-cover rounded-full" 
          />
        </div>
        {kin.status === "online" && (
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white z-20" />
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-xl font-serif font-bold text-slate">{kin.name}</h4>
        <div className="flex items-center justify-center gap-1.5 text-slate/70 text-xs font-bold uppercase tracking-tight">
          <MapPin className="w-3 h-3" />
          {kin.location}
        </div>
      </div>

      <div className="p-2 bg-mist rounded-full text-[10px] font-bold text-slate/70 uppercase tracking-widest w-full">
        {kin.vibe}
      </div>

      <div className="pt-4 grid grid-cols-2 gap-3 w-full">
         <button className="py-3 px-4 bg-slate text-white text-xs font-bold rounded-xl hover:bg-slate-dark transition-all flex items-center justify-center gap-2">
           <MessageSquare className="w-3 h-3" />
           Chat
         </button>
         <button className="py-3 px-4 bg-sunset/10 text-sunset text-xs font-bold rounded-xl hover:bg-sunset/20 transition-all flex items-center justify-center gap-2">
           <Navigation className="w-3 h-3" />
           View
         </button>
      </div>
    </motion.div>
  );
}

function ContactItem({ name, role, active }: any) {
  return (
    <div className="p-4 rounded-xl border border-slate/10 bg-slate/[0.05] flex items-center justify-between group hover:border-sunset/30 transition-all">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate/20 flex items-center justify-center text-slate/60 font-black uppercase text-xs">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate">{name}</p>
            <p className="text-[10px] font-bold text-slate/50 uppercase tracking-wider">{role}</p>
          </div>
       </div>
       <MoreVertical className="w-4 h-4 text-slate/40" />
    </div>
  );
}
