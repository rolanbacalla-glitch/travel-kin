"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { useProfileStore } from "@/lib/stores/useProfile";

interface NavbarProps {
  isScrolled: boolean;
  navLinks: string[];
  onOpenMobileMenu: () => void;
}

export function Navbar({ isScrolled, navLinks, onOpenMobileMenu }: NavbarProps) {
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
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding] duration-300",
        isScrolled
          ? "mx-4 mt-4 rounded-2xl bg-slate/60 backdrop-blur-md shadow-xl px-5 py-3 border border-white/10"
          : "px-6 py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-serif font-bold text-white drop-shadow-md focus-ring rounded-sm"
          aria-label="Travel Kin — home"
        >
          Travel <span className="text-sunset">Kin</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-8">
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
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-ring rounded-sm"
              >
                {item}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard?tab=profile"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer focus-ring"
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
                <span className="text-xs font-semibold text-white/95 tracking-wide">My Profile</span>
              </Link>
              <Link
                href="/dashboard"
                className="px-5 py-2 bg-sunset text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-sunset-dark transition-all duration-200 focus-ring active:scale-95 cursor-pointer"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 focus-ring rounded-full cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/verify"
                className="px-6 py-2.5 bg-sunset text-white text-sm font-semibold rounded-full shadow-lg hover:bg-sunset-dark transition-all duration-200 focus-ring active:scale-95 cursor-pointer"
              >
                Start Exploring
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          aria-label="Open navigation menu"
          className="md:hidden text-white p-2 focus-ring rounded-lg"
          onClick={onOpenMobileMenu}
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
