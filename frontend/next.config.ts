import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/construtora", destination: "/engenharia", permanent: true },
      { source: "/imobiliaria", destination: "/incorporadora", permanent: true },
      { source: "/patrimonial", destination: "/incorporadora", permanent: true },
      { source: "/integracao", destination: "/", permanent: true },
      { source: "/processos", destination: "/quem-somos", permanent: true },
      { source: "/orcamento", destination: "/contato", permanent: true },
      { source: "/investidores", destination: "/contato", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
