"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Users, 
  CheckCircle2, 
  Utensils, 
  Camera, 
  Palmtree, 
  MoreHorizontal,
  ThumbsUp,
  Heart
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  title: string;
  location: string;
  time: string;
  category: 'food' | 'activity' | 'nature' | 'photos';
  suggestedBy: string; // Kin Name
  votes: number;
  isDone: boolean;
}

const SAMPLE_ITEMS: ItineraryItem[] = [
  {
    id: '1',
    title: 'Sunrise Yoga at the Sanctuary',
    location: 'North Beach, Phuket',
    time: '06:30 AM',
    category: 'activity',
    suggestedBy: 'Nara',
    votes: 4,
    isDone: true,
  },
  {
    id: '2',
    title: 'Best Khao Soi in Chiang Mai (Hidden Spot)',
    location: 'Old Town Alley',
    time: '12:30 PM',
    category: 'food',
    suggestedBy: 'Suki',
    votes: 8,
    isDone: false,
  },
  {
    id: '3',
    title: 'Drone Shoot at rice terraces',
    location: 'Ubud Valley',
    time: '04:00 PM',
    category: 'photos',
    suggestedBy: 'Kevin',
    votes: 12,
    isDone: false,
  },
  {
    id: '4',
    title: 'Group Dinner & Fire Show',
    location: 'Sunset Bay Club',
    time: '08:00 PM',
    category: 'activity',
    suggestedBy: 'Liam',
    votes: 6,
    isDone: false,
  }
];

