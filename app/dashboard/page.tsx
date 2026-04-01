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
  MoreVertical,
  Navigation,
  Heart,
  Calendar,
  Camera
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Components
import { TravelCrewHub } from "@/components/dashboard/TravelCrewHub";
import { SafetyDashboard } from "@/components/safety/SafetyDashboard";
import { ItineraryView } from "@/components/dashboard/ItineraryView";
import { MemoriesView } from "@/components/dashboard/MemoriesView";
import MessagesView from "@/components/messages/MessagesView";

/* ─────────────────────────────────────────────────────────── */
/* Types                                                         */
/* ─────────────────────────────────────────────────────────── */

interface Kin {
  id: string;
  name: string;
  location: string;
  vibe: string;
  status: "online" | "away" | "offline";
  image: string;
}

/* ─────────────────────────────────────────────────────────── */
/* Data Mockups                                                 */
/* ─────────────────────────────────────────────────────────── */

const kins: Kin[] = [
  { id: "1", name: "Suki",  location: "Chiang Mai", vibe: "Introvert, Foodie",  status: "online",  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&auto=format&fit=crop" },
  { id: "2", name: "Liam",  location: "Bangkok",    vibe: "Night Owl, Action",  status: "away",    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=600&auto=format&fit=crop" },
  { id: "3", name: "Nara",  location: "Phuket",     vibe: "Early Bird, Zen",    status: "online",  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&h=600&auto=format&fit=crop" },
  { id: "4", name: "Kevin", location: "Bali",       vibe: "Remote Pro, Surf",   status: "offline", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=600&auto=format&fit=crop" },
];

/* ─────────────────────────────────────────────────────────── */
/* Page                                                         */
/* ─────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"hub" | "safety" | "messages" | "itinerary" | "memories">("hub");
  // Stores the conversation id to open when jumping from a Kin card → Messages
  const [openConvId, setOpenConvId] = useState<string | null>(null);

  const goToChat = (kinId: string) => {
    setOpenConvId(kinId);
    setActiveTab("messages");
  };

  const totalUnread = 3;

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col md:flex-row">
      
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate/5 flex-col p-8 space-y-12 shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed h-screen overflow-y-auto">
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
            active={activeTab === "itinerary"} 
            onClick={() => setActiveTab("itinerary")} 
            icon={Calendar} 
            label="Wander List" 
            badge="Vote!"
          />
          <SidebarItem 
            active={activeTab === "safety"} 
            onClick={() => setActiveTab("safety")} 
            icon={Shield} 
            label="Safety Hub" 
          />
          <SidebarItem 
            active={activeTab === "messages"} 
            onClick={() => { setOpenConvId(null); setActiveTab("messages"); }} 
            icon={MessageSquare} 
            label="Messages"
            badge={totalUnread > 0 ? String(totalUnread) : undefined}
          />

          {/* Separator for "Your Story" section */}
          <div className="pt-10 pb-4">
             <div className="h-px bg-slate/5 w-full mb-6" />
             <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate/20">Your Story</p>
          </div>

          <SidebarItem 
            active={activeTab === "memories"} 
            onClick={() => setActiveTab("memories")} 
            icon={Camera} 
            label="Memory Vault" 
            className={cn(activeTab === "memories" ? "bg-ocean text-white shadow-ocean/20" : "hover:text-ocean")}
          />
        </nav>

        <div className="pt-8 border-t border-slate/5 space-y-4">
           <SidebarItem icon={Settings} label="Settings" />
           <SidebarItem icon={LogOut} label="Log Out" className="text-red-400 hover:bg-red-50 hover:text-red-500" />
        </div>
      </aside>

      {/* Sidebar Spacer for Fixed Aside */}
      <div className="hidden md:block w-72 flex-shrink-0" />

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto min-h-screen">
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
                 className="p-4 pl-12 bg-white border border-slate/5 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-ocean/20 transition-all"
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
        <div className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            {activeTab === "hub" && (
              <motion.div
                key="hub"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <TravelCrewHub kins={kins} onChat={goToChat} />
              </motion.div>
            )}

            {activeTab === "itinerary" && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ItineraryView />
              </motion.div>
            )}

            {activeTab === "safety" && (
              <motion.div
                key="safety"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SafetyDashboard />
              </motion.div>
            )}

            {activeTab === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MessagesView openConvId={openConvId} />
              </motion.div>
            )}

            {activeTab === "memories" && (
              <motion.div
                key="memories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <MemoriesView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Mobile Navigation ── */}
      <nav className="md:hidden sticky bottom-0 left-0 right-0 h-20 bg-white border-t border-slate/5 flex items-center justify-around px-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <MobileNavItem active={activeTab === "hub"}       onClick={() => setActiveTab("hub")}                                      icon={Users}         label="Hub" />
        <MobileNavItem active={activeTab === "itinerary"} onClick={() => setActiveTab("itinerary")}                                 icon={Calendar}      label="Plan" />
        <MobileNavItem active={activeTab === "safety"}    onClick={() => setActiveTab("safety")}                                   icon={Shield}        label="Safety" />
        <MobileNavItem active={activeTab === "messages"}  onClick={() => { setOpenConvId(null); setActiveTab("messages"); }}        icon={MessageSquare} label="Chat" badge={totalUnread} />
        <MobileNavItem active={activeTab === "memories"}  onClick={() => setActiveTab("memories")}                                 icon={Camera}        label="Vault" />
      </nav>
    </div>
  );
}

/* ── UI COMPONENTS ── */

function SidebarItem({ icon: Icon, label, active, onClick, className, badge }: {
  icon: React.ElementType; label: string; active?: boolean;
  onClick?: () => void; className?: string; badge?: string;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full px-6 py-4 rounded-2xl flex items-center justify-between gap-4 font-bold transition-all group",
        active ? "bg-slate text-white shadow-xl shadow-slate/20" : "text-slate/60 hover:bg-slate/5 hover:text-slate",
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

function MobileNavItem({ icon: Icon, label, active, onClick, badge }: {
  icon: React.ElementType; label: string; active?: boolean; onClick?: () => void; badge?: number;
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all relative",
        active ? "text-sunset" : "text-slate/50"
      )}
    >
      <div className="relative">
        <Icon className="w-6 h-6" />
        {badge && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-sunset text-white text-[9px] font-black flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
