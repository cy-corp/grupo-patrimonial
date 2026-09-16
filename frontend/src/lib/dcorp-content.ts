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
    id: "lightwall",
    name: "Lightwall",
    shortName: "Lightwall",
    type: "seco",
    typeLabel: "Seco / leve",
    summary:
      "Painéis leves com núcleo isolante e montagem acelerada — fechamentos e tipologias com alto ganho de produtividade em obra.",
    benefits: ["Leveza", "Rapidez de montagem", "Produtividade"],
    when: "Quando o projeto prioriza velocidade, leveza e racionalização de etapas no canteiro.",
    image: "/dcorp/systems/01-lightwall.jpg",
    alt: "Montagem de painéis Lightwall em canteiro",
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
    id: "gesso",
    name: "Gesso",
    shortName: "Gesso",
    type: "seco",
    typeLabel: "Seco / leve",
    summary:
      "Fechamentos em gesso acartonado sobre estrutura leve — layouts flexíveis, acabamento rápido e produtividade em obra seca.",
    benefits: ["Agilidade", "Flexibilidade de layout", "Acabamento rápido"],
    when: "Em soluções internas e fechamentos que pedem leveza, adaptação de planta e montagem seca.",
    image: "/dcorp/systems/04-gesso.jpg",
    alt: "Montagem de paredes em gesso acartonado",
  },
];

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

export const DCORP_WORKS_HOME = [
  {
    id: "residencial",
    title: "Empreendimento residencial",
    meta: "Sistemas industrializados",
    scope: "Obra própria e para terceiros",
    summary:
      "Unidades e tipologias repetidas com ritmo de canteiro — sistemas industrializados para prazo, qualidade e menos desperdício.",
    focuses: ["Produtividade", "Padronização", "Entrega previsível"],
    image: "/dcorp/works/01-residencial.jpg",
    alt: "Empreendimento residencial em execução com sistemas industrializados",
  },
  {
    id: "condominio",
    title: "Condomínio multifamiliar",
    meta: "Concreto e produtividade",
    scope: "Escala em vertical e horizontal",
    summary:
      "Condomínios que pedem solidez estrutural e repetição de blocos — concreto moldado in loco e controle construtivo no canteiro.",
    focuses: ["Robustez", "Repetição", "Controle de qualidade"],
    image: "/dcorp/works/02-condominio.jpg",
    alt: "Condomínio multifamiliar em obra com paredes de concreto",
  },
  {
    id: "incorporadora",
    title: "Obra para incorporadora",
    meta: "Execução para terceiros",
    scope: "SPE e clientes externos ao grupo",
    summary:
      "Engenharia e execução a serviço de incorporadoras e investidores — do sistema escolhido à fiscalização no dia a dia da obra.",
    focuses: ["Parceiro de execução", "Prazo e custo", "Método"],
    image: "/dcorp/works/03-incorporadora.jpg",
    alt: "Canteiro em escala para incorporadora parceira",
  },
] as const;
