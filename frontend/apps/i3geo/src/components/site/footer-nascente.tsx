"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { terrainRows } from "./terrain-rows";

const PAPER = "#F6F4EF";
// Posição do logo dentro da área do relevo: topo, largura (frações) e proporção do arquivo.
const LOGO = { top: 0.05, width: 0.88, ratio: 645 / 2076 };

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
    terrainRows()
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

    const draw = (t: number) => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
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
          const y = base - v * (reach + r * step * 0.92) * t;
          if (c) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        });
        ctx.strokeStyle = `rgba(0,92,116,${0.3 + near * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        // Pinta só até a base do perfil seguinte: nada que ficou para trás passa dali,
        // e isso evita repintar a tela inteira a cada perfil.
        const floor = r === rows.length - 1 ? h : base + step + 1;
        ctx.lineTo(w, floor);
        ctx.lineTo(0, floor);
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

    // Redesenha só quando a área muda de tamanho de verdade: a barra do navegador do
    // celular dispara resize a cada rolagem.
    let lastW = box.clientWidth;
    let lastH = box.clientHeight;
    const observer = new ResizeObserver(() => {
      if (box.clientWidth === lastW && box.clientHeight === lastH) return;
      lastW = box.clientWidth;
      lastH = box.clientHeight;
      if (start === null || performance.now() - start > 1800) draw(inView || reduce ? 1 : 0.04);
    });
    observer.observe(box);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [rows, inView, reduce, loaded]);

  return (
    <div ref={wrap} className="pointer-events-none relative mt-4 h-[calc(30vw+22svh)] min-h-[150px] shrink" aria-hidden="true">
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
