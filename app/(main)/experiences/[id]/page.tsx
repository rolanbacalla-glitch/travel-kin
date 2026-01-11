'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    MapPin,
    Shield,
    CheckCircle,
    AlertCircle,
    Phone,
    Utensils,
    Waves,
    Music,
    Mountain,
    Landmark
} from 'lucide-react';
import { Button, Card, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { useToastActions, useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { experiences, companions, destinations } from '@/lib/data';
import { Experience, Companion, Destination } from '@/lib/types';
import { formatDate, formatTime, getPriceDisplay, cn } from '@/lib/utils';

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

interface ExperiencePageProps {
    params: { id: string };
}

const categoryIcons: Record<string, React.ElementType> = {
    food: Utensils,
    island: Waves,
    nightlife: Music,
    hike: Mountain,
    culture: Landmark,
};

export default function ExperiencePage({ params }: ExperiencePageProps) {
    const [isClient, setIsClient] = useState(false);
    const { success } = useToastActions();

    useState(() => {
        setIsClient(true);
    });

    const experience = experiences.find((e: Experience) => e.id === params.id);

    if (!experience) {
        notFound();
    }

    const host = companions.find((c: Companion) => c.id === experience.hostId);
    const destination = destinations.find((d: Destination) => d.id === experience.destinationId);
    const participants = companions.filter((c: Companion) => experience.participantIds.includes(c.id));
    const spotsLeft = experience.capacity - experience.currentParticipants;
    const Icon = categoryIcons[experience.category] || MapPin;

    const { user, isAuthenticated, requestToJoin } = useAuth();
    const router = useRouter();

    const requestSent = user?.requests?.some(r => r.experienceId === experience.id);

    const handleRequestJoin = () => {
        if (!isAuthenticated) {
            router.push('/sign-in');
            return;
        }
        if (!requestSent) {
            requestToJoin(experience.id);
            success('Request sent!', `${host?.name || 'The host'} will review your request.`);
        }
    };

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-sand-100 sticky top-14 md:top-16 z-30 transition-all duration-300">
                <div className="section-container py-4 flex items-center gap-4">
                    <Link
                        href="/experiences"
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>
                    <div className="h-6 w-px bg-sand-200" />
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <MapPin className="w-4 h-4" />
                        {destination?.name}
                    </div>
                </div>
            </div>

            <div className="section-container py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 animate-slide-up">
                        {/* Title Card */}
                        <Card className="p-6 transition-all duration-300 hover:shadow-soft-md group">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-sand-100 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                                    <Icon className="w-7 h-7 text-neutral-600 group-hover:text-sunset-600 transition-colors" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                                        {experience.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <Chip variant="vibe" vibe={experience.vibeTag} className="capitalize">
                                            {experience.vibeTag}
                                        </Chip>
                                        <Chip className="capitalize">{experience.category}</Chip>
                                        <span className="text-neutral-500">{getPriceDisplay(experience.priceLevel)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Date, Time, Duration */}
                            <div className="grid sm:grid-cols-3 gap-4 p-4 bg-sand-50/50 rounded-xl group-hover:bg-sand-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-sunset-500 animate-pulse" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Date</p>
                                        <p className="font-medium text-neutral-900">{formatDate(experience.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-ocean-500 animate-pulse" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Time</p>
                                        <p className="font-medium text-neutral-900">{formatTime(experience.time)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-neutral-400 group-hover:text-ocean-400 transition-colors" />
                                    <div>
                                        <p className="text-xs text-neutral-500">Capacity</p>
                                        <p className="font-medium text-neutral-900">
                                            {experience.currentParticipants}/{experience.capacity} joined
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Description */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">About this experience</h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {experience.description}
                            </p>

                            <h3 className="font-medium text-neutral-900 mb-3">What to bring</h3>
                            <ul className="space-y-2">
                                {experience.whatToBring.map((item: string, index: number) => (
                                    <li key={index} className="flex items-center gap-2 text-neutral-600">
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Meeting Point */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Meeting point</h2>
                            <div className="flex items-start gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-sunset-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-neutral-900">{experience.meetingPoint}</p>
                                    <p className="text-sm text-neutral-500">Exact location shared after approval</p>
                                </div>
                            </div>

                            {isClient && (
                                <div className="h-48 rounded-xl overflow-hidden">
                                    <MapContainer
                                        center={[experience.meetingPointCoords.lat, experience.meetingPointCoords.lng]}
                                        zoom={15}
                                        className="h-full w-full"
                                        style={{ zIndex: 0 }}
                                        scrollWheelZoom={false}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[experience.meetingPointCoords.lat, experience.meetingPointCoords.lng]} />
                                    </MapContainer>
                                </div>
                            )}
                        </Card>

                        {/* Safety Notes */}
                        <Card className="p-6 border-l-4 border-green-500 transition-all duration-300 hover:shadow-soft-md group">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                                <h2 className="text-lg font-semibold text-neutral-900">Safety notes</h2>
                            </div>
                            <ul className="space-y-3">
                                {experience.safetyNotes.map((note: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-neutral-600">{note}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-4 border-t border-sand-100">
                                <Link href="/safety" className="text-sm text-ocean-600 hover:underline inline-flex items-center gap-1 group/link">
                                    View Safety Centre
                                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 animate-reveal-right" style={{ animationDelay: '200ms' }}>
                        {/* Host Card */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Your host</h2>
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="w-14 h-14">
                                    <AvatarImage src={host?.avatar} alt={host?.name} />
                                    <AvatarFallback>{host?.name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-neutral-900">{host?.name}</p>
                                        {host?.verificationStatus === 'trusted' && (
                                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                                Trusted
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-neutral-500">{host?.nationality}</p>
                                </div>
                            </div>
                            <p className="text-sm text-neutral-600 mb-4">{host?.bio}</p>
                            <ChipGroup>
                                {host?.badges?.slice(0, 3).map((badge: string) => (
                                    <Chip key={badge} className="text-xs">{badge}</Chip>
                                ))}
                            </ChipGroup>
                        </Card>

                        {/* Participants */}
                        <Card className="p-6 group transition-all duration-300 hover:shadow-soft-md">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                                Who&apos;s joining ({experience.currentParticipants})
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {participants.slice(0, 6).map((p: Companion) => (
                                    <Avatar key={p.id} className="w-10 h-10 border-2 border-white shadow-soft hover:scale-110 hover:-translate-y-1 transition-transform">
                                        <AvatarImage src={p.avatar} alt={p.name} />
                                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                                    </Avatar>
                                ))}
                                {experience.currentParticipants > 6 && (
                                    <div className="w-10 h-10 rounded-full bg-sand-200 flex items-center justify-center text-sm font-medium text-neutral-600 hover:bg-sand-300 transition-colors cursor-default">
                                        +{experience.currentParticipants - 6}
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Join CTA */}
                        <Card className="p-6 sticky top-36">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-neutral-900">
                                    {getPriceDisplay(experience.priceLevel)}
                                </span>
                                <span className={cn(
                                    'text-sm font-medium',
                                    spotsLeft <= 2 ? 'text-sunset-600' : 'text-neutral-500'
                                )}>
                                    {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                                </span>
                            </div>

                            <Button
                                className="w-full mb-3"
                                disabled={requestSent || spotsLeft === 0}
                                onClick={handleRequestJoin}
                            >
                                {requestSent ? 'Request sent ✓' : spotsLeft === 0 ? 'Fully booked' : 'Request to join'}
                            </Button>

                            {!requestSent && (
                                <p className="text-xs text-neutral-500 text-center">
                                    The host will review your profile before accepting
                                </p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
