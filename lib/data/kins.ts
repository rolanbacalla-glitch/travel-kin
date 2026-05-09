export interface Kin {
  id: string;
  name: string;
  location: string;
  vibe: string;
  status: "online" | "away" | "offline";
  image: string;
  lat: number;
  lng: number;
  verified: boolean;
}

export const KINS: Kin[] = [
  { 
    id: "1", 
    name: "Suki",  
    location: "Chiang Mai", 
    vibe: "Street Food Gourmet, Quiet Explorer",  
    status: "online",  
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=100&w=1600",
    lat: 18.7950,
    lng: 98.9950,
    verified: true,
  },
  { 
    id: "2", 
    name: "Liam",  
    location: "Bangkok",    
    vibe: "Urban Adventurer, Rooftop Specialist",  
    status: "away",    
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=100&w=1600",
    lat: 13.7563,
    lng: 100.5018,
    verified: false,
  },
  { 
    id: "3", 
    name: "Nara",  
    location: "Phuket",     
    vibe: "Mindful Wanderer, Sunrise Seeker",    
    status: "online",  
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=100&w=1600",
    lat: 7.8804,
    lng: 98.3923,
    verified: true,
  },
  { 
    id: "4", 
    name: "Kevin", 
    location: "Bali",       
    vibe: "Digital Nomad, Wave Rider",   
    status: "offline", 
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=100&w=1600",
    lat: -8.4095,
    lng: 115.1889,
    verified: false,
  },
];
