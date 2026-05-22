"use client";

import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-black text-slate tracking-tight">Overview</h1>
          <p className="text-slate/60 font-medium mt-1">Welcome back to the Admin Portal.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate/5">
          <h3 className="text-sm font-bold text-slate/50 uppercase tracking-widest mb-2">Total Destinations</h3>
          <p className="text-3xl font-black text-slate">24</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate/5">
          <h3 className="text-sm font-bold text-slate/50 uppercase tracking-widest mb-2">Total Users</h3>
          <p className="text-3xl font-black text-slate">1,204</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate/5">
          <h3 className="text-sm font-bold text-slate/50 uppercase tracking-widest mb-2">Active Kin Sessions</h3>
          <p className="text-3xl font-black text-slate">89</p>
        </div>
      </div>
    </div>
  );
}
