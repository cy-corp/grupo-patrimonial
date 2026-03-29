"use client";

import { Hero } from "./components/Hero";
import { Pillars } from "./components/Pillars";
import { TechnicalExcellence } from "./components/TechnicalExcellence";
import { CTA } from "./components/CTA";

export default function Imobiliaria() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* 
        PREMIUM EDITORIAL IDENTITY:
        Following the DESIGN_GUIDELINE.md for Cinematic Desktop -> Editorial Mobile overlap.
      */}
      
      <Hero />
      
      {/* 
        STRATEGIC PILLARS:
        Minimalist grid with high-end typography (font-heading XXL) and gold highlights.
      */}
      <Pillars />
      
      {/* 
        TECHNICAL EXCELLENCE:
        Editorial layout with large architectural imagery and detailed technical copy.
      */}
      <TechnicalExcellence />
      
      {/* 
        CONVERSION SECTION:
        Final call to action with a warm palette (#F8F1E3) and GoldButton component.
      */}
      <CTA />
    </main>
  );
}
