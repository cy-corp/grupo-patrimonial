"use client";

import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ModelProps {
  scrollProgress: number;
}

export function Model3D({ scrollProgress }: ModelProps) {
  // Use the local model
  const { scene } = useGLTF("/models/condominio.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Setup initial state and materials
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance materials for a premium look
        if (child.material) {
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // 1. Position/Translate Animation (Right offset -> Center)
    // At progress 0: target translation might be X=2
    // At progress 1: target translation is X=0
    const targetX = THREE.MathUtils.lerp(2.5, 0, scrollProgress);
    groupRef.current.position.x = targetX;

    // 2. Scale Animation (1.0 -> 1.15)
    const targetScale = THREE.MathUtils.lerp(0.8, 1.1, scrollProgress);
    groupRef.current.scale.setScalar(targetScale);

    // 3. Rotation (Subtle scroll-driven rotation + subtle mouse parallax)
    const targetRotationY = scrollProgress * Math.PI * 0.2; // 36deg rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY + state.mouse.x * 0.1,
      0.1
    );

    // 4. Reveal/Camera depth effect (subtle tilt)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.mouse.y * 0.05,
      0.1
    );
  });

  return (
    <group ref={groupRef} position={[2.5, -1, 0]} rotation={[0, -0.2, 0]}>
      <primitive object={scene} />
      {/* Dynamic Golden Lights that intensify with scroll */}
      <pointLight 
        position={[2, 2, 2]} 
        intensity={2 + scrollProgress * 10} 
        color="#C9A14A" 
        distance={10}
      />
      <pointLight 
        position={[-2, 1, -2]} 
        intensity={1 + scrollProgress * 5} 
        color="#E8C670" 
        distance={8}
      />
    </group>
  );
}

// Preload the model
useGLTF.preload("/models/condominio.glb");
