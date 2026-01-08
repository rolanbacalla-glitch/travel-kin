'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, X, MapPin, Clock, Users, Utensils, Waves, Music, Mountain, Landmark } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { Chip } from '@/components/shared';
import { destinations, experiences } from '@/lib/data';
import { Destination, Experience } from '@/lib/types';
import { formatDate, formatTime, getPriceDisplay } from '@/lib/utils';

// Dynamic import for Leaflet (client-side only)
const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
);

interface MapPageProps {
    params: { id: string };
}

const categoryIcons: Record<string, React.ElementType> = {
    food: Utensils,
    island: Waves,
    nightlife: Music,
    hike: Mountain,
    culture: Landmark,
};

export default function MapPage({ params }: MapPageProps) {
    const destination = destinations.find((d: Destination) => d.id === params.id);
    const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    // Make sure we're on the client
    useState(() => {
        setIsClient(true);
    });

    if (!destination) {
        notFound();
    }

    const destinationExperiences = experiences.filter(
        (exp: Experience) => exp.destinationId === destination.id
    );

    const selectedExp = destinationExperiences.find((e: Experience) => e.id === selectedExperience);

    return (
        <div className="h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-sand-100 px-4 py-3 flex items-center gap-4 sticky top-14 md:top-16 z-30 animate-fadeIn">
                <Link
                    href={`/destinations/${destination.id}`}
                    className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-all hover:-translate-x-1"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back to {destination.name}</span>
                </Link>
                <div className="h-6 w-px bg-sand-200" />
                <h1 className="font-semibold text-neutral-900">{destination.name} Experiences</h1>
            </div>

            {/* Map & Sidebar */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Sidebar - Experience List */}
                <div className="md:w-80 lg:w-96 bg-sand-50 border-r border-sand-100 overflow-y-auto order-2 md:order-1 h-1/2 md:h-full">
                    <div className="p-4 space-y-3">
                        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                            {destinationExperiences.length} Experiences
                        </h2>
                        {destinationExperiences.map((exp: Experience) => {
                            const Icon = categoryIcons[exp.category] || MapPin;
                            const isSelected = selectedExperience === exp.id;

                            return (
                                <button
                                    key={exp.id}
                                    onClick={() => setSelectedExperience(exp.id)}
                                    className={`w-full text-left rounded-xl p-4 transition-all duration-300 group ${isSelected
                                        ? 'bg-white shadow-soft-md ring-2 ring-sunset-400'
                                        : 'bg-white shadow-soft hover:shadow-soft-md hover:-translate-y-0.5'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isSelected ? 'bg-sunset-100' : 'bg-sand-100 group-hover:bg-sand-200'
                                            }`}>
                                            <Icon className={`w-5 h-5 transition-colors duration-300 ${isSelected ? 'text-sunset-600' : 'text-neutral-600 group-hover:text-neutral-900'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-medium truncate transition-colors duration-300 ${isSelected ? 'text-sunset-900' : 'text-neutral-900'}`}>
                                                {exp.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {formatDate(exp.date)} · {formatTime(exp.time)}
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Chip className="text-xs py-1 transition-colors group-hover:bg-sand-100">{exp.category}</Chip>
                                                <span className="text-sm text-neutral-500">
                                                    {getPriceDisplay(exp.priceLevel)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}

                        {destinationExperiences.length === 0 && (
                            <div className="text-center py-8 text-neutral-500">
                                No experiences available yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Map */}
                <div className="flex-1 relative order-1 md:order-2 h-1/2 md:h-full">
                    {isClient && (
                        <MapContainer
                            center={[destination.coordinates.lat, destination.coordinates.lng]}
                            zoom={13}
                            className="h-full w-full"
                            style={{ zIndex: 0 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {destinationExperiences.map((exp: Experience) => (
                                <Marker
                                    key={exp.id}
                                    position={[exp.meetingPointCoords.lat, exp.meetingPointCoords.lng]}
                                    eventHandlers={{
                                        click: () => setSelectedExperience(exp.id),
                                    }}
                                >
                                    <Popup>
                                        <div className="p-2">
                                            <p className="font-medium">{exp.title}</p>
                                            <p className="text-sm text-neutral-500">{exp.meetingPoint}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    )}

                    {/* Selected Experience Card Overlay */}
                    {selectedExp && (
                        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-10 animate-slide-up">
                            <Card className="p-4 backdrop-blur-xl bg-white/90 shadow-soft-xl border-white/50">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="font-semibold text-neutral-900">{selectedExp.title}</h3>
                                    <button
                                        onClick={() => setSelectedExperience(null)}
                                        className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-sunset-500 animate-pulse" />
                                        {formatTime(selectedExp.time)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4 text-ocean-500" />
                                        {selectedExp.currentParticipants}/{selectedExp.capacity}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                    {selectedExp.description}
                                </p>
                                <Link href={`/experiences/${selectedExp.id}`}>
                                    <Button className="w-full shadow-sunset-sm hover:shadow-sunset-md active:scale-[0.98] transition-all">
                                        View details
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
