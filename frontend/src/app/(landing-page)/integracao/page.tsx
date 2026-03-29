"use client";

import { Hero } from "./components/Hero";
import { Ecosystem } from "./components/Ecosystem";
import { Sinergia } from "./components/Sinergia";

export default function Integracao() {
  return (
    <main className="min-h-screen bg-white">
      {/* 
        PREMIUM EDITORIAL IDENTITY:
        Following the DESIGN_GUIDELINE.md for Cinematic Desktop -> Editorial Mobile overlap.
      */}
      <Hero />
      
      {/* 
        STRATEGIC ECOSYSTEM:
        Detailed list of integrated services with warm beige background and 
        premium spacing (py-32/48).
      */}
      <Ecosystem />
      
      {/* 
        SINERGIA SECTION:
        Dark contrast section (#0F172A) with a bento grid for the group's units.
      */}
      <Sinergia />
    </main>
  );
}
