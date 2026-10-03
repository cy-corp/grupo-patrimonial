"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { colors } from "@/lib/brand";
import { ramp, stage } from "./beats";
import {
  EXAGGERATION,
  FENCE_SEGMENTS,
  SIZE,
  WORLD,
  appLabelAt,
  facts,
  fmt,
  parcelCenter,
  perimeter,
  reserveCenter,
  terrain,
  toWorld,
} from "./terrain";
import { MAX_POLY, fragmentShader, vertexShader } from "./terrain-shader";
import {
  RANGE,
  RANGE_WORLD,
  loadHeights,
  makeHeightTexture,
  makeOverlayTexture,
  rgb,
  worldPoint,
  type Assets,
} from "./terrain-assets";

const INTRO_SECONDS = 1.8;


type Key = { p: number; pitch: number; yaw: number; dist: number; focus: number };

// Câmera: de prancha vista de cima até o imóvel, e de volta ao alto.
const KEYS: Key[] = [
  { p: 0, pitch: 89.5, yaw: 0, dist: 1, focus: 0 },
  { p: 0.06, pitch: 89.5, yaw: 0, dist: 1, focus: 0 },
  { p: 0.3, pitch: 46, yaw: -16, dist: 0.95, focus: 0.15 },
  { p: 0.5, pitch: 50, yaw: -28, dist: 0.44, focus: 1 },
  { p: 0.68, pitch: 56, yaw: -36, dist: 0.42, focus: 1 },
  { p: 0.84, pitch: 60, yaw: -24, dist: 0.44, focus: 1 },
  { p: 1, pitch: 78, yaw: -8, dist: 0.5, focus: 1 },
];

function cameraAt(p: number) {
  let k = 0;
  while (k < KEYS.length - 2 && p > KEYS[k + 1].p) k++;
  const a = KEYS[k];
  const b = KEYS[k + 1];
  const t = ramp(p, a.p, b.p);
  const mix = (x: number, y: number) => x + (y - x) * t;
  return {
    pitch: mix(a.pitch, b.pitch),
    yaw: mix(a.yaw, b.yaw),
    dist: mix(a.dist, b.dist),
    focus: mix(a.focus, b.focus),
  };
}

const FOV = 30;

