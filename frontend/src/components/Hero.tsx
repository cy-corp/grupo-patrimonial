"use client";

import React, { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { GoldButton } from "@/components/ui/gold-button";
import { ArrowDown } from "lucide-react";
import { DualBrandLockup } from "@/components/brands/DualBrandLockup";
import { cn } from "@/lib/utils";

function HeroEditorial({
  align = "left",
  children,
}: {
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col", centered ? "items-center text-center" : "items-start text-left")}>
      <h1
        className="max-w-[11ch] text-balance text-[2rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#1F1F1F] min-[380px]:text-[2.1rem] sm:text-[2.4rem] md:text-[3.4rem] lg:text-[3.9rem] xl:text-[4.35rem]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        <span className="whitespace-nowrap">Do negócio</span>
        <br />
        <span className="font-script inline-block whitespace-nowrap text-[1.12em] leading-[0.9] tracking-normal text-primary">
          à obra.
        </span>
      </h1>
      <p className="mt-5 max-w-[34ch] text-pretty font-sans text-[13px] font-medium leading-6 text-[#4D4D4D] md:mt-6 md:text-[15px] md:leading-7">
        Papéis separados, o mesmo critério: a Rendal puxa o empreendimento, a DCorp tira do papel.
      </p>

      {children}

      {!centered && (
        <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-8 border-t border-[#1F1F1F]/10 pt-7 md:mt-10 md:gap-10 md:pt-8">
          <div className="flex min-w-0 flex-col gap-1.5 border-r border-[#1F1F1F]/10 pr-6 md:pr-8">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              01 — Rendal
            </span>
            <p className="font-display text-[1.45rem] leading-none text-[#1F1F1F] md:text-[1.7rem]">
              Incorporação
            </p>
            <p className="max-w-[16ch] font-sans text-xs font-medium leading-5 text-[#4D4D4D]">
              Negócio, capital e produto.
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              02 — DCorp
            </span>
            <p className="font-display text-[1.45rem] leading-none text-[#1F1F1F] md:text-[1.7rem]">
              Engenharia
            </p>
            <p className="max-w-[16ch] font-sans text-xs font-medium leading-5 text-[#4D4D4D]">
              Projeto, técnica e execução.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Only used for desktop mask logic
  const titleRef = useRef<HTMLDivElement>(null);
  // Mobile layout refs
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [maskValue, setMaskValue] = useState("none");
  const [applyOffset, setApplyOffset] = useState(false);

  // Mobile foreground offset — calibrated on S10 (360×760)
  const [mobileOffset, setMobileOffset] = useState({ x: -70, y: -140 });

  // Mobile height lock to prevent address bar layout shifts
  const [mobileHeight, setMobileHeight] = useState("100dvh");
  const [extendedHeight, setExtendedHeight] = useState("100dvh");
  const lastWidthRef = useRef(0);

  // Expansão do background para baixo (faz o background dar zoom natural e se alinhar ao scale-1.25)
  const EXTEND_BG_PX = 200;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      const isFirefox = /Firefox/.test(ua);
      setApplyOffset(!isFirefox);
    }

    const calcMobileOffset = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 768) {
        setMobileHeight("auto");
        setExtendedHeight("auto");
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Congela a altura se for mobile puro (Apenas roda no primeiro Load devida 
      // ao lastWidthRef iniciar em zero). Ignora todos os resizes verticais pós load.
      if (vw !== lastWidthRef.current) {
        setMobileHeight(`${vh}px`);
        setExtendedHeight(`${vh + EXTEND_BG_PX}px`);
        lastWidthRef.current = vw;
      }
      const cardHeight = cardRef.current
        ? cardRef.current.getBoundingClientRect().height
        : 310;
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

    const rect = titleRef.current.getBoundingClientRect();
    const textRightPct = (rect.right / vw) * 100;
    // Buffer maior: começa a desaparecer 25% antes do edge do texto
    // e termina 20% depois — garante cobertura em qualquer zoom/viewport
    const fadeStart = Math.max(textRightPct - 25, 0);
    const fadeEnd = Math.min(textRightPct + 20, 100);

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
      className="relative md:min-h-screen overflow-hidden bg-white md:!h-auto"
      style={{ height: extendedHeight }}
    >

      {/* ===================== */}
      {/* === MOBILE LAYOUT === */}
      {/* ===================== */}
      <div
        ref={mobileContainerRef}
        className="block md:hidden relative w-full overflow-hidden flex flex-col pt-28 px-4"
        style={{
          height: extendedHeight,
          paddingBottom: "env(safe-area-inset-bottom, 0px)"
        }}
      >

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
          className="relative z-10 flex w-full flex-shrink-0 flex-col items-center rounded-[32px] bg-white px-6 pb-28 pt-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-[1px] w-6 flex-shrink-0 bg-primary" />
            <span className="text-primary font-sans text-[9px] tracking-[0.28em] uppercase font-semibold leading-none">
              Incorporação e engenharia
            </span>
          </div>

          <DualBrandLockup
            className="mb-6 w-[min(100%,17rem)] justify-center gap-3"
            markClassName="w-[42%] max-h-[3.5rem]"
            pipeClassName="h-10"
          />

          <HeroEditorial align="center">
            <GoldButton
              href="#projetos"
              className="mt-6 rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl sm:text-xs"
            >
              Saiba Mais
              <ArrowDown className="ml-3 size-4" aria-hidden="true" />
            </GoldButton>
          </HeroEditorial>
        </motion.div>

        <motion.div
          className="pointer-events-none relative z-20 mt-[-20px] flex w-full flex-1 items-end justify-center sm:mt-[-10px]"
          style={{
            transform: `translateX(${mobileOffset.x}px) translateY(${mobileOffset.y}px)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
        >
          <img
            src="/house-transparent-mobile.png"
            alt=""
            className="h-full w-full scale-[1.25] select-none object-cover object-top"
            style={{
              objectPosition: "50% top",
              maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Espaçador Fantasma - Ele ocupa a altura extra da seção criada acima.
            Isso trava a imagem da frente no tamanho exato original, impedindo 
            que ela bugar de vez, mas permitindo que o Background (que é absoluto) 
            ocupe os 200px extras, ganhe zoom natural e desça cobrindo a seção de baixo! */}
        <div style={{ height: `${EXTEND_BG_PX}px` }} className="w-full flex-shrink-0" />

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
      <div className="hidden md:flex relative z-10 w-full max-w-[1600px] px-8 md:px-16 lg:px-24 items-center justify-center min-h-[calc(100vh-6rem)] mt-24 pb-8">

        {/* THE FUSION CANVAS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[72vh] w-full rounded-[40px] md:rounded-[60px] overflow-hidden drop-shadow-[0_45px_100px_rgba(0,0,0,0.15)] isolate"
        >
          {/* THE HOLE & WHITE BACKGROUND */}
          <div className="absolute right-6 top-6 bottom-6 md:right-8 md:top-8 md:bottom-8 md:w-[30%] lg:w-[35%] xl:w-[40%] rounded-[30px] md:rounded-[50px] shadow-[0_0_0_9999px_white] z-0 pointer-events-none transition-all duration-700 ease-in-out" />

          {/* CONTENT LAYER */}
          <div className="relative z-10 flex flex-row items-stretch min-h-[75vh] lg:min-h-[80vh]">

            {/* LEFT SIDE: TEXT */}
            <div
              ref={titleRef}
              className="relative z-[20] flex w-full min-h-[75vh] lg:min-h-[80vh] flex-col justify-center gap-8 p-8 md:w-[56%] md:p-12 lg:w-[52%] lg:px-16 lg:py-16 lg:pl-20 xl:w-[48%]"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center gap-4"
              >
                <div className="h-[2px] w-12 bg-primary" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-primary md:text-xs">
                  Incorporação e engenharia
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="max-w-[28rem]"
              >
                <DualBrandLockup
                  className="mb-8 w-[min(100%,19rem)] justify-start gap-4"
                  markClassName="w-[42%] max-h-[4.75rem]"
                  pipeClassName="h-14"
                />
                <HeroEditorial />
              </motion.div>

              <GoldButton
                href="#projetos"
                className="w-fit rounded-full px-10 py-5 text-[11px] font-bold uppercase tracking-[0.32em] group shadow-2xl md:text-xs"
              >
                Saiba Mais
                <ArrowDown className="ml-3 w-4 h-4 transition-transform group-hover:translate-y-1" />
              </GoldButton>
            </div>

            {/* RIGHT SIDE: THE HOLE (spacer) */}
            <div className="md:w-[42%] lg:w-[46%] xl:w-[50%] pointer-events-none transition-all duration-700 ease-in-out" />

          </div>
        </motion.div>
      </div>

      {/* DESKTOP FOREGROUND PNG — mask fluída para não colidir com o texto */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block z-[55]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        style={{
          filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.5))",
          pointerEvents: "none",
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
