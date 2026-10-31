import { ShieldCheck, Users, Compass, Globe, Mountain, Waves, TreePine, MapPin } from "lucide-react";

export const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Globe, Waves, Mountain, TreePine, MapPin, ShieldCheck, Users, Compass
  };
  return icons[iconName] || Globe;
};

export const HERO_IMAGES = [
  "https://images.pexels.com/photos/17263722/pexels-photo-17263722.jpeg?auto=compress&cs=tinysrgb&w=1920", // Cebu
  "https://images.pexels.com/photos/20788066/pexels-photo-20788066.jpeg?auto=compress&cs=tinysrgb&w=1920", // Batanes
  "https://images.pexels.com/photos/33676228/pexels-photo-33676228.jpeg?auto=compress&cs=tinysrgb&w=1920", // Boracay
  "https://images.pexels.com/photos/13518466/pexels-photo-13518466.jpeg?auto=compress&cs=tinysrgb&w=1920", // Coron
  "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=1920", // El Nido
  "https://images.pexels.com/photos/3533659/pexels-photo-3533659.jpeg?auto=compress&cs=tinysrgb&w=1920",  // Siargao
];

export const DESTINATION_HERO_IMAGES = [
  "https://images.pexels.com/photos/14634010/pexels-photo-14634010.jpeg?auto=compress&cs=tinysrgb&w=1920", // Siquijor
  "https://images.pexels.com/photos/29152393/pexels-photo-29152393.jpeg?auto=compress&cs=tinysrgb&w=1920", // Camiguin
  "https://images.pexels.com/photos/14386264/pexels-photo-14386264.jpeg?auto=compress&cs=tinysrgb&w=1920", // Sagada
  "https://images.pexels.com/photos/6877001/pexels-photo-6877001.jpeg?auto=compress&cs=tinysrgb&w=1920", // Puerto Princesa
  "https://images.pexels.com/photos/15258036/pexels-photo-15258036.jpeg?auto=compress&cs=tinysrgb&w=1920", // Bukidnon
];

export const GUIDE_DESTINATIONS = [
  {
    id: "siargao",
    title: "Siargao Island",
    tagline: "The Surfing Capital",
    desc: "More than just waves, Siargao offers a laid-back island vibe ideal for solo travellers. From the iconic Cloud 9 boardwalk to hidden lagoons and coconut palm corridors, it is a sanctuary where you will find your crew effortlessly.",
    image: "https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.5/10",
    rating: 4.9,
    tags: ["Surfing", "Island Life", "Social"],
    color: "bg-blue-500"
  },
  {
    id: "el-nido",
    title: "El Nido, Palawan",
    tagline: "The Last Frontier",
    desc: "Dramatic limestone cliffs, turquoise lagoons, and secret beaches. El Nido is the crown jewel of Palawan—perfect for solo boat expeditions where you can bond with fellow travellers over grilled seafood and golden-hour sunsets.",
    image: "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.2/10",
    rating: 4.8,
    tags: ["Nature", "Adventure", "Photography"],
    color: "bg-emerald-500"
  },
  {
    id: "boracay",
    title: "Boracay Island",
    tagline: "The Ivory Playground",
    desc: "Renowned for its powdery White Beach, Boracay is the ultimate place to unwind and socialise. Following its ecological restoration, it is cleaner and strictly regulated, making it remarkably safe for solo travellers to enjoy sunset paraw sailing and beachfront lounges.",
    image: "https://images.pexels.com/photos/33676228/pexels-photo-33676228.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "9.3/10",
    rating: 4.6,
    tags: ["Relaxation", "Nightlife", "Beach"],
    color: "bg-orange-400"
  },
  {
    id: "cebu",
    title: "Cebu & Moalboal",
    tagline: "The Adventure Hub",
    desc: "Swim alongside millions of sardines, canyon through Kawasan Falls, or dive with thresher sharks in Malapascua. Cebu is tailored for the solo traveller who craves a seamless blend of urban convenience and raw tropical nature.",
    image: "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800",
    safetyScore: "8.9/10",
    rating: 4.7,
    tags: ["Diving", "Canyoning", "Wildlife"],
    color: "bg-indigo-500"
  }
];

export interface DestinationMetadata {
  id: string;
  title: string;
  subtitle?: string;
  tagline: string;
  description?: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  icon: any;
  tag: string;
  region: string;
  vibe: string;
  gallery: string[];
  survivalGuide: {
    bestTime: string;
    connectivity: string;
    transport: string;
    cash: string;
  };
  soloStats: {
    soloRatio: string;
    avgAge: string;
    crewChemistry: string;
    activeKinsCount: number;
  };
  localGuide: {
    name: string;
    role: string;
    avatar: string;
    specialty: string;
    tripsLed: number;
    rating: number;
  };
}

