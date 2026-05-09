"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  MapPin, 
  Smile, 
  ShieldCheck, 
  Lock, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  History,
  Navigation
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMessagesStore, TrustStatus, Message } from "@/lib/stores/useMessages";
import { KINS, Kin } from "@/lib/data/kins";

// Dynamic Import for Leaflet to fix SSR
const RadarMiniMap = dynamic(() => import("./RadarMiniMap"), { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate/5 animate-pulse flex items-center justify-center text-slate/50 font-black uppercase tracking-widest italic">Syncing Radar...</div>
});

/* ─── Types & Mock Data (Extended) ─────────────────────────────────────────── */

// Types moved to @/lib/data/kins and @/lib/stores/useMessages

// Seed data logic added to MessagesView component

/* ─── Handshake Card ───────────────────────────────────────────────────────── */

function HandshakeCard({ kinName, status, onAccept, onDecline }: { 
    kinName: string; 
    status: 'pending' | 'accepted' | 'declined'; 
    onAccept: () => void;
    onDecline: () => void;
}) {
  return (
    <div className="w-full max-w-sm bg-white rounded-3xl border border-slate/5 shadow-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
            <div className={cn(
                "p-3 rounded-2xl",
                status === 'pending' ? "bg-ocean/5 text-ocean" : (status === 'accepted' ? "bg-green-50 text-green-500" : "bg-slate/5 text-slate/30")
            )}>
                <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-sm font-black text-slate uppercase tracking-widest">Kin Protocol</h4>
                <p className="text-[10px] text-slate/60 font-bold uppercase tracking-tighter italic">Location Verification</p>
            </div>
        </div>

        <p className="text-xs text-slate/60 leading-relaxed font-serif italic">
            {status === 'pending' 
                ? `${kinName} is requesting a Trust Handshake. Accept to share precise coordinates for 2 hours.` 
                : (status === 'accepted' ? "Trust Handshake Active. Precise pins unlocked." : "Handshake Expired.")}
        </p>

        {status === 'pending' && (
            <div className="flex items-center gap-2 pt-2">
                <button 
                  onClick={onAccept}
                  className="flex-1 py-3 bg-ocean text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-ocean/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  aria-label={`Accept trust handshake with ${kinName}`}
                >
                    Accept (2h Share)
                </button>
                <button 
                  onClick={onDecline}
                  className="px-4 py-3 bg-slate/5 text-slate/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate/10 transition-all text-center cursor-pointer"
                  aria-label="Decline trust handshake"
                >
                    X
                </button>
            </div>
        )}
    </div>
  );
}

/* ─── Main Chat Thread Container ───────────────────────────────────────────── */

