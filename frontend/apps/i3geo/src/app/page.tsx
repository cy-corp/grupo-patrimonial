import { About } from "@/components/landing/about";
import { Areas } from "@/components/landing/areas";
import { Contact } from "@/components/landing/contact";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Areas />
      <About />
      <Contact />
    </>
  );
}
