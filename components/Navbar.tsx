"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isScrolled: boolean;
  navLinks: string[];
  onOpenMobileMenu: () => void;
}

export function Navbar({ isScrolled, navLinks, onOpenMobileMenu }: NavbarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter,padding] duration-300",
        isScrolled
          ? "mx-4 mt-4 rounded-2xl bg-slate-900/80 backdrop-blur-md shadow-xl px-5 py-3 border border-white/10"
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
          Travel <span className="text-sunset italic">Kin</span>
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
          <Link
            href="/verify"
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
