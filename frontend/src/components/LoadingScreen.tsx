"use client";

import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { DualBrandLockup } from "@/components/brands/DualBrandLockup";

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

  useEffect(() => {
    const timer = setTimeout(() => setVisualDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const isReadyToHide = progress === 100 && !active && visualDone;

  useEffect(() => {
    if (isReadyToHide && !isFinished) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        if (onFinished) onFinished();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReadyToHide, isFinished, onFinished]);

  const handleAllComplete = () => {
    setActuallyDone(true);
    if (onExitComplete) onExitComplete();
  };

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
              ease: "easeOut",
              delay: 0.4
            }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F1E3]"
        >
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            className="relative flex flex-col items-center gap-8 px-6"
          >
            <DualBrandLockup
              className="gap-3"
              markClassName="max-h-20 max-w-[10rem] sm:max-h-24 sm:max-w-[12rem]"
              pipeClassName="h-16 sm:h-20"
            />
            <div className="h-px w-48 overflow-hidden bg-graphite/10 sm:w-64">
              <div className="h-full bg-primary loading-fill-premium" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
