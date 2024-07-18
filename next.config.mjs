/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.fbod1-1.fna.fbcdn.net',
        port: '',  // Port est généralement vide pour HTTPS
        pathname: '/**',  // Autorise toutes les images de ce domaine
      },
    ],
  }
};

export default nextConfig;
