"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({
  onFinished,
  onExitComplete
}: {
  onFinished?: () => void;
  onExitComplete?: () => void;
}) {
  const { progress, active } = useProgress();
  const [isFinished, setIsFinished] = useState(false);
  const [visualDone, setVisualDone] = useState(false);
  const [actuallyDone, setActuallyDone] = useState(false);

  // Simple timer to synchronize JS with CSS animation (min 1.8s)
  useEffect(() => {
    const timer = setTimeout(() => setVisualDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Check if both the visual animation is done AND the heavy 3D assets are ready
  const isReadyToHide = progress === 100 && !active && visualDone;

  useEffect(() => {
    if (isReadyToHide && !isFinished) {
      const timer = setTimeout(() => {
        setIsFinished(true); // <--- Triggers the exit animation
        if (onFinished) onFinished(); // <--- Notifies parent to start page entrance
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReadyToHide, isFinished, onFinished]);

  const handleAllComplete = () => {
    setActuallyDone(true);
    if (onExitComplete) onExitComplete();
  };

  // If loading is finished and we've hidden it, don't render anything
  if (actuallyDone) return null;

  return (
    <AnimatePresence onExitComplete={handleAllComplete}>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            transition: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.4
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F1E3]"
        >
          <motion.div
            initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{
              scale: 80,
              opacity: [1, 1, 0],
              filter: "blur(4px)",
              transition: {
                duration: 0.8,
                ease: [0.7, 0, 0.3, 1],
                opacity: { times: [0, 0.6, 1], duration: 0.8 }
              }
            }}
            style={{ willChange: "transform" }}
            className="relative flex flex-col items-center"
          >
            {/* Logo Container */}
            <div className="relative w-72 h-32 md:w-[400px] md:h-48">
              {/* Background Logo (Pale/White version) */}
              <div className="absolute inset-0">
                <img
                  src="/patrimonial-full.png"
                  alt="Patrimonial Incorporações"
                  className="w-full h-full object-contain opacity-10 contrast-0 brightness-200"
                />
              </div>

              {/* Progress Logo (Colored/Filling) - CSS PREMIUM DRIVEN */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none loading-fill-premium"
              >
                <div className="w-72 h-32 md:w-[400px] md:h-48">
                  <img
                    src="/patrimonial-full.png"
                    alt="Patrimonial Incorporações"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 1 } }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A14A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
