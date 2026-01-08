'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    Shield,
    CheckCircle
} from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { useToastActions, useExperiences, useAuth } from '@/lib/hooks';
import { destinations } from '@/lib/data';
import { Destination, Experience } from '@/lib/types';

const categories = [
    { id: 'food', label: 'Food & Dining', icon: '🍜' },
    { id: 'island', label: 'Island & Beach', icon: '🏝️' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
    { id: 'hike', label: 'Hiking & Nature', icon: '🥾' },
    { id: 'culture', label: 'Culture & Tours', icon: '🏛️' },
];

const vibes = ['chill', 'party', 'adventurous', 'mixed'] as const;

export default function EditExperiencePage() {
    const router = useRouter();
    const params = useParams();
    const { success, error } = useToastActions();
    const { getExperience, updateExperience } = useExperiences();
    const { user, isAuthenticated } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        destinationId: '',
        category: '',
        vibeTag: '',
        date: '',
        time: '',
        duration: '',
        capacity: '',
        priceLevel: '1',
        description: '',
        meetingPoint: '',
        whatToBring: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title || formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
        if (!formData.destinationId) newErrors.destinationId = 'Please select a destination';
        if (!formData.category) newErrors.category = 'Please select a category';
        if (!formData.vibeTag) newErrors.vibeTag = 'Please select a vibe';
        if (!formData.date) newErrors.date = 'Date is required';
        else if (new Date(formData.date) < new Date()) newErrors.date = 'Date must be in the future';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.capacity || Number(formData.capacity) < 2 || Number(formData.capacity) > 20) {
            newErrors.capacity = 'Capacity must be between 2 and 20';
        }
        if (!formData.description || formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }
        if (!formData.meetingPoint) newErrors.meetingPoint = 'Meeting point is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/sign-in');
            return;
        }

        const exp = getExperience(params.id as string);
        if (!exp) {
            error('Error', 'Experience not found');
            router.push('/experiences');
            return;
        }

        if (exp.hostId !== user?.id) {
            error('Access denied', 'You can only edit your own experiences');
            router.push('/experiences');
            return;
        }

        setFormData({
            title: exp.title,
            destinationId: exp.destinationId,
            category: exp.category,
            vibeTag: exp.vibeTag,
            date: exp.date,
            time: exp.time,
            duration: exp.duration,
            capacity: String(exp.capacity),
            priceLevel: String(exp.priceLevel),
            description: exp.description,
            meetingPoint: exp.meetingPoint,
            whatToBring: exp.whatToBring.join(', '),
        });
    }, [isAuthenticated, router, params.id, getExperience, user, error]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            error('Please fix the errors', 'Check the form for missing or invalid information.');
            return;
        }

        setIsSubmitting(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        updateExperience(params.id as string, {
            ...formData,
            capacity: Number(formData.capacity),
            priceLevel: Number(formData.priceLevel) as 1 | 2 | 3,
            whatToBring: formData.whatToBring.split(',').map((s: string) => s.trim()).filter(Boolean),
            // Cast types that we know are correct from the form
            category: formData.category as any,
            vibeTag: formData.vibeTag as any,
        });

        success('Experience updated!', 'Your changes have been saved.');
        router.push('/experiences');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen pb-8">
            {/* Header */}
            <div className="bg-white border-b border-sand-100 sticky top-14 md:top-16 z-30">
                <div className="section-container py-4 flex items-center gap-4">
                    <Link
                        href="/experiences"
                        className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>
                    <div className="h-6 w-px bg-sand-200" />
                    <h1 className="font-semibold text-neutral-900">Edit experience</h1>
                </div>
            </div>

            <div className="section-container py-8">
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Basic info</h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Experience title
                                    </label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g., Sunset Kayaking Adventure"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={errors.title ? 'border-rose-500 focus:ring-rose-100' : ''}
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.title}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="destinationId" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Destination
                                    </label>
                                    <select
                                        id="destinationId"
                                        name="destinationId"
                                        value={formData.destinationId}
                                        onChange={handleChange}
                                        required
                                        className={`flex h-11 w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:ring-2 ${errors.destinationId
                                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-100'
                                            : 'border-sand-200 focus:border-ocean-400 focus:ring-ocean-100'
                                            }`}
                                    >
                                        <option value="">Select a destination</option>
                                        {destinations.map((dest: Destination) => (
                                            <option key={dest.id} value={dest.id}>{dest.name}, {dest.country}</option>
                                        ))}
                                    </select>
                                    {errors.destinationId && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.destinationId}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Category
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {categories.map((cat: { id: string; label: string; icon: string }) => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, category: cat.id })}
                                                className={`p-3 rounded-xl border text-left transition-all ${formData.category === cat.id
                                                    ? 'border-sunset-400 bg-sunset-50'
                                                    : 'border-sand-200 hover:border-sand-300'
                                                    }`}
                                            >
                                                <span className="text-xl mb-1 block">{cat.icon}</span>
                                                <span className="text-sm font-medium">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Vibe
                                    </label>
                                    <ChipGroup>
                                        {vibes.map((vibe: string) => (
                                            <button
                                                key={vibe}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, vibeTag: vibe })}
                                            >
                                                <Chip
                                                    variant={formData.vibeTag === vibe ? 'active' : 'default'}
                                                    className="capitalize cursor-pointer"
                                                >
                                                    {vibe}
                                                </Chip>
                                            </button>
                                        ))}
                                    </ChipGroup>
                                </div>
                            </div>
                        </Card>

                        {/* Date & Time */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6">When</h2>

                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Date
                                    </label>
                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Start time
                                    </label>
                                    <Input
                                        id="time"
                                        name="time"
                                        type="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Duration
                                    </label>
                                    <Input
                                        id="duration"
                                        name="duration"
                                        placeholder="e.g., 3 hours"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Capacity & Price */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Capacity & Price</h2>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="capacity" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Max participants
                                    </label>
                                    <Input
                                        id="capacity"
                                        name="capacity"
                                        type="number"
                                        min="2"
                                        max="20"
                                        placeholder="e.g., 8"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className={errors.capacity ? 'border-rose-500 focus:ring-rose-100' : ''}
                                        required
                                    />
                                    {errors.capacity && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.capacity}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Approximate cost
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((level: number) => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, priceLevel: String(level) })}
                                                className={`flex-1 py-3 rounded-xl border text-center font-medium transition-all ${formData.priceLevel === String(level)
                                                    ? 'border-sunset-400 bg-sunset-50 text-sunset-700'
                                                    : 'border-sand-200 hover:border-sand-300 text-neutral-600'
                                                    }`}
                                            >
                                                {'₱'.repeat(level)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Details */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6">Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={4}
                                        placeholder="Describe what participants can expect..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        className={`flex w-full rounded-xl border bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 ${errors.description
                                            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-100'
                                            : 'border-sand-200 focus:border-ocean-400 focus:ring-ocean-100'
                                            }`}
                                    />
                                    {errors.description && (
                                        <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="meetingPoint" className="block text-sm font-medium text-neutral-700 mb-2">
                                        Meeting point
                                    </label>
                                    <Input
                                        id="meetingPoint"
                                        name="meetingPoint"
                                        placeholder="e.g., Front entrance of Beach Club"
                                        value={formData.meetingPoint}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="whatToBring" className="block text-sm font-medium text-neutral-700 mb-2">
                                        What to bring (comma-separated)
                                    </label>
                                    <Input
                                        id="whatToBring"
                                        name="whatToBring"
                                        placeholder="e.g., Sunscreen, Water, Camera"
                                        value={formData.whatToBring}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Safety Info Box */}
                        <Card className="p-6 bg-green-50 border-green-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-green-600" />
                                <h2 className="text-lg font-semibold text-green-900">Host safely</h2>
                            </div>
                            <ul className="space-y-2">
                                {[
                                    'Always meet in a public place first',
                                    'Share your itinerary with someone you trust',
                                    'Keep group sizes manageable',
                                    'Have a backup plan for weather or safety issues',
                                ].map((tip: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Submit */}
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.back()}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1"
                            >
                                {isSubmitting ? 'Saving...' : 'Save changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
