"use client";

import { useState, useEffect, useRef } from "react";
import { Building2, Truck, HardHat, BarChart3, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

/**
 * SERVICE PILLARS COMPONENT
 * Implements a "Premium Puzzle" design where cards interlock via scroll.
 * Pieces fly in from the corners as the user scrolls into the section.
 */

const services = [
  {
    icon: <Building2 className="w-8 h-8 text-[#C9A14A]" />,
    title: "Obras Civis",
    description: "Execução de edifícios corporativos e residências de alto padrão com excelência em acabamentos.",
    color: "bg-white",
    textColor: "text-[#0F172A]",
    descColor: "text-[#0F172A]/60",
    iconBg: "bg-[#0F172A]/5",
    type: "top-left",
    offsetX: -200,
    offsetY: -150,
  },
  {
    icon: <Truck className="w-8 h-8 text-[#C9A14A]" />,
    title: "Infraestrutura",
    description: "Urbanização e pavimentação de loteamentos, aumentando a valorização do ativo.",
    color: "bg-[#162032]",
    textColor: "text-white",
    descColor: "text-white/55",
    iconBg: "bg-white/5",
    type: "top-right",
    offsetX: 200,
    offsetY: -150,
  },
  {
    icon: <HardHat className="w-8 h-8 text-[#C9A14A]" />,
    title: "Administração",
    description: "Modelos de contratação flexíveis com transparência total e controle técnico rigoroso.",
    color: "bg-[#3B2D12]",
    textColor: "text-[#C9A14A]",
    descColor: "text-white/55",
    iconBg: "bg-white/5",
    type: "bottom-left",
    offsetX: -200,
    offsetY: 150,
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-[#C9A14A]" />,
    title: "Controle & Gestão",
    description: "Gestão de cronogramas e orçamentos com relatórios constantes de evolução e qualidade.",
    color: "bg-[#0F172A]",
    textColor: "text-white",
    descColor: "text-white/55",
    iconBg: "bg-white/5",
    type: "bottom-right",
    offsetX: 200,
    offsetY: 150,
  },
];

const PUZZLE_PATHS = {
  "top-left": "M10,10 H90 V40 C100,40 100,60 90,60 V90 H60 C60,100 40,100 40,90 H10 V10 Z",
  "top-right": "M10,10 H90 V90 H60 C60,100 40,100 40,90 H10 V60 C20,60 20,40 10,40 V10 Z",
  "bottom-left": "M10,10 H40 C40,20 60,20 60,10 H90 V40 C100,40 100,60 90,60 V90 H10 V10 Z",
  "bottom-right": "M10,10 H40 C40,20 60,20 60,10 H90 V90 H10 V60 C20,60 20,40 10,40 V10 Z"
};

export function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth out the scroll progress
  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="bg-[#F8F1E3] py-24 md:pt-48 md:pb-64 overflow-hidden min-h-[140vh] md:min-h-[140vh]">
      <div className="container mx-auto px-6 lg:px-24 sticky top-12 md:top-40">
        {/* Header Section */}
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans text-[10px] tracking-[0.4em] uppercase font-bold text-[#C9A14A] block mb-4"
            >
              MODALIDADES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight md:tracking-tighter leading-tight md:leading-[0.9] text-[#0F172A]"
            >
              PILARES DE <br />
              <span className="text-[#C9A14A]">EXPERTISE</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-sans text-[#0F172A]/70 text-base md:text-lg max-w-sm mb-2"
          >
            Soluções integradas com rigor técnico para a materialização de grandes ativos imobiliários.
          </motion.p>
        </div>

        {/* Puzzle Grid Layout */}
        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-0 gap-6">
          {services.map((service, idx) => (
            <PuzzlePiece
              key={idx}
              service={service}
              idx={idx}
              progress={progress}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PuzzlePiece({ service, idx, progress, isMobile }: { service: typeof services[0], idx: number, progress: any, isMobile: boolean }) {
  // Desktop movement based on scroll
  const desktopX = useTransform(progress, [0, 0.45], [service.offsetX, 0]);
  const desktopY = useTransform(progress, [0, 0.45], [service.offsetY, 0]);
  const desktopRotate = useTransform(progress, [0, 0.45], [idx % 2 === 0 ? -10 : 10, 0]);

  // Mobile movement (just a subtle fade and lift)
  const mobileY = useTransform(progress, [0, 0.1, 0.25], [100, 0, 0], { clamp: true });
  const opacity = useTransform(progress, [0, 0.15, 0.4], [0, 1, 1]);

  const x = isMobile ? 0 : desktopX;
  const y = isMobile ? mobileY : desktopY;
  const rotate = isMobile ? 0 : desktopRotate;

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        rotate,
        ...(isMobile ? {} : {
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='${PUZZLE_PATHS[service.type as keyof typeof PUZZLE_PATHS]}' /%3E%3C/svg%3E")`,
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='${PUZZLE_PATHS[service.type as keyof typeof PUZZLE_PATHS]}' /%3E%3C/svg%3E")`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }),
        zIndex: 10 - idx,
      }}
      className={`
        relative min-h-[350px] md:min-h-[420px] p-10 md:p-12 flex flex-col justify-center
        ${service.color} transition-all duration-500
        ${!isMobile && idx === 1 ? 'md:-ml-[10%]' : ''} 
        ${!isMobile && idx >= 2 ? 'md:-mt-[10%]' : ''} 
        ${!isMobile && idx === 3 ? 'md:-ml-[10%]' : ''}
        ${isMobile ? 'rounded-2xl shadow-xl' : ''}
      `}
    >
      <div className={`relative z-10 w-full ${isMobile ? '' : 'md:pl-16'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`w-14 h-14 ${service.iconBg} rounded-2xl flex items-center justify-center mb-10 border border-white/10 backdrop-blur-sm shadow-sm ring-1 ring-white/20`}
        >
          {service.icon}
        </motion.div>

        <h3 className={`font-heading text-2xl md:text-3xl font-black uppercase tracking-tight ${service.textColor} mb-6 leading-[0.9]`}>
          {service.title}
        </h3>

        <p className={`font-sans ${service.descColor} text-base md:text-lg leading-relaxed max-w-[280px]`}>
          {service.description}
        </p>

      </div>

      <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Decorative subtle texture/numbering */}
      <span className={`absolute top-8 right-10 font-heading text-8xl font-black ${service.textColor} opacity-5 select-none pointer-events-none`}>
        0{idx + 1}
      </span>
    </motion.div>
  );
}

