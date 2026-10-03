"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ramp } from "../hero/beats";
import { SIZE, WORLD, facts, fmt, parcelCenter, perimeter, terrain, toWorld } from "../hero/terrain";
import {
  RANGE,
  RANGE_WORLD,
  loadHeights,
  makeHeightTexture,
  makeOverlayTexture,
  rgb,
  sampleHeight,
  worldPoint,
  type Assets,
} from "../hero/terrain-assets";
import { MAX_POLY } from "../hero/terrain-shader";
import { fragmentShader, vertexShader } from "./concept-shader";
import { autoTarget, cameraAt, findStation, stageAt, toUtm, type Readout } from "./concept-stage";

const FOV = 32;

// Interseção do raio da câmera com o relevo, marchando sobre o mapa de alturas.
function raycastTerrain(heights: Float32Array, origin: THREE.Vector3, dir: THREE.Vector3) {
  const p = new THREE.Vector3();
  let prev = 0;
  let prevAbove = true;
  for (let t = 0.05; t < 40; t += 0.015) {
    p.copy(origin).addScaledVector(dir, t);
    const x = (p.x + WORLD.width / 2) * 100;
    const y = (p.z + WORLD.depth / 2) * 100;
    if (x < 0 || y < 0 || x > SIZE.width || y > SIZE.height) {
      prevAbove = true;
      prev = t;
      continue;
    }
    const ground = sampleHeight(heights, x, y) * RANGE_WORLD;
    const above = p.y > ground;
    if (!above && prevAbove && t > 0.05) {
      let lo = prev;
      let hi = t;
      for (let k = 0; k < 8; k++) {
        const mid = (lo + hi) / 2;
        p.copy(origin).addScaledVector(dir, mid);
        const gx = (p.x + WORLD.width / 2) * 100;
        const gy = (p.z + WORLD.depth / 2) * 100;
        if (p.y > sampleHeight(heights, gx, gy) * RANGE_WORLD) lo = mid;
        else hi = mid;
      }
      p.copy(origin).addScaledVector(dir, hi);
      return [(p.x + WORLD.width / 2) * 100, (p.z + WORLD.depth / 2) * 100] as [number, number];
    }
    prevAbove = above;
    prev = t;
  }
  return null;
}

