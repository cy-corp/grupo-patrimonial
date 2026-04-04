"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref no span do PATRIMONIAL — o elemento mais largo, incluindo o italic overflow
  const titleRef = useRef<HTMLSpanElement>(null);

  // Máscara fluida — calculada a partir da borda direita real do container de texto
  const [maskValue, setMaskValue] = useState("none");

  const updateMask = useCallback(() => {
    if (!titleRef.current) return;

    const vw = window.innerWidth;

    // Em telas muito grandes não há risco de colisão
    if (vw >= 1536) {
      setMaskValue("none");
      return;
    }

    const rect = titleRef.current.getBoundingClientRect();
    // Borda direita do próprio texto PATRIMONIAL (inclui o overflow visual do italic)
    const textRightPct = (rect.right / vw) * 100;

    // Fade começa logo antes do texto, termina com folga para o italic não vazar
    const fadeStart = Math.max(textRightPct - 5, 0);
    const fadeEnd = Math.min(textRightPct + 18, 100);

    setMaskValue(
      `linear-gradient(to right, transparent 0%, transparent ${fadeStart.toFixed(1)}%, black ${fadeEnd.toFixed(1)}%, black 100%)`
    );
  }, []);

  useEffect(() => {
    updateMask();

    const observer = new ResizeObserver(updateMask);
    if (titleRef.current) observer.observe(titleRef.current);
    window.addEventListener("resize", updateMask);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMask);
    };
  }, [updateMask]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 py-24 md:py-0"
    >
      {/* WHITE SIDE BORDERS (straight edges down the sides) */}
      <div className="absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-white z-[60] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-4 md:w-6 bg-white z-[60] pointer-events-none" />

      {/* CONCAVE CORNERS (SVG Fillets) for perfectly smooth structural transitions */}
      {/* Top Left Fillet */}
      <svg
        className="absolute left-4 md:left-6 top-24 w-8 h-8 md:w-12 md:h-12 z-[60] pointer-events-none text-white fill-current"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0,0 L100,0 A100,100 0 0,0 0,100 Z" />
      </svg>

      {/* Top Right Fillet */}
      <svg
        className="absolute right-4 md:right-6 top-24 w-8 h-8 md:w-12 md:h-12 z-[60] pointer-events-none text-white fill-current"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M100,0 L0,0 A100,100 0 0,1 100,100 Z" />
      </svg>

      {/* 1. LAYER 0: FULL-SCREEN BACKGROUND */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Imagem base — define o sistema de coordenadas */}
        <img
          src="/house-with-background.png"
          alt="Original Scenario"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75]"
        />

        <div className="absolute inset-0 bg-black/10 pointer-events-none" style={{ zIndex: 20 }} />
      </motion.div>

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-[50vw] h-full bg-white/5 skew-x-[-12deg] translate-x-[20%] pointer-events-none z-1" />

      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-[1600px] z-10 translate-y-10 px-8 md:px-16 lg:px-24">

        {/* THE FUSION CANVAS (Punch-through shadow technique) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-[80vh] w-full rounded-[40px] md:rounded-[60px] overflow-hidden drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)] isolate"
        >

          {/* THE HOLE & THE WHITE BACKGROUND */}
          <div className="hidden md:block absolute right-6 top-6 bottom-6 md:right-8 md:top-8 md:bottom-8 md:w-[30%] lg:w-[35%] xl:w-[40%] rounded-[30px] md:rounded-[50px] shadow-[0_0_0_9999px_white] z-0 pointer-events-none transition-all duration-700 ease-in-out" />

          {/* Mobile Fallback Background */}
          <div className="md:hidden absolute inset-0 bg-white z-0" />

          {/* CONTENT LAYER */}
          <div className="relative z-10 flex flex-col md:flex-row items-stretch h-full min-h-[60vh] md:min-h-[75vh] lg:min-h-[80vh]">

            {/* LEFT SIDE: TEXTUAL CONTENT */}
            <div className="w-full md:w-[70%] lg:w-[65%] xl:w-[60%] flex flex-col justify-center p-8 md:p-14 lg:p-20 lg:pl-24 transition-all duration-700 ease-in-out">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-[2px] bg-primary" />
                <span className="text-primary font-sans text-xs md:text-sm tracking-[0.5em] uppercase font-bold">
                  Real Estate & Incorporação
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-[900px]"
              >
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.85] text-[#0F172A] mb-12 uppercase tracking-tighter"
                  style={{ fontFamily: "'Anglecia Pro Display', serif", fontWeight: "normal" }}
                >
                  GRUPO <br />
                  <span
                    ref={titleRef}
                    className="inline-block"
                  >
                    PATRIMONIAL
                  </span>
                </h1>

                <div className="flex flex-col items-start gap-8 mt-4">
                  <p className="text-[#0F172A]/40 text-xs md:text-sm font-bold leading-relaxed uppercase tracking-widest">
                    Excelência técnica e visão estratégica.
                  </p>

                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-[#0F172A] transition-all duration-500 rounded-full px-12 py-8 text-xs md:text-sm font-bold uppercase tracking-[0.4em] group shadow-xl shadow-primary/20"
                  >
                    Ver Projetos
                    <MoveUpRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: THE HOLE */}
            <div className="hidden md:block md:w-[30%] lg:w-[35%] xl:w-[40%] pointer-events-none transition-all duration-700 ease-in-out" />

          </div>

        </motion.div>

      </div>

      {/* FOREGROUND PNG — drop-shadow estático + safe area via mask-image */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        style={{
          filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.5))",
          zIndex: 50,
          maskImage: maskValue,
          WebkitMaskImage: maskValue,
        }}
      >
        <motion.img
          src="/house-transparent.png"
          alt="Foreground Building"
          initial={{ filter: "brightness(0.75)" }}
          animate={{ filter: "brightness(1)" }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.3 }}
          className="w-full h-full object-cover object-center select-none"
        />
      </motion.div>


    </section>
  );
}
