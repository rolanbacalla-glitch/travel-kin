"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MessageSquare,
  Heart,
  Share2,
  MapPin,
  Zap,
  Navigation,
  Clock,
  Sparkles,
  Camera,
  Send,
  X,
  Plus,
  Users,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeedItem {
  id: string;
  type: "ping" | "drop" | "intel";
  user: {
    name: string;
    image: string;
    vibe: string;
  };
  content: string;
  location: string;
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  image?: string;
  coordinates?: string;
  // GAFFL / TripBFF Cost-Splitting & Seat RSVP fields
  splitCost?: string;
  seatsFilled?: number;
  seatsTotal?: number;
  expiresIn?: string;
  joinedByMe?: boolean;
}

const SAMPLE_FEED: FeedItem[] = [
  {
    id: "1",
    type: "drop",
    user: {
      name: "Elena",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
      vibe: "Lagoon",
    },
    content:
      "Chartered a private outrigger for Sugba Lagoon & Kawhagan Sandbar at 07:30 AM tomorrow! Looking for 2 more verified Kins to split the boat & paddleboard fee.",
    location: "Del Carmen Pier, Siargao",
    timestamp: "14m ago",
    likes: 28,
    replies: 9,
    tags: ["BoatSplit", "SugbaLagoon", "PrivateBangka"],
    coordinates: "9.8691° N, 125.9682° E",
    splitCost: "£19 / person",
    seatsFilled: 4,
    seatsTotal: 6,
    expiresIn: "Expires in 2h 15m",
    joinedByMe: false,
  },
  {
    id: "2",
    type: "ping",
    user: {
      name: "Leo",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop",
      vibe: "Remote",
    },
    content:
      "Found the best Starlink co-working garden along Tourism Road in General Luna. 180 Mbps down, backup solar generator, and iced calamansi espresso is 10/10.",
    location: "General Luna, Siargao",
    timestamp: "32m ago",
    likes: 34,
    replies: 7,
    tags: ["Starlink", "RemoteWork", "Siargao"],
  },
  {
    id: "3",
    type: "drop",
    user: {
      name: "Suki",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=256&h=256&auto=format&fit=crop",
      vibe: "Surf",
    },
    content:
      "Sharing a private airport van from Sayak Airport (IAO) to General Luna at 04:30 PM today + sunset kinilaw dinner at Catangnan Bridge. 2 seats open!",
    location: "Sayak → Catangnan Bridge",
    timestamp: "48m ago",
    likes: 19,
    replies: 6,
    tags: ["VanShare", "SunsetKinilaw"],
    coordinates: "9.8054° N, 126.1512° E",
    splitCost: "£6 / person",
    seatsFilled: 3,
    seatsTotal: 5,
    expiresIn: "Expires in 1h 10m",
    joinedByMe: false,
  },
  {
    id: "4",
    type: "intel",
    user: {
      name: "Marco",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
      vibe: "Skipper",
    },
    content:
      "PRO TIP: Arrive at Magpupungko Rock Pools 45 minutes before dead low tide (01:15 PM today). Bring reef shoes and PHP 150 cash for the sanctuary entrance.",
    location: "Pilar, Siargao",
    timestamp: "1h ago",
    likes: 51,
    replies: 11,
    tags: ["TideIntel", "HiddenGem", "SafetyTip"],
  },
];

type FilterType = "All" | "Pings" | "Drops" | "Intel";

const FEED_STORAGE_KEY = "travelkin-community-feed-v2";