const DEFAULT_GALLERY = [
  "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3533659/pexels-photo-3533659.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/13518466/pexels-photo-13518466.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const DEFAULT_SURVIVAL_GUIDE = {
  bestTime: "November – May (Dry tropical season with calm seas)",
  connectivity: "5G/LTE in town centres; Starlink at verified Kin co-working cafés",
  transport: "Verified tricycles, scooter rentals (international licence required) & island ferries",
  cash: "GCash widely accepted; carry PHP cash for outer-island boat crews",
};

const DEFAULT_SOLO_STATS = {
  soloRatio: "94% Solo Travellers",
  avgAge: "25 – 38 yrs",
  crewChemistry: "Balanced · Golden-Hour Social & Daytime Autonomy",
  activeKinsCount: 18,
};

const DEFAULT_LOCAL_GUIDE = {
  name: "Kuya Marco Santos",
  role: "Lead Archipelago Navigator",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  specialty: "Secret Lagoon Routes & Reef Conservation",
  tripsLed: 142,
  rating: 4.98,
};

const rawDestinations = [
  {
    id: "philippines",
    title: "The Philippines",
    subtitle: "7,641 Islands of Wonder",
    tagline: "Crystal waters, limestone cliffs & the world's best beaches",
    description: "An archipelago of 7,641 islands where emerald lagoons meet warm community hospitality. Travel Kin connects you with verified solo companions and vetted local skippers across Luzon, Visayas, and Mindanao.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1280&auto=format&fit=crop",
    price: "From £350",
    rating: 4.9,
    reviews: 15420,
    icon: Globe,
    tag: "islands",
    region: "Southeast Asia",
    vibe: "Diverse & Vast",
    soloStats: {
      soloRatio: "96% Solo Travellers",
      avgAge: "24 – 39 yrs",
      crewChemistry: "High-Trust · Island-Hopping Crews",
      activeKinsCount: 128,
    },
  },
  {
    id: "siargao",
    title: "Siargao Island",
    subtitle: "Mindanao's Teardrop Gem",
    tagline: "The Social Heartbeat",
    description: "From dawn patrols at Cloud 9 to golden-hour scooter loops beneath coconut palms in Maasin and secret tide pools at Magpupungko, Siargao is the undisputed capital for solo connection in the Philippines.",
    image: "https://images.pexels.com/photos/3533659/pexels-photo-3533659.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    region: "Mindanao",
    vibe: "Electric & Communal",
    tag: "islands",
    price: "From £280",
    reviews: 765,
    icon: Waves,
    gallery: [
      "https://images.pexels.com/photos/3533659/pexels-photo-3533659.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    survivalGuide: {
      bestTime: "March – October (Peak surf swell & sunny island days)",
      connectivity: "Starlink hubs across General Luna; Globe/Smart 4G along tourism road",
      transport: "Scooter with surfboard rack (£6/day) or shared bao-bao tuk-tuks",
      cash: "Bring PHP cash from Surigao/Cebu; ATMs in General Luna can queue on weekends",
    },
    soloStats: {
      soloRatio: "97% Solo Travellers",
      avgAge: "24 – 35 yrs",
      crewChemistry: "Surf-by-Day · Communal Sunset Dinners",
      activeKinsCount: 42,
    },
    localGuide: {
      name: "Alonzo 'Bong' Daza",
      role: "Cloud 9 Surf & Lagoon Skipper",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      specialty: "Sugba Lagoon Private Bangka & Secret Breaks",
      tripsLed: 218,
      rating: 4.99,
    },
  },
  {
    id: "el-nido",
    title: "El Nido, Palawan",
    subtitle: "Bacuit Bay Sanctuary",
    tagline: "The Archipelago King",
    description: "Towering karst cathedrals guarding gin-clear lagoons. Instead of crowded mega-boats, your Travel Kin crew charters private early-bird outriggers to reach Big Lagoon and Nacpan Beach before anyone else.",
    image: "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    region: "Palawan",
    vibe: "Majestic & Explorative",
    tag: "islands",
    price: "From £499",
    reviews: 1240,
    icon: Waves,
    gallery: [
      "https://images.pexels.com/photos/13874296/pexels-photo-13874296.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/13518466/pexels-photo-13518466.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    survivalGuide: {
      bestTime: "December – May (Mirror-flat Bacuit Bay crossings)",
      connectivity: "Fibre Wi-Fi in Town Proper & Corong-Corong; offline maps for boat tours",
      transport: "Direct AirSWIFT flight to Lio Airport (ENI) or 5h van from Puerto Princesa",
      cash: "BPI & Euronet ATMs in town; cards accepted at Lio Beach & boutique resorts",
    },
    soloStats: {
      soloRatio: "92% Solo Travellers",
      avgAge: "26 – 38 yrs",
      crewChemistry: "Kayak Expeditions & Beachfront Bonfires",
      activeKinsCount: 34,
    },
    localGuide: {
      name: "Tala Macasaet",
      role: "Bacuit Marine Ecologist & Guide",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
      specialty: "Off-Hour Lagoon Kayaking & Multi-Day Linapacan Camp",
      tripsLed: 164,
      rating: 4.97,
    },
  },
  {
    id: "coron",
    title: "Coron, Palawan",
    subtitle: "Calamian Islands",
    tagline: "The Deep Sea Frontier",
    description: "Home to Kayangan Lake, Twin Lagoon, and world-famous historic shipwrecks resting beneath coral gardens. Built for adventurous solo travellers who love freediving, thermal springs, and raw island horizons.",
    image: "https://images.pexels.com/photos/13518466/pexels-photo-13518466.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    region: "Palawan",
    vibe: "Raw & Adventurous",
    tag: "islands",
    price: "From £450",
    reviews: 865,
    icon: Waves,
  },
  {
    id: "cebu",
    title: "Cebu & Moalboal",
    subtitle: "Queen City of the South",
    tagline: "The Adventure Nexus",
    description: "Leap into turquoise canyons at Kawasan Falls, freedive through Moalboal's Swirling Sardine Run, and unwind with verified solo crews along Panagsama Beach.",
    image: "https://images.pexels.com/photos/17263722/pexels-photo-17263722.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    region: "Visayas",
    vibe: "Vibrant & Thrilling",
    tag: "islands",
    price: "From £380",
    reviews: 1540,
    icon: Waves,
  },
  {
    id: "siquijor",
    title: "Siquijor Island",
    subtitle: "The Island of Fireflies",
    tagline: "The Mystic Sanctuary",
    image: "https://images.pexels.com/photos/14634010/pexels-photo-14634010.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    region: "Visayas",
    vibe: "Ethereal & Tranquil",
    tag: "islands",
    price: "From £220",
    reviews: 430,
    icon: Waves,
  },
  {
    id: "boracay",
    title: "Boracay Island",
    subtitle: "Western Visayas",
    tagline: "The Ivory Playground",
    image: "https://images.pexels.com/photos/33676228/pexels-photo-33676228.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    region: "Visayas",
    vibe: "Vibrant & Pristine",
    tag: "islands",
    price: "From £320",
    reviews: 980,
    icon: Waves,
  },
  {
    id: "batanes",
    title: "Batanes Islands",
    subtitle: "Northernmost Frontier",
    tagline: "The Northern Soul",
    image: "https://images.pexels.com/photos/20788066/pexels-photo-20788066.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 5.0,
    region: "Northern Luzon",
    vibe: "Majestic & Tranquil",
    tag: "mountains",
    price: "From £450",
    reviews: 320,
    icon: Mountain,
  },
  {
    id: "camiguin",
    title: "Camiguin Island",
    subtitle: "Northern Mindanao",
    tagline: "The Island Born of Fire",
    image: "https://images.pexels.com/photos/29152393/pexels-photo-29152393.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    region: "Mindanao",
    vibe: "Ethereal & Volcanic",
    tag: "islands",
    price: "From £260",
    reviews: 215,
    icon: Waves,
  },
  {
    id: "bohol",
    title: "Bohol",
    subtitle: "Central Visayas",
    tagline: "Chocolate Hills & Tarsiers",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    region: "Visayas",
    vibe: "Natural & Curious",
    tag: "islands",
    price: "From £310",
    reviews: 890,
    icon: Waves,
  },
  {
    id: "sagada",
    title: "Sagada",
    subtitle: "Cordillera Highlands",
    tagline: "Clouds & Hanging Coffins",
    image: "https://images.pexels.com/photos/14386264/pexels-photo-14386264.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    region: "Mountain Province",
    vibe: "Mystical & Chilly",
    tag: "mountains",
    price: "From £290",
    reviews: 560,
    icon: Mountain,
  },
  {
    id: "vigan",
    title: "Vigan City",
    subtitle: "UNESCO Heritage Town",
    tagline: "Spanish Colonial Heritage",
    image: "https://images.pexels.com/photos/4175000/pexels-photo-4175000.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    region: "Ilocos Sur",
    vibe: "Historic & Timeless",
    tag: "cities",
    price: "From £240",
    reviews: 1200,
    icon: MapPin,
  },
  {
    id: "puerto-princesa",
    title: "Puerto Princesa",
    subtitle: "Eco-Capital of Palawan",
    tagline: "Subterranean River Wonders",
    image: "https://images.pexels.com/photos/6877001/pexels-photo-6877001.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    region: "Palawan",
    vibe: "Wild & Lush",
    tag: "jungles",
    price: "From £360",
    reviews: 1100,
    icon: TreePine,
  },
  {
    id: "manila",
    title: "Metro Manila",
    subtitle: "Intramuros to BGC",
    tagline: "The Pulse of the Pearl",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    region: "Luzon",
    vibe: "Dynamic & Urban",
    tag: "cities",
    price: "From £180",
    reviews: 25000,
    icon: MapPin,
  },
  {
    id: "davao",
    title: "Davao City",
    subtitle: "Mount Apo Gateway",
    tagline: "The Durian Capital",
    image: "https://images.pexels.com/photos/17393889/pexels-photo-17393889.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    region: "Mindanao",
    vibe: "Orderly & Tropical",
    tag: "cities",
    price: "From £210",
    reviews: 3400,
    icon: MapPin,
  },
  {
    id: "bukidnon",
    title: "Bukidnon",
    subtitle: "Mindanao Highland Plateau",
    tagline: "Pineapples & Highlands",
    image: "https://images.pexels.com/photos/15258036/pexels-photo-15258036.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    region: "Northern Mindanao",
    vibe: "Fresh & Scenic",
    tag: "mountains",
    price: "From £270",
    reviews: 420,
    icon: Mountain,
  },
];

