"use client";

import React from "react";
import Link from "next/link";
import { Camera, X, Globe, Video } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Camera, label: "Instagram" },
    { icon: X, label: "Twitter" },
    { icon: Globe, label: "Facebook" },
    { icon: Video, label: "Youtube" },
  ];

  return (
    <footer className="bg-slate text-white pt-32 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="text-4xl font-serif font-bold text-white mb-8 block"
            >
              Travel <span className="text-sunset">Kin</span>
            </Link>
            <p className="text-white/50 text-lg max-w-sm mb-10 leading-relaxed">
              We&rsquo;re building the infrastructure for safe, meaningful solo
              exploration across Southeast Asia. Join our community of 47k+
              travellers.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <button
                  key={i}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-sunset mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              {["Destinations", "Crew", "Guides", "Safety"].map((item) => {
                let href = `/${item.toLowerCase()}`;
                if (item === "Destinations") href = "/destinations";
                else if (item === "Crew") href = "/#crew";
                else if (item === "Safety") href = "/safety-commitment";

                return (
                  <li key={item}>
                    <Link
                      href={href}
                      className="text-white/60 hover:text-white transition-colors font-medium"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-sunset mb-8">
              Community
            </h4>
            <ul className="space-y-4">
              {[
                "Member Stories",
                "Ambassador Program",
                "Solo Travel Meetups",
                "Partners",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/30 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} TRAVEL KIN LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
