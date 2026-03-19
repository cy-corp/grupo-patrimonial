"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="w-full">
      <LoadingScreen onFinished={() => setIsLoading(false)} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero />
        <Solutions />
      </motion.div>
    </div>
  );
}
