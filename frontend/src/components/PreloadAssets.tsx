"use client";

import { useGLTF } from "@react-three/drei";

export function PreloadAssets() {
  useGLTF.preload("/models/condominio.glb");
  useGLTF.preload("/models/footer-city.glb");
  return null;
}
