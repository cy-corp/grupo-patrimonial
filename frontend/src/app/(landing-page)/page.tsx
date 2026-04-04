"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Solutions />
    </div>
  );
}
