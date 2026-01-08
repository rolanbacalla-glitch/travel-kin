'use client';

import { useState, useEffect } from 'react';
import {
    User,
    MapPin,
    Calendar,
    Globe,
    Shield,
    CheckCircle,
    Edit,
    Save,
    Languages,
    Compass,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { Chip, ChipGroup } from '@/components/shared';
import { useAuth, useToastActions } from '@/lib/hooks';
import { experiences, companions } from '@/lib/data';
import { Companion } from '@/lib/types';

const ageRanges = ['20-25', '26-30', '31-35', '36-40'];
const travelStyles = ['chill', 'party', 'adventurous', 'mixed'];
const budgetBands = ['low', 'mid', 'higher'];

export default function ProfilePage() {
    const { user, updateProfile, isAuthenticated, signOut } = useAuth();
    const router = useRouter();
    const { success } = useToastActions();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nationality: '',
        ageRange: '',
        languages: '',
        bio: '',
        currentLocation: '',
        nextDestination: '',
        travelDatesStart: '',
        travelDatesEnd: '',
        travelStyle: [] as string[],
        budgetBand: '',
    });

    // Populate form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                nationality: user.nationality || '',
                ageRange: user.ageRange || '',
                languages: user.languages?.join(', ') || '',
                bio: user.bio || '',
                currentLocation: user.currentLocation || '',
                nextDestination: user.nextDestination || '',
                travelDatesStart: user.travelDates?.start || '',
                travelDatesEnd: user.travelDates?.end || '',
                travelStyle: user.travelStyle || [],
                budgetBand: user.budgetBand || '',
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleTravelStyle = (style: string) => {
        const styles = formData.travelStyle.includes(style)
            ? formData.travelStyle.filter((s) => s !== style)
            : [...formData.travelStyle, style];
        setFormData({ ...formData, travelStyle: styles });
    };

    const handleSave = () => {
        updateProfile({
            name: formData.name,
            nationality: formData.nationality,
            ageRange: formData.ageRange as User['ageRange'],
            languages: formData.languages.split(',').map((l: string) => l.trim()),
            bio: formData.bio,
            currentLocation: formData.currentLocation,
            nextDestination: formData.nextDestination,
            travelDates: {
                start: formData.travelDatesStart,
                end: formData.travelDatesEnd,
            },
            travelStyle: formData.travelStyle as User['travelStyle'],
            budgetBand: formData.budgetBand as User['budgetBand'],
        });
        setIsEditing(false);
        success('Profile updated', 'Your changes have been saved.');
    };

    const handleSignOut = () => {
        signOut();
        router.push('/');
    };

    if (!isAuthenticated || !user) {
        return (
            <div className="section-container py-16 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-full max-w-md">
                    <Card className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center mx-auto mb-6">
                            <Compass className="w-8 h-8 text-white" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-neutral-900">Join Travel Kin</h2>
                            <p className="text-neutral-500">
                                Connect with other solo travellers, manage your profile, and plan your next adventure.
                            </p>
                        </div>

                        <div className="space-y-3 pt-2">
                            <Link href="/sign-in" className="block w-full">
                                <Button className="w-full" size="lg">Sign In</Button>
                            </Link>

                            <Link href="/sign-up" className="block w-full">
                                <Button variant="outline" className="w-full" size="lg">Create Account</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="section-container py-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-sand-100 shadow-soft-sm items-start">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your Profile</h1>
                    <p className="text-neutral-500">Manage your travel information and interactions</p>
                </div>
                <div className="flex items-center gap-2">
                    {!isEditing && (
                        <Button
                            variant="ghost"
                            onClick={handleSignOut}
                            className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    )}
                    {isEditing ? (
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="w-4 h-4" />
                            Save changes
                        </Button>
                    ) : (
                        <Button variant="secondary" onClick={() => setIsEditing(true)} className="gap-2">
                            <Edit className="w-4 h-4" />
                            Edit profile
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 animate-slide-up">
                    {/* Basic Info */}
                    <Card className="p-6 transition-all duration-300 hover:shadow-soft-md group">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-6 group-hover:text-sunset-600 transition-colors">Basic Information</h2>

                        <div className="flex items-start gap-6 mb-6">
                            <Avatar className="w-20 h-20 ring-4 ring-white shadow-soft group-hover:rotate-3 transition-transform">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-2xl bg-gradient-to-br from-sand-100 to-sand-200">{user.name?.[0]}</AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <div className="flex-1">
                                    <p className="text-sm text-neutral-500 mb-2">Profile photo</p>
                                    <Button variant="secondary" size="sm" disabled>
                                        Change photo (coming soon)
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                                {isEditing ? (
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="text-neutral-900">{user.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                                <p className="text-neutral-900">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Nationality</label>
                                {isEditing ? (
                                    <Input
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleChange}
                                        placeholder="e.g., Canada"
                                    />
                                ) : (
                                    <p className="text-neutral-900 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-neutral-400" />
                                        {user.nationality || 'Not set'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Age range</label>
                                {isEditing ? (
                                    <select
                                        name="ageRange"
                                        value={formData.ageRange}
                                        onChange={handleChange}
                                        className="flex h-11 w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm"
                                    >
                                        <option value="">Select</option>
                                        {ageRanges.map((range) => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-neutral-900">{user.ageRange || 'Not set'}</p>
                                )}
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Languages</label>
                                {isEditing ? (
                                    <Input
                                        name="languages"
                                        value={formData.languages}
                                        onChange={handleChange}
                                        placeholder="e.g., English, Spanish"
                                    />
                                ) : (
                                    <p className="text-neutral-900 flex items-center gap-2">
                                        <Languages className="w-4 h-4 text-neutral-400" />
                                        {user.languages?.join(', ') || 'Not set'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Bio */}
                    <Card className="p-6 transition-all duration-300 hover:shadow-soft-md group">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4 group-hover:text-sunset-600 transition-colors">About me</h2>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Tell other travellers about yourself..."
                                className="flex w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-sm focus:border-ocean-400 focus:outline-none focus:ring-2 focus:ring-ocean-100"
                            />
                        ) : (
                            <p className="text-neutral-600">{user.bio || 'No bio yet.'}</p>
                        )}
                    </Card>

                    {/* Travel Style */}
                    <Card className="p-6 transition-all duration-300 hover:shadow-soft-md group">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4 group-hover:text-sunset-600 transition-colors">Travel style</h2>
                        <ChipGroup>
                            {travelStyles.map((style) => (
                                <button
                                    key={style}
                                    onClick={() => isEditing && toggleTravelStyle(style)}
                                    disabled={!isEditing}
                                >
                                    <Chip
                                        variant={formData.travelStyle.includes(style) ? 'active' : 'default'}
                                        className={`capitalize ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        {style}
                                    </Chip>
                                </button>
                            ))}
                        </ChipGroup>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Budget</label>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    {budgetBands.map((band) => (
                                        <button
                                            key={band}
                                            onClick={() => setFormData({ ...formData, budgetBand: band })}
                                            className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all capitalize ${formData.budgetBand === band
                                                ? 'border-sunset-400 bg-sunset-50 text-sunset-700'
                                                : 'border-sand-200 hover:border-sand-300 text-neutral-600'
                                                }`}
                                        >
                                            {band}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <Chip className="capitalize">{user.budgetBand || 'Not set'}</Chip>
                            )}
                        </div>
                    </Card>

                    {/* Trip Details */}
                    <Card className="p-6 transition-all duration-300 hover:shadow-soft-md group">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-6 group-hover:text-ocean-600 transition-colors">Current trip</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Current location</label>
                                {isEditing ? (
                                    <Input
                                        name="currentLocation"
                                        value={formData.currentLocation}
                                        onChange={handleChange}
                                        placeholder="e.g., El Nido, Philippines"
                                    />
                                ) : (
                                    <p className="text-neutral-900 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-sunset-500" />
                                        {user.currentLocation || 'Not set'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Next destination</label>
                                {isEditing ? (
                                    <Input
                                        name="nextDestination"
                                        value={formData.nextDestination}
                                        onChange={handleChange}
                                        placeholder="e.g., Boracay"
                                    />
                                ) : (
                                    <p className="text-neutral-900 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-ocean-500" />
                                        {user.nextDestination || 'Not set'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Travel dates (from)</label>
                                {isEditing ? (
                                    <Input
                                        type="date"
                                        name="travelDatesStart"
                                        value={formData.travelDatesStart}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="text-neutral-900 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-neutral-400" />
                                        {user.travelDates?.start || 'Not set'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Travel dates (to)</label>
                                {isEditing ? (
                                    <Input
                                        type="date"
                                        name="travelDatesEnd"
                                        value={formData.travelDatesEnd}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p className="text-neutral-900 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-neutral-400" />
                                        {user.travelDates?.end || 'Not set'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* My Requests */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-6">My Requests</h2>
                        {user.requests && user.requests.length > 0 ? (
                            <div className="space-y-4">
                                {user.requests.map((req: { experienceId: string; status: 'pending' | 'accepted'; date: string }, index: number) => {
                                    const exp = experiences.find(e => e.id === req.experienceId);
                                    if (!exp) return null;
                                    return (
                                        <div key={index} className="flex items-center justify-between p-4 bg-sand-50 rounded-xl border border-sand-100">
                                            <div>
                                                <p className="font-medium text-neutral-900">{exp.title}</p>
                                                <p className="text-sm text-neutral-500">{exp.date} · {exp.priceLevel}</p>
                                            </div>
                                            <Chip className="capitalize bg-white shadow-sm" variant={req.status === 'accepted' ? 'active' : 'default'}>
                                                {req.status}
                                            </Chip>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-neutral-500 text-sm">You haven't requested to join any experiences yet.</p>
                        )}
                    </Card>

                    {/* My Waves */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-6">My Waves</h2>
                        {user.wavedCompanions && user.wavedCompanions.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {companions
                                    .filter((c: Companion) => user.wavedCompanions?.includes(c.id))
                                    .map((companion: Companion) => (
                                        <div key={companion.id} className="flex items-center gap-3 p-3 bg-sand-50 rounded-xl border border-sand-100 pr-5">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={companion.avatar} alt={companion.name} />
                                                <AvatarFallback>{companion.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-neutral-900 text-sm">{companion.name}</p>
                                                <p className="text-xs text-neutral-500">{companion.nationality}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <p className="text-neutral-500 text-sm">You haven't waved at anyone yet.</p>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 animate-reveal-right" style={{ animationDelay: '150ms' }}>
                    {/* Verification Status */}
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-green-500" />
                            <h2 className="text-lg font-semibold text-neutral-900">Verification</h2>
                        </div>

                        <div className="space-y-3 mb-4">
                            {user.badges?.map((badge) => (
                                <div key={badge} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-neutral-600">{badge}</span>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 bg-sand-50 rounded-xl">
                            <p className="text-sm text-neutral-600">
                                <span className="font-medium">Status: </span>
                                <span className="capitalize">{user.verificationStatus}</span>
                            </p>
                        </div>
                    </Card>

                    {/* Interests */}
                    <Card className="p-6">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Interests</h2>
                        <ChipGroup>
                            {user.interests?.map((interest) => (
                                <Chip key={interest}>{interest}</Chip>
                            ))}
                        </ChipGroup>
                        {isEditing && (
                            <p className="text-xs text-neutral-400 mt-3">
                                Interest editing coming soon
                            </p>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
