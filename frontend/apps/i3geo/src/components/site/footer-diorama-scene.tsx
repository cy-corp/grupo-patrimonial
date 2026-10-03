"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { SIZE, parcelCenter } from "@/components/hero/terrain";
import { loadHeights, sampleHeight } from "@/components/hero/terrain-assets";

const WIDTH = 6;
const DEPTH = 4;
const RELIEF = 1.25;
const LAYERS = 22;
const BASE = -0.3;

// Maquete do relevo real em camadas, como papel recortado por curva de nível.
function Maquette({ heights, visible }: { heights: Float32Array; visible: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rise = useRef(0);

  const { geometry, pin } = useMemo(() => {
    const gx = 150;
    const gy = 100;
    const geo = new THREE.PlaneGeometry(WIDTH, DEPTH, gx, gy);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const paper = new THREE.Color("#F6F4EF");
    const deep = new THREE.Color("#7FB4C0");
    const c = new THREE.Color();
    for (let j = 0; j <= gy; j++) {
      for (let i = 0; i <= gx; i++) {
        const k = j * (gx + 1) + i;
        const edge = i === 0 || j === 0 || i === gx || j === gy;
        // Média de vizinhos para as camadas saírem contínuas, sem ruído.
        const x = (i / gx) * SIZE.width;
        const y = (j / gy) * SIZE.height;
        let h = 0;
        for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) h += sampleHeight(heights, x + dx * 5, y + dy * 5);
        h /= 25;
        pos.setY(k, edge ? BASE : h * RELIEF);
        // Faixas alternadas marcam as curvas de nível sobre o relevo liso.
        const band = Math.floor(h * LAYERS) % 2 === 0 ? 0 : 0.14;
        c.copy(deep).lerp(paper, Math.min(1, 0.3 + h * 1.1 - band));
        colors.set([c.r, c.g, c.b], k * 3);
      }
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const [px, py] = parcelCenter;
    const ph = sampleHeight(heights, px, py);
    return {
      geometry: geo,
      pin: [(px / SIZE.width - 0.5) * WIDTH, ph * RELIEF, (py / SIZE.height - 0.5) * DEPTH] as [number, number, number],
    };
  }, [heights]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!group.current) return;
    rise.current = THREE.MathUtils.damp(rise.current, visible ? 1 : 0, 2.2, Math.min(delta, 0.1));
    // Em tela estreita a maquete encolhe para caber inteira.
    group.current.scale.setScalar(Math.min(1, state.viewport.aspect / 1.7));
    group.current.position.y = -2.4 + rise.current * 2.4;
    group.current.rotation.y = -0.35 + Math.sin(state.clock.elapsedTime * 0.12) * 0.22 + (1 - rise.current) * 0.5;
  });

  return (
    <group ref={group} position-y={-2.4}>
      <mesh geometry={geometry}>
        <meshStandardMaterial vertexColors roughness={0.92} metalness={0} />
      </mesh>
      <mesh position-y={BASE - 0.11}>
        <boxGeometry args={[WIDTH, 0.22, DEPTH]} />
        <meshStandardMaterial color="#005C74" roughness={0.8} />
      </mesh>
      <Html position={pin} center zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-i3geo-pin.svg" alt="" className="h-14 w-auto max-w-none -translate-y-1/2 drop-shadow-[0_8px_14px_rgba(0,0,0,0.45)] sm:h-20" />
      </Html>
    </group>
  );
}

export default function FooterDioramaScene({ visible }: { visible: boolean }) {
  const [heights, setHeights] = useState<Float32Array | null>(null);

  useEffect(() => {
    let alive = true;
    loadHeights().then((h) => alive && setHeights(h));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={visible ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 30, near: 0.1, far: 50, position: [0, 3.6, 8.2] }}
      onCreated={({ camera }) => camera.lookAt(0, 0.35, 0)}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[-5, 6, 3]} intensity={2.1} color="#FFF3E2" />
      <directionalLight position={[4, 2, -4]} intensity={0.5} color="#8FDCEC" />
      {heights && <Maquette heights={heights} visible={visible} />}
    </Canvas>
  );
}
