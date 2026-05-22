"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
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
  Camera,
  Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useMessagesStore } from "@/lib/stores/useMessages";
import { useProfileStore } from "@/lib/stores/useProfile";

// Components
import { TravelCrewHub } from "@/components/dashboard/TravelCrewHub";
import { SafetyDashboard } from "@/components/safety/SafetyDashboard";
import { ItineraryView } from "@/components/dashboard/ItineraryView";
import { MemoriesView } from "@/components/dashboard/MemoriesView";
import { CommunityFeed } from "@/components/dashboard/CommunityFeed";
import MessagesView from "@/components/messages/MessagesView";
import { ProfileSettings } from "@/components/dashboard/ProfileSettings";
import { KINS, Kin } from "@/lib/data/kins";

/* ─────────────────────────────────────────────────────────── */
/* Types                                                         */
/* ─────────────────────────────────────────────────────────── */

// KINS imported from @/lib/data/kins

/* ─────────────────────────────────────────────────────────── */
/* Page                                                         */
/* ─────────────────────────────────────────────────────────── */

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"hub" | "safety" | "messages" | "itinerary" | "memories" | "pulse" | "profile">("hub");
  const profile = useProfileStore();
  // Stores the conversation id to open when jumping from a Kin card → Messages
  const [openConvId, setOpenConvId] = useState<string | null>(null);

  const store = useMessagesStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "profile") {
        setActiveTab("profile");
      }
    }
  }, []);

  const goToChat = (kinId: string) => {
    store.setActiveId(kinId);
    setActiveTab("messages");
  };

  const handleSignOut = async () => {
    try {
      if (auth && typeof auth.signOut === "function") {
        await auth.signOut();
      } else if (auth) {
        const { signOut } = await import("firebase/auth");
        await signOut(auth);
      }
      if (typeof window !== "undefined") {
        if ((window as any).__setTravelKinMockUser) {
          (window as any).__setTravelKinMockUser(null);
        } else {
          localStorage.removeItem("travelkin-mock-user");
        }
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const totalUnread = 3;

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col md:flex-row">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate/5 flex-col p-8 space-y-12 shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed h-screen overflow-y-auto">
        <Link href="/" className="text-2xl font-serif font-bold text-slate">
          Travel <span className="text-sunset">Kin</span>
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
          <SidebarItem
            active={activeTab === "pulse"}
            onClick={() => setActiveTab("pulse")}
            icon={Zap}
            label="Pulse"
            badge="Live"
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
          <SidebarItem 
            active={activeTab === "profile"} 
            onClick={() => setActiveTab("profile")} 
            icon={Settings} 
            label="Settings" 
          />
          <SidebarItem 
            icon={LogOut} 
            label="Log Out" 
            className="text-red-400 hover:bg-red-50 hover:text-red-500" 
            onClick={handleSignOut}
          />
        </div>
      </aside>

      {/* Sidebar Spacer for Fixed Aside */}
      <div className="hidden md:block w-72 flex-shrink-0" />

      {/* ── Main Content Area ── */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {/* Header */}
        <header className="px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/50 backdrop-blur-xl border-b border-slate/5 sticky top-0 z-20">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif text-slate font-bold">Welcome back, {profile.name.split(" ")[0]}</h1>
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
            <button
              onClick={() => setActiveTab("profile")}
              aria-label="Profile Settings"
              className={cn(
                "w-12 h-12 relative rounded-2xl overflow-hidden border transition-all active:scale-95 shadow-sm flex-shrink-0",
                activeTab === "profile" ? "border-sunset ring-2 ring-sunset/20" : "border-slate/5 hover:border-slate/20"
              )}
            >
              <Image 
                src={profile.avatar} 
                alt="Profile" 
                fill 
                className="object-cover"
              />
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
                <TravelCrewHub kins={KINS} onChat={goToChat} />
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
                <MessagesView onVerify={() => setActiveTab("safety")} />
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

            {activeTab === "pulse" && (
              <motion.div
                key="pulse"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <CommunityFeed />
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileSettings />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Mobile Navigation ── */}
      <nav className="md:hidden sticky bottom-0 left-0 right-0 h-20 bg-white border-t border-slate/5 flex items-center justify-around px-2 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <MobileNavItem active={activeTab === "hub"} onClick={() => setActiveTab("hub")} icon={Users} label="Hub" />
        <MobileNavItem active={activeTab === "pulse"} onClick={() => setActiveTab("pulse")} icon={Zap} label="Pulse" />
        <MobileNavItem active={activeTab === "itinerary"} onClick={() => setActiveTab("itinerary")} icon={Calendar} label="Plan" />
        <MobileNavItem active={activeTab === "safety"} onClick={() => setActiveTab("safety")} icon={Shield} label="Safety" />
        <MobileNavItem active={activeTab === "messages"} onClick={() => { setOpenConvId(null); setActiveTab("messages"); }} icon={MessageSquare} label="Chat" badge={totalUnread} />
        <MobileNavItem active={activeTab === "memories"} onClick={() => setActiveTab("memories")} icon={Camera} label="Vault" />
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
