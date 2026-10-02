import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/construtora", destination: "https://www.dcorp.com.br", permanent: true },
      { source: "/engenharia", destination: "https://www.dcorp.com.br", permanent: true },
      { source: "/imobiliaria", destination: "https://www.gruporendal.com", permanent: true },
      { source: "/incorporadora", destination: "https://www.gruporendal.com", permanent: true },
      { source: "/patrimonial", destination: "https://www.gruporendal.com", permanent: true },
      { source: "/integracao", destination: "https://www.gruporendal.com", permanent: true },
      { source: "/processos", destination: "https://www.gruporendal.com/quem-somos", permanent: true },
      { source: "/orcamento", destination: "https://www.dcorp.com.br/contato", permanent: true },
      { source: "/investidores", destination: "https://www.gruporendal.com/contato", permanent: true },
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
