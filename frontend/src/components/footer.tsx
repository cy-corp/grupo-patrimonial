"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { companyList, formatCnpj } from "@/lib/companies";

const FooterDiorama = dynamic(
  () => import("./footer-diorama").then((mod) => mod.FooterDiorama),
  { ssr: false },
);

export function Footer() {
  return (
    <footer className="relative z-[70] -mt-6 overflow-hidden rounded-t-[40px] bg-[#F3F0EA] pb-[12.5rem] pt-12 shadow-[0_-16px_40px_rgba(0,0,0,0.12)] md:-mt-10 md:rounded-t-[60px] md:pb-[26rem] md:pt-20">
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="max-w-xs text-pretty text-sm text-[#4D4D4D]">
              Duas empresas, papéis claros: incorporação na Rendal, projeto e construção na DCorp.
            </p>
          </div>

          {companyList.map((company) => (
            <div key={company.id} className="md:col-span-3">
              <h3 className="mb-4 font-heading font-semibold text-[#1F1F1F]">{company.legalName}</h3>
              <ul className="space-y-2 text-sm text-[#4D4D4D]">
                <li>
                  <a href={company.contactHref} className="hover:text-primary">
                    {company.email}
                  </a>
                </li>
                <li>
                  <a href={company.phoneHref} className="hover:text-primary">
                    {company.phone}
                  </a>
                </li>
                <li className="text-pretty">{company.address}</li>
                <li>{formatCnpj(company.cnpj)}</li>
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h3 className="mb-4 font-heading font-semibold text-[#1F1F1F]">Links</h3>
            <ul className="space-y-2 text-sm text-[#4D4D4D]">
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
                <Link href="/contato" className="hover:text-primary">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pb-3 text-sm text-[#4D4D4D] md:mt-16 md:pb-0">
          <p>&copy; {new Date().getFullYear()} Grupo Rendal e DCorp Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 md:h-[28rem]">
        <FooterDiorama />
      </div>
    </footer>
  );
}
