"use client";

import React from "react";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-black text-slate tracking-tight">Users</h1>
          <p className="text-slate/60 font-medium mt-1">Manage traveler accounts and permissions.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate/5 p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-slate/5 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-slate/40" />
        </div>
        <h3 className="text-lg font-bold text-slate mb-2">User Management Comming Soon</h3>
        <p className="text-sm text-slate/60 max-w-md">The user management dashboard is currently under construction. You will soon be able to view, edit, and ban users from this panel.</p>
      </div>
    </div>
  );
}
