"use client";

import React from "react";
import { Settings } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-black text-slate tracking-tight">Settings</h1>
          <p className="text-slate/60 font-medium mt-1">Global platform configuration.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate/5 p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-slate/5 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-slate/40" />
        </div>
        <h3 className="text-lg font-bold text-slate mb-2">Platform Settings Comming Soon</h3>
        <p className="text-sm text-slate/60 max-w-md">Platform-wide settings, API configurations, and feature toggles will be accessible here.</p>
      </div>
    </div>
  );
}
