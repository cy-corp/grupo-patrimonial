"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showLoading, setShowLoading] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Check if the loading screen has already been shown in this session
    const hasLoaded = sessionStorage.getItem("gp_has_loaded");
    if (hasLoaded) {
      setIsLoading(false);
      setShowLoading(false);
    } else {
      setShowLoading(true);
    }
  }, []);

  const handleFinished = () => {
    setIsLoading(false);
    // Let the LoadingScreen handle its own exit animation
    // Mark as loaded for the rest of the session
    sessionStorage.setItem("gp_has_loaded", "true");
  };

  const handleExitComplete = () => {
    setShowLoading(false);
  };

  // Prevent flash content before mounting (Next.js Hydration safety)
  if (!mounted) {
    return <div className="w-full h-screen bg-[#F8F1E3]" />;
  }

  return (
    <div className="w-full">
      {showLoading && (
        <LoadingScreen onFinished={handleFinished} onExitComplete={handleExitComplete} />
      )}
      
      <motion.div
        initial={showLoading ? { opacity: 0, scale: 1.1, filter: "blur(15px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.1 : 1,
          filter: isLoading ? "blur(15px)" : "blur(0px)"
        }}
        transition={{ 
          duration: 1.0, 
          ease: [0.76, 0, 0.24, 1],
          delay: showLoading ? 0.4 : 0 
        }}
      >
        <Hero />
        <Solutions />
      </motion.div>
    </div>
  );
}
