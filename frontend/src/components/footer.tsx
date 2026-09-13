import Link from "next/link";
import { DualBrandLockup } from "./brands/DualBrandLockup";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 inline-flex">
              <DualBrandLockup
                className="max-w-md gap-4"
                markClassName="max-h-16 max-w-[9rem] md:max-h-20 md:max-w-[11rem]"
                pipeClassName="h-14 md:h-16"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Duas empresas, papéis claros: incorporação na Rendal, projeto e construção na DCorp.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold">Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/incorporadora" className="hover:text-primary">
                  Grupo Rendal
                </Link>
              </li>
              <li>
                <Link href="/engenharia" className="hover:text-primary">
                  DCorp Engenharia
                </Link>
              </li>
              <li>
                <Link href="/quem-somos" className="hover:text-primary">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/contato#form-contato" className="hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@gruporendal.com.br</li>
              <li>(19) 99999-9999</li>
              <li>Campinas-SP</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Grupo Rendal e DCorp Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

