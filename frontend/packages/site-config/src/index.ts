export type SiteBrandId = "rendal" | "dcorp";

export type SiteBrandConfig = {
  id: SiteBrandId;
  name: string;
  role: string;
  logo: string;
  homeTitle: string;
  homeHref: string;
  links: Array<{ label: string; href: string }>;
  ctaLabel: string;
};

export const siteConfigs: Record<SiteBrandId, SiteBrandConfig> = {
  rendal: {
    id: "rendal",
    name: "Rendal",
    role: "Incorporadora",
    logo: "/brands/rendal-logo.png",
    homeTitle: "Desenvolvimento imobiliário",
    homeHref: "/",
    links: [
      { label: "A Rendal", href: "/quem-somos" },
      { label: "Empreendimentos", href: "/empreendimentos" },
      { label: "Investidores", href: "/investidores" },
      { label: "Contato", href: "/contato" },
    ],
    ctaLabel: "Fale com a Rendal",
  },
  dcorp: {
    id: "dcorp",
    name: "DCORP",
    role: "Construção industrial",
    logo: "/brands/dcorp-logo.png",
    homeTitle: "Projetos que constroem oportunidades",
    homeHref: "/",
    links: [
      { label: "A DCORP", href: "/quem-somos" },
      { label: "Sistemas construtivos", href: "/sistemas-construtivos" },
      { label: "Serviços", href: "/servicos" },
      { label: "Obras", href: "/obras" },
      { label: "Contato", href: "/contato" },
    ],
    ctaLabel: "Solicitar orçamento",
  },
};
