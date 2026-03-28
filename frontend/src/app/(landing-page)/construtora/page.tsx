"use client";

import { Hero } from "./components/Hero";
import { Execution } from "./components/Execution";
import { Pillars } from "./components/Pillars";
import { CTA } from "./components/CTA";

/**
 * Editorial Revamp - Construtora
 * Following the premium visual identity with editorial overlaps and cream tones.
 * Modularized into separate components for better maintainability.
 */

export default function ConstrutoraPage() {
  return (
    <main className="min-h-screen bg-[#F8F1E3] flex flex-col pt-16 md:pt-0">
      {/* ─── Hero Section ─── */}
      <Hero />

      {/* ─── Institutional Execution Section ─── */}
      <Execution />

      {/* ─── Service Pillars Section (Refined Puzzle) ─── */}
      <Pillars />

      {/* ─── Final CTA Section ─── */}
      <CTA />
    </main>
  );
}
