import type { Metadata } from "next";
import { FooterCurvas, FooterHorizonte, FooterPrancha } from "@/components/site/footer-variants";
import { SiteFooter, SiteHeader } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Opções de rodapé",
  robots: { index: false, follow: false },
};

const options = [
  { id: "A", name: "Curvas", text: "Logotipo gigante cortado na base, sobre curvas de nível que deslizam.", footer: <FooterCurvas /> },
  { id: "B", name: "Horizonte", text: "O relevo real em perfis empilhados, que se erguem ao entrar na tela.", footer: <FooterHorizonte /> },
  { id: "C", name: "Prancha", text: "Carimbo de planta técnica. Mova o cursor: as coordenadas acompanham.", footer: <FooterPrancha /> },
  { id: "D", name: "Maquete", text: "A versão atual: maquete 3D do relevo com o pin.", footer: <SiteFooter /> },
];

// Página de comparação interna. Sai do ar quando um rodapé for escolhido.
export default function RodapesPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-brand sm:text-6xl">Opções de rodapé</h1>
          <p className="mt-4 max-w-xl text-lg text-graphite/80">Quatro modelos, um abaixo do outro, em tamanho real.</p>
        </div>
        {options.map((option) => (
          <section key={option.id} className="pb-24">
            <div className="mx-auto flex max-w-7xl items-baseline gap-4 px-6 pb-5 sm:px-10 lg:px-16">
              <span className="bg-brand px-3 py-1 text-lg font-bold text-white">{option.id}</span>
              <h2 className="text-2xl font-bold tracking-tight text-graphite">{option.name}</h2>
              <p className="text-graphite/75">{option.text}</p>
            </div>
            {option.footer}
          </section>
        ))}
      </main>
    </>
  );
}
