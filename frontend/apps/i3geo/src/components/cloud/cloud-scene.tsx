"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ramp } from "@/components/hero/beats";
import { WORLD, fmt, parcelCenter, terrain, toWorld } from "@/components/hero/terrain";
import {
  PIN_HEIGHT,
  buildCloud,
  buildPerimeter,
  worldAt,
  type Cloud,
} from "./cloud-data";
import { cloudFragment, cloudVertex, lineFragment, lineVertex } from "./cloud-shader";

export const BACKGROUND = "#03161c";
const FOV = 38;
const INTRO_SECONDS = 3.4;

const [PX, PZ] = toWorld(parcelCenter[0], parcelCenter[1]);

// Câmera em cada capítulo: [até onde segura, posição, alvo].
const KEYS: { hold: [number, number]; pos: THREE.Vector3; look: THREE.Vector3 }[] = [
  { hold: [0, 0.05], pos: new THREE.Vector3(-0.6, 3.1, 6.4), look: new THREE.Vector3(0.2, -0.75, 0) },
  { hold: [0.25, 0.37], pos: new THREE.Vector3(-2.2, 0.95, 2.7), look: new THREE.Vector3(PX - 0.5, 0.3, PZ - 1.2) },
  { hold: [0.5, 0.61], pos: new THREE.Vector3(PX + 0.75, 3.0, PZ + 1.1), look: new THREE.Vector3(PX + 0.65, 0.5, PZ) },
  { hold: [0.75, 0.85], pos: new THREE.Vector3(PX + 1.0, 1.4, PZ + 2.2), look: new THREE.Vector3(PX - 0.55, 0.5, PZ + 0.1) },
  { hold: [0.985, 1], pos: new THREE.Vector3(PX, 1.5, PZ + 7.4), look: new THREE.Vector3(PX, PIN_HEIGHT * 0.5, PZ) },
];

