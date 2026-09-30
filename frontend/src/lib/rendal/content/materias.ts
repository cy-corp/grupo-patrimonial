export type MateriaId = "terra" | "concreto" | "aco" | "eps";

export type Materia = {
  id: MateriaId;
  n: string;
  nome: string;
  epoca: string;
  titulo: string;
  texto: string;
};

/** Render único 2172×724 no creme `#F8F1E3` (sem knockout: o isopor é branco demais pra furar o fundo). */
export const LOGO_BRUTA = {
  src: "/quem-somos/logo-bruta.webp",
  width: 2172,
  height: 724,
  alt: "Símbolo da Rendal em quatro matérias: terra, concreto, aço e isopor",
} as const;

export const IDLE = {
  n: "",
  nome: "Quatro matérias",
  epoca: "",
  titulo: "A construção começa no material.",
  texto: "Terra, concreto, aço e isopor. Quatro etapas até o que a Rendal emprega hoje.",
} as const;

export const MATERIAS: Materia[] = [
  {
    id: "terra",
    n: "01",
    nome: "Terra",
    epoca: "Origem",
    titulo: "O chão veio primeiro.",
    texto:
      "Antes da engenharia, a construção era o próprio solo. Barro, território, o que a terra já oferecia.",
  },
  {
    id: "concreto",
    n: "02",
    nome: "Concreto",
    epoca: "Solidez",
    titulo: "A solidez que permanece.",
    texto: "O concreto deu peso e duração. Base, parede, a casa que se mantém de pé com o tempo.",
  },
  {
    id: "aco",
    n: "03",
    nome: "Aço",
    epoca: "Estrutura",
    titulo: "Precisão antes de erguer.",
    texto: "O aço permitiu medir, abrir vãos e ganhar altura. Estrutura com cálculo, não só com força.",
  },
  {
    id: "eps",
    n: "04",
    nome: "Isopor",
    epoca: "Hoje",
    titulo: "Leveza onde o projeto pede.",
    texto:
      "O isopor isola, reduz carga e encurta a obra. A Rendal o adota quando a eficiência cabe no projeto.",
  },
];