function Terrain({
  assets,
  scroll,
  readout,
}: {
  assets: Assets;
  scroll: MotionValue<number>;
  readout: React.RefObject<Readout | null>;
}) {
  const { camera, size, pointer } = useThree();
  const mobile = size.width < 640;
  const station = useMemo(() => findStation(assets.heights), [assets]);
  const cursor = useRef(new THREE.Vector2(station[0] + 60, station[1] + 40));
  const lastMove = useRef(-10);
  const touch = useRef(false);
  const smoothV = useRef(scroll.get());
  const started = useRef<number | null>(null);
  const lastHud = useRef(0);
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const flow = useRef<{ material: { dashOffset: number; opacity: number } }[]>([]);
  const pin = useRef<HTMLDivElement | null>(null);
  const area = useRef<HTMLDivElement | null>(null);
  const env = useRef<(HTMLDivElement | null)[]>([]);
  const vertexDots = useRef<(HTMLDivElement | null)[]>([]);
  const stationTag = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      touch.current = e.pointerType === "touch";
      if (!touch.current) lastMove.current = performance.now() / 1000;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const geometry = useMemo(() => {
    const segX = mobile ? 256 : 512;
    return new THREE.PlaneGeometry(WORLD.width, WORLD.depth, segX, Math.round((segX * SIZE.height) / SIZE.width));
  }, [mobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);

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
        uExaggeration: { value: 1.8 },
        uRangeWorld: { value: RANGE_WORLD },
        uLift: { value: 1 },
        uIntro: { value: 0 },
        uTime: { value: 0 },
        uCursor: { value: new THREE.Vector2() },
        uCursorOn: { value: 0 },
        uStation: { value: new THREE.Vector2(station[0], station[1]) },
        uMeasure: { value: 1 },
        uScanX: { value: 0 },
        uScan: { value: 0 },
        uParcel: { value: 0 },
        uFill: { value: 0 },
        uEnv: { value: 0 },
        uRivers: { value: 0 },
        uPoly: { value: poly },
        uPolyCount: { value: perimeter.length },
        uGround: { value: rgb("#042630") },
        uRidge: { value: rgb("#1B5E70") },
        uLine: { value: rgb("#EAF3F5") },
        uWater: { value: rgb("#6CC3D8") },
        uOrange: { value: rgb("#FF6A13") },
      },
    });
  }, [assets, station]);
  useEffect(() => () => material.dispose(), [material]);

  const rivers = useMemo(
    () =>
      terrain.rivers.map((r) => ({
        main: r.main,
        points: r.points.map(([x, y]) => worldPoint(assets.heights, [x, y], 0.006)),
      })),
    [assets],
  );

  const anchors = useMemo(() => {
    const h = assets.heights;
    return {
      station: worldPoint(h, station, 0.01),
      center: worldPoint(h, parcelCenter),
      vertices: terrain.parcel.vertices.map((v) => worldPoint(h, [v.x, v.y])),
      app: worldPoint(h, terrain.parcel.riverEdge[Math.floor(terrain.parcel.riverEdge.length * 0.45)] as [number, number]),
      reserve: worldPoint(h, terrain.reserve.polygon[2] as [number, number]),
    };
  }, [assets, station]);

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    if (started.current === null) started.current = now;
    const since = now - started.current;
    const intro = Math.min(1, since / 2.4);
    const introEase = 1 - Math.pow(1 - intro, 3);

    smoothV.current = THREE.MathUtils.damp(smoothV.current, scroll.get(), 5, Math.min(delta, 0.1));
    const v = smoothV.current;
    const s = stageAt(v);

    // Câmera.
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const cover = Math.min(WORLD.depth / 2 / tanHalf, WORLD.width / 2 / (tanHalf * aspect));
    const k = cameraAt(v);
    const drift = 1 - ramp(v, 0.4, 1);
    const [px, pz] = toWorld(parcelCenter[0], parcelCenter[1]);
    const focus = new THREE.Vector3(
      THREE.MathUtils.lerp(k.fx, px, k.focus),
      THREE.MathUtils.lerp(0.2, anchors.center[1], k.focus),
      THREE.MathUtils.lerp(k.fz, pz, k.focus) + k.oz,
    );
    const narrow = 1 + Math.max(0, 1 - aspect) * 0.8;
    const dist = cover * k.dist * narrow * (1 + (1 - introEase) * 0.5);
    const pitch = THREE.MathUtils.degToRad(k.pitch + Math.sin(now * 0.05) * 1.5 * drift);
    const yaw = THREE.MathUtils.degToRad(k.yaw + Math.sin(now * 0.07) * 7 * drift);
    cam.position.set(
      focus.x + dist * Math.cos(pitch) * Math.sin(yaw),
      focus.y + dist * Math.sin(pitch),
      focus.z + dist * Math.cos(pitch) * Math.cos(yaw),
    );
    cam.fov = FOV;
    cam.updateProjectionMatrix();
    cam.lookAt(focus);
    cam.updateMatrixWorld();

    // Ponto visado: o mouse, ou um levantamento automático no toque/ocioso.
    const live = !touch.current && performance.now() / 1000 - lastMove.current < 2.5;
    let target: [number, number] | null = null;
    if (live) {
      ray.setFromCamera(pointer, cam);
      target = raycastTerrain(assets.heights, ray.ray.origin, ray.ray.direction);
    }
    if (!target) target = autoTarget(now, station);
    cursor.current.x = THREE.MathUtils.damp(cursor.current.x, target[0], live ? 14 : 2.5, delta);
    cursor.current.y = THREE.MathUtils.damp(cursor.current.y, target[1], live ? 14 : 2.5, delta);

    const u = material.uniforms;
    u.uTime.value = now;
    u.uIntro.value = introEase;
    u.uCursor.value.copy(cursor.current);
    u.uCursorOn.value = s.measure * ramp(since, 1.2, 2.2);
    u.uMeasure.value = s.measure;
    u.uScan.value = s.scan;
    u.uScanX.value = s.scanX;
    u.uParcel.value = s.parcel;
    u.uFill.value = s.fill;
    u.uEnv.value = s.env;
    u.uRivers.value = s.rivers;

    flow.current.forEach((line, i) => {
      if (!line) return;
      line.material.dashOffset -= delta * (rivers[i]?.main ? 0.35 : 0.22);
      line.material.opacity = (0.15 + s.rivers * 0.85) * introEase;
    });

    if (pin.current) {
      pin.current.style.opacity = String(s.pin);
      pin.current.style.transform = `translate(-50%, ${-100 - (1 - s.pin) * 70}%)`;
    }
    if (area.current) area.current.style.opacity = String(s.fill * (1 - s.pin));
    env.current.forEach((el) => el && (el.style.opacity = String(s.env * (1 - s.pin))));
    vertexDots.current.forEach((el, i) => {
      if (el) el.style.opacity = String(s.parcel > 0.001 ? ramp(s.parcel * perimeter.length, i - 0.3, i) * (1 - s.pin * 0.6) : 0);
    });
    if (stationTag.current) stationTag.current.style.opacity = String(s.measure * ramp(since, 1.2, 2.2));

    // Leituras do instrumento, ~15 vezes por segundo.
    const hud = readout.current;
    if (hud && now - lastHud.current > 0.066) {
      lastHud.current = now;
      const [cx, cy] = [cursor.current.x, cursor.current.y];
      const meters = (x: number, y: number) => sampleHeight(assets.heights, x, y) * RANGE + terrain.hMin;
      const scanning = s.scan > 0.5;
      const a: [number, number] = scanning ? [s.scanX, 30] : station;
      const b: [number, number] = scanning ? [s.scanX, SIZE.height - 30] : [cx, cy];
      const samples = Array.from({ length: 64 }, (_, i) => {
        const t = i / 63;
        return meters(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t);
      });
      const [e, n] = toUtm(cx, cy);
      const hz = Math.hypot(b[0] - a[0], b[1] - a[1]) * terrain.metersPerPixel;
      const dh = samples[63] - samples[0];
      hud.update({
        mode: scanning ? "scan" : "point",
        e,
        n,
        elevation: meters(cx, cy),
        distance: hz,
        dh,
        slope: hz > 0 ? (dh / hz) * 100 : 0,
        scanE: toUtm(s.scanX, SIZE.height / 2)[0],
        profile: samples,
        visible: Math.max(s.measure, s.scan) * ramp(since, 1.2, 2.2),
      });
      const screen = new THREE.Vector3(...worldPoint(assets.heights, [cx, cy], 0.02)).project(cam);
      hud.place((screen.x * 0.5 + 0.5) * size.width, (-screen.y * 0.5 + 0.5) * size.height, s.measure);
    }
  });

  const tag =
    "pointer-events-none select-none whitespace-nowrap border border-white/15 bg-[#031B22]/80 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 tabular-nums backdrop-blur-sm";

  return (
    <>
      <mesh geometry={geometry} material={material} rotation-x={-Math.PI / 2} />
      {rivers.map((r, i) => (
        <Line
          key={i}
          ref={(l) => {
            flow.current[i] = l as unknown as { material: { dashOffset: number; opacity: number } };
          }}
          points={r.points}
          color="#A9E3F0"
          lineWidth={r.main ? 2.2 : 1.1}
          dashed
          dashSize={r.main ? 0.05 : 0.03}
          gapSize={r.main ? 0.09 : 0.07}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      ))}
      <Html position={anchors.station} zIndexRange={[20, 0]}>
        <div ref={stationTag} className="pointer-events-none relative opacity-0">
          <span className="absolute left-0 top-0 block size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-orange" />
          <span className={`absolute left-3 top-0 -translate-y-1/2 ${tag}`}>EST-01</span>
        </div>
      </Html>
      {terrain.parcel.vertices.map((v, i) => (
        <Html key={v.id} position={anchors.vertices[i]} zIndexRange={[20, 0]}>
          <div
            ref={(el) => {
              vertexDots.current[i] = el;
            }}
            className="pointer-events-none relative opacity-0"
          >
            <span className="absolute left-0 top-0 block size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-orange" />
            <span className={`absolute left-2.5 top-0 -translate-y-1/2 ${tag}`}>{v.id}</span>
          </div>
        </Html>
      ))}
      <Html position={anchors.center} zIndexRange={[20, 0]}>
        <div ref={area} className="pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0">
          <span className="block whitespace-nowrap bg-white px-2.5 py-1 text-sm font-bold text-brand tabular-nums">
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
          <img
            src="/brand/logo-i3geo-pin-negativo.svg"
            alt=""
            width={56}
            height={71}
            className="block h-[71px] w-14 max-w-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          />
        </div>
      </Html>
    </>
  );
}

export default function ConceptScene({
  scroll,
  readout,
  onReady,
}: {
  scroll: MotionValue<number>;
  readout: React.RefObject<Readout | null>;
  onReady: () => void;
}) {
  const [assets, setAssets] = useState<Assets | null>(null);

  useEffect(() => {
    let cancelled = false;
    let created: Assets | null = null;
    loadHeights()
      .then((heights) => {
        if (cancelled) return;
        created = {
          heights,
          heightTexture: makeHeightTexture(heights),
          overlayTexture: makeOverlayTexture(window.innerWidth < 640 ? 2 : 4),
        };
        setAssets(created);
        onReady();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      created?.heightTexture.dispose();
      created?.overlayTexture.dispose();
    };
  }, [onReady]);

  if (!assets) return null;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: FOV, near: 0.05, far: 100, position: [0, 6, 6] }}
      style={{ position: "absolute", inset: 0 }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
    >
      <Terrain assets={assets} scroll={scroll} readout={readout} />
    </Canvas>
  );
}
