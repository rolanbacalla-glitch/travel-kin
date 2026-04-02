"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Plus, 
  UserPlus, 
  Heart, 
  MapPin, 
  MoreHorizontal,
  Download,
  Share2,
  X,
  CheckCircle2,
  Cloud,
  Clock
} from 'lucide-react';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useMessagesStore } from '@/lib/stores/useMessages';

interface Memory {
  id: string;
  url: string;
  location: string;
  caption: string;
  taggedKins: string[]; // Names of the Kins tagged
  vibe: string;
  likes: number;
  date: string;
}

const SAMPLE_MEMORIES: Memory[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&h=1200&auto=format&fit=crop',
    location: 'Chiang Mai Old City',
    caption: 'Ancient temples and new friends. The golden hour hits different here.',
    taggedKins: ['Suki', 'Liam'],
    vibe: 'Cultural, Zen',
    likes: 24,
    date: 'March 28, 2026'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&h=1000&auto=format&fit=crop',
    location: 'Doi Inthanon',
    caption: 'Woke up at 4am for this. Totally worth the cold for that view.',
    taggedKins: ['Nara'],
    vibe: 'Adventurous',
    likes: 42,
    date: 'March 29, 2026'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=800&h=1400&auto=format&fit=crop',
    location: 'Nimman Road',
    caption: 'Best Khao Soy in the city, period. Found this hidden gem with the crew.',
    taggedKins: ['Suki', 'Kevin'],
    vibe: 'Foodie, Local',
    likes: 18,
    date: 'March 30, 2026'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&h=1000&auto=format&fit=crop',
    location: 'Bua Thong Waterfalls',
    caption: 'The "Sticky" Waterfalls! Climbing up like Spiderman was a trip highlight.',
    taggedKins: ['Liam', 'Kevin'],
    vibe: 'Fun, Nature',
    likes: 56,
    date: 'March 31, 2026'
  }
];

