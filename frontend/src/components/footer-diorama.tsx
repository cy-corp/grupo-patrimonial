"use client";

import { usePathname } from "next/navigation";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type FooterDioramaVariant = "legacy" | "rendal";

const VARIANTS = {
  legacy: { model: "/models/footer-city.glb", clear: "#F3F0EA", clockSign: -1 },
  rendal: { model: "/models/footer-city-rendal.glb", clear: "#F8F1E3", clockSign: 1 },
} as const;

const BLD_ROOT = /^Bld_\d+(_[LR]\d)?$/;
const STREET = 21.6;
const DROP = 6;
const RISE_STAGGER = 1.35;
const RISE_DURATION = 0.85;

// Rendal framing: tallest point of the tower (finial) and the minimum street
// span that must stay visible on narrow screens, both in model units.
const CITY_HEIGHT = 5.75;
const MIN_SPAN = 10.5;
const FILL = 0.8;

const MOBILE_CAM = { position: new THREE.Vector3(0.45, 1.9, -13.2), fov: 26, look: new THREE.Vector3(0, 1.2, 0) };
const DESKTOP_CAM = { position: new THREE.Vector3(1.15, 2.15, -17.8), fov: 24, look: new THREE.Vector3(0, 0.85, 0) };
const SUN_DIRECTION = new THREE.Vector3(12, 10, -5).normalize();

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/Sao_Paulo",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

function rendalFraming(width: number, height: number) {
  const t = THREE.MathUtils.smoothstep(width, 420, 1280);
  const position = MOBILE_CAM.position.clone().lerp(DESKTOP_CAM.position, t);
  const look = MOBILE_CAM.look.clone().lerp(DESKTOP_CAM.look, t);
  const fov = THREE.MathUtils.lerp(MOBILE_CAM.fov, DESKTOP_CAM.fov, t);
  const viewHeight = 2 * position.distanceTo(look) * Math.tan(THREE.MathUtils.degToRad(fov / 2));
  const viewWidth = viewHeight * (width / Math.max(1, height));
  const scale = Math.min((viewHeight * FILL) / CITY_HEIGHT, viewWidth / MIN_SPAN);
  const baseY = look.y - viewHeight / 2 - scale * 0.04;
  return { position, look, fov, viewWidth, viewHeight, scale, baseY };
}

function now() {
  return performance.now() / 1000;
}

function City({
  variant,
  reducedMotion,
  play,
  epoch,
}: {
  variant: FooterDioramaVariant;
  reducedMotion: boolean;
  play: boolean;
  epoch: number;
}) {
  const config = VARIANTS[variant];
  const { scene } = useGLTF(config.model);
  const { viewport, size, invalidate } = useThree();
  const started = useRef<number | null>(null);

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
      building.obj.position.y = reducedMotion ? building.baseY : building.baseY - DROP;
    });
    invalidate();
  }, [buildings, reducedMotion, epoch, invalidate]);

  useEffect(() => {
    if (!play) return;
    invalidate();
    const id = window.setInterval(() => invalidate(), 15_000);
    return () => window.clearInterval(id);
  }, [play, epoch, invalidate]);

  useFrame(() => {
    if (!play) return;
    if (started.current === null) started.current = now();
    const elapsed = now() - started.current;

    let rising = false;
    buildings.forEach((building) => {
      const t = reducedMotion
        ? 1
        : THREE.MathUtils.clamp(
            (elapsed - ((building.obj.position.x - span.min) / span.range) * RISE_STAGGER) / RISE_DURATION,
            0,
            1,
          );
      if (t < 1) rising = true;
      const eased = 1 - (1 - t) ** 3;
      building.obj.position.y = building.baseY + THREE.MathUtils.lerp(-DROP, 0, eased);
    });
    if (rising) invalidate();

    const parts = clockFormat.formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
    const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
    const sign = config.clockSign;
    if (clockHands.hour) {
      clockHands.hour.rotation.z = sign * (((hour % 12) / 12) * Math.PI * 2 + (minute / 60) * (Math.PI / 6));
    }
    if (clockHands.minute) {
      clockHands.minute.rotation.z = sign * (minute / 60) * Math.PI * 2;
    }
  });

  if (variant === "rendal") {
    const frame = rendalFraming(size.width, size.height);
    return (
      <group scale={frame.scale} position={[0, frame.baseY, 0]}>
        <primitive object={root} />
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, 6]} receiveShadow>
          <planeGeometry args={[160, 18]} />
          <shadowMaterial color="#0E2A2D" opacity={0.2} transparent />
        </mesh>
      </group>
    );
  }

  const mobile = size.width < 768;
  const scale = mobile ? (viewport.width / 16) * 0.9 : Math.max(0.36, (viewport.width / 24) * 0.76);

  return (
    <group scale={scale} position={[0, mobile ? -2.25 : -3.85, 0]}>
      <primitive object={root} />
    </group>
  );
}