export function CommunityFeed() {
  const [items, setItems] = useState<FeedItem[]>(SAMPLE_FEED);
  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState<"ping" | "drop" | "intel">("drop");
  const [newPostContent, setNewPostContent] = useState("");
  const [newSplitCost, setNewSplitCost] = useState("£15 / person");
  const [newMaxSeats, setNewMaxSeats] = useState(4);
  const [filter, setFilter] = useState<FilterType>("All");
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(FEED_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const persistFeed = (updated: FeedItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const filteredItems = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => {
      if (filter === "Pings") return item.type === "ping";
      if (filter === "Drops") return item.type === "drop";
      if (filter === "Intel") return item.type === "intel";
      return true;
    });
  }, [items, filter]);

  const handleCastPulse = () => {
    if (!newPostContent.trim()) return;

    const newPost: FeedItem = {
      id: Date.now().toString(),
      type: postType,
      user: {
        name: "Mia",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&auto=format&fit=crop",
        vibe: "Explorer",
      },
      content: newPostContent,
      location: "General Luna, Siargao",
      timestamp: "Just now",
      likes: 1,
      replies: 0,
      tags: postType === "drop" ? ["CrewSplit", "LiveDrop"] : ["LivePulse"],
      ...(postType === "drop"
        ? {
            splitCost: newSplitCost || "£15 / person",
            seatsFilled: 1,
            seatsTotal: newMaxSeats || 4,
            expiresIn: "Expires in 3h 00m",
            joinedByMe: true,
          }
        : {}),
    };

    persistFeed([newPost, ...items]);
    setNewPostContent("");
    setIsPosting(false);
  };

  const handleToggleJoinDrop = (id: string) => {
    const updated = items.map((item) => {
      if (item.id !== id || item.type !== "drop") return item;
      const currentlyJoined = Boolean(item.joinedByMe);
      const filled = item.seatsFilled ?? 1;
      const total = item.seatsTotal ?? 6;
      if (!currentlyJoined && filled >= total) return item;
      return {
        ...item,
        joinedByMe: !currentlyJoined,
        seatsFilled: currentlyJoined ? Math.max(1, filled - 1) : filled + 1,
      };
    });
    persistFeed(updated);
  };

  const handleToggleLike = (id: string) => {
    const alreadyLiked = Boolean(likedIds[id]);
    setLikedIds((prev) => ({ ...prev, [id]: !alreadyLiked }));
    persistFeed(
      items.map((item) =>
        item.id === id
          ? { ...item, likes: alreadyLiked ? Math.max(0, item.likes - 1) : item.likes + 1 }
          : item
      )
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ping":
        return <Zap className="w-4 h-4" />;
      case "drop":
        return <MapPin className="w-4 h-4" />;
      case "intel":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ping":
        return "bg-ocean/10 text-ocean border-ocean/20";
      case "drop":
        return "bg-sunset/10 text-sunset border-sunset/20";
      case "intel":
        return "bg-purple-100 text-purple-600 border-purple-200";
      default:
        return "bg-slate/5 text-slate/40 border-slate/10";
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-24">
      {/* Header / Create Post Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-serif text-slate font-bold">Community Pulse</h2>
          <p className="text-slate/60 font-medium">
            Real-time signals, boat cost-splits, and local intel across Siargao &amp; Palawan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsPosting(true)}
          className="group flex items-center gap-3 px-8 py-4 bg-slate text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          Post Drop or Pulse
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate/5 rounded-[20px] w-fit border border-slate/5 shadow-inner">
        {(["All", "Pings", "Drops", "Intel"] as FilterType[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
              filter === tab ? "text-slate" : "text-slate/40 hover:text-slate/60"
            )}
          >
            {filter === tab && (
              <motion.div
                layoutId="active-filter"
                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate/5"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Feed List */}
      <LayoutGroup>
        <motion.div layout className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="group relative bg-white border border-slate/5 rounded-[48px] p-8 shadow-sm hover:shadow-2xl hover:shadow-slate/5 transition-all duration-500 overflow-hidden"
              >
                {/* Type Indicator */}
                <div
                  className={cn(
                    "absolute top-8 right-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                    getTypeColor(item.type)
                  )}
                >
                  {getTypeIcon(item.type)}
                  {item.type}
                </div>

                <div className="flex gap-6">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative group/avatar">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xl group-hover/avatar:scale-110 transition-transform duration-500">
                        <Image
                          src={item.user.image}
                          alt={item.user.name}
                          width={64}
                          height={64}
                          quality={100}
                          className="object-cover w-full h-full transform scale-110"
                        />
                      </div>

                      <div className="absolute -bottom-1 -right-1 px-3 py-1 bg-slate text-white rounded-full text-[8px] font-black uppercase tracking-tighter shadow-lg border-2 border-white z-10 group-hover:bg-ocean transition-colors">
                        {item.user.vibe}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-serif font-black text-slate">{item.user.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate/40 uppercase tracking-widest">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-sunset/60" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-ocean/60" />
                          {item.timestamp}
                        </div>
                        {item.expiresIn && (
                          <span className="text-sunset font-black">• {item.expiresIn}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-lg text-slate/80 leading-relaxed font-medium text-pretty">
                      {item.content}
                    </p>

                    {/* GAFFL / Stippl Cost-Splitting & Seat RSVP Card */}
                    {item.type === "drop" && (
                      <div className="p-5 bg-slate/5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sunset shadow-sm shrink-0">
                            <Navigation className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-ocean/10 text-ocean text-[10px] font-black uppercase tracking-widest">
                                {item.splitCost || "£15 / person"}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate/50 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {item.seatsFilled ?? 3}/{item.seatsTotal ?? 6} Seats Filled
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate">
                              {item.location} {item.coordinates ? `· ${item.coordinates}` : ""}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleJoinDrop(item.id)}
                          className={cn(
                            "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shrink-0",
                            item.joinedByMe
                              ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                              : "bg-slate text-white hover:bg-sunset shadow-md"
                          )}
                        >
                          {item.joinedByMe ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Seat Reserved
                            </>
                          ) : (
                            "Join & Split Cost"
                          )}
                        </button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-black uppercase tracking-wider text-ocean/60 bg-ocean/5 px-3 py-1 rounded-lg border border-ocean/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate/5 flex items-center gap-8">
                      <button
                        type="button"
                        onClick={() => handleToggleLike(item.id)}
                        className="flex items-center gap-2 text-slate/40 hover:text-sunset transition-colors group/btn"
                      >
                        <div className="p-2 rounded-xl group-hover/btn:bg-sunset/10 transition-all">
                          <Heart
                            className={cn(
                              "w-5 h-5 transition-transform",
                              likedIds[item.id]
                                ? "fill-sunset text-sunset scale-110"
                                : "group-hover/btn:fill-sunset"
                            )}
                          />
                        </div>
                        <span className="text-xs font-bold">{item.likes}</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-slate/40 hover:text-ocean transition-colors group/btn"
                      >
                        <div className="p-2 rounded-xl group-hover/btn:bg-ocean/10 transition-all">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold">{item.replies}</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-slate/40 hover:text-slate transition-colors ml-auto p-2 hover:bg-slate/5 rounded-xl"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isPosting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPosting(false)}
              className="absolute inset-0 bg-slate/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-serif font-bold text-slate">Share a Pulse</h3>
                  <button
                    type="button"
                    onClick={() => setIsPosting(false)}
                    className="p-2 hover:bg-slate/5 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate/40" />
                  </button>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate/5 rounded-[20px] shadow-inner border border-slate/5">
                  {(["ping", "drop", "intel"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPostType(type)}
                      className={cn(
                        "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative",
                        postType === type ? "text-slate" : "text-slate/40 hover:text-slate/60"
                      )}
                    >
                      {postType === type && (
                        <motion.div
                          layoutId="post-type-active"
                          className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate/5"
                        />
                      )}
                      <span className="relative z-10">{type}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate/40 ml-1">
                      What&rsquo;s the plan?
                    </label>
                    <textarea
                      autoFocus
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder={
                        postType === "drop"
                          ? "e.g. Chartering a bangka boat to Daku & Guyam Islands at 9am—who wants to split?"
                          : "Share live island intel or a hangout signal..."
                      }
                      className="w-full h-28 px-6 py-5 bg-slate/5 rounded-3xl border border-transparent focus:border-ocean/20 focus:bg-white transition-all outline-none text-slate font-medium resize-none text-base placeholder:text-slate/30"
                    />
                  </div>

                  {postType === "drop" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate/40 ml-1">
                          Split Cost Estimate
                        </label>
                        <input
                          value={newSplitCost}
                          onChange={(e) => setNewSplitCost(e.target.value)}
                          placeholder="£15 / person"
                          className="w-full px-4 py-3 bg-slate/5 rounded-2xl text-xs font-bold text-slate outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate/40 ml-1">
                          Max Crew Seats
                        </label>
                        <input
                          type="number"
                          min={2}
                          max={12}
                          value={newMaxSeats}
                          onChange={(e) => setNewMaxSeats(Number(e.target.value) || 4)}
                          className="w-full px-4 py-3 bg-slate/5 rounded-2xl text-xs font-bold text-slate outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate/60 border border-transparent hover:border-slate/10 transition-all"
                    >
                      <Camera className="w-4 h-4 text-ocean" />
                      Add Snap
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate/60 border border-transparent hover:border-slate/10 transition-all"
                    >
                      <MapPin className="w-4 h-4 text-sunset" />
                      General Luna
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleCastPulse}
                    disabled={!newPostContent.trim()}
                    className={cn(
                      "w-full py-5 bg-slate text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4",
                      newPostContent.trim()
                        ? "hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Send className="w-5 h-5 fill-white" />
                    Cast Pulse
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
