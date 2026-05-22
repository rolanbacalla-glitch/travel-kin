"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const AVAILABLE_ICONS = ["Globe", "Waves", "Mountain", "TreePine", "MapPin"];

export default function CreateDestination() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    tagline: "",
    image: "",
    price: "",
    rating: "4.5",
    reviews: "0",
    icon: "Globe",
    tag: "",
    region: "",
    vibe: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateId = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const id = generateId(formData.title);
      
      const destinationData = {
        title: formData.title,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        image: formData.image,
        price: formData.price,
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        icon: formData.icon,
        tag: formData.tag,
        region: formData.region,
        vibe: formData.vibe,
        createdAt: new Date().toISOString()
      };

      if (!db || !db.collection) {
        // Fallback if db isn't properly initialized yet
        alert("Firebase DB not initialized in this environment.");
        setLoading(false);
        return;
      }

      await setDoc(doc(db, "destinations", id), destinationData);
      
      router.push("/admin/destinations");
    } catch (error) {
      console.error("Error creating destination:", error);
      alert("Failed to create destination. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin/destinations" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate mb-4 text-sm font-bold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Destinations
        </Link>
        <h1 className="text-3xl font-serif font-bold text-slate">Create Destination</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
        
        {/* Core Info */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-ocean mb-6">Core Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Title *</label>
              <input 
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Siargao Island"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Subtitle</label>
              <input 
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g. The Surfing Capital"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Tagline *</label>
              <input 
                required
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Short catchy phrase..."
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Image URL *</label>
              <input 
                required
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="pt-8 border-t border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-widest text-ocean mb-6">Classification</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Region *</label>
              <input 
                required
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g. Visayas"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Vibe *</label>
              <input 
                required
                name="vibe"
                value={formData.vibe}
                onChange={handleChange}
                placeholder="e.g. Electric & Communal"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Category Tag *</label>
              <input 
                required
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="e.g. islands, mountains, city"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Icon *</label>
              <select 
                required
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              >
                {AVAILABLE_ICONS.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="pt-8 border-t border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-widest text-ocean mb-6">Metrics & Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Price String *</label>
              <input 
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. From £280"
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Rating</label>
              <input 
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate mb-2 uppercase tracking-wide">Reviews Count</label>
              <input 
                type="number"
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-sunset text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-sunset/20 disabled:opacity-70 disabled:scale-100"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? "Saving..." : "Create Destination"}
          </button>
        </div>
      </form>
    </div>
  );
}
