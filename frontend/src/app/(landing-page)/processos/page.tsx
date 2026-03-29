"use client";

import { Hero } from "./components/Hero";
import { Pillars } from "./components/Pillars";
import { Quality } from "./components/Quality";
import { Quote } from "./components/Quote";

export default function Processos() {
  return (
    <main className="min-h-screen bg-white">
      {/* 
        PREMIUM EDITORIAL IDENTITY:
        Following the DESIGN_GUIDELINE.md for Cinematic Desktop -> Editorial Mobile overlap.
      */}
      <Hero />
      
      {/* 
        PILLARS OF TRUST:
        Grid-based section for business pillars with micro-animations.
      */}
      <Pillars />
      
      {/* 
        QUALITY SECTION:
        High-fidelity infrastructure with stats and quality seal.
      */}
      <Quality />
      
      {/* 
        EXECUTIVE QUOTE:
        Clean, centered quote with elegant typography.
      */}
      <Quote />
    </main>
  );
}
