import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ProfileState {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  styles: string[];
  vibes: string[];
  destinations: string[];
  isVerified: boolean;
  
  // Actions
  updateProfile: (profile: Partial<Omit<ProfileState, 'updateProfile'>>) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE = {
  name: "Mia Reyes",
  username: "wanderer_mia",
  bio: "A solo explorer currently looping through Siargao and Palawan. I love dawn surf sessions, local kinilaw spots, and Starlink cafés.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=100&w=1600",
  styles: ["slow", "remote"],
  vibes: ["Zen Seeker", "Foodie", "Photographer"],
  destinations: ["Philippines", "Indonesia"],
  isVerified: true,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      ...DEFAULT_PROFILE,

      updateProfile: (profile) => set((state) => ({ ...state, ...profile })),
      resetProfile: () => set(DEFAULT_PROFILE),
    }),
    {
      name: 'kin-profile-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
