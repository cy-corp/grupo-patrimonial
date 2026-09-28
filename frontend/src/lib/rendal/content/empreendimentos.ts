export type Midia = { src: string; alt: string };

export type EmpreendimentoStatus = "lancamento" | "obra" | "entregue" | "referencia";

export type Hotspot = {
  titulo: string;
  texto: string;
  x: number;
  y: number;
};

export type DiaPasso = {
  hora: string;
  titulo: string;
  texto: string;
  ambiente: string;
  planta: "terreo" | "laje";
  box: { x: number; y: number; w: number; h: number };
};

export type Empreendimento = {
  slug: string;
  nome: string;
  status: EmpreendimentoStatus;
  cidade: string;
  bairro?: string;
  /** Used by the home price exercise. Shown publicly only when `precoPublico`. */
  precoAPartirDe?: number;
  precoPublico: boolean;
  diferenciais: Array<"laje-lazer" | "lavabo-social" | "fachada" | "integracao">;
  heroDia: Midia;
  heroNoite: Midia;
  galeria: Midia[];
  plantas: Array<{ id: string; label: string; imagem: Midia }>;
  hotspots: Hotspot[];
  racional: Array<{ titulo: string; texto: string }>;
  diaNaCasa: DiaPasso[];
  memorialPdf?: string;
  localizacao: { enderecoPublico: string; mapas: string; waze: string; proximidades: Array<{ nome: string; tempo: string }> };
};

const CAPETINGA = "/referencia/capetinga-dener";

export const empreendimentos: Empreendimento[] = [
  {
    slug: "capetinga",
    nome: "Residencial Capetinga",
    status: "referencia",
    cidade: "Capetinga",
    bairro: "Capetinga, MG",
    precoAPartirDe: 289_000,
    precoPublico: false,
    diferenciais: ["laje-lazer", "lavabo-social", "fachada", "integracao"],
    heroDia: {
      src: "/morph/frame-06.jpg",
      alt: "Residencial Capetinga durante o dia",
    },
    heroNoite: {
      src: "/wireframes/fachada-noite.jpg",
      alt: "Fachada do Residencial Capetinga à noite",
    },
    galeria: [
      {
        src: "/morph/frame-06.jpg",
        alt: "Residencial Capetinga durante o dia",
      },
      {
        src: "/wireframes/fachada-noite.jpg",
        alt: "Fachada do Residencial Capetinga à noite",
      },
      {
        src: "/wireframes/scroll-laje-golden.jpg",
        alt: "Laje de lazer ao pôr do sol",
      },
    ],

    plantas: [
      {
        id: "terreo",
        label: "Térreo",
        imagem: {
          src: `${CAPETINGA}/planta-terreo.jpg`,
          alt: "Planta do térreo do Residencial Capetinga",
        },
      },
      {
        id: "laje",
        label: "Laje",
        imagem: {
          src: `${CAPETINGA}/planta-laje.jpg`,
          alt: "Planta da laje do Residencial Capetinga",
        },
      },
    ],
    hotspots: [
      {
        titulo: "Laje com pérgola",
        texto: "A cobertura vira área de estar, em vez de telhado sem uso.",
        x: 58,
        y: 42,
      },
      {
        titulo: "Floreira na borda",
        texto: "Paisagismo na laje, onde a casa se usa e se vê.",
        x: 72,
        y: 62,
      },
      {
        titulo: "Estar ao ar livre",
        texto: "O jantar sai da sala e sobe para a cobertura.",
        x: 40,
        y: 58,
      },
    ],
    racional: [
      {
        titulo: "Estrutura no ponto",
        texto: "Dimensionada para o projeto, sem excesso técnico.",
      },
      {
        titulo: "Instalações na planta",
        texto: "Hidráulica e elétrica resolvidas antes da obra.",
      },
    ],
    diaNaCasa: [
      {
        hora: "07h",
        titulo: "Café na cozinha integrada à sala.",
        texto: "A manhã acontece num espaço só, sem corredor entre cozinha e estar.",
        ambiente: "Cozinha e sala",
        planta: "terreo",
        box: { x: 18, y: 22, w: 46, h: 34 },
      },
      {
        hora: "15h",
        titulo: "A visita chega e usa o lavabo, sem passar pelos quartos.",
        texto: "O lavabo social recebe quem chega. A área íntima fica reservada.",
        ambiente: "Lavabo social",
        planta: "terreo",
        box: { x: 62, y: 28, w: 22, h: 22 },
      },
      {
        hora: "19h",
        titulo: "Jantar na laje, com pérgola e floreira.",
        texto: "A cobertura impermeabilizada vira o lugar do fim do dia.",
        ambiente: "Laje de lazer",
        planta: "laje",
        box: { x: 22, y: 30, w: 56, h: 40 },
      },
      {
        hora: "22h",
        titulo: "Os quartos ficam reservados, longe do movimento.",
        texto: "O descanso fica separado do estar e da laje.",
        ambiente: "Quartos",
        planta: "terreo",
        box: { x: 14, y: 58, w: 70, h: 28 },
      },
    ],
    memorialPdf: `${CAPETINGA}/projeto-arquitetonico-dener-capetinga.pdf`,
    localizacao: {
      enderecoPublico: "Capetinga, MG",
      mapas: "https://www.google.com/maps/search/?api=1&query=Capetinga%20MG",
      waze: "https://waze.com/ul?q=Capetinga%20MG&navigate=yes",
      proximidades: [],
    },

  },
];

export function getEmpreendimento(slug: string) {
  return empreendimentos.find((item) => item.slug === slug);
}

export function primaryEmpreendimentoHref() {
  if (empreendimentos.length === 1) {
    return `/empreendimentos/${empreendimentos[0].slug}`;
  }
  return "/empreendimentos";
}

const DIFERENCIAL: Record<Empreendimento["diferenciais"][number], string> = {
  "laje-lazer": "laje de lazer",
  "lavabo-social": "lavabo social",
  fachada: "fachada",
  integracao: "integração social",
};

export function fatosDoEmpreendimento(item: Empreendimento) {
  return item.diferenciais.map((id) => DIFERENCIAL[id]).join(" · ");
}

export function formatPreco(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

export const STATUS_LABEL: Record<EmpreendimentoStatus, string> = {
  lancamento: "Em lançamento",
  obra: "Em obra",
  entregue: "Entregue",
  referencia: "Referência",
};
