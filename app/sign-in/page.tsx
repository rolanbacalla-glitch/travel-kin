'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';
import { useAuth } from '@/lib/hooks';

export default function SignInPage() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        signIn(email);
        router.push('/destinations');
    };

    return (
        <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center p-4">
            <Link
                href="/"
                className="absolute top-4 left-4 flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to home
            </Link>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sunset-400 to-ocean-500 flex items-center justify-center">
                        <Compass className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-semibold text-neutral-900">Travel Kin</span>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle>Welcome back</CardTitle>
                        <CardDescription>
                            Sign in to continue your journey
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-xs text-neutral-400">
                                For demo purposes, just enter any email to sign in.
                            </p>
                        </CardContent>
                        <CardFooter className="flex-col gap-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </Button>
                            <p className="text-sm text-neutral-500">
                                Don't have an account?{' '}
                                <Link href="/sign-up" className="text-sunset-500 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
