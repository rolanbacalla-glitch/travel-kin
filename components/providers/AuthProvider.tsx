"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useProfileStore } from "@/lib/stores/useProfile";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const providerPhoto = user.providerData?.find((p) => p?.photoURL)?.photoURL;
        const providerName = user.providerData?.find((p) => p?.displayName)?.displayName;
        useProfileStore.getState().updateProfile({
          name: user.displayName || providerName || user.email?.split("@")[0] || "Traveler",
          avatar: user.photoURL || providerPhoto || `https://api.dicebear.com/7.x/notionists/png?seed=${user.uid}`,
          username: user.email?.split("@")[0] || "wanderer",
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