export const destinations: DestinationMetadata[] = rawDestinations.map((d: any) => ({
  ...d,
  subtitle: d.subtitle ?? d.region,
  gallery: d.gallery ?? DEFAULT_GALLERY,
  survivalGuide: d.survivalGuide ?? DEFAULT_SURVIVAL_GUIDE,
  soloStats: d.soloStats ?? DEFAULT_SOLO_STATS,
  localGuide: d.localGuide ?? DEFAULT_LOCAL_GUIDE,
}));

export const features = [
  {
    icon: ShieldCheck,
    title: "Verified Companions",
    desc: "Every member is ID-verified and background-checked so you can trust who you wander with.",
    color: "bg-ocean/10 text-ocean",
  },
  {
    icon: Users,
    title: "Solo-First Matching",
    desc: "Our algorithm connects you with travellers who share your pace, interests, and vibe.",
    color: "bg-sunset/10 text-sunset",
  },
  {
    icon: Compass,
    title: "Local Expert Guides",
    desc: "Access a vetted network of local guides who know the hidden beaches and untouched trails.",
    color: "bg-terra/10 text-terra",
  },
  {
    icon: Globe,
    title: "24/7 Safety Support",
    desc: "Round-the-clock emergency support and real-time location sharing with trusted contacts.",
    color: "bg-ocean/10 text-ocean",
  },
];