function Scene({
  cloud,
  progress,
}: {
  cloud: Cloud;
  progress: MotionValue<number>;
}) {
  const smooth = useRef(progress.get());
  const started = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const labels = useRef<HTMLDivElement[]>([]);
  const look = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const points = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    geometry.setAttribute("aTarget", new THREE.BufferAttribute(cloud.targets, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(cloud.rand, 4));
    geometry.setAttribute("aMask", new THREE.BufferAttribute(cloud.mask, 4));
    geometry.setAttribute("aAttr", new THREE.BufferAttribute(cloud.attr, 3));
    const density = Math.sqrt((terrain.width * terrain.height) / cloud.count);
    const material = new THREE.ShaderMaterial({
      vertexShader: cloudVertex,
      fragmentShader: cloudFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uIntro: { value: 0 },
        uIso: { value: 0 },
        uParcel: { value: 0 },
        uEnv: { value: 0 },
        uMorph: { value: 0 },
        uSize: { value: 0.0125 * density },
        uScale: { value: 1 },
        uHalfWidth: { value: WORLD.width / 2 },
        uHMin: { value: terrain.hMin },
        uHRange: { value: terrain.hMax - terrain.hMin },
        uLow: { value: new THREE.Color("#0a6f8a") },
        uHigh: { value: new THREE.Color("#c9f1f8") },
        uWater: { value: new THREE.Color("#8fe9ff") },
        uGreen: { value: new THREE.Color("#5fe6a0") },
        uOrange: { value: new THREE.Color("#ff6a13") },
      },
    });
    const object = new THREE.Points(geometry, material);
    object.frustumCulled = false;
    return object;
  }, [cloud]);

  const line = useMemo(() => {
    const data = buildPerimeter(cloud.heights);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geometry.setAttribute("aAlong", new THREE.BufferAttribute(data.along, 1));
    const material = new THREE.ShaderMaterial({
      vertexShader: lineVertex,
      fragmentShader: lineFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uDraw: { value: 0 },
        uFade: { value: 1 },
        uSize: { value: 0.016 },
        uScale: { value: 1 },
        uColor: { value: new THREE.Color("#ff6a13") },
      },
    });
    const object = new THREE.Points(geometry, material);
    object.frustumCulled = false;
    return object;
  }, [cloud]);

  useEffect(
    () => () => {
      for (const o of [points, line]) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    },
    [points, line],
  );

  const vertices = useMemo(
    () =>
      terrain.parcel.vertices.map((v) => ({
        ...v,
        at: worldAt(cloud.heights, v.x, v.y, 0.03),
      })),
    [cloud],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (started.current === null) started.current = t;
    const intro = Math.min(1, (t - started.current) / INTRO_SECONDS);

    smooth.current = THREE.MathUtils.damp(smooth.current, progress.get(), 4.5, delta);
    const p = smooth.current;

    const morph = ramp(p, 0.86, 0.985);
    const u = (points.material as THREE.ShaderMaterial).uniforms;
    const scale =
      (state.size.height * state.viewport.dpr) / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
    u.uTime.value = t;
    u.uIntro.value = intro;
    u.uIso.value = ramp(p, 0.1, 0.25) * (1 - ramp(p, 0.4, 0.5));
    u.uParcel.value = ramp(p, 0.42, 0.54) * (1 - morph);
    u.uEnv.value = ramp(p, 0.66, 0.78) * (1 - morph);
    u.uMorph.value = morph;
    u.uScale.value = scale;

    const l = (line.material as THREE.ShaderMaterial).uniforms;
    l.uDraw.value = ramp(p, 0.44, 0.6);
    l.uFade.value = 1 - ramp(p, 0.86, 0.92);
    l.uScale.value = scale;

    const labelOpacity = ramp(p, 0.5, 0.58) * (1 - ramp(p, 0.64, 0.7));
    for (const el of labels.current) if (el) el.style.opacity = String(labelOpacity);

    // Interpola a câmera entre os capítulos e mantém parada em cada um.
    let a = KEYS[0];
    let b = KEYS[0];
    let k = 0;
    for (let i = 0; i < KEYS.length - 1; i++) {
      if (p >= KEYS[i].hold[0]) {
        a = KEYS[i];
        b = KEYS[i + 1];
        k = ramp(p, a.hold[1], b.hold[0]);
      }
    }
    pos.lerpVectors(a.pos, b.pos, k);
    look.lerpVectors(a.look, b.look, k);

    // Em telas estreitas a câmera recua para o relevo caber.
    const aspect = state.size.width / state.size.height;
    const back = THREE.MathUtils.clamp(1.5 / aspect, 1, 2.3);
    pos.sub(look).multiplyScalar(back);

    const ptr = pointer.current;
    ptr.sx = THREE.MathUtils.damp(ptr.sx, ptr.x, 2.5, delta);
    ptr.sy = THREE.MathUtils.damp(ptr.sy, ptr.y, 2.5, delta);
    pos.applyAxisAngle(THREE.Object3D.DEFAULT_UP, Math.sin(t * 0.13) * 0.05 - ptr.sx * 0.07);
    pos.y *= 1 + ptr.sy * 0.06;
    pos.add(look);

    state.camera.position.copy(pos);
    state.camera.lookAt(look);
  });

  return (
    <>
      <primitive object={points} />
      <primitive object={line} />
      {vertices.map((v, i) => (
        <Html key={v.id} position={v.at} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <div
            ref={(el) => {
              if (el) labels.current[i] = el;
            }}
            style={{ opacity: 0 }}
            className="flex -translate-y-1/2 items-center gap-2 whitespace-nowrap pl-2"
          >
            <span className="block size-2 -translate-x-3 rounded-full border border-orange bg-[#03161c]" />
            <span className="-ml-2 font-[family-name:var(--font-concept-mono)] text-[10px] leading-tight text-white/90">
              <span className="font-medium text-orange">{v.id}</span>
              <span className="hidden text-white/60 md:inline">
                {" "}
                E {fmt.coord(v.e)} · N {fmt.coord(v.n)}
              </span>
            </span>
          </div>
        </Html>
      ))}
    </>
  );
}

export default function CloudScene({
  progress,
  onReady,
}: {
  progress: MotionValue<number>;
  onReady: (count: number) => void;
}) {
  const [cloud, setCloud] = useState<Cloud | null>(null);

  useEffect(() => {
    let alive = true;
    const light = window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4;
    buildCloud(light ? 2 : 1).then((c) => {
      if (!alive) return;
      setCloud(c);
      onReady(c.count);
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: FOV, near: 0.05, far: 80, position: [-0.6, 3.1, 6.4] }}
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={[BACKGROUND]} />
      {cloud && <Scene cloud={cloud} progress={progress} />}
    </Canvas>
  );
}
