/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
        port: '',  // Port est généralement vide pour HTTPS
        pathname: '/**',  // Autorise toutes les images de ce domaine
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
        port: '',  // Port est généralement vide pour HTTPS
        pathname: '/**',  // Autorise toutes les images de ce domaine
      },
    ],
  }
};

export default nextConfig;
