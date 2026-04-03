"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

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

      {/* 1. LAYER 0: FULL-SCREEN BACKGROUND + FOREGROUND ALINHADOS */}
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
      <div className="relative w-full max-w-[1400px] z-10 translate-y-10">

        {/* THE FUSION CANVAS (Punch-through shadow technique) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[60vh] md:min-h-[75vh] w-full rounded-[40px] md:rounded-[60px] overflow-hidden drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)] isolate"
        >

          {/* THE HOLE & THE WHITE BACKGROUND 
              This div is the transparent hole. 
              Its ridiculously huge white shadow fills everything else.
          */}
          <div className="hidden md:block absolute right-6 top-6 bottom-6 md:right-8 md:top-8 md:bottom-8 w-[42%] rounded-[30px] md:rounded-[50px] shadow-[0_0_0_9999px_white] z-0 pointer-events-none" />

          {/* Mobile Fallback Background (since shadow logic is tricky on mobile) */}
          <div className="md:hidden absolute inset-0 bg-white z-0" />

          {/* CONTENT LAYER */}
          <div className="relative z-10 flex flex-col md:flex-row items-stretch h-full min-h-[60vh] md:min-h-[75vh]">

            {/* LEFT SIDE: TEXTUAL CONTENT (58%) */}
            <div className="w-full md:w-[58%] flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-4 mb-10"
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
              >
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-heading font-black leading-[0.85] text-[#0F172A] mb-12 uppercase tracking-tight">
                  GRUPO <br />
                  <span
                    style={{ WebkitTextStroke: "1px rgba(15, 23, 42, 0.1)", color: "transparent" }}
                    className="italic inline-block"
                  >
                    PATRIMONIAL
                  </span>
                </h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12 mt-10">
                  <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-[#0F172A] transition-all duration-500 rounded-full px-14 py-8 text-xs md:text-sm font-bold uppercase tracking-[0.4em] group shadow-xl shadow-primary/20"
                  >
                    Ver Projetos
                    <MoveUpRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>

                  <p className="text-[#0F172A]/40 text-xs md:text-sm max-w-[280px] font-bold leading-relaxed uppercase tracking-widest border-l border-[#0F172A]/10 pl-8">
                    Excelência técnica e visão estratégica.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: THE HOLE (42%)
                Just empty space to let the shadow cutout work.
            */}
            <div className="hidden md:block w-[42%] pointer-events-none" />

          </div>

        </motion.div>

        {/* no foreground here — moved to section level */}

      </div>

      {/* FOREGROUND PNG — filho direto da section, z-[50] fica na frente dos cards */}
      <motion.img
        src="/house-transparent.png"
        alt="Foreground Building"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        className="absolute pointer-events-none select-none hidden md:block z-[50]"
        style={{
          filter: "drop-shadow(0 60px 120px rgba(0,0,0,0.5))",
          width: "90%",
          height: "auto",
          right: "0%",
          bottom: "0%",
          top: "auto",
          left: "auto",
        }}
      />


    </section>
  );
}
