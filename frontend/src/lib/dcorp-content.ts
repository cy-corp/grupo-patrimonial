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
  "Empresa de engenharia e construção especializada em sistemas construtivos industrializados, com atuação própria e prestação de serviços para incorporadoras, investidores, empresas e clientes terceiros. Atua também em regularização e serviços ambientais para loteamentos e imóveis rurais.";

export const DCORP_HERO_SUPPORT =
  "Empresa de engenharia em meio ambiente e construção civil — consultoria, projeto, aprovação e execução.";

export const DCORP_WORLDS_EYEBROW = "Área de atuação";

export const DCORP_WORLDS = [
  {
    id: "construcao-civil",
    number: "01",
    title: "Construção civil",
    description:
      "Projetos arquitetônicos, acompanhamento e execução de obras.",
    href: "/servicos",
    image: "/dcorp/services/02-execucao.jpg",
    alt: "Execução de obra com sistemas industrializados",
  },
  {
    id: "meio-ambiente",
    number: "02",
    title: "Meio ambiente",
    description:
      "Consultoria ambiental e aprovações de loteamentos e obras.",
    href: "/servicos-ambientais",
    image: "/dcorp/services/04-ambiental.jpg",
    alt: "Terreno e entorno natural em regularização ambiental",
  },
] as const;

export const DCORP_CIVIL_EYEBROW = "Construção civil";

export const DCORP_CIVIL_HEADLINE =
  "Projetos, acompanhamento e execução de obras.";

export const DCORP_CIVIL_SUPPORT =
  "Projetos arquitetônicos, engenharia e execução — em obras próprias e para terceiros, com sistemas industrializados.";

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
        title: "Projetos arquitetônicos",
        deliverable:
          "Projeto e acompanhamento técnico até a obra, alinhado ao sistema construtivo escolhido.",
      },
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

export const DCORP_ENVIRONMENTAL_EYEBROW = "Meio ambiente";

export const DCORP_ENVIRONMENTAL_HEADLINE =
  "Regularizar o terreno. Liberar o projeto.";

export const DCORP_ENVIRONMENTAL_SUPPORT =
  "Consultoria ambiental e aprovações de loteamentos e obras — do CAR à recuperação de área degradada.";

export const DCORP_ENVIRONMENTAL_IMAGE = "/dcorp/services/04-ambiental.jpg";

export const DCORP_ENVIRONMENTAL_IMAGE_ALT =
  "Terreno e entorno natural em processo de regularização ambiental";

export const DCORP_ENVIRONMENTAL_SERVICES = [
  {
    id: "regularizacao-loteamento",
    title: "Regularização ambiental de loteamento",
    shortTitle: "Regularização de loteamento",
    deliverable:
      "Diagnóstico, estudos e tramitação para regularizar o loteamento no órgão ambiental, alinhando o projeto à legislação vigente.",
  },
  {
    id: "outorga",
    title: "Outorga de recursos hídricos",
    shortTitle: "Outorga",
    deliverable:
      "Pedido e acompanhamento da outorga de direito de uso da água junto ao órgão competente, para captação, lançamento ou interferência hídrica.",
  },
  {
    id: "recurso-multa",
    title: "Recurso de multa ambiental (esfera administrativa)",
    shortTitle: "Recurso de multa (administrativo)",
    deliverable:
      "Análise do auto de infração, peças técnicas e defesa na esfera administrativa. Recurso judicial fica fora — daí em diante precisa de advogado.",
  },
  {
    id: "licenciamento",
    title: "Licenciamento ambiental",
    shortTitle: "Licenciamento",
    deliverable:
      "Licença prévia, de instalação e de operação: estudos, protocolos e acompanhamento até a autorização do empreendimento.",
  },
  {
    id: "car",
    title: "CAR — Cadastro Ambiental Rural",
    shortTitle: "CAR",
    deliverable:
      "Inscrição, retificação e regularização do Cadastro Ambiental Rural, com mapeamento de reserva legal e áreas de preservação.",
  },
  {
    id: "recuperacao",
    title: "Recuperação de área degradada",
    shortTitle: "Recuperação de área degradada",
    deliverable:
      "Projeto de Recuperação de Área Degradada: diagnóstico, plantio, monitoramento e comprovação junto ao órgão ambiental.",
  },
] as const;

export type DcorpEnvironmentalSection = {
  title: string;
  body: string;
};

export type DcorpEnvironmentalLayout =
  | "texto-foto"
  | "foto-texto"
  | "faixa"
  | "coluna"
  | "centro"
  | "cartoes";

export type DcorpEnvironmentalPage = {
  slug: string;
  title: string;
  description: string;
  layout: DcorpEnvironmentalLayout;
  image: string;
  imageAlt: string;
  sections: DcorpEnvironmentalSection[];
};

