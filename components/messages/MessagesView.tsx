"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, MoreVertical, Phone, MapPin, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
  read?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  location: string;
  status: "online" | "away" | "offline";
  image: string;
  vibe: string;
  unread: number;
  lastMessage: string;
  lastTime: string;
  messages: Message[];
}

/* ─── Mock Data ─────────────────────────────────────────────────────────── */

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Suki",
    location: "Chiang Mai",
    status: "online",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    vibe: "Introvert · Foodie",
    unread: 2,
    lastMessage: "There's an amazing ramen spot near the moat 🍜",
    lastTime: "2m ago",
    messages: [
      { id: "m1", fromMe: false, text: "Hey! Saw your profile — you're into food too?", time: "10:12 AM", read: true },
      { id: "m2", fromMe: true,  text: "Yes! Been hunting for the best khao soi in Chiang Mai 😄", time: "10:14 AM", read: true },
      { id: "m3", fromMe: false, text: "Oh I know ALL the spots 🙌 Are you free tomorrow morning?", time: "10:15 AM", read: true },
      { id: "m4", fromMe: true,  text: "Totally! What time works for you?", time: "10:18 AM", read: true },
      { id: "m5", fromMe: false, text: "9am? There's an amazing ramen spot near the moat 🍜", time: "10:20 AM", read: false },
      { id: "m6", fromMe: false, text: "It opens early and gets packed fast!", time: "10:20 AM", read: false },
    ],
  },
  {
    id: "2",
    name: "Liam",
    location: "Bangkok",
    status: "away",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    vibe: "Night Owl · Action",
    unread: 1,
    lastMessage: "Muay Thai class was insane btw 🥊",
    lastTime: "1h ago",
    messages: [
      { id: "m1", fromMe: true,  text: "Hey Liam! Any night market recs in Bangkok?", time: "Yesterday", read: true },
      { id: "m2", fromMe: false, text: "Rod Fai is the move. Way cooler than the tourist ones", time: "Yesterday", read: true },
      { id: "m3", fromMe: true,  text: "Sold. Going tonight!", time: "Yesterday", read: true },
      { id: "m4", fromMe: false, text: "Muay Thai class was insane btw 🥊", time: "1h ago", read: false },
    ],
  },
  {
    id: "3",
    name: "Nara",
    location: "Phuket",
    status: "online",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop",
    vibe: "Early Bird · Zen",
    unread: 0,
    lastMessage: "The sunrise session was so peaceful ✨",
    lastTime: "3h ago",
    messages: [
      { id: "m1", fromMe: false, text: "Morning! Joining the 6am beach meditation tomorrow?", time: "7:00 AM", read: true },
      { id: "m2", fromMe: true,  text: "I'll try! I'm usually terrible before coffee lol", time: "7:05 AM", read: true },
      { id: "m3", fromMe: false, text: "Ha! They provide herbal tea — it's a vibe 🌿", time: "7:06 AM", read: true },
      { id: "m4", fromMe: true,  text: "Alright you've convinced me 😊", time: "7:10 AM", read: true },
      { id: "m5", fromMe: false, text: "The sunrise session was so peaceful ✨", time: "3h ago", read: true },
    ],
  },
  {
    id: "4",
    name: "Kevin",
    location: "Bali",
    status: "offline",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    vibe: "Remote Pro · Surf",
    unread: 0,
    lastMessage: "Canggu co-working scene is 🔥 highly recommend",
    lastTime: "2d ago",
    messages: [
      { id: "m1", fromMe: true,  text: "Kevin! Any good remote work spots in Canggu?", time: "2d ago", read: true },
      { id: "m2", fromMe: false, text: "Dojo is the classic, but try Outpost too — better vibes", time: "2d ago", read: true },
      { id: "m3", fromMe: false, text: "Canggu co-working scene is 🔥 highly recommend", time: "2d ago", read: true },
    ],
  },
];

/* ─── Status dot ────────────────────────────────────────────────────────── */

