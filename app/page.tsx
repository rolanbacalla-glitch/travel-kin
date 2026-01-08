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
        <div className="min-h-screen bg-sand-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[1000px] pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sunset-200/20 blur-[120px] rounded-full animate-pulse-soft" />
                <div className="absolute top-[10%] right-[-10%] w-[45%] h-[45%] bg-ocean-200/20 blur-[120px] rounded-full animate-float" />
                <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-sand-200/30 blur-[100px] rounded-full" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-soft-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sunset-sm">
                            <Compass className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-neutral-900 group-hover:text-sunset-600 transition-colors">Travel Kin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/sign-in" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-all hover:scale-105">
                            Sign in
                        </Link>
                        <Link href="/destinations">
                            <Button size="sm" className="shadow-sunset-sm hover:shadow-sunset-md active:scale-95 transition-all">Launch App</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight mb-6 animate-fadeIn">
                            Travel together,{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunset-500 to-ocean-500 animate-pulse-soft">
                                safely
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
                            Connect with fellow solo travellers, discover authentic local experiences,
                            and explore Southeast Asia with confidence.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <Link href="/destinations">
                                <Button size="lg" className="gap-2 shadow-sunset-sm hover:shadow-sunset-md transition-all active:scale-95">
                                    Launch web app
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button variant="secondary" size="lg" className="hover:bg-sand-100 transition-colors">
                                    Learn more
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Cards */}
                    <div className="mt-16 relative animate-fadeIn" style={{ animationDelay: '400ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-transparent to-sand-50 pointer-events-none z-10" />
                        <div className="relative rounded-3xl overflow-hidden shadow-soft-xl bg-white p-2 group">
                            <img
                                src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1400&q=80"
                                alt="El Nido, Philippines - beautiful limestone cliffs and turquoise waters"
                                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-1000"
                            />

                            {/* Floating Cards */}
                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto flex gap-4 animate-float">
                                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-soft-lg border border-white/50">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                                                alt="Emma"
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-sunset-100"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">Emma waved at you! 👋</p>
                                            <p className="text-xs text-neutral-500">Also heading to El Nido</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:block absolute top-8 right-8 bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-soft-lg border border-white/50 animate-float [animation-delay:-1.5s]">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-full bg-sunset-100 flex items-center justify-center">
                                        <MapPin className="w-3.5 h-3.5 text-sunset-500" />
                                    </div>
                                    <span className="text-sm font-medium text-neutral-900">Island Hopping Tour</span>
                                </div>
                                <p className="text-xs text-neutral-500">Tomorrow, 9:00 AM · 4 spots left</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-slide-up">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            Solo travel, reimagined
                        </h2>
                        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                            Everything you need to explore with confidence and connect with like-minded travellers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feel the Vibe */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-ocean-50/50 to-transparent hover:bg-ocean-50 transition-all duration-500 group animate-reveal-left shadow-soft-sm hover:shadow-soft-md">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-soft-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <Compass className="w-8 h-8 text-ocean-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-ocean-700 transition-colors">Feel the vibe</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Go beyond generic travel blogs. Explore real vibes, local neighbourhoods,
                                and insider tips from travellers like you.
                            </p>
                        </div>

                        {/* Find Your Crew */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-sunset-50/50 to-transparent hover:bg-sunset-50 transition-all duration-500 group animate-fadeIn shadow-soft-sm hover:shadow-soft-md" style={{ animationDelay: '100ms' }}>
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-soft-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                <Users className="w-8 h-8 text-sunset-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-sunset-700 transition-colors">Find your crew</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Match with compatible travel companions. Share experiences, split costs,
                                and make memories with people on the same journey.
                            </p>
                        </div>

                        {/* Stay Safe */}
                        <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-green-50/50 to-transparent hover:bg-green-50 transition-all duration-500 group animate-reveal-right shadow-soft-sm hover:shadow-soft-md" style={{ animationDelay: '200ms' }}>
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-soft-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-green-700 transition-colors">Stay safe</h3>
                            <p className="text-neutral-500 leading-relaxed">
                                Safety is built in. Verified profiles, public meetups, easy reporting,
                                and local emergency info — all in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-sand-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 animate-slide-up">
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                            How it works
                        </h2>
                        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
                            Get started in minutes. No package tours, no travel agents — just real connections.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12">
                        {[
                            { step: 1, title: 'Set up your profile', desc: 'Share your travel style, interests, and upcoming destinations.' },
                            { step: 2, title: 'Explore destinations', desc: 'Discover the vibe of each place and find experiences that match.' },
                            { step: 3, title: 'Connect with others', desc: 'Wave at companions heading the same way, join group experiences.' },
                            { step: 4, title: 'Travel safely', desc: 'Meet in public, share locations, and access safety resources.' },
                        ].map((item: { step: number; title: string; desc: string }, index: number) => (
                            <div key={item.step} className="relative animate-fadeIn" style={{ animationDelay: `${index * 150}ms` }}>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sunset-400 to-sunset-600 text-white font-bold flex items-center justify-center mb-6 shadow-sunset-sm group-hover:scale-110 transition-transform">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Safety Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-sand-100/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-reveal-left">
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
                                <Shield className="w-4 h-4" />
                                Safety first
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
                                Your safety is our priority
                            </h2>
                            <p className="text-lg text-neutral-500 mb-10 leading-relaxed">
                                We know meeting strangers while travelling can feel daunting. That's why safety
                                is deeply integrated into everything we do.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    'Profile verification with multiple trust levels',
                                    'All meetups encouraged in public places',
                                    'Easy reporting and blocking tools',
                                    'Country-specific emergency information',
                                    'Optional location sharing with trusted contacts',
                                ].map((item, idx) => (
                                    <li key={item} className="flex items-start gap-4 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-neutral-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="animate-reveal-right">
                            <div className="bg-white rounded-[2rem] p-10 shadow-soft-xl border border-sand-100 relative group transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="w-12 h-12 rounded-2xl bg-sand-50 flex items-center justify-center text-sunset-400 opacity-20 group-hover:opacity-100 transition-opacity">
                                        <Star className="w-6 h-6 fill-current" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
                                            alt="Marcus"
                                            className="w-20 h-20 rounded-2xl object-cover shadow-soft-md"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-lg border-4 border-white">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-xl text-neutral-900">Marcus Andersson</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-neutral-500">Sweden · 31-35</span>
                                            <span className="w-1 h-1 rounded-full bg-neutral-300" />
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Trusted Member</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-sand-50 p-4 rounded-2xl">
                                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-sm font-semibold text-neutral-900">ID Verified</p>
                                    </div>
                                    <div className="bg-sand-50 p-4 rounded-2xl">
                                        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-1">Reviews</p>
                                        <p className="text-sm font-semibold text-neutral-900">12 High Ratings</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {['Photography', 'Coffee', 'Sunsets', 'Hiking'].map(tag => (
                                        <span key={tag} className="bg-ocean-50 text-ocean-700 text-xs px-4 py-2 rounded-xl font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sunset-100/30 blur-[120px] rounded-full animate-pulse-soft" />
                </div>
                <div className="max-w-4xl mx-auto text-center animate-slide-up">
                    <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
                        Ready to explore together?
                    </h2>
                    <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of solo travellers discovering Southeast Asia's best-kept secrets.
                        Your next adventure starts here.
                    </p>
                    <Link href="/destinations">
                        <Button size="lg" className="h-14 px-10 text-lg gap-2 shadow-sunset-md hover:shadow-sunset-lg active:scale-95 transition-all">
                            Launch web app
                            <ArrowRight className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-sand-100 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center shadow-sunset-sm">
                                <Compass className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl text-neutral-900">Travel Kin</span>
                        </div>

                        <div className="flex items-center gap-8 text-sm font-medium text-neutral-500">
                            <Link href="/destinations" className="hover:text-neutral-900 transition-colors">Destinations</Link>
                            <Link href="/experiences" className="hover:text-neutral-900 transition-colors">Experiences</Link>
                            <Link href="/safety" className="hover:text-neutral-900 transition-colors">Safety</Link>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-2">
                            <p className="text-sm text-neutral-400 flex items-center gap-1.5">
                                Made with <Heart className="w-4 h-4 text-sunset-400 fill-sunset-400 animate-pulse" /> for solo travellers
                            </p>
                            <p className="text-xs text-neutral-400">
                                © 2026 Travel Kin. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
