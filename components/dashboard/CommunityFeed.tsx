"use client";

import React, { useState, useMemo } from "react";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MapPin, 
  Zap, 
  Map as MapIcon, 
  Navigation, 
  Clock, 
  Sparkles,
  Camera,
  Utensils,
  Music,
  Send,
  X,
  Plus
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeedItem {
    id: string;
    type: 'ping' | 'drop' | 'intel';
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
}

const SAMPLE_FEED: FeedItem[] = [
    {
        id: '1',
        type: 'ping',
        user: { name: 'Leo', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop', vibe: 'Zen' },
        content: 'Just found the most incredible coworking spot in the Old City. High ceilings, actual quiet zones, and the matcha is 10/10.',
        location: 'Old City, Chiang Mai',
        timestamp: '12m ago',
        likes: 24,
        replies: 5,
        tags: ['RemoteWork', 'Matcha']
    },
    {
        id: '2',
        type: 'drop',
        user: { name: 'Elena', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop', vibe: 'Active' },
        content: 'Sunset hike to Wat Pha Lat starting in 30 mins! Meeting at the trailhead. Who is in?',
        location: 'Monk\'s Trail Trailhead',
        timestamp: '25m ago',
        likes: 18,
        replies: 12,
        tags: ['Hiking', 'Sunset'],
        coordinates: '18.7925, 98.9416'
    },
    {
        id: '3',
        type: 'intel',
        user: { name: 'Marco', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop', vibe: 'Foodie' },
        content: 'PRO TIP: The night market at the North Gate has the best Khao Kha Moo (braised pork leg) in the city. Look for the lady in the cowboy hat. 🤠',
        location: 'Chang Phueak Gate',
        timestamp: '1h ago',
        likes: 45,
        replies: 8,
        tags: ['StreetFood', 'HiddenGem']
    }
];

type FilterType = 'All' | 'Pings' | 'Drops' | 'Intel';

export function CommunityFeed() {
    const [items, setItems] = useState<FeedItem[]>(SAMPLE_FEED);
    const [isPosting, setIsPosting] = useState(false);
    const [postType, setPostType] = useState<'ping' | 'drop' | 'intel'>('ping');
    const [newPostContent, setNewPostContent] = useState("");
    const [filter, setFilter] = useState<FilterType>('All');

    const filteredItems = useMemo(() => {
        if (filter === 'All') return items;
        return items.filter(item => {
            if (filter === 'Pings') return item.type === 'ping';
            if (filter === 'Drops') return item.type === 'drop';
            if (filter === 'Intel') return item.type === 'intel';
            return true;
        });
    }, [items, filter]);

    const handleCastPulse = () => {
        if (!newPostContent.trim()) return;

        const newPost: FeedItem = {
            id: Date.now().toString(),
            type: postType,
            user: {
                name: 'Mia', // Current user
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop',
                vibe: 'Explorer'
            },
            content: newPostContent,
            location: 'Near You',
            timestamp: 'Just now',
            likes: 0,
            replies: 0,
            tags: ['Live']
        };

        setItems([newPost, ...items]);
        setNewPostContent("");
        setIsPosting(false);
    };

    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'ping': return <Zap className="w-4 h-4" />;
            case 'drop': return <MapPin className="w-4 h-4" />;
            case 'intel': return <Sparkles className="w-4 h-4" />;
            default: return <MessageSquare className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'ping': return 'bg-ocean/10 text-ocean border-ocean/20';
            case 'drop': return 'bg-sunset/10 text-sunset border-sunset/20';
            case 'intel': return 'bg-purple-100 text-purple-600 border-purple-200';
            default: return 'bg-slate/5 text-slate/40 border-slate/10';
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-12 pb-24">
            {/* Header / Create Post Trigger */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h2 className="text-4xl font-serif text-slate font-bold">Community Pulse</h2>
                    <p className="text-slate/60 font-medium">Real-time signals from explorers in Chiang Mai.</p>
                </div>
                <button 
                    onClick={() => setIsPosting(true)}
                    className="group flex items-center gap-3 px-8 py-4 bg-slate text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    Share a Pulse
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-slate/5 rounded-[20px] w-fit border border-slate/5 shadow-inner">
                {(['All', 'Pings', 'Drops', 'Intel'] as FilterType[]).map((tab) => (
                    <button 
                        key={tab}
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
                                <div className={cn(
                                    "absolute top-8 right-8 flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                                    getTypeColor(item.type)
                                )}>
                                    {getTypeIcon(item.type)}
                                    {item.type}
                                </div>

                                <div className="flex gap-6">
                                    {/* User Avatar - Redesigned for better framing */}
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

                                            {/* Integrated Vibe Badge */}
                                            <div className="absolute -bottom-1 -right-1 px-3 py-1 bg-slate text-white rounded-full text-[8px] font-black uppercase tracking-tighter shadow-lg border-2 border-white z-10 group-hover:bg-ocean transition-colors">
                                                {item.user.vibe}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-serif font-black text-slate">{item.user.name}</h3>
                                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate/40 uppercase tracking-widest">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-sunset/60" />
                                                    {item.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-ocean/60" />
                                                    {item.timestamp}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-lg text-slate/80 leading-relaxed font-medium text-pretty">
                                            {item.content}
                                        </p>

                                        {item.type === 'drop' && (
                                            <motion.div 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="p-4 bg-slate/5 rounded-3xl flex items-center justify-between group/map cursor-pointer hover:bg-slate/10 transition-all border border-transparent hover:border-slate/10"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sunset shadow-sm">
                                                        <Navigation className="w-6 h-6 group-hover/map:rotate-45 transition-transform" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate/40">Impromptu Meetup</p>
                                                        <p className="text-sm font-bold text-slate">Open in Maps</p>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-black text-slate/20 group-hover/map:text-slate transition-colors uppercase tracking-[0.2em]">0.4km Away</div>
                                            </motion.div>
                                        )}

                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-black uppercase tracking-wider text-ocean/60 bg-ocean/5 px-3 py-1 rounded-lg border border-ocean/10">#{tag}</span>
                                            ))}
                                        </div>

                                        <div className="pt-6 border-t border-slate/5 flex items-center gap-8">
                                            <button className="flex items-center gap-2 text-slate/40 hover:text-sunset transition-colors group/btn">
                                                <div className="p-2 rounded-xl group-hover/btn:bg-sunset/10 transition-all">
                                                    <Heart className="w-5 h-5 group-hover/btn:fill-sunset group-active/btn:scale-125 transition-transform" />
                                                </div>
                                                <span className="text-xs font-bold">{item.likes}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-slate/40 hover:text-ocean transition-colors group/btn">
                                                <div className="p-2 rounded-xl group-hover/btn:bg-ocean/10 transition-all">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <span className="text-xs font-bold">{item.replies}</span>
                                            </button>
                                            <button className="flex items-center gap-2 text-slate/40 hover:text-slate transition-colors ml-auto p-2 hover:bg-slate/5 rounded-xl">
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
                            <div className="p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-3xl font-serif font-bold text-slate">Share a Pulse</h3>
                                    <button onClick={() => setIsPosting(false)} className="p-2 hover:bg-slate/5 rounded-full transition-colors">
                                        <X className="w-6 h-6 text-slate/40" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 p-1.5 bg-slate/5 rounded-[20px] shadow-inner border border-slate/5">
                                    {(['ping', 'drop', 'intel'] as const).map(type => (
                                        <button 
                                            key={type}
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

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate/30 ml-1">What&rsquo;s the vibe?</label>
                                        <textarea 
                                            autoFocus
                                            value={newPostContent}
                                            onChange={(e) => setNewPostContent(e.target.value)}
                                            placeholder={postType === 'drop' ? 'Tell the crew where and when to meet...' : 'Share what is happening right now...'}
                                            className="w-full h-32 px-6 py-6 bg-slate/5 rounded-3xl border border-transparent focus:border-ocean/20 focus:bg-white transition-all outline-none text-slate font-medium resize-none text-lg placeholder:text-slate/20"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate/60 border border-transparent hover:border-slate/10 transition-all">
                                            <Camera className="w-4 h-4 text-ocean" />
                                            Add Snap
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate/60 border border-transparent hover:border-slate/10 transition-all">
                                            <MapPin className="w-4 h-4 text-sunset" />
                                            Location
                                        </button>
                                    </div>

                                    <button 
                                        onClick={handleCastPulse}
                                        disabled={!newPostContent.trim()}
                                        className={cn(
                                            "w-full py-6 bg-slate text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4",
                                            newPostContent.trim() ? "hover:scale-[1.02] active:scale-[0.98] cursor-pointer" : "opacity-50 cursor-not-allowed"
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
