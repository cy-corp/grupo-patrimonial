import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <img src="/patrimonial-logo-png.png" alt="Patrimonial Incorporações" className="h-16 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Soluções completas para desenvolver, proteger, valorizar e perpetuar patrimônios imobiliários.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/quem-somos" className="hover:text-primary">Quem Somos</Link>
              </li>
              <li>
                <Link href="/engenharia" className="hover:text-primary">Engenharia</Link>
              </li>
              <li>
                <Link href="/investidores" className="hover:text-primary">Investidores</Link>
              </li>
              <li>
                <Link href="/contato#form-contato" className="hover:text-primary">Contato</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-heading font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@grupopatrimonial.com.br</li>
              <li>(19) 99999-9999</li>
              <li>Rua Dr. João Alves dos Santos, 332, Jardim Paineiras, Campinas-SP</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Patrimonial Incorporações. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs opacity-75">Uma empresa do Grupo I3 Participações.</p>
        </div>
      </div>
    </footer>
  );
}
