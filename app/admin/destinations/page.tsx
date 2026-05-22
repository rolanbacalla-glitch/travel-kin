"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Map } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface Destination {
  id: string;
  title: string;
  tagline: string;
  image: string;
  price: string;
  rating: number;
}

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      if (!db || !db.collection) {
        // Fallback for mocked firebase db if missing methods
        return;
      }
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const data: Destination[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Destination);
      });
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      try {
        await deleteDoc(doc(db, "destinations", id));
        fetchDestinations(); // Refresh
      } catch (error) {
        console.error("Error deleting destination:", error);
        alert("Failed to delete destination.");
      }
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate mb-2">Destinations</h1>
          <p className="text-slate-500 font-medium">Manage all available trips and destinations on the platform.</p>
        </div>
        
        <Link 
          href="/admin/destinations/create"
          className="inline-flex items-center gap-2 bg-sunset text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-sunset/20"
        >
          <Plus className="w-4 h-4" /> Add Destination
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search destinations..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Destination</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Price</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Rating</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">Loading destinations...</td>
                </tr>
              ) : destinations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">No destinations found. Create one to get started!</td>
                </tr>
              ) : (
                destinations.map((dest) => (
                  <tr key={dest.id} className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative">
                          {dest.image ? (
                            <Image src={dest.image} alt={dest.title} fill className="object-cover" />
                          ) : (
                            <Map className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate">{dest.title}</p>
                          <p className="text-xs text-slate-500">{dest.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-600">{dest.price}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-100 text-yellow-800 text-xs font-bold">
                        ★ {dest.rating}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-ocean transition-colors hover:bg-ocean/10 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(dest.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
