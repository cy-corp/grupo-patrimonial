"use client";

import React, { useRef, Suspense } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Loader, useGLTF, Center } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import * as THREE from "three";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll from "start start" to "end end" (sticky duration)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for R3F (using spring for better momentum)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: typeof window !== "undefined" && window.innerWidth < 768 ? 160 : 100,
    damping: typeof window !== "undefined" && window.innerWidth < 768 ? 22 : 30,
    restDelta: 0.001
  });

  // Text Animations disappear early (0% to 40%)
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const textTranslateX = useTransform(smoothProgress, [0, 0.4], ["0%", "-60%"]);

  // 3D Model progress (directly passed to Model3D as a number)
  // We'll use a listener to pass progress to the R3F component via state if needed,
  // but let's try passing the scrollYProgress directly or useFrame in Model3D with a ref.

  return (
    <section
      ref={containerRef}
      className="relative h-[350vh] md:h-[200vh] bg-[#F8F1E3]"
    >
      {/* Sticky Content Wrap */}
      <div className="sticky top-0 h-screen w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 pt-32 pb-12 md:py-0 overflow-hidden">

        {/* Left Column: Text (50%) */}
        <motion.div
          style={{ opacity: textOpacity, x: textTranslateX }}
          className="relative z-10 w-full md:w-1/2 flex flex-col items-start gap-4 md:gap-6"
        >
          {/* Logo/Badge */}
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-[1px] bg-primary/40 block" />
            <img src="/patrimonial-logo-png.png" alt="Grupo Patrimonial" className="h-10 md:h-12 w-auto" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] text-[#0F172A] uppercase">
            Engenharia, <br />
            Incorporação, <br />
            <span className="text-primary">Construção,</span> <br />
            Imobiliária e <br />
            Gestão Patrimonial
          </h1>

          {/* mobile trigger button - Back above model for consistency */}
          <Button
            onClick={() => {
              // Scroll to the end of the Hero section precisely
              const targetScroll = window.innerHeight * 3.4;
              window.scrollTo({
                top: targetScroll,
                behavior: "smooth"
              });
            }}
            className="md:hidden mt-6 bg-primary text-[#F8F1E3] hover:bg-primary/90 rounded-full px-8 py-6 text-base font-bold uppercase tracking-wider group w-full sm:w-auto"
          >
            Ver Mais
            <ArrowDown className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Right Column: 3D Canvas (50% or Full background) */}
        <div className="relative w-full h-[40vh] md:h-full md:w-1/2 z-0 mt-4 md:mt-0 flex items-center justify-center">
          <div className="absolute inset-0 md:relative w-full h-full">
            <Canvas
              shadows
              camera={{ position: [0, 5, 25], fov: 45 }}
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

                {/* Pass the smoothed scroll progress to the model */}
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
        </div>

        {/* Scroll Indicator (Custom Mouse) - Desktop */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="scroll-container hidden md:flex"
        >
          <svg
            width="30"
            height="50"
            viewBox="0 0 30 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="scroll-icon"
          >
            <rect
              x="1"
              y="1"
              width="28"
              height="48"
              rx="14"
              stroke="var(--primary)"
              strokeWidth="2"
              className="mouse-body"
            />
            <rect
              x="13"
              y="8"
              width="4"
              height="10"
              rx="2"
              fill="var(--accent)"
              className="scroll-wheel"
            />
          </svg>
          <span className="scroll-text">DESÇA</span>
        </motion.div>

        {/* Sneaky Peak (Mobile) - Static Literal Copy of Solutions Top */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="md:hidden absolute bottom-0 left-0 w-full h-[6vh] bg-[#F8F9FA] border-t border-slate-200/50 z-30 pt-3 px-8 overflow-hidden pointer-events-none shadow-[0_-5px_15px_rgba(0,0,0,0.02)]"
        >
          {/* Replica of Solutions header badge */}
          <div className="flex items-center gap-2 mb-1 text-[6px]">
            <div className="w-4 h-[1px] bg-primary"></div>
            <span className="text-primary font-bold tracking-[0.4em] uppercase">
              Expertise
            </span>
          </div>
          
          {/* Replica of Solutions H2 */}
          <h2 className="text-lg font-light text-[#0F172A] leading-tight whitespace-nowrap">
            Ecossistema <span className="font-bold italic text-primary">Integrado</span>
          </h2>
        </motion.div>
      </div>

    </section>
  );
}

// Wrapper to bridge Framer Motion scroll to R3F model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ScrollAwareModel({ progress }: { progress: any }) {
  const modelRef = useRef<any>(null);

  useFrame(() => {
    if (modelRef.current) {
      // Get the value from the motion value
      const val = progress.get();
      modelRef.current.updateScroll(val);
    }
  });

  return <Model3DWithInternalRef ref={modelRef} />;
}

// Model3D optimized for scroll updates via ref
const Model3DWithInternalRef = React.forwardRef((props, ref) => {
  const { scene } = useGLTF("/models/condominio.glb");
  const groupRef = useRef<THREE.Group>(null);
  const [currentProgress, setCurrentProgress] = React.useState(0);

  // Setup initial state and materials (user's guide)
  React.useMemo(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        // Fix inverted textures
        if (child.material.map) child.material.map.flipY = false;

        // Fix vertex colors if needed
        if (child.geometry.attributes.color) {
          child.material.vertexColors = true;
        }

        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Expose the update method
  React.useImperativeHandle(ref, () => ({
    updateScroll: (v: number) => {
      if (!groupRef.current) return;

      // 1. Rotation: Subtle rotation (reduced multiplier to avoid "spinning too much")
      const rotationV = Math.min(v / 0.9, 1);
      groupRef.current.rotation.y = (rotationV * Math.PI * 0.8) + 1.07;

      // 2. Dive (Vertical Displacement): Starts a bit earlier at 60% scroll
      const diveV = Math.max(0, (v - 0.6) / 0.4);
      const targetY = THREE.MathUtils.lerp(-0.5, -25, Math.pow(diveV, 2.5));
      groupRef.current.position.y = targetY;

      // 3. Scale: Stays solid while rotating, zooms slightly while diving
      const targetScale = THREE.MathUtils.lerp(0.05, 0.045, diveV);
      groupRef.current.scale.setScalar(targetScale);

      // Update local state if needed
      setCurrentProgress(v);
    }
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFrame((state: any) => {
    if (!groupRef.current) return;
    // Add subtle mouse parallax on top of scroll rotation
    groupRef.current.rotation.y += state.mouse.x * 0.05;
    groupRef.current.rotation.x = state.mouse.y * 0.03;
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

// Preload the model
useGLTF.preload("/models/condominio.glb");
