'use client';

import Link from 'next/link';
import {
    Compass,
    Users,
    Shield,
    MapPin,
    Star,
    ArrowRight,
    Heart,
    CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-sand-50">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-sand-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center">
                            <Compass className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-neutral-900">Travel Kin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                            Sign in
                        </Link>
                        <Link href="/destinations">
                            <Button size="sm">Launch App</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6">
                            Travel together,{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunset-500 to-ocean-500">
                                safely
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Connect with fellow solo travellers, discover authentic local experiences,
                            and explore Southeast Asia with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/destinations">
                                <Button size="lg" className="gap-2">
                                    Launch web app
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button variant="secondary" size="lg">
                                    Learn more
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Cards */}
                    <div className="mt-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-transparent to-sand-50 pointer-events-none z-10" />
                        <div className="relative rounded-3xl overflow-hidden shadow-soft-lg bg-white p-2">
                            <img
                                src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1400&q=80"
                                alt="El Nido, Philippines - beautiful limestone cliffs and turquoise waters"
                                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl"
                            />

                            {/* Floating Cards */}
                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto flex gap-4">
                                <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-soft-md animate-slide-up">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                                            alt="Emma"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">Emma waved at you! 👋</p>
                                            <p className="text-xs text-neutral-500">Also heading to El Nido</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:block absolute top-8 right-8 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-soft-md animate-fade-in">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-sunset-500" />
                                    <span className="text-sm font-medium text-neutral-900">Island Hopping Tour</span>
                                </div>
                                <p className="text-xs text-neutral-500">Tomorrow, 9:00 AM · 4 spots left</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            Solo travel, reimagined
                        </h2>
                        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                            Everything you need to explore with confidence and connect with like-minded travellers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feel the Vibe */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-ocean-50 to-transparent">
                            <div className="w-16 h-16 rounded-2xl bg-ocean-100 flex items-center justify-center mx-auto mb-6">
                                <Compass className="w-8 h-8 text-ocean-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Feel the vibe</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Go beyond generic travel blogs. Explore real vibes, local neighbourhoods,
                                and insider tips from travellers like you.
                            </p>
                        </div>

                        {/* Find Your Crew */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-sunset-50 to-transparent">
                            <div className="w-16 h-16 rounded-2xl bg-sunset-100 flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-sunset-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Find your crew</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Match with compatible travel companions. Share experiences, split costs,
                                and make memories with people on the same journey.
                            </p>
                        </div>

                        {/* Stay Safe */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-green-50 to-transparent">
                            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3">Stay safe</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Safety is built in. Verified profiles, public meetups, easy reporting,
                                and local emergency info — all in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            How it works
                        </h2>
                        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                            Get started in minutes. No package tours, no travel agents — just real connections.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: 1, title: 'Set up your profile', desc: 'Share your travel style, interests, and upcoming destinations.' },
                            { step: 2, title: 'Explore destinations', desc: 'Discover the vibe of each place and find experiences that match.' },
                            { step: 3, title: 'Connect with others', desc: 'Wave at companions heading the same way, join group experiences.' },
                            { step: 4, title: 'Travel safely', desc: 'Meet in public, share locations, and access safety resources.' },
                        ].map((item) => (
                            <div key={item.step} className="relative">
                                <div className="w-10 h-10 rounded-full bg-sunset-500 text-white font-semibold flex items-center justify-center mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sand-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Shield className="w-4 h-4" />
                                Safety first
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                                Your safety is our priority
                            </h2>
                            <p className="text-lg text-neutral-500 mb-8">
                                We know meeting strangers while travelling can feel daunting. That's why safety
                                is deeply integrated into everything we do.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    'Profile verification with multiple trust levels',
                                    'All meetups encouraged in public places',
                                    'Easy reporting and blocking tools',
                                    'Country-specific emergency information',
                                    'Optional location sharing with trusted contacts',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-neutral-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-soft">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
                                    alt="Marcus"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-neutral-900">Marcus Andersson</span>
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Trusted</span>
                                    </div>
                                    <p className="text-sm text-neutral-500">Sweden · 31-35</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-neutral-600">Email verified</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-neutral-600">ID checked</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Star className="w-4 h-4 text-sunset-400 fill-sunset-400" />
                                    <span className="text-neutral-600">Super host · 12 reviews</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-sand-100">
                                <div className="flex gap-2">
                                    <span className="bg-ocean-100 text-ocean-700 text-xs px-3 py-1.5 rounded-full">Photography</span>
                                    <span className="bg-ocean-100 text-ocean-700 text-xs px-3 py-1.5 rounded-full">Coffee</span>
                                    <span className="bg-ocean-100 text-ocean-700 text-xs px-3 py-1.5 rounded-full">Sunsets</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                        Ready to explore together?
                    </h2>
                    <p className="text-lg text-neutral-500 mb-10 max-w-2xl mx-auto">
                        Join thousands of solo travellers discovering Southeast Asia's best-kept secrets.
                        Your next adventure starts here.
                    </p>
                    <Link href="/destinations">
                        <Button size="lg" className="gap-2">
                            Launch web app
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-sand-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center">
                                <Compass className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-neutral-900">Travel Kin</span>
                        </div>
                        <p className="text-sm text-neutral-400 flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-sunset-400 fill-sunset-400" /> for solo travellers
                        </p>
                        <p className="text-sm text-neutral-400">
                            © 2026 Travel Kin. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