function ChatThread({ conv, onBack }: { conv: Kin; onBack: () => void }) {
  const store = useMessagesStore();
  const session = store.sessions[conv.id] || {
    trustStatus: 'BLURRED',
    handshakeExpiry: null,
    isSOSActive: false,
    proximityLevel: 1,
    proximityLevel: 1,
    messages: [],
  };

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages]);

  // Handshake Handlers
  const handleRequestHandshake = () => {
    store.addMessage(conv.id, {
        fromMe: true,
        text: "Requested Trust Handshake",
        type: 'handshake_request',
        handshakeStatus: 'pending'
    });
  };

  const handleAcceptHandshake = (msgId: string) => {
    // In a real app, update the specific message
    store.updateTrustStatus(conv.id, 'PRECISE', 2);
    store.addMessage(conv.id, {
        fromMe: true,
        text: "Trust Handshake Accepted. Pins are live.",
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userText = input.trim();
    store.addMessage(conv.id, { fromMe: true, text: userText });
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userText,
          kinName: conv.name,
          kinVibe: conv.vibe,
          location: conv.location,
          history: session.messages
        })
      });

      if (!response.ok) throw new Error("Connection failed");
      const data = await response.json();
      
      if (data.text) {
        store.addMessage(conv.id, { fromMe: false, text: data.text });
      } else {
        throw new Error("No response from AI");
      }
    } catch (err) {
      console.error("Chat Error:", err);
      store.addMessage(conv.id, { 
        fromMe: false, 
        text: "I'm having a slight problem connecting to the Ring network. Give me a second!" 
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9F8F6]">
      
      {/* ── TOP: Integrated Map (The Command Center Split) ── */}
      <div className="h-[35%] w-full relative overflow-hidden flex-shrink-0">
          <RadarMiniMap 
            kinLat={conv.lat} 
            kinLng={conv.lng} 
            trustStatus={session.trustStatus} 
            isSOSActive={session.isSOSActive} 
          />
          
          {/* Overlay Info Layer */}
          <div className="absolute top-6 left-6 right-6 z-[600] pointer-events-none">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl pointer-events-auto">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm">
                        <Image src={conv.image} alt="kin" fill className="object-cover" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-slate uppercase tracking-widest">{conv.name}</h4>
                        <div className="flex items-center gap-1">
                            <Lock className={cn("w-2.5 h-2.5", session.trustStatus === 'BLURRED' ? "text-slate/30" : "text-green-500")} />
                            <span className="text-[8px] font-bold text-slate/60 uppercase">
                                {session.trustStatus === 'BLURRED' ? 'Blurred Privacy' : 'Full Precision'}
                            </span>
                        </div>
                    </div>
                  </div>

                  {session.trustStatus === 'BLURRED' && (
                    <button 
                        onClick={handleRequestHandshake}
                        className="p-3 bg-ocean text-white rounded-2xl shadow-xl shadow-ocean/20 pointer-events-auto active:scale-95 transition-all flex items-center gap-2"
                        title="Kin Handshake"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">Verify Pins</span>
                    </button>
                  )}
              </div>
          </div>
      </div>

      {/* ── MIDDLE: The Safe-Share Control Bar ── */}
      <div className="sticky top-0 z-50 p-4 border-b border-slate/5 bg-white/60 backdrop-blur-3xl flex-shrink-0 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate/60" title="Proximity Distance">
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">~800m Away</span>
              </div>
              <div className={cn(
                  "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-sm transition-all flex items-center gap-1.5",
                  conv.verified ? "bg-green-50 text-green-600 border-green-100" : "bg-slate/5 text-slate/60 border-slate/5"
              )}>
                  <div className={cn("w-1 h-1 rounded-full", conv.verified ? "bg-green-500 animate-pulse" : "bg-slate/20")} />
                  {conv.verified ? "Verified Identity" : "Basic Hub Access"}
              </div>
          </div>

          <div className="flex items-center gap-3">
              <button 
                onClick={() => store.archiveChat(conv.id, conv.name, conv.location, conv.vibe)}
                className="flex items-center gap-2 text-slate/50 hover:text-ocean transition-all cursor-pointer"
                title="Archive to Memories"
                aria-label={`Archive chat with ${conv.name}`}
              >
                 <History className="w-4 h-4" />
                 <span className="text-[8px] font-black uppercase tracking-widest hidden md:block">Archive</span>
              </button>
              <div className="w-px h-4 bg-slate/10" />
              <button 
                className="text-red-500/40 hover:text-red-600 transition-all cursor-pointer"
                title="Report or SOS"
                aria-label="Trigger Emergency SOS or Report User"
              >
                 <AlertTriangle className="w-4 h-4" />
              </button>
          </div>
      </div>

      {/* ── BOTTOM: The Thread ── */}
      <div className="flex-1 overflow-y-auto px-5 py-8 space-y-6 flex flex-col items-center">
            
            {/* System Info Bubble */}
            <div className="px-6 py-2 bg-slate/5 rounded-full text-[9px] font-black text-slate/60 uppercase tracking-[0.2em] mb-4">
                Session Active · End-to-End Secure
            </div>

            {session.messages.map((msg: Message, i: number) => (
                <div key={msg.id} className={cn("w-full flex", msg.fromMe ? "justify-end" : "justify-start")}>
                    {msg.type === 'handshake_request' ? (
                        <HandshakeCard 
                           kinName={conv.name}
                           status={msg.handshakeStatus || 'pending'}
                           onAccept={() => handleAcceptHandshake(msg.id)}
                           onDecline={() => {}} 
                        />
                    ) : (
                        <div className={cn(
                            "max-w-[85%] px-6 py-4 text-sm leading-relaxed",
                            msg.fromMe
                                ? "bg-slate text-white rounded-3xl rounded-br-sm shadow-xl shadow-slate/10"
                                : "bg-white text-slate rounded-3xl rounded-bl-sm border border-slate/5 shadow-sm"
                        )}>
                            {msg.text}
                            <div className={cn("text-[9px] mt-1 font-bold opacity-60 uppercase tracking-[0.1em]", msg.fromMe ? "text-right" : "text-left")}>
                                {msg.time}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {isTyping && (
                <div className="w-full flex justify-start">
                    <div className="bg-white px-6 py-4 rounded-3xl rounded-bl-sm border border-slate/5 shadow-sm flex items-center gap-1.5">
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-1.5 h-1.5 bg-slate/40 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate/40 rounded-full" />
                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate/40 rounded-full" />
                    </div>
                </div>
            )}
            <div ref={bottomRef} className="h-4" />
      </div>

      {/* ── INPUT AREA ── */}
      <div className="p-6 pb-10 bg-white/80 backdrop-blur-3xl border-t border-slate/5">
            <div className="flex items-center gap-3">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Coordinate with ${conv.name}...`}
                    className="flex-1 h-14 px-6 bg-[#F9F8F6] border border-slate/5 rounded-2xl text-sm text-slate placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-ocean/20 transition-all font-medium"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-14 h-14 bg-slate text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 cursor-pointer"
                    title="Send message"
                    aria-label="Send message"
                >
                    <Send className="w-5 h-5 mx-auto" />
                </button>
            </div>
      </div>
    </div>
  );
}

/* ── Main Export (Conversations Navigator) ─────────────────────────────────── */

export default function MessagesView({ onVerify }: { onVerify?: () => void }) {
  const store = useMessagesStore();
  
  // Seed the store with initial messages if it's completely empty
  useEffect(() => {
    if (Object.keys(store.sessions).length === 0) {
      // Initial messages for Suki
      store.addMessage("1", { fromMe: false, text: "Hey! Saw your profile — you're into food too?" });
      store.addMessage("1", { fromMe: true,  text: "Yes! Been hunting for the best khao soi in Chiang Mai 😄" });
      store.addMessage("1", { fromMe: false, text: "There's an amazing ramen spot near the moat 🍜" });
      
      // Initial messages for Liam
      store.addMessage("2", { fromMe: true,  text: "Hey Liam! Any night market recs in Bangkok?" });
      store.addMessage("2", { fromMe: false, text: "Rod Fai is the move. Way cooler than the tourist ones" });
    }
  }, [store]);

  const activeConv = KINS.find(c => c.id === store.activeId) || null;

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-[3rem] border border-slate/10 shadow-2xl overflow-hidden">
      
      {/* List (Sidebar) */}
      <div className={cn(
        "w-full md:w-96 border-r border-slate/5 flex flex-col bg-[#F9F8F6]/40",
        activeConv ? "hidden md:flex" : "flex"
      )}>
          <div className="p-8 border-b border-slate/5">
              <h2 className="text-3xl font-serif font-black text-slate">Ring</h2>
              <p className="text-[10px] font-black text-slate/60 uppercase tracking-[0.2em] mt-1 mb-8">Active Conversations</p>
              
              {/* Search */}
              <div className="relative group">
                  <input 
                    placeholder="Find Kin..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate/5 rounded-[20px] text-xs font-bold text-slate shadow-sm focus:shadow-xl transition-all"
                  />
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean" />
              </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
              {KINS.map(c => {
                  const session = store.sessions[c.id];
                  const lastMsg = session?.messages[session.messages.length - 1];
                  
                  return (
                      <button 
                        key={c.id} 
                        onClick={() => store.setActiveId(c.id)}
                        className={cn(
                            "w-full p-6 text-left rounded-[35px] transition-all flex items-center gap-5 cursor-pointer",
                            store.activeId === c.id ? "bg-slate text-white shadow-2xl shadow-slate/30" : "hover:bg-white"
                        )}
                      >
                          <div className="relative w-14 h-14 rounded-[22px] overflow-hidden shadow-md flex-shrink-0">
                              <Image src={c.image} alt={c.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                  <h4 className="font-bold text-base leading-none">{c.name}</h4>
                                  {lastMsg && (
                                      <span className={cn("text-[8px] font-bold opacity-40 uppercase tracking-widest", store.activeId === c.id ? "text-white" : "text-slate")}>
                                          {lastMsg.time}
                                      </span>
                                  )}
                              </div>
                              <p className={cn("text-[10px] uppercase font-black tracking-widest mt-2", store.activeId === c.id ? "text-white/40" : "text-slate/60")}>
                                 {c.location} · {c.vibe.split(',')[0]}
                              </p>
                              {lastMsg && (
                                  <p className={cn("text-[11px] font-medium mt-2 truncate opacity-80", store.activeId === c.id ? "text-white" : "text-slate")}>
                                      {lastMsg.text}
                                  </p>
                              )}
                          </div>
                      </button>
                  );
              })}
          </div>

          {/* Verification Callout */}
          <div className="p-8 border-t border-slate/5">
                <button
                  onClick={onVerify}
                  className="w-full text-left group p-6 bg-ocean text-white rounded-[30px] shadow-xl shadow-ocean/10 relative overflow-hidden hover:bg-ocean/90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                    <div className="relative z-10 space-y-3">
                        <Lock className="w-5 h-5 opacity-40" />
                        <h5 className="text-xs font-black uppercase tracking-widest">Kin Protocol</h5>
                        <p className="text-[10px] leading-relaxed opacity-60">Complete your ID check to unlock precise proximity pins.</p>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-white/80">Verify Now →</p>
                    </div>
                </button>
          </div>
      </div>

      {/* Chat Thread (Main Content) */}
      <div className="flex-1 flex flex-col">
          {activeConv ? (
              <ChatThread conv={activeConv} onBack={() => store.setActiveId(null)} />
          ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-[#F9F8F6]/20">
                  <div className="w-24 h-24 bg-white border border-slate/5 rounded-[40px] shadow-xl flex items-center justify-center mb-8">
                     <Lock className="w-8 h-8 text-slate/20" />
                  </div>
                  <h3 className="text-3xl font-serif font-black text-slate">Secure Line</h3>
                  <p className="text-xs text-slate/60 max-w-sm mt-4 font-medium italic leading-relaxed">
                      Select a Kin to start coordinating. Every conversation in the Ring is end-to-end shielded by the Traveler Protocol.
                  </p>
              </div>
          )}
      </div>

    </div>
  );
}