const statusColor: Record<string, string> = {
  online:  "bg-green-500",
  away:    "bg-amber-400",
  offline: "bg-slate/20",
};

/* ─── Typing indicator ──────────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-slate/10 flex-shrink-0" />
      <div className="flex items-center gap-1 px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm border border-slate/5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-slate/30"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Message bubble ────────────────────────────────────────────────────── */

function MessageBubble({ msg, showAvatar, convImage }: { msg: Message; showAvatar: boolean; convImage: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("flex items-end gap-2", msg.fromMe ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar — only for their messages, only on last in a group */}
      <div className="w-7 h-7 flex-shrink-0">
        {!msg.fromMe && showAvatar && (
          <div className="w-7 h-7 rounded-full overflow-hidden relative shadow-sm">
            <Image src={convImage} alt="kin" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className={cn("flex flex-col gap-1", msg.fromMe ? "items-end" : "items-start")}>
        <div className={cn(
          "max-w-[280px] px-4 py-3 text-sm leading-relaxed shadow-sm",
          msg.fromMe
            ? "bg-slate text-white rounded-2xl rounded-br-sm"
            : "bg-white text-slate rounded-2xl rounded-bl-sm border border-slate/5"
        )}>
          {msg.text}
        </div>
        <span className="text-[10px] text-slate/30 font-medium px-1">{msg.time}</span>
      </div>
    </motion.div>
  );
}

/* ─── Chat thread ────────────────────────────────────────────────────────── */

function ChatThread({ conv, onBack }: { conv: Conversation; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(conv.messages);
  const [input, setInput]       = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Personality-driven AI response generator
  const generateAIReply = (userText: string, kinName: string, kinVibe: string): string => {
    const text = userText.toLowerCase();
    const isFoodie = kinVibe.toLowerCase().includes("foodie");
    const isZen = kinVibe.toLowerCase().includes("zen");
    const isNightOwl = kinVibe.toLowerCase().includes("night owl");
    const isRemote = kinVibe.toLowerCase().includes("remote");

    // 1. Keyword-based matching
    if (text.includes("hello") || text.includes("hi ") || text.length < 3) {
      return `Hey! Good to hear from you. How's your day in ${conv.location} going?`;
    }
    if (text.includes("food") || text.includes("eat") || text.includes("restaurant") || text.includes("hungry")) {
      if (isFoodie) return "Oh, I was just looking at a new spot! Have you tried the street food market yet? The flavors are incredible.";
      return "I'm not the biggest foodie, but I heard there's a decent place nearby. Want me to check it out?";
    }
    if (text.includes("work") || text.includes("laptop") || text.includes("wifi") || text.includes("co-working")) {
      if (isRemote) return "The wifi here is solid. I usually post up at a cafe around 10am. You should join!";
      return "I usually try to stay offline while traveling, but I did see a place with good seating earlier.";
    }
    if (text.includes("tonight") || text.includes("party") || text.includes("drink")) {
      if (isNightOwl) return "Tonight is going to be wild! There's a rooftop session starting at 9. You in?";
      return "Not sure about a party, but a quiet drink by the water sounds nice.";
    }
    if (text.includes("morning") || text.includes("sunrise") || text.includes("yoga")) {
      if (isZen) return "The morning energy here is so special. I'm doing a session at 6am if you can handle the early start! ✨";
      return "Morning? I'm usually still asleep lol, but sunrise is beautiful if you can make it.";
    }
    if (text.includes("where") || text.includes("located") || text.includes("area")) {
      return `I'm currently around the ${conv.location} area. It's a bit busy but has great energy. Where are you?`;
    }

    // 2. Personality-based fallbacks
    const fallbacks: Record<string, string[]> = {
      default: ["That's interesting! Tell me more about that.", "I was thinking something similar actually.", "Nice! Let's definitely try to coordinate that.", "Totally agree. By the way, have you seen the view from the center yet?"],
      "Suki": ["I'm so down for whatever as long as there's good coffee involved ☕️", "Chiang Mai is just so peaceful, don't you think?", "Wait, did you see the weather forecast? Looks perfect for a walk."],
      "Liam": ["Bangkok is a maze but honestly, that's the best part.", "Let's grab a bike and just explore the backstreets later!", "I'm always up for an adventure. Just say the word."],
      "Nara": ["Phuket has some hidden spots most people miss. We should find them.", "Gentle reminder to take a deep breath! This place is magic.", "I'm feeling very recharged today. Ready for anything."],
      "Kevin": ["Bali life is treating me well. Hope you're enjoying it too!", "Found a secret beach yesterday. Might head back there if the swell is good 🌊", "Gotta finish some emails first, then I'm free. Speak soon?"]
    };

    const kinReplies = fallbacks[kinName] || fallbacks.default;
    return kinReplies[Math.floor(Math.random() * kinReplies.length)];
  };

  // True AI API Caller
  const callAIChatAPI = async (userText: string, history: Message[]) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userText, 
          kinName: conv.name, 
          kinVibe: conv.vibe,
          location: conv.location,
          history: history.slice(-5) // Send last 5 for context
        }),
      });

      if (!res.ok) throw new Error("API Offline");
      const data = await res.json();
      return data.text;
    } catch (err) {
      console.warn("Falling back to local brain...");
      return generateAIReply(userText, conv.name, conv.vibe);
    }
  };

  // Simulate a reply after sending
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const newMsg: Message = {
      id:     `msg-${Date.now()}`,
      fromMe: true,
      text,
      time:   new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      read:   false,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Change: Start typing immediately and wait for API + minimum time for "human" feel
    setIsTyping(true);
    
    // Start the API call and a timer in parallel
    const [replyText] = await Promise.all([
      callAIChatAPI(text, messages),
      new Promise(r => setTimeout(r, 2000)) // Minimum 2s typing time
    ]);

    setIsTyping(false);
    const reply: Message = {
      id:     `msg-${Date.now()}-r`,
      fromMe: false,
      text:   replyText,
      time:   new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      read:   false,
    };
    setMessages((prev) => [...prev, reply]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="relative flex items-center gap-4 p-5 border-b border-slate/5 bg-white/60 backdrop-blur-xl flex-shrink-0">
        {/* Connection status indicator */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-50 text-[8px] font-black uppercase tracking-widest text-green-600 rounded-full border border-green-100 flex items-center gap-1 shadow-sm opacity-60">
           <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
           AI Brain Active
        </div>
        <button
          onClick={onBack}
          className="md:hidden p-2 rounded-xl hover:bg-slate/5 transition-colors text-slate/50"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden relative shadow-md">
            <Image src={conv.image} alt={conv.name} fill className="object-cover" />
          </div>
          <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white", statusColor[conv.status])} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate leading-none">{conv.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin className="w-3 h-3 text-slate/30" />
            <span className="text-xs text-slate/40 font-medium truncate">{conv.location}</span>
            {conv.status === "online" && (
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">· Online</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-2.5 rounded-xl hover:bg-slate/5 transition-colors text-slate/40 hover:text-ocean" aria-label="Voice call">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-slate/5 transition-colors text-slate/40 hover:text-slate" aria-label="More options">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vibe tag */}
      <div className="px-5 py-2 flex-shrink-0 bg-white/30 border-b border-slate/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate/30">{conv.vibe}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3 bg-[#F9F8F6]/80">
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1 || messages[i + 1]?.fromMe !== msg.fromMe;
          return (
            <MessageBubble key={msg.id} msg={msg} showAvatar={isLast} convImage={conv.image} />
          );
        })}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate/5 bg-white/60 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-slate/30 hover:text-sunset transition-colors" aria-label="Emoji">
            <Smile className="w-5 h-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={`Message ${conv.name}...`}
            className="flex-1 px-4 py-3 bg-slate/5 rounded-2xl text-sm text-slate placeholder:text-slate/30
                       focus:outline-none focus:ring-2 focus:ring-ocean/20 focus:bg-white transition-all"
            aria-label="Type a message"
          />
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim()}
            className={cn(
              "p-3 rounded-2xl transition-all shadow-md",
              input.trim()
                ? "bg-slate text-white shadow-slate/20 hover:bg-ocean"
                : "bg-slate/10 text-slate/20 cursor-not-allowed shadow-none"
            )}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ─── Conversation list item ────────────────────────────────────────────── */

function ConvItem({ conv, active, onClick }: { conv: Conversation; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 2 }}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all",
        active ? "bg-slate text-white shadow-xl shadow-slate/20" : "hover:bg-white hover:shadow-sm"
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden relative shadow-md">
          <Image src={conv.image} alt={conv.name} fill className="object-cover" />
        </div>
        <div className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2",
          active ? "border-slate" : "border-white",
          statusColor[conv.status]
        )} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn("font-bold text-sm truncate", active ? "text-white" : "text-slate")}>
            {conv.name}
          </span>
          <span className={cn("text-[10px] flex-shrink-0", active ? "text-white/50" : "text-slate/30")}>
            {conv.lastTime}
          </span>
        </div>
        <p className={cn("text-xs truncate mt-0.5", active ? "text-white/60" : "text-slate/50")}>
          {conv.lastMessage}
        </p>
      </div>

      {/* Unread badge */}
      {conv.unread > 0 && !active && (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sunset text-white text-[10px] font-black flex items-center justify-center">
          {conv.unread}
        </span>
      )}
    </motion.button>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────────── */

