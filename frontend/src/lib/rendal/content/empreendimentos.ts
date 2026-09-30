export type Midia = { src: string; alt: string; fit?: "cover" | "contain" };

export type Planta = {
  id: "terreo" | "laje";
  label: string;
  imagem: Midia & { width: number; height: number };
};

/** Percent of the plant image, measured on the source file. */
export type Area = { x: number; y: number; w: number; h: number };

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
  planta: Planta["id"];
  areas: Area[];
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
  /** Overrides the differential line when the product is not the house kit. */
  fatos?: string;
  /** Longer line under the video hero title. */
  heroLead?: string;
  heroDia: Midia;
  heroNoite: Midia;
  heroVideo?: Midia & { poster: string };
  galeria: Midia[];
  plantas: Planta[];
  hotspots: Hotspot[];
  racional: Array<{ titulo: string; texto: string }>;
  diaNaCasa: DiaPasso[];
  memorialPdf?: string;
  localizacao: { enderecoPublico: string; mapas: string; waze: string; proximidades: Array<{ nome: string; tempo: string }> };
};

const CAPETINGA = "/referencia/capetinga-dener";
const PASSOS = "/referencia/passos";

export const empreendimentos: Empreendimento[] = [
  {
    slug: "passos",
    nome: "Loteamento Passos",
    status: "obra",
    cidade: "Passos",
    bairro: "Passos, MG",
    precoPublico: false,
    diferenciais: [],
    fatos: "vias em execução · lotes demarcados · Passos, MG",
    heroLead: "Um terreno em Passos, já no chão. Veja o projeto.",
    heroDia: {
      src: `${PASSOS}/01-vista-vale.jpg`,
      alt: "Vista do Loteamento Passos ao pôr do sol, com vias e o vale ao fundo",
    },
    heroNoite: {
      src: `${PASSOS}/03-via-por-do-sol.jpg`,
      alt: "Via do Loteamento Passos ao entardecer",
    },
    heroVideo: {
      src: `${PASSOS}/video-hero.mp4`,
      poster: `${PASSOS}/video-poster.jpg`,
      alt: "Percurso pelas vias do Loteamento Passos",
    },
    galeria: [
      {
        src: `${PASSOS}/01-vista-vale.jpg`,
        alt: "Vista do loteamento e do vale ao pôr do sol",
      },
      {
        src: `${PASSOS}/02-via-curva-mata.jpg`,
        alt: "Via em curva com guia de concreto e mata ao fundo",
      },
      {
        src: `${PASSOS}/03-via-por-do-sol.jpg`,
        alt: "Via do loteamento ao entardecer",
      },
      {
        src: `${PASSOS}/04-via-subida.jpg`,
        alt: "Via subindo o loteamento, com casas vizinhas à esquerda",
      },
      {
        src: `${PASSOS}/05-lotes-marcadores.jpg`,
        alt: "Lotes demarcados com marcadores no terreno",
      },
    ],
    plantas: [],
    hotspots: [],
    racional: [
      {
        titulo: "Vias em execução",
        texto: "Guias, drenagem e terrapleno já no lugar. O loteamento está saindo do papel.",
      },
      {
        titulo: "Lotes demarcados",
        texto: "Os limites estão marcados no terreno. Na visita, você vê o lote e o entorno.",
      },
      {
        titulo: "Vista para o vale",
        texto: "Passos, MG, com mata e cidade ao fundo. O lugar é o produto, nesta fase.",
      },
    ],
    diaNaCasa: [],
    localizacao: {
      enderecoPublico: "Passos, MG",
      mapas: "https://www.google.com/maps/search/?api=1&query=Passos%20MG",
      waze: "https://waze.com/ul?q=Passos%20MG&navigate=yes",
      proximidades: [],
    },
  },
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
          width: 487,
          height: 1024,
        },
      },
      {
        id: "laje",
        label: "Laje",
        imagem: {
          src: `${CAPETINGA}/planta-laje.jpg`,
          alt: "Planta da laje do Residencial Capetinga",
          width: 645,
          height: 1024,
        },
      },
    ],
    hotspots: [
      {
        titulo: "Laje com pergola",
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
        areas: [{ x: 9.6, y: 51.8, w: 36.8, h: 13.1 }],
      },
      {
        hora: "15h",
        titulo: "A visita chega e usa o lavabo, sem passar pelos quartos.",
        texto: "O lavabo social recebe quem chega. A área íntima fica reservada.",
        ambiente: "Lavabo social",
        planta: "terreo",
        areas: [{ x: 17.4, y: 64.9, w: 9.2, h: 5.4 }],
      },
      {
        hora: "19h",
        titulo: "Jantar na laje, com pergola e floreira.",
        texto: "A cobertura impermeabilizada vira o lugar do fim do dia.",
        ambiente: "Laje de lazer",
        planta: "laje",
        areas: [{ x: 6.2, y: 64.6, w: 43.1, h: 31.6 }],
      },
      {
        hora: "22h",
        titulo: "Os quartos ficam reservados, longe do movimento.",
        texto: "O descanso fica separado do estar e da laje.",
        ambiente: "Quartos",
        planta: "terreo",
        areas: [
          { x: 9.6, y: 20, w: 36.6, h: 9.2 },
          { x: 18.1, y: 40.2, w: 20.9, h: 11.3 },
        ],
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

/** Photos followed by the plants, shared by the gallery and the plant viewers. */
export function midiasDoEmpreendimento(item: Empreendimento): Midia[] {
  return [
    ...item.galeria,
    ...item.plantas.map(({ imagem }) => ({ src: imagem.src, alt: imagem.alt, fit: "contain" as const })),
  ];
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
  if (item.fatos) return item.fatos;
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
