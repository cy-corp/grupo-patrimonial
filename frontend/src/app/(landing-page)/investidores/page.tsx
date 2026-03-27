"use client";

import React from "react";
import { InvestorsHero } from "@/components/investidores/InvestorsHero";
import { BusinessModels } from "@/components/investidores/BusinessModels";
import { InvestorsCTA } from "@/components/investidores/InvestorsCTA";

export default function InvestidoresPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Section 1: Hero de Investidores */}
      <InvestorsHero />

      {/* Section 2: Modelos de Negócio */}
      <BusinessModels />

      {/* Section 3: Call to Action Final */}
      <InvestorsCTA />
    </main>
  );
}
