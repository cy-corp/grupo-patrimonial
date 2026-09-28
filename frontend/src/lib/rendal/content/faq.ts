export type FaqItem = { q: string; a: string };

export const faqHome: FaqItem[] = [
  {
    q: "Para quem é o produto Rendal?",
    a: "Para quem procura uma casa confortável, com área de lazer, boa distribuição dos ambientes e acabamento pensado para o uso diário.",
  },
  {
    q: "O que é a laje de lazer?",
    a: "É uma cobertura impermeabilizada e preparada para uso. Em vez de servir apenas como proteção, ela recebe área de estar, pérgola e outros espaços de lazer.",
  },
  {
    q: "Por que a avaliação da Caixa costuma ficar acima do preço?",
    a: "Em projetos de referência, a avaliação chegou a ficar entre 30% e 40% acima do preço de venda. O resultado depende da unidade, do empreendimento e da análise do banco, portanto não é uma garantia.",
  },
  {
    q: "A visita tem compromisso de compra?",
    a: "Não. Você conhece o empreendimento, tira suas dúvidas e decide com calma. Só avança para a reserva quando quiser.",
  },
  {
    q: "Dá para financiar?",
    a: "Sim. Em Contato, em Quero financiar, você inicia a orientação de crédito no estilo pré-aprovação — a equipe analisa o perfil e retorna uma orientação no seu nome, com a Caixa e outros bancos. A aprovação final depende da instituição.",
  },
  {
    q: "Qual o prazo até a entrega?",
    a: "Depende do empreendimento e da fase de obra. Na visita ou no contato, você recebe o cronograma da unidade que está olhando.",
  },
  {
    q: "O que está incluído na unidade?",
    a: "Isso varia por empreendimento. Na visita, a equipe apresenta a planta, os acabamentos e o memorial descritivo da unidade que você está avaliando.",
  },
  {
    q: "Como falo com a Rendal sobre uma unidade?",
    a: "Use Ver empreendimentos para consultar as unidades ou Contato para falar com a equipe e agendar uma visita.",
  },
];

export const faqEmpreendimentos: FaqItem[] = [
  faqHome[3],
  faqHome[4],
  faqHome[5],
];

export const faqCapetinga: FaqItem[] = [
  faqHome[3],
  faqHome[4],
  faqHome[5],
  faqHome[6],
];

export const faqProprietarios: FaqItem[] = [
  {
    q: "Preciso pagar pelo estudo?",
    a: "A conversa inicial não tem custo. Se o estudo de viabilidade avançar, a equipe explica o que entra nessa etapa antes de qualquer compromisso.",
  },
  {
    q: "Quanto tempo leva a viabilidade?",
    a: "Depende da documentação e do zoneamento. Na primeira conversa a equipe indica o que já dá para ver e o que ainda precisa de consulta.",
  },
  {
    q: "Meu terreno tem pendência, dá para conversar?",
    a: "Dá. Inventário, partilha ou documentação incompleta não impedem a conversa. A equipe diz o que precisa ser resolvido antes de estruturar o negócio.",
  },
  {
    q: "Como fica a parte jurídica?",
    a: "A Rendal estrutura o caminho — venda, permuta ou SPE — com os instrumentos do empreendimento. Nada disso substitui a análise do seu advogado.",
  },
];
