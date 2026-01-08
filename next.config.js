/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com'],
        unoptimized: true,
    },
    typescript: {
        // Enforce type checking during builds
        ignoreBuildErrors: false,
    },
    eslint: {
        // Enforce ESLint during builds
        ignoreDuringBuilds: false,
    },

};

module.exports = nextConfig;