export function ItineraryView() {
  const [items, setItems] = useState(SAMPLE_ITEMS);

  const toggleVote = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, votes: item.votes + 1 } : item
    ));
  };

  const toggleDone = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ));
  };

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'food': return <Utensils className="w-5 h-5" />;
      case 'activity': return <Clock className="w-5 h-5" />;
      case 'nature': return <Palmtree className="w-5 h-5" />;
      case 'photos': return <Camera className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'food': return 'bg-sunset/10 text-sunset';
      case 'activity': return 'bg-ocean/10 text-ocean';
      case 'nature': return 'bg-green-100 text-green-600';
      case 'photos': return 'bg-purple-100 text-purple-600';
      default: return 'bg-slate/10 text-slate';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
            <div className="flex items-center gap-3 text-ocean font-bold tracking-widest text-xs uppercase bg-ocean/5 rounded-full px-4 py-1.5 w-fit border border-ocean/10 shadow-sm">
                <Calendar className="w-3.5 h-3.5" />
                Active Itinerary
            </div>
          <h2 className="text-4xl font-serif text-slate font-bold">Today in Paradise</h2>
          <p className="text-slate/60 font-medium">Coordinate with your crew for a perfect day.</p>
        </div>
        <button 
          title="Suggest an activity for the crew"
          className="flex items-center gap-2 px-6 py-3.5 bg-slate text-white rounded-2xl shadow-xl shadow-slate/10 hover:bg-slate/90 transition-all active:scale-95 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-semibold">Suggest Activity</span>
        </button>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: 'Time Spent', val: '4.5 hrs', icon: Clock },
            { label: 'Crew Attending', val: '12 people', icon: Users },
            { label: 'Completion', val: '25%', icon: CheckCircle2 }
        ].map((stat, i) => (
            <div key={i} className="p-6 bg-white/60 backdrop-blur-xl border border-slate/5 rounded-3xl shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate/5 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-slate/60" />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate/60 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-xl font-bold text-slate">{stat.val}</p>
                </div>
            </div>
        ))}
      </div>

      {/* Timeline List */}
      <div className="relative space-y-8 pl-4 md:pl-0">
        {/* Timeline connecting line */}
        <div className="absolute left-10 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-ocean/20 via-sunset/20 to-transparent md:-translate-x-1/2 hidden md:block" />

        {items.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Content Card */}
            <div className={`w-full md:w-5/12 ${item.isDone ? 'opacity-50 grayscale' : ''}`}>
               <div className="group relative p-8 bg-white border border-slate/5 rounded-[40px] shadow-lg shadow-slate/5 hover:shadow-xl hover:shadow-slate/10 transition-all duration-500 overflow-hidden">
                  {/* Category Badge */}
                  <div className={`absolute top-6 right-6 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${getCategoryColor(item.category)}`}>
                            {getIcon(item.category)}
                        </div>
                        <p className="text-sm font-bold text-slate/60">{item.time}</p>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate mb-1 group-hover:text-ocean transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-2 text-slate/60">
                            <MapPin className="w-4 h-4" />
                            <p className="text-sm font-medium">{item.location}</p>
                        </div>
                    </div>
                    </div>

                    <div className="pt-6 border-t border-slate/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                             {/* Avatar placeholder */}
                            <div className="w-6 h-6 rounded-full bg-sunset flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                {item.suggestedBy[0]}
                            </div>
                            <p className="text-xs font-semibold text-slate/60">Suggested by <span className="text-slate font-bold">{item.suggestedBy}</span></p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => toggleVote(item.id)}
                                className="flex items-center gap-1.5 text-slate/60 hover:text-ocean bg-slate/5 px-2.5 py-1 rounded-xl transition-all cursor-pointer active:scale-95"
                                title="Upvote this activity"
                            >
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-xs font-bold">{item.votes}</span>
                            </button>
                            <button 
                                onClick={() => toggleDone(item.id)}
                                title={item.isDone ? "Mark as active" : "Mark as completed"}
                                className="p-2 text-slate/30 hover:text-green-500 transition-colors cursor-pointer active:scale-90"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                  </div>

                  {item.isDone && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/10 pointer-events-none">
                        <div className="flex items-center gap-2 px-6 py-3 bg-white shadow-2xl rounded-2xl border border-slate/10 transform -rotate-6">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-black uppercase tracking-tighter text-slate">Completed</span>
                        </div>
                    </div>
                  )}
               </div>
            </div>

            {/* Timeline Dot (Desktop only) */}
            <div className="hidden md:flex relative z-10 w-12 h-12 rounded-full bg-white border-4 border-slate/5 items-center justify-center shadow-xl">
                 <div className={`w-3 h-3 rounded-full ${item.isDone ? 'bg-slate/20' : 'bg-ocean animate-pulse'}`} />
                 {/* Connection lines for mobile feel */}
                 <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-full bg-ocean/10" />
            </div>

            {/* Spacer for layout */}
            <div className="hidden md:block w-5/12" />
          </motion.div>
        ))}
      </div>

      {/* Suggested for Tomorrow Section */}
      <div className="pt-12 px-8 py-12 bg-sunset/5 rounded-[50px] border border-sunset/10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-sunset font-black text-xs uppercase tracking-[0.2em]">
                    <div className="w-4 h-0.5 bg-sunset" />
                    Upvoting Now
                </div>
                <h3 className="text-3xl font-serif font-bold text-slate">Ready for tomorrow?</h3>
                <p className="text-slate/60 leading-relaxed max-w-md">The crew is voting on a hidden lagoon tour for Siargao. Check the details and cast your vote before midnight.</p>
                <div className="flex items-center gap-3 pt-4">
                    <button className="px-8 py-4 bg-sunset text-white rounded-2xl font-bold shadow-xl shadow-sunset/20 hover:scale-105 active:scale-95 transition-all">
                        Cast Vote
                    </button>
                    <button className="px-8 py-4 bg-white text-slate border border-slate/5 rounded-2xl font-bold shadow-sm hover:bg-slate/5 transition-all">
                        Ignore
                    </button>
                </div>
            </div>
            <div className="relative w-full md:w-64 h-64 bg-white/40 rounded-3xl overflow-hidden border border-slate/5">
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                    <Heart className="w-12 h-12 text-sunset animate-bounce" />
                    <span className="text-[10px] font-black text-sunset uppercase tracking-widest">Trending Choice</span>
                </div>
                {/* Abstract image placeholder decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sunset/20 to-transparent" />
            </div>
      </div>
    </div>
  );
}
