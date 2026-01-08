import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Golden hour / travel palette
                sand: {
                    50: '#FAF8F5',
                    100: '#F3EFE9',
                    200: '#E8E0D5',
                    300: '#D4C8B8',
                    400: '#B8A68F',
                },
                ocean: {
                    50: '#EEF6F8',
                    100: '#D6EBF0',
                    200: '#B0D9E3',
                    300: '#7FC2D4',
                    400: '#5AAEC5',
                    500: '#4A90A4',
                    600: '#3A7489',
                    700: '#2D6073',
                    800: '#234B5A',
                    900: '#1A3A47',
                },
                sunset: {
                    50: '#FDF6F2',
                    100: '#FAEADE',
                    200: '#F5D4BC',
                    300: '#EFB890',
                    400: '#E8976C',
                    500: '#D97B4C',
                    600: '#C4623A',
                    700: '#A34D2F',
                    800: '#833E28',
                    900: '#6B3322',
                },
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'SF Pro Display',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif',
                ],
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04)',
                'soft-md': '0 4px 12px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.05)',
                'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.06), 0 16px 48px rgba(0, 0, 0, 0.06)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
