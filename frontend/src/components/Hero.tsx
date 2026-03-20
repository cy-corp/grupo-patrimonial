"use client";

import React, { useRef, Suspense } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF, Center } from "@react-three/drei";
import { GoldButton } from "@/components/ui/gold-button";
import * as THREE from "three";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const contentX = useTransform(smoothProgress, [0, 0.4], ["0%", "-20%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] bg-surface overflow-hidden"
    >
      {/* Sticky Content Wrap */}
      <div className="sticky top-0 h-screen w-full flex items-center px-4 md:px-12 pt-24">
        
        {/* Background Overlay from HTML */}
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            alt="Architectural background" 
            className="w-full h-full object-cover grayscale brightness-[0.2]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHOGhjAPWosOO_TkxO1MqXh8n3K5HG6Y4z3X12g1HFnmW4OGj3ey79MUAL1uviZhVRnpq_GRZcthskaYQ9tlAlDcHmpySWlxWetSkfwfnAKbkKyLoQHlyGFf6QI4zj0xzam8zpGbTe-jfVttdg7t617yaWRSpllVUKJQxT_UXV80fXrcrwkBfXp3wZVfu6mSog-dLIvMTVV6ru6SYelgGo1R54YmYTvT28LaGpUCFvAFMX54G6Xqq2srsI_3tN7b3bdiKjUAiES5tN" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
        </div>

        {/* Content */}
        <motion.div 
          style={{ opacity: contentOpacity, x: contentX }}
          className="relative z-10 max-w-5xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-[2px] bg-primary-dim"></div>
            <span className="font-label text-xs tracking-[0.2em] uppercase text-on-surface-variant">Established Excellence</span>
          </div>

          <h1 className="font-headline text-4xl md:text-7xl leading-tight text-on-surface mb-8">
            Engenharia, Incorporação, <br />
            Construção, Imobiliária e <br />
            Gestão Patrimonial
          </h1>

          <p className="font-headline text-lg md:text-xl text-primary-dim mb-6 max-w-2xl">
            Soluções completas para desenvolver, proteger, valorizar e perpetuar patrimônios imobiliários.
          </p>

          <p className="font-body text-on-surface-variant text-sm tracking-[0.05em] leading-relaxed mb-12 max-w-xl">
            Atuamos de forma integrada desde a origem do ativo (terra ou imóvel), passando pelo desenvolvimento técnico e construtivo, até a gestão patrimonial e comercialização estratégica.
          </p>

          <div className="flex flex-wrap gap-6">
            <GoldButton className="px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-3">
              Fale com um especialista
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </GoldButton>
            <button className="border border-outline-variant/20 text-on-surface px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-surface-container-high transition-all duration-300">
              Solicite uma análise
            </button>
          </div>
        </motion.div>

        {/* 3D Model on the Right - Kept for Premium Feel */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 pointer-events-none opacity-60 md:opacity-100">
          <Canvas
            shadows
            camera={{ position: [0, 5, 25], fov: 40 }}
            dpr={[1, 2]}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={1.2} />
              <directionalLight
                position={[10, 20, 10]}
                intensity={1.5}
                color="#FFFAF0"
                castShadow
              />
              <Environment preset="sunset" />
              <ScrollAwareModel progress={smoothProgress} />
              <ContactShadows
                position={[0, -1, 0]}
                opacity={0.4}
                scale={10}
                blur={2.5}
                far={4}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Scroll Indicator */}
        <motion.div
           style={{ opacity: contentOpacity }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary font-bold">Desça</span>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollAwareModel({ progress }: { progress: any }) {
  const modelRef = useRef<any>(null);
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.updateScroll(progress.get());
    }
  });
  return <Model3DWithInternalRef ref={modelRef} />;
}

const Model3DWithInternalRef = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/condominio.glb");
  const groupRef = useRef<THREE.Group>(null);

  React.useMemo(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        if (child.material.map) child.material.map.flipY = false;
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  React.useImperativeHandle(ref, () => ({
    updateScroll: (v: number) => {
      if (!groupRef.current) return;
      groupRef.current.rotation.y = (Math.min(v / 0.9, 1) * Math.PI * 0.8) + 1.07;
      const diveV = Math.max(0, (v - 0.6) / 0.4);
      groupRef.current.position.y = THREE.MathUtils.lerp(-0.5, -15, Math.pow(diveV, 2.5));
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.05, 0.045, diveV));
    }
  }));

  useFrame((state: any) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += state.mouse.x * 0.03;
    groupRef.current.rotation.x = state.mouse.y * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
});

Model3DWithInternalRef.displayName = "Model3DWithInternalRef";
useGLTF.preload("/models/condominio.glb");
