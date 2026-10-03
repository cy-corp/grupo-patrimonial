"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SIZE, terrain } from "@/components/hero/terrain";

const PAPER = "#F6F4EF";
// Posição do logo dentro da área do relevo: topo, largura (frações) e proporção do arquivo.
const LOGO = { top: 0.05, width: 0.88, ratio: 645 / 2076 };

// Perfis do relevo real, de norte a sul, lidos do mesmo PNG da abertura.
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

// O logo nasce atrás das montanhas: os perfis do relevo se erguem e encobrem a base dele.
export function FooterNascente() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const logo = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const inView = useInView(wrap, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [rows, setRows] = useState<number[][] | null>(null);

  useEffect(() => {
    let alive = true;
    loadRows(46, 220)
      .then((r) => alive && setRows(r))
      .catch(() => {});
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
    // Usa toda a faixa de alturas do recorte e acentua os picos.
    const flat = rows.flat();
    const low = Math.min(...flat);
    const span = Math.max(...flat) - low || 1;
    const shape = (v: number) => Math.pow((v - low) / span, 1.5);

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
      // O relevo começa perto da base do logo, para encobrir só o pé das letras.
      // Mede o logo de verdade: ele encolhe quando a tela é baixa, para o rodapé caber inteiro.
      const img = logo.current;
      const holder = img?.parentElement;
      const measured = img && holder && img.offsetHeight > 0;
      const logoTop = measured ? holder.offsetTop + img.offsetTop : h * LOGO.top;
      const logoHeight = measured ? img.offsetHeight : w * LOGO.width * LOGO.ratio;
      const top = logoTop + logoHeight * 0.74;
      const step = Math.max(2, (h - top - 12) / rows.length);
      // Cada perfil pode subir até a altura do primeiro: os da frente ganham montanhas
      // altas sem encobrir mais o logo.
      const reach = logoHeight * 0.16;
      rows.forEach((row, r) => {
        const base = top + r * step;
        const near = r / (rows.length - 1);
        ctx.beginPath();
        row.forEach((v, c) => {
          const x = (c / (row.length - 1)) * w;
          const y = base - shape(v) * (reach + r * step * 0.92) * t;
          if (c) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        });
        ctx.strokeStyle = `rgba(0,92,116,${0.3 + near * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = PAPER;
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
  }, [rows, inView, reduce, loaded]);

  return (
    <div ref={wrap} className="pointer-events-none relative mt-4 h-[calc(30vw+22vh)] min-h-[150px] shrink" aria-hidden="true">
      <div className="absolute inset-x-0 top-[5%] flex h-[70%] justify-center">
        <motion.img
          ref={logo}
          src="/brand/logo-i3geo-wordmark.svg"
          alt=""
          onLoad={() => setLoaded(true)}
          className="h-auto max-h-full w-auto max-w-[88%] self-start"
          initial={{ y: "45%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <canvas ref={canvas} className="relative size-full" />
    </div>
  );
}
