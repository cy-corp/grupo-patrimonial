"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GoldButton } from "@/components/ui/gold-button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Only used for desktop mask logic
  const titleRef = useRef<HTMLSpanElement>(null);
  // Mobile layout refs
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [maskValue, setMaskValue] = useState("none");

  // Mobile foreground offset — calibrated on S10 (360×760)
  // x = -70/360 = -19.44% vw | y = -140/760 = -18.42% svh
  const [mobileOffset, setMobileOffset] = useState({ x: -70, y: -140 });

  useEffect(() => {
    const calcMobileOffset = () => {
      if (window.innerWidth >= 768) return;
      const vw = window.innerWidth;
      // y is anchored to the card height, not the viewport height.
      // The card has nearly fixed height (content-driven), so the visual
      // overlap stays constant across any phone — tall or short.
      // Calibrated: S10 card ~310px → 310 * 0.45 ≈ 140px (perfect on S10).
      const cardHeight = cardRef.current
        ? cardRef.current.getBoundingClientRect().height
        : 310; // safe fallback
      setMobileOffset({
        x: -(vw * 0.1944),
        y: -(cardHeight * 0.45),
      });
    };
    calcMobileOffset();
    window.addEventListener("resize", calcMobileOffset);
    // Re-calc if card content reflows (e.g. font load)
    const cardObserver = new ResizeObserver(calcMobileOffset);
    if (cardRef.current) cardObserver.observe(cardRef.current);
    return () => {
      window.removeEventListener("resize", calcMobileOffset);
      cardObserver.disconnect();
    };
  }, []);

  const updateMask = useCallback(() => {
    const vw = window.innerWidth;

    // Mobile: no mask needed
    if (vw < 768) {
      setMaskValue("none");
      return;
    }

    if (!titleRef.current) return;

    // Em telas muito grandes não há risco de colisão
    if (vw >= 1536) {
      setMaskValue("none");
      return;
    }

    const rect = titleRef.current.getBoundingClientRect();
    const textRightPct = (rect.right / vw) * 100;
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
      className="relative min-h-screen overflow-hidden bg-white"
    >

      {/* ===================== */}
      {/* === MOBILE LAYOUT === */}
      {/* ===================== */}
      <div ref={mobileContainerRef} className="block md:hidden relative w-full h-[100svh] overflow-hidden flex flex-col pt-28 px-4 pb-0">

        {/* Thin side borders — mobile only */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white z-[60] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white z-[60] pointer-events-none" />

        {/* Concave corner fillets — mobile only, alinhados com as bordas */}
        <svg
          className="absolute left-1 top-24 w-6 h-6 z-[60] pointer-events-none text-white fill-current"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L100,0 A100,100 0 0,0 0,100 Z" />
        </svg>
        <svg
          className="absolute right-1 top-24 w-6 h-6 z-[60] pointer-events-none text-white fill-current"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M100,0 L0,0 A100,100 0 0,1 100,100 Z" />
        </svg>

        {/* Background mobile — full screen */}
        <motion.div
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/house-with-background-mobile.png"
            alt="Background"
            className="w-full h-full object-cover object-top translate-y-10"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </motion.div>

        {/* White card at top (after header margin) */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 bg-white rounded-[32px] w-full px-5 pt-10 pb-8 flex flex-col items-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex-shrink-0"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-6 h-[1px] bg-primary flex-shrink-0" />
            <span className="text-primary font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-bold leading-none">
              Real Estate & Incorporação
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[2.6rem] sm:text-5xl leading-[0.9] text-[#0F172A] mb-4 uppercase tracking-tighter"
            style={{ fontFamily: "'Anglecia Pro Display', serif", fontWeight: "normal" }}
          >
            GRUPO <br />
            <span className="inline-block mt-1">PATRIMONIAL</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#0F172A]/50 text-[9px] sm:text-[10px] font-bold leading-relaxed uppercase tracking-widest mb-6">
            Excelência técnica e visão estratégica.
          </p>

          {/* CTA */}
          <GoldButton
            className="rounded-full px-8 py-5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] group cursor-pointer w-full max-w-[280px] mx-auto flex items-center justify-center shadow-xl"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
          >
            Ver Projetos
            <ArrowDown className="ml-3 w-4 h-4 transition-transform group-hover:translate-y-1" />
          </GoldButton>
        </motion.div>

        {/* Foreground building PNG — its tip touching the card */}
        {/* Positioning via style (not animated). Only opacity fades in.
            Because opacity=0 + 0.4s delay, useEffect corrects x/y before
            the element ever becomes visible — no slide artifact. */}
        <motion.div
          className="relative z-20 flex-1 w-full flex items-end justify-center pointer-events-none mt-[-20px] sm:mt-[-10px]"
          style={{
            transform: `translateX(${mobileOffset.x}px) translateY(${mobileOffset.y}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
        >
          <motion.img
            src="/house-transparent-mobile.png"
            alt="Foreground Building"
            initial={{ filter: "brightness(0.75)" }}
            animate={{ filter: "brightness(1)" }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.4 }}
            className="w-full h-full object-cover object-top scale-[1.25] select-none drop-shadow-[0_-15px_35px_rgba(0,0,0,0.4)]"
            style={{
              objectPosition: "50% top",
              maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            }}
          />
        </motion.div>

      </div>

      {/* ======================= */}
      {/* === DESKTOP LAYOUT  === */}
      {/* ======================= */}

      {/* WHITE SIDE BORDERS */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-4 md:w-6 bg-white z-[60] pointer-events-none" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-4 md:w-6 bg-white z-[60] pointer-events-none" />

      {/* CONCAVE CORNERS (SVG Fillets) */}
      <svg
        className="hidden md:block absolute left-4 md:left-6 top-24 w-8 h-8 md:w-12 md:h-12 z-[60] pointer-events-none text-white fill-current"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0,0 L100,0 A100,100 0 0,0 0,100 Z" />
      </svg>
      <svg
        className="hidden md:block absolute right-4 md:right-6 top-24 w-8 h-8 md:w-12 md:h-12 z-[60] pointer-events-none text-white fill-current"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M100,0 L0,0 A100,100 0 0,1 100,100 Z" />
      </svg>

      {/* DESKTOP BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="hidden md:block absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="/house-with-background.png"
          alt="Original Scenario"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" style={{ zIndex: 20 }} />
      </motion.div>

      {/* BACKGROUND DECORATION */}
      <div className="hidden md:block absolute top-0 right-0 w-[50vw] h-full bg-white/5 skew-x-[-12deg] translate-x-[20%] pointer-events-none z-1" />

      {/* DESKTOP MAIN CONTAINER */}
      <div className="hidden md:flex relative w-full max-w-[1600px] z-10 translate-y-10 px-8 md:px-16 lg:px-24 items-center justify-center min-h-screen">

        {/* THE FUSION CANVAS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[60vh] md:min-h-[75vh] lg:min-h-[80vh] w-full rounded-[40px] md:rounded-[60px] overflow-hidden drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)] isolate"
        >
          {/* THE HOLE & WHITE BACKGROUND */}
          <div className="absolute right-6 top-6 bottom-6 md:right-8 md:top-8 md:bottom-8 md:w-[30%] lg:w-[35%] xl:w-[40%] rounded-[30px] md:rounded-[50px] shadow-[0_0_0_9999px_white] z-0 pointer-events-none transition-all duration-700 ease-in-out" />

          {/* CONTENT LAYER */}
          <div className="relative z-10 flex flex-row items-stretch h-full min-h-[60vh] md:min-h-[75vh] lg:min-h-[80vh]">

            {/* LEFT SIDE: TEXT */}
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

                  <GoldButton
                    className="rounded-full px-12 py-8 text-xs md:text-sm font-bold uppercase tracking-[0.4em] group cursor-pointer flex items-center shadow-2xl"
                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                  >
                    Ver Projetos
                    <ArrowDown className="ml-3 w-4 h-4 transition-transform group-hover:translate-y-1" />
                  </GoldButton>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: THE HOLE (spacer) */}
            <div className="md:w-[30%] lg:w-[35%] xl:w-[40%] pointer-events-none transition-all duration-700 ease-in-out" />

          </div>
        </motion.div>
      </div>

      {/* DESKTOP FOREGROUND PNG — mask fluída para não colidir com o texto */}
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