export function MemoriesView() {
  const store = useMessagesStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const allMemories = useMemo(() => {
    const chatMemories = store.archivedMemories.map(m => ({
        id: m.id,
        url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=800&h=1200&auto=format&fit=crop', // A different travel placeholder
        location: m.location,
        caption: `Session with ${m.kinName}: ${m.preview}`,
        taggedKins: [m.kinName],
        vibe: m.vibe,
        likes: 0,
        date: new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }));
    // Sort to show newest first
    return [...chatMemories, ...SAMPLE_MEMORIES];
  }, [store.archivedMemories]);

  const selectedMemory = allMemories.find(m => m.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <div className="flex items-center gap-3 text-ocean font-bold tracking-widest text-xs uppercase bg-ocean/5 rounded-full px-4 py-1.5 w-fit border border-ocean/10 shadow-sm">
                <Camera className="w-3.5 h-3.5" />
                Memory Vault
            </div>
          <h2 className="text-4xl font-serif text-slate font-bold">The Collective Scrapbook</h2>
          <p className="text-slate/60 font-medium italic">Preserving every sunrise, meal, and shared mile.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
            <button 
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center gap-2 px-6 py-4 bg-white text-ocean border border-ocean/10 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm hover:shadow-xl hover:bg-ocean/5 transition-all"
            >
                <Cloud className="w-4 h-4" />
                Sync Cloud
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-white text-slate border border-slate/5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-sm hover:bg-slate/5 transition-all">
                <Download className="w-4 h-4" />
                Export Album
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-slate text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-slate/20 hover:scale-105 active:scale-95 transition-all">
                <Plus className="w-4 h-4" />
                Upload
            </button>
        </div>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-6"
            >
                <div className="absolute inset-0 bg-slate/40 backdrop-blur-md" onClick={() => setIsImportModalOpen(false)} />
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 space-y-8"
                >
                    <div className="space-y-2 text-center">
                        <h3 className="text-2xl font-serif font-black text-slate">Import Memories</h3>
                        <p className="text-xs font-medium text-slate/60">Select a source to sync your travel shots.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <ImportSource icon={GoogleIcon} label="Google Photos" status="Connected" />
                        <ImportSource icon={AmazonIcon} label="Amazon Photos" status="Ready" />
                        <ImportSource icon={InstagramIcon} label="Instagram Link" status="Ready" />
                        <ImportSource icon={Cloud} label="iCloud (Photos app)" status="Ready" />
                    </div>

                    <button 
                        onClick={() => setIsImportModalOpen(false)}
                        className="w-full py-5 bg-[#F9F8F6] text-slate/60 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:text-slate transition-all"
                    >
                        Cancel
                    </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {allMemories.map((memory) => (
          <motion.div
            key={memory.id}
            layoutId={memory.id}
            onClick={() => setSelectedId(memory.id)}
            className="break-inside-avoid cursor-pointer group"
          >
            {/* Memory Card */}
            <div className="relative rounded-[40px] overflow-hidden bg-white border border-slate/5 shadow-lg shadow-slate/5 group-hover:shadow-2xl transition-all duration-700">
                <div className="relative aspect-[3/4]">
                    <Image 
                        src={memory.url} 
                        alt={memory.caption} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Hover Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-8 left-8 right-8 space-y-4">
                            <p className="text-white text-lg font-serif italic leading-tight">&ldquo;{memory.caption}&rdquo;</p>
                            <div className="flex flex-wrap items-center gap-2">
                                {memory.taggedKins.map(kin => (
                                    <span key={kin} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/20">
                                        @{kin}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{memory.location}</span>
                    </div>

                    {/* Likes */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                        <Heart className="w-3 h-3 text-sunset fill-sunset" />
                        <span className="text-[10px] font-black text-white">{memory.likes}</span>
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Memory Modal */}
      <AnimatePresence>
        {selectedId && selectedMemory && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
            >
                <div className="absolute inset-0 bg-slate/60 backdrop-blur-2xl" onClick={() => setSelectedId(null)} />
                <motion.div 
                    layoutId={selectedId}
                    className="relative w-full max-w-6xl h-[80vh] bg-white rounded-[50px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Image Area */}
                    <div className="flex-1 relative bg-black flex items-center justify-center group/image">
                        <Image 
                            src={selectedMemory.url} 
                            alt={selectedMemory.caption} 
                            fill
                            className="object-contain"
                        />
                        <button 
                            onClick={() => setSelectedId(null)}
                            title="Close Memory"
                            className="absolute top-8 left-8 p-4 bg-white/10 hover:bg-white/20 text-white rounded-3xl backdrop-blur-xl transition-all z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Info Area */}
                    <div className="w-full md:w-[400px] p-12 flex flex-col justify-between bg-[#F9F8F6]">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ocean">{selectedMemory.location}</p>
                                    <h3 className="text-2xl font-serif font-black text-slate leading-none">Trip Moment</h3>
                                </div>
                                <button className="p-3 bg-white border border-slate/5 rounded-2xl shadow-sm hover:bg-slate/5 transition-all text-slate/60">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <p className="text-lg font-serif italic text-slate/60 leading-relaxed">&ldquo;{selectedMemory.caption}&rdquo;</p>
                                <div className="flex items-center gap-3 text-slate/60 text-xs font-bold uppercase tracking-widest">
                                    <Clock className="w-4 h-4" /> {selectedMemory.date}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate/60">Tagged Kins</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMemory.taggedKins.map(kin => (
                                        <div key={kin} className="flex items-center gap-2 pl-2 pr-4 py-2 bg-white border border-slate/5 rounded-2xl shadow-sm">
                                            <div className="w-6 h-6 rounded-full bg-ocean/10 flex items-center justify-center">
                                                <UserPlus className="w-3 h-3 text-ocean" />
                                            </div>
                                            <span className="text-xs font-bold text-slate">@{kin}</span>
                                        </div>
                                    ))}
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate/5 hover:bg-slate/10 rounded-2xl transition-all text-slate/60">
                                        <Plus className="w-3 h-3" />
                                        <span className="text-xs font-bold">Tag</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="flex-1 py-5 bg-sunset text-white font-black uppercase tracking-widest text-[10px] rounded-[30px] shadow-xl shadow-sunset/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all">
                                <Heart className="w-4 h-4 fill-white" />
                                Love this Move
                            </button>
                            <button className="p-5 bg-white border border-slate/5 text-slate rounded-[30px] shadow-sm hover:bg-slate/5 transition-all">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── HELPERS ── */

function ImportSource({ icon: Icon, label, status }: { icon: React.ElementType, label: string, status: "Connected" | "Ready" }) {
    return (
        <button className="w-full flex items-center justify-between p-5 bg-[#F9F8F6] hover:bg-white border border-transparent hover:border-slate/5 rounded-[2rem] transition-all group shadow-sm hover:shadow-xl hover:shadow-slate/5">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl border border-slate/5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-slate" />
                </div>
                <div className="text-left">
                    <p className="text-sm font-bold text-slate">{label}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate/60">Sync Photos</p>
                </div>
            </div>
            <div className={cn(
                "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                status === "Connected" ? "bg-green-50 text-green-500 border-green-100" : "bg-white text-slate/60 border-slate/5"
            )}>
                {status}
            </div>
        </button>
    );
}

function GoogleIcon({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.96 3.4-2.12 4.49-1.48 1.49-3.78 2.59-7.24 2.59-6.38 0-11.64-5.16-11.64-11.54C1.32 5.16 6.58 0 12.96 0c3.92 0 6.64 1.64 8.48 3.5l-2.32 2.32c-1.32-1.32-3.16-2.28-6.16-2.28-4.24 0-7.88 3.52-7.88 7.68s3.64 7.68 7.88 7.68c3.04 0 4.88-1.28 6-2.48.96-.96 1.48-2.36 1.64-4.28h-6.24z"/></svg>;
}

function AmazonIcon({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.177 15.353c-.326-1.125-2.073-1.464-4.225-1.464-3.08 0-4.041.564-4.041 1.611 0 1.258 1.8 1.495 3.518 1.495 2.193 0 5.074-.515 4.748-1.642zm-9.011 2.213c.189.658.556 1.22 1.096 1.641l.995-.898c-.463-.33-.787-.733-.974-1.25l-1.117.507zm14.156-5.836l-1.458-.663c-.1-.045-.213-.024-.294.053l-1.022.955c-.21.196-.07.49.206.514l1.192.106c.387.034.69.349.69.737v2.247c0 2.223-1.693 4.025-3.78 4.025-1.01 0-1.92-.416-2.585-1.084-.132-.132-.132-.345 0-.477l.617-.617c.184-.184.444-.22 1.002.325.2.2.476.324.78.324.61 0 1.104-.494 1.104-1.104v-.2c0-.528-.31-.986-.757-1.195l-7.01-3.238c-.347-.16-.763-.16-1.11 0L2.146 16.03c-.347.16-.763.16-1.11 0L0 15.522v5.717s1.42 1.127 2.146 1.127c.48 0 1.956-.563 2.146-.66.19-.1.353-.294.353-.48 0-.115-.125-.19-.481-.19-.53 0-1.11-.265-1.11-.661 0-.16.142-.265.48-.42l4.904-2.27c2.146-.995 4.904-.995 7.051 0l7.151 3.3c.347.16.763.16 1.11 0l1.458-.675V11.73z"/></svg>;
}

function InstagramIcon({ className }: { className?: string }) {
    return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37a4 4 0 1 1-7.14 0 4 4 0 0 1 7.14 0z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
}
