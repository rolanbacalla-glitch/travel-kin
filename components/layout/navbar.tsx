'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Compass,
    Calendar,
    Users,
    Shield,
    User,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface NavItem {
    href: string;
    label: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { href: '/destinations', label: 'Destinations', icon: Compass },
    { href: '/experiences', label: 'Experiences', icon: Calendar },
    { href: '/companions', label: 'Companions', icon: Users },
    { href: '/safety', label: 'Safety', icon: Shield },
    { href: '/profile', label: 'Profile', icon: User },
];

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-sand-100">
                <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/destinations" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sunset-sm">
                            <Compass className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-neutral-900 group-hover:text-sunset-600 transition-colors">Travel Kin</span>
                    </Link>

                    {/* Nav Links */}
                    <div className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group',
                                        isActive
                                            ? 'bg-sand-100 text-neutral-900 shadow-sm'
                                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-sand-50'
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation - Bottom Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-sand-100 safe-area-bottom">
                <div className="flex items-center justify-around h-16 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 min-w-[60px]',
                                    isActive
                                        ? 'text-sunset-500'
                                        : 'text-neutral-400'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-2xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Top Bar */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-sand-100 safe-area-top">
                <div className="flex items-center justify-between h-14 px-4">
                    <Link href="/destinations" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center">
                            <Compass className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-neutral-900 text-sm">Travel Kin</span>
                    </Link>
                </div>
            </header>
        </>
    );
}
