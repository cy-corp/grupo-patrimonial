import type { NextConfig } from "next";
import path from "node:path";

export function createNextConfig(appDir: string): NextConfig {
  const workspaceRoot = path.join(appDir, "../..");

  return {
    distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
    outputFileTracingRoot: workspaceRoot,
    turbopack: {
      root: workspaceRoot,
    },
    transpilePackages: ["@grupo-patrimonial/site-config"],
    experimental: {
      externalDir: true,
    },
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "images.unsplash.com" },
        { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      ],
    },
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: false },
  };
}