interface MessagesViewProps {
  /** Optionally open a specific conversation by kin id (from Kin card "Chat" button) */
  openConvId?: string | null;
}

export default function MessagesView({ openConvId }: MessagesViewProps) {
  const [conversations] = useState<Conversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(openConvId ?? null);
  const activeConv = conversations.find((c) => c.id === activeId) ?? null;

  // When openConvId prop changes (e.g. clicking Chat from the Hub), open that conversation
  useEffect(() => {
    if (openConvId) setActiveId(openConvId);
  }, [openConvId]);

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-[2.5rem] border border-slate/10 shadow-2xl overflow-hidden">

      {/* ── Left: Conversation List ── */}
      <div className={cn(
        "flex flex-col border-r border-slate/5 bg-[#F9F8F6]/60",
        // Mobile: full width when no conv selected, hidden when a conv is open
        // Desktop: always shown at fixed width
        "w-full md:w-80 md:flex-shrink-0",
        activeConv ? "hidden md:flex flex-col" : "flex flex-col"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-slate/5">
          <h2 className="text-xl font-bold text-slate uppercase tracking-tight">Messages</h2>
          <p className="text-xs text-slate/40 mt-1 font-medium">
            {conversations.reduce((n, c) => n + c.unread, 0)} unread
          </p>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-slate/5 shadow-sm">
            <svg className="w-3.5 h-3.5 text-slate/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              placeholder="Search conversations..."
              className="flex-1 bg-transparent text-xs text-slate placeholder:text-slate/30 focus:outline-none"
              aria-label="Search conversations"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {conversations.map((conv) => (
            <ConvItem
              key={conv.id}
              conv={conv}
              active={activeId === conv.id}
              onClick={() => setActiveId(conv.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Chat Thread or Empty State ── */}
      <div className={cn(
        "flex-1 flex flex-col",
        // Mobile: show only if a conv is selected
        activeConv ? "flex" : "hidden md:flex"
      )}>
        <AnimatePresence mode="wait">
          {activeConv ? (
            <motion.div
              key={activeConv.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col h-full"
            >
              <ChatThread conv={activeConv} onBack={() => setActiveId(null)} />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-5"
            >
              <div className="w-20 h-20 bg-slate/5 rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-slate/20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-slate">Pick a conversation</h3>
                <p className="text-sm text-slate/50 max-w-xs">
                  Select a kin from the list, or click <strong>Chat</strong> on a profile to start planning your next adventure.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