export const testimonials = [
  {
    name: "Mia Reyes",
    origin: "Manila → Siargao",
    quote:
      "I was terrified to travel alone. Travel Kin matched me with people who became my closest friends. That wave I caught? Life-changing.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Leo Chen",
    origin: "Singapore → El Nido",
    quote:
      "The local guide recommendation was gold. Hidden lagoons, zero tourists. This is how solo travel should feel — free, safe, and epic.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Elena Rossi",
    origin: "Rome → Boracay",
    quote:
      "The safety features gave my parents peace of mind and gave me freedom. Best of both worlds for exploring solo.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
    rating: 5,
  },
];

export const stats = [
  {
    value: "47K+",
    label: "Solo Travellers",
    description: "Verified solo explorers adventuring safely across Southeast Asia.",
    href: "/dashboard"
  },
  {
    value: "87",
    label: "Destinations",
    description: "Curated islands, cities, and jungle escapes across the Philippines and beyond.",
    href: "/destinations"
  },
  {
    value: "24/7",
    label: "Emergency Support",
    description: "Real-time monitoring and local rapid response in 12 SE Asian countries.",
    href: "/safety-commitment"
  },
  {
    value: "180+",
    label: "Local Guides",
    description: "Vetted, community-trusted guides who know every hidden trail and reef.",
    href: "/guides"
  },
];

export const tickerItems = [
  "El Nido · Palawan",
  "Siargao · Surf Capital",
  "Boracay · White Beach",
  "Cebu · Canyoneering",
  "Coron · Wreck Diving",
  "Camiguin · Island Life",
  "Bohol · Tarsiers & Rice",
  "Batanes · Edge of the World",
];
