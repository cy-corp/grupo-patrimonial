export type DcorpSystemType =
  | "seco"
  | "semi-industrializado"
  | "moldado in loco";

export type DcorpSystem = {
  id: string;
  name: string;
  shortName: string;
  type: DcorpSystemType;
  typeLabel: string;
  summary: string;
  benefits: string[];
  when: string;
  image: string;
  alt: string;
};

export const DCORP_POSITIONING =
  "Empresa de engenharia e construção especializada em sistemas construtivos industrializados, com atuação própria e prestação de serviços para incorporadoras, investidores, empresas e clientes terceiros.";

export const DCORP_HERO_SUPPORT =
  "Construção industrializada com engenharia, velocidade e controle — para incorporadoras, investidores e empresas.";

export const DCORP_SYSTEMS_HEADLINE = "Sistemas que aceleram a obra.";

export const DCORP_SYSTEMS: DcorpSystem[] = [
  {
    id: "painel-monolitico-eps",
    name: "Painel monolítico EPS",
    shortName: "Painel EPS",
    type: "semi-industrializado",
    typeLabel: "Semi-industrializado",
    summary:
      "Painéis monolíticos com núcleo em EPS — leveza, desempenho térmico e montagem rápida no canteiro.",
    benefits: ["Leveza", "Desempenho térmico", "Rapidez de montagem"],
    when: "Quando o projeto prioriza isolamento térmico, leveza estrutural e produtividade na montagem.",
    image: "/dcorp/systems/01-eps-mesh.jpg",
    alt: "Montagem de painéis monolíticos EPS com tela de aço em canteiro",
  },
  {
    id: "concreto-in-loco",
    name: "Paredes de concreto moldadas in loco",
    shortName: "Concreto moldado in loco",
    type: "moldado in loco",
    typeLabel: "Moldado in loco",
    summary:
      "Execução de paredes estruturais em concreto moldado no canteiro, com controle de qualidade e padronização construtiva.",
    benefits: ["Robustez estrutural", "Controle construtivo", "Padronização"],
    when: "Em empreendimentos que pedem solidez estrutural e repetição de tipologias.",
    image: "/dcorp/systems/02-concreto-in-loco.jpg",
    alt: "Paredes de concreto sendo moldadas in loco",
  },
  {
    id: "icf",
    name: "ICF — formas isolantes para concreto",
    shortName: "ICF",
    type: "semi-industrializado",
    typeLabel: "Semi-industrializado",
    summary:
      "Formas isolantes que recebem concreto, unindo isolamento térmico, velocidade e desempenho energético da envoltória.",
    benefits: ["Isolamento térmico", "Velocidade", "Desempenho energético"],
    when: "Quando isolamento e produtividade precisam caminhar juntos na estrutura.",
    image: "/dcorp/systems/03-icf.jpg",
    alt: "Formas isolantes ICF prontas para concreto",
  },
  {
    id: "lightwall",
    name: "Lightwall",
    shortName: "Lightwall",
    type: "semi-industrializado",
    typeLabel: "Semi-industrializado",
    summary:
      "Painéis pré-moldados de concreto leve com núcleo de EPS — montagem rápida no canteiro, substituindo alvenaria com alto ganho de produtividade.",
    benefits: ["Agilidade", "Desempenho térmico", "Produtividade"],
    when: "Quando o projeto prioriza velocidade de montagem, conforto térmico e racionalização frente à alvenaria convencional.",
    image: "/dcorp/systems/04-lightwall-br.jpg",
    alt: "Montagem de painéis Lightwall com núcleo EPS em canteiro",
  },
];

export const DCORP_METHOD_HEADLINE = "Obra por etapas especializadas.";

export const DCORP_METHOD_SUPPORT =
  "Cada fase com profissionais dedicados — sob um planejamento único, com cronograma, padrões técnicos e inspeções coordenadas pela DCORP.";

export const DCORP_METHOD_STAGES = [
  {
    id: "fundacao",
    title: "Fundação",
    detail: "Preparação do terreno e execução da fundação em radier.",
  },
  {
    id: "estrutura",
    title: "Estrutura e painéis",
    detail: "Montagem dos painéis e da estrutura da edificação.",
  },
  {
    id: "instalacoes",
    title: "Instalações",
    detail: "Elétrica e hidráulica com equipes especializadas.",
  },
  {
    id: "revestimentos",
    title: "Revestimentos e acabamentos",
    detail: "Chapisco, emboço, pisos, esquadrias, louças e pintura.",
  },
  {
    id: "entrega",
    title: "Entrega",
    detail: "Paisagismo, limpeza e entrega final sob inspeção da DCORP.",
  },
] as const;

export const DCORP_METHOD_OUTCOME =
  "Mais produtividade, controle de custos, menos desperdício e prazo mais previsível.";

