import Link from 'next/link';
import { Compass, Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-sand-50 border-t border-sand-100 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center">
                                <Compass className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-neutral-900">Travel Kin</span>
                        </div>
                        <p className="text-neutral-500 text-sm max-w-sm">
                            Connect with fellow solo travellers, discover local experiences, and explore with confidence.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-medium text-neutral-900 mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/destinations" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="/experiences" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Experiences
                                </Link>
                            </li>
                            <li>
                                <Link href="/companions" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Find Companions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-neutral-900 mb-4">Safety</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/safety" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Safety Centre
                                </Link>
                            </li>
                            <li>
                                <Link href="/safety#guidelines" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="/safety#emergency" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
                                    Emergency Info
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-sand-200 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-400">
                        © 2026 Travel Kin. All rights reserved.
                    </p>
                    <p className="text-sm text-neutral-400 flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-sunset-400 fill-sunset-400" /> for solo travellers
                    </p>
                </div>
            </div>
        </footer>
    );
}
