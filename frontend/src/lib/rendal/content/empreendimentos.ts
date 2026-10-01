export type Midia = { src: string; alt: string; fit?: "cover" | "contain" };

export type EtapaObraStatus = "concluido" | "em_execucao" | "proximo";

export type ObraMidia = {
  kind: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  aspect: "v" | "h" | "s";
  destaque?: boolean;
  tone?: string;
  fit?: "cover" | "contain";
};

export type EtapaObra = {
  id: string;
  titulo: string;
  /** Shorter label for the step nav. Falls back to titulo. */
  label?: string;
  status: EtapaObraStatus;
  midias: ObraMidia[];
};

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
  /** Construction progress steps for loteamentos in obra. Replaces the flat gallery when present. */
  etapasObra?: EtapaObra[];
  plantas: Planta[];
  hotspots: Hotspot[];
  racional: Array<{ titulo: string; texto: string }>;
  diaNaCasa: DiaPasso[];
  memorialPdf?: string;
  localizacao: { enderecoPublico: string; mapas: string; waze: string; proximidades: Array<{ nome: string; tempo: string }> };
};

const CAPETINGA = "/referencia/capetinga-dener";
const PASSOS = "/referencia/passos";
const OBRA = `${PASSOS}/obra`;

function obraFoto(
  pasta: string,
  arquivo: string,
  alt: string,
  aspect: ObraMidia["aspect"],
  tone: string,
  destaque = false,
): ObraMidia {
  return {
    kind: "image",
    src: `${OBRA}/${pasta}/${arquivo}.webp`,
    alt,
    aspect,
    tone,
    ...(destaque ? { destaque: true } : {}),
  };
}

function obraVideo(
  pasta: string,
  arquivo: string,
  alt: string,
  tone: string,
  destaque = false,
): ObraMidia {
  return {
    kind: "video",
    src: `${OBRA}/${pasta}/${arquivo}.mp4`,
    poster: `${OBRA}/${pasta}/${arquivo}-poster.jpg`,
    alt,
    aspect: "v",
    tone,
    ...(destaque ? { destaque: true } : {}),
  };
}

export function midiasDaEtapa(etapa: EtapaObra): ObraMidia[] {
  return [
    ...etapa.midias.filter((item) => item.kind === "video"),
    ...etapa.midias.filter((item) => item.kind !== "video"),
  ];
}

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
    etapasObra: [
      {
        id: "aprovacao",
        titulo: "Aprovação junto à prefeitura",
        label: "Aprovação",
        status: "concluido",
        midias: [
          {
            kind: "image",
            src: `${OBRA}/aprovacao/planta-lote.webp`,
            alt: "Planta urbanística aprovada do Loteamento Passos",
            aspect: "h",
            destaque: true,
            fit: "contain",
            tone: "#FFFFFF",
          },
        ],
      },
      {
        id: "terraplanagem",
        titulo: "Execução de terraplanagem",
        label: "Terraplanagem",
        status: "concluido",
        midias: [
          obraVideo("terraplanagem", "video-01", "Terreno após a terraplanagem", "#866e63", true),
          obraFoto("terraplanagem", "02", "Vista ampla da terraplanagem com o vale ao fundo", "h", "#876d5d"),
          obraFoto("terraplanagem", "01", "Solo preparado com marcadores no terreno", "v", "#8e6961"),
        ],
      },
      {
        id: "drenagem",
        titulo: "Execução da rede de drenagem de água pluvial",
        label: "Drenagem pluvial",
        status: "concluido",
        midias: [
          obraFoto("drenagem", "01", "Boca de descarga da drenagem com enrocamento", "v", "#595a4e", true),
          obraFoto("drenagem", "04", "Canal escalonado da drenagem pluvial", "v", "#6b6556"),
          obraFoto("drenagem", "03", "Tubos de concreto para a rede pluvial", "v", "#6b714e"),
          obraFoto("drenagem", "02", "Canal de concreto da drenagem pluvial", "v", "#5b554a"),
          obraFoto("drenagem", "05", "Descarga da drenagem na encosta", "v", "#54564a"),
          obraFoto("drenagem", "06", "Boca da drenagem com dissipador", "v", "#59594e"),
          obraFoto("drenagem", "07", "Vista de cima do canal da drenagem", "v", "#686555"),
          obraFoto("drenagem", "13", "Execução da estrutura de drenagem", "v", "#585658"),
          obraFoto("drenagem", "08", "Estrutura de descarga da drenagem pluvial", "v", "#525449"),
          obraFoto("drenagem", "09", "Descarga da drenagem na mata", "v", "#906a64"),
          obraFoto("drenagem", "10", "Boca da drenagem vista de frente", "v", "#545549"),
          obraFoto("drenagem", "11", "Saída da drenagem no limite do terreno", "v", "#946c6a"),
          obraFoto("drenagem", "12", "Cabeçote da drenagem pluvial", "v", "#976a68"),
        ],
      },
      {
        id: "esgoto",
        titulo: "Execução da rede de esgoto",
        label: "Rede de esgoto",
        status: "concluido",
        midias: [
          obraFoto("esgoto", "01", "Caixas de inspeção da rede de esgoto", "v", "#7c5c47", true),
          obraFoto("esgoto", "02", "Execução da caixa da rede de esgoto", "v", "#76736f"),
        ],
      },
      {
        id: "meio-fio",
        titulo: "Execução do meio fio",
        label: "Meio fio",
        status: "em_execucao",
        midias: [
          obraVideo("meio-fio", "video-01", "Percurso pelo meio fio na via", "#8c7a70", true),
          obraVideo("meio-fio", "video-02", "Via com meio fio ao entardecer", "#957360"),
          obraVideo("meio-fio", "video-03", "Via com meio fio dos dois lados", "#b49079"),
          obraFoto("meio-fio", "01", "Meio fio em curva com vista para o vale", "h", "#8d7968"),
          obraFoto("meio-fio", "02", "Via com meio fio dos dois lados", "h", "#9a836c"),
          obraFoto("meio-fio", "03", "Meio fio reto na via recém aberta", "v", "#a1806a"),
          obraFoto("meio-fio", "04", "Via curvada com meio fio ao entardecer", "h", "#917967"),
          obraFoto("meio-fio", "05", "Meio fio ao entardecer na borda da mata", "v", "#947a68"),
          obraFoto("meio-fio", "06", "Meio fio com casas vizinhas ao fundo", "v", "#90715d"),
          obraFoto("meio-fio", "07", "Meio fio recém lançado na via", "v", "#9e8374"),
          obraFoto("meio-fio", "08", "Meio fio alinhado na subida", "v", "#817065"),
          obraFoto("meio-fio", "09", "Meio fio e o vale de Passos", "v", "#9d8a7a"),
        ],
      },
    ],
    plantas: [],
    hotspots: [],
    racional: [],
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

export const ETAPA_OBRA_STATUS: Record<EtapaObraStatus, string> = {
  concluido: "Concluído",
  em_execucao: "Em execução",
  proximo: "Próximo",
};
