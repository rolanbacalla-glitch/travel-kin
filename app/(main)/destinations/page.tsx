'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';
import { Input, Card } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { destinations } from '@/lib/data';
import { Destination, Neighbourhood } from '@/lib/types';

export default function DestinationsPage() {
    const [search, setSearch] = useState('');

    const filteredDestinations = destinations.filter((dest: Destination) =>
        dest.name.toLowerCase().includes(search.toLowerCase()) ||
        dest.country.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="section-container py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Destinations</h1>
                <p className="text-neutral-500">Explore the vibe of each place before you go</p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                    type="text"
                    placeholder="Search destinations..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    className="pl-12"
                />
            </div>

            {/* Destinations Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination: Destination, index: number) => (
                    <Link
                        key={destination.id}
                        href={`/destinations/${destination.id}`}
                        className="animate-reveal-left"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <Card interactive className="overflow-hidden h-full group">
                            <div className="relative h-48">
                                <Image
                                    src={destination.heroImage}
                                    alt={destination.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex items-center gap-1 text-white/80 text-sm mb-1">
                                        <MapPin className="w-4 h-4" />
                                        {destination.country}
                                    </div>
                                    <h2 className="text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">{destination.name}</h2>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                    {destination.vibeStatement}
                                </p>
                                <ChipGroup>
                                    {destination.neighbourhoods.slice(0, 3).map((n: Neighbourhood) => (
                                        <Chip key={n.id} className="text-xs group-hover:bg-sand-100 transition-colors">
                                            {n.name}
                                        </Chip>
                                    ))}
                                </ChipGroup>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredDestinations.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-neutral-500">No destinations found matching &quot;{search}&quot;</p>
                </div>
            )}
        </div>
    );
}
