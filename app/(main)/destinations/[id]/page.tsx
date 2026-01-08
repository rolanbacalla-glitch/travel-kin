'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Shield, Map, ChevronRight } from 'lucide-react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { destinations } from '@/lib/data';
import { Destination, Neighbourhood } from '@/lib/types';

interface DestinationPageProps {
    params: { id: string };
}

export default function DestinationPage({ params }: DestinationPageProps) {
    const destination = destinations.find((d: Destination) => d.id === params.id);

    if (!destination) {
        notFound();
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[300px] sm:h-[400px]">
                <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <Link
                    href="/destinations"
                    className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-xl text-white px-4 py-2 rounded-xl text-sm hover:bg-white/40 transition-all shadow-soft border border-white/20 group z-20"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back
                </Link>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 animate-slide-up">
                    <div className="section-container">
                        <div className="flex items-center gap-2 text-white/80 text-sm mb-2 translate-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700 fill-mode-forwards">
                            <MapPin className="w-4 h-4 text-sunset-400" />
                            {destination.country}
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                            {destination.name}
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
                            {destination.vibeStatement}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="section-container py-8 animate-fadeIn">
                {/* Map Button */}
                <Link href={`/destinations/${destination.id}/map`} className="inline-block group">
                    <Button variant="secondary" className="gap-2 mb-8 shadow-soft-sm hover:shadow-soft transition-all rounded-xl py-6 px-6">
                        <Map className="w-5 h-5 text-ocean-500 group-hover:rotate-12 transition-transform" />
                        <span className="text-base">View experiences on map</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="neighbourhoods">Neighbourhoods</TabsTrigger>
                        <TabsTrigger value="safety">Safety</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">About {destination.name}</h2>
                            <p className="text-neutral-600 leading-relaxed mb-6">
                                {destination.overview}
                            </p>
                            <h3 className="text-lg font-medium text-neutral-900 mb-3">Popular activities</h3>
                            <ChipGroup>
                                <Chip>Island hopping</Chip>
                                <Chip>Snorkeling</Chip>
                                <Chip>Beach bars</Chip>
                                <Chip>Kayaking</Chip>
                                <Chip>Sunset watching</Chip>
                            </ChipGroup>
                        </div>
                    </TabsContent>

                    <TabsContent value="neighbourhoods" className="mt-6">
                        <div className="space-y-4">
                            {destination.neighbourhoods.map((neighbourhood: Neighbourhood, index: number) => (
                                <div
                                    key={neighbourhood.id}
                                    className="bg-white rounded-2xl p-6 shadow-soft transition-all duration-300 hover:shadow-soft-md group animate-reveal-left"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-sunset-600 transition-colors">
                                            {neighbourhood.name}
                                        </h3>
                                        <Chip variant="vibe" vibe={neighbourhood.vibe.toLowerCase().split(' ')[0]} className="shadow-sm">
                                            {neighbourhood.vibe}
                                        </Chip>
                                    </div>
                                    <p className="text-neutral-600 leading-relaxed">{neighbourhood.description}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="safety" className="mt-6">
                        <div className="bg-white rounded-2xl p-6 shadow-soft">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-neutral-900">Safety Tips</h2>
                            </div>
                            <ul className="space-y-3">
                                {destination.safetyTips.map((tip: string, index: number) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-sand-100 text-neutral-600 text-sm font-medium flex items-center justify-center shrink-0">
                                            {index + 1}
                                        </span>
                                        <span className="text-neutral-600">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-sand-100">
                                <Link href="/safety">
                                    <Button variant="ghost" className="gap-2">
                                        <Shield className="w-4 h-4" />
                                        View Safety Centre
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
