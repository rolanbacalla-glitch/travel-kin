'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Globe,
    Shield,
    CheckCircle,
    MessageSquare,
    Hand,
    Compass,
    Navigation,
    UserCircle
} from 'lucide-react';
import { Button, Card, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { companions, experiences } from '@/lib/data';
import { useAuth, useToastActions } from '@/lib/hooks';
import { Companion, Experience } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CompanionPageProps {
    params: { id: string };
}

export default function CompanionPage({ params }: CompanionPageProps) {
    const companion = companions.find((c: Companion) => c.id === params.id);
    const { user, isAuthenticated, toggleWave } = useAuth();
    const { success } = useToastActions();

    if (!companion) {
        notFound();
    }

    const isWaved = user?.wavedCompanions?.includes(companion.id);
    const upcomingTrips = experiences.filter((e: Experience) =>
        e.participantIds.includes(companion.id) || e.hostId === companion.id
    );

    const handleWave = () => {
        toggleWave(companion.id);
        if (!isWaved) {
            success('Waved!', `You've expressed interest in connecting with ${companion.name}.`);
        }
    };

    return (
        <div className="min-h-screen pb-24 animate-fadeIn">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-sand-100 sticky top-14 md:top-16 z-30">
                <div className="section-container py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/companions"
                            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">All Companions</span>
                        </Link>
                        <div className="h-6 w-px bg-sand-200" />
                        <span className="font-semibold text-neutral-900">{companion.name}&apos;s Profile</span>
                    </div>
                    <Button
                        variant={isWaved ? 'secondary' : 'default'}
                        size="sm"
                        className="gap-2"
                        onClick={handleWave}
                    >
                        <Hand className={cn("w-4 h-4", isWaved && "fill-current")} />
                        {isWaved ? 'Waved' : 'Wave'}
                    </Button>
                </div>
            </div>

            <div className="section-container py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6 animate-slide-up">
                        {/* Profile Hero Card */}
                        <Card className="p-8 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sunset-100 to-transparent rounded-bl-full -mr-16 -mt-16 opacity-50" />

                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                                <Avatar className="w-32 h-32 ring-4 ring-white shadow-soft group-hover:scale-105 transition-transform duration-500">
                                    <AvatarImage src={companion.avatar} alt={companion.name} />
                                    <AvatarFallback className="text-4xl text-neutral-400 bg-sand-50">
                                        {companion.name[0]}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                        <h1 className="text-3xl font-bold text-neutral-900">{companion.name}</h1>
                                        {companion.verificationStatus === 'trusted' && (
                                            <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium ring-1 ring-green-200">
                                                <Shield className="w-3 h-3 fill-current" />
                                                Trusted
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-neutral-500 mb-6 font-medium">
                                        <div className="flex items-center gap-1.5 bg-sand-50 px-3 py-1 rounded-lg">
                                            <Globe className="w-4 h-4 text-neutral-400" />
                                            {companion.nationality}
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-sand-50 px-3 py-1 rounded-lg">
                                            <Calendar className="w-4 h-4 text-neutral-400" />
                                            {companion.ageRange} years
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-sand-50 px-3 py-1 rounded-lg capitalize">
                                            <Compass className="w-4 h-4 text-neutral-400" />
                                            {companion.travelStyle} style
                                        </div>
                                    </div>

                                    <div className="p-4 bg-sand-50/50 rounded-2xl border border-sand-100/50 group-hover:bg-sand-50 transition-colors">
                                        <p className="text-neutral-700 leading-relaxed italic">
                                            &quot;{companion.bio}&quot;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Interests & Languages */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-6 hover:shadow-soft-md transition-all duration-300 group">
                                <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                    <Hand className="w-5 h-5 text-sunset-500" />
                                    Interests
                                </h2>
                                <ChipGroup>
                                    {companion.interests.map((interest: string) => (
                                        <Chip key={interest} className="group-hover:bg-sand-100 transition-colors">
                                            {interest}
                                        </Chip>
                                    ))}
                                </ChipGroup>
                            </Card>

                            <Card className="p-6 hover:shadow-soft-md transition-all duration-300 group">
                                <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-ocean-500" />
                                    Languages
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {companion.languages.map((lang: string) => (
                                        <div key={lang} className="px-3 py-1.5 bg-ocean-50 text-ocean-700 rounded-lg text-sm font-medium border border-ocean-100">
                                            {lang}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Recent Reviews (Mock) */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Recent verification badges</h2>
                            <div className="space-y-4">
                                {companion.badges.map((badge: string) => (
                                    <div key={badge} className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-sand-200 bg-sand-50/30">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 capitalize">{badge}</p>
                                            <p className="text-sm text-neutral-500">Verified Travel Kin member</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 animate-reveal-right" style={{ animationDelay: '200ms' }}>
                        {/* Current Trip Card */}
                        <Card className="p-6 border-l-4 border-sunset-400">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 mb-4">
                                <Navigation className="w-5 h-5 text-sunset-500" />
                                Currently In
                            </h2>
                            <p className="text-3xl font-bold text-neutral-900 mb-2">{companion.currentLocation}</p>
                            <p className="text-neutral-500 flex items-center gap-2">
                                <Navigation className="w-3 h-3 rotate-45" />
                                Next: {companion.nextDestination}
                            </p>
                        </Card>

                        {/* Upcoming Shared Trips */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Upcoming Trips</h2>
                            {upcomingTrips.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingTrips.map((trip: Experience) => (
                                        <Link key={trip.id} href={`/experiences/${trip.id}`} className="block group">
                                            <div className="p-3 bg-sand-50 rounded-xl hover:bg-white hover:shadow-soft transition-all border border-transparent hover:border-sand-100">
                                                <p className="font-medium text-neutral-900 group-hover:text-sunset-600 transition-colors">
                                                    {trip.title}
                                                </p>
                                                <p className="text-xs text-neutral-500 mt-1">
                                                    {new Date(trip.date).toLocaleDateString()} · {trip.vibeTag}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-neutral-500 text-center py-4 italic">
                                    No public upcoming trips listed.
                                </p>
                            )}
                        </Card>

                        {/* Action CTA */}
                        <div className="sticky top-36 space-y-3">
                            <Button className="w-full text-base py-6 shadow-sunset-sm hover:shadow-sunset-md transition-shadow group">
                                Direct Message
                                <MessageSquare className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="secondary"
                                className="w-full text-base py-6 hover:bg-sand-50 transition-colors"
                                onClick={handleWave}
                            >
                                {isWaved ? 'Waved ✓' : 'Wave at ' + companion.name.split(' ')[0]}
                            </Button>
                            <p className="text-[10px] text-neutral-400 text-center uppercase tracking-wider font-semibold">
                                Messaging requires both users to wave
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
