/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Os produtos vem de URLs de imagem externas (achados na internet),
    // entao qualquer host HTTPS e aceito pelo next/image.
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
