"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { useProfileStore } from "@/lib/stores/useProfile";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: string[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const { user } = useAuthContext();
  const profile = useProfileStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasMockUser = typeof window !== "undefined" && !!localStorage.getItem("travelkin-mock-user");
    if (user || hasMockUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[100] bg-slate text-white flex flex-col overscroll-contain"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <span className="text-2xl font-serif font-bold">
          Travel <span className="text-sunset">Kin</span>
        </span>
        <button
          aria-label="Close navigation menu"
          className="p-2 focus-ring-white rounded-lg"
          onClick={onClose}
        >
          <X className="w-7 h-7" aria-hidden="true" />
        </button>
      </div>

      <nav className="flex flex-col items-start px-8 py-12 space-y-8 flex-1">
        {navLinks.map((item) => {
          let href = "/";
          if (item === "Guides") href = "/guides";
          else if (item === "Safety") href = "/safety-commitment";
          else if (item === "Destinations") href = "/destinations";
          else href = `/#${item.toLowerCase()}`;

          return (
            <Link
              key={item}
              href={href}
              className="text-4xl font-serif text-white/80 hover:text-white transition-colors duration-200 focus-ring-white rounded-sm"
              onClick={onClose}
            >
              {item}
            </Link>
          );
        })}
      </nav>

      <div className="px-8 pb-12 space-y-3 flex flex-col">
        {isLoggedIn ? (
          <>
            <Link
              href="/dashboard?tab=profile"
              onClick={onClose}
              className="w-full py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/10 transition-colors duration-200 focus-ring-white text-center flex items-center justify-center gap-2"
            >
              {profile.avatar && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={profile.avatar}
                    alt="Avatar"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              )}
              <span>My Profile</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={onClose}
              className="w-full py-4 bg-sunset rounded-2xl text-white font-semibold hover:bg-sunset-dark transition-colors duration-200 focus-ring-white text-center"
            >
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={onClose}
              className="w-full py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/10 transition-colors duration-200 focus-ring-white text-center"
            >
              Sign In
            </Link>
            <Link
              href="/verify"
              onClick={onClose}
              className="w-full py-4 bg-sunset rounded-2xl text-white font-semibold hover:bg-sunset-dark transition-colors duration-200 focus-ring-white text-center"
            >
              Start Exploring
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
