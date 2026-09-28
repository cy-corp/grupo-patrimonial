export type Pessoa = {
  nome: string;
  cargo: string;
  linha: string;
  foto: string;
};

/** Only people confirmed as Rendal leadership. Other portraits stay unpublished. */
export const lideranca: Pessoa[] = [
  {
    nome: "Dener Lopes",
    cargo: "Incorporação",
    linha: "Conduz a decisão de projeto, da viabilidade à entrega.",
    foto: "/quem-somos/dener-lopes.png",
  },
];
