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

// Números provisórios, inventados para o layout a pedido do Yago.
// Confirmar com a i3Geo antes de publicar. Só o raio de 200 km vem de publicação deles.
export const stats = [
  { value: 12, prefix: "", suffix: " anos", label: "de atuação em campo" },
  { value: 850, prefix: "+", suffix: "", label: "imóveis levantados" },
  { value: 42000, prefix: "+", suffix: " ha", label: "medidos e mapeados" },
  { value: 200, prefix: "", suffix: " km", label: "de raio de atendimento" },
] as const;

// Situação do cliente e o serviço que costuma resolver.
export const diagnosis: { title: string; text: string; service: ServiceId }[] = [
  {
    title: "A cerca não parece estar no lugar certo",
    text: "Cercas são deslocadas e refeitas ao longo dos anos. Medimos os limites e mostramos onde a divisa fica de fato.",
    service: "georreferenciamento",
  },
  {
    title: "A área do documento não bate com a do terreno",
    text: "Analisamos os documentos e o que existe em campo para entender de onde vem a diferença e corrigi-la.",
    service: "retificacao",
  },
  {
    title: "Vou usar uma planta antiga",
    text: "O terreno pode ter mudado. Um novo levantamento mostra se a planta ainda representa a situação atual.",
    service: "levantamento",
  },
  {
    title: "Estou comprando uma propriedade",
    text: "Área, medidas, limites e confrontações conferidos em campo antes de fechar o negócio.",
    service: "levantamento",
  },
  {
    title: "Quero vender ou dividir parte da área",
    text: "Definimos tecnicamente os limites e as medidas de cada parte, para a divisão ser registrada.",
    service: "desmembramento",
  },
  {
    title: "Vou construir ou implantar um projeto",
    text: "Quando a base está correta, todas as etapas seguintes acontecem com mais segurança.",
    service: "projetos",
  },
];

// Etapas do trabalho. Texto provisório, a confirmar com a i3Geo.
export const process = [
  { station: "E-01", title: "Conversa e orçamento", text: "Entendemos a necessidade, analisamos os documentos e definimos o serviço certo." },
  { station: "E-02", title: "Levantamento em campo", text: "A equipe vai ao local e mede com a metodologia adequada ao terreno." },
  { station: "E-03", title: "Processamento e desenho", text: "Os dados viram plantas, memoriais e os documentos técnicos do serviço." },
  { station: "E-04", title: "Entrega e acompanhamento", text: "Entregamos o material e acompanhamos os trâmites até a conclusão." },
] as const;

// WhatsApp da i3Geo com DDI e DDD, só dígitos. Vazio: o pedido não é enviado a lugar nenhum.
export const contact = { whatsapp: "" };
