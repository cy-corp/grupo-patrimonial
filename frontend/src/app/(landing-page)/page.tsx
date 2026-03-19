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
        initial={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.15 : 1,
          filter: isLoading ? "blur(10px)" : "blur(0px)"
        }}
        transition={{ 
          duration: 1.5, 
          ease: [0.76, 0, 0.24, 1],
          delay: 0.3 
        }}
      >
        <Hero />
        <Solutions />
      </motion.div>
    </div>
  );
}
