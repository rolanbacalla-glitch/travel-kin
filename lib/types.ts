// Destination types
export interface Destination {
    id: string;
    name: string;
    country: string;
    vibeStatement: string;
    heroImage: string;
    overview: string;
    neighbourhoods: Neighbourhood[];
    safetyTips: string[];
    coordinates: { lat: number; lng: number };
}

export interface Neighbourhood {
    id: string;
    name: string;
    vibe: string;
    description: string;
}

// Experience types
export interface Experience {
    id: string;
    title: string;
    destinationId: string;
    category: 'food' | 'island' | 'nightlife' | 'hike' | 'culture';
    date: string;
    time: string;
    duration: string;
    capacity: number;
    currentParticipants: number;
    priceLevel: 1 | 2 | 3;
    description: string;
    whatToBring: string[];
    meetingPoint: string;
    meetingPointCoords: { lat: number; lng: number };
    hostId: string;
    participantIds: string[];
    safetyNotes: string[];
    vibeTag: 'chill' | 'party' | 'adventurous' | 'mixed';
}

// User / Companion types
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    nationality: string;
    ageRange: '20-25' | '26-30' | '31-35' | '36-40';
    languages: string[];
    travelStyle: ('chill' | 'party' | 'adventurous' | 'mixed')[];
    budgetBand: 'low' | 'mid' | 'higher';
    bio: string;
    currentLocation?: string;
    nextDestination?: string;
    travelDates?: { start: string; end: string };
    verificationStatus: 'basic' | 'verified' | 'trusted';
    badges: string[];
    interests: string[];
    requests?: { experienceId: string; status: 'pending' | 'accepted'; date: string }[];
    wavedCompanions?: string[];
}

export interface Companion extends User {
    hasWaved: boolean;
    upcomingDestinations: {
        destinationId: string;
        destinationName: string;
        dates: { start: string; end: string };
    }[];
}

// Map pin types
export interface MapPin {
    id: string;
    type: 'experience' | 'place';
    category?: Experience['category'];
    title: string;
    coordinates: { lat: number; lng: number };
    linkedId?: string;
}

// Auth types
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

// Toast types
export interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: 'default' | 'success' | 'error';
    duration?: number;
}
