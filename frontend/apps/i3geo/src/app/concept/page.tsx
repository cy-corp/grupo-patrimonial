import type { Metadata } from "next";
import { ConceptExperience } from "@/components/concept/concept-experience";

export const metadata: Metadata = {
  title: "Conceito",
  robots: { index: false, follow: false },
};

export default function ConceptPage() {
  return <ConceptExperience />;
}
