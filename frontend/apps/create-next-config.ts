import type { NextConfig } from "next";
import path from "node:path";

type Redirects = NonNullable<NextConfig["redirects"]>;

export function createNextConfig(
  appDir: string,
  extra?: { redirects?: Redirects },
): NextConfig {
  // Git repo root (Vercel path0), not only frontend/. Tracing paths must
  // include the `frontend/` segment or the builder looks for next at
  // /vercel/path0/node_modules instead of /vercel/path0/frontend/node_modules.
  const repoRoot = path.join(appDir, "../../..");

  return {
    distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
    outputFileTracingRoot: repoRoot,
    turbopack: {
      root: repoRoot,
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
    redirects: extra?.redirects,
  };
}
