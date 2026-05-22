"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DestinationForm({ initialData = null, isEdit = false }: { initialData?: any, isEdit?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    tagline: initialData?.tagline || "",
    tag: initialData?.tag || "islands",
    region: initialData?.region || "",
    vibe: initialData?.vibe || "",
    price: initialData?.price || "",
    rating: initialData?.rating || 5.0,
    reviews: initialData?.reviews || 0,
    image: initialData?.image || "",
    description: initialData?.description || "",
    highlights: initialData?.highlights?.join(", ") || "",
    gallery1: initialData?.gallery?.[0] || "",
    gallery2: initialData?.gallery?.[1] || "",
    gallery3: initialData?.gallery?.[2] || "",
    sgBestTime: initialData?.survivalGuide?.bestTime || "",
    sgConnectivity: initialData?.survivalGuide?.connectivity || "",
    sgTransport: initialData?.survivalGuide?.transport || "",
    sgCash: initialData?.survivalGuide?.cash || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        tag: formData.tag,
        region: formData.region,
        vibe: formData.vibe,
        price: formData.price,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        image: formData.image,
        description: formData.description,
        highlights: formData.highlights.split(",").map((s: string) => s.trim()).filter(Boolean),
        gallery: [formData.gallery1, formData.gallery2, formData.gallery3].filter(Boolean),
        survivalGuide: {
          bestTime: formData.sgBestTime,
          connectivity: formData.sgConnectivity,
          transport: formData.sgTransport,
          cash: formData.sgCash,
        }
      };

      if (isEdit && initialData?.id) {
        await setDoc(doc(db, "destinations", initialData.id), payload, { merge: true });
      } else {
        await addDoc(collection(db, "destinations"), payload);
      }
      
      router.push("/admin/destinations");
      router.refresh();
    } catch (error) {
      console.error("Error saving destination:", error);
      alert("Error saving destination");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/destinations" className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-3xl font-serif font-black text-slate tracking-tight">
            {isEdit ? "Edit Destination" : "Create Destination"}
          </h1>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-sunset text-white font-bold rounded-full text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-sunset/20 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Save Changes" : "Create Destination"}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate mb-6">1. Core Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
              <input required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Siargao Island" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Subtitle</label>
              <input required name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="e.g. The Surfing Capital" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Tagline</label>
              <input required name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Electric & Communal" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category Tag</label>
              <select name="tag" value={formData.tag} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all appearance-none">
                <option value="islands">Islands</option>
                <option value="mountains">Mountains</option>
                <option value="jungles">Jungles</option>
                <option value="cities">Cities</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Region</label>
              <input name="region" value={formData.region} onChange={handleChange} placeholder="e.g. Mindanao" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Vibe Profile</label>
              <input name="vibe" value={formData.vibe} onChange={handleChange} placeholder="e.g. Diverse & Vast" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Starting Price</label>
              <input name="price" value={formData.price} onChange={handleChange} placeholder="e.g. From £280" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Rating</label>
              <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} placeholder="e.g. 4.9" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Review Count</label>
              <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} placeholder="e.g. 765" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate mb-6">2. Detail Content & Visuals</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Long-form content about the destination..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all"></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Main Hero Image (URL)</label>
              <input required name="image" value={formData.image} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Highlights (Comma separated)</label>
              <input name="highlights" value={formData.highlights} onChange={handleChange} placeholder="Secret Lagoons, Island Hopping, Scooters" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Gallery Image 1</label>
                <input name="gallery1" value={formData.gallery1} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Gallery Image 2</label>
                <input name="gallery2" value={formData.gallery2} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Gallery Image 3</label>
                <input name="gallery3" value={formData.gallery3} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate mb-6">3. Survival Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Best Time to Visit</label>
              <input name="sgBestTime" value={formData.sgBestTime} onChange={handleChange} placeholder="Dry Season: Nov - May" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Connectivity & WiFi</label>
              <input name="sgConnectivity" value={formData.sgConnectivity} onChange={handleChange} placeholder="Spotty outside the main town" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Transport</label>
              <input name="sgTransport" value={formData.sgTransport} onChange={handleChange} placeholder="Rent a scooter" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cash & ATMs</label>
              <input name="sgCash" value={formData.sgCash} onChange={handleChange} placeholder="Bring cash, ATMs frequently run out" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sunset focus:ring-1 focus:ring-sunset transition-all" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
