"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SIZE, terrain } from "@/components/hero/terrain";
import { brand } from "@/lib/brand";
import { coverage, instagram } from "@/lib/content";

const links = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/orcamento", label: "Orçamento" },
] as const;

const area = `Atendimento em ${coverage.states.join(" e ")}, em um raio de até ${coverage.radiusKm} km.`;
const year = new Date().getFullYear();
const ease = [0.22, 1, 0.36, 1] as const;

function Nav({ className }: { className: string }) {
  return (
    <ul className={className}>
      {links.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="transition-opacity hover:opacity-70">
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <a href={instagram} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
          Instagram
        </a>
      </li>
    </ul>
  );
}

// A. Logotipo gigante cortado na base, sobre curvas de nível que deslizam.
export function FooterCurvas() {
  return (
    <footer className="relative overflow-hidden bg-brand text-white">
      <div
        className="footer-drift absolute inset-0 bg-white/[0.13]"
        aria-hidden="true"
        style={{ maskImage: "url(/hero/contours.svg)", WebkitMaskImage: "url(/hero/contours.svg)", maskSize: "140% auto", WebkitMaskSize: "140% auto" }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-20 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-10 lg:px-16">
        <div>
          <p className="max-w-sm text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{brand.positioning}</p>
          <Link href="/orcamento" className="mt-8 inline-block bg-orange px-6 py-3.5 text-sm font-bold text-graphite transition-colors hover:bg-white">
            Solicitar orçamento
          </Link>
        </div>
        <Nav className="space-y-3 text-lg font-semibold" />
        <p className="text-sm leading-relaxed text-white/80">{area}</p>
      </div>
      <motion.div
        className="relative mt-16 px-6 sm:px-10 lg:px-16"
        initial={{ y: "45%" }}
        whileInView={{ y: "16%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-i3geo-wordmark-negativo.svg" alt={brand.name} className="w-full" />
      </motion.div>
      <p className="relative bg-[#00485B] px-6 py-4 text-center text-xs text-white/70">
        © {year} {brand.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}

async function loadRows(rows: number, cols: number) {
  const blob = await fetch("/hero/terrain.png").then((r) => r.blob());
  const bitmap = await createImageBitmap(blob, { colorSpaceConversion: "none", premultiplyAlpha: "none" });
  const canvas = document.createElement("canvas");
  canvas.width = SIZE.width;
  canvas.height = SIZE.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D context indisponível");
  ctx.drawImage(bitmap, 0, 0);
  const px = ctx.getImageData(0, 0, SIZE.width, SIZE.height).data;
  const range = terrain.hMax - terrain.hMin;
  return Array.from({ length: rows }, (_, r) => {
    const y = Math.floor((r / (rows - 1)) * (SIZE.height - 1));
    return Array.from({ length: cols }, (_, c) => {
      const x = Math.floor((c / (cols - 1)) * (SIZE.width - 1));
      const i = (y * SIZE.width + x) * 4;
      return (px[i] * 256 + px[i + 1]) / 4 / range;
    });
  });
}

// B. O relevo real em perfis empilhados, que se erguem quando o rodapé aparece.
export function FooterHorizonte() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrap, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<number[][] | null>(null);

  useEffect(() => {
    let alive = true;
    loadRows(46, 220).then((r) => alive && setRows(r));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box || !rows) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let start: number | null = null;

    const draw = (t: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (el.width !== w * dpr || el.height !== h * dpr) {
        el.width = w * dpr;
        el.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const top = h * 0.3;
      const step = (h * 0.62) / rows.length;
      const amp = h * 0.42 * t;
      rows.forEach((row, r) => {
        const base = top + r * step;
        const near = r / (rows.length - 1);
        ctx.beginPath();
        row.forEach((v, c) => {
          const x = (c / (row.length - 1)) * w;
          const y = base - v * amp * (0.45 + near * 0.55);
          if (c) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        });
        ctx.strokeStyle = `rgba(${Math.round(143 + near * 112)},${Math.round(220 + near * 35)},${Math.round(236 + near * 19)},${0.4 + near * 0.6})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = "#03121A";
        ctx.fill();
      });
    };

    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / 1800);
      draw(1 - Math.pow(1 - p, 3));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    if (reduce) draw(1);
    else if (inView) frame = requestAnimationFrame(tick);
    else draw(0.04);

    const onResize = () => draw(inView || reduce ? 1 : 0.04);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [rows, inView, reduce]);

  return (
    <footer className="relative overflow-hidden bg-[#03121A] text-white">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-20 sm:grid-cols-[1.5fr_1fr_1fr] sm:px-10 lg:px-16">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-i3geo-wordmark-negativo.svg" alt={brand.name} className="h-12 w-auto" />
          <p className="mt-5 max-w-xs text-lg leading-snug text-white/80">{brand.positioning}</p>
        </div>
        <Nav className="space-y-3 text-lg font-semibold" />
        <div>
          <p className="text-sm leading-relaxed text-white/75">{area}</p>
          <Link href="/orcamento" className="mt-6 inline-block bg-orange px-6 py-3.5 text-sm font-bold text-graphite transition-colors hover:bg-white">
            Solicitar orçamento
          </Link>
        </div>
      </div>
      <div ref={wrap} className="pointer-events-none relative -mt-6 h-[46vh] min-h-[280px]" aria-hidden="true">
        <canvas ref={canvas} className="size-full" />
      </div>
      <p className="relative border-t border-white/15 px-6 py-4 text-center text-xs text-white/60">
        © {year} {brand.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}

const number = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const UTM = { e: 538743.23, n: 7483265.08, width: 2004.81, height: 2334.77 };

// C. O rodapé como carimbo de prancha técnica, com as coordenadas do cursor ao vivo.
export function FooterPrancha() {
  const frame = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState({ x: 0.62, y: 0.4 });
  const cell = "border-brand/40 p-5 sm:p-7";
  const label = "text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite/60";

  return (
    <footer className="bg-[#F6F4EF] px-4 py-6 text-graphite sm:px-8 sm:py-10">
      <div
        ref={frame}
        onPointerMove={(e) => {
          const box = frame.current?.getBoundingClientRect();
          if (box) setPoint({ x: (e.clientX - box.left) / box.width, y: (e.clientY - box.top) / box.height });
        }}
        className="relative mx-auto max-w-7xl overflow-hidden border-2 border-brand bg-white"
      >
        <span className="header-ruler pointer-events-none absolute inset-x-0 top-0 block h-2 rotate-180 text-brand opacity-50" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-y-0 w-px bg-orange/60" style={{ left: `${point.x * 100}%` }} aria-hidden="true" />
        <span className="pointer-events-none absolute inset-x-0 h-px bg-orange/60" style={{ top: `${point.y * 100}%` }} aria-hidden="true" />

        <div className="relative grid lg:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
          <div className={`${cell} border-b lg:border-b-0 lg:border-r`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-i3geo-horizontal.svg" alt={brand.name} className="w-full max-w-sm" />
            <p className="mt-6 max-w-xs text-lg font-semibold leading-snug text-brand">{brand.positioning}</p>
          </div>
          <div className={`${cell} border-b lg:border-b-0 lg:border-r`}>
            <p className={label}>Navegação</p>
            <Nav className="mt-4 space-y-2.5 text-lg font-semibold text-brand" />
          </div>
          <div className={`${cell} border-b lg:border-b-0 lg:border-r`}>
            <p className={label}>Atendimento</p>
            <p className="mt-4 leading-relaxed">{area}</p>
            <Link href="/orcamento" className="mt-6 inline-block bg-orange px-5 py-3 text-sm font-bold text-graphite transition-colors hover:bg-brand hover:text-white">
              Solicitar orçamento
            </Link>
          </div>
          <div className={`${cell} flex items-start justify-between gap-6 lg:flex-col`}>
            <svg viewBox="0 0 40 64" className="h-16 w-10 text-brand" aria-hidden="true">
              <path d="M20 2 L32 40 L20 33 L8 40 Z" fill="currentColor" />
              <text x="20" y="60" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor">
                N
              </text>
            </svg>
            <div>
              <p className={label}>Escala gráfica</p>
              <svg viewBox="0 0 120 22" className="mt-2 w-32 text-brand" aria-hidden="true">
                <path d="M2 14 H118 M2 8 V20 M60 10 V18 M118 8 V20" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M2 14 H60" stroke="currentColor" strokeWidth="5" />
                <text x="2" y="6" fontSize="7" fontWeight="600" fill="currentColor">0</text>
                <text x="118" y="6" fontSize="7" fontWeight="600" textAnchor="end" fill="currentColor">{coverage.radiusKm} km</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-brand/40 px-5 py-3 text-xs font-semibold tabular-nums sm:px-7">
          <p className="text-brand">
            E {number.format(UTM.e + point.x * UTM.width)} · N {number.format(UTM.n - point.y * UTM.height)} · {terrain.datum}
          </p>
          <p className="text-graphite/70">
            Folha 01/01 · © {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
