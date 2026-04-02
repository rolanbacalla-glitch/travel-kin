import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TrustStatus = 'BLURRED' | 'PRECISE' | 'SOS_OVERRIDE';

interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
  type?: 'text' | 'handshake_request';
  handshakeStatus?: 'pending' | 'accepted' | 'declined';
  read?: boolean;
}

interface ChatSession {
  trustStatus: TrustStatus;
  handshakeExpiry: string | null; // ISO string
  isSOSActive: boolean;
  proximityLevel: 1 | 2 | 3;
  messages: Message[];
}

interface Memory {
  id: string;
  kinName: string;
  location: string;
  vibe: string;
  date: string; // ISO
  preview: string;
}

interface MessagesState {
  sessions: Record<string, ChatSession>; // Key is kinId
  activeId: string | null;
  isVerified: boolean;
  archivedMemories: Memory[];
  
  // Actions
  setActiveId: (id: string | null) => void;
  setVerified: (verified: boolean) => void;
  addMessage: (kinId: string, message: Omit<Message, 'id' | 'time'>) => void;
  updateTrustStatus: (kinId: string, status: TrustStatus, expiryHours?: number) => void;
  triggerSOS: (active: boolean) => void;
  archiveChat: (kinId: string, kinName: string, location: string, vibe: string) => void;
}

export const useMessagesStore = create<MessagesState>()(
  persist(
    (set) => ({
      sessions: {},
      activeId: null,
      isVerified: false,
      archivedMemories: [],

      setActiveId: (id: string | null) => set({ activeId: id }),
      setVerified: (verified: boolean) => set({ isVerified: verified }),

      addMessage: (kinId: string, message: Omit<Message, 'id' | 'time'>) => set((state: MessagesState) => {
        const session = state.sessions[kinId] || {
          trustStatus: 'BLURRED',
          handshakeExpiry: null,
          isSOSActive: false,
          proximityLevel: 1,
          messages: [],
        };

        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}`,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        };

        return {
          sessions: {
            ...state.sessions,
            [kinId]: {
              ...session,
              messages: [...session.messages, newMessage],
            },
          },
        };
      }),

      updateTrustStatus: (kinId: string, status: TrustStatus, expiryHours?: number) => set((state: MessagesState) => {
        const session = state.sessions[kinId];
        if (!session) return state;

        const expiry = expiryHours 
          ? new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString() 
          : null;

        return {
          sessions: {
            ...state.sessions,
            [kinId]: {
              ...session,
              trustStatus: status,
              handshakeExpiry: expiry,
            },
          },
        };
      }),

      triggerSOS: (active: boolean) => set((state: MessagesState) => {
        const newSessions = { ...state.sessions };
        Object.keys(newSessions).forEach((id) => {
          newSessions[id] = {
            ...newSessions[id],
            isSOSActive: active,
            trustStatus: active ? 'SOS_OVERRIDE' : 'BLURRED',
          };
        });
        return { sessions: newSessions };
      }),

      archiveChat: (kinId: string, kinName: string, location: string, vibe: string) => set((state: MessagesState) => {
        const session = state.sessions[kinId];
        if (!session) return state;

        const newMemory: Memory = {
          id: `mem-${Date.now()}`,
          kinName,
          location,
          vibe,
          date: new Date().toISOString(),
          preview: session.messages[session.messages.length - 1]?.text || 'No previous messages.'
        };
        
        return {
          archivedMemories: [...state.archivedMemories, newMemory],
          sessions: {
            ...state.sessions,
            [kinId]: {
              ...session,
              trustStatus: 'BLURRED',
              handshakeExpiry: null,
            },
          },
        };
      }),
    }),
    {
      name: 'kin-travel-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
