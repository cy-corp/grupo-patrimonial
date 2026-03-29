"use client";

import { Hero } from "./components/Hero";
import { ConsultativeApproach } from "./components/ConsultativeApproach";
import { Specialties } from "./components/Specialties";
import { StrategicPublic } from "./components/StrategicPublic";
import { MissionCTA } from "./components/MissionCTA";

export default function Patrimonial() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* 
        PREMIUM EDITORIAL IDENTITY:
        Following the DESIGN_GUIDELINE.md for Patrimonial Division.
      */}
      
      <Hero />
      
      {/* 
        BRAND PHILOSOPHY:
        Consultative approach section with high-end editorial quoting.
      */}
      <ConsultativeApproach />
      
      {/* 
        SPECIALTIES / MODALITIES:
        Deep-dive into service offerings via a refined bento-grid layout.
      */}
      <Specialties />
      
      {/* 
        TARGET AUDIENCE:
        Dark-mode section focusing on high-net-worth strategic players.
      */}
      <StrategicPublic />
      
      {/* 
        MISSION & CONVERSION:
        Final call to action reinforcing the core value of "perpetuation".
      */}
      <MissionCTA />
    </main>
  );
}
