'use client';

import Link from 'next/link';
import {
    Shield,
    CheckCircle,
    Users,
    Flag,
    AlertTriangle,
    Phone,
    MapPin,
    Eye,
    Lock,
    MessageCircle,
    ChevronRight
} from 'lucide-react';
import { Button, Card } from '@/components/ui';

export default function SafetyPage() {
    return (
        <div className="section-container py-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-8 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-sand-100 shadow-soft-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center shadow-sm">
                        <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Safety Centre</h1>
                        <p className="text-neutral-500 font-medium">Your peace of mind is our priority</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 animate-slide-up">
                    {/* How We Keep You Safe */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-6">How we keep you safe</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900 mb-1">Profile verification</h3>
                                    <p className="text-sm text-neutral-600">
                                        We verify user identities through email and optional ID checks. Look for
                                        verification badges on profiles to see trust levels.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-ocean-100 flex items-center justify-center shrink-0">
                                    <Users className="w-5 h-5 text-ocean-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900 mb-1">Community ratings</h3>
                                    <p className="text-sm text-neutral-600">
                                        After experiences, participants can leave ratings and badges. This helps
                                        build trust and accountability within the community.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-sunset-100 flex items-center justify-center shrink-0">
                                    <Flag className="w-5 h-5 text-sunset-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900 mb-1">Reporting & blocking</h3>
                                    <p className="text-sm text-neutral-600">
                                        You can report inappropriate behaviour or block anyone at any time.
                                        Our team reviews reports and takes action to protect the community.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900 mb-1">Public meetups encouraged</h3>
                                    <p className="text-sm text-neutral-600">
                                        All experiences recommend meeting in public places first. We display
                                        safety notes prominently on every experience page.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Safety Tips */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Safety tips for solo travellers</h2>

                        <ul className="space-y-4">
                            {[
                                'Always meet new people in public, well-lit places first',
                                'Share your plans with someone you trust back home',
                                'Trust your instincts — if something feels off, leave',
                                'Keep copies of important documents in your email or cloud',
                                'Research local emergency numbers before you arrive',
                                'Use licensed transportation and avoid unlicensed taxis',
                                'Stay aware of your surroundings, especially at night',
                                'Keep valuables secure and avoid displaying expensive items',
                            ].map((tip: string, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-medium flex items-center justify-center shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-neutral-600">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Emergency Info */}
                    <Card className="p-6" id="emergency">
                        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Emergency information</h2>

                        {/* Philippines */}
                        <div className="mb-6">
                            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="text-lg">🇵🇭</span> Philippines
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-neutral-400" />
                                        <span className="text-sm font-medium text-neutral-700">Emergency</span>
                                    </div>
                                    <p className="text-lg font-semibold text-neutral-900">911</p>
                                </div>
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-neutral-400" />
                                        <span className="text-sm font-medium text-neutral-700">Tourist Police</span>
                                    </div>
                                    <p className="text-lg font-semibold text-neutral-900">+63 2 524-1660</p>
                                </div>
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-neutral-400" />
                                        <span className="text-sm font-medium text-neutral-700">Coast Guard</span>
                                    </div>
                                    <p className="text-lg font-semibold text-neutral-900">+63 2 527-8481</p>
                                </div>
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageCircle className="w-4 h-4 text-neutral-400" />
                                        <span className="text-sm font-medium text-neutral-700">DOT Hotline</span>
                                    </div>
                                    <p className="text-lg font-semibold text-neutral-900">+63 2 459-5200</p>
                                </div>
                            </div>
                        </div>

                        {/* SE Asia General */}
                        <div>
                            <h3 className="font-medium text-neutral-900 mb-4 flex items-center gap-2">
                                🌏 Southeast Asia (General)
                            </h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <p className="text-sm font-medium text-neutral-700 mb-1">Thailand</p>
                                    <p className="font-semibold text-neutral-900">191 (Police)</p>
                                </div>
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <p className="text-sm font-medium text-neutral-700 mb-1">Indonesia</p>
                                    <p className="font-semibold text-neutral-900">110 (Police)</p>
                                </div>
                                <div className="p-4 bg-sand-50 rounded-xl">
                                    <p className="text-sm font-medium text-neutral-700 mb-1">Vietnam</p>
                                    <p className="font-semibold text-neutral-900">113 (Police)</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6 animate-reveal-right" style={{ animationDelay: '150ms' }}>
                    {/* Your Controls */}
                    <Card className="p-6" id="guidelines">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Your controls</h2>

                        <div className="space-y-4">
                            <Link
                                href="/profile"
                                className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-neutral-400" />
                                    <div>
                                        <p className="font-medium text-neutral-900 text-sm">Profile visibility</p>
                                        <p className="text-xs text-neutral-500">Who can see your details</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-neutral-400" />
                            </Link>

                            <Link
                                href="/profile"
                                className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Lock className="w-5 h-5 text-neutral-400" />
                                    <div>
                                        <p className="font-medium text-neutral-900 text-sm">Location sharing</p>
                                        <p className="text-xs text-neutral-500">Manage who sees your location</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-neutral-400" />
                            </Link>

                            <Link
                                href="/profile"
                                className="flex items-center justify-between p-3 bg-sand-50 rounded-xl hover:bg-sand-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-neutral-400" />
                                    <div>
                                        <p className="font-medium text-neutral-900 text-sm">Blocked users</p>
                                        <p className="text-xs text-neutral-500">Manage blocked accounts</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-neutral-400" />
                            </Link>
                        </div>
                    </Card>

                    {/* Report Something */}
                    <Card className="p-6 border-l-4 border-sunset-400">
                        <h2 className="text-lg font-semibold text-neutral-900 mb-3">Report an issue</h2>
                        <p className="text-sm text-neutral-600 mb-4">
                            Something wrong? Had a bad experience? We take all reports seriously.
                        </p>
                        <Button variant="secondary" className="w-full gap-2">
                            <Flag className="w-4 h-4" />
                            Submit a report
                        </Button>
                    </Card>

                    {/* Quick Help */}
                    <Card className="p-6 bg-ocean-50 border-ocean-200">
                        <h2 className="text-lg font-semibold text-ocean-900 mb-3">Need help now?</h2>
                        <p className="text-sm text-ocean-700 mb-4">
                            If you're in immediate danger, contact local emergency services first.
                        </p>
                        <div className="text-3xl font-bold text-ocean-900 mb-2">911</div>
                        <p className="text-xs text-ocean-600">Philippines Emergency Number</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
