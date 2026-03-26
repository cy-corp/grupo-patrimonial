"use client";

import { useGLTF } from "@react-three/drei";

export function PreloadAssets() {
  // Preload the main 3D model globally
  useGLTF.preload("/models/condominio.glb");
  return null;
}
