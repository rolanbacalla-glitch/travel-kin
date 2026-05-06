"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: string[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
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
          Travel <span className="text-sunset italic">Kin</span>
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
        {navLinks.map((item) => (
          <Link
            key={item}
            href={item === "Guides" ? "/guides" : `#${item.toLowerCase()}`}
            className="text-4xl font-serif text-white/80 hover:text-white transition-colors duration-200 focus-ring-white rounded-sm"
            onClick={onClose}
          >
            {item}
          </Link>
        ))}
      </nav>

      <div className="px-8 pb-12 space-y-3 flex flex-col">
        <Link
          href="/verify"
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
      </div>
    </div>
  );
}
