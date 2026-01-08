'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Calendar,
    Clock,
    Users,
    MapPin,
    Plus,
    Utensils,
    Waves,
    Music,
    Mountain,
    Landmark,
    Shield,
    Trash2,
    Edit
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { Chip, ChipGroup, EmptyState } from '@/components/shared';
import { companions, destinations } from '@/lib/data';
import { Experience, Companion, Destination } from '@/lib/types';
import { formatDate, formatTime, getPriceDisplay, getVibeColor, cn } from '@/lib/utils';
import { useAuth, useExperiences, useToastActions } from '@/lib/hooks';

const categoryIcons: Record<string, React.ElementType> = {
    food: Utensils,
    island: Waves,
    nightlife: Music,
    hike: Mountain,
    culture: Landmark,
};

const categories = ['all', 'food', 'island', 'nightlife', 'hike', 'culture'];
const vibes = ['all', 'chill', 'party', 'adventurous', 'mixed'];

export default function ExperiencesPage() {
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { experiences, deleteExperience } = useExperiences();
    const { success } = useToastActions();

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [vibeFilter, setVibeFilter] = useState('all');

    const filteredExperiences = experiences.filter((exp: Experience) => {
        const matchesSearch = exp.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || exp.category === categoryFilter;
        const matchesVibe = vibeFilter === 'all' || exp.vibeTag === vibeFilter;
        return matchesSearch && matchesCategory && matchesVibe;
    });

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault(); // Prevent navigation
        if (confirm('Are you sure you want to delete this experience?')) {
            deleteExperience(id);
            success('Experience deleted', 'The experience has been removed.');
        }
    };

    const getHost = (hostId: string) => companions.find((c: Companion) => c.id === hostId);
    const getDestination = (destId: string) => destinations.find((d: Destination) => d.id === destId);

    return (
        <div className="section-container py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Experiences</h1>
                    <p className="text-neutral-500">Join or host local adventures with fellow travellers</p>
                </div>
                <Link href="/experiences/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Host experience
                    </Button>
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="space-y-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <Input
                        type="text"
                        placeholder="Search experiences..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        className="pl-12"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Category Filter */}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-500 mb-2">Category</p>
                        <ChipGroup>
                            {categories.map((cat: string) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                >
                                    <Chip
                                        variant={categoryFilter === cat ? 'active' : 'default'}
                                        className="capitalize cursor-pointer"
                                    >
                                        {cat}
                                    </Chip>
                                </button>
                            ))}
                        </ChipGroup>
                    </div>

                    {/* Vibe Filter */}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-500 mb-2">Vibe</p>
                        <ChipGroup>
                            {vibes.map((vibe: string) => (
                                <button
                                    key={vibe}
                                    onClick={() => setVibeFilter(vibe)}
                                >
                                    <Chip
                                        variant={vibeFilter === vibe ? 'active' : 'default'}
                                        className="capitalize cursor-pointer"
                                    >
                                        {vibe}
                                    </Chip>
                                </button>
                            ))}
                        </ChipGroup>
                    </div>
                </div>
            </div>

            {/* Experiences Grid */}
            {filteredExperiences.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExperiences.map((exp: Experience, index: number) => {
                        const Icon = categoryIcons[exp.category] || MapPin;
                        const host = getHost(exp.hostId);
                        const dest = getDestination(exp.destinationId);
                        const spotsLeft = exp.capacity - exp.currentParticipants;

                        return (
                            <Link
                                key={exp.id}
                                href={`/experiences/${exp.id}`}
                                className="animate-reveal-left h-full"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Card interactive className="h-full flex flex-col group transition-all duration-300 hover:shadow-soft-md">
                                    <div className="p-5 flex-1">
                                        {/* Header */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-sand-100 flex items-center justify-center shrink-0 group-hover:bg-sunset-50 transition-colors">
                                                <Icon className="w-5 h-5 text-neutral-600 group-hover:text-sunset-600 transition-colors" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-semibold text-neutral-900 line-clamp-2 mb-1 group-hover:text-sunset-700 transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    {isAuthenticated && user?.id === exp.hostId && (
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={(e: React.MouseEvent) => {
                                                                    e.preventDefault();
                                                                    router.push(`/experiences/${exp.id}/edit`);
                                                                }}
                                                                className="p-1 hover:bg-sand-100 rounded text-neutral-500 hover:text-ocean-600 transition-colors"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={(e: React.MouseEvent) => handleDelete(e, exp.id)}
                                                                className="p-1 hover:bg-sand-100 rounded text-neutral-500 hover:text-rose-600 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-neutral-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {dest?.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4 group-hover:text-neutral-900 transition-colors">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4 text-sunset-500" />
                                                {formatDate(exp.date)}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4 text-ocean-500" />
                                                {formatTime(exp.time)}
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <Chip variant="vibe" vibe={exp.vibeTag} className="text-xs group-hover:shadow-sm">
                                                {exp.vibeTag}
                                            </Chip>
                                            <span className="text-sm text-neutral-500">
                                                {getPriceDisplay(exp.priceLevel)}
                                            </span>
                                            <Shield className="w-4 h-4 text-green-500 ml-auto group-hover:scale-110 transition-transform" />
                                        </div>

                                        {/* Capacity */}
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="w-4 h-4 text-neutral-400 group-hover:text-ocean-400" />
                                            <span className={cn(
                                                spotsLeft <= 2 ? 'text-sunset-600 font-medium' : 'text-neutral-600'
                                            )}>
                                                {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                                            </span>
                                        </div>
                                    </div>

                                    {/* Footer - Host */}
                                    <div className="px-5 py-4 border-t border-sand-100 flex items-center gap-3 bg-sand-50/30 group-hover:bg-sand-50 transition-colors">
                                        <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-ocean-100 transition-all">
                                            <AvatarImage src={host?.avatar} alt={host?.name} />
                                            <AvatarFallback>{host?.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-sm">
                                            <span className="text-neutral-500">Hosted by </span>
                                            <span className="font-medium text-neutral-900">{host?.name}</span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <EmptyState
                    type="experiences"
                    title="No experiences found"
                    description="Try adjusting your filters or search term, or be the first to host an experience!"
                    action={
                        <Link href="/experiences/new">
                            <Button className="gap-2">
                                <Plus className="w-4 h-4" />
                                Host experience
                            </Button>
                        </Link>
                    }
                />
            )}
        </div>
    );
}
