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
    id: "eps",
    name: "Painel Monolítico EPS",
    shortName: "Painel Monolítico EPS",
    type: "semi-industrializado",
    typeLabel: "Semi-industrializado",
    summary:
      "Painéis com núcleo de EPS que combinam leveza, desempenho térmico e montagem acelerada — com argamassa ou concreto na execução.",
    benefits: ["Leveza", "Desempenho térmico", "Rapidez de montagem"],
    when: "Quando o projeto exige velocidade, conforto térmico e racionalização de etapas.",
    image: "/dcorp/systems/01-eps.jpg",
    alt: "Montagem de painel monolítico EPS em canteiro",
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
    type: "seco",
    typeLabel: "Seco / leve",
    summary:
      "Sistema leve e seco para fechamentos e layouts flexíveis, com alto ganho de produtividade em obra.",
    benefits: ["Agilidade", "Flexibilidade de layout", "Produtividade"],
    when: "Em soluções que priorizam leveza, montagem rápida e adaptação de planta.",
    image: "/dcorp/systems/04-lightwall.jpg",
    alt: "Sistema Lightwall em montagem seca",
  },
];

export const DCORP_AUDIENCES = [
  {
    title: "Incorporadoras",
    description: "Execução com prazo, custo e produtividade sob controle.",
  },
  {
    title: "Investidores",
    description: "Obra com engenharia e menos desperdício no capital.",
  },
  {
    title: "Construtoras",
    description: "Parceiro tecnológico para sistemas industrializados.",
  },
  {
    title: "Empresas",
    description: "Construção rápida com método e fiscalização.",
  },
  {
    title: "SPEs e proprietários",
    description: "Obras próprias e para terceiros, inclusive fora do grupo.",
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
    title: "Engenharia",
    items: [
      "Planejamento executivo de obras",
      "Orçamentação e engenharia de custos",
      "Compatibilização de projetos",
    ],
  },
  {
    title: "Execução",
    items: [
      "Construção de unidades habitacionais",
      "Execução de condomínios e empreendimentos residenciais",
      "Implantação de sistemas construtivos industrializados",
      "Obras próprias e para terceiros",
    ],
  },
  {
    title: "Gestão e capacitação",
    items: [
      "Gerenciamento e fiscalização de obras",
      "Treinamento e apoio técnico de equipes",
      "Execução para incorporadoras e investidores",
    ],
  },
] as const;

export const DCORP_WORKS_HOME = [
  {
    id: "residencial",
    title: "Empreendimento residencial",
    meta: "Sistemas industrializados",
    image: "/dcorp/works/01-residencial.jpg",
    alt: "Empreendimento residencial em execução com sistemas industrializados",
  },
  {
    id: "condominio",
    title: "Condomínio multifamiliar",
    meta: "Concreto e produtividade",
    image: "/dcorp/works/02-condominio.jpg",
    alt: "Condomínio multifamiliar em obra com paredes de concreto",
  },
  {
    id: "incorporadora",
    title: "Obra para incorporadora",
    meta: "Execução para terceiros",
    image: "/dcorp/works/03-incorporadora.jpg",
    alt: "Canteiro em escala para incorporadora parceira",
  },
] as const;
