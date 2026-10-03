import { contact, coverage, services } from "./content";

// Endereço público do site. Em outro domínio, defina NEXT_PUBLIC_I3GEO_URL.
export const siteUrl = (process.env.NEXT_PUBLIC_I3GEO_URL ?? "https://i3geo.com.br").replace(/\/$/, "");

export const seo = {
  title: "i3Geo | Topografia e Georreferenciamento em MG e SP",
  description:
    "Georreferenciamento, retificação de área, desmembramento, levantamento topográfico e projetos técnicos em Minas Gerais e São Paulo. Solicite um orçamento.",
};

// Dados estruturados para buscadores: quem é a empresa, o que faz e onde atende.
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "i3Geo",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-i3geo-horizontal.svg`,
  image: `${siteUrl}/opengraph-image`,
  description: seo.description,
  telephone: `+${contact.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${contact.address.street}, ${contact.address.district}`,
    addressLocality: contact.address.city,
    addressRegion: contact.address.state,
    addressCountry: "BR",
  },
  areaServed: coverage.states.map((name) => ({ "@type": "State", name })),
  sameAs: ["https://www.instagram.com/i3geo.com.br/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title, description: service.text },
    })),
  },
};
