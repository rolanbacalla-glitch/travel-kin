export interface KinVibeStats {
  id: string;
  rating: number;
  reviews: number;
  tags: string[];
  lastDiscovery: string;
}

export interface Kin {
  id: string;
  name: string;
  location: string;
  hubId: "siargao" | "el-nido" | "cebu" | "coron";
  vibe: string;
  status: "online" | "away" | "offline";
  image: string;
  lat: number;
  lng: number;
  verified: boolean;
  tripDates?: {
    start: string;
    end: string;
    label: string;
  };
  vibeStats: KinVibeStats;
}

export const KINS: Kin[] = [
  { 
    id: "1", 
    name: "Suki",  
    location: "General Luna, Siargao", 
    hubId: "siargao",
    vibe: "Dawn Surf & Secret Lagoon Explorer",  
    status: "online",  
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=100&w=1600",
    lat: 9.7892,
    lng: 126.1558,
    verified: true,
    tripDates: {
      start: "2026-11-01",
      end: "2026-11-15",
      label: "1–15 Nov",
    },
    vibeStats: {
      id: "1",
      rating: 4.9,
      reviews: 18,
      tags: ["SurfCrew", "EarlyRiser", "Foodie"],
      lastDiscovery: "12m ago · Cloud 9",
    },
  },
  { 
    id: "2", 
    name: "Liam",  
    location: "Corong-Corong, El Nido",    
    hubId: "el-nido",
    vibe: "Kayak Expeditions & Sunset Rooftops",  
    status: "away",    
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=100&w=1600",
    lat: 11.1645,
    lng: 119.3926,
    verified: true,
    tripDates: {
      start: "2026-11-05",
      end: "2026-11-20",
      label: "5–20 Nov",
    },
    vibeStats: {
      id: "2",
      rating: 4.8,
      reviews: 14,
      tags: ["LagoonKayak", "DronePhoto", "Social"],
      lastDiscovery: "28m ago · Bacuit Bay",
    },
  },
  { 
    id: "3", 
    name: "Nara",  
    location: "Moalboal, Cebu",     
    hubId: "cebu",
    vibe: "Freediver & Kawasan Canyon Seeker",    
    status: "online",  
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=100&w=1600",
    lat: 9.9438,
    lng: 123.3688,
    verified: true,
    tripDates: {
      start: "2026-11-10",
      end: "2026-11-25",
      label: "10–25 Nov",
    },
    vibeStats: {
      id: "3",
      rating: 5.0,
      reviews: 24,
      tags: ["Freedive", "Mindful", "ReefSafe"],
      lastDiscovery: "5m ago · Panagsama",
    },
  },
  { 
    id: "4", 
    name: "Kevin", 
    location: "Coron Town, Palawan",       
    hubId: "coron",
    vibe: "Digital Nomad & Wreck Diver",   
    status: "offline", 
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=100&w=1600",
    lat: 11.9986,
    lng: 120.2043,
    verified: false,
    tripDates: {
      start: "2026-12-01",
      end: "2026-12-14",
      label: "1–14 Dec",
    },
    vibeStats: {
      id: "4",
      rating: 4.7,
      reviews: 9,
      tags: ["RemoteWork", "Scuba", "HotSprings"],
      lastDiscovery: "1h ago · Kayangan",
    },
  },
];
