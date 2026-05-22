"use client";

import React, { useEffect, useState } from "react";
import { Users, Shield, ShieldAlert, CheckCircle, Search, Ban, ShieldCheck, Trash2 } from "lucide-react";
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface AppUser {
  id: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  role?: "admin" | "user";
  status?: "active" | "banned";
  isVerified?: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: AppUser[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as AppUser);
      });
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserField = async (userId: string, field: string, value: any) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        [field]: value
      });
      // Update local state
      setUsers(users.map(u => u.id === userId ? { ...u, [field]: value } : u));
    } catch (error) {
      console.error(`Error updating user ${field}:`, error);
      alert(`Failed to update user.`);
    }
  };

  const handleInjectDummy = async () => {
    try {
      const dummyId = `dummy-${Math.floor(Math.random() * 10000)}`;
      await setDoc(doc(db, "users", dummyId), {
        displayName: "Test User",
        email: `test.${dummyId}@example.com`,
        role: "user",
        status: "active",
        isVerified: false
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(search.toLowerCase()) || 
    user.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-black text-slate tracking-tight">Users</h1>
          <p className="text-slate/60 font-medium mt-1">Manage traveler accounts and permissions.</p>
        </div>
        <button 
          onClick={handleInjectDummy}
          className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full font-bold text-xs uppercase hover:bg-slate-200 transition-colors"
        >
          + Add Dummy User
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-sunset outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">User</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Role</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Status</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                          {user.photoURL ? (
                            <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold">
                              {(user.displayName || user.email || "?")[0].toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate text-sm flex items-center gap-2">
                            {user.displayName || "Anonymous User"}
                            {user.isVerified && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
                          </p>
                          <p className="text-xs font-medium text-slate-400">{user.email || user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                        user.status === 'banned' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {user.status === 'banned' ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => updateUserField(user.id, 'isVerified', !user.isVerified)}
                          title={user.isVerified ? "Revoke Verification" : "Verify ID"}
                          className={`p-2 rounded-lg transition-colors ${user.isVerified ? 'text-blue-500 bg-blue-50 hover:bg-blue-100' : 'text-slate-400 hover:text-blue-500 hover:bg-blue-50'}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateUserField(user.id, 'role', user.role === 'admin' ? 'user' : 'admin')}
                          title={user.role === 'admin' ? "Remove Admin" : "Make Admin"}
                          className={`p-2 rounded-lg transition-colors ${user.role === 'admin' ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' : 'text-slate-400 hover:text-purple-600 hover:bg-purple-50'}`}
                        >
                          <ShieldAlert className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateUserField(user.id, 'status', user.status === 'banned' ? 'active' : 'banned')}
                          title={user.status === 'banned' ? "Unban User" : "Ban User"}
                          className={`p-2 rounded-lg transition-colors ${user.status === 'banned' ? 'text-red-600 bg-red-50 hover:bg-red-100' : 'text-slate-400 hover:text-red-600 hover:bg-red-50'}`}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                          className="p-2 rounded-lg transition-colors text-slate-400 hover:text-red-600 hover:bg-red-50"
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