function Terrain({
  assets,
  progress,
  onFirstFrame,
}: {
  assets: Assets;
  progress: MotionValue<number>;
  onFirstFrame: () => void;
}) {
  const { camera, size, invalidate } = useThree();
  const smoothed = useRef(progress.get());
  const started = useRef<number | null>(null);
  const reported = useRef(false);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const pin = useRef<HTMLDivElement | null>(null);
  const area = useRef<HTMLDivElement | null>(null);
  const env = useRef<(HTMLDivElement | null)[]>([]);
  const mobile = size.width < 640;

  // O vertex shader desloca o z local; a rotação fica na malha.
  const flatGeometry = useMemo(() => {
    const segX = mobile ? 256 : 512;
    const segY = Math.round((segX * SIZE.height) / SIZE.width);
    return new THREE.PlaneGeometry(WORLD.width, WORLD.depth, segX, segY);
  }, [mobile]);
  useEffect(() => () => flatGeometry.dispose(), [flatGeometry]);

  const material = useMemo(() => {
    const poly = perimeter.map(([x, y]) => new THREE.Vector2(x, y));
    while (poly.length < MAX_POLY) poly.push(new THREE.Vector2());
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      toneMapped: false,
      uniforms: {
        uHeight: { value: assets.heightTexture },
        uOverlay: { value: assets.overlayTexture },
        uSize: { value: new THREE.Vector2(SIZE.width, SIZE.height) },
        uHMin: { value: terrain.hMin },
        uHRange: { value: RANGE },
        uMpp: { value: terrain.metersPerPixel },
        uExaggeration: { value: EXAGGERATION },
        uRangeWorld: { value: RANGE_WORLD },
        uLift: { value: 0 },
        uIntro: { value: 0 },
        uFence: { value: 0 },
        uClose: { value: 0 },
        uFill: { value: 0 },
        uEnv: { value: 0 },
        uPoly: { value: poly },
        uPolyCount: { value: perimeter.length },
        uFenceCount: { value: FENCE_SEGMENTS },
        uPetrol: { value: rgb(colors.petroleum) },
        uOrange: { value: rgb(colors.orange) },
        uPaper: { value: rgb(colors.white) },
        uShadow: { value: rgb("#D3DCDF") },
      },
    });
  }, [assets]);
  useEffect(() => () => material.dispose(), [material]);

  const anchors = useMemo(() => {
    const h = assets.heights;
    return {
      vertices: terrain.parcel.vertices.map((v) => worldPoint(h, [v.x, v.y])),
      center: worldPoint(h, parcelCenter),
      reserve: worldPoint(h, reserveCenter),
      app: worldPoint(h, appLabelAt),
    };
  }, [assets]);

  useEffect(() => progress.on("change", () => invalidate()), [progress, invalidate]);

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    if (started.current === null) started.current = now;
    const intro = Math.min(1, (now - started.current) / INTRO_SECONDS);

    const target = progress.get();
    smoothed.current = THREE.MathUtils.damp(smoothed.current, target, 7, Math.min(delta, 0.1));
    if (Math.abs(smoothed.current - target) < 1e-4) smoothed.current = target;
    const p = smoothed.current;
    const s = stage(p);

    const u = material.uniforms;
    u.uIntro.value = 1 - Math.pow(1 - intro, 3);
    u.uLift.value = s.lift;
    u.uFence.value = s.fence;
    u.uClose.value = s.close;
    u.uFill.value = s.fill;
    u.uEnv.value = s.env;

    // Distância que faz a prancha cobrir o painel, com folga para a borda esmaecida.
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const cover = Math.min(WORLD.depth / 2 / tanHalf, WORLD.width / 2 / (tanHalf * aspect)) * 0.9;
    const k = cameraAt(p);
    const [fx, fz] = toWorld(parcelCenter[0], parcelCenter[1]);
    const focus = new THREE.Vector3(fx * k.focus, anchors.center[1] * k.focus * s.lift, fz * k.focus);
    // Em telas estreitas o imóvel precisa de mais espaço lateral.
    const dist = cover * k.dist * (1 + Math.max(0, 1 - aspect) * 0.9 * k.focus);
    const pitch = THREE.MathUtils.degToRad(k.pitch);
    const yaw = THREE.MathUtils.degToRad(k.yaw);
    cam.position.set(
      focus.x + dist * Math.cos(pitch) * Math.sin(yaw),
      focus.y + dist * Math.sin(pitch),
      focus.z + dist * Math.cos(pitch) * Math.cos(yaw),
    );
    cam.fov = FOV;
    cam.updateProjectionMatrix();
    cam.lookAt(focus);

    const fenceReach = s.fence * FENCE_SEGMENTS;
    labels.current.forEach((el, i) => {
      if (!el) return;
      const shown = s.fence > 0.001 ? ramp(fenceReach, i - 0.2, i + 0.001) : 0;
      el.style.opacity = String(shown * (1 - s.pin * 0.45));
    });
    if (area.current) area.current.style.opacity = String(s.fill);
    env.current.forEach((el) => el && (el.style.opacity = String(s.env)));
    if (pin.current) {
      pin.current.style.opacity = String(s.pin);
      pin.current.style.transform = `translate(-50%, ${-100 - (1 - s.pin) * 60}%)`;
    }

    const settling = smoothed.current !== target || intro < 1;
    if (settling) invalidate();
    if (!reported.current) {
      reported.current = true;
      onFirstFrame();
    }
  }, -1); // antes do Html, para os rótulos usarem a câmera do mesmo quadro

  const tag =
    "pointer-events-none select-none whitespace-nowrap rounded-sm border border-brand/20 bg-white/90 px-1.5 py-0.5 text-[10px] font-medium leading-tight text-graphite shadow-sm tabular-nums";

  return (
    <>
      <mesh geometry={flatGeometry} material={material} rotation-x={-Math.PI / 2} />
      {terrain.parcel.vertices.map((v, i) => (
        <Html key={v.id} position={anchors.vertices[i]} zIndexRange={[20, 0]}>
          <div
            ref={(el) => {
              labels.current[i] = el;
            }}
            className="pointer-events-none relative opacity-0"
          >
            <span className="absolute left-0 top-0 block size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-orange shadow" />
            <span className={`absolute left-2.5 top-0 -translate-y-1/2 ${tag}`}>
              <span className="font-bold text-brand">{v.id}</span>
              <span className="hidden sm:inline">
                {" "}
                E {fmt.coord(v.e)} · N {fmt.coord(v.n)}
              </span>
            </span>
          </div>
        </Html>
      ))}
      <Html position={anchors.center} zIndexRange={[20, 0]}>
        <div
          ref={area}
          className="pointer-events-none -translate-x-1/2 translate-y-3 opacity-0"
        >
          <span className="block whitespace-nowrap bg-brand px-2 py-1 text-xs font-semibold text-white tabular-nums">
            {fmt.ha(facts.areaHa)}
          </span>
        </div>
      </Html>
      <Html position={anchors.reserve} zIndexRange={[20, 0]}>
        <div
          ref={(el) => {
            env.current[0] = el;
          }}
          className="pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0"
        >
          <span className={tag}>Reserva legal · {fmt.pct(facts.reservePct)}</span>
        </div>
      </Html>
      <Html position={anchors.app} zIndexRange={[20, 0]}>
        <div
          ref={(el) => {
            env.current[1] = el;
          }}
          className="pointer-events-none translate-x-3 -translate-y-1/2 opacity-0"
        >
          <span className={tag}>APP {facts.appWidthM} m</span>
        </div>
      </Html>
      <Html position={anchors.center} zIndexRange={[30, 0]}>
        <div ref={pin} className="pointer-events-none opacity-0" style={{ transform: "translate(-50%, -100%)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-i3geo-pin.svg" alt="" width={40} height={51} className="block h-[51px] w-10 max-w-none drop-shadow-md" />
        </div>
      </Html>
    </>
  );
}

export default function TerrainScene({
  progress,
  onReady,
}: {
  progress: MotionValue<number>;
  onReady: () => void;
}) {
  const [assets, setAssets] = useState<Assets | null>(null);

  useEffect(() => {
    let cancelled = false;
    let created: Assets | null = null;
    loadHeights()
      .then((heights) => {
        if (cancelled) return;
        const scale = window.innerWidth < 640 ? 2 : 4;
        created = {
          heights,
          heightTexture: makeHeightTexture(heights),
          overlayTexture: makeOverlayTexture(scale),
        };
        setAssets(created);
      })
      .catch(() => {
        // Sem terreno, a prancha estática continua na tela.
      });
    return () => {
      cancelled = true;
      created?.heightTexture.dispose();
      created?.overlayTexture.dispose();
    };
  }, []);

  if (!assets) return null;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: FOV, near: 0.05, far: 100, position: [0, 10, 0.01] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Terrain assets={assets} progress={progress} onFirstFrame={onReady} />
    </Canvas>
  );
}
