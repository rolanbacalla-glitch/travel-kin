'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

export default function SignUpPage() {
    const router = useRouter();
    const { signUp } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        signUp(email, name);
        router.push('/profile');
    };

    return (
        <div className="min-h-screen bg-sand-50/30 flex flex-col items-center justify-center p-4 animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(100,163,181,0.1),transparent)] z-0" />

            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-all hover:-translate-x-1 z-10"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to home
            </Link>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center gap-3 mb-8 animate-slide-up">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center shadow-sunset animate-float ring-4 ring-white">
                        <Compass className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-neutral-900 tracking-tight">Travel Kin</span>
                </div>

                <Card className="backdrop-blur-xl bg-white/80 shadow-soft-xl border-white/50 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <CardHeader className="text-center">
                        <CardTitle>Start your journey</CardTitle>
                        <CardDescription>
                            Create an account to connect with fellow travellers
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-neutral-700">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-xs text-neutral-400">
                                For demo purposes, you can use any name and email.
                            </p>
                        </CardContent>
                        <CardFooter className="flex-col gap-4">
                            <Button type="submit" className="w-full py-6 text-base shadow-sunset-sm hover:shadow-sunset-md transition-all active:scale-[0.98]" disabled={isLoading}>
                                {isLoading ? 'Creating account...' : 'Create account'}
                            </Button>
                            <p className="text-sm text-neutral-500">
                                Already have an account?{' '}
                                <Link href="/sign-in" className="text-sunset-500 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