function Aim({ variant }: { variant: FooterDioramaVariant }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    if (variant === "rendal") {
      const frame = rendalFraming(size.width, size.height);
      camera.position.copy(frame.position);
      perspectiveCamera.fov = frame.fov;
      camera.lookAt(frame.look);
    } else if (size.width < 768) {
      camera.position.set(0.45, 1.9, -13.2);
      perspectiveCamera.fov = 26;
      camera.lookAt(0, 1.2, 0);
    } else {
      camera.position.set(1.15, 2.15, -17.8);
      perspectiveCamera.fov = 24;
      camera.lookAt(0, 0.85, 0);
    }
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, variant]);
  return null;
}

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const texture = pmrem.fromScene(room, 0.04).texture;
    scene.environment = texture;
    scene.environmentIntensity = 0.25;
    return () => {
      scene.environment = null;
      texture.dispose();
      room.clear();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function RendalLights() {
  const { size } = useThree();
  const sun = useRef<THREE.DirectionalLight>(null);
  const frame = rendalFraming(size.width, size.height);
  const reach = Math.hypot(frame.viewWidth / 2, frame.viewHeight / 2) + 1;
  const center = new THREE.Vector3(0, frame.look.y, 0);
  const sunPosition = center.clone().addScaledVector(SUN_DIRECTION, 30);
  const mapSize = size.width < 768 ? 1024 : 2048;
  const distance = frame.position.distanceTo(frame.look);

  useLayoutEffect(() => {
    const light = sun.current;
    if (!light) return;
    light.target.position.copy(center);
    light.target.updateMatrixWorld();
    const cam = light.shadow.camera;
    cam.left = -reach;
    cam.right = reach;
    cam.top = reach;
    cam.bottom = -reach;
    cam.near = 1;
    cam.far = 70;
    cam.updateProjectionMatrix();
    light.shadow.needsUpdate = true;
  });

  return (
    <>
      <fog attach="fog" args={["#F8F1E3", distance - 1, distance + 14]} />
      <hemisphereLight args={["#F8F1E3", "#1F1F1F", 0.4]} />
      <directionalLight
        ref={sun}
        castShadow
        position={sunPosition}
        intensity={3.2}
        color="#FFE2B8"
        shadow-mapSize={[mapSize, mapSize]}
        shadow-bias={-0.00015}
        shadow-normalBias={0.02}
      />
      <directionalLight position={[-6, 3, -3]} intensity={0.35} color="#8FB3B7" />
      <Environment />
    </>
  );
}

function LegacyLights() {
  return (
    <>
      <hemisphereLight args={["#F7F2EA", "#8F9C97", 0.85]} />
      <directionalLight castShadow position={[7, 12, -9]} intensity={1.35} color="#FFF6EA" shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 4, -4]} intensity={0.28} color="#C5D0CC" />
    </>
  );
}

export function FooterDiorama({ variant = "legacy" }: { variant?: FooterDioramaVariant }) {
  const config = VARIANTS[variant];
  const hostRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    useGLTF.preload(config.model);
  }, [config.model]);

  useEffect(() => {
    revealedRef.current = false;
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || mounted) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin: "0px 0px 150% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [mounted]);

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
      {mounted ? (
        <Canvas
          shadows="percentage"
          dpr={[1, 1.5]}
          camera={camera}
          frameloop="demand"
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(config.clear, 0);
            if (variant === "rendal") gl.toneMapping = THREE.NeutralToneMapping;
          }}
        >
          <Aim variant={variant} />
          {variant === "rendal" ? <RendalLights /> : <LegacyLights />}
          <Suspense fallback={null}>
            <City variant={variant} reducedMotion={reducedMotion} play={visible} epoch={epoch} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
