export const kitsParceiro = [
  {
    id: "laje",
    titulo: "Laje de lazer",
    frase: "A cobertura vira área de lazer.",
    imagem: "/wireframes/laje-dia.jpg",
  },
  {
    id: "lavabo",
    titulo: "Lavabo social",
    frase: "A visita não entra na área íntima.",
    imagem: "/referencia/capetinga-dener/planta-terreo.jpg",
  },
  {
    id: "acabamento",
    titulo: "Acabamento no lugar certo",
    frase: "O capital fica onde se vê e se usa.",
    imagem: "/referencia/capetinga-dener/render-fachada-dia.jpg",
  },
] as const;

export type KitId = (typeof kitsParceiro)[number]["id"];

export function getKit(id: string) {
  return kitsParceiro.find((item) => item.id === id);
}
