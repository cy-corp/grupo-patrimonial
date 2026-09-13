export type CompanyId = "rendal" | "dcorp";

export type Company = {
  id: CompanyId;
  name: string;
  legalName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  address: string;
  city: string;
  cnpj: string;
  mapsEmbed: string;
  pageHref: string;
  contactHref: string;
};

const CAMPINAS_MAPS =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.253029433465!2d-47.034394024344445!3d-22.901264938478474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cf131f57a249%3A0x7fb6f58f7bc87ef2!2sR.%20Dr.%20Jo%C3%A3o%20A.dos%20Santos%2C%20332%20-%20Jardim%20das%20Paineiras%2C%20Campinas%20-%20SP%2C%2013092-331!5e0!3m2!1spt-BR!2sbr!4v1711568000000!5m2!1spt-BR!2sbr&iwloc=near";

const CAMPINAS_ADDRESS = "Rua Dr. João Alves dos Santos, 332, Jardim Paineiras, Campinas-SP";

export const companies: Record<CompanyId, Company> = {
  rendal: {
    id: "rendal",
    name: "Rendal",
    legalName: "Grupo Rendal",
    role: "Incorporação",
    email: "contato@gruporendal.com.br",
    phone: "(19) 99999-9999",
    phoneHref: "tel:+5519999999999",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_RENDAL ?? "5519999999999",
    address: CAMPINAS_ADDRESS,
    city: "Campinas-SP",
    cnpj: process.env.NEXT_PUBLIC_CNPJ_RENDAL ?? "",
    mapsEmbed: CAMPINAS_MAPS,
    pageHref: "/incorporadora",
    contactHref: "/contato?empresa=rendal",
  },
  dcorp: {
    id: "dcorp",
    name: "DCorp",
    legalName: "DCorp Engenharia",
    role: "Engenharia e obra",
    email: "contato@dcorp.eng.br",
    phone: "(19) 98888-8888",
    phoneHref: "tel:+5519988888888",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_DCORP ?? "5519988888888",
    address: CAMPINAS_ADDRESS,
    city: "Campinas-SP",
    cnpj: process.env.NEXT_PUBLIC_CNPJ_DCORP ?? "",
    mapsEmbed: CAMPINAS_MAPS,
    pageHref: "/engenharia",
    contactHref: "/contato?empresa=dcorp",
  },
};

export const companyList: Company[] = [companies.rendal, companies.dcorp];

export function isCompanyId(value: string | null | undefined): value is CompanyId {
  return value === "rendal" || value === "dcorp";
}

export function formatCnpj(cnpj: string) {
  return cnpj.trim() || "CNPJ em atualização cadastral";
}

export function whatsappHref(company: Company, text?: string) {
  const url = new URL(`https://wa.me/${company.whatsapp}`);
  if (text) url.searchParams.set("text", text);
  return url.toString();
}