export const DCORP_AUDIENCES = [
  {
    title: "Incorporadoras e SPEs",
    description:
      "Execução com produtividade, previsibilidade e controle de prazo e custo — inclusive para clientes fora do grupo.",
  },
  {
    title: "Construtoras e empresas",
    description:
      "Implantação de sistemas industrializados com apoio técnico e capacitação da equipe no canteiro.",
  },
  {
    title: "Investidores e proprietários",
    description:
      "Análise técnica, orçamento e execução do empreendimento com engenharia do planejamento à entrega.",
  },
] as const;

export const DCORP_SERVICES_HOME = [
  "Planejamento executivo",
  "Orçamentação e custos",
  "Compatibilização",
  "Implantação de sistemas",
  "Gerenciamento e fiscalização",
  "Execução para incorporadoras",
] as const;

export const DCORP_SERVICE_GROUPS = [
  {
    id: "engenharia",
    title: "Engenharia",
    items: [
      {
        title: "Planejamento executivo de obras",
        deliverable:
          "Sequência de etapas, prazos e critérios de execução definidos antes do canteiro.",
      },
      {
        title: "Orçamentação e engenharia de custos",
        deliverable:
          "Levantamento quantitativo e orçamento executivo para comparar sistemas e viabilizar a obra.",
      },
      {
        title: "Compatibilização de projetos",
        deliverable:
          "Conferência entre disciplinas para reduzir interferência, retrabalho e parada em obra.",
      },
    ],
    image: "/dcorp/services/01-engenharia.jpg",
    alt: "Mesa técnica com plantas, orçamento e compatibilização de projetos",
  },
  {
    id: "execucao",
    title: "Execução",
    items: [
      {
        title: "Construção de unidades habitacionais",
        deliverable:
          "Execução de tipologias habitacionais com ritmo de canteiro e sistema definido no escopo.",
      },
      {
        title: "Execução de condomínios e empreendimentos residenciais",
        deliverable:
          "Obra em escala — blocos, unidades e infraestrutura sob o mesmo método construtivo.",
      },
      {
        title: "Implantação de sistemas construtivos industrializados",
        deliverable:
          "Escolha, montagem e acompanhamento do sistema no canteiro, com apoio à equipe da obra.",
      },
      {
        title: "Obras próprias e para terceiros",
        deliverable:
          "Contrato de execução para a DCORP ou para incorporadoras e SPEs externas à holding.",
      },
    ],
    image: "/dcorp/services/02-execucao.jpg",
    alt: "Canteiro com sistemas industrializados em montagem",
  },
  {
    id: "gestao",
    title: "Gestão e capacitação",
    items: [
      {
        title: "Gerenciamento e fiscalização de obras",
        deliverable:
          "Acompanhamento de prazo, qualidade e produção com relatório e orientação no dia a dia.",
      },
      {
        title: "Treinamento e apoio técnico de equipes",
        deliverable:
          "Capacitação da mão de obra no sistema adotado, para montagem correta e produtividade.",
      },
      {
        title: "Execução para incorporadoras e investidores",
        deliverable:
          "Parceiro de engenharia e obra para quem precisa entregar com previsibilidade de custo e prazo.",
      },
    ],
    image: "/dcorp/services/03-gestao.jpg",
    alt: "Fiscalização e orientação técnica em obra",
  },
] as const;

/**
 * Holambra gallery: drop JPGs in `public/dcorp/works/holambra/` as 01.jpg, 02.jpg…
 * then append paths to `images` below. Home uses `images[0]`.
 */
export const DCORP_WORKS_HOME = [
  {
    id: "holambra",
    title: "Holambra",
    meta: "Em andamento",
    scope: "Residencial em execução",
    summary:
      "Obra em andamento com painel monolítico EPS — montagem industrializada e acompanhamento por etapas no canteiro.",
    focuses: ["Em andamento", "Painel monolítico EPS", "Método por etapas"],
    images: [
      "/dcorp/works/holambra/01.jpg?v=2",
      "/dcorp/works/holambra/02.jpg?v=2",
      "/dcorp/works/holambra/03.jpg?v=2",
    ],
    alt: "Obra Holambra em andamento com painel monolítico EPS",
    gallery: true,
  },
  {
    id: "condominio",
    title: "Condomínio multifamiliar",
    meta: "Concreto e produtividade",
    scope: "Escala em vertical e horizontal",
    summary:
      "Condomínios que pedem solidez estrutural e repetição de blocos — concreto moldado in loco e controle construtivo no canteiro.",
    focuses: ["Robustez", "Repetição", "Controle de qualidade"],
    images: ["/dcorp/works/02-condominio.jpg"],
    alt: "Condomínio multifamiliar em obra com paredes de concreto",
    gallery: false,
  },
  {
    id: "incorporadora",
    title: "Obra para incorporadora",
    meta: "Execução para terceiros",
    scope: "SPE e clientes externos ao grupo",
    summary:
      "Engenharia e execução a serviço de incorporadoras e investidores — do sistema escolhido à fiscalização no dia a dia da obra.",
    focuses: ["Parceiro de execução", "Prazo e custo", "Método"],
    images: ["/dcorp/works/03-incorporadora.jpg"],
    alt: "Canteiro em escala para incorporadora parceira",
    gallery: false,
  },
] as const;
