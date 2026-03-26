"use client";

import React, { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showLoading, setShowLoading] = React.useState(false);

  React.useEffect(() => {
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
    setShowLoading(false);
    // Mark as loaded for the rest of the session
    sessionStorage.setItem("gp_has_loaded", "true");
  };

  return (
    <div className="w-full">
      {showLoading && (
        <LoadingScreen onFinished={handleFinished} />
      )}
      
      <motion.div
        initial={showLoading ? { opacity: 0, scale: 1.15, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.15 : 1,
          filter: isLoading ? "blur(10px)" : "blur(0px)"
        }}
        transition={{ 
          duration: 1.5, 
          ease: [0.76, 0, 0.24, 1],
          delay: showLoading ? 0.3 : 0 
        }}
      >
        <Hero />
        <Solutions />
      </motion.div>
    </div>
  );
}
