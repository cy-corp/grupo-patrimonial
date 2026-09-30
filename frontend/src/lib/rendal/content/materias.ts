export type MateriaId = "terra" | "concreto" | "aco" | "eps";

export type Materia = {
  id: MateriaId;
  n: string;
  nome: string;
  epoca: string;
  titulo: string;
  texto: string;
};

/** Render único 2172×724 com alfa (canvas preto furado). ViewBox do lockup em MaterialsMark. */
export const LOGO_BRUTA = {
  src: "/quem-somos/logo-bruta.png",
  width: 2172,
  height: 724,
  alt: "Símbolo da Rendal em quatro matérias: terra, concreto, aço e EPS",
} as const;

export const IDLE = {
  n: "",
  nome: "Quatro matérias",
  epoca: "",
  titulo: "A construção é uma história de matéria.",
  texto: "Passe por cada peça. Terra, concreto, aço e EPS, até o que a Rendal aplica hoje.",
} as const;

export const MATERIAS: Materia[] = [
  {
    id: "terra",
    n: "01",
    nome: "Terra",
    epoca: "Origem",
    titulo: "O chão veio primeiro.",
    texto:
      "A construção nasceu na terra. Casas de barro, território e o que o solo já oferecia, antes de qualquer engenharia.",
  },
  {
    id: "concreto",
    n: "02",
    nome: "Concreto",
    epoca: "Permanência",
    titulo: "O peso que fica de pé.",
    texto: "O concreto deu solidez. Base, massa e o que permanece quando o tempo passa.",
  },
  {
    id: "aco",
    n: "03",
    nome: "Aço",
    epoca: "Estrutura",
    titulo: "A medida antes de erguer.",
    texto: "O aço trouxe precisão. Estrutura, vão e engenharia que mede antes de erguer.",
  },
  {
    id: "eps",
    n: "04",
    nome: "EPS",
    epoca: "Agora",
    titulo: "A matéria de agora.",
    texto:
      "O EPS é leveza, isolamento e obra mais rápida. É aqui que a Rendal aplica o capital com inteligência.",
  },
];
