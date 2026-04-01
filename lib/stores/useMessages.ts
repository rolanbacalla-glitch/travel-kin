import { create } from 'zustand';

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

interface MessagesState {
  sessions: Record<string, ChatSession>; // Key is kinId
  activeId: string | null;
  isVerified: boolean;
  
  // Actions
  setActiveId: (id: string | null) => void;
  setVerified: (verified: boolean) => void;
  addMessage: (kinId: string, message: Omit<Message, 'id' | 'time'>) => void;
  updateTrustStatus: (kinId: string, status: TrustStatus, expiryHours?: number) => void;
  triggerSOS: (active: boolean) => void;
  archiveChat: (kinId: string) => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  sessions: {},
  activeId: null,
  isVerified: false,

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

  archiveChat: (kinId: string) => set((state: MessagesState) => {
    const session = state.sessions[kinId];
    if (!session) return state;

    console.log(`Archiving chat with ${kinId}... Saved to Memories.`);
    
    return {
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
}));
