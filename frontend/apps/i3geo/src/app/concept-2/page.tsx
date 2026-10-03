import type { Metadata } from "next";
import { DawnExperience } from "@/components/dawn/dawn-experience";

export const metadata: Metadata = {
  title: "Conceito 2",
  robots: { index: false, follow: false },
};

export default function Concept2Page() {
  return <DawnExperience />;
}
