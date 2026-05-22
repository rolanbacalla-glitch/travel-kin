"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Map, Settings, Users, Loader2, LogOut } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      try {
        if (!db || !db.doc) {
          console.error("Firestore not initialized");
          router.push("/");
          return;
        }

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data()?.role === "admin") {
          setIsAuthorized(true);
        } else {
          console.warn("User is not an admin.");
          router.push("/");
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-sunset" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-2xl font-serif font-black tracking-tight text-white hover:text-sunset transition-colors">
            TRAVEL KIN <span className="text-sunset text-xs uppercase block mt-1 tracking-widest font-sans">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/destinations" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-bold transition-colors">
                <Map className="w-5 h-5 text-sunset" />
                <span className="font-bold text-sm tracking-wide">Destinations</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                <Users className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Users</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