export const DCORP_ENVIRONMENTAL_PAGES: DcorpEnvironmentalPage[] = [
  {
    slug: "regularizacao-loteamento",
    title: "Regularização ambiental de loteamento",
    description:
      "Quando o loteamento precisa se alinhar à legislação ambiental antes de seguir o projeto.",
    layout: "texto-foto",
    image: "/dcorp/ambiental/regularizacao-loteamento.jpg",
    imageAlt:
      "Terreno dividido em futuros lotes, com estacas e uma faixa de vegetação preservada.",
    sections: [
      {
        title: "O que é",
        body: "É o processo de colocar o loteamento em conformidade com as regras ambientais: diagnóstico do terreno, estudos e tramitação no órgão competente.",
      },
      {
        title: "O que a DCORP conduz",
        body: "A DCORP organiza o diagnóstico, os estudos e o protocolo, e acompanha o processo até a regularização do loteamento.",
      },
    ],
  },
  {
    slug: "outorga",
    title: "Outorga de recursos hídricos",
    description:
      "Autorização para usar água. O tipo depende de como e para quê a água entra no empreendimento.",
    layout: "foto-texto",
    image: "/dcorp/ambiental/outorga.jpg",
    imageAlt:
      "Poço e curso d'água em área rural, com irrigação ao fundo.",
    sections: [
      {
        title: "O que é",
        body: "Outorga é o direito de usar um recurso hídrico, pedido ao órgão competente. Sem ela, captação, lançamento ou interferência na água não seguem.",
      },
      {
        title: "Poço artesiano",
        body: "Captação de água subterrânea por poço. O pedido descreve a vazão, o uso e o ponto de captação.",
      },
      {
        title: "Irrigação",
        body: "Uso da água para irrigar lavoura ou área verde. O pedido informa a área, a cultura e o volume previsto.",
      },
      {
        title: "Captação e lançamento",
        body: "Captação é retirar água de um corpo hídrico. Lançamento é devolver efluente. Os dois pedem outorga quando a lei exige.",
      },
    ],
  },
  {
    slug: "recurso-multa",
    title: "Recurso de multa ambiental",
    description:
      "Defesa técnica contra auto de infração ambiental, na esfera administrativa.",
    layout: "faixa",
    image: "/dcorp/ambiental/recurso-multa.jpg",
    imageAlt:
      "Mesa de trabalho com peças técnicas de uma defesa ambiental, sem texto legível.",
    sections: [
      {
        title: "O que é",
        body: "É a análise do auto de infração e a peça de defesa para contestar ou reduzir a multa no processo administrativo.",
      },
      {
        title: "Só na esfera administrativa",
        body: "A DCORP atua na defesa administrativa. Recurso judicial fica de fora: daí em diante precisa de advogado.",
      },
    ],
  },
  {
    slug: "licenciamento",
    title: "Licenciamento ambiental",
    description:
      "Autorização do órgão ambiental para a atividade seguir, na obra ou na área rural.",
    layout: "coluna",
    image: "/dcorp/ambiental/licenciamento.jpg",
    imageAlt:
      "Obra no limite de uma área rural, com vegetação e casas ao longe.",
    sections: [
      {
        title: "O que é",
        body: "Licenciamento ambiental é o procedimento em que o órgão avalia o empreendimento e autoriza a atividade, com condições e estudos.",
      },
      {
        title: "Quais atividades pedem licença",
        body: "Depende do porte e do potencial de impacto. Obra, loteamento, indústria e atividade rural podem precisar de licença. A DCORP lê o caso e diz qual caminho se aplica.",
      },
      {
        title: "Licença de operação",
        body: "É a autorização para a atividade funcionar, depois das licenças prévia e de instalação, quando o órgão as exige.",
      },
      {
        title: "Fazenda, obra e área rural",
        body: "O licenciamento vale para empreendimento urbano e para atividade no campo, inclusive fazenda. O estudo muda conforme o uso do solo.",
      },
      {
        title: "Estudo de Impacto de Vizinhança",
        body: "O EIV analisa como o empreendimento afeta o entorno: tráfego, vizinhança e infraestrutura. Entra quando a legislação do município ou o licenciamento pede.",
      },
    ],
  },
  {
    slug: "car",
    title: "CAR — Cadastro Ambiental Rural",
    description:
      "O registro do imóvel rural que declara reserva legal, preservação e uso do solo.",
    layout: "centro",
    image: "/dcorp/ambiental/recuperacao.jpg",
    imageAlt:
      "Solo exposto ao lado de mudas nativas recém-plantadas.",
    sections: [
      {
        title: "O que é",
        body: "O CAR é o Cadastro Ambiental Rural. Nele o imóvel declara área, reserva legal, preservação permanente e o que está consolidado.",
      },
      {
        title: "O que a DCORP faz",
        body: "Inscrição, retificação e regularização do cadastro, com o mapeamento das áreas que a lei pede.",
      },
    ],
  },
  {
    slug: "recuperacao",
    title: "Recuperação de área degradada",
    description:
      "Projeto para recompor uma área degradada e comprovar o resultado junto ao órgão ambiental.",
    layout: "cartoes",
    image: "/dcorp/ambiental/recuperacao-encosta.jpg",
    imageAlt:
      "Encosta com solo exposto e mudas plantadas em curvas de nível.",
    sections: [
      {
        title: "O que é",
        body: "É o conjunto de diagnóstico, plantio e monitoramento para recuperar uma área e apresentar isso ao órgão ambiental.",
      },
      {
        title: "PRAD",
        body: "O Plano de Recuperação de Área Degradada descreve o dano, o que será recomposto e como o resultado será acompanhado.",
      },
      {
        title: "PTRF",
        body: "O Projeto Técnico de Recomposição da Flora detalha o plantio e a recomposição da vegetação exigida no processo.",
      },
    ],
  },
];

export function getDcorpEnvironmentalPage(slug: string) {
  return DCORP_ENVIRONMENTAL_PAGES.find((page) => page.slug === slug);
}

export function dcorpEnvironmentalHref(slug: string) {
  return `/servicos-ambientais/${slug}`;
}

export const DCORP_PASSOS_URL =
  "https://www.gruporendal.com/empreendimentos/passos";

export const DCORP_ENVIRONMENTAL_HOME_CHIPS = [
  {
    label: "Regularização",
    href: "/servicos-ambientais/regularizacao-loteamento",
  },
  {
    label: "Licenciamento",
    href: "/servicos-ambientais/licenciamento",
  },
  {
    label: "Recurso de multa",
    href: "/servicos-ambientais/recurso-multa",
  },
  { label: "CAR", href: "/servicos-ambientais/car" },
  {
    label: "Recuperação",
    href: "/servicos-ambientais/recuperacao",
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
