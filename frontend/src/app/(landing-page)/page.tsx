"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Solutions />
    </div>
  );
}
