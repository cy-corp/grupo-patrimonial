"use client";

import { usePathname } from "next/navigation";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

useGLTF.preload("/models/footer-city.glb");

const CREAM = "#F3F0EA";
const BLD_ROOT = /^Bld_\d+(_[LR]\d)?$/;
const STREET = 21.6;

function City({ reducedMotion, play, epoch }: { reducedMotion: boolean; play: boolean; epoch: number }) {
  const { scene } = useGLTF("/models/footer-city.glb");
  const { viewport, size } = useThree();
  const started = useRef<number | null>(null);
  const lastEpoch = useRef(epoch);

  const root = useMemo(() => {
    const clone = scene.clone(true);
    const originals: THREE.Object3D[] = [];
    clone.traverse((obj) => {
      if (/^Bld_\d+$/.test(obj.name)) originals.push(obj);
    });
    for (const side of [-1, 1] as const) {
      for (const step of [1, 2] as const) {
        for (const src of originals) {
          if (src.name === "Bld_11") continue;
          const copy = src.clone(true);
          copy.name = `${src.name}_${side > 0 ? "R" : "L"}${step}`;
          copy.position.x += side * STREET * step;
          clone.add(copy);
        }
      }
    }
    return clone;
  }, [scene]);

  const buildings = useMemo(() => {
    const list: THREE.Object3D[] = [];
    root.traverse((obj) => {
      if (BLD_ROOT.test(obj.name) && obj.parent === root) list.push(obj);
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    list.sort((a, b) => a.position.x - b.position.x);
    return list.map((obj) => ({ obj, baseY: obj.position.y }));
  }, [root]);

  const span = useMemo(() => {
    if (buildings.length === 0) return { min: 0, range: 1 };
    const min = buildings[0].obj.position.x;
    const max = buildings[buildings.length - 1].obj.position.x;
    return { min, range: Math.max(1, max - min) };
  }, [buildings]);

  const clockHands = useMemo<{ hour: THREE.Object3D | null; minute: THREE.Object3D | null }>(() => {
    let hour: THREE.Object3D | null = null;
    let minute: THREE.Object3D | null = null;
    root.traverse((obj) => {
      if (obj.name === "ClockHour") hour = obj;
      if (obj.name === "ClockMinute") minute = obj;
    });
    return { hour, minute };
  }, [root]);

  useLayoutEffect(() => {
    started.current = null;
    buildings.forEach((building) => {
      building.obj.position.y = reducedMotion ? building.baseY : building.baseY - 6;
    });
  }, [buildings, reducedMotion, epoch]);

  useFrame((state) => {
    if (!play) return;
    if (lastEpoch.current !== epoch) {
      lastEpoch.current = epoch;
      started.current = state.clock.elapsedTime;
    }
    if (started.current === null) started.current = state.clock.elapsedTime;

    buildings.forEach((building) => {
      const t = reducedMotion
        ? 1
        : THREE.MathUtils.clamp(
            (state.clock.elapsedTime - started.current! - ((building.obj.position.x - span.min) / span.range) * 1.35) /
              0.85,
            0,
            1,
          );
      const eased = 1 - (1 - t) ** 3;
      building.obj.position.y = building.baseY + THREE.MathUtils.lerp(-6, 0, eased);
    });

    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    const hourHand = clockHands.hour;
    const minuteHand = clockHands.minute;
    if (hourHand) {
      hourHand.rotation.z = -((hour % 12) / 12) * Math.PI * 2 - (minute / 60) * (Math.PI / 6);
    }
    if (minuteHand) {
      minuteHand.rotation.z = -(minute / 60) * Math.PI * 2;
    }
  });

  const mobile = size.width < 768;
  const scale = mobile
    ? (viewport.width / 16) * 0.9
    : Math.max(0.36, (viewport.width / 24) * 0.76);

  return (
    <group scale={scale} position={[0, mobile ? -2.25 : -3.85, 0]}>
      <primitive object={root} />
    </group>
  );
}

function Aim() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const mobile = size.width < 768;
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    if (mobile) {
      camera.position.set(0.45, 1.9, -13.2);
      perspectiveCamera.fov = 26;
      camera.lookAt(0, 1.2, 0);
    } else {
      camera.position.set(1.15, 2.15, -17.8);
      perspectiveCamera.fov = 24;
      camera.lookAt(0, 0.85, 0);
    }
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

export function FooterDiorama() {
  const hostRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    revealedRef.current = false;
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!revealedRef.current) {
            revealedRef.current = true;
            setEpoch((value) => value + 1);
          }
          return;
        }
        setVisible(false);
      },
      { threshold: 0, rootMargin: "0px 0px 36% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [pathname]);

  const camera = useMemo(
    () => ({ position: [1.15, 2.15, -17.8] as [number, number, number], fov: 24, near: 0.1, far: 90 }),
    [],
  );

  return (
    <div ref={hostRef} className="h-full w-full" aria-hidden>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={camera}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ camera: cam, gl, size }) => {
          gl.setClearColor(CREAM, 0);
          if (size.width < 768) {
            cam.position.set(0.45, 1.9, -13.2);
            cam.fov = 26;
            cam.lookAt(0, 1.2, 0);
            cam.updateProjectionMatrix();
          } else {
            cam.lookAt(0, 0.85, 0);
          }
        }}
      >
        <Aim />
        <hemisphereLight args={["#F7F2EA", "#8F9C97", 0.85]} />
        <directionalLight
          castShadow
          position={[7, 12, -9]}
          intensity={1.35}
          color="#FFF6EA"
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-5, 4, -4]} intensity={0.28} color="#C5D0CC" />
        <Suspense fallback={null}>
          <City reducedMotion={reducedMotion} play={visible} epoch={epoch} />
        </Suspense>
      </Canvas>
    </div>
  );
}
