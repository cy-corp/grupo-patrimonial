"use client";

import { useInView, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Scene = dynamic(() => import("./footer-diorama-scene"), { ssr: false });

// A maquete sobe quando o rodapé entra na tela. Sem WebGL, fica só a faixa escura.
export function FooterDiorama() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px 0px 400px 0px" });
  const visible = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    try {
      setWebgl(!!document.createElement("canvas").getContext("webgl2"));
    } catch {
      setWebgl(false);
    }
  }, []);

  return (
    <div ref={ref} className="pointer-events-none h-[38vh] min-h-[260px] sm:h-[52vh]" aria-hidden="true">
      {webgl && near && <Scene visible={reduce ? true : visible} />}
    </div>
  );
}
