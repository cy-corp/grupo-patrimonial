// Conteúdo institucional, tirado das publicações da própria i3Geo.

export const services = [
  {
    id: "georreferenciamento",
    title: "Georreferenciamento",
    text: "Medimos os limites do imóvel com coordenadas precisas, para que a área e as divisas fiquem definidas sem margem para dúvida.",
    when: "Compra e venda, registro em cartório e regularização do imóvel.",
  },
  {
    id: "retificacao",
    title: "Retificação de área",
    text: "Corrigimos as medidas e a área que constam nos documentos quando elas não correspondem ao que existe no local.",
    when: "A área indicada nos documentos é diferente da encontrada no terreno.",
  },
  {
    id: "desmembramento",
    title: "Desmembramento",
    text: "Dividimos uma área em partes, com os limites e as medidas de cada uma definidos tecnicamente.",
    when: "Venda de parte do terreno, partilha entre herdeiros ou divisão entre sócios.",
  },
  {
    id: "levantamento",
    title: "Levantamento topográfico",
    text: "Reunimos as informações essenciais para compreender uma área com precisão, base para projetos de engenharia, arquitetura e regularizações.",
    when: "Antes de construir, regularizar, dividir uma área ou implantar um projeto.",
  },
  {
    id: "projetos",
    title: "Projetos técnicos",
    text: "Elaboramos os projetos a partir do levantamento, compatíveis com a realidade do terreno e com as normas aplicáveis.",
    when: "Implantação de um novo projeto ou aprovação junto aos órgãos competentes.",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const surveyDelivers = [
  "Limites da área",
  "Dimensões",
  "Desníveis",
  "Elementos existentes",
  "Coordenadas",
  "Características do terreno",
] as const;

export const situations = [
  {
    title: "A cerca não parece estar no lugar certo.",
    text: "Cercas são deslocadas e refeitas ao longo dos anos. O levantamento mostra onde fica o limite de fato.",
  },
  {
    title: "A área do documento não bate com a do terreno.",
    text: "Analisamos os documentos e o que existe em campo para entender de onde vem a diferença.",
  },
  {
    title: "Você vai usar uma planta antiga.",
    text: "O terreno pode ter mudado. Verificamos se a planta ainda representa a situação atual da área.",
  },
  {
    title: "Você está comprando uma propriedade.",
    text: "Área, medidas, limites e confrontações conferidos antes de fechar o negócio.",
  },
  {
    title: "Há uma divergência com o vizinho.",
    text: "Uma análise técnica esclarece a situação e dá base confiável para os próximos passos.",
  },
] as const;

export const coverage = {
  radiusKm: 200,
  states: ["Minas Gerais", "São Paulo"],
} as const;

export const pillars = [
  {
    title: "Psicologia",
    short: "Antes de qualquer levantamento existe uma necessidade real. Entendemos o cliente e o cenário antes de propor a solução.",
    long: [
      "Antes de qualquer levantamento, mapa ou projeto, existe uma necessidade real.",
      "Entender o cliente, compreender o cenário, antecipar riscos e propor soluções técnicas com responsabilidade é parte do nosso compromisso.",
      "Nós não entregamos apenas documentos. Entregamos segurança.",
    ],
  },
  {
    title: "Administração",
    short: "Planejamos cada etapa, estruturamos processos e cumprimos prazos.",
    long: [
      "Precisão técnica exige organização, método e responsabilidade.",
      "Planejamos cada etapa. Estruturamos processos. Cumprimos prazos.",
      "Gestão é o que transforma conhecimento em resultado concreto.",
    ],
  },
  {
    title: "Técnica",
    short: "Dominamos normas, legislação e metodologia, com precisão cartográfica e responsabilidade profissional.",
    long: [
      "Ser técnico não é suficiente. É preciso ser perito.",
      "Dominamos normas, legislação e metodologia. Trabalhamos com precisão cartográfica e responsabilidade profissional.",
      "Cada projeto carrega nossa assinatura técnica e nossa credibilidade.",
    ],
  },
] as const;

export const instagram = "https://www.instagram.com/i3geo.com.br/";
