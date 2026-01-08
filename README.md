# Travel Kin - Social Travel Companion

A production-ready, responsive web app for solo travellers to explore Southeast Asia destinations, find travel companions, and join local experiences—with safety deeply integrated.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?logo=tailwindcss)

## ✨ Features

- **Explore Destinations** - Discover the vibe of El Nido, Boracay, Siargao, Bali, and Chiang Mai
- **Join Experiences** - Browse and join local adventures hosted by travellers and locals
- **Find Companions** - Match with solo travellers heading the same way
- **Safety First** - Verification badges, public meetups, emergency info

## 🎨 Design

Apple-inspired aesthetic with:
- Golden-hour colour palette (sand, ocean, sunset tones)
- Glassmorphism navigation
- Soft shadows and smooth transitions
- Responsive design (desktop + mobile)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
app/
├── page.tsx              # Landing page
├── sign-in/              # Authentication
├── sign-up/
└── (main)/               # App shell
    ├── destinations/     # List, detail, map
    ├── experiences/      # List, detail, create
    ├── companions/       # Discovery feed
    ├── profile/          # User profile
    └── safety/           # Safety centre

components/
├── ui/                   # Button, Card, Input, etc.
├── shared/               # Chip, EmptyState, Loading
└── layout/               # Navbar, Footer

lib/
├── data/                 # Mock data
├── hooks/                # useAuth, useToast
├── types.ts              # TypeScript interfaces
└── utils.ts              # Helper functions
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: shadcn/ui-inspired custom components
- **Maps**: Leaflet with OpenStreetMap
- **State**: React Context + localStorage

## 📝 License

MIT
