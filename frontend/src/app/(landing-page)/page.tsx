"use client";

import React, { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Solutions } from "@/components/Solutions";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    
    if (hasSeenLoading) {
      setIsLoading(false);
      setShowLoading(false);
    } else {
      setShowLoading(true);
      // Mark as seen so it doesn't show again in this session
      sessionStorage.setItem("hasSeenLoading", "true");
    }
  }, []);

  return (
    <div className="w-full">
      {showLoading && (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      )}
      
      {!isLoading && (
        <>
          <Hero />
          <Solutions />
        </>
      )}
    </div>
  );
}
