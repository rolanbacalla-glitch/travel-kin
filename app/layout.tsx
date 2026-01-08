import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider, ToastProvider } from '@/lib/hooks';
import { ToastContainer } from '@/components/ui';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Travel Kin - Travel Together, Safely',
    description: 'Connect with fellow solo travellers, discover local experiences, and explore Southeast Asia with confidence.',
    keywords: ['travel', 'solo travel', 'backpacking', 'Philippines', 'Southeast Asia', 'travel companions'],
    openGraph: {
        title: 'Travel Kin - Travel Together, Safely',
        description: 'Connect with fellow solo travellers, discover local experiences, and explore with confidence.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="min-h-screen bg-sand-50 font-sans antialiased">
                <AuthProvider>
                    <ToastProvider>
                        {children}
                        <ToastContainer />
                    </ToastProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
